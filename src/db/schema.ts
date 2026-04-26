import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { vector } from "drizzle-orm/pg-core"; // if supported, otherwise raw SQL

export const resources = pgTable("resources", {
    id: text("id").primaryKey(),

    type: text("type").notNull(),
    url: text("url"),
    description: text("description").notNull(),

    author: text("author"),
    audience: text("audience"),

    title: text("title"),
    tags: text("tags"),

    embedding: vector("embedding", { dimensions: 768 }), 
    // ð depends on model (OpenAI/SBERT/etc)

    createdAt: timestamp("created_at").defaultNow(),
})

export const conversations = pgTable("conversations", {
    id: text("id").primaryKey(), // session id (uuid)

    title: text("title"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
    id: text("id").primaryKey(),

    conversationId: text("conversation_id")
        .notNull()
        .references(() => conversations.id, { onDelete: "cascade" }),

    role: text("role").notNull(), // "user" | "assistant"

    content: text("content").notNull(),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),

    // JSON stored as text (Postgres-friendly)
    authors: text("authors"), // ["user_id", "system"]

    attachments: text("attachments"), // JSON string
});