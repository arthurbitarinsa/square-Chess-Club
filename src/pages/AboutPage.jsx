import { useNavigate } from 'react-router-dom'

function AboutPage({ t }) {
  const navigate = useNavigate()

  const sponsors = [
    { key: 'sp1', logo: '♛', tier: 'Gold' },
    { key: 'sp2', logo: '♜', tier: 'Gold' },
    { key: 'sp3', logo: '♝', tier: 'Silver' },
    { key: 'sp4', logo: '♞', tier: 'Silver' },
    { key: 'sp5', logo: '♟', tier: 'Bronze' },
    { key: 'sp6', logo: '♔', tier: 'Bronze' }
  ]

  const values = [
    { icon: '♟', titleKey: 'val1_title', descKey: 'val1_desc' },
    { icon: '♜', titleKey: 'val2_title', descKey: 'val2_desc' },
    { icon: '♞', titleKey: 'val3_title', descKey: 'val3_desc' },
    { icon: '♝', titleKey: 'val4_title', descKey: 'val4_desc' }
  ]

  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/')}>{t('back')}</button>
        <h1>{t('about_title')}</h1>
      </div>

      <div className="about-hero">
        <div className="about-hero-content">
          <span className="about-crown">♚</span>
          <h2>{t('about_tagline')}</h2>
          <p>{t('about_intro')}</p>
        </div>
      </div>

      <div className="section">
        <div className="about-mission">
          <h2>{t('mission_title')}</h2>
          <p className="mission-text">{t('mission_text')}</p>
        </div>

        <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>{t('values_title')}</h2>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card">
              <span className="value-icon">{v.icon}</span>
              <h3>{t(v.titleKey)}</h3>
              <p>{t(v.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="facts-strip">
          <div className="fact"><span className="fact-number">95+</span><span className="fact-label">{t('fact_members')}</span></div>
          <div className="fact"><span className="fact-number">9</span><span className="fact-label">{t('fact_tournaments')}</span></div>
          <div className="fact"><span className="fact-number">7</span><span className="fact-label">{t('fact_victories')}</span></div>
          <div className="fact"><span className="fact-number">3</span><span className="fact-label">{t('fact_languages')}</span></div>
          <div className="fact"><span className="fact-number">2015</span><span className="fact-label">{t('fact_founded')}</span></div>
        </div>

        <h2 style={{ marginTop: '3rem', marginBottom: '0.5rem' }}>{t('sponsors_title')}</h2>
        <p className="subtitle">{t('sponsors_subtitle')}</p>
        <div className="sponsors-grid">
          {sponsors.map((s, i) => (
            <div key={i} className={`sponsor-card tier-${s.tier.toLowerCase()}`}>
              <div className="sponsor-logo">{s.logo}</div>
              <div className="sponsor-info">
                <div className="sponsor-header">
                  <h3>{t(`${s.key}_name`)}</h3>
                  <span className={`tier-badge ${s.tier.toLowerCase()}`}>{s.tier}</span>
                </div>
                <p>{t(`${s.key}_desc`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-box">
          <h2>{t('contact_title')}</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div><strong>{t('contact_address_label')}</strong><p>{t('contact_address')}</p></div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕐</span>
              <div><strong>{t('contact_hours_label')}</strong><p>{t('contact_hours')}</p></div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div><strong>{t('contact_email_label')}</strong><p>{t('contact_email')}</p></div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🌐</span>
              <div><strong>{t('contact_web_label')}</strong><p>{t('contact_web')}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
