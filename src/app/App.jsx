import { useEffect, useState } from 'react'
import { useRevealRoot } from '@/hooks/useReveal'
import { SITE } from '@/constants/site'
import SkipLink from '@/components/layout/SkipLink'
import Header from '@/components/layout/Header/Header'
import { About, Contact, Footer, Hero, Services, Skills, Work } from '@/features/portfolio'

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
