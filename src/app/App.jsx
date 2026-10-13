import { useEffect } from 'react'
import { useRevealRoot } from '@/hooks/useReveal'
import { SITE } from '@/constants/site'
import SkipLink from '@/components/layout/SkipLink'
import Header from '@/components/layout/Header/Header'
import GridBackground from '@/components/effects/GridBackground'
import { About, Contact, Footer, Hero, Services, Skills, Work } from '@/features/portfolio'

function App() {
  const mainRef = useRevealRoot()

  useEffect(() => {
    document.title = SITE.title
  }, [])

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="app">
      <SkipLink />
      <GridBackground />
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
