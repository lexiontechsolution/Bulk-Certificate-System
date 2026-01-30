import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
            <Navbar />
            <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-invert prose-slate space-y-6 text-slate-300">
                    <p>At CERTIFY-AI, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CERTIFY-AI and how we use it.</p>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">Information We Collect</h2>
                        <p>We only collect information that you voluntarily provide to us when using our bulk certificate generation tool, such as names and email addresses for certificate generation.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">How We Use Your Information</h2>
                        <p>We use the information we collect primarily to provide, operate, and maintain our website, and specifically to generate the certificates you request.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">Data Security</h2>
                        <p>We prioritize the security of your data. We do not store your uploaded data longer than necessary to process your request.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">Cookies and Web Beacons</h2>
                        <p>Like any other website, CERTIFY-AI uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</p>
                    </section>

                    <p className="pt-4 italic">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
