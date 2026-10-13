import './GridBackground.css'

const GridBackground = () => {
  return (
    <div className="site-grid-bg" aria-hidden="true">
      <svg
        className="site-grid-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="site-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#site-grid-pattern)" />

        {/* Ambient glowing tech cells on the 40x40 grid */}
        <rect x="80" y="120" width="40" height="40" className="grid-glow-cell grid-glow-cell--1" />
        <rect x="240" y="240" width="40" height="40" className="grid-glow-cell grid-glow-cell--2" />
        <rect x="440" y="80" width="40" height="40" className="grid-glow-cell grid-glow-cell--3" />
        <rect x="680" y="280" width="40" height="40" className="grid-glow-cell grid-glow-cell--4" />
        <rect x="880" y="160" width="40" height="40" className="grid-glow-cell grid-glow-cell--5" />
        <rect x="1120" y="240" width="40" height="40" className="grid-glow-cell grid-glow-cell--6" />
      </svg>
      <div className="site-grid-radial-glow" />
    </div>
  )
}

export default GridBackground
