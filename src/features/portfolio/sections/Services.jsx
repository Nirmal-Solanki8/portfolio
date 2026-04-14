import { SERVICES } from '@/features/portfolio/data/services'

const Icons = [
  <svg key="1" className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6h16M4 12h16M4 18h10" />
  </svg>,
  <svg key="2" className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18M9 20V10" />
  </svg>,
  <svg key="3" className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v18M3 12h18" />
    <circle cx="12" cy="12" r="8" />
  </svg>,
]

const Services = () => {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head" data-reveal>
          <h2>What I bring.</h2>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <article key={s.title} className="card service-card" data-reveal>
              {Icons[i] ?? null}
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
