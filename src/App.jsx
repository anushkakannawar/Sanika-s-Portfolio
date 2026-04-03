import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Instagram, Linkedin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroReveal from './components/HeroReveal';
import HorizontalWork from './components/HorizontalWork';
import SequentialImageReveal from './components/SequentialImageReveal';

const portfolioItems = [

  {
    id: 2,
    title: "Kacchapapad",
    tags: ["Illustration", "Stickers"],
    color: "var(--color-accent-red)",
    desc: "Turning digital art into something you can hold. High-quality, weather-resistant stickers designed to bring a burst of personality to your laptop, water bottle, or workspace. Built for those who love the details.",
    images: ["/stickers/sticker1.jpg", "/stickers/sticker2.jpg", "/stickers/sticker3.jpg", "/stickers/sticker4.jpg", "/stickers/sticker5.jpg", "/stickers/sticker6.jpg", "/stickers/sticker7.jpg", "/stickers/sticker8.jpg"],

  },


  {
    id: 4,
    title: "CCF India",
    tags: ["Editorial", "Print"],
    color: "var(--color-accent-yellow)",
    desc: "A series of 80+ page publications combining dense typography with illustrated folklore inserts. This volume explores various mythical and cultural narratives across different editions.",
    images: ["/vikram/1.png"], // Thumbnail for the gallery
    isFlipbook: true,
    volumes: [
      {
        title: "Vikram & Vetala",
        id: "vikram",
        images: ["/vikram/1.png", "/vikram/2.png", "/vikram/3.png", "/vikram/4.png", "/vikram/5.png", "/vikram/6.png", "/vikram/7.png", "/vikram/8.png", "/vikram/9.png"]
      },
      {
        title: "Female Identity",
        id: "female",
        images: ["/female/1.png", "/female/2.png", "/female/3.png", "/female/4.png", "/female/5.png", "/female/6.png", "/female/7.png", "/female/8.png"]
      },
      {
        title: "Hornbill",
        id: "hornbill",
        images: ["/hornbill/1.png", "/hornbill/2.png", "/hornbill/3.png", "/hornbill/4.png", "/hornbill/5.png", "/hornbill/6.png", "/hornbill/7.png", "/hornbill/8.png", "/hornbill/9.png", "/hornbill/10.png", "/hornbill/12.png"]
      },
      {
        title: "Constitution",
        id: "constitution",
        images: ["/constitution/1.png", "/constitution/2.png", "/constitution/3.png", "/constitution/4.png", "/constitution/5.png", "/constitution/6.png", "/constitution/7.png", "/constitution/8.png", "/constitution/9.png", "/constitution/10.png", "/constitution/11.png", "/constitution/12.png"]
      },
      {
        title: "Final IG",
        id: "finalig",
        images: ["/finalig/1.jpg", "/finalig/2.jpg", "/finalig/3.jpg", "/finalig/4.jpg", "/finalig/5.jpg"]
      },
      {
        title: "Tamil",
        id: "tamil",
        images: ["/tamil/1.png", "/tamil/2.png", "/tamil/3.png", "/tamil/4.png", "/tamil/5.png", "/tamil/6.png", "/tamil/7.png", "/tamil/8.png"]
      },
      {
        title: "Wetland",
        id: "wetland",
        images: ["/wetland/1.png", "/wetland/2.png", "/wetland/3.png", "/wetland/4.png", "/wetland/5.png", "/wetland/6.png", "/wetland/7.png", "/wetland/8.png"]
      },
      {
        title: "Wildlife",
        id: "wildlife",
        images: ["/wildlife/1.png", "/wildlife/2.png", "/wildlife/3.png", "/wildlife/4.png", "/wildlife/5.png", "/wildlife/6.png", "/wildlife/7.png", "/wildlife/8.png", "/wildlife/9.png", "/wildlife/10.png", "/wildlife/11.png", "/wildlife/12.png"]
      }
    ]
  },
  {
    id: 5,
    title: "Blondie Hospitality Collateral",
    tags: ["Branding", "Print"],
    color: "var(--color-text)",
    desc: "Menus, coasters, and brand collateral giving a fresh, distinct vibe to Blondie Hospitality.",
    images: ["/blondie/blondie1.jpg", "/blondie/blondie2.jpg", "/blondie/blondie3.jpg", "/blondie/blondie4.jpg", "/blondie/blondie5.jpg", "/blondie/blondie6.jpg"],
    color: "var(--color-accent-blue)"
  }
];

const experienceItems = [
  {
    id: "blondie",
    role: "Graphic Designer",
    company: "Blondie Hospitality",
    type: "Internship",
    date: "Dec 2025 - Present · 4 mos",
    location: "Mumbai, Maharashtra, India · Remote",
    desc: "Design Intern at Bastian’s Blondie, working on playful and engaging visual creatives for social media, events, and print. Supporting brand storytelling through thoughtful, fun, and feel good designs!!",
    projectId: 5,
    externalLink: "https://www.instagram.com/mumbaiblondie/"
  },
  {
    id: "ccf",
    role: "Illustrator and Visual designer",
    company: "Centre for Contemporary Folklore",
    type: "Internship",
    date: "Aug 2025 - Present · 8 mos",
    location: "New Delhi, Delhi, India · Remote",
    desc: "Visual Design Intern at CCF, creating illustrations and digital designs for social media, websites, and print. Learning on the go, experimenting with visuals, and helping bring stories to life online.",
    projectId: 4,
    externalLink: "https://www.instagram.com/ccf.india/"
  }
];

// Helper for the image placeholders (to be replaced by the user)
const ImagePlaceholder = ({ color, title }) => (
  <div style={{ backgroundColor: color, height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-bg)', padding: '2rem', textAlign: 'center' }}>
    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '700', textTransform: 'uppercase' }}>
      [ Add {title} Image Here ]
    </span>
  </div>
);

function App() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeVolumeIndex, setActiveVolumeIndex] = useState(0);

  // Reset carousel index and volume index when opening a new project
  useEffect(() => {
    setCurrentImageIndex(0);
    setActiveVolumeIndex(0);
  }, [selectedProject]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  return (
    <>
      <div className="grain-overlay" />
      <div className="marquee-container" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="marquee-content" style={{ display: 'flex', gap: '2rem' }}>
          {[...Array(6)].map((_, i) => (
            <span key={i}>AVAILABLE FOR FREELANCE &bull; SANIKA KANNAWAR &bull; </span>
          ))}
        </div>
      </div>

      <nav className="bottom-nav" style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 100, display: 'flex', gap: '0.75rem' }}>
        <a href="#about" className="sticker-btn">About</a>
        <a href="#work" className="sticker-btn">Work</a>
        <a href="#contact" className="sticker-btn">Contact</a>
      </nav>

      {/* HERO SECTION — GSAP Z-axis Parallax Reveal */}
      <HeroReveal />

      {/* ABOUT SECTION */}
      <section className="section container" id="about">
        <div className="about-grid">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            style={{ maxWidth: '800px' }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '2rem', textTransform: 'uppercase' }}>
              A <span className="text-blue">Contemporary Indian</span> Soul in Digital Design.
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-text-light)' }}>
              I am a TY student at Fergusson College with 3+ years of experience blending sharp minimalism with the bold vibrancy of Indian heritage. My workflow is obsessed with efficiency and visual narrative.
            </p>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
              Beyond the screen, I channel my entrepreneurial side through <strong>Kacchapapad</strong>, translating aesthetic visions into tangible sticker culture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-image-container"
          >
            <img src="/sanika/sanikaphoto.jpg" alt="About Sanika" className="about-image" />
            <div className="about-image-frame"></div>
          </motion.div>
        </div>
      </section>

      {/* SEQUENTIAL IMAGE REVEAL */}
      <SequentialImageReveal />

      {/* WORK — GSAP Horizontal Scroll */}
      <HorizontalWork portfolioItems={portfolioItems} onProjectClick={setSelectedProject} />

      {/* EXPERIENCE / TIMELINE */}
      <section className="section container" id="experience">
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', textTransform: 'uppercase', marginBottom: '2rem' }}>
          WORK TIMELINE
        </h2>

        <div className="timeline">
          {experienceItems.map((exp, index) => (
            <motion.div
              className="timeline-item"
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="timeline-date">{exp.date}</div>
              <h3 className="timeline-role">{exp.role}</h3>
              <div className="timeline-company" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <a
                  href={exp.externalLink || `#project-${exp.projectId}`}
                  target={exp.externalLink ? "_blank" : "_self"}
                  rel={exp.externalLink ? "noopener noreferrer" : ""}
                  style={{ textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '4px', color: 'var(--color-accent-blue)' }}
                >
                  {exp.company}
                </a>
                <span style={{ opacity: 0.6 }}>· {exp.type}</span>
              </div>
              <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '1rem' }}>
                {exp.location}
              </div>
              <p style={{ color: 'var(--color-text-light)', maxWidth: '700px' }}>{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer className="footer" id="contact" style={{ paddingBottom: '100px' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.h2
            className="footer-heading"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Let's Make<br />Something <span className="text-yellow">Fresh.</span>
          </motion.h2>

          <div className="footer-links">
            <a href="https://instagram.com/kacchapapad_" target="_blank" rel="noreferrer" className="sticker-btn secondary">
              <Instagram size={20} /> @kacchapapad_
            </a>
            <a href="mailto:kannawarsanika@gmail.com" className="sticker-btn">
              <Mail size={20} /> Email Me
            </a>
            <a href="https://www.linkedin.com/in/sanika-kannawar-242394237/" target="_blank" rel="noreferrer" className="sticker-btn">
              <Linkedin size={20} /> LinkedIn
            </a>
          </div>
        </div>

        <div style={{
          position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '150%',
          backgroundColor: 'var(--color-accent-blue)', borderRadius: '50%', zIndex: 1, opacity: 0.05
        }}></div>
      </footer>

      {/* PROJECT MODAL (NEW SCREEN FOR POSTERS) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'var(--color-bg)',
              zIndex: 1000,
              overflowY: 'auto',
              padding: '1.5rem 0',
              fontFamily: 'var(--font-body)'
            }}
          >
            <div className="container" style={{ position: 'relative', paddingBottom: '4rem' }}>
              <motion.button
                whileHover={{ scale: 1.1, translateY: 2, boxShadow: 'var(--shadow-sticker-hover)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'fixed', top: '2rem', right: '5%',
                  background: 'var(--color-accent-red)', color: 'var(--color-text)',
                  border: '3px solid var(--color-bg)', borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                  width: '50px', height: '50px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 1010, boxShadow: 'var(--shadow-sticker)'
                }}
              >
                <X size={32} strokeWidth={3} />
              </motion.button>

              <motion.h2 layoutId={`title-${selectedProject.id}`} style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', textTransform: 'uppercase', marginBottom: '1rem', marginTop: '2rem', fontFamily: 'var(--font-heading)' }}>
                {selectedProject.title}
              </motion.h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-text)', maxWidth: '800px', marginBottom: '1.5rem', fontWeight: 500 }}>
                {selectedProject.desc}
              </p>

              {/* Volume Selector for Projects with Multiple Volumes */}
              {selectedProject.volumes && (
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                  {selectedProject.volumes.map((vol, idx) => (
                    <button
                      key={vol.id || idx}
                      onClick={() => { setActiveVolumeIndex(idx); setCurrentImageIndex(0); }}
                      className={`sticker-btn ${activeVolumeIndex === idx ? "" : "secondary"}`}
                      style={{
                        padding: '0.6rem 1.2rem',
                        fontSize: '0.9rem',
                        background: activeVolumeIndex === idx ? 'var(--color-accent-yellow)' : 'transparent',
                        color: activeVolumeIndex === idx ? 'var(--color-bg)' : 'var(--color-text)',
                        opacity: activeVolumeIndex === idx ? 1 : 0.7,
                        boxShadow: activeVolumeIndex === idx ? 'var(--shadow-sticker-hover)' : 'var(--shadow-sticker)'
                      }}
                    >
                      {vol.title}
                    </button>
                  ))}
                </div>
              )}

              {(() => {
                // Determine which images to show (single set or active volume)
                const displayImages = selectedProject.volumes
                  ? selectedProject.volumes[activeVolumeIndex].images
                  : selectedProject.images;

                if (!displayImages || displayImages.length === 0) {
                  return (
                    <div style={{ height: '400px', border: '2px dashed var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-text-light)' }}>Images coming soon...</h3>
                    </div>
                  );
                }

                if (selectedProject.isFlipbook) {
                  /* FLIPBOOK VIEW (Realistic 3D) */
                  const leaves = [];
                  for (let i = 0; i < displayImages.length; i += 2) {
                    leaves.push({
                      front: displayImages[i],
                      back: displayImages[i + 1] || null
                    });
                  }

                  const isFirst = currentImageIndex === 0;
                  const isLast = currentImageIndex === leaves.length;

                  return (
                    <div style={{ position: 'relative', width: '100%', margin: '0 auto', height: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <motion.div 
                        initial={false}
                        animate={{ x: isFirst ? '0%' : (isLast ? '100%' : '50%') }}
                        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                        style={{
                          position: 'relative',
                          height: '95%',
                          aspectRatio: '3/4', // Standard robust book aspect ratio per page
                          maxWidth: '45vw', // Ensures two leaves never exceed screen width
                          perspective: '3000px',
                          zIndex: 1
                        }}
                      >

                        {leaves.map((leaf, idx) => {
                          const isFlipped = idx < currentImageIndex;
                          // Subtle z-translation prevents z-fighting while maintaining the stack height hierarchy
                          const zOffset = isFlipped ? idx * 1.5 : (leaves.length - idx) * 1.5;

                          return (
                            <motion.div
                              key={idx}
                              initial={false}
                              animate={{ 
                                rotateY: isFlipped ? -180 : 0, 
                                zIndex: isFlipped ? idx : leaves.length - idx,
                                z: zOffset
                              }}
                              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                transformOrigin: 'left center', // pivot exactly down the spine edge
                                transformStyle: 'preserve-3d',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                // If clicking the right side (unflipped), flip it to next. Otherwise flip it back.
                                if (!isFlipped) setCurrentImageIndex(idx + 1);
                                else setCurrentImageIndex(idx);
                              }}
                            >
                              {/* FRONT OF LEAF (Right side of open book) */}
                              <div style={{
                                position: 'absolute',
                                inset: 0,
                                backfaceVisibility: 'hidden',
                                backgroundColor: '#F4F1EA',
                                borderRadius: '0 8px 8px 0',
                                boxShadow: isFlipped ? 'none' : 'inset 15px 0 20px -10px rgba(0,0,0,0.1), 5px 5px 15px rgba(0,0,0,0.1)',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderLeft: '1px solid rgba(0,0,0,0.05)'
                              }}>
                                {/* Inner binding lighting gradient */}
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 8%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.2) 100%)', zIndex: 2, pointerEvents: 'none' }} />
                                <img src={leaf.front} alt={`Page front`} style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 1 }} />
                              </div>

                              {/* BACK OF LEAF (Left side of open book once flipped) */}
                              <div style={{
                                position: 'absolute',
                                inset: 0,
                                backfaceVisibility: 'hidden',
                                backgroundColor: '#F4F1EA',
                                borderRadius: '0 8px 8px 0', 
                                boxShadow: isFlipped ? 'inset 15px 0 20px -10px rgba(0,0,0,0.1), 5px 5px 15px rgba(0,0,0,0.1)' : 'none',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: 'rotateY(180deg)',
                                borderLeft: '1px solid rgba(0,0,0,0.05)'
                              }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 8%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.2) 100%)', zIndex: 2, pointerEvents: 'none' }} />
                                {leaf.back ? (
                                  <img src={leaf.back} alt={`Page back`} style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 1 }} />
                                ) : (
                                  <div style={{ width: '100%', height: '100%', background: '#E0DFD5' }} /> // Empty back cover
                                )}
                              </div>
                            </motion.div>
                          );
                        })}

                        {/* HARDCOVER SPINE AND BINDING VISUALS (Static anchor) */}
                        <motion.div
                          animate={{ opacity: isFirst || isLast ? 0 : 1 }}
                          transition={{ duration: 0.4 }}
                          style={{
                            position: 'absolute',
                            top: '2%',
                            bottom: '2%',
                            left: '-12px',
                            width: '24px',
                            backgroundColor: '#DCDBCF',
                            borderRadius: '12px',
                            zIndex: -1,
                            boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.1), inset 2px 0 5px rgba(0,0,0,0.1), 0 0 20px rgba(0,0,0,0.15)',
                            transform: 'translateZ(-5px)'
                          }} 
                        />
                      </motion.div>

                      <div style={{ position: 'absolute', bottom: '-4.5rem', left: '50%', transform: 'translateX(-50%)', fontWeight: 700, opacity: 0.6, fontSize: '1.1rem', letterSpacing: '0.1em', whiteSpace: 'nowrap', textAlign: 'center' }}>
                        {selectedProject.volumes && <div style={{ fontSize: '0.8rem', marginBottom: '0.3rem', color: 'var(--color-accent-yellow)' }}>{selectedProject.volumes[activeVolumeIndex].title.toUpperCase()}</div>}
                        FLIP {currentImageIndex} / {leaves.length}
                      </div>

                      <button
                        onClick={() => setCurrentImageIndex((prev) => Math.max(prev - 1, 0))}
                        style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'var(--color-accent-yellow)', borderRadius: '50%', border: 'none', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-bg)', boxShadow: 'var(--shadow-sticker)', zIndex: 10, opacity: currentImageIndex === 0 ? 0.3 : 1 }}
                        disabled={currentImageIndex === 0}
                      >
                        <ChevronLeft size={32} />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => Math.min(prev + 1, leaves.length))}
                        style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'var(--color-accent-yellow)', borderRadius: '50%', border: 'none', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-bg)', boxShadow: 'var(--shadow-sticker)', zIndex: 10, opacity: currentImageIndex === leaves.length ? 0.3 : 1 }}
                        disabled={currentImageIndex === leaves.length}
                      >
                        <ChevronRight size={32} />
                      </button>
                    </div>
                  );
                }

                if (selectedProject.isCarousel) {
                  /* CAROUSEL VIEW */
                  return (
                    <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <img
                            src={displayImages[currentImageIndex]}
                            alt={`${selectedProject.title} ${currentImageIndex + 1}`}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', boxShadow: 'var(--shadow-card)', borderRadius: '12px' }}
                          />
                        </motion.div>
                      </AnimatePresence>

                      <div style={{ position: 'absolute', bottom: '-3rem', left: '50%', transform: 'translateX(-50%)', fontWeight: 700, opacity: 0.6 }}>
                        {currentImageIndex + 1} / {displayImages.length}
                      </div>

                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))}
                        style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)', zIndex: 10 }}
                      >
                        <ChevronLeft size={48} />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))}
                        style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)', zIndex: 10 }}
                      >
                        <ChevronRight size={48} />
                      </button>
                    </div>
                  );
                }

                /* GRID VIEW (Default) */
                return (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '1rem'
                  }}>
                    {displayImages.map((img, i) => (
                      <motion.div
                        key={i}
                        className="lively-image-container"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
                      >
                        <img src={img} alt={`${selectedProject.title} ${i + 1}`} className="lively-image" />
                      </motion.div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
