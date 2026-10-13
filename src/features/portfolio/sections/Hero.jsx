import { useState } from 'react'
import { Send } from 'lucide-react'
import { PROFILE_IMAGE_FALLBACK, PROFILE_IMAGE_SRC, SITE } from '@/constants/site'
import { scrollToHash } from '@/lib/scrollToAnchor'

const Hero = () => {
  const [imgSrc, setImgSrc] = useState(PROFILE_IMAGE_SRC)

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <svg className="hero-orbit" viewBox="0 0 600 320" fill="none" aria-hidden="true">
        <path className="hero-orbit__path-1" d="M30 250C150 90 340 20 570 78" />
        <path className="hero-orbit__path-2" d="M6 286C170 110 372 60 594 122" />
        <circle className="hero-orbit__dot" cx="118" cy="210" r="6" />
      </svg>
      <svg className="hero-wave" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
        <path className="hero-wave__path" d="M0 90C220 180 440 0 720 82C960 156 1180 36 1440 94V180H0Z" />
      </svg>
      <div className="container hero-grid">
        <article className="hero-shell">
          <div className="hero-copy">
            <p className="hero-badge" role="group" aria-label="Role and availability">
              <span className="hero-badge__dot" aria-hidden="true" />
              <span className="hero-badge__role">{SITE.role}</span>
              <span className="hero-badge__divider" aria-hidden="true" />
              <span className="hero-badge__status">Open to opportunities</span>
            </p>
            <h1 id="hero-title" className="hero-title">
              <span className="hero-title__prefix">Designing and building</span>{' '}
              <span className="hero-title__accent">modern, fast web experiences.</span>
            </h1>
            <p className="hero-lead">{SITE.heroLead}</p>
            <p className="hero-stack">{SITE.heroStack}</p>
            <div className="hero-actions">
              <a
                className="button button--primary"
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHash('#work')
                }}
              >
                See my work
              </a>
              <a className="button button--secondary" href={SITE.resume} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
              <a
                className="button button--ghost hero-cta-talk"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHash('#contact')
                }}
              >
                Let&apos;s talk
                <Send className="hero-cta-talk__icon" size={17} strokeWidth={2} aria-hidden />
              </a>
            </div>
            <div className="stats-row">
              <div className="stat">
                <strong>04+</strong>
                <span>Production-grade projects</span>
              </div>
              <div className="stat">
                <strong>Full-stack</strong>
                <span>Frontend + backend integration</span>
              </div>
            </div>
          </div>

          <aside className="hero-side">
            <div className="profile-card" aria-label="Profile photo">
              <div className="photo-frame">
                <img
                  src={imgSrc}
                  alt={`${SITE.name} — portrait`}
                  width={400}
                  height={600}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={() => setImgSrc(PROFILE_IMAGE_FALLBACK)}
                />
              </div>
            </div>
          </aside>
        </article>
      </div>
    </section>
  )
}

export default Hero
