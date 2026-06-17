import React, { useEffect } from 'react'
import { addRipple } from '../utils/ripple.js'

export default function DownloadModal({ onClose, onStartWeb }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#1a1f2e',
          border: '1px solid rgba(212,175,55,0.3)',
          borderRadius: '20px',
          padding: '36px 32px',
          maxWidth: '420px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif",
          animation: 'modalIn 0.3s var(--ease)',
        }}
      >
        {/* Top gradient bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, #8b5cf6, #d4af37)', borderRadius: '20px 20px 0 0' }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid #3a4557', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8', fontSize: '14px', fontFamily: 'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8' }}
        >✕</button>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🕉</div>
          <h2 style={{ color: '#fff', fontWeight: '800', fontSize: '22px', marginBottom: '8px' }}>Get Kumbh Acharya</h2>
          <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6 }}>Choose how you want to access your AI spiritual guide</p>
        </div>

        {/* Web app — primary */}
        <button
          className="ripple-host press-fx glow-gold-lg"
          onMouseDown={addRipple}
          onClick={() => { onClose(); onStartWeb?.() }}
          style={{
            width: '100%', background: 'linear-gradient(135deg, #d4af37, #b8962e)', color: '#0f1419',
            border: 'none', borderRadius: '12px', padding: '16px 20px',
            fontSize: '15px', fontWeight: '800', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '12px', fontFamily: 'inherit', transition: 'opacity 0.2s, box-shadow 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <span style={{ fontSize: '24px' }}>🌐</span>
          <div style={{ textAlign: 'left' }}>
            <div>Use Web App — Start Now</div>
            <div style={{ fontSize: '11px', fontWeight: '600', opacity: 0.7 }}>No install needed • Free forever</div>
          </div>
        </button>

        {/* Mobile — coming soon */}
        {[
          { icon: '📱', label: 'iOS App Store', sub: 'Coming Q3 2026', disabled: true },
          { icon: '🤖', label: 'Android Play Store', sub: 'Coming Q3 2026', disabled: true },
        ].map((opt, i) => (
          <button
            key={i}
            disabled={opt.disabled}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.03)',
              border: '1px solid #2d3748', borderRadius: '12px',
              padding: '14px 20px', marginBottom: '10px',
              display: 'flex', alignItems: 'center', gap: '12px',
              cursor: opt.disabled ? 'default' : 'pointer',
              fontFamily: 'inherit', opacity: opt.disabled ? 0.5 : 1,
            }}
          >
            <span style={{ fontSize: '22px' }}>{opt.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: '#cbd5e1', fontWeight: '600', fontSize: '14px' }}>{opt.label}</div>
              <div style={{ color: '#475569', fontSize: '11px' }}>{opt.sub}</div>
            </div>
            {opt.disabled && (
              <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.06)', color: '#64748b', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px' }}>SOON</span>
            )}
          </button>
        ))}

        <div style={{ marginTop: '20px', padding: '14px', background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>🔱 FREE PLAN INCLUDES</div>
          <div style={{ color: '#94a3b8', fontSize: '12px' }}>3 chats/day • All 5 languages • Community access</div>
        </div>
      </div>
    </div>
  )
}
