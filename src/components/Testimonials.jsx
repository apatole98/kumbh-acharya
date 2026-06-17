import React, { useState, useEffect } from 'react'
import Reveal from './Reveal.jsx'

const testimonials = [
  {
    name: 'Ramesh Sharma',
    location: 'Varanasi, UP',
    avatar: '🙏',
    rating: 5,
    badge: 'Pro Pilgrim',
    text: 'Kumbh Acharya ne mujhe Trimbakeshwar ki poori vidhi samjhai jo mujhe koi pandit bhi nahi samjha paya tha. Nashik Kumbh 2027 ki taiyari is app ke bina adhoori hai.',
    hindiText: true,
    stat: '15 questions asked',
  },
  {
    name: 'Priya Mehta',
    location: 'Ahmedabad, Gujarat',
    avatar: '🌸',
    rating: 5,
    badge: 'Spiritual Seeker',
    text: 'I was overwhelmed planning my first Kumbh. The AI guide walked me through every Shahi Snan date, what to carry, which ghat to visit — all in Gujarati! Incredible.',
    hindiText: false,
    stat: 'Trip fully planned via AI',
  },
  {
    name: 'Vikram Patil',
    location: 'Pune, Maharashtra',
    avatar: '🔱',
    rating: 5,
    badge: 'Daily Devotee',
    text: 'I ask Kumbh Acharya a question every morning before my puja. It explains the mantras clearly and my kids enjoy learning the meanings too!',
    hindiText: false,
    stat: '40+ days of daily guidance',
  },
  {
    name: 'Anita Joshi',
    location: 'Nashik, Maharashtra',
    avatar: '🪷',
    rating: 5,
    badge: 'Local Guide',
    text: 'Being from Nashik, I thought I knew everything about Simhastha. But the app taught me historical facts and muhurtas I never knew. The community is also amazing — met my yatra companions here!',
    hindiText: false,
    stat: '3 pilgrim friends found',
  },
  {
    name: 'Suresh Agarwal',
    location: 'Indore, MP',
    avatar: '🌺',
    rating: 5,
    badge: 'Sanskrit Scholar',
    text: 'Jo Sanskrit shlokas mujhe school mein samajh nahi aate the, aaj AI Acharya ki madad se unka arth aur mahatva dono pata chal gaya. Sacchi digital gurukul hai yeh!',
    hindiText: true,
    stat: '30+ shlokas explained',
  },
  {
    name: 'Kavitha Nair',
    location: 'Kochi, Kerala',
    avatar: '🌟',
    rating: 5,
    badge: 'Community Star',
    text: 'Even as a South Indian Hindu, the app made me feel completely at home with Nashik Kumbh traditions. The multilingual support and the welcoming community made planning so easy.',
    hindiText: false,
    stat: '89 community posts',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000)
    return () => clearInterval(id)
  }, [])

  const t = testimonials[active]

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px', padding: '5px 16px', fontSize: '12px', color: '#d4af37', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
          PILGRIM STORIES
        </div>
        <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>
          Thousands of pilgrims trust<br /><span style={{ color: '#d4af37' }}>Kumbh Acharya</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Real stories from real spiritual seekers across India</p>
      </div>

      {/* Featured testimonial */}
      <Reveal as="div" direction="scale" className="glow-gold-lg" style={{
        background: 'linear-gradient(135deg, #1a1f2e 0%, #12172a 100%)',
        border: '1px solid rgba(212,175,55,0.2)',
        borderRadius: '20px',
        padding: '40px',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '220px',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />
        <div style={{ fontSize: '60px', color: 'rgba(212,175,55,0.08)', position: 'absolute', top: '20px', left: '24px', fontFamily: 'serif', lineHeight: 1 }}>"</div>

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '2px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
              {t.avatar}
            </div>
            <div>
              <div style={{ fontWeight: '800', color: '#fff', fontSize: '15px' }}>{t.name}</div>
              <div style={{ color: '#64748b', fontSize: '12px' }}>{t.location}</div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '4px', alignItems: 'center' }}>
                <span style={{ color: '#d4af37', fontSize: '12px' }}>{'★'.repeat(t.rating)}</span>
                <span style={{ background: 'rgba(212,175,55,0.15)', color: '#d4af37', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '10px' }}>{t.badge}</span>
              </div>
            </div>
          </div>

          <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '16px' }}>
            "{t.text}"
          </p>

          <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: '600' }}>
            📊 {t.stat}
          </div>
        </div>
      </Reveal>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === active ? '#d4af37' : '#3a4557',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {/* Grid preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {testimonials.slice(0, 3).map((t, i) => (
          <Reveal as="div" key={i} direction="up" delay={i * 100}
            className="card-hover"
            onClick={() => setActive(i)}
            style={{
              background: active === i ? 'rgba(212,175,55,0.06)' : '#1a1f2e',
              border: `1px solid ${active === i ? 'rgba(212,175,55,0.25)' : '#2d3748'}`,
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '20px' }}>{t.avatar}</span>
              <div>
                <div style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '700' }}>{t.name}</div>
                <div style={{ color: '#475569', fontSize: '11px' }}>{t.location}</div>
              </div>
            </div>
            <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.6 }}>
              "{t.text.slice(0, 90)}..."
            </p>
          </Reveal>
        ))}
      </div>

      {/* Social proof numbers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', marginTop: '48px', padding: '32px', background: '#1a1f2e', borderRadius: '16px', border: '1px solid #2d3748', textAlign: 'center' }}>
        {[
          { num: '50,000+', label: 'Pilgrims Guided' },
          { num: '4.9★', label: 'Average Rating' },
          { num: '12 Lakh+', label: 'Mantras Explained' },
          { num: '5', label: 'Languages Supported' },
        ].map((s, i) => (
          <Reveal as="div" key={i} direction="scale" delay={i * 90}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#d4af37' }}>{s.num}</div>
            <div style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>{s.label}</div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
