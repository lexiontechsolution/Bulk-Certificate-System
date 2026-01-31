import { Check, Sparkles, Zap, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
    const tiers = [
        {
            name: "Starter",
            price: "0",
            description: "Perfect for small events and personal projects.",
            features: [
                "Up to 50 certificates/batch",
                "Standard templates",
                "PDF & PNG downloads",
                "Basic email support",
                "Digital verification badge"
            ],
            buttonText: "Get Started Free",
            highlight: false,
            accent: "from-slate-800 to-slate-900"
        },
        {
            name: "Professional",
            price: "29",
            description: "Ideal for colleges and growing organizations.",
            features: [
                "Unlimited certificates",
                "Premium template library",
                "Bulk email distribution",
                "Custom SMTP connection",
                "Priority 24/7 support",
                "Advanced analytics"
            ],
            buttonText: "Start Free Trial",
            highlight: true,
            accent: "from-indigo-600/20 to-purple-600/20"
        },
        {
            name: "Enterprise",
            price: "99+",
            description: "Fixed solutions for large-scale operations.",
            features: [
                "API access for automation",
                "Dedicated account manager",
                "White-label solution",
                "SLA guarantees",
                "Onboarding & training",
                "Custom feature development"
            ],
            buttonText: "Contact Sales",
            highlight: false,
            accent: "from-slate-800 to-slate-900"
        }
    ];

    return (
        <section id="pricing" className="py-32 relative overflow-hidden bg-slate-950">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-6">
                        <Zap className="w-4 h-4" />
                        Pricing Plans
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                        Plans That <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Scale With You</span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Choose the plan that fits your needs. No hidden fees, cancel anytime.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-center">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`group relative p-10 rounded-[3rem] border transition-all duration-500 ${tier.highlight
                                    ? "bg-slate-900/60 border-indigo-500 shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)] scale-105 z-10 backdrop-blur-xl"
                                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700 backdrop-blur-md"
                                }`}
                        >
                            {tier.highlight && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold shadow-xl border border-white/10">
                                    <Sparkles className="w-4 h-4" />
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{tier.name}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{tier.description}</p>
                            </div>

                            <div className="mb-10">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-bold text-white tracking-tight">${tier.price.split('+')[0]}</span>
                                    {tier.price.includes('+') && <span className="text-3xl font-bold text-white">+</span>}
                                    {tier.price !== "99+" && <span className="text-slate-500 font-medium">/mo</span>}
                                </div>
                            </div>

                            <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-10"></div>

                            <ul className="space-y-5 mb-12">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-4 text-slate-300">
                                        <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                            <Check className="w-3.5 h-3.5 text-indigo-400" />
                                        </div>
                                        <span className="text-base leading-snug">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to={tier.price === "99+" ? "/contact" : "/app"}
                                className={`w-full py-5 rounded-2xl font-bold text-lg text-center transition-all duration-300 flex items-center justify-center gap-2 group/btn ${tier.highlight
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/20 active:scale-95"
                                        : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 active:scale-95"
                                    }`}
                            >
                                {tier.buttonText}
                                <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
