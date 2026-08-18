import React from 'react';
import { 
  Sliders, 
  Ruler, 
  Tv, 
  Grid3X3, 
  Sparkles, 
  HelpCircle, 
  DollarSign,
  Cpu,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { PITCH_PRESETS, CABINET_SIZES } from '../data/ledCatalog';

export default function PrimaryCalculator({
  pitchId,
  setPitchId,
  cabinetId,
  setCabinetId,
  calculationMode,
  setCalculationMode,
  targetWidthM,
  setTargetWidthM,
  targetHeightM,
  setTargetHeightM,
  targetRatioStr,
  setTargetRatioStr,
  targetDiagonalInches,
  setTargetDiagonalInches,
  customCols,
  setCustomCols,
  customRows,
  setCustomRows,
  calcResult,
  onGenerateProposal
}) {
  const currentPitch = PITCH_PRESETS.find(p => p.id === pitchId) || PITCH_PRESETS[3];
  const currentCabinet = CABINET_SIZES.find(c => c.id === cabinetId) || CABINET_SIZES[0];

  // Helper when user selects aspect ratio + diagonal inches
  const handleDiagonalChange = (inchesStr) => {
    const inches = parseFloat(inchesStr) || 138;
    setTargetDiagonalInches(inches);
    
    // Convert diagonal inches + ratio to width & height in meters
    // Ratio W:H
    let ratioW = 16;
    let ratioH = 9;
    if (targetRatioStr === '32:9') { ratioW = 32; ratioH = 9; }
    else if (targetRatioStr === '4:3') { ratioW = 4; ratioH = 3; }
    else if (targetRatioStr === '21:9') { ratioW = 21; ratioH = 9; }
    else if (targetRatioStr === '1:1') { ratioW = 1; ratioH = 1; }

    const angle = Math.atan(ratioH / ratioW);
    const diagonalMeters = (inches * 25.4) / 1000;
    const w = diagonalMeters * Math.cos(angle);
    const h = diagonalMeters * Math.sin(angle);

    setTargetWidthM(parseFloat(w.toFixed(2)));
    setTargetHeightM(parseFloat(h.toFixed(2)));
  };

  const handleRatioSelect = (ratio) => {
    setTargetRatioStr(ratio);
    handleDiagonalChange(targetDiagonalInches);
  };

  return (
    <div className="cyber-card p-5 h-full flex flex-col justify-between">
      <div>
        {/* Title */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold tracking-wide uppercase text-white">
              Parâmetros do Painel de LED
            </h2>
          </div>
          <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
            {currentPitch.category}
          </span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mb-5">
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Modo de Cálculo do Projeto:
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-cyan-500/20">
            <button
              onClick={() => setCalculationMode('dimensions')}
              className={`px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                calculationMode === 'dimensions'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,243,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Dimensões (m)</span>
            </button>

            <button
              onClick={() => {
                setCalculationMode('aspectRatio');
                handleDiagonalChange(targetDiagonalInches);
              }}
              className={`px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                calculationMode === 'aspectRatio'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,243,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Proporção & Polegadas</span>
            </button>

            <button
              onClick={() => setCalculationMode('grid')}
              className={`px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                calculationMode === 'grid'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,243,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Gabinetes Exatos</span>
            </button>
          </div>
        </div>

        {/* Dynamic Inputs based on Calculation Mode */}
        {calculationMode === 'dimensions' && (
          <div className="space-y-4 mb-5">
            {/* Target Width */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-slate-300 font-semibold">Largura Alvo (Metros):</span>
                <span className="text-cyan-400 font-mono font-bold text-sm">{targetWidthM} m</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="20"
                step="0.1"
                value={targetWidthM}
                onChange={(e) => setTargetWidthM(parseFloat(e.target.value))}
                className="cyber-slider"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0.5m</span>
                <span>5m</span>
                <span>10m</span>
                <span>15m</span>
                <span>20m</span>
              </div>
            </div>

            {/* Target Height */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-slate-300 font-semibold">Altura Alvo (Metros):</span>
                <span className="text-cyan-400 font-mono font-bold text-sm">{targetHeightM} m</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="12"
                step="0.1"
                value={targetHeightM}
                onChange={(e) => setTargetHeightM(parseFloat(e.target.value))}
                className="cyber-slider"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0.5m</span>
                <span>3m</span>
                <span>6m</span>
                <span>9m</span>
                <span>12m</span>
              </div>
            </div>
          </div>
        )}

        {calculationMode === 'aspectRatio' && (
          <div className="space-y-4 mb-5">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Proporção Padrão da Tela (Aspect Ratio):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['16:9', '32:9', '4:3', '21:9'].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => handleRatioSelect(ratio)}
                    className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                      targetRatioStr === ratio
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,243,255,0.3)]'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-slate-300 font-semibold">Polegadas Diagonais (Polegadas "):</span>
                <span className="text-cyan-400 font-mono font-bold text-sm">{targetDiagonalInches}"</span>
              </div>
              <input
                type="range"
                min="55"
                max="400"
                step="5"
                value={targetDiagonalInches}
                onChange={(e) => handleDiagonalChange(e.target.value)}
                className="cyber-slider"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>55" (TV)</span>
                <span>138" (Standard)</span>
                <span>220" (Videowall)</span>
                <span>400"</span>
              </div>
            </div>
          </div>
        )}

        {calculationMode === 'grid' && (
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Número de Colunas:
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={customCols}
                onChange={(e) => setCustomCols(e.target.value)}
                className="cyber-input"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Número de Linhas:
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={customRows}
                onChange={(e) => setCustomRows(e.target.value)}
                className="cyber-input"
              />
            </div>
          </div>
        )}

        {/* Pixel Pitch Selection */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Pixel Pitch (Distância entre LEDs):
          </label>
          <select
            value={pitchId}
            onChange={(e) => setPitchId(e.target.value)}
            className="cyber-select font-mono"
          >
            {PITCH_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — ({p.category})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-cyan-400/90 font-mono mt-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Recomendado para: {currentPitch.recommendedFor}</span>
          </p>
        </div>

        {/* Cabinet Standard Format Selection */}
        <div className="mb-5">
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Formato / Gabinete Padrão:
          </label>
          <select
            value={cabinetId}
            onChange={(e) => setCabinetId(e.target.value)}
            className="cyber-select font-mono text-xs"
          >
            {CABINET_SIZES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Hardware & Spec Highlights Panel */}
        <div className="bg-slate-950/80 rounded-xl border border-cyan-500/20 p-3.5 text-xs space-y-2 mb-4">
          <div className="flex justify-between items-center text-slate-300 border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Taxa de Atualização:
            </span>
            <span className="font-mono font-bold text-white">{currentPitch.refreshRate} Hz</span>
          </div>

          <div className="flex justify-between items-center text-slate-300 border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Brilho Máximo:
            </span>
            <span className="font-mono font-bold text-amber-300">{currentPitch.brightness} nits (cd/m²)</span>
          </div>

          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Resolução por Gabinete:
            </span>
            <span className="font-mono font-bold text-emerald-300">
              {calcResult.pixelsPerCabinetW} × {calcResult.pixelsPerCabinetH} px
            </span>
          </div>
        </div>
      </div>

      {/* Primary Action Button: Generate Quote Proposal */}
      <button
        onClick={onGenerateProposal}
        className="btn-cyber-primary w-full justify-center py-3 text-sm mt-2"
      >
        <span>Gerar Proposta Comercial PDF</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
