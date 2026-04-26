"use server";

import { db } from "@/db/client";
import { resources } from "@/db/schema";
import { getEmbedding } from "@/lib/rag/embedding";

export async function createResource(prevState: any, formData: FormData) {
    try {
        const authorPass = formData.get("author_pass") as string;

        if (authorPass !== process.env.AUTHOR_PASS) {
            return {
                success: false,
                message: "Invalid author pass",
            };
        }

        const id = crypto.randomUUID();
        const description = formData.get("description") as string;

        const embedding = await getEmbedding(description);

        await db.insert(resources).values({
            id,
            title: (formData.get("title") as string) || null,
            description,
            url: (formData.get("url") as string) || null,
            type: formData.get("type") as string,
            author: (formData.get("author") as string) || null,
            audience: (formData.get("audience") as string) || null,
            tags: (formData.get("tags") as string) || null,
            embedding,
        });

        return {
            success: true,
            message: "Resource created successfully",
        };
    } catch (err) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}