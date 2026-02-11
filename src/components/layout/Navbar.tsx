import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">CERTIFY-AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/guides" className="hover:text-white transition-colors">Guides</Link>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app"
            className="text-sm px-4 py-2 rounded-lg bg-indigo-500 font-medium hover:bg-indigo-600 transition-colors"
          >
            Start Generating
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
