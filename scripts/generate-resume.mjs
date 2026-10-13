import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const photoPath = path.join(rootDir, 'public', 'images', 'profile-sm.png')
const photoBuffer = fs.readFileSync(photoPath)
const photoBase64 = `data:image/png;base64,${photoBuffer.toString('base64')}`

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Nirmal Solanki — Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      font-family: 'Plus Jakarta Sans', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
      line-height: 1.38;
    }

    .resume-wrapper {
      display: grid;
      grid-template-columns: 65mm 145mm;
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      overflow: hidden;
      background: #ffffff;
    }

    /* ================= LEFT SIDEBAR ================= */
    .sidebar {
      background: #0f172a;
      color: #e2e8f0;
      padding: 10mm 5.5mm 8mm 6.5mm;
      display: flex;
      flex-direction: column;
      gap: 3.8mm;
      border-right: 1px solid #1e293b;
      height: 297mm;
      box-sizing: border-box;
    }

    .profile-photo-wrap {
      display: flex;
      justify-content: center;
      margin-bottom: 0.5mm;
    }

    .profile-photo {
      width: 36mm;
      height: 42mm;
      border-radius: 8px;
      object-fit: cover;
      object-position: center 8%;
      border: 2px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }

    .sidebar-section {
      display: flex;
      flex-direction: column;
      gap: 1.8mm;
    }

    .sidebar-title {
      font-size: 8pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #38bdf8;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      padding-bottom: 0.8mm;
    }

    .contact-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.6mm;
      font-size: 7.3pt;
      color: #cbd5e1;
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 1.8mm;
      word-break: break-all;
    }

    .contact-item svg {
      width: 3mm;
      height: 3mm;
      flex-shrink: 0;
      color: #38bdf8;
      margin-top: 0.5mm;
    }

    .contact-item a {
      color: #e2e8f0;
      text-decoration: none;
    }

    .skill-group {
      display: flex;
      flex-direction: column;
      gap: 0.8mm;
    }

    .skill-group-name {
      font-size: 7pt;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .skill-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 1mm;
    }

    .skill-badge {
      font-size: 6.8pt;
      background: rgba(255, 255, 255, 0.08);
      color: #f1f5f9;
      padding: 0.6mm 1.6mm;
      border-radius: 3px;
      font-weight: 500;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .edu-item {
      display: flex;
      flex-direction: column;
      gap: 0.6mm;
      font-size: 7.2pt;
    }

    .edu-item + .edu-item {
      margin-top: 1.4mm;
      padding-top: 1.4mm;
      border-top: 1px dashed rgba(255, 255, 255, 0.1);
    }

    .edu-degree {
      font-weight: 700;
      color: #ffffff;
      font-size: 7.4pt;
    }

    .edu-inst {
      color: #cbd5e1;
      font-size: 7pt;
    }

    .edu-year {
      color: #38bdf8;
      font-size: 6.8pt;
      font-weight: 600;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1.1mm;
    }

    .tag-pill {
      font-size: 6.8pt;
      padding: 0.6mm 1.5mm;
      border-radius: 3px;
      background: rgba(56, 189, 248, 0.12);
      color: #7dd3fc;
      border: 1px solid rgba(56, 189, 248, 0.22);
      font-weight: 500;
    }

    /* ================= MAIN COLUMN ================= */
    .main-col {
      padding: 10mm 8mm 8mm 8mm;
      display: flex;
      flex-direction: column;
      gap: 3.8mm;
      background: #ffffff;
      height: 297mm;
      box-sizing: border-box;
    }

    .header-block {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 2.2mm;
    }

    .header-name {
      font-size: 21pt;
      font-weight: 800;
      letter-spacing: 0.01em;
      color: #0f172a;
      line-height: 1.1;
      text-transform: uppercase;
      word-spacing: 0.15em;
    }

    .header-role {
      font-size: 10pt;
      font-weight: 700;
      color: #0284c7;
      letter-spacing: 0.06em;
      margin-top: 0.8mm;
      text-transform: uppercase;
    }

    .header-subtitle {
      font-size: 7.7pt;
      color: #64748b;
      margin-top: 0.8mm;
      font-weight: 500;
    }

    .main-section {
      display: flex;
      flex-direction: column;
      gap: 1.8mm;
    }

    .section-heading {
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 1.8mm;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 0.8mm;
    }

    .section-heading::before {
      content: '';
      width: 2.6mm;
      height: 2.6mm;
      background: #0284c7;
      border-radius: 1px;
    }

    .summary-text {
      font-size: 7.9pt;
      color: #334155;
      line-height: 1.44;
      text-align: justify;
    }

    .projects-grid {
      display: flex;
      flex-direction: column;
      gap: 2.6mm;
    }

    .project-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 2.2mm 2.8mm;
      border-left: 3px solid #0284c7;
    }

    .project-card-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 2mm;
      margin-bottom: 0.6mm;
    }

    .project-title {
      font-size: 8.4pt;
      font-weight: 700;
      color: #0f172a;
    }

    .project-links {
      display: flex;
      gap: 1.8mm;
      font-size: 7pt;
      font-weight: 600;
    }

    .project-links a {
      color: #0284c7;
      text-decoration: none;
    }

    .project-tech {
      font-size: 7pt;
      color: #475569;
      font-weight: 600;
      margin-bottom: 0.9mm;
    }

    .project-bullets {
      list-style-type: disc;
      padding-left: 3.5mm;
      display: flex;
      flex-direction: column;
      gap: 0.6mm;
      font-size: 7.5pt;
      color: #334155;
      line-height: 1.35;
    }

    .workflow-steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.8mm;
    }

    .workflow-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 1.8mm 2.2mm;
    }

    .workflow-box-title {
      font-size: 7.3pt;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 1mm;
      margin-bottom: 0.6mm;
    }

    .workflow-box-title span {
      color: #0284c7;
      font-size: 6.6pt;
      font-weight: 800;
    }

    .workflow-box-desc {
      font-size: 6.9pt;
      color: #64748b;
      line-height: 1.32;
    }
  </style>
</head>
<body>
  <div class="resume-wrapper">
    <!-- ================= SIDEBAR ================= -->
    <aside class="sidebar">
      <div class="profile-photo-wrap">
        <img class="profile-photo" src="${photoBase64}" alt="Nirmal Solanki">
      </div>

      <!-- CONTACT -->
      <section class="sidebar-section">
        <h2 class="sidebar-title">Contact</h2>
        <ul class="contact-list">
          <li class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>+91 97123 75638</span>
          </li>
          <li class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <a href="mailto:nirmalsolanki1432@gmail.com">nirmalsolanki1432@gmail.com</a>
          </li>
          <li class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Surat, Gujarat, India</span>
          </li>
          <li class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            <a href="https://linkedin.com/in/nirmal-solanki-b222b537a" target="_blank">in/nirmal-solanki</a>
          </li>
          <li class="contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            <a href="https://github.com/Nirmal-Solanki8" target="_blank">github.com/Nirmal-Solanki8</a>
          </li>
        </ul>
      </section>

      <!-- TECHNICAL SKILLS -->
      <section class="sidebar-section">
        <h2 class="sidebar-title">Technical Skills</h2>
        <div class="skill-group">
          <span class="skill-group-name">Frontend Architecture</span>
          <div class="skill-badges">
            <span class="skill-badge">React.js</span>
            <span class="skill-badge">JavaScript (ES6+)</span>
            <span class="skill-badge">HTML5</span>
            <span class="skill-badge">CSS3</span>
            <span class="skill-badge">Responsive UI</span>
            <span class="skill-badge">Flexbox / Grid</span>
          </div>
        </div>
        <div class="skill-group">
          <span class="skill-group-name">Backend & API Engineering</span>
          <div class="skill-badges">
            <span class="skill-badge">Node.js</span>
            <span class="skill-badge">Express.js</span>
            <span class="skill-badge">RESTful APIs</span>
            <span class="skill-badge">EJS</span>
          </div>
        </div>
        <div class="skill-group">
          <span class="skill-group-name">Databases & Developer Tools</span>
          <div class="skill-badges">
            <span class="skill-badge">MongoDB</span>
            <span class="skill-badge">Postman</span>
            <span class="skill-badge">Vite</span>
            <span class="skill-badge">Git & GitHub</span>
            <span class="skill-badge">VS Code</span>
          </div>
        </div>
      </section>

      <!-- EDUCATION -->
      <section class="sidebar-section">
        <h2 class="sidebar-title">Education & Training</h2>
        <div class="edu-item">
          <div class="edu-degree">Full-Stack Web Development</div>
          <div class="edu-inst">ABC Computer Education, Surat</div>
          <div class="edu-year">2024 – Present</div>
        </div>
        <div class="edu-item">
          <div class="edu-degree">Bachelor of Commerce (B.Com)</div>
          <div class="edu-inst">Veer Narmad South Gujarat University (VNSGU)</div>
          <div class="edu-year">Undergraduate Studies (2016 – 2018)</div>
        </div>
      </section>

      <!-- LANGUAGES -->
      <section class="sidebar-section">
        <h2 class="sidebar-title">Languages</h2>
        <div class="tag-list">
          <span class="tag-pill">English (Professional)</span>
          <span class="tag-pill">Hindi (Fluent)</span>
          <span class="tag-pill">Gujarati (Native)</span>
        </div>
      </section>

      <!-- PROFESSIONAL STRENGTHS -->
      <section class="sidebar-section">
        <h2 class="sidebar-title">Core Competencies</h2>
        <div class="tag-list">
          <span class="tag-pill">Problem Solving</span>
          <span class="tag-pill">Clean Architecture</span>
          <span class="tag-pill">Agile Mindset</span>
          <span class="tag-pill">Cross-Team Synergy</span>
        </div>
      </section>
    </aside>

    <!-- ================= MAIN COLUMN ================= -->
    <main class="main-col">
      <!-- HEADER -->
      <header class="header-block">
        <h1 class="header-name">Nirmal Solanki</h1>
        <div class="header-role">Web Developer · Frontend & Full-Stack</div>
        <div class="header-subtitle">Engineering high-performance, responsive web applications with clean, scalable code.</div>
      </header>

      <!-- SUMMARY -->
      <section class="main-section">
        <h2 class="section-heading">Professional Summary</h2>
        <p class="summary-text">
          Performance-driven Web Developer with strong proficiency in JavaScript, React.js, Node.js, Express, and MongoDB. Demonstrated track record of developing fully responsive, component-driven web applications, integrating real-time RESTful APIs, and crafting intuitive user interfaces. Committed to writing clean, maintainable code, solving complex front-to-back engineering challenges, and shipping high-value digital experiences with modern web standards.
        </p>
      </section>

      <!-- FEATURED PROJECTS -->
      <section class="main-section">
        <h2 class="section-heading">Featured Engineering Projects</h2>
        <div class="projects-grid">
          <!-- Project 1 -->
          <article class="project-card">
            <div class="project-card-header">
              <span class="project-title">CHRONICLE – Real-Time News & Editorial Platform</span>
              <div class="project-links">
                <a href="https://newsandblogs.vercel.app/" target="_blank">Live Demo ↗</a>
                <span>·</span>
                <a href="https://github.com/Nirmal-Solanki8/newsandblogs" target="_blank">Code ↗</a>
              </div>
            </div>
            <div class="project-tech">React 19 · Vite · REST APIs · Axios · LocalStorage · CSS3</div>
            <ul class="project-bullets">
              <li>Architected an editorial news and blogging web app delivering real-time worldwide headlines via multi-category REST API feeds.</li>
              <li>Integrated interactive weather forecasting, custom productivity calendar widget, and client-side bookmark persistence.</li>
              <li>Engineered a fully fluid, mobile-first responsive layout with custom search and lightning-fast load times.</li>
            </ul>
          </article>

          <!-- Project 2 -->
          <article class="project-card">
            <div class="project-card-header">
              <span class="project-title">Fashion E-Commerce Storefront</span>
              <div class="project-links">
                <a href="https://fashion-web-project-react.vercel.app/" target="_blank">Live Demo ↗</a>
                <span>·</span>
                <a href="https://github.com/Nirmal-Solanki8/fashion-web-project-react" target="_blank">Code ↗</a>
              </div>
            </div>
            <div class="project-tech">React.js · Modular CSS · State Management · Responsive Design</div>
            <ul class="project-bullets">
              <li>Developed a modern e-commerce storefront with intuitive product catalog navigation, banner showcases, and category filters.</li>
              <li>Implemented client-side search, product grid cards, interactive cart state, and smooth micro-animations.</li>
              <li>Ensured 100% responsiveness across mobile, tablet, and high-resolution desktop viewports.</li>
            </ul>
          </article>

          <!-- Project 3 -->
          <article class="project-card">
            <div class="project-card-header">
              <span class="project-title">Worklix Job Portal Platform</span>
              <div class="project-links">
                <a href="https://worklix-jobportal.vercel.app/" target="_blank">Live Demo ↗</a>
                <span>·</span>
                <a href="https://github.com/Nirmal-Solanki8/Worklix-jobportal" target="_blank">Code ↗</a>
              </div>
            </div>
            <div class="project-tech">Node.js · Express.js · MongoDB · EJS · REST Architecture</div>
            <ul class="project-bullets">
              <li>Engineered a backend-driven job discovery and recruitment platform with structured routing and database schemas.</li>
              <li>Built candidate job browsing, application submission workflows, and robust server-side controllers.</li>
              <li>Designed modular MVC architecture prepared for production deployment and secure data operations.</li>
            </ul>
          </article>

          <!-- Project 4 -->
          <article class="project-card">
            <div class="project-card-header">
              <span class="project-title">Kaira Web Application</span>
              <div class="project-links">
                <a href="https://kaira-web-react.vercel.app/" target="_blank">Live Demo ↗</a>
                <span>·</span>
                <a href="https://github.com/Nirmal-Solanki8/kaira-web-react" target="_blank">Code ↗</a>
              </div>
            </div>
            <div class="project-tech">React.js · CSS3 · UI/UX Design · Component Lifecycle</div>
            <ul class="project-bullets">
              <li>Designed an elegant brand showcase web application with reusable component structure and visual rhythm.</li>
              <li>Implemented mobile drawer navigation, accessible interactions, and responsive typography.</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- ENGINEERING PRINCIPLES -->
      <section class="main-section">
        <h2 class="section-heading">Engineering Principles</h2>
        <div class="workflow-steps">
          <div class="workflow-box">
            <div class="workflow-box-title"><span>01</span> Architecture</div>
            <div class="workflow-box-desc">Deconstruct requirements, establish modular components, and maintain predictable state.</div>
          </div>
          <div class="workflow-box">
            <div class="workflow-box-title"><span>02</span> Clean Code</div>
            <div class="workflow-box-desc">Adhere to semantic HTML, modern ES6+ standards, and maintainable project structure.</div>
          </div>
          <div class="workflow-box">
            <div class="workflow-box-title"><span>03</span> Performance</div>
            <div class="workflow-box-desc">Optimize responsive layouts, eliminate layout shifts, and ensure cross-browser stability.</div>
          </div>
        </div>
      </section>
    </main>
  </div>
</body>
</html>`

const htmlPath = path.join(rootDir, 'scripts', 'resume.html')
fs.writeFileSync(htmlPath, htmlContent, 'utf-8')
console.log(`HTML generated at ${htmlPath}`)

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const publicPdfPath = path.join(rootDir, 'public', 'resume.pdf')
const distPdfPath = path.join(rootDir, 'dist', 'resume.pdf')

console.log('Rendering PDF via Edge Headless...')
execFileSync(edgePath, [
  '--headless',
  '--disable-gpu',
  '--run-all-compositor-stages-before-draw',
  '--no-pdf-header-footer',
  `--print-to-pdf=${publicPdfPath}`,
  htmlPath,
])

console.log(`PDF saved to ${publicPdfPath}`)
if (fs.existsSync(path.dirname(distPdfPath))) {
  fs.copyFileSync(publicPdfPath, distPdfPath)
  console.log(`PDF copied to ${distPdfPath}`)
}
console.log('Done!')
