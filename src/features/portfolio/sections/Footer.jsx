import { SITE } from '@/constants/site'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-line">
        <span>
          © {new Date().getFullYear()} {SITE.name} — portfolio.
        </span>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  )
}

export default Footer
