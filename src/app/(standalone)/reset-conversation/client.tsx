'use client'

import { useMessenger } from "@/contexts/MessengerContext";
import { useRouter } from "next/navigation";
import { BiReset } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";

export default function ResetConversationClient() {
    const { reset } = useMessenger()
    const router = useRouter()

    function goBack() {
        router.back()
    }

    async function handleReset() {
        goBack()
        await reset()
    }

    return <div className="mx-auto flex flex-col gap-2 flex-wrap items-center justify-center my-5 p-5 w-[90%] max-w-lg bg-foreground rounded-lg">
        <h3 className="test-white text-center text-2xl">Are you sure you want to reset conversation?</h3>
        <h3 className="test-white text-center text-lg">All Messages Will be Lost!</h3>
        <div className="flex items-center gap-2">
            <button onClick={goBack} className="rounded bg-white text-black p-2 my-2 flex items-center gap-2"><GiCancel className="text-xl" /> Cancel</button>
            <button onClick={handleReset} className="rounded text-white bg-red-500 p-2 my-2 flex items-center gap-2"><BiReset className="text-xl" /> Reset</button>
        </div>
    </div>
}