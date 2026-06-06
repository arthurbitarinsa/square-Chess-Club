import { Link } from 'react-router-dom'

function Navbar({ t, lang, setLang, theme, setTheme }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="chess-icon">♟</span>
        <span className="brand-name">The Square</span>
      </div>
      <div className="nav-links">
        <Link to="/">{t('nav_home')}</Link>
        <Link to="/about">{t('nav_about')}</Link>
      </div>
      <div className="nav-controls">
        <div className="lang-switcher">
          {['en', 'fr', 'nl'].map(l => (
            <button key={l} onClick={() => setLang(l)} className={`lang-btn ${lang === l ? 'active' : ''}`}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <button className="theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
