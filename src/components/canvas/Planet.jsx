import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import Moon from './Moon';

export default function Planet({ data, timeScale, isSelected, onClick }) {
  const systemRef = useRef();
  const planetRef = useRef();
  
  const [texture, setTexture] = useState(null);
  const [ringTexture, setRingTexture] = useState(null);
  
  useEffect(() => {
    if (data.textureUrl) {
      new THREE.TextureLoader().load(data.textureUrl, (tex) => {
        setTexture(tex);
      });
    }
    if (data.ringTextureUrl) {
      new THREE.TextureLoader().load(data.ringTextureUrl, (tex) => {
        setRingTexture(tex);
      });
    }
  }, [data.textureUrl, data.ringTextureUrl]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * timeScale;
    
    // System Position (Orbit around Sun)
    if (systemRef.current) {
      const currentAngle = t * data.speed + data.angleOffset;
      const x = Math.cos(currentAngle) * data.distance;
      const z = Math.sin(currentAngle) * data.distance;
      systemRef.current.position.set(x, 0, z);
    }
    
    // Planet Rotation (Day/Night cycle)
    if (planetRef.current) {
      planetRef.current.rotation.y += data.rotationSpeed * timeScale;
    }
  });

  // Create orbit path points for the planet
  const points = [];
  const segments = 128;
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
      {/* Orbit Path around Sun */}
      <Line
        points={points}
        color={isSelected ? "#ffffff" : "#ffffff"}
        lineWidth={isSelected ? 1.5 : 0.8}
        transparent
        opacity={isSelected ? 0.6 : 0.25}
      />
      
      {/* System Group (Planet + Moons) */}
      <group ref={systemRef}>
        {/* Planet Mesh */}
        <mesh 
          ref={planetRef}
          castShadow
          receiveShadow
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
          <sphereGeometry args={[data.radius, 32, 32]} />
          <meshStandardMaterial 
            color={texture ? '#ffffff' : data.color}
            map={texture}
            roughness={0.7}
            metalness={0.1}
            emissive={isSelected ? data.color : '#000000'}
            emissiveIntensity={0.2}
          />
          
          {/* Basic Rings (for Saturn/Uranus) */}
          {data.hasRings && (
            <mesh rotation={[-Math.PI / 2 + 0.2, 0, 0]} receiveShadow castShadow>
              <ringGeometry args={[data.radius * 1.4, data.radius * 2.2, 64]} />
              <meshStandardMaterial 
                color={ringTexture ? '#ffffff' : data.color} 
                map={ringTexture}
                transparent 
                opacity={ringTexture ? 1 : 0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </mesh>

        {/* Moons */}
        {data.moonsData && data.moonsData.map(moon => (
          <Moon key={moon.id} data={moon} timeScale={timeScale} />
        ))}
      </group>
    </group>
  );
}
