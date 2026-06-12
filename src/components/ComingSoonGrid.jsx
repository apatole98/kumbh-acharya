import React, { useState } from 'react'

const FEATURES = [
  {
    icon: '📅',
    title: 'Ritual Calendar',
    desc: 'Personalized auspicious dates for your location — Kumbh Shahi Snan timings, Ekadashi, Pradosh, Purnima, and all major festival reminders with push notifications.',
    eta: 'Q2 2026',
  },
  {
    icon: '🧠',
    title: 'Spiritual Memory',
    desc: 'Kumbh Acharya remembers your past conversations, your preferred rituals, and your spiritual goals — giving you deeply personalized guidance that grows with you.',
    eta: 'Q2 2026',
  },
  {
    icon: '🔔',
    title: 'Daily Mantra Notifications',
    desc: 'Receive a sacred mantra every morning at 6 AM (Brahma Muhurta). Each mantra includes full Sanskrit text, transliteration, meaning, and chanting instructions.',
    eta: 'Next Month',
  },
  {
    icon: '🔭',
    title: 'Kundli & Jyotish Analysis',
    desc: 'Enter your birth details and receive your Vedic birth chart analysis — planetary positions, doshas (Mangal, Kaal Sarp, Pitru), and remedies recommended by Kumbh Acharya.',
    eta: 'Q2 2026',
  },
  {
    icon: '👥',
    title: 'Pilgrim Community',
    desc: 'Connect with thousands of Kumbh pilgrims and spiritual seekers from across India. Share experiences, seek travel companions, and post snan photos from Sangam.',
    eta: 'Q3 2026',
  },
  {
    icon: '🎓',
    title: 'Vedic Learning Paths',
    desc: 'Structured courses on Vedic texts (Upanishads, Bhagavad Gita, Ramayana), Sanskrit mantra pronunciation, and daily spiritual practices — from beginner to advanced.',
    eta: 'Q3 2026',
  },
  {
    icon: '🗺',
    title: 'Kumbh Navigation Map',
    desc: 'Interactive offline map of Kumbh Mela grounds — all 13 Akhara camps, ghats, parking zones, medical camps, lost & found, and safest routes to Triveni Sangam.',
    eta: 'Q3 2026',
  },
  {
    icon: '💬',
    title: 'Live Pandit Consultations',
    desc: 'Book a real-time video or chat session with verified Vedic pandits and certified spiritual advisors for Kundli reading, marriage muhurat, or personal guidance.',
    eta: 'Q4 2026',
  },
  {
    icon: '🎁',
    title: 'Dharma Referral Program',
    desc: 'Earn free Pro days by inviting friends and family. Each referral earns you 7 days of Pro access. Share the Kumbh wisdom — spread dharma, get rewarded.',
    eta: 'Q2 2026',
  },
]

export default function ComingSoonGrid() {
  const [email, setEmail] = useState('')
  const [notified, setNotified] = useState(false)

  const handleNotify = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    const list = JSON.parse(localStorage.getItem('ka_waitlist') || '[]')
    if (!list.includes(email)) list.push(email)
    localStorage.setItem('ka_waitlist', JSON.stringify(list))
    setNotified(true)
    setEmail('')
  }

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '18px',
        marginBottom: '40px',
      }}>
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className={`coming-card anim-fadeup`}
            style={{
              backgroundColor: 'rgba(26,31,46,0.6)',
              border: '1px dashed #3a4557',
              borderRadius: '14px',
              padding: '22px',
              animationDelay: `${i * 0.08}s`,
              position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', top: '14px', right: '14px',
              backgroundColor: 'rgba(212,175,55,0.15)',
              border: '1px solid rgba(212,175,55,0.4)',
              color: '#d4af37', borderRadius: '8px',
              padding: '2px 8px', fontSize: '10px', fontWeight: '700',
            }}>SOON</div>

            <div style={{ fontSize: '30px', marginBottom: '12px' }}>{f.icon}</div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{f.title}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '14px' }}>{f.desc}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>📆 ETA: {f.eta}</div>
          </div>
        ))}
      </div>

      {/* Notify CTA */}
      <div style={{
        backgroundColor: '#1a1f2e',
        border: '1px solid #3a4557',
        borderRadius: '16px',
        padding: '28px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>
          🔔 Get Notified First
        </div>
        <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>
          Be the first to know when new features launch
        </div>
        {notified ? (
          <div style={{ color: '#10b981', fontWeight: '600', fontSize: '14px' }}>
            ✅ You're on the list! We'll notify you soon 🙏
          </div>
        ) : (
          <form onSubmit={handleNotify} style={{ display: 'flex', gap: '10px', maxWidth: '420px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email" placeholder="your@email.com" value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1, minWidth: '200px', padding: '11px 16px',
                backgroundColor: '#252d3d', border: '1px solid #3a4557',
                borderRadius: '8px', fontSize: '13px', outline: 'none',
                color: '#fff', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#d4af37'}
              onBlur={e => e.target.style.borderColor = '#3a4557'}
            />
            <button type="submit" className="cta-btn-gold" style={{
              backgroundColor: '#d4af37', color: '#0f1419', border: 'none',
              borderRadius: '8px', padding: '11px 20px', fontSize: '13px',
              fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}>Notify Me</button>
          </form>
        )}
      </div>
    </div>
  )
}
