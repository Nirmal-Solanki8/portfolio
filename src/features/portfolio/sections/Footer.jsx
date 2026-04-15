import { SITE, SOCIAL_LINKS } from '@/constants/site'
import { scrollToHash } from '@/lib/scrollToAnchor'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-line">
        <div className="footer-meta">
          <span>
            © {new Date().getFullYear()} {SITE.name} — portfolio.
          </span>
          <div className="footer-socials" aria-label="Social media links">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToHash('#top')
          }}
        >
          Back to top
        </a>
      </div>
    </footer>
  )
}

export default Footer
