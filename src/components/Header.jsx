import React from 'react';
import { 
  Monitor, 
  Layers, 
  Zap, 
  FileText, 
  Sliders, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenSettings, onOpenPresets }) {
  const tabs = [
    { id: 'calculator', label: 'Calculador LED', icon: Monitor },
    { id: 'comparator', label: 'Comparador de Pitch', icon: Layers },
    { id: 'electrical', label: 'Elétrica & Controlador', icon: Zap },
    { id: 'proposal', label: 'Proposta Comercial', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070913]/90 backdrop-blur-xl border-b border-cyan-500/20 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,243,255,0.25)]">
            <Monitor className="w-6 h-6 text-cyan-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-white">
                AC <span className="text-cyan-400 glow-text-cyan">DISPLAY</span>
              </span>
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                PRO MATRIX v2.6
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Plataforma de Cálculo Comercial & Dimensionamento de Painéis de LED
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-cyan-500/15">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,243,255,0.4)] scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPresets}
            className="btn-cyber-secondary text-xs"
            title="Carregar Projetos Prontos"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">Projetos Prontos</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-cyan-500/20 text-slate-300 hover:text-white transition-colors"
            title="Configurações de Margem e Cotação USD/BRL"
          >
            <Sliders className="w-4.5 h-4.5 text-cyan-400" />
          </button>
        </div>

      </div>
    </header>
  );
}
