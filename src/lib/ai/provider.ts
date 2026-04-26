import { Message } from "@/types";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function streamLLM(messages: Message[]) {
    const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b", // you can change
        messages,
        stream: true,
    });

    return completion; // async iterable stream
}