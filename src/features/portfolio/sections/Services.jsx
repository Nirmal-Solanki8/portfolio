import { Layout, Server, Sparkles } from 'lucide-react'
import { SERVICES } from '@/features/portfolio/data/services'

const ICONS = [Layout, Server, Sparkles]

const Services = () => {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head" data-reveal>
          <h2>What I bring.</h2>
          <p>End-to-end web engineering — from responsive frontends and resilient APIs to clean deployment and performance tuning.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i]
            return (
              <article key={s.title} className="card service-card" data-reveal>
                {Icon ? <Icon size={24} className="service-icon" aria-hidden="true" /> : null}
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
