import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-slate space-y-6 text-slate-300">
          <p>Welcome to CERTIFY-AI. By using our website and services, you agree to comply with and be bound by the following terms and conditions.</p>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Use of Service</h2>
            <p>Our service allows you to generate certificates in bulk. You are responsible for the content you upload and the accuracy of the data provided.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Intellectual Property</h2>
            <p>The design, code, and features of CERTIFY-AI are owned by Lexiontech. You retain ownership of the data you upload, but grant us the right to process it for the purpose of generating your certificates.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Prohibited Activities</h2>
            <p>You may not use our service for any illegal or unauthorized purpose. You must not attempt to hack, disable, or interfere with the proper working of the website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Disclaimer of Warranties</h2>
            <p>The service is provided "as is" without any warranties, express or implied. We do not guarantee that the service will be uninterrupted or error-free.</p>
          </section>
          
          <p className="pt-4 italic">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
