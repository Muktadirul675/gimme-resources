import { BiInfoCircle } from "react-icons/bi";

export default function EmptyState() {
    return (
        <div className="py-[80px] flex flex-col justify-center px-6 md:px-12 text-left text-slate-400">

            {/* Large intro */}
            <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
                🔎 Find the best native learning resources
            </h1>

            <h2 className="text-lg md:text-xl text-slate-300 mt-2 mb-6">
                Curated from across the native trends of Bangladesh
            </h2>

            {/* Disclaimer */}
            <p className="max-w-2xl text-sm md:text-base mb-6">
                ❗This assistant is not a tutor. It helps you discover and organize
                relevant resources instead of teaching step-by-step.
            </p>

            <div className="border border-blue-600 rounded-lg p-3 mb-8">
                <BiInfoCircle className="text-blue-500" />
                <p>
                    This platform runs on data that are fed to a RAG system manually. It doesn't crawl the web, as it doesn't ensure native trends. As a result, not every resource may be present here. If you don't find your desired resources, please <a href="mailto:muktadirul.05@gmail.com?subject=Issue found on gimme-resources.vercel.app&body=I%20want%20to%20report%20about..." className="text-blue-500">report</a>. <b>Also note that, to ensure resource availability we are looking for contributors. If you want to contribute resources, <span>please visit <a className="text-blue-500" href="https://forms.gle/SJrSJgRRmCjSBbm1A">here</a></span> . </b>
                </p>
            </div>

            {/* Bad examples */}
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-300 mb-3">
                    ❌ Avoid prompts like
                </h3>

                <div className="space-y-3">
                    <div className="w-full rounded-lg border border-red-900/40 bg-[#1a0f0f] p-4 text-red-200">
                        "Teach me React from scratch like a teacher"
                    </div>

                    <div className="w-full rounded-lg border border-red-900/40 bg-[#1a0f0f] p-4 text-red-200">
                        "Solve my assignment completely for me"
                    </div>
                </div>
            </div>

            {/* Good examples */}
            <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3">
                    ✅ Expected prompt types
                </h3>

                <div className="space-y-3">
                    <div className="w-full rounded-lg border border-slate-700 bg-[#0f172a] p-4">
                        "Best resources to learn React for beginners"
                    </div>

                    <div className="w-full rounded-lg border border-slate-700 bg-[#0f172a] p-4">
                        "Articles and docs on JWT authentication in Node.js"
                    </div>

                    <div className="w-full rounded-lg border border-slate-700 bg-[#0f172a] p-4">
                        "System design roadmap with real learning links"
                    </div>
                </div>
            </div>
        </div>
    );
}