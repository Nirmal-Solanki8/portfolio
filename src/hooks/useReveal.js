import { useEffect, useRef } from 'react'

/** Attach ref to a container; all `[data-reveal]` descendants get `.visible` when scrolled in. */
export function useRevealRoot() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

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

    const observeAll = () => {
      const els = root.querySelectorAll('[data-reveal]:not(.visible)')
      els.forEach((el) => observer.observe(el))
    }

    observeAll()

    let scheduled = false
    const mutationObserver = new MutationObserver(() => {
      if (!scheduled) {
        scheduled = true
        requestAnimationFrame(() => {
          observeAll()
          scheduled = false
        })
      }
    })

    mutationObserver.observe(root, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return ref
}
