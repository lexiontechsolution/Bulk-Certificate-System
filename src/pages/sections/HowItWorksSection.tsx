import { CloudUpload, Cpu, Download } from "lucide-react";

const HowItWorksSection = () => {
    const steps = [
        {
            icon: <CloudUpload className="w-12 h-12 text-indigo-400" />,
            title: "1. Upload Your Data",
            description: "Simply upload your participant list in Excel or CSV format. Our system automatically detects column headers like Name, Course, and Date.",
            accent: "from-indigo-500/20 to-transparent"
        },
        {
            icon: <Cpu className="w-12 h-12 text-purple-400" />,
            title: "2. Design & Map",
            description: "Choose a professional template or upload your own. Use our drag-and-drop editor to map data fields to the certificate design with AI assistance.",
            accent: "from-purple-500/20 to-transparent"
        },
        {
            icon: <Download className="w-12 h-12 text-pink-400" />,
            title: "3. Generate & Send",
            description: "Preview your certificates and hit generate. Download all certificates in a ZIP file (PDF/PNG) or send them directly to participants via email.",
            accent: "from-pink-500/20 to-transparent"
        }
    ];

    return (
        <section id="how-it-works" className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-28">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                        Seamless <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Automation</span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Our streamlined workflow removes the technical complexity, letting you focus on celebrating achievement.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-16 relative">
                    {/* Animated Connector Path (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-1">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-progress-fast shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
                    </div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative text-center group">
                            {/* Step Number Badge */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/50 transition-all duration-300">
                                0{index + 1}
                            </div>

                            <div className="relative mb-12 mx-auto w-32 h-32 rounded-[2.5rem] bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-500/30 transition-all duration-500 shadow-2xl overflow-hidden">
                                {/* Background glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${step.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                <div className="relative z-10">{step.icon}</div>
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-6 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                                {step.title.split('. ')[1]}
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-lg px-4">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes progress-fast {
          0% { width: 0%; left: 0%; }
          50% { width: 40%; left: 30%; }
          100% { width: 0%; left: 100%; }
        }
        .animate-progress-fast {
          animation: progress-fast 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />
        </section>
    );
};

export default HowItWorksSection;
