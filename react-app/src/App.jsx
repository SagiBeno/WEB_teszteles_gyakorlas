import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage.jsx'
import SwapiPage from './pages/SwapiPage.jsx'
import LampPage from './pages/LampPage.jsx'
import VotingPage from './pages/VotingPage.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1 className="sidebar-title">Student Functions Lab</h1>
        <nav className="sidebar-nav">
          <NavLink className="menu-link" to="/">
            Home
          </NavLink>
          <NavLink className="menu-link" to="/swapi">
            SWAPI
          </NavLink>
          <NavLink className="menu-link" to="/lamp">
            Traffic Lamp
          </NavLink>
          <NavLink className="menu-link" to="/voting">
            Voting
          </NavLink>
        </nav>
      </aside>

      <main className="content-area">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/swapi" element={<SwapiPage />} />
          <Route path="/lamp" element={<LampPage />} />
          <Route path="/voting" element={<VotingPage />} />
        </Routes>
      </main>
    </div>
  )
}
