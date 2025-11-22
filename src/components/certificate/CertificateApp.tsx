import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  LayoutTemplate,
  MousePointer2,
  Users,
} from "lucide-react";
import { CertificateCanvas } from "../CertificateCanvas";
import { ControlPanel } from "../ControlPanel";
import { CertificateState, DEFAULT_CONFIG } from "../../types";

const CertificateApp: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [state, setState] = useState<CertificateState>({
    templateImage: null,
    names: ["Student Name"],
    currentNameIndex: 0,
    config: DEFAULT_CONFIG,
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setState((prev) => ({
            ...prev,
            templateImage: event.target!.result as string,
          }));
          setStep(2);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadCurrent = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = `${
        state.names[state.currentNameIndex].replace(/[^a-z0-9]/gi, "_") ||
        "Certificate"
      }.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const downloadAll = async () => {
    setIsDownloading(true);
    const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas) {
      setIsDownloading(false);
      return;
    }

    const validNames = state.names.filter((n) => n.trim() !== "");

    if (validNames.length > 20) {
      const confirmBulk = window.confirm(
        `You are about to download ${validNames.length} files. This might trigger your browser's pop-up blocker. Continue?`
      );
      if (!confirmBulk) {
        setIsDownloading(false);
        return;
      }
    }

    const offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const offCtx = offscreen.getContext("2d");

    const img = new Image();
    img.src = state.templateImage || "";
    img.crossOrigin = "anonymous";

    await new Promise((resolve) => {
      if (img.complete) resolve(true);
      img.onload = () => resolve(true);
    });

    if (offCtx) {
      for (let i = 0; i < validNames.length; i++) {
        const name = validNames[i];

        offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
        offCtx.drawImage(img, 0, 0, offscreen.width, offscreen.height);

        offCtx.font = `${state.config.fontSize}px "${state.config.fontFamily}"`;
        offCtx.fillStyle = state.config.color;
        offCtx.textAlign = state.config.textAlign;
        offCtx.textBaseline = "middle";

        offCtx.fillText(name, state.config.x, state.config.y);

        const link = document.createElement("a");
        link.download = `Certificate_${name.replace(/[^a-z0-9]/gi, "_")}.png`;
        link.href = offscreen.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        await new Promise((r) => setTimeout(r, 500));
      }
    }

    setIsDownloading(false);
    alert("Download process completed! Check your downloads folder.");
  };

  const renderStepIndicator = () => (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="relative flex items-center justify-between w-full px-4 md:px-8">
        {/* Progress Line */}
        <div className="absolute left-4 right-4 md:left-8 md:right-8 top-1/2 h-1 bg-slate-800 rounded-full -z-10" />
        <div
          className="absolute left-4 md:left-8 top-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full -z-10 transition-all duration-700 ease-out"
          style={{ width: step === 1 ? "0%" : "100%" }}
        />

        {/* Step 1 */}
        <div
          className={`flex flex-col items-center gap-3 bg-slate-900/70 backdrop-blur-sm px-4 py-2 rounded-2xl border transition-all duration-500 ${
            step >= 1
              ? "border-blue-500/60 shadow-[0_0_25px_rgba(59,130,246,0.35)]"
              : "border-slate-700"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 backdrop-blur-sm ${
              step >= 1
                ? "border-blue-400 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/40"
                : "border-slate-600 bg-slate-900"
            }`}
          >
            {step > 1 ? (
              <CheckCircle size={20} className="text-white" />
            ) : (
              <span className="font-bold text-sm">1</span>
            )}
          </div>
          <div className="text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider block text-slate-200">
              Upload
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Template
            </span>
          </div>
        </div>

        {/* Step 2 */}
        <div
          className={`flex flex-col items-center gap-3 bg-slate-900/70 backdrop-blur-sm px-4 py-2 rounded-2xl border transition-all duration-500 ${
            step >= 2
              ? "border-purple-500/60 shadow-[0_0_25px_rgba(168,85,247,0.35)]"
              : "border-slate-700"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 backdrop-blur-sm ${
              step >= 2
                ? "border-purple-400 bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-lg shadow-purple-500/40"
                : "border-slate-600 bg-slate-900"
            }`}
          >
            <span className="font-bold text-sm">2</span>
          </div>
          <div className="text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider block text-slate-200">
              Customize
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              & Generate
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Page title / intro (under global navbar) */}
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-indigo-400/80 uppercase mb-3">
          Bulk Certificate System
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-50 mb-3">
          Design once. Generate for everyone.
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
          Upload your certificate template, drag the recipient name into
          position, and export certificates for your entire list in a few
          clicks.
        </p>
      </div>

      {renderStepIndicator()}

      {step === 1 ? (
        <div className="max-w-3xl mx-auto">
          {/* Upload card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 via-indigo-500/30 to-purple-600/40 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/70 p-8 md:p-10 hover:border-indigo-400/80 hover:shadow-[0_0_45px_rgba(99,102,241,0.45)] transition-all duration-500 cursor-pointer flex flex-col items-center text-center group-hover:scale-[1.01]"
            >
              <div className="w-24 h-24 bg-slate-900 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner border border-slate-700">
                <Upload className="w-10 h-10 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-50 mb-3">
                Upload Certificate Template
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed text-sm md:text-base max-w-xl">
                Use any PNG or JPG certificate design. You’ll position the name
                exactly where it should appear on the template.
              </p>
              <button className="mt-auto w-full md:w-auto py-3.5 px-8 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold rounded-2xl hover:from-indigo-400 hover:to-violet-400 hover:shadow-[0_15px_35px_rgba(129,140,248,0.4)] transition-all duration-300 text-sm md:text-base">
                Choose File
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <p className="mt-3 text-[11px] text-slate-500">
                Recommended: 16:9 or A4 certificate image · PNG / JPG
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="max-w-2xl mx-auto mt-12 grid grid-cols-3 gap-6 text-center">
            <div className="text-slate-400">
              <div className="text-xl font-semibold text-slate-50">500+</div>
              <div className="text-[11px] uppercase tracking-wide text-slate-500">
                Templates Processed
              </div>
            </div>
            <div className="text-slate-400">
              <div className="text-xl font-semibold text-slate-50">98%</div>
              <div className="text-[11px] uppercase tracking-wide text-slate-500">
                Time Saved
              </div>
            </div>
            <div className="text-slate-400">
              <div className="text-xl font-semibold text-slate-50">5 min</div>
              <div className="text-[11px] uppercase tracking-wide text-slate-500">
                Avg. Setup
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Preview Section */}
          <div className="xl:col-span-8 flex flex-col gap-6 order-2 xl:order-1">
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-lg shadow-black/40 border border-slate-800 p-6 md:p-7">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-slate-50 flex items-center gap-3">
                    <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40">
                      <LayoutTemplate size={20} className="text-white" />
                    </span>
                    Live Certificate Preview
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 mt-1">
                    Drag the name label on the preview to set its exact
                    position.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-3 text-xs md:text-sm text-black-200 bg-black-900/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-black-700/80">
                    <Users size={16} className="text-black-400" />
                    <span className="font-medium text-black-50 max-w-[150px] truncate">
                      {state.names[state.currentNameIndex] || "Enter Name"}
                    </span>
                    <span className="text-black-500">
                      {state.currentNameIndex + 1} of {state.names.length}
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      disabled={state.currentNameIndex === 0}
                      onClick={() =>
                        setState((s) => ({
                          ...s,
                          currentNameIndex: Math.max(0, s.currentNameIndex - 1),
                        }))
                      }
                      className="p-2.5 rounded-xl border border-black-700/80 text-black-200 hover:bg-black-800/80 disabled:opacity-30 disabled:hover:bg-transparent transition-all shadow-sm hover:shadow-md shadow-black/20"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      disabled={state.currentNameIndex >= state.names.length - 1}
                      onClick={() =>
                        setState((s) => ({
                          ...s,
                          currentNameIndex: Math.min(
                            s.names.length - 1,
                            s.currentNameIndex + 1
                          ),
                        }))
                      }
                      className="p-2.5 rounded-xl border border-black-700/80 text-slate-200 hover:bg-slate-800/80 disabled:opacity-30 disabled:hover:bg-transparent transition-all shadow-sm hover:shadow-md shadow-black/20"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center bg-gradient-to-br from-slate-950 to-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-2 min-h-[480px] items-center">
                {state.templateImage ? (
                  <>
                    <CertificateCanvas
                      templateImage={state.templateImage}
                      name={state.names[state.currentNameIndex] || ""}
                      config={state.config}
                      onConfigChange={(newConfig) =>
                        setState((s) => ({ ...s, config: newConfig }))
                      }
                      width={800}
                    />
                    <div className="absolute bottom-5 left-5 bg-black/80 text-[11px] md:text-xs text-slate-100 px-3.5 py-2 rounded-full pointer-events-none backdrop-blur-sm flex items-center gap-2 border border-white/10">
                      <MousePointer2 size={14} />{" "}
                      <span>Click & drag the name to reposition</span>
                    </div>
                  </>
                ) : (
                  <div className="text-slate-500 flex flex-col items-center gap-3">
                    <FileText size={40} className="opacity-30" />
                    <p className="text-sm">No template loaded yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Control Panel Sidebar */}
          <div className="xl:col-span-4 space-y-6 order-1 xl:order-2">
            <ControlPanel
              config={state.config}
              onConfigChange={(newConfig) =>
                setState((s) => ({ ...s, config: newConfig }))
              }
              names={state.names}
              onNamesChange={(newNames) =>
                setState((s) => ({ ...s, names: newNames }))
              }
              onDownloadCurrent={downloadCurrent}
              onDownloadAll={downloadAll}
              isDownloading={isDownloading}
            />

            <div className="text-center text-xs md:text-sm text-slate-400 px-2">
              Need a different template?{" "}
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Going back will reset the current project. Continue?"
                    )
                  ) {
                    setStep(1);
                    setState((prev) => ({ ...prev, templateImage: null }));
                  }
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2 transition-colors"
              >
                Start a new project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateApp;
