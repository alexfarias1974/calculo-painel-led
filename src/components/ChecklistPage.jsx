import React, { useState, useEffect } from 'react';

// ─── Inline Icons ─────────────────────────────────────────────────────────
const IconPrinter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconClipboard = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function ChecklistPage({ result, onBack }) {
  // Pre-fill dimensions from calculation if available
  const [formData, setFormData] = useState({
    // 1. Informações gerais
    clientName: '',
    installLocation: '',
    fullAddress: '',
    projectLead: '',
    phoneWhatsapp: '',
    targetInstallDate: '',
    environment: 'indoor', // 'indoor' | 'outdoor'
    mainGoal: '',
    operatingHours: '',
    runsEveryday: 'Sim',

    // 2. Dimensões e visualização
    desiredSize: result ? `${result.actualWidthM.toFixed(2)}m × ${result.actualHeightM.toFixed(2)}m` : '',
    desiredWidth: result ? `${result.actualWidthM.toFixed(2)} m` : '',
    desiredHeight: result ? `${result.actualHeightM.toFixed(2)} m` : '',
    spaceLimitations: '',
    avgAudienceDistance: result ? `${result.minViewDistM} metros` : '',
    maxAudienceDistance: '',
    viewingAngle: 'Frente e laterais',
    directSunlight: 'Não',
    ambientLighting: 'Média',

    // 3. Local e estrutura de instalação
    surfaceType: [], // ['Parede de alvenaria', 'Concreto', 'Estrutura metálica', 'ACM', 'Drywall', 'Fachada', 'Outra']
    surfaceOther: '',
    structureSupportsWeight: 'Sim',
    needsExtraStructure: 'Sim',
    needsStructuralReinforcement: 'A avaliar',
    mountStyle: 'Fixado diretamente na parede',
    hasRearAccess: 'Não',
    needsFrontMaintenance: 'Sim',
    installHeightFromFloor: '',
    heightEquipmentNeeded: '',
    accessForTransport: 'Sim',
    nearbyObstacles: '',

    // 4. Distâncias importantes
    powerDistToPanel: '',
    controllerDistToPanel: '',
    internetDistToController: '',
    electricPanelDistToPanel: '',
    hasControllerPlace: 'Sim',

    // 5. Infraestrutura elétrica
    has220V: 'Sim',
    hasDedicatedCircuit: 'Sim',
    hasNearbyBreakerBox: 'Sim',
    breakerBoxCapacityOk: 'Sim',
    needsNewCircuit: 'Não',
    hasGrounding: 'Sim',
    needsDedicatedBreaker: 'Sim',
    needsNewPowerCables: 'Sim',
    hasSurgeProtectionDPS: 'Sim',
    outdoorWeatherProtection: 'Sim',

    // 6. Internet e conectividade
    hasWiredInternet: 'Sim',
    hasNetworkPort: 'Sim',
    needsNewNetworkCable: 'Sim',
    internetStable: 'Sim',
    clientGrantsAccess: 'Sim',
    tiSecurityRestrictions: 'Não',
    needsWifiOr4G: 'Não',
    needsRemoteManagement: 'Sim',

    // 7. Conteúdo e mídias
    hasMediaTeam: 'Sim',
    contentCreationBy: 'Cliente',
    contentCreationOther: '',
    hasReadyMedia: 'Sim',
    mediaFormatResolutionOk: 'Sim',
    needsMediaAdaptation: 'Não',
    mediaTypes: 'Vídeos e imagens',
    needsRecurringProduction: 'Não',
    contentUpdateFrequency: '',

    // 8. Gestão do painel
    mediaChangeResponsible: '',
    panelManagerResponsible: '',
    managementType: 'Local',
    clientWantsAcDisplayManagement: 'Não',
    schedulingNeeds: [],
    multiplePanels: 'Não',
    sameContentAllPanels: 'Sim',

    // 9. Instalação e segurança
    timeRestrictions: 'Não',
    canInstallDuringBusinessHours: 'Sim',
    needsAreaIsolation: 'Sim',
    requiresDocumentation: 'Não',
    requiredDocsList: '',
    requiresAuthorization: 'Não',
    facadePermitsNeeded: 'Não',

    // 10. Operação e manutenção
    internalLeadPostInstall: '',
    wantsMaintenanceContract: 'Sim',
    expectedSLA: '24 horas',
    easyMaintenanceAccess: 'Sim',
    needsTraining: 'Sim',
    trainingParticipants: '',
    needsRemoteSupport: 'Sim',

    // REGISTRO TÉCNICO DO LOCAL (Checklist items)
    siteRecords: {
      photoFront: false,
      photoSides: false,
      photoStructure: false,
      photoBreakerBox: false,
      photoPowerPoint: false,
      photoInternetPoint: false,
      recordSpaceMeasures: false,
      recordDistances: false,
      recordObstacles: false,
      recordAccessConditions: false,
    },
    siteNotes: '',

    // INFORMAÇÕES PARA A COTAÇÃO
    quoteSummary: {
      finalDimensions: result ? `${result.actualWidthM.toFixed(2)}m × ${result.actualHeightM.toFixed(2)}m` : '',
      panelType: result?.pitchData?.category?.includes('Outdoor') ? 'Outdoor' : 'Indoor',
      pitchRecommended: result ? result.pitchData.id : '',
      structureNeeded: 'Estrutura tubular sob medida',
      fixingType: 'Fixação em parede com inserts metálicos',
      needsElectricalInfra: 'Circuito 220V com disjuntor exclusivo',
      needsNetworkInfra: 'Ponto de rede RJ45 gigabit',
      controllerNeeded: result ? 'Novastar TB / TU Séries' : '',
      heightEquipments: 'Andaime / Escada plataformada',
      installationLabor: 'Equipe técnica especializada AC Display',
      logisticsTransport: 'Frete dedicado com seguro',
      contentCreationService: 'Não contratado',
      contentManagementService: 'Não contratado',
      supportMaintenancePlan: 'Garantia padrão 24 meses',
    }
  });

  const handleTextChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxToggle = (group, item) => {
    setFormData(prev => {
      const currentList = prev[group] || [];
      const updated = currentList.includes(item)
        ? currentList.filter(x => x !== item)
        : [...currentList, item];
      return { ...prev, [group]: updated };
    });
  };

  const handleSiteRecordToggle = (key) => {
    setFormData(prev => ({
      ...prev,
      siteRecords: {
        ...prev.siteRecords,
        [key]: !prev.siteRecords[key]
      }
    }));
  };

  const handleQuoteSummaryChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      quoteSummary: {
        ...prev.quoteSummary,
        [field]: value
      }
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Render cabinet preview SVG for print/document
  const renderCabinetSvg = () => {
    if (!result) return null;
    const { cols, rows, actualWidthM, actualHeightM } = result;
    const svgW = 580;
    const svgH = 260;
    const pad = 36;
    const drawW = svgW - pad * 2;
    const drawH = svgH - pad * 2;

    const ratio = actualWidthM / actualHeightM;
    let pW = drawW;
    let pH = pW / ratio;
    if (pH > drawH) { pH = drawH; pW = pH * ratio; }

    const startX = pad + (drawW - pW) / 2;
    const startY = pad + (drawH - pH) / 2;
    const cW = pW / cols;
    const cH = pH / rows;

    return (
      <div className="checklist-svg-box">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="checklist-svg">
          <rect width={svgW} height={svgH} fill="#090c12" rx="8" />
          {/* Dimension Lines */}
          <line x1={startX} y1={startY - 10} x2={startX + pW} y2={startY - 10} stroke="#475569" strokeWidth="1" />
          <text x={startX + pW / 2} y={startY - 15} fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
            LARGURA: {actualWidthM.toFixed(3)} m ({cols} colunas)
          </text>

          <line x1={startX + pW + 10} y1={startY} x2={startX + pW + 10} y2={startY + pH} stroke="#475569" strokeWidth="1" />
          <text 
            x={startX + pW + 20} 
            y={startY + pH / 2} 
            fill="#94a3b8" 
            fontSize="10" 
            fontFamily="JetBrains Mono" 
            textAnchor="middle" 
            transform={`rotate(90, ${startX + pW + 20}, ${startY + pH / 2})`}
          >
            ALTURA: {actualHeightM.toFixed(3)} m ({rows} linhas)
          </text>

          {/* Cabinets */}
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const x = startX + c * cW;
              const y = startY + r * cH;
              const idx = r * cols + c + 1;
              return (
                <g key={`cab-${r}-${c}`}>
                  <rect
                    x={x + 0.5}
                    y={y + 0.5}
                    width={cW - 1}
                    height={cH - 1}
                    fill="#151b28"
                    stroke="#2e1a2c"
                    strokeWidth="1"
                    rx="1"
                  />
                  {cW > 20 && cH > 15 && (
                    <text
                      x={x + cW / 2}
                      y={y + cH / 2 + 3}
                      fill="#64748b"
                      fontSize={Math.min(cW * 0.35, 9)}
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

          {/* Border */}
          <rect x={startX} y={startY} width={pW} height={pH} fill="none" stroke="#e6007e" strokeWidth="1.5" rx="2" />
        </svg>
      </div>
    );
  };

  return (
    <div className="checklist-page-wrapper">
      
      {/* ── Top Bar with Actions ── */}
      <div className="checklist-top-actions no-print">
        <button className="btn-secondary" onClick={onBack}>
          <IconArrowLeft /> Voltar ao Calculador
        </button>

        <div className="checklist-top-actions-right">
          <button className="btn-calc" onClick={handlePrint}>
            <IconPrinter /> Gerar PDF / Imprimir Checklist
          </button>
        </div>
      </div>

      {/* ── Main Printable Document Container ── */}
      <div className="checklist-document" id="checklist-document">
        
        {/* Document Header */}
        <div className="checklist-doc-header">
          <div className="checklist-doc-brand">
            <img src="/logo.png" alt="AC Display" className="checklist-logo-img" />
            <div>
              <h1 className="checklist-doc-title">Checklist Técnico & Levantamento de Campo</h1>
              <p className="checklist-doc-subtitle">Dimensionamento, Infraestrutura e Requisitos de Instalação de Painel de LED</p>
            </div>
          </div>
          <div className="checklist-doc-meta">
            <span>Data do Levantamento: <strong>{new Date().toLocaleDateString('pt-BR')}</strong></span>
            <span>Versão: <strong>2.6 Pro</strong></span>
          </div>
        </div>

        {/* ── Summary Box of the Calculated LED Screen (If calculated) ── */}
        {result && (
          <div className="checklist-section-card highlight-box">
            <div className="checklist-section-title">
              <IconClipboard /> Especificações Técnicas do Painel Projetado
            </div>

            <div className="checklist-spec-grid">
              <div className="checklist-spec-item">
                <span className="spec-label">Pixel Pitch:</span>
                <span className="spec-val highlight">{result.pitchData.id} ({result.pitchData.pitch} mm)</span>
              </div>

              <div className="checklist-spec-item">
                <span className="spec-label">Dimensões Reais (L × A):</span>
                <span className="spec-val">{result.actualWidthM.toFixed(2)} m × {result.actualHeightM.toFixed(2)} m</span>
              </div>

              <div className="checklist-spec-item">
                <span className="spec-label">Área Total:</span>
                <span className="spec-val">{result.areaSqm.toFixed(2)} m²</span>
              </div>

              <div className="checklist-spec-item">
                <span className="spec-label">Total de Gabinetes:</span>
                <span className="spec-val highlight">{result.totalCabinets} un ({result.cols} col × {result.rows} lin)</span>
              </div>

              <div className="checklist-spec-item">
                <span className="spec-label">Resolução Nativa Total:</span>
                <span className="spec-val">{result.totalPxW} × {result.totalPxH} px ({result.resLabel})</span>
              </div>

              <div className="checklist-spec-item">
                <span className="spec-label">Total de Pixels:</span>
                <span className="spec-val">{result.totalPixels.toLocaleString('pt-BR')} pixels</span>
              </div>

              <div className="checklist-spec-item">
                <span className="spec-label">Resolução por Gabinete:</span>
                <span className="spec-val">{result.pxPerCabW} × {result.pxPerCabH} px</span>
              </div>

              <div className="checklist-spec-item">
                <span className="spec-label">Distância Mínima Recomendada:</span>
                <span className="spec-val">{result.minViewDistM} metros</span>
              </div>
            </div>

            {/* Cabinet Diagram Graphic */}
            <div style={{ marginTop: '16px' }}>
              <span className="spec-label" style={{ display: 'block', marginBottom: '8px' }}>
                Arranjo Gráfico do Grid de Gabinetes ({result.cols} colunas × {result.rows} linhas):
              </span>
              {renderCabinetSvg()}
            </div>
          </div>
        )}

        {/* ── 1. Informações Gerais ── */}
        <div className="checklist-section-card">
          <div className="checklist-section-title">1. Informações Gerais</div>
          <div className="checklist-fields-grid">
            <div className="field-group">
              <label className="field-label">Nome do cliente:</label>
              <input type="text" value={formData.clientName} onChange={e => handleTextChange('clientName', e.target.value)} placeholder="Empresa / Razão Social" />
            </div>

            <div className="field-group">
              <label className="field-label">Local da instalação:</label>
              <input type="text" value={formData.installLocation} onChange={e => handleTextChange('installLocation', e.target.value)} placeholder="ex: Auditório Principal, Fachada, Recepção" />
            </div>

            <div className="field-group full-width">
              <label className="field-label">Endereço completo:</label>
              <input type="text" value={formData.fullAddress} onChange={e => handleTextChange('fullAddress', e.target.value)} placeholder="Rua, número, bairro, cidade, CEP" />
            </div>

            <div className="field-group">
              <label className="field-label">Responsável pelo projeto:</label>
              <input type="text" value={formData.projectLead} onChange={e => handleTextChange('projectLead', e.target.value)} placeholder="Nome do contato do cliente" />
            </div>

            <div className="field-group">
              <label className="field-label">Telefone / WhatsApp:</label>
              <input type="text" value={formData.phoneWhatsapp} onChange={e => handleTextChange('phoneWhatsapp', e.target.value)} placeholder="(00) 00000-0000" />
            </div>

            <div className="field-group">
              <label className="field-label">Data prevista para instalação:</label>
              <input type="text" value={formData.targetInstallDate} onChange={e => handleTextChange('targetInstallDate', e.target.value)} placeholder="DD/MM/AAAA" />
            </div>

            <div className="field-group">
              <label className="field-label">Ambiente:</label>
              <select value={formData.environment} onChange={e => handleTextChange('environment', e.target.value)}>
                <option value="indoor">Ambiente Interno (Indoor)</option>
                <option value="outdoor">Ambiente Externo (Outdoor)</option>
              </select>
            </div>

            <div className="field-group full-width">
              <label className="field-label">Principal objetivo do painel:</label>
              <input type="text" value={formData.mainGoal} onChange={e => handleTextChange('mainGoal', e.target.value)} placeholder="Publicidade, ofertas, comunicação institucional, eventos, informações ao público, outros" />
            </div>

            <div className="field-group">
              <label className="field-label">Horário previsto de funcionamento:</label>
              <input type="text" value={formData.operatingHours} onChange={e => handleTextChange('operatingHours', e.target.value)} placeholder="ex: 08:00 às 22:00 (14h/dia) ou 24h" />
            </div>

            <div className="field-group">
              <label className="field-label">Funcionará todos os dias?</label>
              <select value={formData.runsEveryday} onChange={e => handleTextChange('runsEveryday', e.target.value)}>
                <option value="Sim">Sim, todos os dias (7 dias/semana)</option>
                <option value="Segunda a Sexta">Apenas Segunda a Sexta</option>
                <option value="Eventos esporádicos">Eventos esporádicos</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── 2. Dimensões e Visualização ── */}
        <div className="checklist-section-card">
          <div className="checklist-section-title">2. Dimensões e Visualização</div>
          <div className="checklist-fields-grid">
            <div className="field-group">
              <label className="field-label">Tamanho desejado para o painel:</label>
              <input type="text" value={formData.desiredSize} onChange={e => handleTextChange('desiredSize', e.target.value)} placeholder="ex: 3.00m × 1.68m" />
            </div>

            <div className="field-group">
              <label className="field-label">Largura:</label>
              <input type="text" value={formData.desiredWidth} onChange={e => handleTextChange('desiredWidth', e.target.value)} placeholder="ex: 3.00 m" />
            </div>

            <div className="field-group">
              <label className="field-label">Altura:</label>
              <input type="text" value={formData.desiredHeight} onChange={e => handleTextChange('desiredHeight', e.target.value)} placeholder="ex: 1.68 m" />
            </div>

            <div className="field-group">
              <label className="field-label">Existe alguma limitação de espaço para instalação?</label>
              <input type="text" value={formData.spaceLimitations} onChange={e => handleTextChange('spaceLimitations', e.target.value)} placeholder="ex: nicho de 3.20m, pé direito limite de 2.50m" />
            </div>

            <div className="field-group">
              <label className="field-label">Distância média entre o público e o painel:</label>
              <input type="text" value={formData.avgAudienceDistance} onChange={e => handleTextChange('avgAudienceDistance', e.target.value)} placeholder="ex: 3 metros" />
            </div>

            <div className="field-group">
              <label className="field-label">Qual é a maior distância de visualização?</label>
              <input type="text" value={formData.maxAudienceDistance} onChange={e => handleTextChange('maxAudienceDistance', e.target.value)} placeholder="ex: 15 metros" />
            </div>

            <div className="field-group">
              <label className="field-label">Ângulo de visualização do público:</label>
              <select value={formData.viewingAngle} onChange={e => handleTextChange('viewingAngle', e.target.value)}>
                <option value="Frente e laterais">De frente e também pelas laterais (Amplo)</option>
                <option value="Apenas de frente">Apenas diretamente de frente</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Receberá incidência direta de luz solar?</label>
              <select value={formData.directSunlight} onChange={e => handleTextChange('directSunlight', e.target.value)}>
                <option value="Não">Não (Sombra / Ambiente controlado)</option>
                <option value="Sim (parcial)">Sim, em horários específicos do dia</option>
                <option value="Sim (direta intensa)">Sim, incidência solar direta intensa (exige alto brilho nits)</option>
              </select>
            </div>

            <div className="field-group full-width">
              <label className="field-label">O local possui muita iluminação natural ou artificial?</label>
              <input type="text" value={formData.ambientLighting} onChange={e => handleTextChange('ambientLighting', e.target.value)} placeholder="Descreva as condições de luz do ambiente" />
            </div>
          </div>
        </div>

        {/* ── 3. Local e Estrutura de Instalação ── */}
        <div className="checklist-section-card">
          <div className="checklist-section-title">3. Local e Estrutura de Instalação</div>
          
          <div className="field-group full-width" style={{ marginBottom: '14px' }}>
            <label className="field-label">Em qual superfície o painel será instalado?</label>
            <div className="checklist-checkbox-grid">
              {['Parede de alvenaria', 'Concreto', 'Estrutura metálica', 'ACM', 'Drywall', 'Fachada'].map(item => (
                <label key={item} className="checklist-check-item">
                  <input
                    type="checkbox"
                    checked={formData.surfaceType.includes(item)}
                    onChange={() => handleCheckboxToggle('surfaceType', item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
            <input
              type="text"
              style={{ marginTop: '8px' }}
              value={formData.surfaceOther}
              onChange={e => handleTextChange('surfaceOther', e.target.value)}
              placeholder="Outra superfície / detalhes adicionais"
            />
          </div>

          <div className="checklist-fields-grid">
            <div className="field-group">
              <label className="field-label">A estrutura existente suporta o peso do painel?</label>
              <select value={formData.structureSupportsWeight} onChange={e => handleTextChange('structureSupportsWeight', e.target.value)}>
                <option value="Sim">Sim, suporta</option>
                <option value="Não">Não suporta</option>
                <option value="A avaliar">Necessita laudo / avaliação técnica</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Será necessária estrutura metálica adicional?</label>
              <select value={formData.needsExtraStructure} onChange={e => handleTextChange('needsExtraStructure', e.target.value)}>
                <option value="Sim">Sim, fornecer estrutura metálica</option>
                <option value="Não">Não, estrutura existente pronta</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Será necessário reforço estrutural?</label>
              <input type="text" value={formData.needsStructuralReinforcement} onChange={e => handleTextChange('needsStructuralReinforcement', e.target.value)} placeholder="Sim / Não / Detalhes" />
            </div>

            <div className="field-group">
              <label className="field-label">Tipo de fixação:</label>
              <select value={formData.mountStyle} onChange={e => handleTextChange('mountStyle', e.target.value)}>
                <option value="Fixado diretamente na parede">Fixado diretamente na parede</option>
                <option value="Afastado da parede com estrutura">Afastado da parede com estrutura</option>
                <option value="Pendurado / Suspenso">Pendurado / Suspenso</option>
                <option value="Totem / Solo">Totem / Solo</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Existe espaço para manutenção traseira?</label>
              <select value={formData.hasRearAccess} onChange={e => handleTextChange('hasRearAccess', e.target.value)}>
                <option value="Não">Não (Requer gabinetes com manutenção frontal)</option>
                <option value="Sim">Sim (Acesso traseiro livre)</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Necessário painel com manutenção frontal?</label>
              <select value={formData.needsFrontMaintenance} onChange={e => handleTextChange('needsFrontMaintenance', e.target.value)}>
                <option value="Sim">Sim, manutenção frontal por vácuo/ímã</option>
                <option value="Não">Não, manutenção traseira padrão</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Altura de instalação em relação ao chão:</label>
              <input type="text" value={formData.installHeightFromFloor} onChange={e => handleTextChange('installHeightFromFloor', e.target.value)} placeholder="ex: 1.20 metros do chão" />
            </div>

            <div className="field-group">
              <label className="field-label">Equipamento para trabalho em altura:</label>
              <input type="text" value={formData.heightEquipmentNeeded} onChange={e => handleTextChange('heightEquipmentNeeded', e.target.value)} placeholder="Andaime, plataforma elevatória, munck, escada" />
            </div>

            <div className="field-group">
              <label className="field-label">Acesso para entrada e transporte:</label>
              <input type="text" value={formData.accessForTransport} onChange={e => handleTextChange('accessForTransport', e.target.value)} placeholder="Elevador de carga, escadas, portas largas" />
            </div>

            <div className="field-group">
              <label className="field-label">Obstáculos próximos ao local:</label>
              <input type="text" value={formData.nearbyObstacles} onChange={e => handleTextChange('nearbyObstacles', e.target.value)} placeholder="Vigas, tubulações, luminárias, ar condicionado" />
            </div>
          </div>
        </div>

        {/* ── 4. Distâncias Importantes ── */}
        <div className="checklist-section-card">
          <div className="checklist-section-title">4. Distâncias Importantes</div>
          <div className="checklist-fields-grid">
            <div className="field-group">
              <label className="field-label">Distância do ponto de energia até o painel:</label>
              <input type="text" value={formData.powerDistToPanel} onChange={e => handleTextChange('powerDistToPanel', e.target.value)} placeholder="ex: 5 metros" />
            </div>

            <div className="field-group">
              <label className="field-label">Distância da controladora até o painel:</label>
              <input type="text" value={formData.controllerDistToPanel} onChange={e => handleTextChange('controllerDistToPanel', e.target.value)} placeholder="ex: 15 metros (limite cabo RJ45: 80m)" />
            </div>

            <div className="field-group">
              <label className="field-label">Distância do ponto de internet até a controladora:</label>
              <input type="text" value={formData.internetDistToController} onChange={e => handleTextChange('internetDistToController', e.target.value)} placeholder="ex: 2 metros" />
            </div>

            <div className="field-group">
              <label className="field-label">Distância do quadro elétrico até o painel:</label>
              <input type="text" value={formData.electricPanelDistToPanel} onChange={e => handleTextChange('electricPanelDistToPanel', e.target.value)} placeholder="ex: 20 metros" />
            </div>

            <div className="field-group full-width">
              <label className="field-label">Existe local adequado para instalação da controladora?</label>
              <input type="text" value={formData.hasControllerPlace} onChange={e => handleTextChange('hasControllerPlace', e.target.value)} placeholder="Rack, armário ventilado, mesa técnica, atrás do painel" />
            </div>
          </div>
        </div>

        {/* ── 5. Infraestrutura Elétrica ── */}
        <div className="checklist-section-card">
          <div className="checklist-section-title">5. Infraestrutura Elétrica</div>
          <div className="checklist-fields-grid">
            <div className="field-group">
              <label className="field-label">O local possui rede elétrica 220V?</label>
              <select value={formData.has220V} onChange={e => handleTextChange('has220V', e.target.value)}>
                <option value="Sim">Sim, rede 220V disponível</option>
                <option value="Apenas 110V/127V">Apenas 110V/127V (Requer transformador ou nova fase)</option>
                <option value="Trifásico 220V/380V">Trifásico 220V/380V</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Existe circuito elétrico exclusivo para o painel?</label>
              <select value={formData.hasDedicatedCircuit} onChange={e => handleTextChange('hasDedicatedCircuit', e.target.value)}>
                <option value="Sim">Sim, circuito exclusivo</option>
                <option value="Não">Não, precisa ser criado</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Quadro elétrico próximo à instalação?</label>
              <input type="text" value={formData.hasNearbyBreakerBox} onChange={e => handleTextChange('hasNearbyBreakerBox', e.target.value)} placeholder="Sim / Não / Localização" />
            </div>

            <div className="field-group">
              <label className="field-label">Capacidade disponível para a carga?</label>
              <input type="text" value={formData.breakerBoxCapacityOk} onChange={e => handleTextChange('breakerBoxCapacityOk', e.target.value)} placeholder="Sim / A verificar com eletricista" />
            </div>

            <div className="field-group">
              <label className="field-label">Será necessário criar um novo circuito elétrico?</label>
              <select value={formData.needsNewCircuit} onChange={e => handleTextChange('needsNewCircuit', e.target.value)}>
                <option value="Sim">Sim, novo circuito com disjuntor exclusivo</option>
                <option value="Não">Não, circuito existente pronto</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Existe aterramento adequado?</label>
              <select value={formData.hasGrounding} onChange={e => handleTextChange('hasGrounding', e.target.value)}>
                <option value="Sim">Sim, aterramento padrão NBR 5410</option>
                <option value="Não">Não possui aterramento</option>
                <option value="A verificar">A verificar</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Necessário disjuntores ou quadro exclusivo?</label>
              <input type="text" value={formData.needsDedicatedBreaker} onChange={e => handleTextChange('needsDedicatedBreaker', e.target.value)} placeholder="Sim / Não" />
            </div>

            <div className="field-group">
              <label className="field-label">Necessário passar novos cabos elétricos?</label>
              <input type="text" value={formData.needsNewPowerCables} onChange={e => handleTextChange('needsNewPowerCables', e.target.value)} placeholder="Sim / Não" />
            </div>

            <div className="field-group">
              <label className="field-label">Existe proteção contra surtos elétricos (DPS)?</label>
              <input type="text" value={formData.hasSurgeProtectionDPS} onChange={e => handleTextChange('hasSurgeProtectionDPS', e.target.value)} placeholder="Sim / Não / Recomendado instalar" />
            </div>

            <div className="field-group">
              <label className="field-label">Proteção contra chuva/umidade (se externo):</label>
              <input type="text" value={formData.outdoorWeatherProtection} onChange={e => handleTextChange('outdoorWeatherProtection', e.target.value)} placeholder="Caixa hermética IP65, conduítes blindados" />
            </div>
          </div>
        </div>

        {/* ── 6. Internet e Conectividade ── */}
        <div className="checklist-section-card">
          <div className="checklist-section-title">6. Internet e Conectividade</div>
          <div className="checklist-fields-grid">
            <div className="field-group">
              <label className="field-label">Internet cabeada disponível próximo à controladora?</label>
              <select value={formData.hasWiredInternet} onChange={e => handleTextChange('hasWiredInternet', e.target.value)}>
                <option value="Sim">Sim, ponto RJ45 cabeado disponível</option>
                <option value="Não">Não disponível</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Será necessário lançar um novo cabo de rede?</label>
              <input type="text" value={formData.needsNewNetworkCable} onChange={e => handleTextChange('needsNewNetworkCable', e.target.value)} placeholder="Sim / Não" />
            </div>

            <div className="field-group">
              <label className="field-label">A internet disponível é estável?</label>
              <select value={formData.internetStable} onChange={e => handleTextChange('internetStable', e.target.value)}>
                <option value="Sim">Sim, link dedicado / fibra estável</option>
                <option value="Oscilações frequentes">Oscilações frequentes</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Cliente disponibilizará acesso à rede?</label>
              <select value={formData.clientGrantsAccess} onChange={e => handleTextChange('clientGrantsAccess', e.target.value)}>
                <option value="Sim">Sim, rede liberada</option>
                <option value="VLAN dedicada">Criará VLAN dedicada para o painel</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Restrições de TI ou segurança de rede?</label>
              <input type="text" value={formData.tiSecurityRestrictions} onChange={e => handleTextChange('tiSecurityRestrictions', e.target.value)} placeholder="Firewall rígido, proxy, portas bloqueadas" />
            </div>

            <div className="field-group">
              <label className="field-label">Necessária conexão Wi-Fi ou Modem 4G/5G?</label>
              <input type="text" value={formData.needsWifiOr4G} onChange={e => handleTextChange('needsWifiOr4G', e.target.value)} placeholder="Sim (Chip 4G/5G) / Wi-Fi / Não" />
            </div>

            <div className="field-group full-width">
              <label className="field-label">O painel precisará ser gerenciado remotamente?</label>
              <select value={formData.needsRemoteManagement} onChange={e => handleTextChange('needsRemoteManagement', e.target.value)}>
                <option value="Sim">Sim, gerenciamento remoto em nuvem (VNNOX / Cloud)</option>
                <option value="Não">Não, apenas pendrive / local</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── 7. Conteúdo e Mídias ── */}
        <div className="checklist-section-card">
          <div className="checklist-section-title">7. Conteúdo e Mídias</div>
          <div className="checklist-fields-grid">
            <div className="field-group">
              <label className="field-label">Equipe responsável por criação das mídias:</label>
              <select value={formData.contentCreationBy} onChange={e => handleTextChange('contentCreationBy', e.target.value)}>
                <option value="Cliente">Equipe interna do Cliente</option>
                <option value="Agência do cliente">Agência de publicidade do cliente</option>
                <option value="AC Display">AC Display (Serviço contratado)</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">O cliente já possui mídias prontas?</label>
              <select value={formData.hasReadyMedia} onChange={e => handleTextChange('hasReadyMedia', e.target.value)}>
                <option value="Sim">Sim, prontas</option>
                <option value="Em produção">Em fase de produção</option>
                <option value="Não">Não possui</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Mídias no formato e resolução adequados?</label>
              <input type="text" value={formData.mediaFormatResolutionOk} onChange={e => handleTextChange('mediaFormatResolutionOk', e.target.value)} placeholder="Sim / Precisarão ser ajustadas" />
            </div>

            <div className="field-group">
              <label className="field-label">Necessária adaptação das peças?</label>
              <input type="text" value={formData.needsMediaAdaptation} onChange={e => handleTextChange('needsMediaAdaptation', e.target.value)} placeholder="Sim / Não" />
            </div>

            <div className="field-group">
              <label className="field-label">Tipo de mídias exibidas:</label>
              <select value={formData.mediaTypes} onChange={e => handleTextChange('mediaTypes', e.target.value)}>
                <option value="Vídeos e imagens">Vídeos e imagens estáticas (ambos)</option>
                <option value="Apenas vídeos">Apenas vídeos em alta taxa de quadros</option>
                <option value="Apenas imagens estáticas">Apenas imagens estáticas / banners</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Frequência de atualização dos conteúdos:</label>
              <input type="text" value={formData.contentUpdateFrequency} onChange={e => handleTextChange('contentUpdateFrequency', e.target.value)} placeholder="Diária, semanal, mensal, esporádica" />
            </div>
          </div>
        </div>

        {/* ── 8. Gestão do Painel ── */}
        <div className="checklist-section-card">
          <div className="checklist-section-title">8. Gestão do Painel</div>
          <div className="checklist-fields-grid">
            <div className="field-group">
              <label className="field-label">Quem será responsável por trocar as mídias?</label>
              <input type="text" value={formData.mediaChangeResponsible} onChange={e => handleTextChange('mediaChangeResponsible', e.target.value)} placeholder="Nome / Departamento" />
            </div>

            <div className="field-group">
              <label className="field-label">Quem será responsável por gerenciar o painel?</label>
              <input type="text" value={formData.panelManagerResponsible} onChange={e => handleTextChange('panelManagerResponsible', e.target.value)} placeholder="Nome / Departamento" />
            </div>

            <div className="field-group">
              <label className="field-label">O gerenciamento será:</label>
              <select value={formData.managementType} onChange={e => handleTextChange('managementType', e.target.value)}>
                <option value="Local">Local (computador no local / pendrive)</option>
                <option value="Remoto">Remoto via software em nuvem</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Cliente deseja gerenciamento pela AC Display?</label>
              <select value={formData.clientWantsAcDisplayManagement} onChange={e => handleTextChange('clientWantsAcDisplayManagement', e.target.value)}>
                <option value="Não">Não, gestão pelo cliente</option>
                <option value="Sim">Sim, contratar gestão AC Display</option>
              </select>
            </div>

            <div className="field-group full-width">
              <label className="field-label">Programação de conteúdos necessária por:</label>
              <div className="checklist-checkbox-grid">
                {['Horário', 'Dia da semana', 'Campanha', 'Unidade / Local'].map(item => (
                  <label key={item} className="checklist-check-item">
                    <input
                      type="checkbox"
                      checked={formData.schedulingNeeds.includes(item)}
                      onChange={() => handleCheckboxToggle('schedulingNeeds', item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Haverá mais de um painel sendo gerenciado?</label>
              <input type="text" value={formData.multiplePanels} onChange={e => handleTextChange('multiplePanels', e.target.value)} placeholder="Sim (quantos?) / Não" />
            </div>

            <div className="field-group">
              <label className="field-label">Mesmos conteúdos em todos os painéis?</label>
              <input type="text" value={formData.sameContentAllPanels} onChange={e => handleTextChange('sameContentAllPanels', e.target.value)} placeholder="Sim / Conteúdos segmentados por tela" />
            </div>
          </div>
        </div>

        {/* ── 9. Instalação e Segurança ── */}
        <div className="checklist-section-card">
          <div className="checklist-section-title">9. Instalação e Segurança</div>
          <div className="checklist-fields-grid">
            <div className="field-group">
              <label className="field-label">Restrição de horário para instalação?</label>
              <input type="text" value={formData.timeRestrictions} onChange={e => handleTextChange('timeRestrictions', e.target.value)} placeholder="Apenas noturno, finais de semana ou livre" />
            </div>

            <div className="field-group">
              <label className="field-label">Instalação durante funcionamento do local?</label>
              <select value={formData.canInstallDuringBusinessHours} onChange={e => handleTextChange('canInstallDuringBusinessHours', e.target.value)}>
                <option value="Sim">Sim, permitido</option>
                <option value="Não">Não permitido (apenas fora do expediente)</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Necessário isolamento da área?</label>
              <input type="text" value={formData.needsAreaIsolation} onChange={e => handleTextChange('needsAreaIsolation', e.target.value)} placeholder="Sim (com fitas/cones) / Não" />
            </div>

            <div className="field-group">
              <label className="field-label">Documentação técnica exigida (NRs, ASO)?</label>
              <input type="text" value={formData.requiredDocsList} onChange={e => handleTextChange('requiredDocsList', e.target.value)} placeholder="NR-35 (Altura), NR-10 (Elétrica), ASO, EPIs" />
            </div>

            <div className="field-group">
              <label className="field-label">Autorização de condomínio / shopping?</label>
              <input type="text" value={formData.requiresAuthorization} onChange={e => handleTextChange('requiresAuthorization', e.target.value)} placeholder="Sim (já emitida / em andamento) / Não" />
            </div>

            <div className="field-group">
              <label className="field-label">Para fachada: exigência de alvará/autorização?</label>
              <input type="text" value={formData.facadePermitsNeeded} onChange={e => handleTextChange('facadePermitsNeeded', e.target.value)} placeholder="Lei cidade limpa, alvará prefeitura" />
            </div>
          </div>
        </div>

        {/* ── 10. Operação e Manutenção ── */}
        <div className="checklist-section-card">
          <div className="checklist-section-title">10. Operação e Manutenção</div>
          <div className="checklist-fields-grid">
            <div className="field-group">
              <label className="field-label">Responsável interno pós-instalação:</label>
              <input type="text" value={formData.internalLeadPostInstall} onChange={e => handleTextChange('internalLeadPostInstall', e.target.value)} placeholder="Nome e cargo" />
            </div>

            <div className="field-group">
              <label className="field-label">Cliente deseja contrato de manutenção?</label>
              <select value={formData.wantsMaintenanceContract} onChange={e => handleTextChange('wantsMaintenanceContract', e.target.value)}>
                <option value="Sim">Sim, incluir proposta de manutenção preventiva/corretiva</option>
                <option value="Apenas garantia padrão">Apenas garantia padrão de 24 meses</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">SLA esperado para atendimento técnico:</label>
              <input type="text" value={formData.expectedSLA} onChange={e => handleTextChange('expectedSLA', e.target.value)} placeholder="ex: 4h, 12h, 24h ou 48h úteis" />
            </div>

            <div className="field-group">
              <label className="field-label">Acesso facilitado para futuras manutenções?</label>
              <input type="text" value={formData.easyMaintenanceAccess} onChange={e => handleTextChange('easyMaintenanceAccess', e.target.value)} placeholder="Sim / Requer agendamento prévio" />
            </div>

            <div className="field-group">
              <label className="field-label">Cliente precisa de treinamento do sistema?</label>
              <select value={formData.needsTraining} onChange={e => handleTextChange('needsTraining', e.target.value)}>
                <option value="Sim">Sim, treinamento presencial / online incluso</option>
                <option value="Não">Não necessário</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Quem participará do treinamento?</label>
              <input type="text" value={formData.trainingParticipants} onChange={e => handleTextChange('trainingParticipants', e.target.value)} placeholder="Nomes / Equipe de TI / Marketing" />
            </div>

            <div className="field-group full-width">
              <label className="field-label">Será necessário suporte remoto para atualização de conteúdos?</label>
              <input type="text" value={formData.needsRemoteSupport} onChange={e => handleTextChange('needsRemoteSupport', e.target.value)} placeholder="Sim / Não" />
            </div>
          </div>
        </div>

        {/* ── REGISTRO TÉCNICO DO LOCAL ── */}
        <div className="checklist-section-card">
          <div className="checklist-section-title">REGISTRO TÉCNICO DO LOCAL</div>
          <p className="checklist-card-desc">Marque os registros fotográficos e medições conferidas in loco:</p>
          
          <div className="checklist-tasks-grid">
            {[
              { key: 'photoFront', label: 'Tirar foto frontal do local de instalação.' },
              { key: 'photoSides', label: 'Tirar fotos laterais.' },
              { key: 'photoStructure', label: 'Tirar foto da estrutura/parede.' },
              { key: 'photoBreakerBox', label: 'Tirar foto do quadro elétrico.' },
              { key: 'photoPowerPoint', label: 'Tirar foto do ponto de energia.' },
              { key: 'photoInternetPoint', label: 'Tirar foto do ponto de internet/rede.' },
              { key: 'recordSpaceMeasures', label: 'Registrar as medidas do espaço disponível.' },
              { key: 'recordDistances', label: 'Registrar as distâncias entre painel, energia, internet e controladora.' },
              { key: 'recordObstacles', label: 'Registrar possíveis obstáculos para instalação.' },
              { key: 'recordAccessConditions', label: 'Registrar condições de acesso para equipamentos e equipe técnica.' },
            ].map(task => (
              <label key={task.key} className="checklist-task-item">
                <input
                  type="checkbox"
                  checked={formData.siteRecords[task.key]}
                  onChange={() => handleSiteRecordToggle(task.key)}
                />
                <span className={formData.siteRecords[task.key] ? 'checked-text' : ''}>
                  {task.label}
                </span>
              </label>
            ))}
          </div>

          <div className="field-group full-width" style={{ marginTop: '16px' }}>
            <label className="field-label">Observações e Anotações de Campo:</label>
            <textarea
              rows="3"
              value={formData.siteNotes}
              onChange={e => handleTextChange('siteNotes', e.target.value)}
              placeholder="Descreva detalhes específicos observados no local que possam impactar o projeto..."
            />
          </div>
        </div>

        {/* ── INFORMAÇÕES PARA A COTAÇÃO ── */}
        <div className="checklist-section-card quote-box">
          <div className="checklist-section-title">INFORMAÇÕES PARA A COTAÇÃO</div>
          <p className="checklist-card-desc">Definições finais consolidadas para elaboração da proposta comercial e engenharia:</p>

          <div className="checklist-fields-grid">
            <div className="field-group">
              <label className="field-label">Dimensão final do painel:</label>
              <input type="text" value={formData.quoteSummary.finalDimensions} onChange={e => handleQuoteSummaryChange('finalDimensions', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Tipo de painel:</label>
              <input type="text" value={formData.quoteSummary.panelType} onChange={e => handleQuoteSummaryChange('panelType', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Pixel pitch recomendado:</label>
              <input type="text" value={formData.quoteSummary.pitchRecommended} onChange={e => handleQuoteSummaryChange('pitchRecommended', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Estrutura metálica necessária:</label>
              <input type="text" value={formData.quoteSummary.structureNeeded} onChange={e => handleQuoteSummaryChange('structureNeeded', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Tipo de fixação:</label>
              <input type="text" value={formData.quoteSummary.fixingType} onChange={e => handleQuoteSummaryChange('fixingType', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Necessidade de infraestrutura elétrica:</label>
              <input type="text" value={formData.quoteSummary.needsElectricalInfra} onChange={e => handleQuoteSummaryChange('needsElectricalInfra', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Necessidade de infraestrutura de rede:</label>
              <input type="text" value={formData.quoteSummary.needsNetworkInfra} onChange={e => handleQuoteSummaryChange('needsNetworkInfra', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Controladora necessária:</label>
              <input type="text" value={formData.quoteSummary.controllerNeeded} onChange={e => handleQuoteSummaryChange('controllerNeeded', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Equipamentos para instalação em altura:</label>
              <input type="text" value={formData.quoteSummary.heightEquipments} onChange={e => handleQuoteSummaryChange('heightEquipments', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Mão de obra de instalação:</label>
              <input type="text" value={formData.quoteSummary.installationLabor} onChange={e => handleQuoteSummaryChange('installationLabor', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Transporte / logística:</label>
              <input type="text" value={formData.quoteSummary.logisticsTransport} onChange={e => handleQuoteSummaryChange('logisticsTransport', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Serviço de criação de conteúdo:</label>
              <input type="text" value={formData.quoteSummary.contentCreationService} onChange={e => handleQuoteSummaryChange('contentCreationService', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Serviço de gerenciamento de conteúdo:</label>
              <input type="text" value={formData.quoteSummary.contentManagementService} onChange={e => handleQuoteSummaryChange('contentManagementService', e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Plano de suporte / manutenção:</label>
              <input type="text" value={formData.quoteSummary.supportMaintenancePlan} onChange={e => handleQuoteSummaryChange('supportMaintenancePlan', e.target.value)} />
            </div>
          </div>
        </div>

        {/* ── Document Signatures Footer ── */}
        <div className="checklist-signatures-row">
          <div className="signature-box">
            <div className="sig-line" />
            <span className="sig-label">Consultor Comercial / Técnico AC Display</span>
          </div>

          <div className="signature-box">
            <div className="sig-line" />
            <span className="sig-label">Responsável pelo Cliente / Aprovação</span>
          </div>
        </div>

      </div>

      {/* ── Bottom Floating Action Bar ── */}
      <div className="checklist-bottom-bar no-print">
        <button className="btn-secondary" onClick={onBack}>
          <IconArrowLeft /> Voltar ao Calculador
        </button>

        <button className="btn-calc" onClick={handlePrint}>
          <IconPrinter /> Gerar PDF / Imprimir Checklist
        </button>
      </div>

    </div>
  );
}
