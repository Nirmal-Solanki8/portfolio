import { useEffect, useRef } from 'react'

/** Attach ref to a container; all `[data-reveal]` descendants get `.visible` when scrolled in. */
export function useRevealRoot() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const els = root.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}
