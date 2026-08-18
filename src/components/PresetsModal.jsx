import React from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { PROJECT_PRESETS } from '../data/ledCatalog';

export default function PresetsModal({ isOpen, onClose, onSelectPreset }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-[0_0_50px_rgba(0,243,255,0.25)] space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h2 className="text-sm font-bold tracking-wide uppercase text-white">
              Projetos Prontos & Presets Comerciais
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of presets */}
        <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {PROJECT_PRESETS.map((preset, index) => (
            <div
              key={index}
              className="bg-slate-950/80 rounded-xl border border-cyan-500/20 p-4 hover:border-cyan-400 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3 group"
            >
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-2 group-hover:text-cyan-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{preset.description}</p>
                <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-cyan-400">
                  <span className="bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    Pitch {preset.pitchId}
                  </span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                    Dimensão: {preset.targetWidthM}m × {preset.targetHeightM}m
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className="btn-cyber-primary text-xs py-2 whitespace-nowrap self-end md:self-center"
              >
                <span>Carregar Projeto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
