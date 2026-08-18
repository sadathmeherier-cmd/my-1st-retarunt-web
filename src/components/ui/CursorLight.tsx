'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorLight() {
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lightX = useSpring(x, { stiffness: 60, damping: 20 });
  const lightY = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const update = (clientX: number, clientY: number) => {
      x.set(clientX);
      y.set(clientY);
      setVisible(true);
    };

    const handleMouseMove = (e: MouseEvent) => update(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) update(touch.clientX, touch.clientY);
    };
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[9996] transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          left: lightX,
          top: lightY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(212,168,83,0.10) 0%, rgba(201,138,58,0.04) 30%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
