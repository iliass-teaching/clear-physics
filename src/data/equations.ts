// Every equation that the syllabus asks students to "recall and use" (Cambridge IGCSE Physics 0625, 2026–2028).
// Checked against the learning points of the official syllabus. ext = Supplement (Extended only).

export interface Equation {
  tex: string; // LaTeX (without $)
  words: string; // in words
  code: string; // syllabus reference
  unit: number; // Clear Physics unit
  ext?: boolean;
}

export interface EquationGroup {
  title: string;
  items: Equation[];
}

export const equations: EquationGroup[] = [
  {
    title: 'Motion, forces and energy',
    items: [
      { tex: 'v = \\dfrac{s}{t}', words: 'speed = distance ÷ time', code: '1.2 C1', unit: 1 },
      { tex: '\\text{average speed} = \\dfrac{\\text{total distance}}{\\text{total time}}', words: 'average speed', code: '1.2 C3', unit: 1 },
      { tex: 'a = \\dfrac{\\Delta v}{\\Delta t}', words: 'acceleration = change in velocity ÷ time', code: '1.2 S9', unit: 1, ext: true },
      { tex: 'g = \\dfrac{W}{m}', words: 'gravitational field strength = weight ÷ mass', code: '1.3 C3', unit: 2 },
      { tex: '\\rho = \\dfrac{m}{V}', words: 'density = mass ÷ volume', code: '1.4 C1', unit: 2 },
      { tex: 'k = \\dfrac{F}{x}', words: 'spring constant = force ÷ extension', code: '1.5.1 S9', unit: 3, ext: true },
      { tex: 'F = ma', words: 'resultant force = mass × acceleration', code: '1.5.1 S11', unit: 3, ext: true },
      { tex: '\\text{moment} = F \\times d', words: 'moment = force × perpendicular distance from the pivot', code: '1.5.2 C2', unit: 3 },
      { tex: 'p = mv', words: 'momentum = mass × velocity', code: '1.6 S1', unit: 4, ext: true },
      { tex: '\\text{impulse} = F\\Delta t = \\Delta(mv)', words: 'impulse = force × time = change in momentum', code: '1.6 S2', unit: 4, ext: true },
      { tex: 'F = \\dfrac{\\Delta p}{\\Delta t}', words: 'resultant force = change in momentum ÷ time', code: '1.6 S4', unit: 4, ext: true },
      { tex: 'E_k = \\tfrac{1}{2}mv^2', words: 'kinetic energy', code: '1.7.1 S4', unit: 5, ext: true },
      { tex: '\\Delta E_p = mg\\Delta h', words: 'change in gravitational potential energy', code: '1.7.1 S5', unit: 5, ext: true },
      { tex: 'W = Fd = \\Delta E', words: 'work done = force × distance = energy transferred', code: '1.7.2 C2', unit: 5 },
      { tex: '\\text{efficiency} = \\dfrac{\\text{useful energy (or power) output}}{\\text{total energy (or power) input}} \\times 100\\%', words: 'efficiency', code: '1.7.3 S7', unit: 5, ext: true },
      { tex: 'P = \\dfrac{W}{t} = \\dfrac{\\Delta E}{t}', words: 'power = work done (energy transferred) ÷ time', code: '1.7.4 C1', unit: 5 },
      { tex: 'p = \\dfrac{F}{A}', words: 'pressure = force ÷ area', code: '1.8 C1', unit: 6 },
      { tex: '\\Delta p = \\rho g \\Delta h', words: 'change in pressure in a liquid', code: '1.8 S4', unit: 6, ext: true },
    ],
  },
  {
    title: 'Thermal physics',
    items: [
      { tex: 'T\\,(\\text{in K}) = \\theta\\,(\\text{in }^\\circ\\text{C}) + 273', words: 'kelvin and Celsius', code: '2.1.3 C2', unit: 7 },
      { tex: 'pV = \\text{constant}', words: 'fixed mass of gas at constant temperature', code: '2.1.3 S3', unit: 7, ext: true },
      { tex: 'c = \\dfrac{\\Delta E}{m\\Delta\\theta}', words: 'specific heat capacity', code: '2.2.2 S3', unit: 8, ext: true },
    ],
  },
  {
    title: 'Waves',
    items: [
      { tex: 'v = f\\lambda', words: 'wave speed = frequency × wavelength', code: '3.1 C4', unit: 9 },
      { tex: 'i = r', words: 'angle of incidence = angle of reflection', code: '3.2.1 C3', unit: 10 },
      { tex: 'n = \\dfrac{\\sin i}{\\sin r}', words: 'refractive index', code: '3.2.2 S7', unit: 10, ext: true },
      { tex: 'n = \\dfrac{1}{\\sin c}', words: 'refractive index and critical angle', code: '3.2.2 S8', unit: 10, ext: true },
    ],
  },
  {
    title: 'Electricity and magnetism',
    items: [
      { tex: 'I = \\dfrac{Q}{t}', words: 'current = charge ÷ time', code: '4.2.2 S5', unit: 13, ext: true },
      { tex: 'E = \\dfrac{W}{Q}', words: 'e.m.f. = work done ÷ charge', code: '4.2.3 S6', unit: 13, ext: true },
      { tex: 'V = \\dfrac{W}{Q}', words: 'p.d. = work done ÷ charge', code: '4.2.3 S7', unit: 13, ext: true },
      { tex: 'R = \\dfrac{V}{I}', words: 'resistance = p.d. ÷ current', code: '4.2.4 C1', unit: 13 },
      { tex: 'R \\propto L, \\quad R \\propto \\dfrac{1}{A}', words: 'resistance of a wire: length and cross-sectional area', code: '4.2.4 S5', unit: 13, ext: true },
      { tex: 'P = IV', words: 'electrical power = current × p.d.', code: '4.2.5 C2', unit: 13 },
      { tex: 'E = IVt', words: 'electrical energy', code: '4.2.5 C3', unit: 13 },
      { tex: 'R = R_1 + R_2 + \\dots', words: 'resistors in series', code: '4.3.2 C4', unit: 14 },
      { tex: '\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}', words: 'two resistors in parallel', code: '4.3.2 S10', unit: 14, ext: true },
      { tex: '\\dfrac{R_1}{R_2} = \\dfrac{V_1}{V_2}', words: 'potential divider', code: '4.3.3 S3', unit: 14, ext: true },
      { tex: '\\dfrac{V_p}{V_s} = \\dfrac{N_p}{N_s}', words: 'transformer', code: '4.5.6 C3', unit: 15 },
      { tex: 'I_p V_p = I_s V_s', words: 'transformer (100% efficient)', code: '4.5.6 S7', unit: 15, ext: true },
      { tex: 'P = I^2 R', words: 'power lost in a resistance (cables)', code: '4.5.6 S8', unit: 15, ext: true },
    ],
  },
  {
    title: 'Space physics',
    items: [
      { tex: 'v = \\dfrac{2\\pi r}{T}', words: 'average orbital speed', code: '6.1.1 S4', unit: 17, ext: true },
      { tex: 'H_0 = \\dfrac{v}{d}', words: 'Hubble constant', code: '6.2.3 S9', unit: 17, ext: true },
      { tex: '\\dfrac{d}{v} = \\dfrac{1}{H_0}', words: 'estimate of the age of the Universe', code: '6.2.3 S11', unit: 17, ext: true },
    ],
  },
];

// Values that students must know (not equations).
export const values = [
  { tex: 'g \\approx 9.8\\,\\text{m/s}^2', words: 'acceleration of free fall near the Earth', code: '1.2 C8' },
  { tex: '-273\\,^\\circ\\text{C} = 0\\,\\text{K}', words: 'absolute zero', code: '2.1.2 C2' },
  { tex: '0\\,^\\circ\\text{C}\\ \\text{and}\\ 100\\,^\\circ\\text{C}', words: 'melting and boiling points of water', code: '2.2.3 C2' },
  { tex: '330\\text{–}350\\,\\text{m/s}', words: 'speed of sound in air', code: '3.4 C5' },
  { tex: '20\\,\\text{Hz to } 20\\,000\\,\\text{Hz}', words: 'range of human hearing', code: '3.4 C3' },
  { tex: '3.0 \\times 10^8\\,\\text{m/s}', words: 'speed of electromagnetic waves in a vacuum (Extended)', code: '3.3 S6' },
  { tex: '9.5 \\times 10^{15}\\,\\text{m}', words: 'one light-year (Extended)', code: '6.2.2 S2' },
  { tex: '2.2 \\times 10^{-18}\\,\\text{s}^{-1}', words: 'current estimate of the Hubble constant (Extended)', code: '6.2.3 S10' },
];
