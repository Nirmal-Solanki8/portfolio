import { useEffect, useState } from 'react'
import { ThemeContext } from '@/context/theme-context'

function getSystemTheme() {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getSystemTheme)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const updateTheme = () => {
      const current = mediaQuery.matches ? 'dark' : 'light'
      setTheme(current)
      document.documentElement.dataset.theme = current
    }

    updateTheme()

    mediaQuery.addEventListener('change', updateTheme)
    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [])

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
}
