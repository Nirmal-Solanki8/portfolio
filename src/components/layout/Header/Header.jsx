import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '@/constants/nav'
import { SITE } from '@/constants/site'
import { useTheme } from '@/context/useTheme'
import BrandMark from '@/components/layout/BrandMark'
import './Header.css'

const Header = () => {
  const { theme, toggle } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen)
    return () => document.body.classList.remove('nav-open')
  }, [isOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const go = (e, hash) => {
    e.preventDefault()
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsOpen(false)
  }

  const toggleMenu = () => setIsOpen((v) => !v)

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`} id="top">
      <div className="container site-header__inner" ref={navRef}>
        <a href="#top" className="site-brand" onClick={(e) => go(e, '#top')} aria-label={`${SITE.name} — home`}>
          <span className="site-brand__mark" aria-hidden="true">
            <BrandMark />
          </span>
          <span className="site-brand__name">{SITE.name}</span>
        </a>

        <nav
          className={`site-header__nav ${isOpen ? 'is-open' : ''}`}
          id="site-menu"
          aria-label="Primary"
        >
          {NAV_LINKS.map((item) => (
            <a key={item.hash} href={`#${item.hash}`} onClick={(e) => go(e, `#${item.hash}`)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="button button--secondary site-header__hire" href="#contact" onClick={(e) => go(e, '#contact')}>
            Hire me
          </a>
          <a className="button button--ghost site-header__resume" href={SITE.resume} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMenu}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

function IconSun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default Header
