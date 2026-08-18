'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ count = 50 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      velocities.push({
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { geometry, velocities };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      positions[i * 3] += particles.velocities[i].x;
      positions[i * 3 + 1] += particles.velocities[i].y;
      positions[i * 3 + 2] += particles.velocities[i].z;

      if (Math.abs(positions[i * 3]) > 10) particles.velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 10) particles.velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 10) particles.velocities[i].z *= -1;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y += 0.0002;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry {...particles.geometry} />
      <pointsMaterial
        size={0.03}
        color="#d4a853"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export function Particles({ count = 50 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ParticleField count={count} />
      </Canvas>
    </div>
  );
}
