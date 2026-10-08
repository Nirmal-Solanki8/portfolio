import { useState, useMemo } from 'react'
import { ExternalLink, Sparkles } from 'lucide-react'
import { PROJECTS } from '@/features/portfolio/data/projects'

const padIndex = (n) => String(n).padStart(2, '0')

const GitHubIcon = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="icon-svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
)

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
            const domain = formatDomain(project.liveLink || project.sourceLink || '')
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
                    href={project.liveLink || project.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open preview for ${project.title}`}
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

                {/* Action Buttons */}
                <div className="project-card__actions">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      className="button button--primary project-action-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Live demo</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {project.sourceLink && (
                    <a
                      href={project.sourceLink}
                      className="button button--secondary project-action-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon size={14} />
                      <span>GitHub</span>
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
