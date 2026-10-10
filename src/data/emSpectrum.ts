// The regions of the electromagnetic spectrum, from the longest wavelength to the shortest.
// Uses and dangers follow the lists in the syllabus (3.3 C3, C4). Wavelengths are typical values:
// the boundaries between regions are not sharp, and books give slightly different numbers.

export interface EmRegion {
  id: string;
  name: string;
  wavelength: string; // typical range, plain text
  typical: number; // a typical wavelength in metres (for calculations and drawings)
  uses: string[];
  dangers?: string;
  colour: string;
}

export const emRegions: EmRegion[] = [
  {
    id: 'radio',
    name: 'Radio waves',
    wavelength: 'longer than about 1 m (up to many kilometres)',
    typical: 100,
    uses: ['radio and television transmissions', 'astronomy (radio telescopes)', 'RFID (radio frequency identification): contactless cards, tags in shops', 'Bluetooth (Extended)'],
    colour: '#8d6e63',
  },
  {
    id: 'micro',
    name: 'Microwaves',
    wavelength: 'about 1 mm to 1 m',
    typical: 0.01,
    uses: ['satellite television', 'mobile phones (cell phones) and wireless internet', 'microwave ovens', 'communication with satellites'],
    dangers: 'internal heating of body cells',
    colour: '#a1887f',
  },
  {
    id: 'ir',
    name: 'Infrared',
    wavelength: 'about 700 nm to 1 mm',
    typical: 1e-5,
    uses: ['electric grills (cooking)', 'remote controls for televisions (short-range communication)', 'intruder alarms', 'thermal imaging cameras', 'optical fibres'],
    dangers: 'skin burns',
    colour: '#e57373',
  },
  {
    id: 'visible',
    name: 'Visible light',
    wavelength: 'about 400 nm (violet) to 700 nm (red)',
    typical: 5e-7,
    uses: ['vision (seeing)', 'photography', 'illumination (lighting)', 'optical fibres'],
    colour: 'linear-gradient(90deg, #e53935, #fb8c00, #fdd835, #43a047, #1e88e5, #3949ab, #8e24aa)',
  },
  {
    id: 'uv',
    name: 'Ultraviolet',
    wavelength: 'about 10 nm to 400 nm',
    typical: 1e-7,
    uses: ['security marking (invisible ink)', 'detecting fake bank notes', 'sterilising water (killing bacteria)'],
    dangers: 'damage to surface cells and eyes, which can lead to skin cancer and eye conditions',
    colour: '#9575cd',
  },
  {
    id: 'xray',
    name: 'X-rays',
    wavelength: 'about 0.01 nm to 10 nm',
    typical: 1e-10,
    uses: ['medical scanning (seeing bones)', 'security scanners at airports'],
    dangers: 'mutation or damage to cells in the body',
    colour: '#7986cb',
  },
  {
    id: 'gamma',
    name: 'Gamma rays',
    wavelength: 'shorter than about 0.01 nm',
    typical: 1e-12,
    uses: ['sterilising food and medical equipment', 'detecting cancer and treating it (radiotherapy)'],
    dangers: 'mutation or damage to cells in the body',
    colour: '#5c6bc0',
  },
];
