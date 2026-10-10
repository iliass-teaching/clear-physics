// Topic headings of the Cambridge IGCSE Physics 0625 syllabus (exams 2026–2028, version 2, December 2025),
// with the Clear Physics unit that teaches each one. Only the headings are listed here, not the learning points.

export const SYLLABUS_PDF = 'https://www.cambridgeinternational.org/Images/697209-2026-2028-syllabus.pdf';
export const SYLLABUS_PAGE = 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-physics-0625/';

export interface SyllabusTopic {
  code: string;
  title: string;
  unit: number;
  parts?: string[]; // sub-topic headings, e.g. '1.5.1 Effects of forces'
}

export interface SyllabusSection {
  number: number;
  title: string;
  topics: SyllabusTopic[];
}

export const syllabus: SyllabusSection[] = [
  {
    number: 1,
    title: 'Motion, forces and energy',
    topics: [
      { code: '1.1', title: 'Physical quantities and measurement techniques', unit: 1 },
      { code: '1.2', title: 'Motion', unit: 1 },
      { code: '1.3', title: 'Mass and weight', unit: 2 },
      { code: '1.4', title: 'Density', unit: 2 },
      { code: '1.5', title: 'Forces', unit: 3, parts: ['1.5.1 Effects of forces', '1.5.2 Turning effect of forces', '1.5.3 Centre of gravity'] },
      { code: '1.6', title: 'Momentum', unit: 4 },
      { code: '1.7', title: 'Energy, work and power', unit: 5, parts: ['1.7.1 Energy', '1.7.2 Work', '1.7.3 Energy resources', '1.7.4 Power'] },
      { code: '1.8', title: 'Pressure', unit: 6 },
    ],
  },
  {
    number: 2,
    title: 'Thermal physics',
    topics: [
      { code: '2.1', title: 'Kinetic particle model of matter', unit: 7, parts: ['2.1.1 States of matter', '2.1.2 Particle model', '2.1.3 Gases and the absolute scale of temperature'] },
      { code: '2.2', title: 'Thermal properties and temperature', unit: 8, parts: ['2.2.1 Thermal expansion of solids, liquids and gases', '2.2.2 Specific heat capacity', '2.2.3 Melting, boiling and evaporation'] },
      { code: '2.3', title: 'Transfer of thermal energy', unit: 8, parts: ['2.3.1 Conduction', '2.3.2 Convection', '2.3.3 Radiation', '2.3.4 Consequences of thermal energy transfer'] },
    ],
  },
  {
    number: 3,
    title: 'Waves',
    topics: [
      { code: '3.1', title: 'General properties of waves', unit: 9 },
      { code: '3.2', title: 'Light', unit: 10, parts: ['3.2.1 Reflection of light', '3.2.2 Refraction of light', '3.2.3 Thin lenses', '3.2.4 Dispersion of light'] },
      { code: '3.3', title: 'Electromagnetic spectrum', unit: 11 },
      { code: '3.4', title: 'Sound', unit: 11 },
    ],
  },
  {
    number: 4,
    title: 'Electricity and magnetism',
    topics: [
      { code: '4.1', title: 'Simple phenomena of magnetism', unit: 12 },
      { code: '4.2', title: 'Electrical quantities', unit: 13, parts: ['4.2.1 Electric charge (taught in Unit 12)', '4.2.2 Electric current', '4.2.3 Electromotive force and potential difference', '4.2.4 Resistance', '4.2.5 Electrical energy and electrical power'] },
      { code: '4.3', title: 'Electric circuits', unit: 14, parts: ['4.3.1 Circuit diagrams and circuit components', '4.3.2 Series and parallel circuits', '4.3.3 Action and use of circuit components'] },
      { code: '4.4', title: 'Electrical safety', unit: 14 },
      { code: '4.5', title: 'Electromagnetic effects', unit: 15, parts: ['4.5.1 Electromagnetic induction', '4.5.2 The a.c. generator', '4.5.3 Magnetic effect of a current', '4.5.4 Force on a current-carrying conductor', '4.5.5 The d.c. motor', '4.5.6 The transformer'] },
    ],
  },
  {
    number: 5,
    title: 'Nuclear physics',
    topics: [
      { code: '5.1', title: 'The nuclear model of the atom', unit: 16, parts: ['5.1.1 The atom', '5.1.2 The nucleus'] },
      { code: '5.2', title: 'Radioactivity', unit: 16, parts: ['5.2.1 Detection of radioactivity', '5.2.2 The three types of nuclear emission', '5.2.3 Radioactive decay', '5.2.4 Half-life', '5.2.5 Safety precautions'] },
    ],
  },
  {
    number: 6,
    title: 'Space physics',
    topics: [
      { code: '6.1', title: 'The Earth and the Solar System', unit: 17, parts: ['6.1.1 The Earth', '6.1.2 The Solar System'] },
      { code: '6.2', title: 'Stars and the Universe', unit: 17, parts: ['6.2.1 The Sun as a star', '6.2.2 Stars', '6.2.3 The Universe'] },
    ],
  },
];
