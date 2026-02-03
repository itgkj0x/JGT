import './App.css'
// Components
import Header from './components/Header.jsx'
// Pages
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Editor from './pages/Editor.jsx'
import Preset from './pages/Preset.jsx'
import Setting from './pages/Setting.jsx'
// Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

function App() {

  const [State, setState] = useState({
    loading: false,
    nowplay: false,
    nowpreset: "None"
  });

  return (
    <Router>
    <Header State={State} setState={setState} />
      <Routes>
        <Route path="/preset" element={<Preset setState={setState}/>} />
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Editor setState={setState}/>} />
        <Route path="/edit" element={<Editor setState={setState}/>} />
        <Route path="/setting" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
