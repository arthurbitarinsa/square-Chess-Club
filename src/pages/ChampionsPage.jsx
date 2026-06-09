import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ChampionsPage({ t, lang }) {
  const [champions, setChampions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/src/data/champions.json')
      .then(r => r.json())
      .then(data => setChampions(data))
  }, [])

  const getProxiedPhoto = (url) => {
    if (!url) return null
    return url.replace('https://upload.wikimedia.org', '/wiki-img')
  }

  return (
    <div className="page">
      <div className="hero">
        <h1>{t('hero_title')}</h1>
        <p>{t('hero_subtitle')}</p>
        <span className="hero-piece">♔</span>
      </div>
      <div className="section">
        <h2>{t('champions_title')}</h2>
        <p className="subtitle">{t('champions_subtitle')}</p>
        <div className="cards-grid">
          {champions.map(champion => (
            <div key={champion.id} className="card" onClick={() => navigate(`/tournaments/${champion.id}`)}>
              <div className="card-avatar">
                <img
                  src={getProxiedPhoto(champion.photo)}
                  alt={champion.name}
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <span className="avatar-fallback" style={{ display: 'none' }}>
                  {champion.name[0]}
                </span>
              </div>
              <div className="card-info">
                <h3>{champion.name}</h3>
                <p className="card-title">{champion[`title_${lang}`]}</p>
                <div className="card-stats">
                  <span>🌍 {champion[`country_${lang}`]}</span>
                  <span>⭐ {champion.rating}</span>
                  <span>📅 {t('born')} {champion.born}</span>
                </div>
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
