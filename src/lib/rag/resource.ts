import { db } from "@/db/client";
import { resources } from "@/db/schema";
import { getEmbedding } from "@/lib/rag/embedding";
import { supabase } from "@/lib/supabase/server";

export async function searchResources(query: string) {
    const embedding = await getEmbedding(query);

    const { data } = await supabase.rpc("match_resources", {
        query_embedding: embedding,
        match_count: 30,
    });

    return data;
}
export async function createResource(data: any) {
    const embedding = await getEmbedding(data.description);

    return await db.insert(resources).values({
        id: crypto.randomUUID(),
        ...data,
        embedding,
    });
}

type Resource = {
    type: "image" | "text";
    url?: string | null;
    description: string;
};

type MergedResource = {
    title: string;
    description: string;
    image?: string | null;
    url?: string | null;
    author?: string | null;
    audience?: string | null;
    tags?: string | null;
};

export function mergeResources(rows: any[]): MergedResource[] {
    const map = new Map<string, MergedResource>();

    for (const r of rows) {
        // ð strong grouping key
        const key =
            (r.title || "").toLowerCase().trim() ||
            (r.description || "").slice(0, 50);

        if (!map.has(key)) {
            map.set(key, {
                title: r.title || "Untitled Resource",
                description: "",
                image: null,
                url: null,
                author: r.author || null,
                audience: r.audience || null,
                tags: r.tags || null,
            });
        }

        const existing = map.get(key)!;

        // ð§  merge logic
        if (r.type === "text") {
            // avoid duplicate text
            if (!existing.description.includes(r.description)) {
                existing.description +=
                    (existing.description ? "\n\n" : "") + r.description;
            }
        }

        if (r.type === "image" && r.url) {
            existing.image = existing.image || r.url;
        }

        if (r.type === "link" && r.url) {
            existing.url = existing.url || r.url;
        }

        // optional: enrich missing fields
        if (!existing.author && r.author) {
            existing.author = r.author;
        }

        if (!existing.audience && r.audience) {
            existing.audience = r.audience;
        }

        if (!existing.tags && r.tags) {
            existing.tags = r.tags;
        }
    }

    return Array.from(map.values())
}

export function formatContext(resources: MergedResource[]): string {
    return resources
        .map((r) => {
            return `
### ${r.title}

${r.image ? `![${r.title}](${r.image})` : ""}

${r.description}

${r.url
                    ? `[Learn more](${r.url})`
                    : ""
                }

${r.audience
                    ? `**Audience:** ${r.audience}`
                    : ""
                }
            `.trim();
        })
        .join("\n\n---\n\n");
}
