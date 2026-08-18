import React from 'react';
import { X, Sliders, DollarSign, Percent, Save, RotateCcw } from 'lucide-react';

export default function CatalogSettingsModal({
  isOpen,
  onClose,
  usdToBrlRate,
  setUsdToBrlRate,
  marginPercent,
  setMarginPercent,
  structureCostPerSqmBrl,
  setStructureCostPerSqmBrl
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-md w-full p-6 shadow-[0_0_40px_rgba(0,243,255,0.2)] space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold tracking-wide uppercase text-white">
              Configurações de Margem & Cotação
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs Form */}
        <div className="space-y-4 text-xs font-sans">
          {/* USD to BRL Rate */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Cotação do Dólar Comercial (USD / BRL):
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.05"
                min="3.0"
                max="10.0"
                value={usdToBrlRate}
                onChange={(e) => setUsdToBrlRate(parseFloat(e.target.value) || 5.20)}
                className="cyber-input font-mono pl-8"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 font-mono">R$</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Utilizado para conversão automática dos gabinetes em USD.</p>
          </div>

          {/* Profit Margin % */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Margem Comercial de Lucro (% sobre custo):
            </label>
            <div className="relative">
              <input
                type="number"
                step="1"
                min="0"
                max="200"
                value={marginPercent}
                onChange={(e) => setMarginPercent(parseFloat(e.target.value) || 35)}
                className="cyber-input font-mono pr-8"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 font-mono">%</span>
            </div>
          </div>

          {/* Structure Cost per SQM */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Custo Médio da Estrutura Metálica (R$ / m²):
            </label>
            <div className="relative">
              <input
                type="number"
                step="50"
                min="100"
                max="5000"
                value={structureCostPerSqmBrl}
                onChange={(e) => setStructureCostPerSqmBrl(parseFloat(e.target.value) || 800)}
                className="cyber-input font-mono pl-8"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 font-mono">R$</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="btn-cyber-primary text-xs w-full justify-center"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Alterações</span>
          </button>
        </div>

      </div>
    </div>
  );
}
