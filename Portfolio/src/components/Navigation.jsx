import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Navigation.css'

function Navigation({ darkMode, setDarkMode }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Hide navigation on the main bike scene
  if (location.pathname === '/') {
    return null
  }

  const navItems = [
    { path: '/', label: 'Home' },
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
          
          <button
            className="theme-toggle"
            onClick={() => setDarkMode()}
            aria-label="Toggle theme"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
