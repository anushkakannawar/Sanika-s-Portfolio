import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// 8 images in the given folder
const scrollImages = Array.from({ length: 8 }, (_, i) => `/sanika scrol/pic ${i + 1}.jpg`);

// Subtle random-looking destinations for the collage stack
const stackDestinations = [
  { x: '-2%', y: '-5%', rotation: -4 },
  { x: '5%', y: '8%', rotation: 6 },
  { x: '-8%', y: '12%', rotation: -8 },
  { x: '8%', y: '-6%', rotation: 4 },
  { x: '-6%', y: '-10%', rotation: 7 },
  { x: '4%', y: '15%', rotation: -5 },
  { x: '-10%', y: '4%', rotation: 3 },
  { x: '6%', y: '-4%', rotation: -2 },
];

export default function SequentialImageReveal() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const images = gsap.utils.toArray('.seq-reveal-image');

    if (images.length === 0) return;

    // Create the sequential timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=600%', // extended to give PLENTY of scrolling room
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // 1. First, gently animate the title into view as user scrolls
    tl.fromTo('.seq-reveal-title-container', 
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power2.out' },
      0
    );

    // 2. Add a dummy hold duration of 3 to let the text linger visibly
    tl.to({}, { duration: 3 }, 2);

    // 3. Mark the visual start of the images at time 5
    tl.addLabel("images-start", 5);

    // 4. Stagger the images in over the remaining scroll space
    images.forEach((img, i) => {
      tl.fromTo(img, 
        {
          y: '150vh',
          opacity: 0,
          scale: 0.7,
          rotation: () => gsap.utils.random(-25, 25)
        },
        {
          y: stackDestinations[i].y,
          x: stackDestinations[i].x,
          rotation: stackDestinations[i].rotation,
          opacity: 1,
          scale: 1,
          duration: 2.5,
          ease: 'power2.out',
        }, 
        `images-start+=${i * 1.2}`
      ); 
    });

  }, { scope: containerRef });

  return (
    <section className="seq-reveal-wrapper" ref={containerRef}>
      <div className="seq-reveal-sticky">
        
        <div className="seq-reveal-title-container">
          <h2 className="seq-reveal-title">A Cascade of <br/><span className="text-yellow">Visions</span></h2>
          <p className="seq-reveal-subtitle">Watch the pieces fall into place.</p>
        </div>

        <div className="seq-reveal-images">
          {scrollImages.map((src, i) => (
            <div className="seq-reveal-image" key={i} style={{ zIndex: i + 10 }}>
              <img src={src} alt={`Collage piece ${i + 1}`} draggable={false} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
