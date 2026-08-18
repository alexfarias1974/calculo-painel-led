import React from 'react';
import { 
  Zap, 
  Cpu, 
  Cable, 
  ShieldAlert, 
  Thermometer, 
  CheckCircle2, 
  Info,
  Layers
} from 'lucide-react';
import { CONTROLLER_MODELS } from '../data/ledCatalog';

export default function ElectricalControllerTool({ calcResult }) {
  const {
    maxPowerWatts,
    avgPowerWatts,
    maxAmperage220V,
    totalPixelCount,
    recommendedController,
    ethernetPortsNeeded,
    cols,
    rows,
    totalCabinets
  } = calcResult;

  // Electrical Calculations
  const maxBTU = Math.round(maxPowerWatts * 3.412); // BTU/h heat dissipation
  const avgBTU = Math.round(avgPowerWatts * 3.412);

  // Recommended Circuit Breaker (Disjuntor)
  const amperageVal = parseFloat(maxAmperage220V);
  let breakerRating = 16;
  if (amperageVal > 12) breakerRating = 25;
  if (amperageVal > 20) breakerRating = 32;
  if (amperageVal > 26) breakerRating = 40;
  if (amperageVal > 32) breakerRating = 50;
  if (amperageVal > 42) breakerRating = 63;

  // Recommended Wire Gauge (Bitola do Cabo em mm2)
  let wireGauge = '2.5 mm²';
  if (amperageVal > 21) wireGauge = '4.0 mm²';
  if (amperageVal > 28) wireGauge = '6.0 mm²';
  if (amperageVal > 36) wireGauge = '10.0 mm²';
  if (amperageVal > 50) wireGauge = '16.0 mm²';

  // Number of 220V circuits needed (max 15A per circuit)
  const circuitsCount = Math.max(1, Math.ceil(amperageVal / 15));

  return (
    <div className="cyber-card p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" />
            <h2 className="text-lg font-bold tracking-wide uppercase text-white">
              Dimensionamento Elétrico & Infraestrutura de Vídeo
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Requisitos de rede elétrica, proteção por disjuntores, ar condicionado (BTU) e processamento de sinal.
          </p>
        </div>
      </div>

      {/* Grid of Technical Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Panel 1: Electrical Specs */}
        <div className="bg-slate-950/90 rounded-2xl border border-amber-500/30 p-5 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-slate-800 pb-2">
            <Zap className="w-4 h-4" />
            <span>1. ALIMENTAÇÃO ELÉTRICA & ENERGIA</span>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="hud-metric">
              <span className="text-slate-400 block text-[10px]">POTÊNCIA MÁXIMA</span>
              <span className="text-amber-400 font-bold text-base">{(maxPowerWatts / 1000).toFixed(2)} kW</span>
              <span className="text-slate-400 text-[10px] block">{maxPowerWatts.toLocaleString()} Watts</span>
            </div>

            <div className="hud-metric">
              <span className="text-slate-400 block text-[10px]">POTÊNCIA MÉDIA (OPERAÇÃO)</span>
              <span className="text-emerald-400 font-bold text-base">{(avgPowerWatts / 1000).toFixed(2)} kW</span>
              <span className="text-slate-400 text-[10px] block">{avgPowerWatts.toLocaleString()} Watts</span>
            </div>

            <div className="hud-metric">
              <span className="text-slate-400 block text-[10px]">CORRENTE MÁXIMA (220V)</span>
              <span className="text-amber-300 font-bold text-base">{maxAmperage220V} Amperes</span>
              <span className="text-slate-400 text-[10px] block">Monofásico / Bifásico</span>
            </div>

            <div className="hud-metric">
              <span className="text-slate-400 block text-[10px]">CIRCUITOS INDEPENDENTES</span>
              <span className="text-cyan-300 font-bold text-base">{circuitsCount} Circuito(s)</span>
              <span className="text-slate-400 text-[10px] block">Carga balanceada</span>
            </div>
          </div>

          {/* Infrastructure Cable & Breaker Guide */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Disjuntor Recomendado (Curva C):</span>
              <span className="font-mono font-bold text-amber-400">Curva C {breakerRating}A</span>
            </div>

            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Bitola do Cabo Principal:</span>
              <span className="font-mono font-bold text-cyan-400">{wireGauge} Flexível</span>
            </div>

            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                Dissipação Térmica (HVAC):
              </span>
              <span className="font-mono font-bold text-rose-300">{maxBTU.toLocaleString()} BTU/h</span>
            </div>
          </div>
        </div>

        {/* Panel 2: Video Controller & Signal Ports */}
        <div className="bg-slate-950/90 rounded-2xl border border-cyan-500/30 p-5 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm border-b border-slate-800 pb-2">
            <Cpu className="w-4 h-4" />
            <span>2. CONTROLADORA & PROCESSADOR DE VÍDEO</span>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-500/20 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Modelo Recomendado:</span>
              <span className="font-mono font-bold text-cyan-300 text-sm">{recommendedController.name}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Capacidade Máxima:</span>
              <span className="font-mono text-slate-200">{(recommendedController.maxPixels / 1000000).toFixed(1)} M Pixels</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Portas de Saída RJ45 Usadas:</span>
              <span className="font-mono font-bold text-indigo-400">{ethernetPortsNeeded} de {recommendedController.ports} Portas</span>
            </div>
          </div>

          {/* Port Load Distribution */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 mb-2">
              Distribuição de Carga por Porta de Sinal (RJ45):
            </h4>
            <div className="space-y-1.5 font-mono text-[11px]">
              {Array.from({ length: ethernetPortsNeeded }).map((_, i) => {
                const cabsPerPort = Math.ceil(totalCabinets / ethernetPortsNeeded);
                const startCab = i * cabsPerPort + 1;
                const endCab = Math.min(totalCabinets, (i + 1) * cabsPerPort);
                const pxPerPort = Math.round(totalPixelCount / ethernetPortsNeeded);

                return (
                  <div key={i} className="flex justify-between items-center bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
                    <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                      <Cable className="w-3 h-3 text-cyan-400" />
                      Porta #{i + 1} (Gigabit)
                    </span>
                    <span className="text-slate-300">Gabinetes #{startCab} até #{endCab}</span>
                    <span className="text-indigo-300 font-bold">{pxPerPort.toLocaleString()} px</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
