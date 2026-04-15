import { FaCss3Alt, FaHtml5, FaJs, FaNodeJs, FaReact, FaServer } from 'react-icons/fa'
import { MdDevices } from 'react-icons/md'
import { SiExpress, SiMongodb } from 'react-icons/si'
import { SKILL_GROUPS } from '@/features/portfolio/data/skills'

const SKILL_ICONS = {
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  JavaScript: FaJs,
  'React.js': FaReact,
  'Node.js': FaNodeJs,
  'Express.js': SiExpress,
  'REST APIs': FaServer,
  MongoDB: SiMongodb,
  'Responsive UI': MdDevices,
}

const padIndex = (n) => String(n).padStart(2, '0')

const SkillItem = ({ name, index }) => {
  const Icon = SKILL_ICONS[name]

  return (
    <li className="skill-item" style={{ '--skill-index': index }}>
      <span className="skill-item__icon" aria-hidden="true">
        {Icon ? <Icon /> : null}
      </span>
      <span className="skill-item__name">{name}</span>
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
