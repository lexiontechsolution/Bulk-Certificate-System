import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const Disclaimer = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
            <Navbar />
            <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-8">Disclaimer</h1>
                <div className="prose prose-invert prose-slate space-y-6 text-slate-300">
                    <p>The information provided by CERTIFY-AI ("we", "us", or "our") on our website is for general informational purposes only.</p>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">Errors and Omissions</h2>
                        <p>While we strive to provide accurate information and a reliable service, we assume no responsibility for errors or omissions in the content of the generated certificates or the website itself.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">Use at Your Own Risk</h2>
                        <p>Your use of our service is solely at your own risk. CERTIFY-AI will not be liable for any losses or damages in connection with the use of our website or service.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">External Links</h2>
                        <p>Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with CERTIFY-AI. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
                    </section>

                    <p className="pt-4 italic">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Disclaimer;
