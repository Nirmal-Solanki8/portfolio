/** @returns {'auto' | 'smooth'} */
export function getScrollBehavior() {
  if (typeof window === 'undefined') return 'auto'
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

/**
 * @param {string} hash - e.g. `#work` or `work`
 * @param {{ updateHistory?: boolean; behavior?: ScrollBehavior }} | undefined} options
 */
export function scrollToHash(hash, options = {}) {
  if (!hash || hash === '#') return
  const normalized = hash.startsWith('#') ? hash : `#${hash}`
  const { updateHistory = true, behavior } = options
  const scrollBehavior = behavior ?? getScrollBehavior()

  if (normalized === '#top') {
    window.scrollTo({ top: 0, behavior: scrollBehavior })
    if (updateHistory) {
      const path = `${window.location.pathname}${window.location.search}`
      window.history.pushState(null, '', path)
    }
    return
  }

  const id = normalized.slice(1)
  const el = document.getElementById(id)
  if (!el) return

  el.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
  if (updateHistory) {
    window.history.pushState(null, '', normalized)
  }
}
