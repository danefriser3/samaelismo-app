import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'

import "./App.css"
import './components/pages/start/Start.css'; // opzionale, per lo stile
import Start from './components/pages/start/Start'
import Diary from './components/pages/diary/Diary';

function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/home" element={<Home />} />
      <Route path="/diary" element={<Diary />} />
    </Routes>
  </Router>
}

export default App
