// Typical densities at room temperature, from standard reference tables (rounded).
// Real samples can vary a little (wood and oil especially).

export interface Material {
  name: string;
  density: number; // g/cm³
  state: 'solid' | 'liquid' | 'gas';
}

export const materials: Material[] = [
  { name: 'air', density: 0.0012, state: 'gas' },
  { name: 'cork', density: 0.24, state: 'solid' },
  { name: 'pine wood', density: 0.5, state: 'solid' },
  { name: 'ethanol', density: 0.79, state: 'liquid' },
  { name: 'cooking oil', density: 0.92, state: 'liquid' },
  { name: 'ice', density: 0.92, state: 'solid' },
  { name: 'water', density: 1.0, state: 'liquid' },
  { name: 'sea water', density: 1.03, state: 'liquid' },
  { name: 'honey', density: 1.4, state: 'liquid' },
  { name: 'glass', density: 2.5, state: 'solid' },
  { name: 'aluminium', density: 2.7, state: 'solid' },
  { name: 'iron', density: 7.9, state: 'solid' },
  { name: 'copper', density: 8.96, state: 'solid' },
  { name: 'lead', density: 11.3, state: 'solid' },
  { name: 'mercury', density: 13.5, state: 'liquid' },
  { name: 'gold', density: 19.3, state: 'solid' },
];

export const density = (name: string): number => materials.find((m) => m.name === name)!.density;
