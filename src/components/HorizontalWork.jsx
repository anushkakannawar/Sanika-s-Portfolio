import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalWork({ portfolioItems, onProjectClick }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    const panels = gsap.utils.toArray('.hw-panel');

    if (!panels.length) return;

    // Dynamically calculate scroll distance for responsive resizing
    const getTotalWidth = () => trackRef.current.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: () => -getTotalWidth(),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: true, 
        end: () => `+=${getTotalWidth() * 1.5}`, 
        invalidateOnRefresh: true,
      },
    });

    // Animate each panel's content as it enters viewport
    panels.forEach((panel) => {
      const img = panel.querySelector('.portfolio-image img');
      const content = panel.querySelector('.portfolio-card-content');

      if (img) {
        gsap.fromTo(img,
          { scale: 1.15, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none', // Smooth linear scrub
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      }

      if (content) {
        gsap.fromTo(content,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 85%',
              end: 'left 45%',
              scrub: true,
            },
          }
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section className="hw-section" id="work" ref={sectionRef}>
      <div className="hw-track" ref={trackRef}>
        {/* Title panel */}
        <div className="hw-panel hw-panel-intro">
          <div className="hw-panel-content">
            <h2 className="hw-title">MY WORK</h2>
            <p className="hw-subtitle">
              Scroll to explore selected projects →
            </p>
          </div>
        </div>

        {/* Project panels */}
        {portfolioItems.map((item) => (
          <div
            className="hw-panel" /* Keep hw-panel for GSAP array selector */
            key={item.id}
            id={`project-${item.id}`}
            onClick={() => onProjectClick(item)}
            style={{ cursor: 'pointer', width: 'clamp(300px, 25vw, 400px)' }}
          >
            <div className="portfolio-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="portfolio-image">
                {item.images && item.images[0] ? (
                  <img src={item.images[0]} alt={item.title} draggable={false} />
                ) : (
                  <div className="hw-panel-placeholder" style={{ backgroundColor: item.color }} />
                )}
              </div>
              <div className="portfolio-card-content" style={{ flex: 1 }}>
                <h3 className="portfolio-card-title">{item.title}</h3>
                <div className="portfolio-card-tags">
                  {item.tags.map(tag => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <p className="hw-panel-desc" style={{ color: 'var(--color-bg)', opacity: 0.8 }}>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
