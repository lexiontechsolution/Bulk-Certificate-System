import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { BookOpen, Shield, Cpu, Award } from "lucide-react";

const Guides = () => {
    const articles = [
        {
            title: "Designing the Perfect Certificate",
            icon: <Award className="w-8 h-8 text-indigo-400" />,
            description: "Learn how to choose fonts, colors, and layouts that make your certificates stand out. A well-designed certificate increases the recipient's sense of achievement.",
            content: "The psychology of recognition starts with the visual appeal. When designing a certificate, consider the visual hierarchy. Use bold headers for the recipient's name and high-contrast colors for your organization's logo. Our AI mapping tool can suggest the optimal placement for dynamic fields based on white space analysis."
        },
        {
            title: "Digital Verification: The Future of Credentials",
            icon: <Shield className="w-8 h-8 text-cyan-400" />,
            description: "Why paper certificates are no longer enough. Explore how QR codes and unique verification IDs prevent fraud and enhance trust.",
            content: "In an era of digital document tampering, physical seals are easily forged. CertifyAI uses a distributed ledger approach to host verification data. Each certificate is assigned a UUID (Universally Unique Identifier) that links back to a secure entry in our database, allowing employers to verify claims in real-time."
        },
        {
            title: "Scaling Recognition with AI Automation",
            icon: <Cpu className="w-8 h-8 text-purple-400" />,
            description: "How automated workflows save hundreds of hours for educational institutions and corporate HR departments.",
            content: "Manual certificate generation is prone to human error and scaling bottlenecks. By leverage CSV-to-Canvas automation, organizations can process 1,000+ certificates in minutes. CertifyAI's batch processing engine handles the heavy lifting, ensuring every participant receives their reward without administrative delay."
        },
        {
            title: "Best Practices for Bulk Certificate Issuance",
            icon: <BookOpen className="w-8 h-8 text-emerald-400" />,
            description: "A comprehensive checklist for organizations issuing digital credentials to large groups.",
            content: "Before starting your bulk run, ensure your data is sanitized. Check for special characters in names and verify email addresses. We recommend a 5-certificate test run to verify layout alignment. Once satisfied, the full batch can be triggered, and with our integrated mailer, distribution is as simple as one click."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 relative overflow-hidden">
            <Navbar />
            
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <main className="flex-1 relative z-10 max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                        Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Center</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Expert guides and resources on digital certification, design, and automation.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {articles.map((article, index) => (
                        <article key={index} className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 transition-all group">
                            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                {article.icon}
                            </div>
                            <h2 className="text-3xl font-bold mb-4 tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                                {article.title}
                            </h2>
                            <p className="text-indigo-400/80 font-medium mb-6">
                                {article.description}
                            </p>
                            <div className="text-slate-400 leading-relaxed space-y-4">
                                {article.content}
                            </div>
                        </article>
                    ))}
                </div>

                <section className="mt-32 p-16 rounded-[3rem] bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/5">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-bold text-white mb-6">Why High-Quality Content Matters</h2>
                        <p className="text-xl text-slate-300 leading-relaxed mb-6">
                            At CertifyAI, we believe in providing value beyond just a tool. Our mission is to educate organizers on how to create meaningful recognition experiences. Every certificate tells a story of hard work and dedication, and our platform is designed to ensure that story is told with excellence.
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            Through these guides, we provide insights into the technical and aesthetic aspects of digital credentials, helping you build trust and authority in your field.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Guides;
