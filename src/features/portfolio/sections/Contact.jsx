import { useState } from 'react'
import { postContact } from '@/lib/api'
import { SITE } from '@/constants/site'

const Contact = () => {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const message = String(fd.get('message') || '').trim()

    setError('')
    setStatus('sending')

    try {
      await postContact({ name, email, message })
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('idle')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container contact-wrap">
        <article className="card contact-card" data-reveal>
          <div className="contact-layout">
            <div className="contact-intro">
              <span className="eyebrow">Contact</span>
              <h2>Let&apos;s build something that ships.</h2>
              <p>
                Send your project details and I&apos;ll reply with the best approach.
              </p>
              <div className="contact-actions">
                <a className="button button--secondary" href={SITE.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a className="button button--secondary" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a className="button button--ghost" href={SITE.resume} target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="contact-email">Email</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
              </div>
              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" rows={4} required placeholder="Project, role, or question" />
              </div>
              {error ? (
                <p className="feedback-err" role="alert">
                  {error}
                </p>
              ) : null}
              {status === 'success' ? (
                <p className="feedback-ok" role="status">
                  Message received — I&apos;ll get back to you soon.
                </p>
              ) : null}
              <button type="submit" className="btn primary contact-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Contact
