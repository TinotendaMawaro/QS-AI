import { useState, useEffect } from 'react';

const DEFAULT_CURRENCY_RATES = {
  USD: 1.0,
  ZiG: 25.0,
  ZAR: 18.5,
  GBP: 0.78,
  EUR: 0.92,
};

const INITIAL_PROJECTS = [
  { id: 'QS-001', name: 'Marondera Eco-Resort', client: 'Dube Properties', consultant: 'JM Cost Consultants', contractor: 'TN Builders', location: 'Marondera', type: 'Commercial', budget: 427500, start: '2026-06-01', end: '2027-12-01', status: 'Active', desc: 'Sustainable boutique leisure resort incorporating solar infrastructure and local stabilized earth brickwork.' },
  { id: 'QS-002', name: 'Harare Smart Plaza', client: 'Zim-Gov Infrastructure', consultant: 'Vanguard Engineering', contractor: 'ZimConstruct', location: 'Harare', type: 'Infrastructure', budget: 12458765, start: '2026-01-15', end: '2029-06-30', status: 'Active', desc: 'High-density commercial office complex integrating automated building controls and underfloor air distribution.' },
  { id: 'QS-003', name: 'Bulawayo Housing Block', client: 'City of Bulawayo', consultant: 'Tshuma & Partners', contractor: 'Beta Contractors', location: 'Bulawayo', type: 'Residential', budget: 3200000, start: '2025-03-10', end: '2026-08-15', status: 'Completed', desc: 'Slab block residential structures utilizing prefabricated concrete components and high-tensile mesh.' },
];

const INITIAL_TAKEOFFS = {
  Earthworks: [
    { itemNo: 'B-01', class: 'Excavation', desc: 'Excavation in trenches depth <= 1.5m to receive foundations', timesing: 2, l: 45.0, w: 0.6, d: 1.0, unit: 'm³', baseRate: 12.50 },
    { itemNo: 'B-02', class: 'Disposal', desc: 'Disposal of excavated surplus material off-site to municipal dump', timesing: 1, l: 54.0, w: 1.0, d: 1.0, unit: 'm³', baseRate: 8.00 },
    { itemNo: 'B-03', class: 'Backfilling', desc: 'Filling under slabs with selected excavated material compacted in layers', timesing: 1, l: 12.0, w: 0.45, d: 1.0, unit: 'm³', baseRate: 5.50 },
  ],
  Concrete: [
    { itemNo: 'C-01', class: 'Footings', desc: 'Unreinforced concrete foundation strip Class 15 in trenches', timesing: 2, l: 45.0, w: 0.6, d: 0.3, unit: 'm³', baseRate: 135.00 },
    { itemNo: 'C-02', class: 'Slabs', desc: 'Reinforced concrete foundation slab Class 25/20 poured in-situ', timesing: 1, l: 12.0, w: 8.0, d: 0.1, unit: 'm³', baseRate: 145.00 },
    { itemNo: 'C-03', class: 'Beams', desc: 'In-situ concrete ring beam Class 25 above external load bearing walls', timesing: 1, l: 45.0, w: 0.23, d: 0.3, unit: 'm³', baseRate: 165.00 },
  ],
  Reinforcement: [
    { itemNo: 'R-01', class: 'High-Tensile', desc: 'Deformed high-yield steel bar reinforcement Y12 in foundations', timesing: 6, l: 45.0, w: 0.888, d: 1.0, unit: 'kg', baseRate: 1.65 },
    { itemNo: 'R-02', class: 'Mild Steel', desc: 'Mild steel bar links R10 in concrete beams shaped as stirrups', timesing: 150, l: 1.2, w: 0.617, d: 1.0, unit: 'kg', baseRate: 1.45 },
    { itemNo: 'R-03', class: 'Fabric Mesh', desc: 'High-tensile steel fabric reinforcement Ref 257 in slab floor area', timesing: 1, l: 12.0, w: 8.0, d: 1.0, unit: 'm²', baseRate: 8.50 },
  ],
  Masonry: [
    { itemNo: 'M-01', class: 'External Walls', desc: 'Common brickwork in 230mm double-skin walls in cement mortar', timesing: 2, l: 45.0, w: 1.0, d: 2.8, unit: 'm²', baseRate: 38.50 },
    { itemNo: 'M-02', class: 'Internal Walls', desc: 'Common brickwork in 115mm single-skin partition walls', timesing: 3, l: 12.0, w: 1.0, d: 2.8, unit: 'm²', baseRate: 24.00 },
    { itemNo: 'M-03', class: 'Damp Proofing', desc: 'Three-ply asphalt damp proof course (DPC) laid over finished foundation walling', timesing: 1, l: 45.0, w: 0.23, d: 1.0, unit: 'm²', baseRate: 4.50 },
  ],
  Roofing: [
    { itemNo: 'RF-01', class: 'Structure', desc: 'Structural timber roof trusses spaced at 1200mm centers', timesing: 11, l: 9.6, w: 1.0, d: 1.0, unit: 'No', baseRate: 125.00 },
    { itemNo: 'RF-02', class: 'Covering', desc: 'Galvanized chromadek profile 24 roofing sheets fixed to timber purlins', timesing: 2, l: 12.0, w: 4.8, d: 1.0, unit: 'm²', baseRate: 32.00 },
    { itemNo: 'RF-03', class: 'Rainwater Goods', desc: 'Seamless aluminum gutters fixed to timber fascia boardings', timesing: 2, l: 12.0, w: 1.0, d: 1.0, unit: 'm', baseRate: 18.50 },
  ],
  Finishes: [
    { itemNo: 'F-01', class: 'Wall Finish', desc: '15mm cement-sand internal plaster backing to brick wall surfaces', timesing: 2, l: 114.0, w: 1.0, d: 2.8, unit: 'm²', baseRate: 11.50 },
    { itemNo: 'F-02', class: 'Painting', desc: 'Three coats of premium emulsion paint to plastered wall partitions', timesing: 2, l: 114.0, w: 1.0, d: 2.8, unit: 'm²', baseRate: 5.50 },
    { itemNo: 'F-03', class: 'Flooring', desc: 'Porcelain floor tiling with high-grade adhesive bedding on concrete screed', timesing: 1, l: 12.0, w: 8.0, d: 1.0, unit: 'm²', baseRate: 28.00 },
  ],
};

const INITIAL_BOQ = [
  { code: 'A', name: 'Preliminaries', items: [{ desc: 'Contractor administrative mobilization, security, and insurances', qty: 1, unit: 'Sum', rate: 45000.00 }] },
  { code: 'B', name: 'Earthworks', items: [{ desc: 'Excavation of foundation trenches depth not exceeding 1.5m', qty: 145.78, unit: 'm³', rate: 12.50 }, { desc: 'Selected earth material backfilling and compaction around foundation piers', qty: 89.23, unit: 'm³', rate: 186.82 }] },
  { code: 'C', name: 'Concrete Works', items: [{ desc: 'In-situ unreinforced foundation concrete Class 15/20 strip footings', qty: 34.50, unit: 'm³', rate: 135.00 }, { desc: 'Reinforced concrete foundation floor slab Class 25/20', qty: 102.40, unit: 'm³', rate: 145.00 }, { desc: 'In-situ high-strength ring beams class 25 poured over masonry lines', qty: 15.60, unit: 'm³', rate: 185.00 }, { desc: 'Plywood formwork to concrete slab undersides and beams edges', qty: 240.00, unit: 'm²', rate: 25.50 }] },
  { code: 'D', name: 'Masonry', items: [{ desc: 'Common structural brickwork in 230mm double-skin brick wall partitions', qty: 450.00, unit: 'm²', rate: 38.50 }, { desc: 'Single-skin common brick partitions in 115mm brickwork divisions', qty: 210.00, unit: 'm²', rate: 24.00 }, { desc: 'Horizontal DPC damp proof sheeting layer over concrete surface footprint', qty: 180.00, unit: 'm²', rate: 45.45 }] },
  { code: 'E', name: 'Roofing', items: [{ desc: 'Prefabricated structural timber roof trusses complete with purlins and framing', qty: 11.00, unit: 'No', rate: 450.00 }, { desc: 'Pre-painted Chromadek profile 24 galvanized roofing steel covers', qty: 385.00, unit: 'm²', rate: 32.00 }, { desc: 'High-grade insulation blankets under roof coverings', qty: 385.00, unit: 'm²', rate: 15.17 }] },
  { code: 'F', name: 'Finishes', items: [{ desc: 'Screeded cement internal surface finishes complete with premium ceramic tiling', qty: 450.00, unit: 'm²', rate: 45.00 }, { desc: 'Cement plaster backing coat to brick partitions, 15mm thick skin layers', qty: 820.00, unit: 'm²', rate: 12.50 }, { desc: 'Decorative eggshell paint coats applied to plastered surfaces internally', qty: 820.00, unit: 'm²', rate: 9.50 }, { desc: 'Flush plaster ceilings complete with brandering frameworks and trims', qty: 385.00, unit: 'm²', rate: 51.53 }] },
  { code: 'G', name: 'Plumbing', items: [{ desc: 'Sanitary soil piping, internal pipe installations, and bathroom fixtures', qty: 1, unit: 'Sum', rate: 18500.00 }] },
  { code: 'H', name: 'Electrical', items: [{ desc: 'PVC conduit cabling loops, distribution boards, lighting fixtures and outlets', qty: 1, unit: 'Sum', rate: 16420.00 }] },
  { code: 'I', name: 'External Works', items: [{ desc: 'Driveway concrete pavers, drainage channels, and local perimeter greening', qty: 1, unit: 'Sum', rate: 7500.00 }] },
];

const INITIAL_BIDS = [
  { id: '1', name: 'Preliminaries & General', unit: 'Sum', qty: 1, baseline: 45000, tnBuilders: 43200, betaContractors: 47800, zimConstruct: 22000 },
  { id: '2', name: 'Earthworks (Excavations)', unit: 'm³', qty: 145.78, baseline: 12.50, tnBuilders: 12.80, betaContractors: 14.10, zimConstruct: 6.50 },
  { id: '3', name: 'Concrete Slab Class 25', unit: 'm³', qty: 102.40, baseline: 145.00, tnBuilders: 142.00, betaContractors: 152.00, zimConstruct: 148.00 },
  { id: '4', name: 'Double Skin 230mm Brickwork', unit: 'm²', qty: 450.00, baseline: 38.50, tnBuilders: 39.00, betaContractors: 41.50, zimConstruct: 37.00 },
  { id: '5', name: 'Chromadek Roof Coverings', unit: 'm²', qty: 385.00, baseline: 32.00, tnBuilders: 31.50, betaContractors: 30.00, zimConstruct: 35.00 },
];

const MARKET_PRICES = {
  materials: [
    { name: 'Portland Cement PC15 (50kg)', supplier: 'Lafarge Zimbabwe', price: 12.50, unit: 'bag', trend: 'Up' },
    { name: 'High-Tensile Steel Rebar Y12', supplier: 'Steel World Harare', price: 1.65, unit: 'kg', trend: 'Stable' },
    { name: 'River Sand Aggregates', supplier: 'ZimQuarry Ltd', price: 25.00, unit: 'm³', trend: 'Down' },
    { name: 'Common Clay Bricks', supplier: 'Beta Brick Mutare', price: 0.18, unit: 'pc', trend: 'Up' },
    { name: 'Chromadek Roofing Sheeting Profile 24', supplier: 'Halsted Builders', price: 14.20, unit: 'm', trend: 'Stable' },
    { name: 'Structural Timber Rafters 38x114', supplier: 'Border Timbers Mutare', price: 4.80, unit: 'm', trend: 'Up' },
  ],
  labour: [
    { name: 'Master Quantity Mason / Bricklayer', supplier: 'Standard Union Rate', price: 18.50, unit: 'hour', trend: 'Stable' },
    { name: 'Certified Concrete Specialist Placer', supplier: 'Standard Union Rate', price: 16.00, unit: 'hour', trend: 'Up' },
    { name: 'Roof Carpenter Framing Artisan', supplier: 'Standard Union Rate', price: 19.50, unit: 'hour', trend: 'Stable' },
    { name: 'General Construction Operative', supplier: 'Minimum Wage Index', price: 8.50, unit: 'hour', trend: 'Stable' },
  ],
  plant: [
    { name: 'Cat Excavator 320D Dry Hire', supplier: 'Harare Plant Hire Group', price: 125.00, unit: 'hour', trend: 'Up' },
    { name: 'Heavy Duty Compactor Roller', supplier: 'Zim Machinery Leasing', price: 85.00, unit: 'hour', trend: 'Stable' },
    { name: 'Concrete Mixer Truck 6m³ capacity', supplier: 'Chitungwiza ReadyMix', price: 320.00, unit: 'trip', trend: 'Down' },
  ],
};

export {
  DEFAULT_CURRENCY_RATES,
  INITIAL_PROJECTS,
  INITIAL_TAKEOFFS,
  INITIAL_BOQ,
  INITIAL_BIDS,
  MARKET_PRICES,
};
