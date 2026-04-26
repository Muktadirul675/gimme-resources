export async function getEmbedding(text: string): Promise<number[]> {
    const res = await fetch("https://api.jina.ai/v1/embeddings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.JINA_API_KEY}`,
        },
        body: JSON.stringify({
            input: text,
            model: "jina-embeddings-v2-base-en",
        }),
    });

    const data = await res.json();

    return data.data[0].embedding;
}