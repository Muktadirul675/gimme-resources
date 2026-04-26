'use client'

import InputBox from "@/components/inbox/InputBox";
import Sidebar from "@/components/inbox/Sidebar";
import RootLoading from "@/components/ui/loading/RootLoading";
import { useMessenger } from "@/contexts/MessengerContext";
import { useEffect } from "react";

export default function ChatInboxLayout({ children }: { children: React.ReactNode }) {
    const { initializing, sessionId, init } = useMessenger()
    useEffect(()=>{
        if(!sessionId) init()
    },[sessionId])
    if(initializing){
        return <RootLoading/>
    }
    return <div className="flex items-start gap-2 p-0 md:p-3">
        <Sidebar />
        <div className="flex-1 relative flex items-start justify-center">
            <div className="w-full max-w-6xl pt-6 md:p-0">
                {children}
            </div>
            <InputBox />
        </div>
    </div>
}