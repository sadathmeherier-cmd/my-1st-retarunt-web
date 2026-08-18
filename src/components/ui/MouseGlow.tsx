'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export function MouseGlow() {
  const { x, y } = useMousePosition();
  const glowX = useSpring(x, { stiffness: 50, damping: 20 });
  const glowY = useSpring(y, { stiffness: 50, damping: 20 });

  const gradientX = useTransform(glowX, (v) => `${v}px`);
  const gradientY = useTransform(glowY, (v) => `${v}px`);

  return (
    <motion.div
      className="absolute pointer-events-none z-0"
      style={{
        left: gradientX,
        top: gradientY,
        width: 600,
        height: 600,
        translateX: '-50%',
        translateY: '-50%',
        background:
          'radial-gradient(circle, rgba(212,168,83,0.08) 0%, rgba(201,138,58,0.03) 30%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
}
