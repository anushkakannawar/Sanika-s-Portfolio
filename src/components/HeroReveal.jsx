import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// All 10 poster images
const heroImages = Array.from({ length: 10 }, (_, i) => `/posters/poster${i + 1}.jpg`);

// Each image gets a unique fan-out destination
// Format: { x, y, rotation, scale }
const imageDestinations = [
  { x: '-42vw', y: '-38vh', rotation: -15, scale: 0.55 },
  { x: '38vw',  y: '-32vh', rotation: 12,  scale: 0.5 },
  { x: '-50vw', y: '8vh',   rotation: -8,  scale: 0.6 },
  { x: '46vw',  y: '12vh',  rotation: 10,  scale: 0.55 },
  { x: '-30vw', y: '45vh',  rotation: -20, scale: 0.5 },
  { x: '40vw',  y: '48vh',  rotation: 15,  scale: 0.52 },
  { x: '-18vw', y: '-50vh', rotation: 5,   scale: 0.48 },
  { x: '20vw',  y: '55vh',  rotation: -10, scale: 0.55 },
  { x: '-55vw', y: '-15vh', rotation: 18,  scale: 0.45 },
  { x: '52vw',  y: '-48vh', rotation: -12, scale: 0.5 },
];

export default function HeroReveal() {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);

  useGSAP(() => {
    const images = gsap.utils.toArray('.hero-reveal-image');

    images.forEach((img, i) => {
      const dest = imageDestinations[i];

      gsap.fromTo(img,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 0.3,
          opacity: 0,
        },
        {
          x: dest.x,
          y: dest.y,
          rotation: dest.rotation,
          scale: dest.scale,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        }
      );
    });
  }, { scope: wrapperRef });

  return (
    <div className="hero-reveal-wrapper" ref={wrapperRef}>
      <div className="hero-reveal-sticky" ref={stickyRef}>
        {/* Poster images — behind the text */}
        <div className="hero-reveal-images">
          {heroImages.map((src, i) => (
            <div className="hero-reveal-image" key={i}>
              <img src={src} alt={`Poster ${i + 1}`} draggable={false} />
            </div>
          ))}
        </div>

        {/* Hero text — on top */}
        <div className="hero-reveal-text">
          <h1 className="hero-title">
            <span className="hero-title-name">Sanika</span>
            <span className="hero-title-name">Kannawar</span>
            <span className="hero-title-tagline">
              <span className="text-red">Designer</span> &amp; <span className="text-blue">Illustrator.</span>
            </span>
          </h1>
          <p className="hero-subtitle">
            Fresh, distinct, and thoughtfully executed designer.
          </p>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint">
          <span>Scroll to explore</span>
          <div className="hero-scroll-arrow">↓</div>
        </div>
      </div>
    </div>
  );
}
