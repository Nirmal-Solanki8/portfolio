import { FaCss3Alt, FaHtml5, FaServer } from 'react-icons/fa'
import { MdDevices } from 'react-icons/md'
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiVite,
} from 'react-icons/si'
import { SKILL_GROUPS } from '@/features/portfolio/data/skills'

const SKILL_CONFIG = {
  HTML5: {
    icon: FaHtml5,
    color: '#E34F26',
    bg: 'rgba(227, 79, 38, 0.14)',
    category: 'Markup',
  },
  CSS3: {
    icon: FaCss3Alt,
    color: '#1572B6',
    bg: 'rgba(21, 114, 182, 0.14)',
    category: 'Styling',
  },
  JavaScript: {
    icon: SiJavascript,
    color: '#F7DF1E',
    bg: 'rgba(247, 223, 30, 0.14)',
    category: 'Language',
  },
  'React.js': {
    icon: SiReact,
    color: '#61DAFB',
    bg: 'rgba(97, 218, 251, 0.14)',
    category: 'Library',
  },
  'Responsive UI': {
    icon: MdDevices,
    color: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.14)',
    category: 'Design & UX',
  },
  'Node.js': {
    icon: SiNodedotjs,
    color: '#5FA04E',
    bg: 'rgba(95, 160, 78, 0.14)',
    category: 'Runtime',
  },
  'Express.js': {
    icon: SiExpress,
    color: '#CBD5E1',
    bg: 'rgba(203, 213, 225, 0.14)',
    category: 'Framework',
  },
  'REST APIs': {
    icon: FaServer,
    color: '#A855F7',
    bg: 'rgba(168, 85, 247, 0.14)',
    category: 'Architecture',
  },
  MongoDB: {
    icon: SiMongodb,
    color: '#47A248',
    bg: 'rgba(71, 162, 72, 0.14)',
    category: 'NoSQL Database',
  },
  Postman: {
    icon: SiPostman,
    color: '#FF6C37',
    bg: 'rgba(255, 108, 55, 0.14)',
    category: 'API Testing',
  },
  Vite: {
    icon: SiVite,
    color: '#BD34FE',
    bg: 'rgba(189, 52, 254, 0.14)',
    category: 'Build Tool',
  },
}

const padIndex = (n) => String(n).padStart(2, '0')

const SkillItem = ({ name, index }) => {
  const config = SKILL_CONFIG[name] || {
    icon: null,
    color: 'var(--color-primary)',
    bg: 'var(--color-primary-soft)',
    category: '',
  }
  const Icon = config.icon

  return (
    <li
      className="skill-item"
      style={{
        '--skill-index': index,
        '--brand-color': config.color,
        '--brand-bg': config.bg,
      }}
    >
      <span className="skill-item__icon" aria-hidden="true">
        {Icon ? <Icon /> : null}
      </span>
      <div className="skill-item__info">
        <span className="skill-item__name">{name}</span>
        {config.category && <span className="skill-item__category">{config.category}</span>}
      </div>
    </li>
  )
}

const Skills = () => {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-head" data-reveal>
          <h2>My skills.</h2>
          <p>The stack I use to design, build, and ship clean, production-ready web experiences.</p>
        </div>

        <div className="skills-grid">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <article key={group.id} className="card skills-panel" data-reveal>
              <span className="index-label">{padIndex(groupIndex + 1)} / Stack</span>
              <h3>{group.title}</h3>
              <p>{group.summary}</p>
              <ul className="skill-list">
                {group.skills.map((name, skillIndex) => (
                  <SkillItem key={name} name={name} index={skillIndex} />
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
