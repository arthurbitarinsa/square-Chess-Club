// App.jsx

// Import React hooks - useState stores data, useEffect runs code automatically
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Import all pages and components
import Navbar from './components/Navbar'
import ChampionsPage from './pages/ChampionsPage'
import TournamentsPage from './pages/TournamentsPage'
import DetailsPage from './pages/DetailsPage'
import AboutPage from './pages/AboutPage'

function App() {
  // lang state: stores current language, checks localStorage first, defaults to 'en'
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en')
  
  // theme state: stores current theme (dark/light), checks localStorage first
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  
  // translations state: stores all the translated text for the current language
  const [translations, setTranslations] = useState({})

  // This runs every time 'lang' changes - fetches the correct translation JSON file
  useEffect(() => {
    fetch(`/src/data/translations/${lang}.json`) // fetches en.json, fr.json or nl.json
      .then(r => r.json())                        // converts response to JavaScript object
      .then(data => setTranslations(data))        // stores translations in state
  }, [lang]) // [lang] means: re-run this when lang changes

  // This runs every time 'lang' changes - saves language preference to localStorage
  useEffect(() => {
    localStorage.setItem('lang', lang)  // saves so it survives page refresh
    document.body.className = theme     // applies dark or light class to body
  }, [lang])

  // This runs every time 'theme' changes - saves theme and applies it to the page
  useEffect(() => {
    localStorage.setItem('theme', theme) // saves theme preference to localStorage
    document.body.className = theme      // switches body class between 'dark' and 'light'
  }, [theme])

  // t() is the translation function - takes a key and returns the translated text
  // example: t('nav_home') returns "Champions" in EN, "Kampioenen" in NL
  const t = (key) => translations[key] || key

  return (
    <div className={`app ${theme}`}>
      {/* Navbar receives lang, setLang, theme, setTheme and t as props */}
      <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <Routes>
        {/* Route 1: home page - shows all champions */}
        <Route path="/" element={<ChampionsPage t={t} lang={lang} />} />
        
        {/* Route 2: tournaments page - :championId is a URL parameter */}
        <Route path="/tournaments/:championId" element={<TournamentsPage t={t} lang={lang} />} />
        
        {/* Route 3: details page - :tournamentId is a URL parameter */}
        <Route path="/details/:tournamentId" element={<DetailsPage t={t} lang={lang} />} />
        
        {/* Route 4: about page */}
        <Route path="/about" element={<AboutPage t={t} />} />
      </Routes>
    </div>
  )
}

export default App