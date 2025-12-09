import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { 
  Sparkles, Zap, CheckCircle, Shield, 
  Award, Mail, FileText, CloudUpload,
  ChevronRight, PlayCircle,
  Users, Clock, Download, Eye
} from "lucide-react";

const HeroSection = () => {
  const [currentName, setCurrentName] = useState("Alexandra Chen");
  const names = [
    "Alexandra Chen",
    "Marcus Rodriguez",
    "Sarah Johnson",
    "David Kim",
    "Priya Sharma",
    "James Wilson"
  ];
  const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentName(prev => {
        const currentIndex = names.indexOf(prev);
        return names[(currentIndex + 1) % names.length];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.5 ? '#6366f1' : '#8b5cf6';
        this.alpha = Math.random() * 0.2 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
        
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance/100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Animated */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 animate-fade-in">
              <div className="relative">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-spin-slow" />
                <div className="absolute inset-0 bg-indigo-400 blur-lg"></div>
              </div>
              <span className="text-sm font-semibold tracking-wider text-indigo-300 animate-pulse">
                AI-POWERED CERTIFICATE GENERATION
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-white mb-4">Transform Names</span>
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                  Into Certificates
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"></span>
              </span>
              <span className="block text-slate-300 text-4xl mt-6">In Seconds, Not Hours</span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Upload your participant list and watch as our AI instantly generates 
              professional certificates—ready for download or direct email delivery.
            </p>

            {/* Animated Process Steps */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CloudUpload className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 blur-sm opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    1. Upload Excel/CSV
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Drag & drop your participant list
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </div>

              <div className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 blur-sm opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    2. AI Processes Names
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Intelligent template matching & merging
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </div>

              <div className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 blur-sm opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-pink-300 transition-colors">
                    3. Download & Distribute
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Bulk export PDF/PNG or email directly
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Link
                to="/app"
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Launch Live Demo
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 rounded-2xl blur-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </Link>
              
             <a
  href="https://youtu.be/NBpFG6aZ4FQ?si=CiLJPJ_iO5Eb1mi5"
  target="_blank"
  rel="noopener noreferrer"
  className="px-8 py-4 rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-sm text-slate-300 font-semibold text-lg hover:bg-slate-800/50 hover:border-slate-600 hover:text-white transition-all duration-300 group flex items-center justify-center gap-2"
>
  <Eye className="w-5 h-5 group-hover:animate-pulse" />
  Watch Tutorial
</a>
            </div>

            {/* Live Stats */}
            <div className="pt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-indigo-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">12.5K+</div>
                      <div className="text-xs text-slate-400">Certificates Today</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-purple-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">47s</div>
                      <div className="text-xs text-slate-400">Avg. Generation</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-cyan-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">99.7%</div>
                      <div className="text-xs text-slate-400">Accuracy Rate</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-800 hover:border-green-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Mail className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">8.2K</div>
                      <div className="text-xs text-slate-400">Emails Sent</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Certificate Showcase */}
          <div className="relative">
            {/* Floating Certificate Stack */}
            <div className="relative h-[600px]">
              {/* Backmost certificate */}
              <div className="absolute top-8 left-4 w-full h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 border border-slate-700 shadow-2xl rotate-[-3deg] opacity-40">
                <div className="h-full border-2 border-dashed border-slate-700 rounded-2xl"></div>
              </div>
              
              {/* Middle certificate */}
              <div className="absolute top-4 left-2 w-full h-[500px] bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-6 border border-slate-600 shadow-2xl rotate-[-1deg] opacity-60">
                <div className="h-full border-2 border-dashed border-slate-600 rounded-2xl"></div>
              </div>
              
              {/* Front certificate - Main */}
              <div className="relative z-10 w-full h-[500px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-600 shadow-2xl overflow-hidden">
                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl p-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent animate-gradient-x"></div>
                
                {/* Certificate content */}
                <div className="relative h-full bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-8">
                  {/* Animated name */}
                  <div className="text-center mb-8">
                    <div className="text-xs text-slate-500 mb-2">CERTIFICATE OF ACHIEVEMENT</div>
                    <div className="text-2xl font-bold text-slate-300 mb-6">Awarded To</div>
                    <div className="relative h-16 mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                          {currentName}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Certificate details */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-lg text-slate-400 mb-2">For outstanding participation in</div>
                      <div className="text-xl font-semibold text-white">AI & Machine Learning Summit 2024</div>
                    </div>
                    
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Date of Issue</div>
                        <div className="text-lg font-semibold text-slate-300">Dec 15, 2025</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Certificate ID</div>
                        <div className="text-lg font-semibold text-cyan-300">CERT-2024-{Math.floor(Math.random() * 10000)}</div>
                      </div>
                    </div>
                    
                    {/* Animated progress indicator */}
                    <div className="pt-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Processing batch of 1,247 certificates</span>
                        <span className="text-sm font-semibold text-green-400 animate-pulse">
                          <Sparkles className="w-4 h-4 inline mr-1" />
                          LIVE
                        </span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-progress"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>Format: PDF/PNG</span>
                        <span>Estimated: 1m 15s</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating AI badge */}
                  <div className="absolute top-4 right-4 animate-bounce-slow">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-sm">
                      <Zap className="w-3 h-3 text-indigo-300" />
                      <span className="text-xs font-medium text-indigo-300">AI GENERATING</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -right-6 animate-float">
                <div className="w-40 h-32 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 border border-slate-700 shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white">Verified</span>
                  </div>
                  <div className="text-xs text-slate-400">Each certificate includes digital verification</div>
                </div>
              </div>
              
              <div className="absolute -top-8 left-0 animate-float delay-1000">
                <div className="w-36 h-28 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 border border-slate-700 shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white">Auto-Send</span>
                  </div>
                  <div className="text-xs text-slate-400">Direct email delivery available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add these styles to your global CSS or a style tag */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite alternate;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;