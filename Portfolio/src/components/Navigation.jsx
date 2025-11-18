import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Navigation.css'

function Navigation() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Hide navigation only on the immersive 3D scene
  if (location.pathname === '/3d') {
    return null
  }

  const navItems = [
    { path: '/', label: 'Overview' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/3d', label: '3D World' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-bracket">{'<'}</span>
          Hun-Bot2
          <span className="logo-bracket">{'/>'}</span>
        </Link>

        <button 
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <a className="nav-cta" href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
