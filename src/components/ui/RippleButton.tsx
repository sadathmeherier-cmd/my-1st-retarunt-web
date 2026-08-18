'use client';

import { useRef, useState } from 'react';

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
}

export function RippleButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }
    onClick?.();
  };

  const baseClasses = {
    primary:
      'bg-gradient-to-r from-gold to-amber text-black font-semibold hover:shadow-lg hover:shadow-gold/20',
    outline:
      'border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold',
    ghost: 'text-foreground/80 hover:text-gold hover:bg-white/5',
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`relative overflow-hidden rounded-full px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 ${baseClasses[variant]} ${className}`}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full bg-white/20 animate-ripple"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </button>
  );
}
