import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const AboutUs = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
            <Navbar />
            <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-8">About Us</h1>
                <div className="prose prose-invert prose-slate space-y-6 text-slate-300">
                    <p>CERTIFY-AI is a powerful, AI-driven bulk certificate generation tool designed to simplify the process of creating professional certificates for events, colleges, and training programs.</p>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">Our Mission</h2>
                        <p>Developed by Lexiontech, our mission is to provide efficient and accessible tools for organizations to recognize achievements at scale with minimal effort.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">Our Technology</h2>
                        <p>We leverage modern web technologies and AI to ensure high-quality output and a seamless user experience. Our system is built to handle large datasets efficiently while maintaining design integrity.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">Company</h2>
                        <p>CERTIFY-AI is a product of Lexiontech, a technology solution provider dedicated to building innovative software for modern challenges.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
