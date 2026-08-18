# Ember & Oak

A modern, immersive restaurant website built with Next.js. Ember & Oak features a cinematic hero, smooth scrolling, 3D visuals, and animated sections for the menu, chef, gallery, testimonials, and reservations.

## Features

- Animated loading screen and custom cursor
- Smooth scrolling powered by [Lenis](https://lenis.darkroom.engineering/)
- 3D and particle effects with React Three Fiber / Three.js
- Scroll-driven animations with Framer Motion and GSAP
- Sections: Hero, Story, Menu, Chef, Gallery, Testimonials, Reservation
- Sticky navbar, scroll progress bar, and WhatsApp button
- Fully responsive, styled with Tailwind CSS

## Tech Stack

- [Next.js](https://nextjs.org) 16
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [React Three Fiber](https://r3f.docs.pmnd.rs) / [Three.js](https://threejs.org)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://gsap.com)
- [Lenis](https://lenis.darkroom.engineering/)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run start` – serve the production build
- `npm run lint` – run ESLint

## Project Structure

```
src/
├── app/          # Next.js app router pages and layout
├── components/
│   ├── sections/ # Page sections (Hero, Menu, Gallery, etc.)
│   └── ui/       # Reusable UI components (buttons, cursor, effects)
├── hooks/        # Custom hooks (Lenis, mouse position, scroll)
└── lib/          # Shared utilities and animation helpers
```
