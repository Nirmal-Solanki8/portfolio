import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/context/ThemeProvider'
import '@/styles/index.css'
import '@/styles/pages/shared.css'
import '@/styles/pages/hero.css'
import '@/styles/pages/work.css'
import '@/styles/pages/about.css'
import '@/styles/pages/services.css'
import '@/styles/pages/skills.css'
import '@/styles/pages/contact.css'
import '@/styles/pages/footer.css'
import App from '@/app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
