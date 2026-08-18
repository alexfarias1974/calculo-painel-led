import React, { useState } from 'react';
import { 
  calculateDisplay, 
  PITCH_PRESETS, 
  CABINET_SIZES, 
  getRecommendedPitchByDistance 
} from './data/ledCatalog';

// ─── Icons (inline SVG) ───────────────────────────────────────────────────
const IconMonitor = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>
);
const IconGrid = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const IconInfo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
  </svg>
);
const IconCalc = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z"/>
    <path d="M9 7h6M9 12h6M9 17h4"/>
  </svg>
);
const IconBook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconTarget = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconChevronDown = ({ open }) => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ─── Viewing Distance Visual Scale ──────────────────────────────────────────
function ViewingDistanceScale({ minViewDistM, optViewDistM, pitchId, pitchMm }) {
  return (
    <div className="viewing-distance-card">
      <div className="viewing-distance-header">
        <div className="viewing-distance-title">
          <IconTarget /> Régua de Zonas de Visualização — {pitchId} ({pitchMm} mm)
        </div>
        <div className="viewing-distance-badge">
          Regra: 1mm de Pitch ≈ 1 metro de distância mínima
        </div>
      </div>

      {/* Visual Multi-Segment Bar */}
      <div className="distance-bar-wrapper">
        <div className="distance-bar">
          <div className="distance-segment segment-pixelated" style={{ flex: '1.2' }}>
            <span className="segment-label">🔴 Zona Pixelizada</span>
            <span className="segment-sub">&lt; {minViewDistM}m (pontos visíveis)</span>
          </div>
          <div className="distance-segment segment-optimal" style={{ flex: '1.8' }}>
            <span className="segment-label">🟢 Zona de Conforto Ótimo</span>
            <span className="segment-sub">{minViewDistM}m a {optViewDistM}m (nitidez total)</span>
          </div>
          <div className="distance-segment segment-distant" style={{ flex: '1.5' }}>
            <span className="segment-label">🟡 Zona Distante</span>
            <span className="segment-sub">&gt; {optViewDistM}m (visão perfeita)</span>
          </div>
        </div>
      </div>

      {/* Quick contextual guidance */}
      <div className="distance-hints-grid">
        <div className="distance-hint-item">
          <strong>Abaixo de {minViewDistM}m:</strong> O espectador enxerga a grade de LEDs individuais.
        </div>
        <div className="distance-hint-item">
          <strong>Entre {minViewDistM}m e {optViewDistM}m:</strong> Resolução perfeita, o olho enxerga uma imagem única contínua.
        </div>
        <div className="distance-hint-item">
          <strong>Acima de {optViewDistM}m:</strong> Imagem excelente, mas um pitch maior (mais barato) também atenderia.
        </div>
      </div>
    </div>
  );
}

// ─── Cabinet Grid Visualizer ────────────────────────────────────────────────
function CabinetVisualizer({ result }) {
  const { cols, rows, actualWidthM, actualHeightM, diagInches } = result;

  const MAX_W = 780;
  const MAX_H = 380;
  const marginTop = 48;
  const marginBottom = 24;
  const marginLeft = 36;
  const marginRight = 56;

  const drawW = MAX_W - marginLeft - marginRight;
  const drawH = MAX_H - marginTop - marginBottom;

  const panelRatio = actualWidthM / actualHeightM;
  let pW = drawW;
  let pH = pW / panelRatio;
  if (pH > drawH) { pH = drawH; pW = pH * panelRatio; }

  const startX = marginLeft + (drawW - pW) / 2;
  const startY = marginTop + (drawH - pH) / 2;
  const cW = pW / cols;
  const cH = pH / rows;
  const showLabels = cW > 22 && cH > 16;

  const svgW = MAX_W;
  const svgH = MAX_H;

  return (
    <div className="visualizer-canvas" style={{ minHeight: MAX_H, padding: 0, overflow: 'hidden' }}>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect width={svgW} height={svgH} fill="#0c0e14" />

        {/* Width Dim */}
        <line x1={startX} y1={startY - 14} x2={startX + pW} y2={startY - 14} stroke="#334155" strokeWidth="1" />
        <line x1={startX} y1={startY - 18} x2={startX} y2={startY - 10} stroke="#334155" strokeWidth="1" />
        <line x1={startX + pW} y1={startY - 18} x2={startX + pW} y2={startY - 10} stroke="#334155" strokeWidth="1" />
        <text x={startX + pW / 2} y={startY - 22} fill="#94a3b8" fontSize="12" fontFamily="JetBrains Mono" fontWeight="500" textAnchor="middle">
          {actualWidthM.toFixed(3)} m ({cols} {cols === 1 ? 'coluna' : 'colunas'})
        </text>
        
        {/* Height Dim */}
        <line x1={startX + pW + 14} y1={startY} x2={startX + pW + 14} y2={startY + pH} stroke="#334155" strokeWidth="1" />
        <line x1={startX + pW + 10} y1={startY} x2={startX + pW + 18} y2={startY} stroke="#334155" strokeWidth="1" />
        <line x1={startX + pW + 10} y1={startY + pH} x2={startX + pW + 18} y2={startY + pH} stroke="#334155" strokeWidth="1" />
        <text
          x={startX + pW + 28}
          y={startY + pH / 2}
          fill="#94a3b8"
          fontSize="12"
          fontFamily="JetBrains Mono"
          fontWeight="500"
          textAnchor="middle"
          transform={`rotate(90, ${startX + pW + 28}, ${startY + pH / 2})`}
        >
          {actualHeightM.toFixed(3)} m ({rows} {rows === 1 ? 'linha' : 'linhas'})
        </text>

        {/* Cabinets Grid */}
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const x = startX + c * cW;
            const y = startY + r * cH;
            const idx = r * cols + c + 1;
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={x + 0.5}
                  y={y + 0.5}
                  width={cW - 1}
                  height={cH - 1}
                  fill="#111827"
                  stroke="#1e3a5f"
                  strokeWidth="1"
                  rx="1"
                />
                {showLabels && (
                  <text
                    x={x + cW / 2}
                    y={y + cH / 2 + 4}
                    fill="#334155"
                    fontSize={Math.min(cW * 0.35, 10)}
                    fontFamily="JetBrains Mono"
                    textAnchor="middle"
                  >
                    {idx}
                  </text>
                )}
              </g>
            );
          })
        )}

        {/* Panel border */}
        <rect x={startX} y={startY} width={pW} height={pH} fill="none" stroke="#2563eb" strokeWidth="1.5" rx="2" />

        {/* Diagonal */}
        <text x={startX + pW / 2} y={startY + pH / 2 + 5} fill="#1e3a5f" fontSize="13" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="600">
          {diagInches}"
        </text>
      </svg>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  // Educational Guide Card Toggle State
  const [showGuide, setShowGuide] = useState(true);

  // Pitch Selection Mode: 'guided' (by distance) | 'manual' (direct list)
  const [pitchSelectionMode, setPitchSelectionMode] = useState('guided');
  const [audienceDistanceM, setAudienceDistanceM] = useState('2.5');

  // Form state
  const [widthM, setWidthM]         = useState('');
  const [heightM, setHeightM]       = useState('');
  const [pitchId, setPitchId]       = useState('P2.5');
  const [cabinetId, setCabinetId]   = useState('c600x337');
  const [roundingMode, setRounding] = useState('expand'); // 'expand' | 'shrink'

  // Result state
  const [result, setResult] = useState(null);
  const [error, setError]   = useState('');

  // Handle distance change in guided mode
  const handleDistanceChange = (distStr) => {
    setAudienceDistanceM(distStr);
    const num = parseFloat(distStr);
    if (num && num > 0) {
      const rec = getRecommendedPitchByDistance(num);
      setPitchId(rec.id);
    }
  };

  const handleCalculate = () => {
    const w = parseFloat(widthM);
    const h = parseFloat(heightM);
    if (!w || !h || w <= 0 || h <= 0) {
      setError('Informe largura e altura válidas.');
      return;
    }
    if (w > 50 || h > 30) {
      setError('Dimensões fora do intervalo suportado (Largura ≤ 50m, Altura ≤ 30m).');
      return;
    }
    setError('');
    setResult(calculateDisplay({ widthM: w, heightM: h, pitchId, cabinetId, roundingMode }));
  };

  const handleReset = () => {
    setResult(null);
    setError('');
    setWidthM('');
    setHeightM('');
  };

  const currentPitchObj = PITCH_PRESETS.find(p => p.id === pitchId) || PITCH_PRESETS[5];

  return (
    <div className="app-wrapper">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="app-logo">
          <div className="logo-icon"><IconMonitor /></div>
          <div>
            <div className="logo-text">AC <span>DISPLAY</span></div>
            <div className="logo-tag">Calculador de Painel de LED & Consultoria Técnica</div>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="page-content">
        <h1 className="page-title">Dimensionamento de Painel</h1>
        <p className="page-subtitle">
          Calcule a quantidade exata de gabinetes, resolução nativa e descubra o Pixel Pitch ideal conforme a distância do público.
        </p>

        {/* ── Educational Guide Card (Collapsible) ── */}
        <div className="edu-guide-card">
          <button 
            type="button" 
            className="edu-guide-toggle"
            onClick={() => setShowGuide(!showGuide)}
          >
            <div className="edu-guide-toggle-left">
              <IconBook />
              <span>Guia Rápido: Como Funciona o Pixel Pitch & Distância de Visão</span>
            </div>
            <div className="edu-guide-toggle-right">
              <span className="edu-guide-status">{showGuide ? 'Ocultar' : 'Ver Guia'}</span>
              <IconChevronDown open={showGuide} />
            </div>
          </button>

          {showGuide && (
            <div className="edu-guide-content">
              <div className="edu-guide-grid">
                <div className="edu-item">
                  <div className="edu-item-num">1</div>
                  <div className="edu-item-text">
                    <strong>O que é o "P" (Pitch)?</strong>
                    <p>É a distância física em milímetros de um LED ao outro. Um <strong>P2.5</strong> tem 2,5mm entre cada ponto; um <strong>P4.81</strong> tem 4,81mm.</p>
                  </div>
                </div>

                <div className="edu-item">
                  <div className="edu-item-num">2</div>
                  <div className="edu-item-text">
                    <strong>A Regra de Ouro (1mm ≈ 1 metro)</strong>
                    <p>A distância mínima em metros para uma imagem nítida é igual ao número do Pitch. Para <strong>3 metros</strong> de distância, use <strong>P2.5 ou P3.0</strong>.</p>
                  </div>
                </div>

                <div className="edu-item">
                  <div className="edu-item-num">3</div>
                  <div className="edu-item-text">
                    <strong>Custo x Benefício Comercial</strong>
                    <p>Pitchs menores custam mais caro. Se o público ficará a <strong>6 metros</strong>, um <strong>P4.81</strong> atenderá com perfeição economizando o orçamento do cliente.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Input Form ── */}
        <div className="form-card">
          <div className="form-card-title">
            <IconCalc /> Parâmetros do Projeto
          </div>

          <div className="form-grid">
            {/* Width */}
            <div className="form-field">
              <label className="field-label">
                Largura desejada <span className="field-unit">(metros)</span>
              </label>
              <input
                type="number"
                min="0.1"
                max="50"
                step="0.1"
                placeholder="ex: 3.00"
                value={widthM}
                onChange={e => setWidthM(e.target.value)}
              />
            </div>

            {/* Height */}
            <div className="form-field">
              <label className="field-label">
                Altura desejada <span className="field-unit">(metros)</span>
              </label>
              <input
                type="number"
                min="0.1"
                max="30"
                step="0.1"
                placeholder="ex: 1.68"
                value={heightM}
                onChange={e => setHeightM(e.target.value)}
              />
            </div>

            {/* Pitch Selection Section with Distance Assistant Toggle */}
            <div className="form-field full-width pitch-selection-container">
              <div className="pitch-mode-header">
                <label className="field-label">Definição do Pixel Pitch</label>
                <div className="pitch-mode-toggle">
                  <button
                    type="button"
                    className={`pitch-mode-btn ${pitchSelectionMode === 'guided' ? 'active' : ''}`}
                    onClick={() => {
                      setPitchSelectionMode('guided');
                      handleDistanceChange(audienceDistanceM);
                    }}
                  >
                    🎯 Sugerir pela Distância do Público
                  </button>
                  <button
                    type="button"
                    className={`pitch-mode-btn ${pitchSelectionMode === 'manual' ? 'active' : ''}`}
                    onClick={() => setPitchSelectionMode('manual')}
                  >
                    ⚙️ Escolha Direta da Lista
                  </button>
                </div>
              </div>

              {/* Guided by Distance Mode */}
              {pitchSelectionMode === 'guided' ? (
                <div className="pitch-guided-box">
                  <div className="pitch-guided-input-row">
                    <div style={{ flex: '1' }}>
                      <span className="pitch-guided-label">Distância da pessoa mais próxima do painel:</span>
                      <div className="distance-input-wrapper">
                        <input
                          type="number"
                          min="0.5"
                          max="50"
                          step="0.5"
                          value={audienceDistanceM}
                          onChange={e => handleDistanceChange(e.target.value)}
                          placeholder="ex: 2.5"
                        />
                        <span className="distance-unit">metros</span>
                      </div>
                    </div>

                    {/* Quick Distance Chips */}
                    <div className="distance-chips-container">
                      <span className="distance-chips-title">Atalhos rápidos:</span>
                      <div className="distance-chips">
                        {['1.5', '2.0', '2.5', '3.0', '4.0', '5.0', '8.0'].map(d => (
                          <button
                            key={d}
                            type="button"
                            className={`distance-chip ${audienceDistanceM === d ? 'active' : ''}`}
                            onClick={() => handleDistanceChange(d)}
                          >
                            {d}m
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Callout */}
                  <div className="pitch-recommendation-callout">
                    <span className="rec-badge">✓ Pitch Recomendado: {currentPitchObj.id}</span>
                    <span className="rec-desc">
                      Para público a <strong>{audienceDistanceM || '2.5'}m</strong>, o modelo <strong>{currentPitchObj.name} ({currentPitchObj.pitch}mm)</strong> entrega imagem contínua e nítida sem percepção de pontos individuais.
                    </span>
                  </div>
                </div>
              ) : (
                /* Manual Dropdown Mode */
                <div>
                  <select value={pitchId} onChange={e => setPitchId(e.target.value)}>
                    {PITCH_PRESETS.map(p => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                  <p className="hint">
                    💡 Distância mínima recomendada para {currentPitchObj.id}: <strong>{currentPitchObj.pitch} metros</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* Cabinet */}
            <div className="form-field full-width">
              <label className="field-label">Tamanho do Gabinete</label>
              <select value={cabinetId} onChange={e => setCabinetId(e.target.value)}>
                {CABINET_SIZES.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Rounding mode */}
            <div className="form-field full-width">
              <label className="field-label">Ajuste quando as medidas não fecham exatamente com o gabinete</label>
              <div className="rounding-toggle">
                <button
                  className={`rounding-btn${roundingMode === 'expand' ? ' active' : ''}`}
                  onClick={() => setRounding('expand')}
                  type="button"
                  title="O painel fica um pouco maior que o pedido para completar os gabinetes"
                >
                  ▲ Ampliar — painel ligeiramente maior (padrão)
                </button>
                <button
                  className={`rounding-btn${roundingMode === 'shrink' ? ' active shrink' : ''}`}
                  onClick={() => setRounding('shrink')}
                  type="button"
                  title="O painel fica dentro do espaço disponível, podendo ser menor"
                >
                  ▼ Reduzir — painel dentro do espaço disponível
                </button>
              </div>
              <p className="hint">
                {roundingMode === 'expand'
                  ? 'O número de gabinetes é arredondado para cima: a área final será igual ou levemente maior que o pedido.'
                  : 'O número de gabinetes é arredondado para baixo: a área final caberá dentro do espaço informado.'}
              </p>
            </div>
          </div>

          {error && (
            <p style={{ color: '#f87171', fontSize: 12, marginTop: 14 }}>{error}</p>
          )}

          <div className="form-actions">
            <button className="btn-calc" onClick={handleCalculate}>
              <IconCalc /> Calcular Painel
            </button>
            {result && (
              <button className="btn-secondary" onClick={handleReset}>
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* ── Results ── */}
        {result && (
          <div className="results-section">

            {/* Summary Cards */}
            <div className="results-grid">
              <div className="result-card">
                <div className="result-card-label">Gabinetes</div>
                <div className="result-card-value highlight">{result.totalCabinets}</div>
                <div className="result-card-sub">{result.cols} col × {result.rows} lin</div>
              </div>

              <div className="result-card">
                <div className="result-card-label">Dimensão Real</div>
                <div className="result-card-value" style={{ fontSize: 16, paddingTop: 4 }}>
                  {result.actualWidthM.toFixed(2)}m × {result.actualHeightM.toFixed(2)}m
                </div>
                <div className="result-card-sub">{result.diagInches}" diagonal</div>
              </div>

              <div className="result-card">
                <div className="result-card-label">Resolução</div>
                <div className="result-card-value" style={{ fontSize: 15, paddingTop: 4 }}>
                  {result.totalPxW} × {result.totalPxH}
                </div>
                <div className="result-card-sub">{result.resLabel}</div>
              </div>

              <div className="result-card">
                <div className="result-card-label">Dist. mínima</div>
                <div className="result-card-value highlight">{result.minViewDistM}m</div>
                <div className="result-card-sub">de visualização</div>
              </div>
            </div>

            {/* Educational Distance Visual Scale */}
            <ViewingDistanceScale 
              minViewDistM={result.minViewDistM}
              optViewDistM={result.optViewDistM}
              pitchId={result.pitchData.id}
              pitchMm={result.pitchData.pitch}
            />

            {/* Resolution Tier Classifier */}
            <div className="res-tier-row">
              {[
                { tier: 'SD',      desc: 'abaixo de 1280 × 720',  req: 'SD'      },
                { tier: 'HD',      desc: '1280 × 720 px',         req: 'HD'      },
                { tier: 'Full HD', desc: '1920 × 1080 px',        req: 'Full HD' },
              ].map(({ tier, desc, req }) => {
                const achieved = (
                  req === 'SD'      ? true :
                  req === 'HD'      ? (result.resTier === 'HD' || result.resTier === 'Full HD') :
                  req === 'Full HD' ? result.resTier === 'Full HD' :
                  false
                );
                const active = result.resTier === req;
                return (
                  <div
                    key={tier}
                    className={`res-tier-card${active ? ' active' : ''}${!achieved ? ' dim' : ''}`}
                  >
                    <span className="res-tier-check">{achieved ? '✓' : '○'}</span>
                    <span className="res-tier-name">{tier}</span>
                    <span className="res-tier-desc">{desc}</span>
                  </div>
                );
              })}
              <div className="res-tier-info">
                Resolução obtida: <strong>{result.totalPxW} × {result.totalPxH} px</strong>
              </div>
            </div>

            {/* Visualizer */}
            <div className="visualizer-card">
              <div className="visualizer-header">
                <div className="visualizer-title">
                  <IconGrid /> Grade de Gabinetes
                </div>
                <div className="visualizer-meta">
                  {result.pxPerCabW} × {result.pxPerCabH} px / gabinete · {result.cabinet.widthMm} × {result.cabinet.heightMm} mm
                </div>
              </div>
              <CabinetVisualizer result={result} />
            </div>

            {/* Specs table — full width */}
            <div className="detail-card">
              <div className="detail-card-header">
                <IconInfo /> Especificações do Projeto
              </div>
              <table className="detail-table">
                <tbody>
                  <tr>
                    <td>Pixel Pitch</td>
                    <td>{result.pitchData.id} ({result.pitchData.pitch} mm)</td>
                  </tr>
                  <tr>
                    <td>Gabinete</td>
                    <td>{result.cabinet.widthMm} × {result.cabinet.heightMm} mm</td>
                  </tr>
                  <tr>
                    <td>Colunas de gabinetes</td>
                    <td>{result.cols}</td>
                  </tr>
                  <tr>
                    <td>Linhas de gabinetes</td>
                    <td>{result.rows}</td>
                  </tr>
                  <tr>
                    <td>Total de gabinetes</td>
                    <td><span className="badge">{result.totalCabinets} un</span></td>
                  </tr>
                  <tr>
                    <td>Área total</td>
                    <td>{result.areaSqm.toFixed(2)} m²</td>
                  </tr>
                  <tr>
                    <td>Resolução por gabinete</td>
                    <td>{result.pxPerCabW} × {result.pxPerCabH} px</td>
                  </tr>
                  <tr>
                    <td>Resolução total</td>
                    <td>{result.totalPxW} × {result.totalPxH} px</td>
                  </tr>
                  <tr>
                    <td>Total de pixels</td>
                    <td>{result.totalPixels.toLocaleString('pt-BR')}</td>
                  </tr>
                  <tr>
                    <td>Classificação de resolução</td>
                    <td><span className="badge">{result.resLabel}</span></td>
                  </tr>
                  <tr>
                    <td>Distância mínima de visão (1mm ≈ 1m)</td>
                    <td>{result.minViewDistM} metros</td>
                  </tr>
                  <tr>
                    <td>Distância de conforto ótimo (visão retina)</td>
                    <td>{result.optViewDistM} metros</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Empty state */}
        {!result && (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
            <p>Preencha os campos acima e clique em <strong>Calcular Painel</strong>.</p>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e2330', padding: '16px 24px', textAlign: 'center', fontSize: 12, color: '#334155' }}>
        AC Display — Plataforma de Dimensionamento de LED & Consultoria Técnica
      </footer>
    </div>
  );
}
