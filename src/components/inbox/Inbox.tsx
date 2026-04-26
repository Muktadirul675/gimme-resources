"use client";

import { useMessenger } from "@/contexts/MessengerContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";
import { BsArrowDown } from "react-icons/bs";
import EmptyState from "./EmptyState";
import MarkdownRenderer from "./MarkdownRenderer";

export default function Inbox() {
    const { messages } = useMessenger();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const [autoScroll, setAutoScroll] = useState(true);

    // ð¥ Detect user scroll
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            const threshold = 120;

            const isNearBottom =
                el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

            setAutoScroll(isNearBottom);
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    // ð¥ Auto scroll on new messages / streaming
    useEffect(() => {
        if (!autoScroll) return;

        bottomRef.current?.scrollIntoView({
            behavior: "auto", // better for streaming
        });
    }, [messages, autoScroll]);

    return (
        <div
            ref={containerRef}
            className="w-full flex flex-col flex-wrap gap-2 pb-[100px]"
        >
            {messages.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    {messages.map((msg) =>
                        msg.role === "user" ? (
                            <UserSideChat key={msg.id} msg={msg.content} />
                        ) : (
                            <AISideChat
                                key={msg.id}
                                msg={msg.content}
                                isStreaming={msg.status === "streaming"}
                            />
                        )
                    )}

                    <div ref={bottomRef} />

                    {!autoScroll && (
                        <button
                            onClick={() => {
                                bottomRef.current?.scrollIntoView({
                                    behavior: "smooth",
                                });
                                setAutoScroll(true);
                            }}
                            className="fixed bottom-28 right-4 rounded-full bg-[#2B6EF6] px-4 py-2 text-white shadow-lg"
                        >
                            <BsArrowDown />
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

function UserSideChat({ msg }: { msg: string }) {
    return (
        <div className="w-full flex justify-end items-center px-3">
            <div className="w-fit p-2 rounded-full bg-[#3B4A63] text-white">
                {msg}
            </div>
        </div>
    );
}

function AISideChat({
    msg,
    isStreaming,
}: {
    msg: string;
    isStreaming?: boolean;
}) {
    return (
        <div className="flex w-full justify-start px-3">
            <div className={`max-w-[98.5%] w-fit break-words overflow-hidden bg-zinc-900 rounded-2xl p-2 ${isStreaming ? 'animate-pulse' :''}`}>
                <MarkdownRenderer content={msg} />
            </div>
        </div>
    );
}
