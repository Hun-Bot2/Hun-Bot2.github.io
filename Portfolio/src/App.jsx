import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BikeScene from './pages/BikeScene'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/3d" element={<BikeScene />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
