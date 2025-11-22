import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">CERTIFY-AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app"
            className="text-sm px-4 py-2 rounded-lg bg-indigo-500 font-medium"
          >
            Start Generating
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
