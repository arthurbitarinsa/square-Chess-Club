// Navbar.jsx

// Link is like <a> tag but without page reload - managed by React Router
import { Link } from 'react-router-dom'

// Receives all these props from App.jsx
function Navbar({ t, lang, setLang, theme, setTheme }) {
  return (
    <nav className="navbar">
      {/* Clicking the logo goes back to home page */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        {/* SVG logo with chessboard design */}
        <svg>...</svg>
      </Link>

      <div className="nav-links">
        {/* Link to home page */}
        <Link to="/">{t('nav_home')}</Link>
        {/* Link to about page */}
        <Link to="/about">{t('nav_about')}</Link>
      </div>

      <div className="nav-controls">
        <div className="lang-switcher">
          {/* Loop through 3 languages and create a button for each */}
          {['en', 'fr', 'nl'].map(l => (
            <button
              key={l}
              // When clicked: calls setLang in App.jsx which triggers translation fetch
              onClick={() => setLang(l)}
              // Adds 'active' class to currently selected language button
              className={`lang-btn ${lang === l ? 'active' : ''}`}
            >
              {l.toUpperCase()} {/* displays EN, FR or NL */}
            </button>
          ))}
        </div>

        {/* Theme toggle button - switches between dark and light */}
        <button
          className="theme-btn"
          // If dark: switch to light. If light: switch to dark
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {/* Shows sun emoji in dark mode, moon in light mode */}
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar