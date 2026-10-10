// Key words, explained in clear English.
// One word = one meaning: always use the same word in lessons.

export interface KeyWord {
  word: string;
  meaning: string;
  example?: string;
  lesson?: string; // first lesson where the word is taught: "unit.lesson", e.g. "1.4"
}

export const glossary: KeyWord[] = [
  {
    word: 'distance',
    meaning: 'How far something moves. We measure it in metres (m).',
    example: 'The distance from my house to school is 800 m.',
    lesson: '1.4',
  },
  {
    word: 'time',
    meaning: 'How long something takes. We measure it in seconds (s).',
    example: 'The race takes a time of 12 s.',
    lesson: '1.4',
  },
  {
    word: 'speed',
    meaning: 'The distance something moves in one unit of time (for example, in one second): $v = \\dfrac{s}{t}$.',
    example: 'The speed of the car is 20 m/s. It moves 20 m in each second.',
    lesson: '1.4',
  },
  {
    word: 'equation',
    meaning: 'A rule with an equals sign (=). It links quantities, for example $v = \\dfrac{s}{t}$.',
    lesson: '1.4',
  },
  {
    word: 'unit',
    meaning: 'The name of the measure after a number, for example m, s or m/s. An answer without a unit is not complete.',
    example: '5 m/s — the number is 5, the unit is m/s.',
    lesson: '1.4',
  },
  {
    word: 'quantity',
    meaning: 'Something we can measure, for example distance, time or speed.',
    lesson: '1.4',
  },
  // Unit 1, lesson 1
  {
    word: 'length',
    meaning: 'How long something is, from one end to the other. We measure it in m, cm or mm.',
    example: 'The length of the pencil is 15.2 cm.',
    lesson: '1.1',
  },
  {
    word: 'volume',
    meaning: 'How much space something takes. We measure it in cm³ or m³.',
    example: 'The volume of water in the cylinder is 46 cm³.',
    lesson: '1.1',
  },
  {
    word: 'measuring cylinder',
    meaning: 'A tall glass or plastic tube with a scale. We use it to measure the volume of a liquid.',
    lesson: '1.1',
  },
  {
    word: 'scale',
    meaning: 'The lines and numbers on an instrument, for example on a ruler.',
    lesson: '1.1',
  },
  {
    word: 'reading',
    meaning: 'The value you read on the scale of an instrument.',
    example: 'The reading on the stopwatch is 12.4 s.',
    lesson: '1.1',
  },
  {
    word: 'reaction time',
    meaning: 'The short time between seeing something and moving your hand. It is about 0.2 s.',
    lesson: '1.1',
  },
  // Unit 1, lesson 2
  {
    word: 'oscillation',
    meaning: 'One full swing: from one side to the other side, and back again.',
    lesson: '1.2',
  },
  {
    word: 'period',
    meaning: 'The time for one oscillation. We measure it in seconds (s).',
    example: 'The period of the pendulum is 1.4 s.',
    lesson: '1.2',
  },
  {
    word: 'mean',
    meaning: 'The average of several values: add them, then divide by how many there are.',
    example: 'The mean of 2.0 s, 2.2 s and 2.1 s is $\\dfrac{2.0 + 2.2 + 2.1}{3} = 2.1\\,\\text{s}$.',
    lesson: '1.2',
  },
  // Unit 1, lesson 3
  {
    word: 'scalar',
    meaning: 'A quantity with a size only, for example distance, speed, time or mass.',
    lesson: '1.3',
  },
  {
    word: 'vector',
    meaning: 'A quantity with a size and a direction, for example force, velocity or acceleration.',
    lesson: '1.3',
  },
  {
    word: 'magnitude',
    meaning: 'The size of a quantity, without its direction.',
    example: 'The magnitude of the force is 20 N.',
    lesson: '1.3',
  },
  {
    word: 'resultant',
    meaning: 'One vector that has the same effect as two or more vectors together.',
    lesson: '1.3',
  },
  // Unit 1, lesson 5
  {
    word: 'velocity',
    meaning: 'Speed in a given direction. Velocity is a vector.',
    example: 'The velocity of the plane is 250 m/s to the north.',
    lesson: '1.5',
  },
  {
    word: 'average speed',
    meaning: 'For a whole journey: $\\dfrac{\\text{total distance}}{\\text{total time}}$.',
    lesson: '1.5',
  },
  // Unit 1, lesson 6
  {
    word: 'gradient',
    meaning: 'How steep a line on a graph is: $\\dfrac{\\text{change in } y}{\\text{change in } x}$.',
    lesson: '1.6',
  },
  {
    word: 'at rest',
    meaning: 'Not moving. The speed is zero.',
    lesson: '1.6',
  },
  {
    word: 'constant speed',
    meaning: 'A speed that does not change.',
    lesson: '1.6',
  },
  // Unit 1, lesson 7
  {
    word: 'acceleration',
    meaning: 'How fast the velocity changes: $a = \\dfrac{\\Delta v}{\\Delta t}$. Unit: m/s².',
    example: 'An acceleration of 2 m/s² means the speed increases by 2 m/s every second.',
    lesson: '1.7',
  },
  {
    word: 'deceleration',
    meaning: 'Slowing down. A deceleration is a negative acceleration.',
    lesson: '1.7',
  },
  // Unit 1, lesson 8
  {
    word: 'area under a graph',
    meaning: 'The space between the line and the time axis. On a speed–time graph, it gives the distance.',
    lesson: '1.8',
  },
  // Unit 1, lesson 9
  {
    word: 'free fall',
    meaning: 'Falling with only gravity acting on the object, with no air resistance.',
    lesson: '1.9',
  },
  {
    word: 'acceleration of free fall',
    meaning: 'The acceleration of an object that falls with no air resistance. Symbol $g$. Near the Earth, $g \\approx 9.8\\,\\text{m/s}^2$.',
    lesson: '1.9',
  },
  {
    word: 'air resistance',
    meaning: 'A force from the air that acts against an object moving through the air. It increases when the speed increases.',
    lesson: '1.9',
  },
  {
    word: 'terminal velocity',
    meaning: 'The constant top speed of a falling object, when air resistance is as big as its weight.',
    lesson: '1.9',
  },
  // Unit 2
  {
    word: 'mass',
    meaning: 'How much matter (stuff) is in an object. Unit: kilogram (kg). The mass of an object is the same everywhere.',
    example: 'The mass of the bag is 2.5 kg.',
    lesson: '2.1',
  },
  {
    word: 'weight',
    meaning: 'The gravitational force on an object that has mass. Weight is a force, so its unit is the newton (N).',
    example: 'The weight of the bag on the Earth is 24.5 N.',
    lesson: '2.1',
  },
  {
    word: 'newton',
    meaning: 'The unit of force, symbol N.',
    lesson: '2.1',
  },
  {
    word: 'force meter',
    meaning: 'An instrument with a spring that measures a force, for example a weight, in newtons. Also called a newton meter.',
    lesson: '2.1',
  },
  {
    word: 'balance',
    meaning: 'An instrument that compares the weights of two objects, or measures mass.',
    lesson: '2.1',
  },
  {
    word: 'density',
    meaning: 'The mass of each unit of volume: $\\rho = \\dfrac{m}{V}$. Units: g/cm³ or kg/m³.',
    example: 'The density of water is $1.0\\,\\text{g/cm}^3 = 1000\\,\\text{kg/m}^3$.',
    lesson: '2.3',
  },
  {
    word: 'displacement',
    meaning: 'Pushing liquid out of the way. An object put in water displaces (pushes up) a volume of water equal to its own volume.',
    lesson: '2.4',
  },
  {
    word: 'float',
    meaning: 'To stay at the surface of a liquid. An object floats if its density is less than the density of the liquid.',
    lesson: '2.5',
  },
  {
    word: 'sink',
    meaning: 'To go down to the bottom of a liquid. An object sinks if its density is more than the density of the liquid.',
    lesson: '2.5',
  },
  // Unit 3
  {
    word: 'force',
    meaning: 'A push or a pull. A force can change the shape, the speed or the direction of an object. Unit: newton (N).',
    lesson: '3.1',
  },
  {
    word: 'extension',
    meaning: 'How much longer a spring (or another object) becomes when you pull it: new length − original length.',
    lesson: '3.2',
  },
  {
    word: 'load',
    meaning: 'The force that stretches a spring, for example the weight of the masses hung on it.',
    lesson: '3.2',
  },
  {
    word: 'spring constant',
    meaning: 'The force per unit extension of a spring: $k = \\dfrac{F}{x}$. A stiff spring has a big spring constant. Unit: N/m.',
    lesson: '3.2',
  },
  {
    word: 'limit of proportionality',
    meaning: 'The point on a load–extension graph after which the line is no longer straight. Before it, extension is proportional to load.',
    lesson: '3.2',
  },
  {
    word: 'resultant force',
    meaning: 'The single force that has the same effect as all the forces on an object together.',
    lesson: '3.3',
  },
  {
    word: 'balanced forces',
    meaning: 'Forces whose resultant is zero. The object stays at rest, or moves at constant speed in a straight line.',
    lesson: '3.3',
  },
  {
    word: 'friction',
    meaning: 'A force between two surfaces that acts against motion. It can slow things down and it produces heating.',
    lesson: '3.5',
  },
  {
    word: 'drag',
    meaning: 'Friction on an object moving through a liquid or a gas. Drag in air is called air resistance.',
    lesson: '3.5',
  },
  {
    word: 'moment',
    meaning: 'The turning effect of a force: moment = force × perpendicular distance from the pivot. Unit: N m.',
    lesson: '3.7',
  },
  {
    word: 'pivot',
    meaning: 'The point that an object turns around.',
    lesson: '3.7',
  },
  {
    word: 'principle of moments',
    meaning: 'For an object in equilibrium, the total clockwise moment about a pivot equals the total anticlockwise moment about the same pivot.',
    lesson: '3.8',
  },
  {
    word: 'equilibrium',
    meaning: 'An object is in equilibrium when there is no resultant force and no resultant moment on it.',
    lesson: '3.8',
  },
  {
    word: 'centre of gravity',
    meaning: 'The point where the whole weight of an object seems to act.',
    lesson: '3.9',
  },
  {
    word: 'stable',
    meaning: 'Hard to knock over. A low centre of gravity and a wide base make an object more stable.',
    lesson: '3.9',
  },
  // Unit 4
  {
    word: 'momentum',
    meaning: 'Mass × velocity: $p = mv$. Momentum is a vector. Unit: kg m/s.',
    example: 'A 2 kg ball moving at 3 m/s has a momentum of 6 kg m/s.',
    lesson: '4.1',
  },
  {
    word: 'conservation of momentum',
    meaning: 'When objects collide or push apart, the total momentum after is equal to the total momentum before (if no outside force acts).',
    lesson: '4.2',
  },
  {
    word: 'collision',
    meaning: 'When two objects hit each other.',
    lesson: '4.2',
  },
  {
    word: 'impulse',
    meaning: 'Force × the time for which the force acts. It is equal to the change in momentum: $F\\Delta t = \\Delta(mv)$. Unit: N s.',
    lesson: '4.3',
  },
  // Unit 5
  {
    word: 'energy',
    meaning: 'What is needed to make things happen. Energy is kept in stores and moves between them. Unit: joule (J).',
    lesson: '5.1',
  },
  {
    word: 'energy store',
    meaning: 'A way energy is kept: kinetic, gravitational potential, chemical, elastic (strain), nuclear, electrostatic, internal (thermal).',
    lesson: '5.1',
  },
  {
    word: 'joule',
    meaning: 'The unit of energy and of work, symbol J. 1 kJ = 1000 J.',
    lesson: '5.1',
  },
  {
    word: 'conservation of energy',
    meaning: 'Energy cannot be made or destroyed. It can only move from one store to another.',
    lesson: '5.2',
  },
  {
    word: 'Sankey diagram',
    meaning: 'A diagram with arrows to show energy transfers. The width of each arrow shows the amount of energy.',
    lesson: '5.2',
  },
  {
    word: 'kinetic energy',
    meaning: 'The energy of a moving object: $E_k = \\tfrac{1}{2}mv^2$.',
    lesson: '5.3',
  },
  {
    word: 'gravitational potential energy',
    meaning: 'The energy of an object because of its height. The change is $\\Delta E_p = mg\\Delta h$.',
    lesson: '5.3',
  },
  {
    word: 'work done',
    meaning: 'The energy transferred by a force when it moves an object: $W = Fd$. Unit: joule (J).',
    lesson: '5.5',
  },
  {
    word: 'power',
    meaning: 'The work done (or energy transferred) per unit time: $P = \\dfrac{W}{t}$. Unit: watt (W).',
    lesson: '5.6',
  },
  {
    word: 'watt',
    meaning: 'The unit of power, symbol W. 1 W = 1 J/s. 1 kW = 1000 W.',
    lesson: '5.6',
  },
  {
    word: 'efficiency',
    meaning: 'How much of the energy (or power) put in becomes useful: useful output ÷ total input, often written as a percentage.',
    lesson: '5.7',
  },
  {
    word: 'renewable',
    meaning: 'An energy resource that will not run out, for example wind or solar.',
    lesson: '5.8',
  },
  {
    word: 'non-renewable',
    meaning: 'An energy resource that will run out, for example coal, oil, gas and nuclear fuel.',
    lesson: '5.8',
  },
  {
    word: 'turbine',
    meaning: 'A machine with blades that spin when steam, water or wind pushes them.',
    lesson: '5.8',
  },
  {
    word: 'generator',
    meaning: 'A machine that turns kinetic energy into electrical energy. In a power station, the turbine turns the generator.',
    lesson: '5.8',
  },
  // Unit 6
  {
    word: 'pressure',
    meaning: 'The force on each unit of area: $p = \\dfrac{F}{A}$. Units: N/m² (= Pa) or N/cm².',
    lesson: '6.1',
  },
  {
    word: 'area',
    meaning: 'The size of a surface. Units: m² or cm². For a rectangle: length × width.',
    lesson: '6.1',
  },
  {
    word: 'pascal',
    meaning: 'The unit of pressure, symbol Pa. $1\\,\\text{Pa} = 1\\,\\text{N/m}^2$.',
    lesson: '6.1',
  },
  {
    word: 'depth',
    meaning: 'How far below the surface of a liquid something is.',
    lesson: '6.2',
  },
  // Unit 7
  {
    word: 'solid',
    meaning: 'A state of matter with a fixed shape and a fixed volume.',
    example: 'Ice, wood and iron are solids.',
    lesson: '7.1',
  },
  {
    word: 'liquid',
    meaning: 'A state of matter with a fixed volume but no fixed shape. It flows and takes the shape of its container.',
    example: 'Water, oil and milk are liquids.',
    lesson: '7.1',
  },
  {
    word: 'gas',
    meaning: 'A state of matter with no fixed shape and no fixed volume. It fills all of its container.',
    example: 'Air and steam are gases.',
    lesson: '7.1',
  },
  {
    word: 'melting',
    meaning: 'A change from solid to liquid.',
    example: 'Ice melts at 0 °C.',
    lesson: '7.1',
  },
  {
    word: 'freezing',
    meaning: 'A change from liquid to solid. Another word for it is solidification.',
    example: 'Water freezes at 0 °C.',
    lesson: '7.1',
  },
  {
    word: 'boiling',
    meaning: 'A change from liquid to gas, everywhere in the liquid, at one temperature (the boiling point).',
    example: 'Water boils at 100 °C.',
    lesson: '7.1',
  },
  {
    word: 'evaporation',
    meaning: 'A change from liquid to gas at the surface of the liquid. It happens at any temperature.',
    example: 'Wet clothes dry because the water evaporates.',
    lesson: '7.1',
  },
  {
    word: 'condensation',
    meaning: 'A change from gas to liquid.',
    example: 'Water drops form on a cold window: steam condenses.',
    lesson: '7.1',
  },
  {
    word: 'particle',
    meaning: 'A very small piece of matter, for example an atom or a molecule. All matter is made of particles.',
    lesson: '7.2',
  },
  {
    word: 'molecule',
    meaning: 'A group of atoms joined together, for example a water molecule ($\\text{H}_2\\text{O}$).',
    lesson: '7.2',
  },
  {
    word: 'compress',
    meaning: 'To push something into a smaller volume.',
    example: 'You can compress air in a syringe, but not water.',
    lesson: '7.2',
  },
  {
    word: 'temperature',
    meaning: 'How hot or cold something is. When the temperature goes up, the particles move faster.',
    lesson: '7.3',
  },
  {
    word: 'absolute zero',
    meaning: 'The lowest possible temperature: −273 °C, or 0 K. The particles have the least kinetic energy.',
    lesson: '7.3',
  },
  {
    word: 'kelvin',
    meaning: 'A unit of temperature (K). The kelvin scale starts at absolute zero: $T = \\theta + 273$.',
    example: '0 °C = 273 K.',
    lesson: '7.3',
  },
  {
    word: 'Brownian motion',
    meaning: 'The random zigzag motion of very small particles (like smoke) in a gas or a liquid. Fast molecules hit them from all sides.',
    lesson: '7.3',
  },
  {
    word: 'random',
    meaning: 'With no pattern: we cannot say what happens next.',
    example: 'Gas particles move in random directions.',
    lesson: '7.3',
  },
  {
    word: 'fixed mass of gas',
    meaning: 'A gas in a closed container: no gas goes in or out.',
    lesson: '7.4',
  },
  // Unit 8
  {
    word: 'thermal expansion',
    meaning: 'When an object gets hotter, it gets a little bigger. Gases expand the most, solids the least.',
    example: 'Railway tracks have small gaps for thermal expansion on hot days.',
    lesson: '8.1',
  },
  {
    word: 'internal energy',
    meaning: 'The energy of all the particles in an object. When the temperature goes up, the internal energy goes up.',
    lesson: '8.2',
  },
  {
    word: 'specific heat capacity',
    meaning: 'The energy needed to raise the temperature of 1 kg of a material by 1 °C: $c = \\dfrac{\\Delta E}{m\\Delta\\theta}$. Unit: J/(kg °C).',
    example: 'Water: 4200 J/(kg °C). It needs a lot of energy to get hot.',
    lesson: '8.2',
  },
  {
    word: 'melting point',
    meaning: 'The temperature at which a solid melts. For ice: 0 °C.',
    lesson: '8.4',
  },
  {
    word: 'boiling point',
    meaning: 'The temperature at which a liquid boils. For water at normal air pressure: 100 °C.',
    lesson: '8.4',
  },
  {
    word: 'conduction',
    meaning: 'Thermal energy moves through a material from particle to particle, from the hot part to the cold part.',
    example: 'The handle of a metal spoon in hot tea gets hot by conduction.',
    lesson: '8.6',
  },
  {
    word: 'thermal conductor',
    meaning: 'A material that lets thermal energy move through it easily, for example a metal.',
    lesson: '8.6',
  },
  {
    word: 'thermal insulator',
    meaning: 'A material that does not let thermal energy move through it easily, for example plastic, wood, wool or air.',
    lesson: '8.6',
  },
  {
    word: 'free electrons',
    meaning: 'Electrons in a metal that can move through the whole metal. They carry energy quickly.',
    lesson: '8.6',
  },
  {
    word: 'convection',
    meaning: 'Thermal energy moves with a liquid or a gas: the hot part rises and the cold part sinks.',
    example: 'A heater warms all the air in a room by convection.',
    lesson: '8.7',
  },
  {
    word: 'convection current',
    meaning: 'The loop of moving liquid or gas in convection: hot fluid rises, cools, then sinks.',
    lesson: '8.7',
  },
  {
    word: 'thermal radiation',
    meaning: 'Infrared radiation. All objects give it out. It can travel through a vacuum.',
    example: 'You feel the thermal radiation of a fire on your face.',
    lesson: '8.8',
  },
  {
    word: 'infrared',
    meaning: 'A type of electromagnetic radiation that we cannot see but can feel as heat.',
    lesson: '8.8',
  },
  {
    word: 'emit',
    meaning: 'To give out (radiation). A good emitter gives out a lot of radiation.',
    lesson: '8.8',
  },
  {
    word: 'absorb',
    meaning: 'To take in (radiation). A good absorber takes in a lot of the radiation that hits it.',
    lesson: '8.8',
  },
  {
    word: 'medium',
    meaning: 'A material that something travels through, for example air or water. Radiation does not need a medium.',
    lesson: '8.8',
  },
  {
    word: 'matt',
    meaning: 'Dull, not shiny. A matt black surface is the best emitter and absorber of radiation.',
    lesson: '8.8',
  },
  // Unit 9
  {
    word: 'wave',
    meaning: 'A vibration that travels and carries energy from one place to another, without carrying matter.',
    example: 'A water wave moves across a pond, but the water stays in the pond.',
    lesson: '9.1',
  },
  {
    word: 'vibration',
    meaning: 'A small, fast movement backwards and forwards (or up and down) around one place.',
    lesson: '9.1',
  },
  {
    word: 'transverse wave',
    meaning: 'A wave where the vibration is at right angles (90°) to the direction the wave travels.',
    example: 'Water waves, light and all electromagnetic waves.',
    lesson: '9.1',
  },
  {
    word: 'longitudinal wave',
    meaning: 'A wave where the vibration is parallel to (along) the direction the wave travels.',
    example: 'Sound waves.',
    lesson: '9.1',
  },
  {
    word: 'compression',
    meaning: 'In a longitudinal wave: a place where the particles (or coils) are close together.',
    lesson: '9.1',
  },
  {
    word: 'rarefaction',
    meaning: 'In a longitudinal wave: a place where the particles (or coils) are far apart.',
    lesson: '9.1',
  },
  {
    word: 'crest',
    meaning: 'The highest point of a wave. Also called a peak.',
    lesson: '9.2',
  },
  {
    word: 'trough',
    meaning: 'The lowest point of a wave.',
    lesson: '9.2',
  },
  {
    word: 'amplitude',
    meaning: 'The biggest distance of a point from its rest position: from the middle line to a crest.',
    lesson: '9.2',
  },
  {
    word: 'wavelength',
    meaning: 'The length of one full wave, for example from one crest to the next crest. Symbol $\\lambda$, unit m.',
    lesson: '9.2',
  },
  {
    word: 'frequency',
    meaning: 'The number of waves that pass a point in one second. Symbol $f$, unit hertz (Hz).',
    example: '5 Hz = 5 waves each second.',
    lesson: '9.2',
  },
  {
    word: 'hertz',
    meaning: 'The unit of frequency (Hz). 1 Hz = one wave each second.',
    lesson: '9.2',
  },
  {
    word: 'wavefront',
    meaning: 'A line along a crest of a wave, seen from above.',
    lesson: '9.2',
  },
  {
    word: 'wave speed',
    meaning: 'How fast the wave travels: $v = f\\lambda$. Unit m/s.',
    lesson: '9.3',
  },
  {
    word: 'reflection',
    meaning: 'When a wave hits a surface and comes back.',
    lesson: '9.4',
  },
  {
    word: 'refraction',
    meaning: 'When a wave changes speed (for example from deep to shallow water), and so it can change direction.',
    lesson: '9.4',
  },
  {
    word: 'diffraction',
    meaning: 'When a wave spreads out after it goes through a gap or past an edge.',
    lesson: '9.4',
  },
  {
    word: 'ripple tank',
    meaning: 'A shallow tank of water with a lamp above it. We use it to see how water waves behave.',
    lesson: '9.4',
  },
  // Unit 10
  {
    word: 'normal',
    meaning: 'A line at 90° to a surface, at the point where a ray hits it. We measure the angles of rays from the normal.',
    lesson: '10.1',
  },
  {
    word: 'angle of incidence',
    meaning: 'The angle between the ray that arrives (the incident ray) and the normal. Symbol $i$.',
    lesson: '10.1',
  },
  {
    word: 'angle of reflection',
    meaning: 'The angle between the reflected ray and the normal. Symbol $r$. It is equal to the angle of incidence.',
    lesson: '10.1',
  },
  {
    word: 'plane mirror',
    meaning: 'A flat mirror.',
    lesson: '10.1',
  },
  {
    word: 'virtual image',
    meaning: 'An image that the light only seems to come from. You cannot catch it on a screen.',
    example: 'Your image in a plane mirror is virtual.',
    lesson: '10.2',
  },
  {
    word: 'real image',
    meaning: 'An image where the light rays really meet. You can catch it on a screen.',
    example: 'A projector makes a real image on the wall.',
    lesson: '10.7',
  },
  {
    word: 'angle of refraction',
    meaning: 'The angle between the refracted ray and the normal.',
    lesson: '10.3',
  },
  {
    word: 'refractive index',
    meaning: 'A number that tells us how much a material slows light down and bends it: $n = \\dfrac{\\sin i}{\\sin r}$. It has no unit.',
    example: 'Glass: about 1.5. Water: about 1.33.',
    lesson: '10.4',
  },
  {
    word: 'critical angle',
    meaning: 'The angle of incidence (inside a material) where the refracted ray goes along the surface, at 90° to the normal.',
    lesson: '10.5',
  },
  {
    word: 'total internal reflection',
    meaning: 'When the angle of incidence inside a material is bigger than the critical angle, all the light reflects back inside.',
    lesson: '10.5',
  },
  {
    word: 'optical fibre',
    meaning: 'A thin glass fibre. Light travels along it by total internal reflection. Used for internet cables and in medicine.',
    lesson: '10.5',
  },
  {
    word: 'converging lens',
    meaning: 'A lens that is thicker in the middle. It brings parallel rays together at the principal focus.',
    lesson: '10.6',
  },
  {
    word: 'diverging lens',
    meaning: 'A lens that is thinner in the middle. It spreads parallel rays out.',
    lesson: '10.6',
  },
  {
    word: 'principal axis',
    meaning: 'The line that goes through the centre of a lens, at 90° to the lens.',
    lesson: '10.6',
  },
  {
    word: 'principal focus',
    meaning: 'The point where rays parallel to the principal axis meet after a converging lens (also called the focal point, F).',
    lesson: '10.6',
  },
  {
    word: 'focal length',
    meaning: 'The distance from the centre of the lens to the principal focus. Symbol $f$.',
    lesson: '10.6',
  },
  {
    word: 'inverted',
    meaning: 'Upside down.',
    lesson: '10.7',
  },
  {
    word: 'magnified',
    meaning: 'Bigger than the object. Exam questions often say “enlarged”. Smaller than the object is “diminished”.',
    lesson: '10.7',
  },
  {
    word: 'dispersion',
    meaning: 'White light splits into its colours, because each colour refracts by a different amount.',
    lesson: '10.9',
  },
  {
    word: 'spectrum',
    meaning: 'The band of colours from white light: red, orange, yellow, green, blue, indigo, violet.',
    lesson: '10.9',
  },
  // Unit 11
  {
    word: 'electromagnetic spectrum',
    meaning: 'The family of electromagnetic waves, in order: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays.',
    lesson: '11.1',
  },
  {
    word: 'vacuum',
    meaning: 'A space with no matter in it, not even air.',
    example: 'Electromagnetic waves can travel through a vacuum. Sound cannot.',
    lesson: '11.1',
  },
  {
    word: 'satellite',
    meaning: 'An object that orbits a planet. Artificial satellites are made by people, for example for communication.',
    lesson: '11.3',
  },
  {
    word: 'geostationary',
    meaning: 'A geostationary satellite orbits once in 24 hours, above the equator, so it stays above the same place on the Earth.',
    lesson: '11.3',
  },
  {
    word: 'analogue signal',
    meaning: 'A signal that changes smoothly and can have any value.',
    lesson: '11.4',
  },
  {
    word: 'digital signal',
    meaning: 'A signal with only two values: 1 (on) and 0 (off).',
    lesson: '11.4',
  },
  {
    word: 'noise',
    meaning: 'Unwanted random changes added to a signal as it travels.',
    lesson: '11.4',
  },
  {
    word: 'regenerate',
    meaning: 'To make a signal clean again, exactly like it was at the start. This is easy for a digital signal.',
    lesson: '11.4',
  },
  {
    word: 'pitch',
    meaning: 'How high or low a sound is. A higher frequency gives a higher pitch.',
    lesson: '11.6',
  },
  {
    word: 'loudness',
    meaning: 'How loud a sound is. A bigger amplitude gives a louder sound.',
    lesson: '11.6',
  },
  {
    word: 'echo',
    meaning: 'A sound that reflects from a surface and comes back.',
    lesson: '11.6',
  },
  {
    word: 'oscilloscope',
    meaning: 'An instrument that shows a signal (for example a sound picked up by a microphone) as a wave on a screen.',
    lesson: '11.6',
  },
  {
    word: 'ultrasound',
    meaning: 'Sound with a frequency higher than 20 kHz (20 000 Hz). Humans cannot hear it.',
    lesson: '11.7',
  },
  {
    word: 'sonar',
    meaning: 'Using pulses of ultrasound and their echoes to find the depth of the sea, or objects under water.',
    lesson: '11.7',
  },
  // Unit 12
  {
    word: 'magnetic pole',
    meaning: 'One end of a magnet, where the magnetic force is strongest. Every magnet has a north pole (N) and a south pole (S).',
    lesson: '12.1',
  },
  {
    word: 'attract',
    meaning: 'To pull towards each other. Unlike poles (N and S) attract.',
    lesson: '12.1',
  },
  {
    word: 'repel',
    meaning: 'To push away from each other. Like poles (N and N, or S and S) repel.',
    lesson: '12.1',
  },
  {
    word: 'magnetic material',
    meaning: 'A material that a magnet attracts: iron, steel, nickel and cobalt.',
    lesson: '12.1',
  },
  {
    word: 'magnetised',
    meaning: 'Made into a magnet. An unmagnetised piece of iron is not a magnet (yet).',
    lesson: '12.1',
  },
  {
    word: 'induced magnetism',
    meaning: 'A magnetic material becomes a magnet when it is near a magnet (or touching it).',
    lesson: '12.1',
  },
  {
    word: 'temporary magnet',
    meaning: 'A magnet that loses its magnetism easily, for example soft iron.',
    lesson: '12.1',
  },
  {
    word: 'permanent magnet',
    meaning: 'A magnet that keeps its magnetism, for example one made of steel.',
    lesson: '12.1',
  },
  {
    word: 'magnetic field',
    meaning: 'The region around a magnet where a magnetic pole feels a force.',
    lesson: '12.2',
  },
  {
    word: 'field line',
    meaning: 'A line that shows the direction of a field. Magnetic field lines go from N to S outside a magnet. Closer lines mean a stronger field.',
    lesson: '12.2',
  },
  {
    word: 'compass',
    meaning: 'A small magnet (the needle) that can turn freely. Its north pole points along the magnetic field.',
    lesson: '12.2',
  },
  {
    word: 'electric charge',
    meaning: 'A property of particles: positive (+) or negative (−). Like charges repel; unlike charges attract.',
    lesson: '12.3',
  },
  {
    word: 'electron',
    meaning: 'A very small particle with a negative charge. Electrons are found in all atoms.',
    lesson: '12.3',
  },
  {
    word: 'electrostatic',
    meaning: 'About charges that do not move (static electricity), for example on a rubbed balloon.',
    lesson: '12.3',
  },
  {
    word: 'coulomb',
    meaning: 'The unit of electric charge (C).',
    lesson: '12.3',
  },
  {
    word: 'electrical conductor',
    meaning: 'A material that lets charge (electrons) move through it easily, for example a metal.',
    lesson: '12.4',
  },
  {
    word: 'electrical insulator',
    meaning: 'A material that does not let charge move through it, for example plastic, rubber, glass, dry wood.',
    lesson: '12.4',
  },
  {
    word: 'electric field',
    meaning: 'The region around a charge where another charge feels a force. Its direction is the direction of the force on a positive charge.',
    lesson: '12.4',
  },
  // Unit 13
  {
    word: 'electric current',
    meaning: 'A flow of charge. In a metal wire, it is a flow of free electrons. Symbol $I$, unit ampere (A).',
    lesson: '13.1',
  },
  {
    word: 'ampere',
    meaning: 'The unit of current (A). 1 A = 1 coulomb of charge each second.',
    lesson: '13.1',
  },
  {
    word: 'conventional current',
    meaning: 'The direction we use for current: from the positive terminal to the negative terminal. Electrons flow the other way.',
    lesson: '13.1',
  },
  {
    word: 'direct current',
    meaning: 'A current that always flows in the same direction (d.c.), for example from a cell.',
    lesson: '13.1',
  },
  {
    word: 'alternating current',
    meaning: 'A current that changes direction again and again (a.c.), for example from the mains.',
    lesson: '13.1',
  },
  {
    word: 'ammeter',
    meaning: 'An instrument that measures current. It is connected in series.',
    lesson: '13.2',
  },
  {
    word: 'electromotive force',
    meaning: 'The e.m.f. of a source: the work it does to move one coulomb of charge around a complete circuit. Unit: volt (V).',
    lesson: '13.3',
  },
  {
    word: 'potential difference',
    meaning: 'The p.d. across a component: the work done (energy transferred) by one coulomb of charge passing through it. Unit: volt (V).',
    lesson: '13.3',
  },
  {
    word: 'volt',
    meaning: 'The unit of e.m.f. and p.d. (V). 1 V = 1 joule per coulomb.',
    lesson: '13.3',
  },
  {
    word: 'voltmeter',
    meaning: 'An instrument that measures p.d. (or e.m.f.). It is connected in parallel with the component.',
    lesson: '13.3',
  },
  {
    word: 'resistance',
    meaning: 'How much a component opposes the current: $R = \\dfrac{V}{I}$. Unit: ohm (Ω).',
    lesson: '13.4',
  },
  {
    word: 'ohm',
    meaning: 'The unit of resistance (Ω). 1 Ω = 1 volt per ampere.',
    lesson: '13.4',
  },
  {
    word: 'cross-sectional area',
    meaning: 'The area of the end of a wire, if you cut it straight across. A thicker wire has a bigger cross-sectional area.',
    lesson: '13.5',
  },
  {
    word: 'filament lamp',
    meaning: 'A lamp with a thin metal wire (filament) that gets very hot and glows. Its resistance increases as it gets hotter.',
    lesson: '13.6',
  },
  {
    word: 'diode',
    meaning: 'A component that lets current flow in one direction only.',
    lesson: '13.6',
  },
  {
    word: 'kilowatt-hour',
    meaning: 'A unit of energy (kW h): the energy transferred by a 1 kW appliance in 1 hour. 1 kW h = 3 600 000 J.',
    lesson: '13.8',
  },
  // Unit 14
  {
    word: 'series circuit',
    meaning: 'A circuit with only one path (one loop). The current is the same everywhere.',
    lesson: '14.2',
  },
  {
    word: 'parallel circuit',
    meaning: 'A circuit with two or more branches. The p.d. across each branch is the same.',
    lesson: '14.3',
  },
  {
    word: 'junction',
    meaning: 'A point where a circuit splits into branches, or where branches join.',
    lesson: '14.3',
  },
  {
    word: 'branch',
    meaning: 'One of the paths of a parallel circuit.',
    lesson: '14.3',
  },
  {
    word: 'thermistor',
    meaning: 'A resistor whose resistance changes with temperature. For an NTC thermistor, the resistance goes down when the temperature goes up.',
    lesson: '14.5',
  },
  {
    word: 'light-dependent resistor',
    meaning: 'An LDR: a resistor whose resistance goes down when more light falls on it.',
    lesson: '14.5',
  },
  {
    word: 'potential divider',
    meaning: 'Two resistors in series that share the supply p.d. in the ratio of their resistances: $\\dfrac{R_1}{R_2} = \\dfrac{V_1}{V_2}$.',
    lesson: '14.5',
  },
  {
    word: 'live wire',
    meaning: 'The wire in a mains circuit at a high alternating p.d. (also called the line wire). The switch and the fuse go in the live wire.',
    lesson: '14.6',
  },
  {
    word: 'neutral wire',
    meaning: 'The wire that completes the mains circuit. It is at (or near) 0 V.',
    lesson: '14.6',
  },
  {
    word: 'earth wire',
    meaning: 'A safety wire connected to the metal case of an appliance and to the ground.',
    lesson: '14.6',
  },
  {
    word: 'fuse',
    meaning: 'A thin wire that melts and breaks the circuit if the current is bigger than its rating.',
    lesson: '14.7',
  },
  {
    word: 'trip switch',
    meaning: 'A circuit breaker: an automatic switch that opens the circuit if the current is too big. It can be reset.',
    lesson: '14.7',
  },
  {
    word: 'double-insulated',
    meaning: 'An appliance with a plastic (non-conducting) case, so the user cannot touch a live part. It does not need an earth wire.',
    lesson: '14.7',
  },
  // Unit 15
  {
    word: 'solenoid',
    meaning: 'A long coil of wire. With a current, its magnetic field is like the field of a bar magnet.',
    lesson: '15.1',
  },
  {
    word: 'relay',
    meaning: 'A switch worked by an electromagnet: a small current in one circuit switches a bigger current in another circuit.',
    lesson: '15.2',
  },
  {
    word: 'motor effect',
    meaning: 'A wire carrying a current in a magnetic field feels a force (unless it is parallel to the field).',
    lesson: '15.3',
  },
  {
    word: 'split-ring commutator',
    meaning: 'In a d.c. motor: a ring cut in two halves. It reverses the current in the coil every half turn, so the coil keeps turning the same way.',
    lesson: '15.4',
  },
  {
    word: 'electromagnetic induction',
    meaning: 'An e.m.f. is induced in a conductor when it moves across a magnetic field, or when the magnetic field through it changes.',
    lesson: '15.5',
  },
  {
    word: 'induced',
    meaning: 'Produced by a change, without a direct connection. An induced e.m.f. comes from a changing magnetic field.',
    lesson: '15.5',
  },
  {
    word: 'generator',
    meaning: 'A machine that turns kinetic energy into electrical energy by electromagnetic induction.',
    lesson: '15.7',
  },
  {
    word: 'slip rings',
    meaning: 'In an a.c. generator: two rings that turn with the coil and touch the brushes, so the coil is always connected to the same output wire.',
    lesson: '15.7',
  },
  {
    word: 'transformer',
    meaning: 'Two coils on a soft-iron core. It changes the size of an alternating p.d.: $\\dfrac{V_p}{V_s} = \\dfrac{N_p}{N_s}$.',
    lesson: '15.8',
  },
  {
    word: 'step-up transformer',
    meaning: 'A transformer with more turns on the secondary coil: the output p.d. is bigger than the input p.d.',
    lesson: '15.8',
  },
  {
    word: 'step-down transformer',
    meaning: 'A transformer with fewer turns on the secondary coil: the output p.d. is smaller than the input p.d.',
    lesson: '15.8',
  },
  {
    word: 'primary coil',
    meaning: 'The input coil of a transformer.',
    lesson: '15.8',
  },
  {
    word: 'secondary coil',
    meaning: 'The output coil of a transformer.',
    lesson: '15.8',
  },
  // Unit 16
  {
    word: 'nucleus',
    meaning: 'The very small, positive centre of an atom. It contains protons and neutrons and almost all the mass of the atom.',
    lesson: '16.1',
  },
  {
    word: 'proton',
    meaning: 'A particle in the nucleus, with a relative charge of +1.',
    lesson: '16.1',
  },
  {
    word: 'neutron',
    meaning: 'A particle in the nucleus, with no charge (0).',
    lesson: '16.1',
  },
  {
    word: 'ion',
    meaning: 'An atom that has lost electrons (positive ion) or gained electrons (negative ion).',
    lesson: '16.1',
  },
  {
    word: 'proton number',
    meaning: 'The number of protons in a nucleus (atomic number, Z).',
    lesson: '16.3',
  },
  {
    word: 'nucleon number',
    meaning: 'The number of protons + neutrons in a nucleus (mass number, A).',
    lesson: '16.3',
  },
  {
    word: 'isotope',
    meaning: 'Atoms of the same element (same number of protons) with different numbers of neutrons.',
    example: 'Carbon-12 and carbon-14.',
    lesson: '16.3',
  },
  {
    word: 'fission',
    meaning: 'A big nucleus splits into two smaller nuclei and releases energy.',
    lesson: '16.4',
  },
  {
    word: 'fusion',
    meaning: 'Two small nuclei join to make a bigger nucleus and release energy.',
    lesson: '16.4',
  },
  {
    word: 'background radiation',
    meaning: 'The ionising radiation that is around us all the time, from natural and artificial sources.',
    lesson: '16.5',
  },
  {
    word: 'count rate',
    meaning: 'The number of counts a detector records each second (or each minute).',
    lesson: '16.5',
  },
  {
    word: 'ionising',
    meaning: 'Able to remove electrons from atoms, making ions. Ionising radiation can damage living cells.',
    lesson: '16.6',
  },
  {
    word: 'alpha particle',
    meaning: 'A helium nucleus (2 protons and 2 neutrons). Strongly ionising; stopped by paper.',
    lesson: '16.6',
  },
  {
    word: 'beta particle',
    meaning: 'A fast electron from the nucleus. Stopped by a few millimetres of aluminium.',
    lesson: '16.6',
  },
  {
    word: 'gamma radiation',
    meaning: 'Electromagnetic radiation from the nucleus. Weakly ionising; reduced by thick lead or concrete.',
    lesson: '16.6',
  },
  {
    word: 'radioactive decay',
    meaning: 'A change in an unstable nucleus, which gives out α, β or γ radiation. It is spontaneous and random.',
    lesson: '16.7',
  },
  {
    word: 'half-life',
    meaning: 'The time taken for half the nuclei of an isotope in a sample to decay.',
    lesson: '16.8',
  },
  {
    word: 'electromagnet',
    meaning: 'A coil of wire with a current in it, usually around a soft iron core. It is a magnet that you can switch on and off.',
    lesson: '12.5',
  },
  {
    word: 'monochromatic',
    meaning: 'Light of one single frequency (one colour).',
    lesson: '10.9',
  },
  // Unit 17
  {
    word: 'axis',
    meaning: 'An imaginary line through the North Pole and the South Pole. The Earth spins around its axis.',
    lesson: '17.1',
  },
  {
    word: 'rotate',
    meaning: 'To spin around an axis. The Earth rotates once in about 24 hours.',
    lesson: '17.1',
  },
  {
    word: 'orbit',
    meaning: 'The path of an object around a bigger object, for example the Earth around the Sun. Also the verb: the Moon orbits the Earth.',
    lesson: '17.1',
  },
  {
    word: 'tilt',
    meaning: 'A small angle away from straight up. The Earth’s axis is tilted by about 23.5°.',
    lesson: '17.1',
  },
  {
    word: 'hemisphere',
    meaning: 'Half of the Earth: the northern hemisphere is north of the equator, the southern hemisphere is south of it.',
    lesson: '17.1',
  },
  {
    word: 'phases of the Moon',
    meaning: 'The shapes of the lit part of the Moon that we see from the Earth: new moon, first quarter, full moon, last quarter.',
    lesson: '17.2',
  },
  {
    word: 'orbital period',
    meaning: 'The time for one complete orbit. Symbol $T$.',
    example: 'The orbital period of the Earth is about 365 days.',
    lesson: '17.2',
  },
  {
    word: 'orbital speed',
    meaning: 'The speed of an object in its orbit: $v = \\dfrac{2\\pi r}{T}$.',
    lesson: '17.2',
  },
  {
    word: 'planet',
    meaning: 'A large round object that orbits the Sun. There are eight planets.',
    lesson: '17.3',
  },
  {
    word: 'dwarf planet',
    meaning: 'A minor planet that is round but smaller than a planet, for example Pluto.',
    lesson: '17.3',
  },
  {
    word: 'asteroid',
    meaning: 'A small rocky object that orbits the Sun. Many asteroids are in the asteroid belt, between Mars and Jupiter.',
    lesson: '17.3',
  },
  {
    word: 'comet',
    meaning: 'A small object of ice and dust that orbits the Sun in a very long, thin (elliptical) orbit.',
    lesson: '17.3',
  },
  {
    word: 'moon',
    meaning: 'A natural object that orbits a planet.',
    lesson: '17.3',
  },
  {
    word: 'accretion disc',
    meaning: 'A flat, spinning disc of gas and dust. Planets form in it.',
    lesson: '17.4',
  },
  {
    word: 'gravitational field strength',
    meaning: 'The gravitational force on each kilogram. Symbol $g$, unit N/kg.',
    example: 'On the Earth, $g = 9.8\\,\\text{N/kg}$.',
    lesson: '17.5',
  },
  {
    word: 'elliptical',
    meaning: 'Shaped like a stretched circle (an ellipse).',
    lesson: '17.5',
  },
  {
    word: 'nuclear fusion',
    meaning: 'Small nuclei join to make a bigger nucleus. This releases energy. In stars, hydrogen fuses to make helium.',
    lesson: '17.6',
  },
  {
    word: 'galaxy',
    meaning: 'A huge group of many billions of stars, held together by gravity. We live in the Milky Way.',
    lesson: '17.6',
  },
  {
    word: 'light-year',
    meaning: 'The distance that light travels in space in one year: $9.5 \\times 10^{15}\\,\\text{m}$.',
    lesson: '17.6',
  },
  {
    word: 'protostar',
    meaning: 'A cloud of gas and dust that collapses and gets hotter. It becomes a star.',
    lesson: '17.7',
  },
  {
    word: 'supernova',
    meaning: 'The huge explosion of a red supergiant at the end of its life.',
    lesson: '17.7',
  },
  {
    word: 'redshift',
    meaning: 'An increase in the wavelength of light from a star or galaxy that moves away from us.',
    lesson: '17.8',
  },
  {
    word: 'Big Bang theory',
    meaning: 'The idea that the Universe started from a single point and has been expanding since then.',
    lesson: '17.8',
  },
  {
    word: 'CMBR',
    meaning: 'Cosmic microwave background radiation: microwaves that come from all directions in space. They were made shortly after the Universe began.',
    lesson: '17.8',
  },
  {
    word: 'Hubble constant',
    meaning: 'The speed of a galaxy divided by its distance: $H_0 = \\dfrac{v}{d}$. Today $H_0 \\approx 2.2 \\times 10^{-18}\\,\\text{s}^{-1}$.',
    lesson: '17.9',
  },
];

// Cambridge command words, explained in clear English (our own words).
export interface CommandWord {
  word: string;
  meaning: string;
  example: string;
}

export const commandWords: CommandWord[] = [
  { word: 'Calculate', meaning: 'Use numbers and an equation to find the answer. Show your working.', example: 'Calculate the speed of the car.' },
  { word: 'Comment', meaning: 'Give your opinion, with a reason from physics.', example: 'Comment on the result of the experiment.' },
  { word: 'Compare', meaning: 'Say what is the same and what is different.', example: 'Compare the speeds of the two runners.' },
  { word: 'Deduce', meaning: 'Use the information you have to reach an answer.', example: 'Deduce which car is faster.' },
  { word: 'Define', meaning: 'Give the exact meaning of a word.', example: 'Define speed.' },
  { word: 'Describe', meaning: 'Say what happens or what something is like. Give the main points.', example: 'Describe the motion of the ball.' },
  { word: 'Determine', meaning: 'Find the answer from the information you have.', example: 'Determine the speed from the graph.' },
  { word: 'Explain', meaning: 'Say why or how something happens. Give reasons.', example: 'Explain why the ball slows down.' },
  { word: 'Give', meaning: 'Write a short answer, from memory or from the information.', example: 'Give the unit of speed.' },
  { word: 'Identify', meaning: 'Name it, choose it or point to it.', example: 'Identify the part of the graph where the car stops.' },
  { word: 'Justify', meaning: 'Give evidence or reasons for your answer.', example: 'Justify your choice of equipment.' },
  { word: 'Predict', meaning: 'Say what you think will happen, using the information.', example: 'Predict the time for 100 m.' },
  { word: 'Sketch', meaning: 'Draw a simple picture or graph by hand. Show the main features.', example: 'Sketch a distance–time graph for a car at rest.' },
  { word: 'State', meaning: 'Give a short, clear answer. No explanation needed.', example: 'State the equation for speed.' },
  { word: 'Suggest', meaning: 'Give an idea that makes sense. There can be more than one good answer.', example: 'Suggest one way to make the experiment more accurate.' },
];
