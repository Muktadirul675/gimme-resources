"use client";

import { FormEvent, useRef, useState } from "react";
import { CiPaperplane } from "react-icons/ci";
import { useMessenger } from "@/contexts/MessengerContext";
import { BiSquare } from "react-icons/bi";

export default function InputBox() {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const { sendMessage, stop } = useMessenger();
    const [loading, setLoading] = useState(false);

    const handleInput = () => {
        const el = textareaRef.current;
        if (!el) return;

        const MAX_ROWS = 5;
        const LINE_HEIGHT = 24;

        el.style.height = "auto";

        const scrollHeight = el.scrollHeight;
        const maxHeight = LINE_HEIGHT * MAX_ROWS;

        if (scrollHeight <= maxHeight) {
            el.style.overflowY = "hidden";
            el.style.height = `${scrollHeight}px`;
        } else {
            el.style.overflowY = "auto";
            el.style.height = `${maxHeight}px`;
        }
    };

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const text = textareaRef.current?.value?.trim();
        if (!text || loading) return;

        textareaRef.current!.value = "";
        textareaRef.current!.style.height = "auto";

        setLoading(true);

        try {
            await sendMessage(text);
        } finally {
            setLoading(false);
        }
    }

    function handleStop() {
        stop();        // ð¥ abort stream
        setLoading(false);
    }

    return (
        <div className="fixed bottom-0 w-full max-w-6xl px-3 py-5">
            <form
                onSubmit={handleSubmit}
                className="flex w-full items-end gap-2 rounded-[30px] border border-slate-600 bg-[#151922] p-2"
            >
                <textarea
                    ref={textareaRef}
                    rows={1}
                    onInput={handleInput}
                    placeholder="Type your message..."
                    className="flex-1 resize-none overflow-y-hidden bg-transparent px-3 py-2 text-[#E6EAF2] outline-none placeholder:text-slate-500"
                />

                <div className="relative flex items-center justify-center">
                    {/* STOP BUTTON */}
                    {loading ? (
                        <div className="relative flex h-10 w-10 items-center justify-center">
                            {/* Spinner Ring */}
                            <div className="absolute h-10 w-10 rounded-full border-2 border-slate-200 border-t-transparent animate-spin"></div>

                            {/* Stop Button */}
                            <button
                                type="button"
                                onClick={handleStop}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
                            >
                                <BiSquare />
                            </button>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2B6EF6] text-white transition hover:bg-[#4F9DFF]"
                        >
                            <CiPaperplane />
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}