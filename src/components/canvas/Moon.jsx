import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export default function Moon({ data, timeScale }) {
  const moonRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (data.textureUrl) {
      new THREE.TextureLoader().load(data.textureUrl, (tex) => {
        setTexture(tex);
      });
    }
  }, [data.textureUrl]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * timeScale;
    
    if (moonRef.current) {
      // Rotation
      moonRef.current.rotation.y += data.rotationSpeed * timeScale;
      
      // Orbit Position (relative to parent planet group)
      const x = Math.cos(t * data.speed) * data.distance;
      const z = Math.sin(t * data.speed) * data.distance;
      moonRef.current.position.set(x, 0, z);
    }
  });

  // Create orbit path points
  const points = [];
  const segments = 64;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(theta) * data.distance,
      0,
      Math.sin(theta) * data.distance
    ));
  }

  return (
    <group>
      {/* Moon Orbit Path */}
      <Line
        points={points}
        color="#ffffff"
        lineWidth={0.5}
        transparent
        opacity={0.15}
      />
      
      {/* Moon Mesh */}
      <mesh ref={moonRef} castShadow receiveShadow>
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshStandardMaterial 
          color={texture ? '#ffffff' : data.color}
          map={texture}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
