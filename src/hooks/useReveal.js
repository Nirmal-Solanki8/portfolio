import { useEffect, useRef } from 'react'

/** Attach ref to a container; all `[data-reveal]` descendants get `.visible` when scrolled near. */
export function useRevealRoot() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    // Immediate reveal if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '120px 0px 40px 0px' },
    )

    const observeElements = () => {
      const els = root.querySelectorAll('[data-reveal]:not(.visible)')
      const vh = window.innerHeight || document.documentElement.clientHeight || 800
      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < vh + 100 && rect.bottom > -50) {
          el.classList.add('visible')
        } else {
          observer.observe(el)
        }
      })
    }

    observeElements()

    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(root, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return ref
}
