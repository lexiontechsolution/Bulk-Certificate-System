import React, { useState, useRef } from 'react';
import { 
  Upload, Sparkles, Loader2, FileText, CheckCircle, 
  X, ChevronLeft, ChevronRight, ArrowRight, LayoutTemplate, MousePointer2,
  Award, Palette, Users, Download
} from 'lucide-react';
import { CertificateCanvas } from './components/CertificateCanvas';
import { ControlPanel } from './components/ControlPanel';
import { generateTemplateImage } from './services/geminiService';
import { CertificateState, DEFAULT_CONFIG } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [state, setState] = useState<CertificateState>({
    templateImage: null,
    names: ['Student Name'],
    currentNameIndex: 0,
    config: DEFAULT_CONFIG,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handlers (keep your existing handlers exactly the same)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setState(prev => ({ ...prev, templateImage: event.target!.result as string }));
          setStep(2);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const imageUrl = await generateTemplateImage(aiPrompt);
      setState(prev => ({ ...prev, templateImage: imageUrl }));
      setShowAiModal(false);
      setStep(2);
    } catch (error) {
      console.error("Failed to generate template", error);
      alert("Failed to generate template. Please try again or check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCurrent = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `Certificate-${state.names[state.currentNameIndex].replace(/[^a-z0-9]/gi, '_') || 'Certificate'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const downloadAll = async () => {
    setIsDownloading(true);
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    const validNames = state.names.filter(n => n.trim() !== '');
    
    if (validNames.length > 20) {
        const confirm = window.confirm(`You are about to download ${validNames.length} files. This might trigger your browser's pop-up blocker. Continue?`);
        if(!confirm) {
            setIsDownloading(false);
            return;
        }
    }

    // Create offscreen canvas for batch processing
    const offscreen = document.createElement('canvas');
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const offCtx = offscreen.getContext('2d');
    
    // Load image once
    const img = new Image();
    img.src = state.templateImage || '';
    img.crossOrigin = "anonymous";
    
    await new Promise((resolve) => {
        if(img.complete) resolve(true);
        img.onload = () => resolve(true);
    });

    if(offCtx) {
        for (let i = 0; i < validNames.length; i++) {
            const name = validNames[i];
            
            // Clear
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
            // Draw Bg
            offCtx.drawImage(img, 0, 0, offscreen.width, offscreen.height);
            
            // Draw Text
            offCtx.font = `${state.config.fontSize}px "${state.config.fontFamily}"`;
            offCtx.fillStyle = state.config.color;
            offCtx.textAlign = state.config.textAlign;
            offCtx.textBaseline = 'middle';
            
            // Handle alignment position adjustment if needed
            offCtx.fillText(name, state.config.x, state.config.y);
            
            // Download
            const link = document.createElement('a');
            link.download = `Certificate_${name.replace(/[^a-z0-9]/gi, '_')}.png`;
            link.href = offscreen.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Delay to prevent browser choking
            await new Promise(r => setTimeout(r, 500));
        }
    }
    
    setIsDownloading(false);
    alert("Download process completed! Check your downloads folder.");
  };

  const renderStepIndicator = () => (
    <div className="w-full max-w-4xl mx-auto mb-16">
        <div className="relative flex items-center justify-between w-full px-8">
            {/* Progress Line */}
            <div className="absolute left-8 right-8 top-1/2 h-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 rounded-full"></div>
            <div 
                className="absolute left-8 top-1/2 h-1 bg-gradient-to-r from-blue-600 to-purple-600 -z-10 rounded-full transition-all duration-700 ease-out"
                style={{ width: step === 1 ? '0%' : '100%' }}
            ></div>
            
            {/* Step 1 */}
            <div className={`flex flex-col items-center gap-3 bg-slate-50/80 backdrop-blur-sm px-4 py-2 rounded-2xl border transition-all duration-500 ${step >= 1 ? 'border-blue-200 shadow-blue-100 shadow-lg' : 'border-slate-200'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 backdrop-blur-sm ${step >= 1 ? 'border-blue-600 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' : 'border-slate-300 bg-white'}`}>
                    {step > 1 ? <CheckCircle size={20} className="text-white" /> : <span className="font-bold text-sm">1</span>}
                </div>
                <div className="text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider block">Upload</span>
                    <span className="text-xs text-slate-500 mt-1">Template</span>
                </div>
            </div>

            {/* Step 2 */}
            <div className={`flex flex-col items-center gap-3 bg-slate-50/80 backdrop-blur-sm px-4 py-2 rounded-2xl border transition-all duration-500 ${step >= 2 ? 'border-purple-200 shadow-purple-100 shadow-lg' : 'border-slate-200'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 backdrop-blur-sm ${step >= 2 ? 'border-purple-600 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25' : 'border-slate-300 bg-white'}`}>
                    <span className="font-bold text-sm">2</span>
                </div>
                <div className="text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider block">Customize</span>
                    <span className="text-xs text-slate-500 mt-1">& Generate</span>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 text-slate-900 font-sans">
      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm shadow-slate-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Award className="text-white w-6 h-6" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Bulk Certificate System</h1>
              <p className="text-xs text-slate-500 font-medium">Professional Certificater</p>
            </div>
          </div>
          
          {step === 2 && (
            <button 
              onClick={() => {
                  if(window.confirm("Going back will reset your current work. Continue?")) {
                      setStep(1);
                      setState(prev => ({...prev, templateImage: null}));
                  }
              }}
              className="text-sm text-slate-600 hover:text-slate-800 font-medium flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-200/60 hover:border-slate-300 transition-all hover:shadow-md"
            >
              <ChevronLeft size={16} /> New Project
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {renderStepIndicator()}

        {step === 1 ? (
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
                Create Stunning Certificates
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Transform your recognition programs with professional, customizable certificates in minutes.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Upload Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/60 p-8 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col items-center text-center h-full group-hover:scale-[1.02]"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner border border-blue-200/50">
                    <Upload className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">Upload Template</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    Already have a design? Upload your certificate template to get started.
                  </p>
                  <button className="mt-auto w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-700">
                    Choose File
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload} 
                  />
                </div>
              </div>

              {/* AI Generate Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div 
                  onClick={() => setShowAiModal(true)}
                  className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/60 p-8 hover:border-purple-400 hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col items-center text-center h-full group-hover:scale-[1.02]"
                >
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    AI POWERED
                  </div>
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner border border-purple-200/50">
                    <Sparkles className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">AI Generate</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    Let AI create a beautiful certificate template based on your description.
                  </p>
                  <button className="mt-auto w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group-hover:from-purple-600 group-hover:to-pink-600">
                    Create with AI
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="max-w-2xl mx-auto mt-16 grid grid-cols-3 gap-8 text-center">
              <div className="text-slate-600">
                <div className="text-2xl font-bold text-slate-800">500+</div>
                <div className="text-sm">Templates Created</div>
              </div>
              <div className="text-slate-600">
                <div className="text-2xl font-bold text-slate-800">98%</div>
                <div className="text-sm">Satisfaction Rate</div>
              </div>
              <div className="text-slate-600">
                <div className="text-2xl font-bold text-slate-800">5min</div>
                <div className="text-sm">Average Setup</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 animate-in fade-in duration-500">
            {/* Preview Section */}
            <div className="xl:col-span-8 flex flex-col gap-6 order-2 xl:order-1">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-slate-200/60 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <LayoutTemplate size={20} className="text-white"/> 
                      </div>
                      Live Preview
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Drag to position the name on your certificate</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 text-sm text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-200/60">
                      <Users size={16} className="text-slate-400" />
                      <span className="font-semibold text-slate-800 max-w-[120px] truncate">
                        {state.names[state.currentNameIndex] || 'Enter Name'}
                      </span>
                      <span className="text-slate-400">
                        {state.currentNameIndex + 1} of {state.names.length}
                      </span>
                    </div>
                    
                    <div className="flex gap-1">
                      <button 
                        disabled={state.currentNameIndex === 0}
                        onClick={() => setState(s => ({...s, currentNameIndex: Math.max(0, s.currentNameIndex - 1)}))}
                        className="p-3 hover:bg-slate-100 rounded-xl disabled:opacity-30 border border-slate-200/60 transition-all hover:shadow-md"
                      >
                        <ChevronLeft size={18}/>
                      </button>
                      <button 
                        disabled={state.currentNameIndex >= state.names.length - 1}
                        onClick={() => setState(s => ({...s, currentNameIndex: Math.min(s.names.length - 1, s.currentNameIndex + 1)}))}
                        className="p-3 hover:bg-slate-100 rounded-xl disabled:opacity-30 border border-slate-200/60 transition-all hover:shadow-md"
                      >
                        <ChevronRight size={18}/>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex justify-center bg-gradient-to-br from-slate-100 to-slate-200/50 rounded-2xl overflow-hidden border border-slate-200/60 p-2 min-h-[500px] items-center">
                  {state.templateImage ? (
                    <>
                      <CertificateCanvas 
                        templateImage={state.templateImage}
                        name={state.names[state.currentNameIndex] || ''}
                        config={state.config}
                        onConfigChange={(newConfig) => setState(s => ({ ...s, config: newConfig }))}
                        width={800}
                      />
                      <div className="absolute bottom-6 left-6 bg-black/70 text-white text-sm px-4 py-2.5 rounded-full pointer-events-none backdrop-blur-sm flex items-center gap-3 border border-white/20">
                        <MousePointer2 size={14} /> 
                        <span>Click & Drag to position text</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center gap-3">
                      <FileText size={48} className="opacity-20" />
                      <p>No template loaded</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Control Panel Sidebar */}
            <div className="xl:col-span-4 space-y-6 order-1 xl:order-2">
              <ControlPanel 
                config={state.config}
                onConfigChange={(newConfig) => setState(s => ({ ...s, config: newConfig }))}
                names={state.names}
                onNamesChange={(newNames) => setState(s => ({ ...s, names: newNames }))}
                onDownloadCurrent={downloadCurrent}
                onDownloadAll={downloadAll}
                isDownloading={isDownloading}
              />
              
              <div className="text-center text-sm text-slate-500 px-4">
                Need a different template?{' '}
                <button 
                  onClick={() => setStep(1)} 
                  className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2 transition-colors"
                >
                  Go back to Step 1
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-0 overflow-hidden transform transition-all scale-100 border border-slate-200/60">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-purple-50 to-pink-50/50">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Sparkles className="text-white w-6 h-6" />
                  </div>
                  AI Template Generator
                </h3>
                <p className="text-slate-600 mt-2">Describe your perfect certificate design</p>
              </div>
              <button 
                onClick={() => setShowAiModal(false)} 
                className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-white/50 rounded-xl"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 text-purple-900 text-sm flex gap-4 items-start">
                <Sparkles size={24} className="shrink-0 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">AI Design Tips:</p>
                  <p>Be specific about colors, style, occasion, and any design elements you want included.</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide ml-1">Your Design Description</label>
                <textarea 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none h-40 text-base transition-shadow placeholder-slate-400"
                  placeholder="Example: A modern professional certificate for employee recognition with blue and gold colors, elegant borders, and space for company logo..."
                />
                <div className="text-xs text-slate-500 text-right">
                  {aiPrompt.length}/500 characters
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50/80 border-t border-slate-100 flex gap-4">
              <button 
                onClick={() => setShowAiModal(false)}
                className="flex-1 py-4 bg-white border border-slate-300 text-slate-700 font-semibold rounded-2xl hover:bg-slate-100 transition-all duration-300 hover:shadow-md"
              >
                Cancel
              </button>
              <button 
                onClick={handleAiGenerate}
                disabled={isGenerating || !aiPrompt}
                className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex justify-center items-center gap-3 disabled:opacity-50 disabled:shadow-none"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Generating Design...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} /> Generate Template
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;