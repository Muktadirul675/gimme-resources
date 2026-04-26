'use client'

import Link from "next/link";
import { ReactNode, useMemo, useState } from "react";
import { BiLeftArrow, BiReset } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCode, FaHandsHelping, FaInfoCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { SiKnowledgebase } from "react-icons/si";

const CONTRIBUTION_FORM_LINK = "https://forms.gle/SJrSJgRRmCjSBbm1A"
const CODEBASE_LINK = "https://github.com/Muktadirul675/gimme-resources"
const MAILTO_LINK = "mailto:muktadirul.05@gmail.com?subject=Issue found on gimme-resources.vercel.app&body=I%20want%20to%20report%20about..."

export default function Sidebar() {
    const [sideBarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

    const sidebarTranslateX = useMemo(() => {
        if (sideBarIsOpen) {
            return '0'
        }
        return '-100%'
    }, [sideBarIsOpen])

    const routes: ({ type: string, label?: string, link?: string, icon?: ReactNode })[] = [
        { type: 'link', icon: <BiReset className="text-2xl" />, label: "Reset Conversation", link: '/reset-conversation' },
        { type: 'link-external', icon: <SiKnowledgebase className="text-2xl" />, label: "Contribute to Knowledgebase", link: CONTRIBUTION_FORM_LINK },
        { type: 'link-external', icon: <FaCode className="text-2xl" />, label: "Contribute to Codebase", link: CODEBASE_LINK },
        { type: 'mailto', icon: <MdErrorOutline className="text-2xl" />, label: "Report Issue", link: MAILTO_LINK },
        { type: 'filler' },
        { type: 'link', icon: <FaHandsHelping className="text-2xl" />, label: "Contributors", link: '/contributors' },
        { type: 'link', icon: <FaInfoCircle className="text-2xl" />, label: "About", link: '/about' }
    ]

    return <>
        <div onClick={() => setSidebarIsOpen((prev) => !prev)} className="fixed md:hidden m-5 rounded-full p-3 border border-gray-300 bg-background text-white z-[50]">
            <BsThreeDotsVertical />
        </div>
        <div className="hidden translate-x-[0] translate-x-[-100%]"></div>
        {sideBarIsOpen ? <div className="fixed inset-0 z-[40]" onClick={() => setSidebarIsOpen(false)}></div> : null}
        <div className={`z-[99] border-r border-gray-800 md:border-0 transition-all translate-x-[${sidebarTranslateX}] md:translate-x-[0] p-3 md:px-6 max-w-lg w-[250px] fixed md:sticky top-0 md:top-[12px] md:rounded-lg bg-foreground h-dvh md:h-[calc(100vh-24px)] flex flex-col gap-4`}>
            <div className="w-full flex justify-end">
                <div onClick={() => setSidebarIsOpen(false)} className="md:hidden m-3 rounded-full p-3 border border-gray-300 bg-background text-white">
                    <BiLeftArrow />
                </div>
            </div>
            {routes.map((route, index) => {
                if (route.type == 'filler') {
                    return <div key={index} className="mt-auto"></div>
                } else if (route.type == 'link-external') {
                    return <a key={index}
                        target="__blank"
                        href={route.link ?? "#"}
                        onClick={() => setSidebarIsOpen(false)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-slate-50/50 transition-all p-2 rounded-lg"
                    >
                        {route.icon} {route.label}
                    </a>
                } else if (route.type == 'mailto') {
                    return <a href={route.link}
                        onClick={() => setSidebarIsOpen(false)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-slate-50/50 transition-all p-2 rounded-lg"
                    >
                        {route.icon} {route.label}
                    </a>
                }
                return (
                    <Link key={index}
                        href={route.link ?? "#"}
                        onClick={() => setSidebarIsOpen(false)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-slate-50/50 transition-all p-2 rounded-lg"
                    >
                        {route.icon} {route.label}
                    </Link>
                );
            })}
        </div>
    </>
}