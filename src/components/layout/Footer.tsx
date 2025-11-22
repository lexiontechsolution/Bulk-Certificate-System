const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-400 flex flex-col md:flex-row justify-between gap-3">
        <span>© {new Date().getFullYear()} Lexiontech · CERTIFY-AI</span>
        <span>Bulk certificate generator for events, colleges & trainings.</span>
      </div>
    </footer>
  );
};

export default Footer;
