import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const AboutUs = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 relative overflow-hidden">
            <Navbar />

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <main className="flex-1 relative z-10">
                {/* Banner Section */}
                <div className="py-24 bg-gradient-to-b from-slate-900/50 to-transparent border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <h1 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">CertifyAI</span>
                        </h1>
                        <p className="text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Empowering organizations to celebrate achievements through AI-driven automation and beautiful design.
                        </p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-24 space-y-32">
                    {/* Main Story */}
                    <section className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold tracking-tight">Our Mission</h2>
                            <p className="text-xl text-slate-300 leading-relaxed">
                                Developed by <span className="text-indigo-400 font-semibold">Lexiontech</span>, our mission is to democratize achievement recognition. We believe that every milestone, whether academic or professional, deserves to be celebrated with a high-quality, verifiable certificate.
                            </p>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                By removing the administrative burden of manual generation, we empower organizations to focus on what truly matters: the success of their participants.
                            </p>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                            <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                                <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center border border-white/5">
                                    <div className="text-6xl animate-bounce">✨</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Technology Grid */}
                    <section className="space-y-12 text-center">
                        <h2 className="text-4xl font-bold tracking-tight">The Technology Behind CertifyAI</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Intelligent Mapping",
                                    desc: "AI algorithms that automatically suggest the best font sizes and positions."
                                },
                                {
                                    title: "Zero-Latency Cloud",
                                    desc: "Distributed architecture designed to handle batches of any size without delays."
                                },
                                {
                                    title: "Secure Verification",
                                    desc: "Each certificate links to a unique digital record, ensuring authenticity."
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-slate-900/40 backdrop-blur-md border border-white/5 text-left hover:border-indigo-500/30 transition-all group">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Company Section */}
                    <section className="p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/5 text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">About Lexiontech</h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            CertifyAI is a flagship product of Lexiontech, a research-driven technology firm based in India. We specialize in building automated solutions for educational institutions and corporate enterprises, bridging the gap between complex data and beautiful design.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutUs;
