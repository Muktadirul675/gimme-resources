'use client'

import { useRef, useState } from "react";

type StreamOptions = {
    onChunk?: (chunk: any) => void;
};

export function useStream() {
    const [isStreaming, setIsStreaming] = useState(false);
    const controllerRef = useRef<AbortController | null>(null);

    const startStream = async (body: any, options?: StreamOptions) => {
        controllerRef.current?.abort();

        const controller = new AbortController();
        controllerRef.current = controller;

        setIsStreaming(true);

        const res = await fetch("/api/chat", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(body),
            signal: controller.signal,
        });

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) return;

        let buffer = "";

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                const parts = buffer.split("\n\n");
                buffer = parts.pop() || "";

                for (const part of parts) {
                    if (part.startsWith("data: ")) {
                        const json = JSON.parse(
                            part.replace("data: ", "")
                        );

                        options?.onChunk?.(json);
                    }
                }
            }
        } catch (err: any) {
            if (err.name !== "AbortError") {
                console.error(err);
            }
        }

        setIsStreaming(false);
    };

    const stopStream = () => {
        controllerRef.current?.abort();
        
        setIsStreaming(false);
    };

    return {
        startStream,
        stopStream,
        isStreaming,
    };
}