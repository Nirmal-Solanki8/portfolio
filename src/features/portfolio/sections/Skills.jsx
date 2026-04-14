import { motion, useReducedMotion } from 'framer-motion'
import { FaCss3Alt, FaHtml5, FaJs, FaNodeJs, FaReact } from 'react-icons/fa'
import { SiExpress, SiMongodb } from 'react-icons/si'

const SKILLS = {
  Frontend: [
    { name: 'HTML5', icon: FaHtml5, level: 90 },
    { name: 'CSS3', icon: FaCss3Alt, level: 85 },
    { name: 'JavaScript', icon: FaJs, level: 88 },
    { name: 'React.js', icon: FaReact, level: 90 },
  ],
  Backend: [
    { name: 'Node.js', icon: FaNodeJs, level: 85 },
    { name: 'Express.js', icon: SiExpress, level: 80 },
  ],
  Database: [
    { name: 'MongoDB', icon: SiMongodb, level: 82 },
  ],
}

const MotionArticle = motion.article
const MotionBar = motion.div

const Skills = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-head" data-reveal>
          <h2>My skills.</h2>
        </div>

        <div className="skills-categories" data-reveal>
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category} className="skills-block">
              <h3 className="skills-title">{category}</h3>
              <div className="skills-grid">
                {items.map((skill) => {
                  const Icon = skill.icon
                  return (
                    <MotionArticle
                      key={skill.name}
                      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
                      transition={{ duration: reduceMotion ? 0 : 0.2 }}
                      className="card skill-progress-card"
                    >
                      <div className="skill-head">
                        <span className="skill-icon" aria-hidden="true">
                          <Icon />
                        </span>
                        <h4>{skill.name}</h4>
                      </div>

                      <div className="skill-meter">
                        <MotionBar
                          className="skill-meter__bar"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: reduceMotion ? 0 : 0.9, ease: 'easeOut' }}
                        />
                      </div>

                      <p className="skill-level">{skill.level}%</p>
                    </MotionArticle>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
