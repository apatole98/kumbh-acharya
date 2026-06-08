import React, { useState } from 'react'

const FEATURES = [
  { icon: '🧠', title: 'Memory Saver', desc: 'Remembers your previous conversations and spiritual journey' },
  { icon: '🎁', title: 'Referral Program', desc: 'Earn free Pro days by inviting friends on the path' },
  { icon: '📅', title: 'Ritual Calendar', desc: 'Personalized auspicious dates, festivals, and Kumbh snan timings' },
  { icon: '🕌', title: 'Pilgrim Community', desc: 'Connect with other Kumbh Mela pilgrims and seekers' },
  { icon: '📿', title: 'Vedic Learning Path', desc: 'Structured courses on Vedic texts, mantras, and philosophy' },
  { icon: '🎧', title: 'Live Support', desc: 'Chat with real pandits and spiritual advisors' },
]

export default function ComingSoonSection() {
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{
            backgroundColor: '#fff', border: '1px solid #e5e7eb',
            borderRadius: '12px', padding: '20px',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ fontSize: '28px', marginBottom: '10px' }}>{f.icon}</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937', marginBottom: '6px' }}>{f.title}</div>
            <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.5' }}>{f.desc}</div>
            <div style={{
              display: 'inline-block', marginTop: '10px',
              backgroundColor: '#f3f0ff', color: '#8b5cf6',
              borderRadius: '6px', padding: '2px 8px', fontSize: '11px', fontWeight: '600',
            }}>Coming Soon</div>
          </div>
        ))}
      </div>

      {/* Notify me */}
      <div style={{ backgroundColor: '#f3f0ff', borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '6px' }}>
          🔔 Get Notified When These Launch
        </div>
        <div style={{ color: '#6b7280', fontSize: '13px', marginBottom: '16px' }}>
          Be the first to know about new features
        </div>
        {notified ? (
          <div style={{ color: '#8b5cf6', fontWeight: '600', fontSize: '14px' }}>
            ✅ You're on the list! We'll notify you soon 🙏
          </div>
        ) : (
          <form onSubmit={handleNotify} style={{ display: 'flex', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
            <input
              type="email" placeholder="your@email.com" value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1, padding: '10px 14px', border: '1px solid #e5e7eb',
                borderRadius: '8px', fontSize: '13px', outline: 'none',
                backgroundColor: '#fff', color: '#1f2937',
              }}
            />
            <button type="submit" style={{
              backgroundColor: '#8b5cf6', color: '#fff', border: 'none',
              borderRadius: '8px', padding: '10px 16px', fontSize: '13px',
              fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap',
            }}>Notify Me</button>
          </form>
        )}
      </div>
    </div>
  )
}
