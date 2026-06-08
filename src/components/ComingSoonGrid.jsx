import React, { useState } from 'react'

const FEATURES = [
  { icon: '🧠', title: 'Memory Saver', desc: 'Turn your spiritual journey into AI-generated stories and a shareable digital album.', eta: 'Next Month' },
  { icon: '🎁', title: 'Referral Program', desc: 'Earn free Pro days by inviting friends. Spread dharma, get rewarded.', eta: 'Q2 2026' },
  { icon: '📅', title: 'Ritual Calendar', desc: 'Personalized auspicious dates, Kumbh snan timings, and festival reminders.', eta: 'Q2 2026' },
  { icon: '👥', title: 'Community Forum', desc: 'Connect with thousands of pilgrims and seekers from across India.', eta: 'Q3 2026' },
  { icon: '🎓', title: 'Vedic Learning', desc: 'Structured courses on Vedic texts, Sanskrit mantras, and ancient philosophy.', eta: 'Q3 2026' },
  { icon: '💬', title: 'Live Chat Support', desc: 'Chat with real pandits and certified spiritual advisors for personal guidance.', eta: 'Q4 2026' },
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
