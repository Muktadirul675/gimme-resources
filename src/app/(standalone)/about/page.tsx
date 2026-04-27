export const metadata = {
  title: "About",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#121212] text-[#E6EAF2] px-4 py-12 rounded-lg">
            <div className="mx-auto max-w-4xl space-y-10">

                {/* Header */}
                <div className="space-y-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-semibold">
                        About This Platform
                    </h1>
                    <p className="text-slate-400">
                        Find the right resources, faster.
                    </p>
                </div>

                {/* Intro */}
                <section className="space-y-4 text-slate-300 leading-relaxed">
                    <p>
                        In today's world, information is everywhere, but finding the
                        <span className="text-white"> right information </span>
                        at the right time is still a challenge.
                    </p>
                    <p>
                        This platform is built to solve that problem.
                    </p>
                </section>

                {/* What we do */}
                <section className="space-y-4">
                    <h2 className="text-xl font-medium text-white">
                        What We Do
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                        We are not a traditional chatbot that tries to teach or overwhelm
                        you with explanations. Instead, our goal is simple:
                    </p>

                    <div className="rounded-2xl border border-slate-700 bg-[#151922] p-4 text-center">
                        <p className="text-white font-medium">
                            Help you discover the most relevant, high-quality resources fast
                        </p>
                    </div>
                </section>

                {/* How it works */}
                <section className="space-y-4">
                    <h2 className="text-xl font-medium text-white">
                        How It Works
                    </h2>

                    <ul className="space-y-3 text-slate-300">
                        <li>📖 Large curated knowledge base of trusted resources</li>
                        <li>🔍 Smart retrieval to find the most relevant content</li>
                        <li>🧠 AI-powered responses to present results clearly</li>
                    </ul>

                    <p className="text-slate-400 text-sm">
                        Instead of guessing, the system retrieves first, then responds.
                    </p>
                </section>

                {/* Differentiation */}
                <section className="space-y-4">
                    <h2 className="text-xl font-medium text-white">
                        What Makes Us Different
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl border border-slate-700 bg-[#151922] p-4">
                            <h3 className="text-white font-medium mb-1">
                                Resource-first
                            </h3>
                            <p className="text-slate-400 text-sm">
                                We prioritize real resources over long explanations.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-700 bg-[#151922] p-4">
                            <h3 className="text-white font-medium mb-1">
                                Context-aware
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Results adapt to your query, not generic answers.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-700 bg-[#151922] p-4">
                            <h3 className="text-white font-medium mb-1">
                                Clean responses
                            </h3>
                            <p className="text-slate-400 text-sm">
                                No noise, just what you need.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-700 bg-[#151922] p-4">
                            <h3 className="text-white font-medium mb-1">
                                Efficient discovery
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Spend less time searching, more time learning.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission */}
                <section className="space-y-4">
                    <h2 className="text-xl font-medium text-white">
                        Our Mission
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                        To reduce the time between a question and a reliable answer.
                        We aim to bridge curiosity and credible knowledge through
                        efficient discovery.
                    </p>
                </section>

                {/* Footer note */}
                <div className="pt-6 text-center text-slate-500 text-sm">
                    You don't need another chatbot that talks more, you need one that helps you find better.
                </div>
            </div>
        </div>
    )
}