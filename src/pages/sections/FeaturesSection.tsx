import {
  Zap, Shield, Search, Layout,
  Cpu, Globe, Mail, Clock, Sparkles
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-indigo-400" />,
      title: "AI-Powered Generation",
      description: "Our advanced AI algorithms intelligently map your data to beautiful certificate templates, ensuring perfect alignment and typography every time.",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]"
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-400" />,
      title: "Bulk Processing",
      description: "Generate thousands of certificates in minutes. Whether it's 10 or 10,000, our cloud infrastructure handles the load without breaking a sweat.",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.5)]"
    },
    {
      icon: <Globe className="w-8 h-8 text-cyan-400" />,
      title: "Global Distribution",
      description: "Automatically email certificates to participants worldwide instantly. No manual attachments or tedious copy-pasting required.",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)]"
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: "Digital Verification",
      description: "Each certificate comes with a unique, verifiable ID or QR code, allowing employers and institutions to instantly confirm authenticity.",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.5)]"
    },
    {
      icon: <Mail className="w-8 h-8 text-purple-400" />,
      title: "Custom SMTP",
      description: "Connect your own email server to send certificates from your organization's domain, maintaining a professional brand image.",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]"
    },
    {
      icon: <Clock className="w-8 h-8 text-rose-400" />,
      title: "Time-Saving Templates",
      description: "Choose from a library of professionally designed templates or upload your own. Customize colors, fonts, and layouts in seconds.",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.5)]"
    }
  ];

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Core Capabilities
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Built for <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Power & Precision</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Everything you need to manage, generate, and distribute professional certificates at scale.
            Streamline your workflow with tools designed for high-impact organizations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-slate-800 hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Card Glow Background */}
              <div className={`absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${feature.glow}`}></div>

              <div className="relative z-10">
                <div className="mb-8 p-5 w-fit rounded-2xl bg-slate-950 border border-slate-800 shadow-xl group-hover:scale-110 group-hover:border-indigo-500/50 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>

              {/* Decorative accent */}
              <div className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
