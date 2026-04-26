import { streamLLM } from "@/lib/ai/provider";
import { parseGroqStream } from "@/lib/ai/stream";
import { buildMessages } from "@/lib/ai/prompts";
import { db } from "@/db/client";
import { conversations, messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { retrieveSessionMemory } from "@/lib/ai/memory/chat";
import { formatContext, mergeResources, searchResources } from "@/lib/rag/resource";

export async function POST(req: Request) {
    const { message, sessionId } = await req.json();

    const encoder = new TextEncoder();

    // ð¥ 1. get or create conversation
    let conversationId = sessionId;

    if (!conversationId) {
        conversationId = crypto.randomUUID();

        await db.insert(conversations).values({
            id: conversationId,
            title: "New Chat",
        });
    }

    // ð¥ 2. insert user message
    const userMessageId = crypto.randomUUID();

    await db.insert(messages).values({
        id: userMessageId,
        conversationId,
        role: "user",
        content: message,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    // ð¥ 3. create assistant placeholder
    const assistantId = crypto.randomUUID();

    await db.insert(messages).values({
        id: assistantId,
        conversationId,
        role: "assistant",
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    // ð¥ 4. build LLM messages
    const memory = await retrieveSessionMemory(conversationId)
    const resources = await searchResources(message)
    const merged = mergeResources(resources);
    const context = formatContext(merged);

    const messagesForLLM = buildMessages(memory, context);

    const groqStream = await streamLLM(messagesForLLM);

    // ð¥ 5. stream response
    const stream = new ReadableStream({
        async start(controller) {
            // send init
            controller.enqueue(
                encoder.encode(
                    `data: ${JSON.stringify({
                        type: "start",
                        id: assistantId,
                        conversationId,
                    })}\n\n`
                )
            );

            let fullText = "";

            for await (const chunk of parseGroqStream(groqStream)) {
                if (chunk.type === "token") {
                    fullText += chunk.text;
                }

                controller.enqueue(
                    encoder.encode(
                        `data: ${JSON.stringify({
                            ...chunk,
                            id: assistantId,
                        })}\n\n`
                    )
                );
            }

            // ð¥ 6. update DB when done
            await db
                .update(messages)
                .set({
                    content: fullText,
                    updatedAt: new Date(),
                })
                .where(eq(messages.id, assistantId));

            // done event
            controller.enqueue(
                encoder.encode(
                    `data: ${JSON.stringify({
                        type: "done",
                        id: assistantId,
                    })}\n\n`
                )
            );

            controller.close();
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    })
}