import React from 'react'
import SinhasthCountdown from './SinhasthCountdown.jsx'

export default function Footer({ onNav }) {
  const link = (label, page) => (
    <button onClick={() => onNav?.(page)}
      style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '13px', cursor: 'pointer', padding: '4px 0', fontFamily: 'inherit', transition: 'color 200ms' }}
      onMouseEnter={e => e.currentTarget.style.color = '#d4af37'}
      onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
      {label}
    </button>
  )

  return (
    <footer style={{ backgroundColor: '#0a0d14', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '48px 24px 32px', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Countdown banner */}
        <div style={{ marginBottom: '36px' }}>
          <SinhasthCountdown />
        </div>

        {/* Brand row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginBottom: '40px' }}>
          <div style={{ flex: '1 1 220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '28px' }}>🕉</span>
              <div>
                <div style={{ color: '#d4af37', fontWeight: '800', fontSize: '16px' }}>Kumbh Acharya</div>
                <div style={{ color: '#475569', fontSize: '11px', letterSpacing: '1.5px' }}>NASHIK SIMHASTHA 2027</div>
              </div>
            </div>
            <div style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.7' }}>
              AI spiritual guide for Nashik-Trimbakeshwar Kumbh Mela 2027 pilgrims. Vedic wisdom, accessible anytime.
            </div>
          </div>

          <div style={{ flex: '1 1 140px' }}>
            <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '14px' }}>QUICK LINKS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {link('Features', 'features')}
              {link('Gamification', 'gamification')}
              {link('Community', 'community')}
              {link('Leaderboard', 'leaderboard')}
            </div>
          </div>

          <div style={{ flex: '1 1 140px' }}>
            <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '14px' }}>SINHASTHA</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {link('🚩 Sinhastha Guide', 'sinhastha')}
              {link('Shahi Snan Dates', 'sinhastha')}
              {link('Sacred Locations', 'sinhastha')}
              {link('Pilgrim Guide', 'sinhastha')}
            </div>
          </div>

          <div style={{ flex: '1 1 140px' }}>
            <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '14px' }}>COMPANY</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {link('About Us', 'about')}
              {link('Contact', 'contact')}
              {link('Terms of Service', 'terms')}
              {link('Privacy Policy', 'privacy')}
            </div>
          </div>

          <div style={{ flex: '1 1 160px' }}>
            <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '14px' }}>SHAHI SNAN 2027</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { date: '2 Aug', label: 'First Snan' },
                { date: '31 Aug', label: '★ Most Auspicious' },
                { date: '11 Sep', label: 'Vaishnava (Nashik)' },
                { date: '12 Sep', label: 'Shaiva (Trimbak)' },
              ].map(({ date, label }) => (
                <div key={date} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ color: '#d4af37', fontSize: '12px', fontWeight: '700', minWidth: '44px' }}>{date}</span>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: '#334155', fontSize: '12px' }}>
            © 2026–2027 Kumbh Acharya. जय गोदावरी माँ 🙏
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '6px', padding: '3px 10px', color: '#d4af37', fontSize: '11px', fontWeight: '700' }}>
              🔱 FREE PLAN: 3 chats/day
            </div>
            <div style={{ background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '6px', padding: '3px 10px', color: '#d4af37', fontSize: '11px', fontWeight: '700' }}>
              ⭐ PRO: ₹99/month
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
