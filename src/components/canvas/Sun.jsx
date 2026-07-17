import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Sun({ data, onClick, isSelected }) {
  const sunRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (data.textureUrl) {
      new THREE.TextureLoader().load(data.textureUrl, (tex) => {
        setTexture(tex);
      });
    }
  }, [data.textureUrl]);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Light Source - bright pure white light to illuminate planets */}
      <pointLight intensity={10} distance={600} decay={0.5} color="#ffffff" castShadow shadow-bias={-0.0001} />
      
      {/* Sun Mesh */}
      <mesh 
        ref={sunRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(data);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[data.radius, 64, 64]} />
        {/* Using StandardMaterial with Emissive for real Bloom effect */}
        <meshStandardMaterial 
          map={texture}
          color="#ffffff"
          emissive="#ffaa00"
          emissiveMap={texture}
          emissiveIntensity={2}
          roughness={1}
          toneMapped={false} /* Important so bloom can exceed 1.0 */
        />
      </mesh>
    </group>
  );
}
