import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ChampionsPage from './pages/ChampionsPage'
import TournamentsPage from './pages/TournamentsPage'
import DetailsPage from './pages/DetailsPage'
import AboutPage from './pages/AboutPage'

function App() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    fetch(`/src/data/translations/${lang}.json`)
      .then(r => r.json())
      .then(data => setTranslations(data))
  }, [lang])

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.body.className = theme
  }, [lang, theme])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.className = theme
  }, [theme])

  const t = (key) => translations[key] || key

  return (
    <div className={`app ${theme}`}>
      <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<ChampionsPage t={t} lang={lang} />} />
        <Route path="/tournaments/:championId" element={<TournamentsPage t={t} lang={lang} />} />
        <Route path="/details/:tournamentId" element={<DetailsPage t={t} lang={lang} />} />
        <Route path="/about" element={<AboutPage t={t} />} />
      </Routes>
    </div>
  )
}

export default App
