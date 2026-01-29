import './App.css'
// Components
import Header from './components/Header.jsx'
// Pages
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Editor from './pages/Editor.jsx'
import Preset from './pages/Preset.jsx'
import Settings from './pages/Settings.jsx'
// Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/preset" element={<Preset />} />
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Editor />} />
        <Route path="/edit" element={<Editor />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
