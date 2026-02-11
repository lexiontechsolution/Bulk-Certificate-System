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
                        <p>Like any other website, CERTIFY-AI uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">Google DoubleClick DART Cookie</h2>
                        <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">Third Party Privacy Policies</h2>
                        <p>CERTIFY-AI's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
                        <p>Under the CCPA, among other rights, California consumers have the right to request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">GDPR Data Protection Rights</h2>
                        <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: The right to access, the right to rectification, the right to erasure, and the right to restrict processing.</p>
                    </section>

                    <p className="pt-4 italic">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
