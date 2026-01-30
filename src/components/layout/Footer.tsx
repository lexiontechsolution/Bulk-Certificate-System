import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-400">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <span className="text-white font-semibold">CERTIFY-AI</span>
            <span>Bulk certificate generator for events, colleges & trainings.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-900 text-center md:text-left">
          <span>© {new Date().getFullYear()} Lexiontech · CERTIFY-AI. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
