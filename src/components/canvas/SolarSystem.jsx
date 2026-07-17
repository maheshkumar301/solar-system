import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

export default function SolarSystem({ timeScale, selectedPlanet, onPlanetSelect }) {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <Canvas shadows camera={{ position: [0, 80, 150], fov: 45 }}>
        <Scene 
          timeScale={timeScale} 
          selectedPlanet={selectedPlanet} 
          onPlanetSelect={onPlanetSelect} 
        />
      </Canvas>
    </div>
  );
}
