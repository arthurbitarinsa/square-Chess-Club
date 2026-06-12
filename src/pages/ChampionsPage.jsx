// ChampionsPage.jsx

// useState stores the champions data, useEffect runs fetch automatically
import { useState, useEffect } from 'react'
// useNavigate allows us to change page programmatically
import { useNavigate } from 'react-router-dom'

// t = translation function, lang = current language (en/fr/nl)
function ChampionsPage({ t, lang }) {
  // champions state: will store the array of 20 champions from JSON
  const [champions, setChampions] = useState([])
  
  // navigate: function to go to another page
  const navigate = useNavigate()

  // Runs once when page loads - fetches the champions JSON file
  useEffect(() => {
    fetch('/src/data/champions.json') // HTTP request to get the JSON file
      .then(r => r.json())            // converts response to JavaScript object
      .then(data => setChampions(data)) // stores array of champions in state
  }, []) // empty [] means: only run once when page first loads

  return (
    <div className="page">
      <div className="hero">
        <h1>{t('hero_title')}</h1>       {/* translated title */}
        <p>{t('hero_subtitle')}</p>       {/* translated subtitle */}
        <span className="hero-piece">♔</span>
      </div>
      <div className="section">
        <h2>{t('champions_title')}</h2>
        <p className="subtitle">{t('champions_subtitle')}</p>
        <div className="cards-grid">
          {/* Loop through all 20 champions and create a card for each */}
          {champions.map(champion => (
            <div 
              key={champion.id}          // unique key required by React
              className="card" 
              // When clicked: navigate to tournaments page with champion's ID in URL
              onClick={() => navigate(`/tournaments/${champion.id}`)}
            >
              <div className="card-avatar">
                <img
                  src={champion.photo}
                  alt={champion.name}
                  // If photo fails to load: hide image, show letter fallback
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                {/* Fallback: shows first letter of name if photo doesn't load */}
                <span className="avatar-fallback" style={{ display: 'none' }}>
                  {champion.name[0]}
                </span>
              </div>
              <div className="card-info">
                <h3>{champion.name}</h3>
                {/* Uses lang to pick the right language field from JSON */}
                <p className="card-title">{champion[`title_${lang}`]}</p>
                <div className="card-stats">
                  <span>🌍 {champion[`country_${lang}`]}</span>
                  <span>⭐ {champion.rating}</span>
                  <span>📅 {t('born')} {champion.born}</span>
                </div>
                {/* Bio is also language-aware: bio_en, bio_fr or bio_nl */}
                <p className="card-bio">{champion[`bio_${lang}`]}</p>
                <button className="btn">{t('view_tournaments')}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChampionsPage