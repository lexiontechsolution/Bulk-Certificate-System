import React, { useState } from "react";
import { TextConfig, FontFamily } from "../types";
import {
  Type,
  Palette,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Users,
  ChevronDown,
  ChevronUp,
  Download,
  Loader2,
  Wand2,
} from "lucide-react";

interface ControlPanelProps {
  config: TextConfig;
  onConfigChange: (c: TextConfig) => void;
  names: string[];
  onNamesChange: (names: string[]) => void;
  onDownloadCurrent: () => void;
  onDownloadAll: () => void;
  isDownloading: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  onConfigChange,
  names,
  onNamesChange,
  onDownloadCurrent,
  onDownloadAll,
  isDownloading,
}) => {
  const [showDesign, setShowDesign] = useState(false);

  const handleNamesInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nameList = e.target.value.split("\n");
    onNamesChange(nameList);
  };

  const fonts = Object.values(FontFamily);

  // Helper to center text based on canvas width (assumed 800 for default base)
  const handleCenterText = () => {
    onConfigChange({ ...config, x: 400, textAlign: "center" });
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: NAME ENTRY & GENERATION (Primary Focus) */}
      <div className="bg-slate-900/80 p-6 rounded-xl shadow-lg shadow-black/40 border border-slate-700/80 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
        <h3 className="text-lg font-bold text-slate-50 mb-4 flex items-center gap-2">
          <Users className="text-indigo-400" size={20} />
          1. Enter Names
        </h3>

        <div className="flex flex-col gap-4">
          <div className="relative">
            <textarea
              value={names.join("\n")}
              onChange={handleNamesInput}
              placeholder="Enter each name on a new line..."
              className="w-full p-4 bg-slate-800 text-slate-100 border border-slate-600 rounded-lg text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none font-medium min-h-[120px] placeholder-slate-500"
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-400 pointer-events-none bg-slate-900/90 px-2 py-0.5 rounded">
              {names.filter((n) => n.trim()).length} names
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={onDownloadCurrent}
              className="flex items-center justify-center gap-2 bg-slate-100 text-slate-900 font-semibold py-3 px-4 rounded-lg hover:bg-white transition-all active:scale-[0.98]"
            >
              <Download size={18} />
              Generate This Certificate
            </button>

            {names.length > 1 && (
              <button
                onClick={onDownloadAll}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 bg-indigo-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-400 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/40"
              >
                {isDownloading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Wand2 size={18} />
                )}
                {isDownloading
                  ? "Processing..."
                  : `Bulk Generate All (${names
                      .filter((n) => n.trim())
                      .length})`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: DESIGN & STYLING (Secondary/Collapsible) */}
      <div className="bg-slate-900/80 rounded-xl shadow-md shadow-black/40 border border-slate-700/80 overflow-hidden">
        <button
          onClick={() => setShowDesign(!showDesign)}
          className="w-full flex items-center justify-between p-4 bg-slate-900 hover:bg-slate-800 transition-colors text-left"
        >
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Palette size={16} className="text-indigo-300" /> 2. Edit Design &
            Position
          </h3>
          {showDesign ? (
            <ChevronUp size={16} className="text-slate-400" />
          ) : (
            <ChevronDown size={16} className="text-slate-400" />
          )}
        </button>

        {showDesign && (
          <div className="p-6 space-y-6 animate-in slide-in-from-top-2">
            {/* Positioning Helper */}
            <div className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
              <span className="text-xs text-slate-200 font-medium">
                Text Position
              </span>
              <button
                onClick={handleCenterText}
                className="text-xs bg-slate-900 border border-indigo-400/60 text-indigo-300 px-2.5 py-1 rounded hover:bg-slate-800 font-semibold transition-colors"
              >
                Auto Center
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Font Family */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-200">
                  Font
                </label>
                <div className="relative">
                  <select
                    value={config.fontFamily}
                    onChange={(e) =>
                      onConfigChange({
                        ...config,
                        fontFamily: e.target.value,
                      })
                    }
                    className="w-full pl-3 pr-8 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
                  >
                    {fonts.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                  <Type
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Size & Color */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-200">
                    Size
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="200"
                    value={config.fontSize}
                    onChange={(e) =>
                      onConfigChange({
                        ...config,
                        fontSize: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-200">
                    Color
                  </label>
                  <div className="flex items-center h-[38px] bg-slate-800 border border-slate-600 rounded-lg px-2">
                    <input
                      type="color"
                      value={config.color}
                      onChange={(e) =>
                        onConfigChange({ ...config, color: e.target.value })
                      }
                      className="w-8 h-6 cursor-pointer bg-transparent border-none"
                    />
                    <span className="ml-2 text-xs text-slate-300 font-mono">
                      {config.color}
                    </span>
                  </div>
                </div>
              </div>

              {/* Alignment */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-200">
                  Text Align
                </label>
                <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
                  {(["left", "center", "right"] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() =>
                        onConfigChange({ ...config, textAlign: align })
                      }
                      className={`flex-1 p-1.5 rounded flex justify-center items-center transition-all ${
                        config.textAlign === align
                          ? "bg-slate-900 shadow-sm text-indigo-300"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {align === "left" && <AlignLeft size={16} />}
                      {align === "center" && <AlignCenter size={16} />}
                      {align === "right" && <AlignRight size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
