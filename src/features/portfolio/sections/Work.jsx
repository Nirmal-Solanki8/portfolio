import { useState, useMemo } from 'react'
import { ExternalLink, Sparkles } from 'lucide-react'
import { PROJECTS } from '@/features/portfolio/data/projects'

const padIndex = (n) => String(n).padStart(2, '0')


const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const categories = useMemo(() => {
    const set = new Set(['All'])
    PROJECTS.forEach((p) => {
      if (p.category) set.add(p.category)
    })
    return Array.from(set)
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS
    return PROJECTS.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  const formatDomain = (url) => {
    try {
      const u = new URL(url)
      return u.hostname
    } catch {
      return (url || '').replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    }
  }

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="work-head" data-reveal>
          <div className="work-head__info">
            <h2 id="work-title">Things I&apos;ve Built</h2>
            <p className="work-head__sub">
              A curated selection of production-ready web applications, interactive interfaces, and full-stack platforms.
            </p>
          </div>
          <div className="work-filter-bar" role="tablist" aria-label="Filter projects">
            {categories.map((cat) => {
              const count = cat === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeFilter === cat}
                  className={`work-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  <span>{cat}</span>
                  <span className="work-filter-count">{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="work-grid">
          {filteredProjects.map((project, index) => {
            const domain = formatDomain(project.liveLink || '')
            return (
              <article
                key={project.id || project.title}
                className={`card project-card ${project.featured ? 'project-card--featured' : ''}`}
                data-reveal
              >
                {/* Card Top Metadata */}
                <div className="project-card__header">
                  <div className="project-card__meta">
                    <span className="project-card__index">{`${padIndex(index + 1)} / ${project.category || 'PROJECT'}`}</span>
                  </div>
                  {project.featured ? (
                    <span className="project-card__badge project-card__badge--featured">
                      <Sparkles size={12} />
                      <span>Featured</span>
                    </span>
                  ) : (
                    <span className="project-card__badge project-card__badge--live">
                      <span className="project-status-dot" />
                      <span>Live</span>
                    </span>
                  )}
                </div>

                {/* Browser Mockup Window */}
                <div className="project-card__mockup">
                  <div className="project-card__browser-bar">
                    <div className="project-card__browser-dots" aria-hidden="true">
                      <span className="dot dot--red" />
                      <span className="dot dot--yellow" />
                      <span className="dot dot--green" />
                    </div>
                    <div className="project-card__browser-url" title={domain}>
                      <span className="project-browser-lock">🔒</span>
                      <span>{domain}</span>
                    </div>
                  </div>

                  <a
                    className="project-card__shot-link"
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open live demo for ${project.title}`}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.imageAlt || project.title}
                      width={800}
                      height={460}
                      loading="lazy"
                      decoding="async"
                      className="project-card__img"
                    />
                    <div className="project-card__overlay">
                      <span className="project-card__overlay-pill">
                        <span>Visit Live App</span>
                        <ExternalLink size={13} />
                      </span>
                    </div>
                  </a>
                </div>

                {/* Card Body */}
                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="project-card__actions">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      className="button button--primary project-action-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Live demo</span>
                      <ExternalLink size={14} className="project-action-btn__icon" />
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Work
