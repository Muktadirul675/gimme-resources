"use client";

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import { useStream } from "@/hooks/stream";
import { UIMessage } from "@/types";

type MessengerContextType = {
    messages: UIMessage[];
    sessionId: string | null;
    sendMessage: (text: string) => void;
    stop: () => void;
    initializing: boolean;
    init: () => Promise<void>;
    reset: () => Promise<void>; // ð¥ added
}

const MessengerContext = createContext<MessengerContextType | null>(null);

export function MessengerProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [messages, setMessages] = useState<UIMessage[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [initializing, setInitializing] = useState<boolean>(true)
    const { startStream, stopStream } = useStream();

    const assistantIdRef = useRef<string | null>(null);

    const init = async () => {
        setInitializing(true)
        const res = await fetch("/api/conversation",{method:"GET",credentials: "include"});
        const data = await res.json();

        setSessionId(data.conversation.id);

        // optional: hydrate messages later
        setMessages(
            data.messages?.map((m: any) => ({
                id: m.id,
                role: m.role,
                content: m.content,
                status: "done",
            })) || []
        );
        setInitializing(false)
    };

    // ð¥ 2. SEND MESSAGE
    const sendMessage = async (text: string) => {
        if (!sessionId) return;

        const userId = crypto.randomUUID();
        const assistantId = crypto.randomUUID();

        assistantIdRef.current = assistantId;

        // UI update only
        setMessages((prev) => [
            ...prev,
            {
                id: userId,
                role: "user",
                content: text,
            },
            {
                id: assistantId,
                role: "assistant",
                content: "",
                status: "streaming",
            },
        ]);

        // backend stream
        await startStream(
            { message: text, sessionId },
            {
                onChunk: (chunk: any) => {
                    const targetId = assistantIdRef.current;

                    if (!targetId) return;

                    setMessages((prev) =>
                        prev.map((msg) => {
                            if (msg.id !== targetId) return msg;

                            if (chunk.type === "token") {
                                return {
                                    ...msg,
                                    content:
                                        msg.content +
                                        (chunk.text || ""),
                                };
                            }

                            if (chunk.type === "done") {
                                return {
                                    ...msg,
                                    status: "done",
                                };
                            }

                            return msg;
                        })
                    );
                },
            }
        );
    };


    const reset = async () => {
        setInitializing(true);

        stopStream();
        assistantIdRef.current = null;

        const res = await fetch("/api/conversation/reset", {
            method: "POST",
            credentials: "include"
        });

        const data = await res.json();

        setSessionId(data.conversation.id);

        setMessages([]);

        setInitializing(false);
    };

    const stop = () => {
        stopStream();

        const targetId = assistantIdRef.current;
        if (!targetId) return;

        // Force mark as done
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === targetId
                    ? { ...msg, status: "done" }
                    : msg
            )
        );
    };

    return (
        <MessengerContext.Provider
            value={{
                messages,
                sessionId,
                sendMessage,
                stop,
                initializing,
                init,
                reset
            }}
        >
            {children}
        </MessengerContext.Provider>
    );
}

export function useMessenger() {
    const ctx = useContext(MessengerContext);
    if (!ctx)
        throw new Error(
            "useMessenger must be used inside MessengerProvider"
        );
    return ctx;
}