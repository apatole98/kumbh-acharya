import React, { useState } from 'react'

const pillars = [
  {
    icon: '🤖',
    color: '#8b5cf6',
    colorBg: 'rgba(139,92,246,0.08)',
    colorBorder: 'rgba(139,92,246,0.2)',
    title: 'AI Spiritual Guide',
    subtitle: 'Ancient wisdom, instant answers',
    desc: 'Ask any question about Vedic rituals, mantras, pilgrimage routes, or sacred texts — and receive thoughtful, scripture-backed answers in seconds. Available in 5 languages, 24/7.',
    benefits: [
      'Personalized mantra recommendations',
      'Puja vidhi step-by-step guidance',
      'Kumbh Mela snan timing & ghats',
      'Sanskrit explanations in your language',
    ],
    cta: 'Try AI Guide',
    page: 'chat',
  },
  {
    icon: '🏆',
    color: '#d4af37',
    colorBg: 'rgba(212,175,55,0.08)',
    colorBorder: 'rgba(212,175,55,0.2)',
    title: 'Gamified Dharma',
    subtitle: 'Make your spiritual practice a habit',
    desc: 'Earn Dharma Points for every spiritual conversation, complete quests aligned with sacred festivals, unlock badges, and climb the pilgrim leaderboard — turning learning into a joyful daily ritual.',
    benefits: [
      'Daily quests tied to real festivals',
      '40+ spiritual achievement badges',
      'Pilgrim leaderboard & streaks',
      'Points → real Kumbh discounts',
    ],
    cta: 'Explore Gamification',
    page: 'gamification',
  },
  {
    icon: '🕌',
    color: '#10b981',
    colorBg: 'rgba(16,185,129,0.08)',
    colorBorder: 'rgba(16,185,129,0.2)',
    title: 'Pilgrim Community',
    subtitle: 'Journey together, grow together',
    desc: 'Connect with fellow pilgrims planning Nashik Simhastha 2027. Share experiences, seek advice, post photos from sacred sites, and build lifelong spiritual friendships.',
    benefits: [
      'Forum posts & spiritual discussions',
      'Direct messaging with pilgrims',
      'Trip planning & buddy-finding',
      'Share blessings & sacred moments',
    ],
    cta: 'Join Community',
    page: 'community',
  },
]

export default function ThreePillars({ onNav }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px', padding: '5px 16px', fontSize: '12px', color: '#d4af37', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
          THREE PILLARS OF KUMBH ACHARYA
        </div>
        <h2 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: '800', color: '#fff', marginBottom: '12px', lineHeight: 1.2 }}>
          Everything you need for<br /><span style={{ color: '#d4af37' }}>your Kumbh journey</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '500px', margin: '0 auto' }}>
          Three powerful pillars work together to transform how you experience Nashik Simhastha 2027
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {pillars.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === i ? p.colorBg : '#1a1f2e',
              border: `1px solid ${hovered === i ? p.colorBorder : '#2d3748'}`,
              borderRadius: '16px',
              padding: '32px 28px',
              transition: 'all 0.3s ease',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* accent top bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(to right, ${p.color}, transparent)`, opacity: hovered === i ? 1 : 0.3, transition: 'opacity 0.3s' }} />

            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{p.icon}</div>
            <div style={{ color: p.color, fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '8px' }}>{p.subtitle.toUpperCase()}</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', marginBottom: '14px' }}>{p.title}</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>{p.desc}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
              {p.benefits.map((b, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: p.color, marginTop: '2px', fontSize: '12px' }}>✓</span>
                  <span style={{ color: '#cbd5e1', fontSize: '13px' }}>{b}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNav?.(p.page)}
              style={{
                background: hovered === i ? p.color : 'transparent',
                color: hovered === i ? '#0f1419' : p.color,
                border: `1px solid ${p.color}`,
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
                width: '100%',
              }}
            >
              {p.cta} →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
