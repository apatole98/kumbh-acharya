import React, { useState } from 'react'

const STEPS = [
  {
    emoji: '🕉',
    title: 'Welcome to Kumbh Acharya',
    body: 'Your AI spiritual guide for the Nashik Simhastha Kumbh Mela 2027. Ask anything — from bathing dates to mantras, rituals to travel tips.',
  },
  {
    emoji: '🌊',
    title: 'Ask in Your Language',
    body: 'Switch between Hindi, English, Marathi, Gujarati, and Bengali anytime. Tap the language flag in the top bar.',
  },
  {
    emoji: '⏰',
    title: 'Time-Based Mantras',
    body: 'Every time of day has a different mantra and ritual. The "Mantra of the Moment" bar shows the right practice for right now.',
  },
  {
    emoji: '⚡',
    title: 'Earn Points & Badges',
    body: 'Every chat earns you points. Complete daily quests, maintain your streak, and climb the leaderboard of pilgrims!',
  },
  {
    emoji: '🆓',
    title: 'Free & Pro Plans',
    body: '3 free spiritual consultations per day on the free plan. Upgrade to Pro (₹99/month) for unlimited guidance.',
  },
]

export default function OnboardingTutorial({ onDone }) {
  const [step, setStep] = useState(0)

  const s = STEPS[step]
  const isLast = step === STEPS.length - 1

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 9999, backdropFilter: 'blur(8px)' }}>
      <div style={{ background: 'linear-gradient(160deg,#1a1f2e,#252d3d)', border: '2px solid rgba(212,175,55,0.35)', borderRadius: '24px', padding: '36px 28px', maxWidth: '380px', width: '100%', textAlign: 'center', boxShadow: '0 24px 64px rgba(0,0,0,0.6)', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

        {/* Step dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ width: i === step ? '20px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === step ? '#d4af37' : i < step ? 'rgba(212,175,55,0.4)' : '#334155', transition: 'all 300ms' }} />
          ))}
        </div>

        <div style={{ fontSize: '56px', marginBottom: '20px' }}>{s.emoji}</div>
        <div style={{ color: '#d4af37', fontSize: '20px', fontWeight: '800', marginBottom: '12px', lineHeight: '1.3' }}>{s.title}</div>
        <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.7', marginBottom: '32px' }}>{s.body}</div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)}
              style={{ flex: 1, background: 'transparent', color: '#64748b', border: '1px solid #334155', borderRadius: '12px', padding: '13px', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.color = '#d4af37' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#64748b' }}>
              ← Back
            </button>
          )}
          <button onClick={() => isLast ? onDone() : setStep(s => s + 1)}
            style={{ flex: 2, background: 'linear-gradient(135deg,#d4af37,#b8962c)', color: '#0f1419', border: 'none', borderRadius: '12px', padding: '13px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 200ms' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            {isLast ? '🙏 Start Your Journey' : 'Next →'}
          </button>
        </div>

        <button onClick={onDone}
          style={{ background: 'transparent', border: 'none', color: '#475569', fontSize: '12px', cursor: 'pointer', marginTop: '16px', fontFamily: 'inherit', padding: '4px 8px' }}>
          Skip tour
        </button>
      </div>
    </div>
  )
}
