import React, { useState } from 'react';
import { TextConfig, FontFamily } from '../types';
import { Type, Palette, AlignCenter, AlignLeft, AlignRight, UserPlus, Users, ChevronDown, ChevronUp, Download, Loader2, Wand2 } from 'lucide-react';

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
    const nameList = e.target.value.split('\n');
    onNamesChange(nameList);
  };

  const fonts = Object.values(FontFamily);
  
  // Helper to center text based on canvas width (assumed 800 for default base)
  const handleCenterText = () => {
    onConfigChange({ ...config, x: 400, textAlign: 'center' });
  };

  return (
    <div className="space-y-6">
      
      {/* SECTION 1: NAME ENTRY & GENERATION (Primary Focus) */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Users className="text-blue-600" size={20} /> 
            1. Enter Names
        </h3>
        
        <div className="flex flex-col gap-4">
            <div className="relative">
                <textarea
                    value={names.join('\n')}
                    onChange={handleNamesInput}
                    placeholder="Enter student name here..."
                    className="w-full p-4 bg-slate-50 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-medium min-h-[120px]"
                />
                <div className="absolute bottom-3 right-3 text-xs text-slate-400 pointer-events-none bg-white/80 px-1 rounded">
                    {names.filter(n => n.trim()).length} names
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                 <button 
                    onClick={onDownloadCurrent}
                    className="flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-slate-900 transition-all active:scale-[0.98]"
                >
                    <Download size={18} />
                    Generate This Certificate
                </button>
                
                {names.length > 1 && (
                    <button 
                        onClick={onDownloadAll}
                        disabled={isDownloading}
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
                    >
                        {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
                        {isDownloading ? 'Processing...' : `Bulk Generate All (${names.filter(n => n.trim()).length})`}
                    </button>
                )}
            </div>
        </div>
      </div>

      {/* SECTION 2: DESIGN & STYLING (Secondary/Collapsible) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <button 
            onClick={() => setShowDesign(!showDesign)}
            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
        >
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                <Palette size={16} /> 2. Edit Design & Position
            </h3>
            {showDesign ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>}
        </button>
        
        {showDesign && (
            <div className="p-6 space-y-6 animate-in slide-in-from-top-2">
                {/* Positioning Helper */}
                <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <span className="text-xs text-blue-800 font-medium">Text Position</span>
                    <button 
                        onClick={handleCenterText}
                        className="text-xs bg-white border border-blue-200 text-blue-600 px-2 py-1 rounded hover:bg-blue-50 font-semibold"
                    >
                        Auto Center
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                {/* Font Family */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-700">Font</label>
                    <div className="relative">
                        <select
                            value={config.fontFamily}
                            onChange={(e) => onConfigChange({ ...config, fontFamily: e.target.value })}
                            className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                        >
                            {fonts.map((f) => (
                            <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                        <Type size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                    </div>
                </div>

                {/* Size & Color */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-700">Size</label>
                        <input
                        type="number"
                        min="10"
                        max="200"
                        value={config.fontSize}
                        onChange={(e) => onConfigChange({ ...config, fontSize: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-700">Color</label>
                        <div className="flex items-center h-[38px] bg-white border border-slate-200 rounded-lg px-2">
                            <input
                                type="color"
                                value={config.color}
                                onChange={(e) => onConfigChange({ ...config, color: e.target.value })}
                                className="w-8 h-6 cursor-pointer"
                            />
                            <span className="ml-2 text-xs text-slate-500 font-mono">{config.color}</span>
                        </div>
                    </div>
                </div>

                {/* Alignment */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-700">Text Align</label>
                    <div className="flex bg-slate-100 rounded-lg p-1">
                    {(['left', 'center', 'right'] as const).map((align) => (
                        <button
                        key={align}
                        onClick={() => onConfigChange({ ...config, textAlign: align })}
                        className={`flex-1 p-1.5 rounded flex justify-center items-center transition-all ${
                            config.textAlign === align ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'
                        }`}
                        >
                        {align === 'left' && <AlignLeft size={16} />}
                        {align === 'center' && <AlignCenter size={16} />}
                        {align === 'right' && <AlignRight size={16} />}
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