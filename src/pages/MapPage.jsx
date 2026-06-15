import React from 'react'
import KumbhMap from '../components/KumbhMap.jsx'
import Footer from '../components/Footer.jsx'

export default function MapPage({ onNav }) {
  return (
    <div style={{ backgroundColor: '#0f1419', minHeight: '100dvh', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* Sticky Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: 'rgba(15,20,25,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #2d3748',
        padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => onNav?.('landing')}
            style={{ backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid #3a4557', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#d4af37'; e.currentTarget.style.borderColor = '#d4af37' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#3a4557' }}
          >
            ← Back
          </button>
          <span style={{ fontSize: '22px' }}>🕉</span>
          <span style={{ fontWeight: '700', color: '#d4af37', fontSize: '15px' }}>Kumbh Acharya</span>
        </div>
        <button
          onClick={() => onNav?.('sinhastha')}
          style={{ backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '8px', padding: '8px 16px', color: '#d4af37', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.18)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.1)'}
        >
          🚩 Sinhastha Guide
        </button>
      </nav>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, #0f1419 0%, #0a1020 50%, #0f1419 100%)',
        padding: '56px 24px 48px',
        borderBottom: '1px solid #2d3748',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px', padding: '4px 14px', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12px' }}>📍</span>
              <span style={{ color: '#d4af37', fontSize: '11px', fontWeight: '700', letterSpacing: '1px' }}>INTERACTIVE MAP</span>
            </div>
            <div style={{ display: 'inline-flex', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '20px', padding: '4px 14px', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#10b981', fontSize: '11px', fontWeight: '700' }}>5 Sacred Sites</span>
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(24px,5vw,42px)', fontWeight: '800', color: '#fff', lineHeight: 1.2, marginBottom: '12px' }}>
            Sinhastha 2027<br /><span style={{ color: '#d4af37' }}>Sacred Locations</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.7, maxWidth: '520px' }}>
            Explore the holy sites of Nashik-Trimbakeshwar Kumbh Mela 2027. Click any location to view it on the map and get pilgrimage tips.
          </p>
        </div>
      </section>

      {/* Map section */}
      <section style={{ padding: '40px 24px 60px', maxWidth: '960px', margin: '0 auto' }}>
        <KumbhMap onNav={onNav} />
      </section>

      {/* Quick info strip */}
      <section style={{ backgroundColor: '#111827', borderTop: '1px solid #2d3748', borderBottom: '1px solid #2d3748', padding: '32px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Shahi Snan Locations 2027</h2>
            <p style={{ color: '#64748b', fontSize: '13px' }}>Which ghat, which date, which akhara</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            {[
              { date: 'Aug 2, 2027', site: 'Ramkund, Nashik', event: 'First Snan (Shravan Somvar)', color: '#60a5fa' },
              { date: 'Aug 31, 2027 ★', site: 'Ramkund, Nashik', event: 'Raksha Bandhan — Most Auspicious', color: '#d4af37' },
              { date: 'Sep 11, 2027', site: 'Ganga Ghat, Nashik', event: 'Vaishnava Snan (Ganesh Chaturthi)', color: '#10b981' },
              { date: 'Sep 12, 2027', site: 'Kushavarta, Trimbak', event: 'Shaiva Snan (Trimbakeshwar)', color: '#8b5cf6' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#1a1f2e', border: `1px solid ${s.color}30`, borderLeft: `3px solid ${s.color}`, borderRadius: '12px', padding: '14px 16px' }}>
                <div style={{ color: s.color, fontWeight: '800', fontSize: '13px', marginBottom: '4px' }}>{s.date}</div>
                <div style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>{s.event}</div>
                <div style={{ color: '#475569', fontSize: '11px' }}>📍 {s.site}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ fontSize: '36px', marginBottom: '14px' }}>🕉</div>
          <h2 style={{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
            Plan your <span style={{ color: '#d4af37' }}>Kumbh Yatra</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '28px', lineHeight: 1.7 }}>
            Ask Kumbh Acharya AI anything about these sacred sites — rituals, best time to visit, how to reach, what to carry.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNav?.('chat')}
              style={{ background: '#d4af37', color: '#0f1419', border: 'none', borderRadius: '10px', padding: '13px 28px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              🤖 Ask AI Guide
            </button>
            <button
              onClick={() => onNav?.('sinhastha')}
              style={{ background: 'transparent', color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '10px', padding: '13px 28px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              🚩 Full Sinhastha Guide
            </button>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  )
}
