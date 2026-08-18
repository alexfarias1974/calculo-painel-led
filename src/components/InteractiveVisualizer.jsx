import React, { useState } from 'react';
import { 
  Maximize2, 
  UserCheck, 
  Activity, 
  Zap, 
  Grid, 
  Cable, 
  Info,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export default function InteractiveVisualizer({ calcResult, activeViewMode, setActiveViewMode }) {
  const {
    cols,
    rows,
    actualWidthM,
    actualHeightM,
    actualWidthMm,
    actualHeightMm,
    totalCabinets,
    totalPixelsH,
    totalPixelsV,
    totalPixelCount,
    pitchData,
    resBadge,
    diagonalInches,
    ethernetPortsNeeded,
    maxAmperage220V
  } = calcResult;

  const [hoveredCabinet, setHoveredCabinet] = useState(null);

  // SVG Drawing parameters
  const svgWidth = 800;
  const svgHeight = 460;
  const margin = 60;

  const maxDrawW = svgWidth - margin * 2;
  const maxDrawH = svgHeight - margin * 2;

  // Maintain aspect ratio scaling inside canvas
  const displayRatio = actualWidthM / actualHeightM;
  let drawW = maxDrawW;
  let drawH = maxDrawW / displayRatio;

  if (drawH > maxDrawH) {
    drawH = maxDrawH;
    drawW = maxDrawH * displayRatio;
  }

  const startX = (svgWidth - drawW) / 2;
  const startY = (svgHeight - drawH) / 2;

  const cabinetW = drawW / cols;
  const cabinetH = drawH / rows;

  // Human height scale reference (1.75m)
  const metersToPixels = drawH / actualHeightM;
  const humanHeightPx = 1.75 * metersToPixels;
  const humanWidthPx = humanHeightPx * 0.28;
  const humanX = startX - humanWidthPx - 25;
  const humanY = startY + drawH - humanHeightPx;

  return (
    <div className="cyber-card p-5 flex flex-col h-full">
      {/* Header bar of visualizer */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
          <h3 className="text-sm font-bold tracking-wide uppercase text-white">
            Simulador de Matriz & Visualizador 2D em Tempo Real
          </h3>
          <span className={`badge-resolution ${resBadge.class}`}>
            {resBadge.label}
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-cyan-500/20 text-xs">
          <button
            onClick={() => setActiveViewMode('grid')}
            className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-all ${
              activeViewMode === 'grid'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,243,255,0.5)] font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Gabinetes</span>
          </button>

          <button
            onClick={() => setActiveViewMode('cabling')}
            className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-all ${
              activeViewMode === 'cabling'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,243,255,0.5)] font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cable className="w-3.5 h-3.5" />
            <span>Sinal / Cabeamento</span>
          </button>

          <button
            onClick={() => setActiveViewMode('power')}
            className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-all ${
              activeViewMode === 'power'
                ? 'bg-amber-400 text-slate-950 shadow-[0_0_10px_rgba(245,158,11,0.5)] font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Distribuição Elétrica</span>
          </button>
        </div>
      </div>

      {/* Main Interactive SVG Canvas */}
      <div className="visualizer-canvas-container relative flex-1 min-h-[380px] rounded-xl overflow-hidden border border-cyan-500/20">
        
        {/* Scale & Dimensions Label Overlays */}
        <div className="absolute top-3 left-4 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 z-10 flex items-center gap-2">
          <div className="pulse-dot" />
          <span>{actualWidthM.toFixed(2)}m × {actualHeightM.toFixed(2)}m ({diagonalInches}")</span>
        </div>

        <div className="absolute top-3 right-4 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 z-10">
          <span>{totalPixelsH} × {totalPixelsV} px ({totalPixelCount.toLocaleString()} Pixels)</span>
        </div>

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full object-contain"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 243, 255, 0.05)" strokeWidth="0.5" />
            </pattern>
            {/* Neon Glow Filters */}
            <filter id="cyanGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="amberGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid */}
          <rect width={svgWidth} height={svgHeight} fill="url(#smallGrid)" />

          {/* Outer Bounding Screen Border (Neon Blue Glow) */}
          <rect
            x={startX - 4}
            y={startY - 4}
            width={drawW + 8}
            height={drawH + 8}
            fill="none"
            stroke="#00f3ff"
            strokeWidth="1.5"
            strokeDasharray="6,4"
            opacity="0.6"
          />

          {/* Render Cabinets Matrix Grid */}
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const cabX = startX + c * cabinetW;
              const cabY = startY + r * cabinetH;
              const cabIndex = r * cols + c + 1;
              const isHovered = hoveredCabinet && hoveredCabinet.r === r && hoveredCabinet.c === c;

              // Color logic depending on View Mode
              let cabFill = 'rgba(15, 23, 42, 0.7)';
              let cabStroke = 'rgba(0, 243, 255, 0.35)';
              let cabStrokeWidth = '1';

              if (activeViewMode === 'cabling') {
                // Alternating ethernet port color bands
                const portIndex = Math.floor((cabIndex - 1) / Math.ceil(totalCabinets / ethernetPortsNeeded));
                const colors = ['rgba(0, 243, 255, 0.25)', 'rgba(99, 102, 241, 0.25)', 'rgba(217, 70, 239, 0.25)', 'rgba(16, 185, 129, 0.25)'];
                cabFill = colors[portIndex % colors.length];
                cabStroke = 'rgba(0, 243, 255, 0.6)';
              } else if (activeViewMode === 'power') {
                // Color code breaker groups (e.g. max 10A per circuit breaker)
                const circuitGroup = Math.floor((cabIndex - 1) / Math.ceil(totalCabinets / 3));
                const powerColors = ['rgba(245, 158, 11, 0.25)', 'rgba(239, 68, 68, 0.25)', 'rgba(59, 130, 246, 0.25)'];
                cabFill = powerColors[circuitGroup % powerColors.length];
                cabStroke = '#f59e0b';
              }

              if (isHovered) {
                cabFill = 'rgba(0, 243, 255, 0.4)';
                cabStroke = '#00f3ff';
                cabStrokeWidth = '2.5';
              }

              return (
                <g key={`cab-${r}-${c}`}>
                  <rect
                    x={cabX}
                    y={cabY}
                    width={cabinetW}
                    height={cabinetH}
                    fill={cabFill}
                    stroke={cabStroke}
                    strokeWidth={cabStrokeWidth}
                    rx="2"
                    className="transition-all duration-150 cursor-pointer"
                    onMouseEnter={() => setHoveredCabinet({ r, c, index: cabIndex })}
                    onMouseLeave={() => setHoveredCabinet(null)}
                  />

                  {/* Inner Module Sub-Grid Lines if cabinet is large enough */}
                  {cabinetW > 25 && cabinetH > 25 && (
                    <line
                      x1={cabX + cabinetW / 2}
                      y1={cabY}
                      x2={cabX + cabinetW / 2}
                      y2={cabY + cabinetH}
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="0.5"
                    />
                  )}

                  {/* Cabinet Number Label */}
                  {cabinetW > 18 && cabinetH > 14 && (
                    <text
                      x={cabX + cabinetW / 2}
                      y={cabY + cabinetH / 2 + 3}
                      fill={isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'}
                      fontSize={Math.min(cabinetW * 0.35, 11)}
                      fontFamily="JetBrains Mono"
                      fontWeight="bold"
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {cabIndex}
                    </text>
                  )}
                </g>
              );
            })
          )}

          {/* Cabling Serpentine Path Overlay when Cabling Mode active */}
          {activeViewMode === 'cabling' && (
            <g pointerEvents="none">
              {Array.from({ length: rows }).map((_, r) => {
                const isEvenRow = r % 2 === 0;
                const pathPoints = [];
                for (let c = 0; c < cols; c++) {
                  const actualC = isEvenRow ? c : cols - 1 - c;
                  const cx = startX + actualC * cabinetW + cabinetW / 2;
                  const cy = startY + r * cabinetH + cabinetH / 2;
                  pathPoints.push(`${cx},${cy}`);
                }
                return (
                  <polyline
                    key={`cable-row-${r}`}
                    points={pathPoints.join(' ')}
                    fill="none"
                    stroke="#00f3ff"
                    strokeWidth="2"
                    strokeDasharray="4,3"
                    filter="url(#cyanGlowFilter)"
                  />
                );
              })}
            </g>
          )}

          {/* Dimension Line Arrows */}
          {/* Top Width Arrow */}
          <line
            x1={startX}
            y1={startY - 18}
            x2={startX + drawW}
            y2={startY - 18}
            stroke="#00f3ff"
            strokeWidth="1.5"
          />
          <text
            x={startX + drawW / 2}
            y={startY - 24}
            fill="#00f3ff"
            fontSize="12"
            fontFamily="JetBrains Mono"
            fontWeight="bold"
            textAnchor="middle"
          >
            LARGURA: {actualWidthM.toFixed(2)}m ({cols} Gabinetes)
          </text>

          {/* Right Height Arrow */}
          <line
            x1={startX + drawW + 18}
            y1={startY}
            x2={startX + drawW + 18}
            y2={startY + drawH}
            stroke="#00f3ff"
            strokeWidth="1.5"
          />
          <text
            x={startX + drawW + 24}
            y={startY + drawH / 2}
            fill="#00f3ff"
            fontSize="11"
            fontFamily="JetBrains Mono"
            fontWeight="bold"
            textAnchor="start"
            transform={`rotate(90, ${startX + drawW + 24}, ${startY + drawH / 2})`}
          >
            ALTURA: {actualHeightM.toFixed(2)}m ({rows} Linhas)
          </text>

          {/* Human Silhouette Figure Reference (1.75m) */}
          <g transform={`translate(${humanX}, ${humanY})`} opacity="0.85">
            {/* Head */}
            <circle cx={humanWidthPx / 2} cy={humanHeightPx * 0.12} r={humanHeightPx * 0.08} fill="#94a3b8" />
            {/* Torso & Legs */}
            <path
              d={`M ${humanWidthPx * 0.2} ${humanHeightPx * 0.25} 
                 L ${humanWidthPx * 0.8} ${humanHeightPx * 0.25} 
                 L ${humanWidthPx * 0.75} ${humanHeightPx * 0.55} 
                 L ${humanWidthPx * 0.9} ${humanHeightPx * 0.98} 
                 L ${humanWidthPx * 0.6} ${humanHeightPx * 0.98} 
                 L ${humanWidthPx * 0.5} ${humanHeightPx * 0.62} 
                 L ${humanWidthPx * 0.4} ${humanHeightPx * 0.98} 
                 L ${humanWidthPx * 0.1} ${humanHeightPx * 0.98} 
                 L ${humanWidthPx * 0.25} ${humanHeightPx * 0.55} Z`}
              fill="#64748b"
            />
            {/* Height indicator */}
            <text
              x={humanWidthPx / 2}
              y={humanHeightPx + 14}
              fill="#94a3b8"
              fontSize="9"
              fontFamily="JetBrains Mono"
              textAnchor="middle"
            >
              Humano (1,75m)
            </text>
          </g>
        </svg>

        {/* Hovered Cabinet Floating Info Box */}
        {hoveredCabinet && (
          <div className="absolute bottom-4 left-4 bg-slate-950/90 backdrop-blur-xl border border-cyan-400 p-3 rounded-xl shadow-2xl text-xs font-mono z-20 animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1 border-b border-slate-800 pb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>GABINETE #{hoveredCabinet.index} (Col {hoveredCabinet.c + 1}, Linha {hoveredCabinet.r + 1})</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
              <div>Pitch: <span className="text-white font-bold">{pitchData.id}</span></div>
              <div>Resolução: <span className="text-cyan-300 font-bold">{calcResult.pixelsPerCabinetW} × {calcResult.pixelsPerCabinetH} px</span></div>
              <div>Pixel Density: <span className="text-indigo-300">{(pitchData.pixelsPerMeter * pitchData.pixelsPerMeter).toLocaleString()} px/m²</span></div>
              <div>Brilho Max: <span className="text-amber-300">{pitchData.brightness} nits</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info Summary Bar inside Visualizer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-cyan-500/15 text-xs font-mono">
        <div className="hud-metric">
          <span className="text-slate-400 block text-[10px]">TOTAL GABINETES</span>
          <span className="text-white font-bold text-sm">{totalCabinets} Unidades</span>
          <span className="text-cyan-400 block text-[10px]">{cols} Colunas × {rows} Linhas</span>
        </div>

        <div className="hud-metric">
          <span className="text-slate-400 block text-[10px]">ÁREA DE EXIBIÇÃO</span>
          <span className="text-cyan-300 font-bold text-sm">{calcResult.totalAreaSqm.toFixed(2)} m²</span>
          <span className="text-slate-400 block text-[10px]">Espessura: 80mm</span>
        </div>

        <div className="hud-metric">
          <span className="text-slate-400 block text-[10px]">CONTROLADORA SINAL</span>
          <span className="text-indigo-300 font-bold text-sm">{calcResult.recommendedController.name.split(' ')[1]}</span>
          <span className="text-indigo-400 block text-[10px]">{ethernetPortsNeeded} Portas RJ45 Usadas</span>
        </div>

        <div className="hud-metric">
          <span className="text-slate-400 block text-[10px]">POTÊNCIA & AMPERAGEM</span>
          <span className="text-amber-400 font-bold text-sm">{(calcResult.maxPowerWatts / 1000).toFixed(2)} kW</span>
          <span className="text-amber-300 block text-[10px]">{maxAmperage220V} Amperes (220V)</span>
        </div>
      </div>
    </div>
  );
}
