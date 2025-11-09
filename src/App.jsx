import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import BikeScene from './pages/BikeScene'
import About from './pages/About'
import Contact from './pages/Contact'
import useStore from './store/useStore'
import './App.css'

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode)
  const toggleTheme = useStore((state) => state.toggleTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <Router>
      <div className="app">
        <Navigation darkMode={isDarkMode} setDarkMode={toggleTheme} />
        <Routes>
          <Route path="/" element={<BikeScene />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
