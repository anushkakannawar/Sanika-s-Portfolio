import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Instagram, Phone, X, ChevronLeft, ChevronRight } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: "Poster Design",
    tags: ["Illustration", "Vector Art"],
    color: "var(--color-accent-red)",
    desc: "High-quality prints featuring bold typography and modern aesthetics. Elevate your space with intentional art.",
    images: ["/posters/poster1.jpg", "/posters/poster2.jpg", "/posters/poster3.jpg", "/posters/poster4.jpg", "/posters/poster5.jpg", "/posters/poster6.jpg", "/posters/poster7.jpg", "/posters/poster8.jpg", "/posters/poster9.jpg", "/posters/poster10.jpg"],
  },

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
    title: "Folklore Compendium",
    tags: ["Editorial", "Print"],
    color: "var(--color-accent-yellow)",
    desc: "An 80+ page publication combining dense typography with illustrated folklore inserts.",
    images: ["/vikram/1.png", "/vikram/2.png", "/vikram/3.png", "/vikram/4.png", "/vikram/5.png", "/vikram/6.png", "/vikram/7.png", "/vikram/8.png", "/vikram/9.png"],
    isFlipbook: true
  },
  {
    id: 5,
    title: "Blondie Hospitality Collateral",
    tags: ["Branding", "Print"],
    color: "var(--color-text)",
    desc: "Menus, coasters, and brand collateral giving a fresh, distinct vibe to Blondie Hospitality.",
    images: ["/blondie/blondie1.jpg", "/blondie/blondie2.jpg", "/blondie/blondie3.jpg", "/blondie/blondie4.jpg", "/blondie/blondie5.jpg", "/blondie/blondie6.jpg", "/blondie/blondie7.jpg", "/blondie/blondie8.jpg"],

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
    projectId: 5
  },
  {
    id: "ccf",
    role: "Illustrator and Visual designer",
    company: "Centre for Contemporary Folklore",
    type: "Internship",
    date: "Aug 2025 - Present · 8 mos",
    location: "New Delhi, Delhi, India · Remote",
    desc: "Visual Design Intern at CCF, creating illustrations and digital designs for social media, websites, and print. Learning on the go, experimenting with visuals, and helping bring stories to life online.",
    projectId: 4
  }
];

// Helper for the image placeholders (to be replaced by the user)
const ImagePlaceholder = ({ color, title }) => (
  <div style={{ backgroundColor: color, height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '2rem', textAlign: 'center' }}>
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

  // Reset carousel index when opening a new project
  useEffect(() => {
    setCurrentImageIndex(0);
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
      <div className="marquee-container" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="marquee-content" style={{ display: 'flex', gap: '2rem' }}>
          {[...Array(6)].map((_, i) => (
            <span key={i}>AVAILABLE FOR FREELANCE &bull; SANIKA KANNAWAR &bull; </span>
          ))}
        </div>
      </div>

      <nav style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 100, display: 'flex', gap: '1rem' }}>
        <a href="#about" className="sticker-btn">About</a>
        <a href="#work" className="sticker-btn">Work</a>
        <a href="#contact" className="sticker-btn primary">Hire Me <ArrowRight size={16} /></a>
      </nav>

      {/* HERO SECTION */}
      <section className="section hero container" id="home">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-text"
        >
          <motion.h1 className="hero-title" style={{ y: yBg }}>
            <span className="hero-title-name">Sanika</span>
            <span className="hero-title-name">Kannawar</span>
            <span className="hero-title-tagline">
              <span className="text-red">Designer</span> & <span className="text-blue">Illustrator.</span>
            </span>
          </motion.h1>
          <p className="hero-subtitle">
            Fresh, distinct, and thoughtfully executed designer.
          </p>
        </motion.div>

        <motion.div
          className="sticker"
          style={{
            top: '5%', left: '2%', width: '80px', height: '80px',
            backgroundColor: 'var(--color-accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#fff', transform: 'rotate(-10deg)', fontSize: '1.5rem'
          }}
          whileHover={{ scale: 1.2, rotate: 0 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        >
          ✦
        </motion.div>
      </section>

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

      {/* WORK / PORTFOLIO SECTION */}
      <section className="section container" id="work">
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', textTransform: 'uppercase', borderBottom: '2px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          MY WORK
        </h2>

        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <motion.div
              className="portfolio-card"
              id={`project-${item.id}`}
              key={item.id}
              layoutId={`project-${item.id}`}
              onClick={() => setSelectedProject(item)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{ cursor: 'pointer' }}
            >
              <div className="portfolio-image">
                {/* 
                  TODO: Replace the ImagePlaceholder below with your actual img tags when ready!
                  Example: 
                  <img src="/posters/mythological-poster.jpg" alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                */}
                {item.images ? (
                  <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <ImagePlaceholder color={item.color} title={item.title} />
                )}
              </div>
              <div className="portfolio-card-content">
                <motion.h3 className="portfolio-card-title" layoutId={`title-${item.id}`}>{item.title}</motion.h3>
                <div className="portfolio-card-tags">
                  {item.tags.map(tag => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE / TIMELINE */}
      <section className="section container" id="experience">
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', textTransform: 'uppercase', marginBottom: '2rem' }}>
          Experience
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
                <a href={`#project-${exp.projectId}`} style={{ textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '4px', color: 'var(--color-accent-blue)' }}>
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
      <footer className="footer" id="contact" style={{ paddingBottom: '120px' }}>
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
            <a href="tel:+919552281805" className="sticker-btn">
              <Phone size={20} /> Let's Talk
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
              padding: '2rem 0',
              fontFamily: 'var(--font-body)'
            }}
          >
            <div className="container" style={{ position: 'relative' }}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'fixed', top: '2rem', right: '5%',
                  background: 'var(--color-accent-red)', color: 'white',
                  border: '2px solid var(--color-border)', borderRadius: '50%',
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
              <p style={{ fontSize: '1.2rem', color: 'var(--color-text)', maxWidth: '800px', marginBottom: '3rem', fontWeight: 500 }}>
                {selectedProject.desc}
              </p>

              {selectedProject.images && selectedProject.images.length > 0 ? (
                selectedProject.isFlipbook ? (
                  /* FLIPBOOK VIEW */
                  (() => {
                    // Group images into spreads: [1], [2,3], [4,5], etc.
                    const spreads = [[selectedProject.images[0]]];
                    for (let i = 1; i < selectedProject.images.length; i += 2) {
                      spreads.push(selectedProject.images.slice(i, i + 2));
                    }
                    
                    return (
                      <div style={{ position: 'relative', width: '95%', maxWidth: spreads[currentImageIndex].length > 1 ? '1200px' : '600px', margin: '0 auto', height: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'max-width 0.5s ease' }}>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentImageIndex}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              display: 'flex', 
                              gap: '2px', 
                              backgroundColor: spreads[currentImageIndex].length > 1 ? 'rgba(0,0,0,0.1)' : 'transparent',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              boxShadow: spreads[currentImageIndex].length > 1 ? '0 30px 60px rgba(0,0,0,0.4)' : 'none',
                              perspective: '2000px'
                            }}
                          >
                            {spreads[currentImageIndex].map((img, idx) => (
                              <motion.div 
                                key={`${currentImageIndex}-${idx}`}
                                initial={idx === 1 ? { rotateY: 90 } : { opacity: 0 }}
                                animate={idx === 1 ? { rotateY: 0 } : { opacity: 1 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                style={{ 
                                  flex: 1, 
                                  height: '100%', 
                                  position: 'relative',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  boxShadow: spreads[currentImageIndex].length > 1 
                                    ? (idx === 0 ? 'inset -15px 0 30px rgba(0,0,0,0.2)' : 'inset 15px 0 30px rgba(0,0,0,0.2)') 
                                    : 'none',
                                  borderRadius: spreads[currentImageIndex].length > 1 
                                    ? (idx === 0 ? '12px 0 0 12px' : '0 12px 12px 0') 
                                    : '12px',
                                  overflow: 'hidden',
                                  transformOrigin: idx === 1 ? 'left' : 'center', /* Pivot from the spine for the right page */
                                  zIndex: idx === 1 ? 5 : 1
                                }}
                              >
                                <img 
                                  src={img} 
                                  alt={`${selectedProject.title} ${currentImageIndex}-${idx}`} 
                                  style={{ width: '100%', height: '100%', objectFit: spreads[currentImageIndex].length > 1 ? 'cover' : 'contain', display: 'block' }} 
                                />
                                {/* Spine Shadow overlay */}
                                {spreads[currentImageIndex].length > 1 && (
                                  <div style={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    bottom: 0, 
                                    width: '40px', 
                                    background: idx === 0 
                                      ? 'linear-gradient(to right, transparent, rgba(0,0,0,0.3))' 
                                      : 'linear-gradient(to left, transparent, rgba(0,0,0,0.3))',
                                    left: idx === 0 ? 'auto' : 0,
                                    right: idx === 0 ? 0 : 'auto',
                                    zIndex: 2
                                  }} />
                                )}
                              </motion.div>
                            ))}
                          </motion.div>
                        </AnimatePresence>

                        {/* Pagination */}
                        <div style={{ position: 'absolute', bottom: '-4rem', left: '50%', transform: 'translateX(-50%)', fontWeight: 700, opacity: 0.6, fontSize: '1.1rem', letterSpacing: '0.1em' }}>
                          SPREAD {currentImageIndex + 1} / {spreads.length}
                        </div>

                        {/* Arrows */}
                        <button 
                          onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? spreads.length - 1 : prev - 1))}
                          style={{ position: 'absolute', left: '-5rem', top: '50%', transform: 'translateY(-50%)', background: 'var(--color-accent-blue)', borderRadius: '50%', border: 'none', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', boxShadow: 'var(--shadow-sticker)' }}
                        >
                          <ChevronLeft size={32} />
                        </button>
                        <button 
                          onClick={() => setCurrentImageIndex((prev) => (prev === spreads.length - 1 ? 0 : prev + 1))}
                          style={{ position: 'absolute', right: '-5rem', top: '50%', transform: 'translateY(-50%)', background: 'var(--color-accent-blue)', borderRadius: '50%', border: 'none', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', boxShadow: 'var(--shadow-sticker)' }}
                        >
                          <ChevronRight size={32} />
                        </button>
                      </div>
                    );
                  })()
                ) : selectedProject.isCarousel ? (
                  /* CAROUSEL VIEW */
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
                          src={selectedProject.images[currentImageIndex]} 
                          alt={`${selectedProject.title} ${currentImageIndex + 1}`} 
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', boxShadow: 'var(--shadow-card)', borderRadius: '12px' }} 
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Pagination Info */}
                    <div style={{ position: 'absolute', bottom: '-3rem', left: '50%', transform: 'translateX(-50%)', fontWeight: 700, opacity: 0.6 }}>
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </div>

                    {/* Navigation Buttons */}
                    <button 
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))}
                      style={{ position: 'absolute', left: '-4rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }}
                    >
                      <ChevronLeft size={48} />
                    </button>
                    <button 
                      onClick={() => setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))}
                      style={{ position: 'absolute', right: '-4rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }}
                    >
                      <ChevronRight size={48} />
                    </button>
                  </div>
                ) : (
                  /* GRID VIEW (Default) */
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '1rem'
                  }}>
                    {selectedProject.images.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
                        style={{
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          maxHeight: '450px'
                        }}
                      >
                        <img src={img} alt={`${selectedProject.title} ${i + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', borderRadius: '8px' }} />
                      </motion.div>
                    ))}
                  </div>
                )
              ) : (
                <div style={{ height: '400px', border: '2px dashed var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-text-light)' }}>Images coming soon...</h3>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
