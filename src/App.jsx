import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Instagram, Phone, X } from 'lucide-react';

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
  },

  {
    id: 3,
    title: "Rajasthan Beauty Grid",
    tags: ["Social Media", "Layout"],
    color: "var(--color-accent-blue)",
    desc: "High-engagement layouts and carousel designs for Rajasthan Beauty Products.",
  },
  {
    id: 4,
    title: "Folklore Compendium",
    tags: ["Editorial", "Print"],
    color: "var(--color-accent-yellow)",
    desc: "An 80+ page publication combining dense typography with illustrated folklore inserts.",
  },
  {
    id: 5,
    title: "Blondie Hospitality Collateral",
    tags: ["Branding", "Print"],
    color: "var(--color-text)",
    desc: "Menus, coasters, and brand collateral giving a fresh, distinct vibe to Blondie Hospitality.",
  }
];

const experienceItems = [
  {
    role: "Brand Visual Design & Creative Direction",
    company: "Blondie Hospitality",
    date: "2023 - Present",
    desc: "Leading the visual identity, developing scalable brand collateral and guiding art direction for all physical and digital touchpoints."
  },
  {
    role: "Folklore Compendium & Podcast Art",
    company: "CCF India & Parrothouse Podcast",
    date: "2022 - 2023",
    desc: "Illustrated and laid out an 80+ page print compendium. Designed vibrant, bold cover art for the Parrothouse podcast series."
  },
  {
    role: "Web Design & Development Intern",
    company: "Elevate Labs",
    date: "2021 - 2022",
    desc: "Bridged the gap between design and code, contributing to frontend UI implementations with a keen eye for minimalist aesthetics."
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-content"
        >
          <motion.h1 className="hero-title" style={{ y: yBg }}>
            Sanika Kannawar<br />
            <span className="text-red">Designer</span> & <span className="text-blue">Illustrator.</span>
          </motion.h1>
          <p className="hero-subtitle">
            Fresh, distinct, and thoughtfully executed designer.
          </p>
        </motion.div>

        {/* Stickers decoration */}
        <motion.div
          className="sticker"
          style={{
            top: '40%', right: '10%', width: '120px', height: '120px',
            backgroundColor: 'var(--color-accent-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-text)', transform: 'rotate(15deg)'
          }}
          whileHover={{ scale: 1.1, rotate: 0 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        >
          FRESH!
        </motion.div>
        <motion.div
          className="sticker"
          style={{
            top: '60%', left: '15%', width: '100px', height: '100px',
            backgroundColor: 'var(--color-accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#fff', transform: 'rotate(-10deg)', fontSize: '2rem'
          }}
          whileHover={{ scale: 1.1, rotate: 0 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        >
          ✦
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section container" id="about">
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
      </section>

      {/* WORK / PORTFOLIO SECTION */}
      <section className="section container" id="work">
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', textTransform: 'uppercase', borderBottom: '2px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          Selected Works
        </h2>

        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <motion.div
              className="portfolio-card"
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
              <div className="timeline-company">{exp.company}</div>
              <p style={{ color: 'var(--color-text-light)', maxWidth: '600px' }}>{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer className="footer" id="contact">
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
            <a href="mailto:hello@sanika.design" className="sticker-btn">
              <Mail size={20} /> Email Me
            </a>
            <a href="tel:+910000000000" className="sticker-btn">
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                  {selectedProject.images.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
                      style={{ border: '2px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: 'var(--shadow-card)' }}
                    >
                      <img src={img} alt={`${selectedProject.title} ${i + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </motion.div>
                  ))}
                </div>
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
