import React, { useState } from 'react';
import { 
  Layers, 
  Eye, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  DollarSign, 
  Monitor,
  ArrowRight
} from 'lucide-react';
import { PITCH_PRESETS, calculateLEDDisplay } from '../data/ledCatalog';

export default function PitchComparator({ targetWidthM, targetHeightM, cabinetId, onSelectPitch }) {
  // Comparing 3 selected pitches side-by-side
  const [selectedPitches, setSelectedPitches] = useState(['P1.25', 'P1.56', 'P2.5']);

  const togglePitch = (pitchId) => {
    if (selectedPitches.includes(pitchId)) {
      if (selectedPitches.length > 1) {
        setSelectedPitches(selectedPitches.filter(id => id !== pitchId));
      }
    } else {
      if (selectedPitches.length < 4) {
        setSelectedPitches([...selectedPitches, pitchId]);
      }
    }
  };

  return (
    <div className="cyber-card p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            <h2 className="text-lg font-bold tracking-wide uppercase text-white">
              Comparador de Pixel Pitch & Definição Visual
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compare o impacto de resolução, densidade de pixels e distância de visão para as mesmas dimensões ({targetWidthM}m × {targetHeightM}m).
          </p>
        </div>

        {/* Pitch Picker Chips */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-cyan-500/20">
          {PITCH_PRESETS.map((p) => {
            const isSelected = selectedPitches.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => togglePitch(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,243,255,0.5)] font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {p.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {selectedPitches.map((pitchId) => {
          const compResult = calculateLEDDisplay({
            pitchId,
            cabinetW_mm: cabinetId === '600x337.5' ? 600 : cabinetId === '500x500' ? 500 : 640,
            cabinetH_mm: cabinetId === '600x337.5' ? 337.5 : cabinetId === '500x500' ? 500 : 480,
            targetWidthM,
            targetHeightM
          });

          const pitch = compResult.pitchData;
          const minViewDistanceM = (pitch.pitch * 0.9).toFixed(1);
          const optimalViewDistanceM = (pitch.pitch * 1.8).toFixed(1);
          const pixelDensitySqm = Math.round(pitch.pixelsPerMeter * pitch.pixelsPerMeter);

          return (
            <div
              key={pitchId}
              className="bg-slate-950/90 rounded-2xl border border-cyan-500/30 p-5 flex flex-col justify-between hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,243,255,0.15)] group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xl font-extrabold font-mono text-cyan-400 glow-text-cyan">
                      {pitch.id}
                    </span>
                    <span className="block text-[11px] text-slate-400">{pitch.category}</span>
                  </div>
                  <span className={`badge-resolution ${compResult.resBadge.class}`}>
                    {compResult.resBadge.label}
                  </span>
                </div>

                {/* Micro Visual Simulation Preview Box */}
                <div className="visualizer-canvas-container h-28 rounded-lg mb-4 flex items-center justify-center p-2 relative overflow-hidden border border-cyan-500/20">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                  
                  {/* Simulated Pixel Grid Density Graphic */}
                  <div 
                    className="w-full h-full flex items-center justify-center font-mono text-cyan-400 font-bold text-sm tracking-widest text-center"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(0,243,255,0.8) ${Math.max(1, 4 - pitch.pitch)}px, transparent ${Math.max(2, 6 - pitch.pitch)}px)`,
                      backgroundSize: `${Math.max(4, pitch.pitch * 4)}px ${Math.max(4, pitch.pitch * 4)}px`
                    }}
                  >
                    <span className="bg-slate-950/80 px-2 py-1 rounded text-xs z-20 border border-cyan-500/40">
                      {compResult.totalPixelsH} × {compResult.totalPixelsV} px
                    </span>
                  </div>
                </div>

                {/* Specs List */}
                <div className="space-y-2.5 text-xs font-mono text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Total Pixels:</span>
                    <span className="font-bold text-white">{compResult.totalPixelCount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Densidade de Pixels:</span>
                    <span className="font-bold text-cyan-300">{pixelDensitySqm.toLocaleString()} px/m²</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-indigo-400" />
                      Distância Mínima:
                    </span>
                    <span className="font-bold text-indigo-300">{minViewDistanceM} metros</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Consumo Max:
                    </span>
                    <span className="font-bold text-amber-300">{(compResult.maxPowerWatts / 1000).toFixed(2)} kW</span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Brilho Máximo:</span>
                    <span className="font-bold text-emerald-300">{pitch.brightness} nits</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectPitch(pitchId)}
                className="btn-cyber-secondary w-full justify-center mt-5 text-xs group-hover:bg-cyan-500 group-hover:text-slate-950 font-bold transition-all"
              >
                <span>Selecionar {pitchId} para o Projeto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
