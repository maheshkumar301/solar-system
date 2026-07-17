import { Suspense, useRef, useEffect } from 'react';
import { Stars, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

import Planet from './Planet';
import Sun from './Sun';
import { planetsData, sunData } from '../../data/planets';

export default function Scene({ timeScale, selectedPlanet, onPlanetSelect }) {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (selectedPlanet) {
      const isSun = selectedPlanet.id === 'sun';
      const offset = isSun ? 50 : selectedPlanet.radius * 5;
      
      camera.position.set(0, offset, selectedPlanet.distance + offset);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0); 
        controlsRef.current.update();
      }
    }
  }, [selectedPlanet, camera]);

  return (
    <>
      <color attach="background" args={['#020204']} />
      
      {/* Dim ambient light so shadows aren't pitch black, but space still looks dark */}
      <ambientLight intensity={0.05} />
      
      {/* Cosmic background */}
      <Stars radius={150} depth={50} count={10000} factor={8} saturation={0} fade speed={1} />
      
      <OrbitControls 
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableDamping={true}
        dampingFactor={0.05}
        maxDistance={400}
        minDistance={10}
      />

      <Suspense fallback={null}>
        <Sun 
          data={sunData} 
          onClick={onPlanetSelect}
          isSelected={selectedPlanet?.id === 'sun'}
        />
        
        {planetsData.map((planet) => (
          <Planet 
            key={planet.id} 
            data={planet} 
            timeScale={timeScale}
            onClick={onPlanetSelect}
            isSelected={selectedPlanet?.id === planet.id}
          />
        ))}

        {/* Postprocessing for realistic glow */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={2.5} />
        </EffectComposer>
      </Suspense>
    </>
  );
}
