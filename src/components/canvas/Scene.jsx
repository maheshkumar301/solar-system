import { Suspense, useRef, useEffect, useState } from 'react';
import { Stars, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

import Planet from './Planet';
import Sun from './Sun';
import { planetsData, sunData } from '../../data/planets';

function MilkyWay() {
  const [texture, setTexture] = useState(null);
  
  useEffect(() => {
    // High-res Milky Way panorama
    new THREE.TextureLoader().load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/galaxy_starfield.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setTexture(tex);
    });
  }, []);

  if (!texture) return null;

  return (
    <mesh>
      {/* Huge radius to act as a proper skybox */}
      <sphereGeometry args={[1500, 64, 64]} />
      {/* Opacity 1 so it's a solid background, not a transparent ghost sphere */}
      <meshBasicMaterial 
        map={texture} 
        side={THREE.BackSide} 
        depthWrite={false} 
      />
    </mesh>
  );
}

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
      <color attach="background" args={['#010102']} />
      
      {/* Dim ambient light so shadows aren't pitch black, but space still looks dark */}
      <ambientLight intensity={0.05} />
      
      {/* Cosmic background with Milky Way panorama and procedural stars */}
      <MilkyWay />
      {/* Increased radius so procedural stars don't look like a tiny snowball when zooming out */}
      <Stars radius={1000} depth={300} count={15000} factor={8} saturation={0} fade speed={1} />
      
      <OrbitControls 
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableDamping={true}
        dampingFactor={0.05}
        maxDistance={800}
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
