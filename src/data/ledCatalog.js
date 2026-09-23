// ─── LED Panel Calculation Data & Engine ───────────────────────────────────

// Pixel Pitch presets
export const PITCH_PRESETS = [
  { id: 'P0.9',  pitch: 0.9,  name: 'P0.9',  label: 'P0.9 — Fine Pitch Indoor',          category: 'Fine Pitch Indoor' },
  { id: 'P1.25', pitch: 1.25, name: 'P1.25', label: 'P1.25 — Fine Pitch Indoor',         category: 'Fine Pitch Indoor' },
  { id: 'P1.56', pitch: 1.56, name: 'P1.56', label: 'P1.56 — Fine Pitch 16:9 Indoor',    category: 'Fine Pitch Indoor' },
  { id: 'P1.875',pitch: 1.875,name: 'P1.875',label: 'P1.875 — Indoor High Resolution',  category: 'Indoor Commercial' },
  { id: 'P2.0',  pitch: 2.0,  name: 'P2.0',  label: 'P2.0 — Indoor Standard',            category: 'Indoor Commercial' },
  { id: 'P2.5',  pitch: 2.5,  name: 'P2.5',  label: 'P2.5 — Indoor Versatile',           category: 'Indoor Commercial' },
  { id: 'P2.6',  pitch: 2.6,  name: 'P2.6',  label: 'P2.6 — Rental / Events',            category: 'Rental & Events'   },
  { id: 'P2.91', pitch: 2.91, name: 'P2.91', label: 'P2.91 — Rental Outdoor Standard',   category: 'Rental & Events'   },
  { id: 'P2.97', pitch: 2.97, name: 'P2.97', label: 'P2.97 — Rental Hybrid',             category: 'Rental & Events'   },
  { id: 'P3.91', pitch: 3.91, name: 'P3.91', label: 'P3.91 — Rental & Outdoor',          category: 'Outdoor'           },
  { id: 'P4.81', pitch: 4.81, name: 'P4.81', label: 'P4.81 — Outdoor Billboard',         category: 'Outdoor'           },
  { id: 'P5.0',  pitch: 5.0,  name: 'P5.0',  label: 'P5.0 — Outdoor Medium Distance',    category: 'Outdoor'           },
  { id: 'P8',    pitch: 8.0,  name: 'P8',    label: 'P8 — Outdoor Large Scale',          category: 'Outdoor'           },
  { id: 'P10',   pitch: 10.0, name: 'P10',   label: 'P10 — Outdoor Mega Display',        category: 'Outdoor'           },
];

// Cabinet standard sizes
export const CABINET_SIZES = [
  { id: 'c600x337',  label: '600 × 337.5 mm — Fine Pitch 16:9', widthMm: 600,   heightMm: 337.5 },
  { id: 'c500x500',  label: '500 × 500 mm — Rental Quadrado',   widthMm: 500,   heightMm: 500   },
  { id: 'c500x1000', label: '500 × 1000 mm — Rental Alto',      widthMm: 500,   heightMm: 1000  },
  { id: 'c640x480',  label: '640 × 480 mm — Padrão 4:3',        widthMm: 640,   heightMm: 480   },
  { id: 'c640x640',  label: '640 × 640 mm — Quadrado Comercial',widthMm: 640,   heightMm: 640   },
  { id: 'c960x960',  label: '960 × 960 mm — Outdoor Pesado',    widthMm: 960,   heightMm: 960   },
];

// Recommends pitch based on closest viewing distance in meters
export function getRecommendedPitchByDistance(distM) {
  const d = Math.max(0.5, parseFloat(distM) || 2.5);
  // Find highest pitch <= distance (1mm ≈ 1m)
  const sorted = [...PITCH_PRESETS].sort((a, b) => a.pitch - b.pitch);
  let match = sorted[0];
  for (const p of sorted) {
    if (p.pitch <= d) {
      match = p;
    } else {
      break;
    }
  }
  return match;
}

// Novastar TB & TU controller catalog
export const NOVASTAR_CONTROLLERS = [
  {
    id: 'tb1',
    series: 'TB',
    name: 'Taurus TB1',
    maxPixels: 1_300_000,
    outputs: 1,
    outputType: 'Gigabit Ethernet',
    features: 'Assíncrono, WiFi, reprodução local',
    note: 'Indicado para painéis pequenos e sinalização independente.',
  },
  {
    id: 'tb2',
    series: 'TB',
    name: 'Taurus TB2',
    maxPixels: 2_600_000,
    outputs: 2,
    outputType: 'Gigabit Ethernet',
    features: 'Assíncrono, WiFi, 4G opcional',
    note: 'Painéis médios sem necessidade de PC.',
  },
  {
    id: 'tb4',
    series: 'TB',
    name: 'Taurus TB4',
    maxPixels: 6_500_000,
    outputs: 4,
    outputType: 'Gigabit Ethernet',
    features: 'Assíncrono, gestão remota VNNOX',
    note: 'Painéis de grande porte em modo autônomo.',
  },
  {
    id: 'tu20',
    series: 'TU',
    name: 'Taurus TU20',
    maxPixels: 2_600_000,
    outputs: 2,
    outputType: 'Gigabit Ethernet',
    features: 'Síncrono + Assíncrono, entrada HDMI, USB',
    note: 'Versátil: conectado a PC ou reprodução local.',
  },
  {
    id: 'tu30',
    series: 'TU',
    name: 'Taurus TU30',
    maxPixels: 3_900_000,
    outputs: 3,
    outputType: 'Gigabit Ethernet',
    features: 'Síncrono + Assíncrono, HDMI in, controle remoto',
    note: 'Painéis médios-grandes com flexibilidade de operação.',
  },
  {
    id: 'tu60',
    series: 'TU',
    name: 'Taurus TU60',
    maxPixels: 7_800_000,
    outputs: 6,
    outputType: 'Gigabit Ethernet',
    features: 'Síncrono + Assíncrono, 4K, múltiplas entradas',
    note: 'Aplicações de alto volume e multi-zona.',
  },
];

// ─── Core Calculation Function ──────────────────────────────────────────────
// roundingMode: 'expand' (ceil — painel um pouco maior, default) | 'shrink' (floor — painel cabe dentro do espaço)
export function calculateDisplay({ widthM, heightM, pitchId, cabinetId, roundingMode = 'expand' }) {
  const pitchData = PITCH_PRESETS.find(p => p.id === pitchId) || PITCH_PRESETS[3];
  const cabinet = CABINET_SIZES.find(c => c.id === cabinetId) || CABINET_SIZES[0];

  const pitchMm = pitchData.pitch;
  const cabW = cabinet.widthMm;
  const cabH = cabinet.heightMm;

  // How many cabinets: expand = ceil (panel >= target), shrink = floor (panel <= target)
  const round = roundingMode === 'shrink' ? Math.floor : Math.ceil;
  const cols = Math.max(1, round((widthM * 1000) / cabW));
  const rows = Math.max(1, round((heightM * 1000) / cabH));

  // Actual panel dimensions
  const actualWidthMm  = cols * cabW;
  const actualHeightMm = rows * cabH;
  const actualWidthM   = actualWidthMm  / 1000;
  const actualHeightM  = actualHeightMm / 1000;
  const areaSqm        = actualWidthM * actualHeightM;

  // Pixels per cabinet
  const pxPerCabW = Math.round(cabW / pitchMm);
  const pxPerCabH = Math.round(cabH / pitchMm);

  // Total resolution
  const totalPxW = cols * pxPerCabW;
  const totalPxH = rows * pxPerCabH;
  const totalPixels = totalPxW * totalPxH;

  // Diagonal in inches
  const diagInches = (Math.sqrt(actualWidthMm ** 2 + actualHeightMm ** 2) / 25.4).toFixed(1);

  // Resolution classification
  let resLabel = 'SD';
  let resTier  = 'SD'; // SD | HD | Full HD
  if (totalPxW >= 1920 && totalPxH >= 1080) { resLabel = 'Full HD'; resTier = 'Full HD'; }
  else if (totalPxW >= 1280 && totalPxH >= 720) { resLabel = 'HD 720p'; resTier = 'HD'; }
  else { resLabel = 'SD'; resTier = 'SD'; }

  // Distance rules:
  // 1. Min viewing distance (1mm ≈ 1m) -> below this, pixelation occurs
  const minViewDistM = (pitchMm * 1.0).toFixed(1);
  // 2. Optimal / Retina comfort distance (1.5x - 2.5x)
  const optViewDistM = (pitchMm * 2.0).toFixed(1);

  // Controller recommendation
  const suitable = NOVASTAR_CONTROLLERS.filter(c => c.maxPixels >= totalPixels);
  const recommended = suitable[0] || NOVASTAR_CONTROLLERS[NOVASTAR_CONTROLLERS.length - 1];

  // Ports needed on recommended controller
  const portsUsed = Math.ceil(totalPixels / (recommended.maxPixels / recommended.outputs));

  return {
    pitchData,
    cabinet,
    cols,
    rows,
    totalCabinets: cols * rows,
    actualWidthM,
    actualHeightM,
    actualWidthMm,
    actualHeightMm,
    areaSqm,
    pxPerCabW,
    pxPerCabH,
    totalPxW,
    totalPxH,
    totalPixels,
    diagInches,
    resLabel,
    resTier,
    minViewDistM,
    optViewDistM,
    recommended,
    portsUsed,
    suitableControllers: suitable,
  };
}
