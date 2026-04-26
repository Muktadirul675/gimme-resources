"use client";

import { useEffect, useState } from "react";

export default function RootLoading() {
    const [showDelayNote, setShowDelayNote] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowDelayNote(true);
        }, 2300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-[999] flex flex-col gap-2 items-center justify-center bg-background">
            
            {/* Spinner */}
            <div className="flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
            </div>

            {/* Bottom text */}
            <div className="mb-10 text-center px-4">
                {!showDelayNote ? (
                    <p className="text-sm text-foreground/70">
                        Loading...
                    </p>
                ) : (
                    <p className="text-xs text-foreground/50">
                        Initial loading may take longer due to server startup or AI service limits.
                    </p>
                )}
            </div>
        </div>
    );
}