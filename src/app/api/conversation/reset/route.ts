import { db } from "@/db/client";
import { conversations, messages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = cookies();

    let sessionId = cookieStore.get("sessionId")?.value;

    // 1. If no session â create one
    if (!sessionId) {
        sessionId = crypto.randomUUID();

        cookieStore.set("sessionId", sessionId, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
        });
    }

    // 2. Ensure conversation exists (safe upsert style)
    await db
        .insert(conversations)
        .values({
            id: sessionId,
            title: "New Chat",
        })
        .onConflictDoNothing();

    // 3. Delete all messages for this conversation (RESET)
    await db
        .delete(messages)
        .where(eq(messages.conversationId, sessionId));

    // 4. Fetch conversation (single source of truth)
    const conversation = await db
        .select()
        .from(conversations)
        .where(eq(conversations.id, sessionId))
        .limit(1)
        .then((r) => r[0]);

    // 5. Return clean state
    return Response.json({
        conversation,
        messages: [],
    });
}