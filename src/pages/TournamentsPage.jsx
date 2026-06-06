import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function TournamentsPage({ t }) {
  const [tournaments, setTournaments] = useState([])
  const [champion, setChampion] = useState(null)
  const { championId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/src/data/champions.json')
      .then(r => r.json())
      .then(data => setChampion(data.find(c => c.id === parseInt(championId))))

    fetch('/src/data/tournaments.json')
      .then(r => r.json())
      .then(data => setTournaments(data.filter(t => t.championId === parseInt(championId))))
  }, [championId])

  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>{t('back')}</button>
        {champion && <h1>{champion.name} — {t('tournaments_title')}</h1>}
      </div>
      <div className="section">
        <div className="cards-grid">
          {tournaments.map(tour => (
            <div key={tour.id} className="card tournament-card" onClick={() => navigate(`/details/${tour.id}`)}>
              <div className="tournament-year">♟ {tour.year}</div>
              <h3>{tour.name}</h3>
              <div className="card-stats">
                <span>📍 {tour.location}</span>
                <span>🏆 {tour.result}</span>
                <span>🎯 {t('score')}: {tour.score}</span>
              </div>
              <button className="btn">{t('view_details')}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TournamentsPage
