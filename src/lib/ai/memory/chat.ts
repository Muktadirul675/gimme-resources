import { db } from "@/db/client";
import { messages } from "@/db/schema";
import { Message } from "@/types";
import { eq, desc } from "drizzle-orm";

export async function retrieveSessionMemory(
    conversationId: string,
    limit = 7
) : Promise<Message[]> {
    const latestMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, conversationId))
        .orderBy(desc(messages.createdAt))
        .limit(limit);

    const messagesForLLM = latestMessages
        .reverse()
        .map((m) => ({
            role: m.role as "user" | "assistant" | "system",
            content: m.content,
        }));

    return messagesForLLM;
}