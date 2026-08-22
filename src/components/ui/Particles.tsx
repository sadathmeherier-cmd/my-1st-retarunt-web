'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ count = 50 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const velocitiesRef = useRef<{ x: number; y: number; z: number }[]>([]);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const geo = new THREE.BufferGeometry();
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

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometryRef.current = geo;
    velocitiesRef.current = velocities;

    if (meshRef.current) {
      meshRef.current.geometry = geo;
    }
  }, [count]);

  useFrame(() => {
    const mesh = meshRef.current;
    const velocities = velocitiesRef.current;
    const positionAttribute = mesh?.geometry.getAttribute('position');

    if (!mesh || !positionAttribute || velocities.length < count) return;

    const positions = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;

      if (Math.abs(positions[i * 3]) > 10) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 10) velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 10) velocities[i].z *= -1;
    }

    positionAttribute.needsUpdate = true;
    mesh.rotation.y += 0.0002;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geometryRef} />
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