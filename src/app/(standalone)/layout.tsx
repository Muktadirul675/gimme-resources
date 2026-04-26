import Link from "next/link";
import { ReactNode } from "react";
import { BiHome } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";
import { IoHelp } from "react-icons/io5";

export default function StandaloneLayout({children}:{children: ReactNode}){
    return <div className="w-full flex flex-col justify-center items-center p-3 md:p-5">
        <div className="w-[85%] max-w-lg flex rounded-xl border border-gray-300 bg-foreground my-3 sticky top-[12px]">
            <Link href={"/"} className="flex flex-1 p-2 justify-center py-1.5 items-center gap-1">
                <BiHome className="text-lg"/> Home
            </Link>
            <Link href={"/about"} className="flex flex-1 p-2 justify-center py-1.5 items-center gap-1 border-r border-l border-gray-300">
                <FcAbout className="text-lg"/> About
            </Link>
            <Link href={"/contributors"} className="flex flex-1 p-2 justify-center py-1.5 items-center gap-1">
                <IoHelp className="text-lg"/> Authors
            </Link>
        </div>
        {children}
    </div>
}