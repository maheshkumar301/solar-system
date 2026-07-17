export const planetsData = [
  {
    id: 'mercury',
    name: 'Mercury',
    radius: 0.38,
    distance: 6,
    speed: 0.04,
    rotationSpeed: 0.01,
    angleOffset: Math.random() * Math.PI * 2,
    color: '#8c8c94',
    textureUrl: 'https://raw.githubusercontent.com/joshcam/three-js-solar-system/master/img/mercury.jpg',
    description: 'The smallest planet in our solar system and nearest to the Sun.',
    facts: { year: '88 Earth days', day: '59 Earth days', moons: 0, type: 'Terrestrial Planet' }
  },
  {
    id: 'venus',
    name: 'Venus',
    radius: 0.95,
    distance: 9,
    speed: 0.015,
    rotationSpeed: -0.002,
    angleOffset: Math.random() * Math.PI * 2,
    color: '#e3bb76',
    textureUrl: 'https://raw.githubusercontent.com/joshcam/three-js-solar-system/master/img/venus.jpg',
    description: 'Venus is the second planet from the Sun and is Earth\'s closest planetary neighbor.',
    facts: { year: '225 Earth days', day: '243 Earth days', moons: 0, type: 'Terrestrial Planet' }
  },
  {
    id: 'earth',
    name: 'Earth',
    radius: 1,
    distance: 13,
    speed: 0.01,
    rotationSpeed: 0.02,
    angleOffset: Math.random() * Math.PI * 2,
    color: '#2b82c9',
    textureUrl: 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    description: 'Our home planet is the third planet from the Sun.',
    facts: { year: '365.25 days', day: '24 hours', moons: 1, type: 'Terrestrial Planet' },
    moonsData: [
      {
        id: 'moon',
        radius: 0.27,
        distance: 2,
        speed: 0.1,
        rotationSpeed: 0.01,
        color: '#aaaaaa',
        textureUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg'
      }
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    radius: 0.53,
    distance: 18,
    speed: 0.008,
    rotationSpeed: 0.018,
    angleOffset: Math.random() * Math.PI * 2,
    color: '#c1440e',
    textureUrl: 'https://raw.githubusercontent.com/joshcam/three-js-solar-system/master/img/mars.jpg',
    description: 'Mars is the fourth planet from the Sun – a dusty, cold, desert world.',
    facts: { year: '687 Earth days', day: '24.6 hours', moons: 2, type: 'Terrestrial Planet' }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    radius: 5.2, // Scaled down for UI
    distance: 30, 
    speed: 0.002,
    rotationSpeed: 0.04,
    angleOffset: Math.random() * Math.PI * 2,
    color: '#d39c7e',
    textureUrl: 'https://raw.githubusercontent.com/joshcam/three-js-solar-system/master/img/jupiter.jpg',
    description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System.',
    facts: { year: '11.8 Earth years', day: '9.9 hours', moons: 95, type: 'Gas Giant' }
  },
  {
    id: 'saturn',
    name: 'Saturn',
    radius: 4.4,
    distance: 45,
    speed: 0.0009,
    rotationSpeed: 0.038,
    angleOffset: Math.random() * Math.PI * 2,
    color: '#c5ab6e',
    hasRings: true,
    ringTextureUrl: 'https://raw.githubusercontent.com/joshcam/three-js-solar-system/master/img/saturnring.png',
    textureUrl: 'https://raw.githubusercontent.com/joshcam/three-js-solar-system/master/img/saturn.jpg',
    description: 'Saturn is the sixth planet from the Sun and the second-largest.',
    facts: { year: '29.4 Earth years', day: '10.7 hours', moons: 146, type: 'Gas Giant' }
  },
  {
    id: 'uranus',
    name: 'Uranus',
    radius: 2.5,
    distance: 58,
    speed: 0.0004,
    rotationSpeed: -0.03,
    angleOffset: Math.random() * Math.PI * 2,
    color: '#4b70dd',
    hasRings: true,
    textureUrl: 'https://raw.githubusercontent.com/joshcam/three-js-solar-system/master/img/uranus.jpg',
    description: 'Uranus is the seventh planet from the Sun.',
    facts: { year: '84 Earth years', day: '17.2 hours', moons: 27, type: 'Ice Giant' }
  },
  {
    id: 'neptune',
    name: 'Neptune',
    radius: 2.4,
    distance: 70,
    speed: 0.0001,
    rotationSpeed: 0.032,
    angleOffset: Math.random() * Math.PI * 2,
    color: '#274687',
    textureUrl: 'https://raw.githubusercontent.com/joshcam/three-js-solar-system/master/img/neptune.jpg',
    description: 'Neptune is the eighth and farthest-known Solar planet.',
    facts: { year: '165 Earth years', day: '16.1 hours', moons: 14, type: 'Ice Giant' }
  }
];

export const sunData = {
  id: 'sun',
  name: 'The Sun',
  radius: 12, // Scaled down
  color: '#ffcc00',
  textureUrl: 'https://raw.githubusercontent.com/joshcam/three-js-solar-system/master/img/sun.jpg',
  description: 'The Sun is the star at the center of the Solar System.',
  facts: { type: 'Yellow Dwarf', age: '4.6 Billion Years', mass: '333,000 x Earth', temperature: '5,500°C' }
};
