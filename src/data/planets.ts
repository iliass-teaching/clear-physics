// Planetary data from the NASA Planetary Fact Sheet
// (https://nssdc.gsfc.nasa.gov/planetary/factsheet/), checked October 2026.

export interface Planet {
  name: string;
  type: 'rocky' | 'gas';
  distance: number; // average distance from the Sun, in millions of km (10⁶ km)
  period: number; // orbital period, in Earth days
  orbitalSpeed: number; // km/s
  density: number; // kg/m³
  g: number; // gravitational field strength at the surface, N/kg (m/s²)
  temperature: number; // mean surface temperature, °C
  diameter: number; // km
  mass: number; // 10²⁴ kg
  moons: number;
}

export const planets: Planet[] = [
  { name: 'Mercury', type: 'rocky', distance: 57.9, period: 88.0, orbitalSpeed: 47.4, density: 5429, g: 3.7, temperature: 167, diameter: 4879, mass: 0.33, moons: 0 },
  { name: 'Venus', type: 'rocky', distance: 108.2, period: 224.7, orbitalSpeed: 35.0, density: 5243, g: 8.9, temperature: 464, diameter: 12104, mass: 4.87, moons: 0 },
  { name: 'Earth', type: 'rocky', distance: 149.6, period: 365.2, orbitalSpeed: 29.8, density: 5514, g: 9.8, temperature: 15, diameter: 12756, mass: 5.97, moons: 1 },
  { name: 'Mars', type: 'rocky', distance: 228.0, period: 687.0, orbitalSpeed: 24.1, density: 3934, g: 3.7, temperature: -65, diameter: 6792, mass: 0.642, moons: 2 },
  { name: 'Jupiter', type: 'gas', distance: 778.5, period: 4331, orbitalSpeed: 13.1, density: 1326, g: 23.1, temperature: -110, diameter: 142984, mass: 1898, moons: 95 },
  { name: 'Saturn', type: 'gas', distance: 1432.0, period: 10747, orbitalSpeed: 9.7, density: 687, g: 9.0, temperature: -140, diameter: 120536, mass: 568, moons: 274 },
  { name: 'Uranus', type: 'gas', distance: 2867.0, period: 30589, orbitalSpeed: 6.8, density: 1270, g: 8.7, temperature: -195, diameter: 51118, mass: 86.8, moons: 28 },
  { name: 'Neptune', type: 'gas', distance: 4515.0, period: 59800, orbitalSpeed: 5.4, density: 1638, g: 11.0, temperature: -200, diameter: 49528, mass: 102, moons: 16 },
];

// Constants used in Unit 17 (values given in the syllabus where it gives one).
export const SPEED_OF_LIGHT = 3.0e8; // m/s (syllabus 3.3 S6)
export const LIGHT_YEAR = 9.5e15; // m (syllabus 6.2.2 S2)
export const HUBBLE = 2.2e-18; // s⁻¹ (syllabus 6.2.3 S10)
export const SECONDS_PER_YEAR = 3.15e7; // 365 × 24 × 3600 ≈ 3.15 × 10⁷ s
