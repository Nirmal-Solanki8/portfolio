import { useEffect, useState } from 'react'
import { useRevealRoot } from '@/hooks/useReveal'
import { SITE } from '@/constants/site'
import SkipLink from '@/components/layout/SkipLink'
import Header from '@/components/layout/Header/Header'
import { About, Contact, Footer, Hero, Services, Skills, Work } from '@/features/portfolio'
import { scrollToHash } from '@/lib/scrollToAnchor'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const mainRef = useRevealRoot()

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsLoaded(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    document.title = SITE.title
  }, [])

  useEffect(() => {
    const { hash } = window.location
    if (!hash || hash === '#') return
    const run = () => scrollToHash(hash, { updateHistory: false, behavior: 'auto' })
    requestAnimationFrame(() => requestAnimationFrame(run))
  }, [])

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <SkipLink />
      <Header />

      <main ref={mainRef} id="content" className="site-main">
        <Hero />
        <Skills />
        <Work />
        <About />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
