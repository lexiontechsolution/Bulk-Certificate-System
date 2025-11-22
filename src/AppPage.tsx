import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import CertificateApp from "../src/components/certificate/CertificateApp";

const AppPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Navbar />
      <main className="flex-1">
        <CertificateApp />
      </main>
      <Footer />
    </div>
  );
};

export default AppPage;
