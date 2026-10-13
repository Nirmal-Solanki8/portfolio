import { Compass, Code2, Sparkles } from 'lucide-react'
import { SITE } from '@/constants/site'

const WORKFLOW_STEPS = [
  {
    step: '01',
    phase: 'Understand',
    title: 'Deconstruct & Scope',
    body: 'Mapping user journeys, data contracts, and edge cases before writing a line of code.',
    icon: Compass,
  },
  {
    step: '02',
    phase: 'Build',
    title: 'Architect & Engineer',
    body: 'Building component-driven UI with predictable state, typed APIs, and modular backend patterns.',
    icon: Code2,
  },
  {
    step: '03',
    phase: 'Refine',
    title: 'Polish & Ship',
    body: 'Fine-tuning responsiveness, 60fps micro-interactions, accessibility, and sub-second load times.',
    icon: Sparkles,
  },
]

const About = () => {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container two-col">
        <article className="card story" data-reveal>
          <div className="story__header">
            <span className="eyebrow">About me</span>
            <h2 id="about-title">{SITE.aboutTitle}</h2>
          </div>
          <div className="story__body">
            <p>
              I don&apos;t just write syntax—I solve product problems. My focus is on transforming ambiguous requirements into high-impact digital experiences that feel intuitive for users and effortless for teams to scale.
            </p>
            <p>
              Whether engineering fluid React interfaces or structuring resilient Node.js and MongoDB backends, I bridge design intuition with clean system architecture and obsessive attention to performance.
            </p>
          </div>
          <div className="story__pillars" aria-label="Core engineering principles">
            <div className="story__pillar-badge">
              <span className="pillar-dot" />
              <span>Problem-First Architecture</span>
            </div>
            <div className="story__pillar-badge">
              <span className="pillar-dot" />
              <span>High-Performance UX</span>
            </div>
            <div className="story__pillar-badge">
              <span className="pillar-dot" />
              <span>Clean, Scalable Code</span>
            </div>
          </div>
        </article>

        <aside className="card timeline-card" data-reveal>
          <div className="timeline-header">
            <span className="eyebrow eyebrow--subtle">Workflow</span>
            <h3 className="timeline-title">How I work.</h3>
          </div>
          <div className="workflow-steps">
            {WORKFLOW_STEPS.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.phase} className="workflow-card">
                  <div className="workflow-card__icon-wrap">
                    <Icon size={18} className="workflow-card__icon" />
                    <span className="workflow-card__step">{s.step}</span>
                  </div>
                  <div className="workflow-card__content">
                    <div className="workflow-card__meta">
                      <span className="workflow-card__phase">{s.phase}</span>
                      <h4 className="workflow-card__title">{s.title}</h4>
                    </div>
                    <p className="workflow-card__desc">{s.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </aside>
      </div>
    </section>
  )
}

export default About
