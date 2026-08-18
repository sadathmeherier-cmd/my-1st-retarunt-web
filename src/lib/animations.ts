import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const staggerContainer = (staggerChildren: number = 0.1) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren: 0.1,
    },
  },
});

export const fadeInUp = (delay: number = 0) => ({
  initial: { y: 60, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay,
    },
  },
});

export const fadeInLeft = (delay: number = 0) => ({
  initial: { x: -60, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay,
    },
  },
});

export const fadeInRight = (delay: number = 0) => ({
  initial: { x: 60, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay,
    },
  },
});

export const scaleIn = (delay: number = 0) => ({
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay,
    },
  },
});

export const wordReveal = {
  initial: { y: 100, opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.08,
    },
  }),
};

export const letterReveal = {
  initial: { y: 60, rotateX: -40, opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.03,
    },
  }),
};

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const imageReveal = {
  initial: { scale: 1.4, clipPath: 'inset(0 0 100% 0)' },
  animate: {
    scale: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function animateOnScroll(element: string, animation: gsap.TweenVars) {
  const targets = document.querySelectorAll(element);
  targets.forEach((target) => {
    gsap.fromTo(
      target,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        ...animation,
      }
    );
  });
}

export function parallaxEffect(element: string, speed: number = 0.3) {
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

export function counterAnimation(
  element: string,
  start: number,
  end: number,
  duration: number = 2
) {
  const obj = { value: start };
  gsap.to(obj, {
    value: end,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
    },
    onUpdate: () => {
      const el = document.querySelector(element);
      if (el) el.textContent = Math.round(obj.value).toString();
    },
  });
}
