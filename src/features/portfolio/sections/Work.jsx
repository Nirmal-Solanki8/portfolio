import { PROJECTS } from '@/features/portfolio/data/projects'

const padIndex = (n) => String(n).padStart(2, '0')

const Work = () => {
  const featured = PROJECTS.find((p) => p.featured) ?? PROJECTS[0]
  const secondary = PROJECTS.filter((p) => p.id !== featured?.id)

  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-head" data-reveal>
          <h2>Things I&apos;ve Built</h2>
        </div>

        <div className="work-grid">
          <article className="card featured-work" data-reveal>
            <div>
              <div className="work-top">
                <span className="index-label">{`${padIndex(1)} / ${featured.category ?? 'Featured'}`}</span>
                <span className="eyebrow">{featured.eyebrow ?? 'Live project'}</span>
              </div>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
              <div className="tags">
                {featured.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <a className="project-shot" href={featured.liveLink} target="_blank" rel="noopener noreferrer">
                <img
                  src={featured.imageUrl}
                  alt={featured.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
            <div className="work-actions">
              <a href={featured.sourceLink} className="button button--secondary" target="_blank" rel="noopener noreferrer">
                Source Code
              </a>
              <a href={featured.liveLink} className="button button--ghost" target="_blank" rel="noopener noreferrer">
                Live demo
              </a>
            </div>
          </article>

          <div className="small-stack">
            {secondary.map((p, i) => (
              <article key={p.title} className="card small-work" data-reveal>
                <span className="index-label">{`${padIndex(i + 2)} / ${p.category ?? 'Project'}`}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                {p.liveLink || p.sourceLink ? (
                  <div className="small-work-actions">
                    {p.sourceLink ? (
                      <a href={p.sourceLink} className="button button--secondary" target="_blank" rel="noopener noreferrer">
                        Source Code
                      </a>
                    ) : null}
                    {p.liveLink ? (
                      <a href={p.liveLink} className="button button--ghost" target="_blank" rel="noopener noreferrer">
                        Live demo
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Work
