import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

const CTASection = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-slate-950">
            {/* Abstract Mesh Background Decor */}
            <div className="absolute -top-1/2 -left-1/4 w-full h-[200%] bg-gradient-to-tr from-indigo-600/20 via-transparent to-purple-600/20 rotate-12 blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="relative bg-slate-900/40 backdrop-blur-3xl rounded-[4rem] p-12 md:p-24 text-center border border-white/5 shadow-2xl overflow-hidden group">

                    {/* Internal Glows */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/20 transition-all duration-700"></div>

                    <div className="max-w-4xl mx-auto relative z-20 space-y-10">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-semibold animate-pulse">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            Join the future of achievement
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 animate-gradient-x">automate</span> your success?
                        </h2>

                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Experience the power of AI-driven certificate generation. Fast, secure, and professional.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                            <Link
                                to="/app"
                                className="px-12 py-6 rounded-[2rem] bg-indigo-600 text-white font-bold text-xl hover:bg-indigo-500 transition-all duration-300 transform hover:scale-[1.05] hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] flex items-center justify-center gap-3 active:scale-95"
                            >
                                Start Free Now
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                            <Link
                                to="/pages/Legal/ContactUs"
                                className="px-12 py-6 rounded-[2rem] bg-white/5 border border-white/10 text-white font-bold text-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center backdrop-blur-md active:scale-95"
                            >
                                Contact Sales
                            </Link>
                        </div>

                        <div className="pt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                            {[
                                "No Credit Card Required",
                                "Instant Bulk Export",
                                "Digital Verification Inc."
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-2.5 text-slate-400 font-medium">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
