import { useState } from 'react'
import { PROFILE_IMAGE_FALLBACK, PROFILE_IMAGE_SRC, SITE } from '@/constants/site'
import { scrollToHash } from '@/lib/scrollToAnchor'

const Hero = () => {
  const [imgSrc, setImgSrc] = useState(PROFILE_IMAGE_SRC)

  return (
    <section className="hero" aria-labelledby="hero-title">
      <svg className="hero-orbit" viewBox="0 0 600 320" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="heroOrbitStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--color-blue)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d="M30 250C150 90 340 20 570 78" stroke="url(#heroOrbitStroke)" strokeWidth="1.4" />
        <path d="M6 286C170 110 372 60 594 122" stroke="url(#heroOrbitStroke)" strokeWidth="0.8" />
        <circle cx="118" cy="210" r="6.5" fill="var(--color-primary)" fillOpacity="0.35" />
      </svg>
      <svg className="hero-wave" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 90C220 180 440 0 720 82C960 156 1180 36 1440 94V180H0Z" fill="var(--color-primary-soft)" />
      </svg>
      <div className="container hero-grid">
        <article className="hero-shell" data-reveal>
          <div className="hero-copy">
            <div className="hero-topline">
              <span className="eyebrow">{SITE.role}</span>
              <span className="hero-status">Open to opportunities</span>
            </div>
            <h1 id="hero-title">{SITE.heroHeadline}</h1>
            <p className="hero-lead">{SITE.heroLead}</p>
            <div className="hero-stack">React - Node.js - Express - MongoDB</div>
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
                className="button button--ghost"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHash('#contact')
                }}
              >
                Let&apos;s talk
              </a>
            </div>
            <div className="stats-row">
              <div className="stat">
                <strong>03+</strong>
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
                  width={640}
                  height={800}
                  loading="eager"
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
