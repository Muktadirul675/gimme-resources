import { AIChunk } from "@/types"

export async function* parseGroqStream(stream: any): AsyncGenerator<AIChunk> {
    try {
        for await (const chunk of stream) {
            const token = chunk.choices?.[0]?.delta?.content;

            if (token) {
                yield {
                    type: "token",
                    text: token,
                };
            }
        }

        yield { type: "done" };
    } catch (err: any) {
        yield {
            type: "error",
            message: err.message || "Stream error",
        };
    }
}