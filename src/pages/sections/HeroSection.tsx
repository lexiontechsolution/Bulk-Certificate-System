import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="border-b border-slate-900 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-indigo-300 mb-4">
            LEXIONTECH · BULK CERTIFICATE SYSTEM
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
            Generate & send certificates for{" "}
            <span className="text-indigo-400">thousands of participants</span>{" "}
            in minutes.
          </h1>
          <p className="text-slate-300 mb-6">
            CERTIFY-AI automates name merging, template design and bulk export,
            so your team can focus on running great events.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/app"
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-indigo-500"
            >
              Start Free Demo
            </Link>
            <a href="#how-it-works" className="text-sm text-slate-300 underline">
              See how it works
            </a>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            No credit card · Upload Excel · Export PDF/PNG
          </p>
        </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg">
  <div className="aspect-video rounded-lg overflow-hidden border border-slate-700">
    <video
      className="w-full h-full object-cover"
      src="/src/videos/Recording 2025-11-22 144209.mp4"
      autoPlay
      loop
      muted
      playsInline
    />
  </div>
</div>



      </div>
    </section>
  );
};

export default HeroSection;
