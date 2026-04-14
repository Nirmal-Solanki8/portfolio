import { SITE } from '@/constants/site'

const STEPS = [
  {
    title: 'Understand the product',
    body: 'User flows, information hierarchy, and constraints before pixels.',
  },
  {
    title: 'Build the system',
    body: 'Reusable UI, solid API boundaries, and code that teammates can extend.',
  },
  {
    title: 'Refine the finish',
    body: 'Spacing, contrast, responsiveness, and performance — the details recruiters notice.',
  },
]

const About = () => {
  return (
    <section className="section" id="about">
      <div className="container two-col">
        <article className="card story" data-reveal>
          <span className="eyebrow">About me</span>
          <h2>{SITE.aboutTitle}</h2>
          <p>{SITE.aboutBody}</p>
        </article>
        <aside className="card timeline-card" data-reveal>
          <h3 style={{ fontSize: 'var(--text-lg)' }}>How I work</h3>
          <div className="timeline">
            {STEPS.map((s) => (
              <div key={s.title} className="timeline-item">
                <span className="timeline-mark" aria-hidden="true" />
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

export default About
