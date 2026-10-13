export const PROFILE_IMAGE_SRC = '/images/profile-sm.png'
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
  aboutTitle: 'Engineering web solutions with a product-first mindset.',
  aboutBody:
    'I build web applications by dissecting the underlying product problem. From fluid React interfaces to resilient Node.js and MongoDB backends, I prioritize clean architecture, intuitive UX, and long-term maintainability.',
}

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: SITE.linkedin },
  { label: 'Email', href: `mailto:${SITE.email}` },
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
