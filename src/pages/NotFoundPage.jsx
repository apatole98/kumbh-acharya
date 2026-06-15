import React, { useEffect, useState } from 'react'

export default function NotFoundPage({ onNav }) {
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (count <= 0) { onNav?.('landing'); return }
    const id = setTimeout(() => setCount(c => c - 1), 1000)
    return () => clearTimeout(id)
  }, [count, onNav])

  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: '#0f1419',
      fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif",
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', textAlign: 'center',
    }}>
      <div style={{ maxWidth: '480px' }}>
        {/* Decorative glow */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          <div style={{ fontSize: '80px', lineHeight: 1, marginBottom: '8px' }}>🕉</div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        </div>

        <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px', padding: '4px 14px', fontSize: '11px', color: '#d4af37', fontWeight: '700', letterSpacing: '1px', marginBottom: '20px' }}>
          404 — PAGE NOT FOUND
        </div>

        <h1 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: '800', color: '#fff', marginBottom: '14px', lineHeight: 1.2 }}>
          This path leads<br /><span style={{ color: '#d4af37' }}>beyond the sacred realm</span>
        </h1>

        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.7, marginBottom: '36px' }}>
          The page you seek has returned to the cosmic source.<br />
          You will be guided home in <span style={{ color: '#d4af37', fontWeight: '700' }}>{count}</span> seconds.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNav?.('landing')}
            style={{ background: '#d4af37', color: '#0f1419', border: 'none', borderRadius: '10px', padding: '13px 28px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            🏠 Return Home
          </button>
          <button
            onClick={() => onNav?.('chat')}
            style={{ background: 'transparent', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '10px', padding: '13px 28px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            🤖 Chat with AI
          </button>
        </div>

        {/* Quick links */}
        <div style={{ marginTop: '40px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Features', page: 'features' },
            { label: 'Sinhastha 2027', page: 'sinhastha' },
            { label: 'Community', page: 'community' },
            { label: 'About', page: 'about' },
          ].map(({ label, page }) => (
            <button
              key={page}
              onClick={() => onNav?.(page)}
              style={{ background: 'transparent', color: '#64748b', border: '1px solid #2d3748', borderRadius: '20px', padding: '6px 14px', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#d4af37'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#2d3748' }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
