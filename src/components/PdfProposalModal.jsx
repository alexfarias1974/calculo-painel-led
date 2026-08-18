import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Building2, 
  User, 
  Calendar, 
  ShieldCheck, 
  FileText,
  DollarSign
} from 'lucide-react';

export default function PdfProposalModal({ isOpen, onClose, calcResult }) {
  if (!isOpen) return null;

  const [clientName, setClientName] = useState('Cliente Exemplo / Empresa S.A.');
  const [salesRepName, setSalesRepName] = useState('Consultor AC Display');
  const [proposalNumber, setProposalNumber] = useState(`PROP-${Math.floor(100000 + Math.random() * 900000)}`);
  const [notes, setNotes] = useState('Incluso instalação técnica, testes de comissionamento e treinamento da equipe local.');

  const currentDate = new Date().toLocaleDateString('pt-BR');

  const {
    pitchData,
    cols,
    rows,
    totalCabinets,
    actualWidthM,
    actualHeightM,
    totalAreaSqm,
    totalPixelsH,
    totalPixelsV,
    totalPixelCount,
    diagonalInches,
    resBadge,
    grandTotalWeightKg,
    maxPowerWatts,
    recommendedController,
    costBreakdown
  } = calcResult;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(0,243,255,0.25)] overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-950">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold tracking-wide uppercase text-white">
              Gerador de Proposta Comercial de Painel de LED
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="btn-cyber-primary text-xs py-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body & Printable Document Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-100 font-sans print:p-0 print:bg-white print:text-black">
          
          {/* Printable Proposal Header */}
          <div id="printable-proposal" className="bg-slate-950 p-8 rounded-2xl border border-slate-800 space-y-6">
            
            {/* Proposal Brand Header */}
            <div className="flex justify-between items-start border-b border-cyan-500/30 pb-5">
              <div>
                <h1 className="text-2xl font-black text-white tracking-wider">
                  AC <span className="text-cyan-400">DISPLAY</span>
                </h1>
                <p className="text-xs text-cyan-300 font-mono">
                  Sistemas de Exibição Digital & Painéis de LED High-End
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  www.acdisplay.com.br | Comercial & Engenharia
                </p>
              </div>

              <div className="text-right font-mono text-xs">
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full font-bold border border-cyan-500/40">
                  PROPOSTA {proposalNumber}
                </span>
                <p className="text-slate-400 mt-2">Data: {currentDate}</p>
                <p className="text-slate-400">Validade: 10 Dias</p>
              </div>
            </div>

            {/* Client & Salesperson Editable Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Cliente / Razão Social:</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="cyber-input py-1 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Consultor Comercial:</label>
                <input
                  type="text"
                  value={salesRepName}
                  onChange={(e) => setSalesRepName(e.target.value)}
                  className="cyber-input py-1 text-xs"
                />
              </div>
            </div>

            {/* Technical Specifications Summary Table */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                1. Especificações Técnicas do Projeto
              </h3>

              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden text-xs font-mono">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-800">
                      <td className="p-3 text-slate-400 font-semibold bg-slate-950/60 w-1/3">Modelo / Pixel Pitch:</td>
                      <td className="p-3 font-bold text-white">{pitchData.name} ({pitchData.id})</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-3 text-slate-400 font-semibold bg-slate-950/60">Dimensões Finais (L × A):</td>
                      <td className="p-3 font-bold text-cyan-300">{actualWidthM.toFixed(2)}m × {actualHeightM.toFixed(2)}m (Diagonal {diagonalInches}")</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-3 text-slate-400 font-semibold bg-slate-950/60">Área Total do Painel:</td>
                      <td className="p-3 font-bold text-white">{totalAreaSqm.toFixed(2)} m²</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-3 text-slate-400 font-semibold bg-slate-950/60">Arranjo de Gabinetes:</td>
                      <td className="p-3 text-white">{cols} Colunas × {rows} Linhas ({totalCabinets} Gabinetes)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-3 text-slate-400 font-semibold bg-slate-950/60">Resolução Nativa Total:</td>
                      <td className="p-3 font-bold text-indigo-300">{totalPixelsH} × {totalPixelsV} Pixels ({resBadge.label})</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-3 text-slate-400 font-semibold bg-slate-950/60">Processador / Controladora:</td>
                      <td className="p-3 text-white">{recommendedController.name}</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-3 text-slate-400 font-semibold bg-slate-950/60">Potência Máxima:</td>
                      <td className="p-3 text-amber-300">{(maxPowerWatts / 1000).toFixed(2)} kW (220V)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400 font-semibold bg-slate-950/60">Peso Estimado Total:</td>
                      <td className="p-3 text-slate-300">{grandTotalWeightKg.toFixed(0)} kg (Painel + Estrutura)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Commercial Pricing Breakdown */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                2. Investimento Comercial & Condições
              </h3>

              <div className="bg-slate-900 rounded-xl border border-cyan-500/30 overflow-hidden text-xs font-mono">
                <table className="w-full text-left">
                  <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3">Item / Descrição</th>
                      <th className="p-3 text-center">Qtd</th>
                      <th className="p-3 text-right">Valor Total (R$)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    <tr>
                      <td className="p-3 font-semibold">Gabinetes de LED {pitchData.id} High Refresh ({totalAreaSqm.toFixed(2)}m²)</td>
                      <td className="p-3 text-center">{totalCabinets} un</td>
                      <td className="p-3 text-right">R$ {(costBreakdown.totalCabinetsCostBRL * 1.35).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">{recommendedController.name} Processador 4K</td>
                      <td className="p-3 text-center">1 un</td>
                      <td className="p-3 text-right">R$ {(costBreakdown.controllerCostBRL * 1.35).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Estrutura Metálica de Suporte e Fixação Robusta</td>
                      <td className="p-3 text-center">1 kit</td>
                      <td className="p-3 text-right">R$ {(costBreakdown.structureCostBRL * 1.35).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Kit de Peças de Reposição (Módulos & Fontes Spare Parts)</td>
                      <td className="p-3 text-center">1 kit</td>
                      <td className="p-3 text-right">R$ {(costBreakdown.sparePartsBRL * 1.35).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-950 border-t border-cyan-500/40 text-sm">
                    <tr>
                      <td colSpan="2" className="p-4 font-bold text-white text-right">INVESTIMENTO TOTAL COM PROJETO:</td>
                      <td className="p-4 font-bold text-cyan-400 text-right text-base glow-text-cyan">
                        R$ {costBreakdown.finalPriceBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Commercial Terms & Guarantee */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1 font-sans">
              <h4 className="font-bold text-slate-200 uppercase text-[11px] mb-1">Garantia & Termos Comerciais:</h4>
              <p>• Garantia de Fábrica AC Display: 24 Meses contra defeitos de fabricação.</p>
              <p>• Prazo de Entrega Estimado: 25 a 35 dias úteis após confirmação do pedido.</p>
              <p>• Suporte Técnico Especializado 24/7 com equipe treinada local.</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
