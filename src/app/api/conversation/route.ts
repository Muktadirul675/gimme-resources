import { db } from "@/db/client";
import { conversations, messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();

    let sessionId = cookieStore.get("sessionId")?.value;

    // 1. Create session if missing
    if (!sessionId) {
        sessionId = crypto.randomUUID();

        cookieStore.set("sessionId", sessionId, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
        });
    }

    // 2. Ensure conversation exists (safe + no duplicates)
    await db
        .insert(conversations)
        .values({
            id: sessionId,
            title: "New Chat",
        })
        .onConflictDoNothing();

    // 3. Fetch conversation + messages in parallel
    const [conversation, chatMessages] = await Promise.all([
        db
            .select()
            .from(conversations)
            .where(eq(conversations.id, sessionId))
            .limit(1)
            .then((r) => r[0]),

        db
            .select()
            .from(messages)
            .where(eq(messages.conversationId, sessionId))
            .limit(50),
    ]);

    return Response.json({
        conversation,
        messages: chatMessages,
    });
}