export const PROFILE_IMAGE_SRC = '/images/profile.jpg'
export const PROFILE_IMAGE_FALLBACK = '/images/profile-placeholder.svg'

export const SITE = {
  name: 'Nirmal',
  get title() {
    return `${this.name} — Web Developer`
  },
  role: 'Web Developer',
  email: 'nirmalsolanki1432@gmail.com',
  github: 'https://github.com/Nirmal-Solanki8',
  linkedin: 'https://www.linkedin.com/in/nirmal-solanki-b222b537a',
  resume: '/resume.pdf',
  heroHeadline: 'Designing and building modern, fast web experiences.',
  heroLead:
    "I'm a web developer focused on React, JavaScript, Node.js, and responsive UI. I build websites and web apps that are clean, performant, and production-ready.",
  heroStack: 'React · Node.js · Express · MongoDB',
  aboutTitle: 'A web developer focused on useful products and polished UI.',
  aboutBody:
    'My core skills are HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and REST APIs. I focus on clean architecture, responsive design, and reliable user experience.',
}

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: SITE.github },
  { label: 'LinkedIn', href: SITE.linkedin },
]

export const SKILLS = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'React.js',
  'Node.js',
  'Express.js',
  'REST APIs',
  'MongoDB',
  'Responsive UI',
]
