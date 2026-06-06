import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function DetailsPage({ t }) {
  const [tournament, setTournament] = useState(null)
  const [champion, setChampion] = useState(null)
  const [stats, setStats] = useState([])
  const { tournamentId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/src/data/tournaments.json')
      .then(r => r.json())
      .then(data => {
        const tour = data.find(t => t.id === parseInt(tournamentId))
        setTournament(tour)
        if (tour) {
          fetch('/src/data/champions.json')
            .then(r => r.json())
            .then(champs => setChampion(champs.find(c => c.id === tour.championId)))
        }
      })

    fetch('/src/data/clubstats.json')
      .then(r => r.json())
      .then(data => setStats(data))
  }, [tournamentId])

  if (!tournament) return <div className="loading">Loading...</div>

  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>{t('back')}</button>
        <h1>{t('details_title')}</h1>
      </div>

      <div className="section">
        <div className="detail-card">
          <h2>{tournament.name}</h2>
          {champion && <p className="champion-name">♟ {champion.name}</p>}
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">{t('location')}</span>
              <span className="detail-value">📍 {tournament.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">{t('year')}</span>
              <span className="detail-value">📅 {tournament.year}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">{t('result')}</span>
              <span className="detail-value">🏆 {tournament.result}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">{t('rounds')}</span>
              <span className="detail-value">🎯 {tournament.rounds}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">{t('score')}</span>
              <span className="detail-value">⭐ {tournament.score}</span>
            </div>
          </div>
        </div>

        <h2 className="stats-heading">{t('stats_title')}</h2>
        <div className="table-wrapper">
          <table className="stats-table">
            <thead>
              <tr>
                <th>{t('stat_year')}</th>
                <th>{t('stat_members')}</th>
                <th>{t('stat_tournaments')}</th>
                <th>{t('stat_wins')}</th>
                <th>{t('stat_revenue')}</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(row => (
                <tr key={row.year}>
                  <td>{row.year}</td>
                  <td>{row.members}</td>
                  <td>{row.tournaments}</td>
                  <td>{row.wins}</td>
                  <td>€{row.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DetailsPage
