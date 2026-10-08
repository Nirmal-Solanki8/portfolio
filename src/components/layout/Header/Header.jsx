import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '@/constants/nav'
import { SITE } from '@/constants/site'
import BrandMark from '@/components/layout/BrandMark'
import { scrollToHash } from '@/lib/scrollToAnchor'
import './Header.css'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState('')
  const navRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen)
    return () => document.body.classList.remove('nav-open')
  }, [isOpen])

  const clickLockRef = useRef(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPastThreshold = window.scrollY > 10
          setScrolled((prev) => (prev !== isPastThreshold ? isPastThreshold : prev))

          if (Date.now() >= clickLockRef.current && window.scrollY < 120) {
            setActiveHash((prev) => (prev !== '' ? '' : prev))
          }
          ticking = false
        })
        ticking = true
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClickOutside)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const sectionEls = NAV_LINKS.map((item) => document.getElementById(item.hash)).filter(Boolean)
    if (sectionEls.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < clickLockRef.current) return
        if (window.scrollY < 120) {
          setActiveHash((prev) => (prev !== '' ? '' : prev))
          return
        }

        const visible = entries.find((e) => e.isIntersecting)
        if (visible) {
          setActiveHash((prev) => (prev !== visible.target.id ? visible.target.id : prev))
        }
      },
      {
        rootMargin: '-15% 0px -45% 0px',
        threshold: 0,
      },
    )

    sectionEls.forEach((el) => observer.observe(el))

    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (NAV_LINKS.some((n) => n.hash === hash)) {
        setActiveHash(hash)
      }
    }

    window.addEventListener('hashchange', onHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  const go = (e, hash) => {
    e.preventDefault()
    scrollToHash(hash)
    const id = hash.replace('#', '')
    if (id && id !== 'top') {
      setActiveHash(id)
      clickLockRef.current = Date.now() + 850
    } else {
      setActiveHash('')
      clickLockRef.current = Date.now() + 850
    }
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
            <a
              key={item.hash}
              href={`#${item.hash}`}
              className={activeHash === item.hash ? 'is-active' : undefined}
              aria-current={activeHash === item.hash ? 'location' : undefined}
              onClick={(e) => go(e, `#${item.hash}`)}
            >
              {item.label}
            </a>
          ))}
          <div className="site-header__nav-extra">
            <a className="button button--secondary" href="#contact" onClick={(e) => go(e, '#contact')}>
              Hire me
            </a>
            <a className="button button--ghost" href={SITE.resume} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
              Resume
            </a>
          </div>
        </nav>

        <div className="site-header__actions">
          <a className="button button--primary site-header__hire" href="#contact" onClick={(e) => go(e, '#contact')}>
            Hire me
          </a>
          <a className="button button--secondary site-header__resume" href={SITE.resume} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
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

export default Header
