import React, { useState } from 'react'
import Footer from '../components/Footer.jsx'

const capabilities = [
  {
    icon: '📿',
    title: 'Mantra & Stotra Guidance',
    desc: 'Get the correct pronunciation, meaning, and timing for any mantra. From Mahamrityunjaya to Gayatri — with transliteration in your language.',
    examples: ['When should I chant Shiva Panchakshara?', 'What is the meaning of Om Namah Shivaya?', 'Gayatri mantra ka sahi time kya hai?'],
  },
  {
    icon: '🔱',
    title: 'Ritual & Puja Vidhi',
    desc: 'Step-by-step guidance for any Hindu ritual. Ingredients, sequence, timing, and the deeper meaning behind each step.',
    examples: ['How to perform Rudrabhishek at home?', 'Satyanarayan katha ki poori vidhi batao', 'What offerings to bring to Trimbakeshwar?'],
  },
  {
    icon: '📍',
    title: 'Kumbh Mela Navigation',
    desc: 'Expert guidance on Nashik-Trimbakeshwar Kumbh 2027 — Shahi Snan dates, safe ghats, crowd management, accommodation, and transportation.',
    examples: ['Best time to arrive for Aug 31 Shahi Snan?', 'Which ghat is safest for elderly pilgrims?', 'How to get e-pass for Kumbh 2027?'],
  },
  {
    icon: '📚',
    title: 'Vedic Philosophy & Texts',
    desc: 'Understand complex concepts from Upanishads, Puranas, Bhagavad Gita — explained simply in modern language without losing depth.',
    examples: ['What is Advaita Vedanta?', 'Explain the significance of Godavari River', 'What is the Simhastha yoga?'],
  },
  {
    icon: '🌙',
    title: 'Hindu Calendar & Timing',
    desc: 'Tithi, nakshatra, muhurta — get the auspicious timing for any activity. Daily panchang, festival dates, and sacred time windows.',
    examples: ['What is today\'s tithi?', 'Best muhurta for griha pravesh this month?', 'Ekadashi dates for 2027?'],
  },
  {
    icon: '💊',
    title: 'Ayurvedic Wellness',
    desc: 'Integrate spiritual practice with Ayurvedic wisdom. Diet for your dosha during pilgrimage, fasting guidance, and healing mantras.',
    examples: ['What to eat during Navratri fast?', 'How to prepare body for Kumbh pilgrimage?', 'Ayurvedic tips for long yatra travel?'],
  },
]

const languages = [
  { flag: '🇮🇳', lang: 'Hindi', native: 'हिन्दी' },
  { flag: '🇬🇧', lang: 'English', native: 'English' },
  { flag: '🏳️', lang: 'Marathi', native: 'मराठी' },
  { flag: '🏳️', lang: 'Gujarati', native: 'ગુજરાતી' },
  { flag: '🏳️', lang: 'Bengali', native: 'বাংলা' },
]

const timeslots = [
  { icon: '🌅', name: 'Brahma Muhurta', time: '4:00 – 6:00 AM', desc: 'Most auspicious for meditation & mantra', vibe: 'Sacred stillness' },
  { icon: '🌄', name: 'Pratah Kaal', time: '6:00 AM – 12:00 PM', desc: 'Ideal for puja vidhi & ritual guidance', vibe: 'Morning grace' },
  { icon: '☀️', name: 'Madhyahna', time: '12:00 – 4:00 PM', desc: 'Perfect for scripture study & philosophy', vibe: 'Clarity & learning' },
  { icon: '🌆', name: 'Sandhyakal', time: '4:00 – 7:00 PM', desc: 'Transition time — sandhya vandanam', vibe: 'Evening prayer' },
  { icon: '🌙', name: 'Ratri', time: '7:00 PM – 4:00 AM', desc: 'Introspection, dream interpretation', vibe: 'Inner journey' },
]

export default function AIGuidePage({ onNav }) {
  const [activeCapability, setActiveCapability] = useState(0)

  return (
    <div style={{ backgroundColor: '#0f1419', minHeight: '100dvh', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(15,20,25,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #2d3748', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => onNav?.('landing')} style={{ backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid #3a4557', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#d4af37'; e.currentTarget.style.borderColor = '#d4af37' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#3a4557' }}>
            ← Back
          </button>
          <span style={{ fontSize: '22px' }}>🕉</span>
          <span style={{ fontWeight: '700', color: '#d4af37', fontSize: '15px' }}>Kumbh Acharya</span>
        </div>
        <button onClick={() => onNav?.('chat')} style={{ backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
          🤖 Try AI Guide
        </button>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, #0f1419 0%, #0f0a1f 50%, #0f1419 100%)', padding: '96px 24px 80px', textAlign: 'center', borderBottom: '1px solid #2d3748', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '20px', padding: '5px 16px', fontSize: '12px', color: '#8b5cf6', fontWeight: '700', letterSpacing: '1px', marginBottom: '20px' }}>
            🤖 AI SPIRITUAL GUIDE
          </div>
          <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: '800', color: '#fff', lineHeight: 1.15, marginBottom: '16px' }}>
            Your personal<br /><span style={{ color: '#8b5cf6' }}>Vedic scholar</span><br />
            <span style={{ color: '#d4af37' }}>available 24/7</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '560px', margin: '0 auto 36px', lineHeight: 1.8 }}>
            Kumbh Acharya is trained on thousands of Vedic scriptures, Nashik Kumbh history, and modern pilgrimage wisdom — giving you a knowledgeable guide in your pocket.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNav?.('chat')} style={{ backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
              🤖 Ask Your First Question
            </button>
            <button onClick={() => onNav?.('features')} style={{ backgroundColor: 'transparent', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              📊 See All Features
            </button>
          </div>
        </div>
      </section>

      {/* What it knows */}
      <section style={{ backgroundColor: '#0f1419', padding: '80px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>What can you ask?</h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Click any category to see example questions</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {capabilities.map((c, i) => (
              <div
                key={i}
                onClick={() => setActiveCapability(i)}
                style={{
                  background: activeCapability === i ? 'rgba(139,92,246,0.08)' : '#1a1f2e',
                  border: `1px solid ${activeCapability === i ? 'rgba(139,92,246,0.3)' : '#2d3748'}`,
                  borderRadius: '14px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{c.icon}</div>
                <h3 style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '14px', marginBottom: '8px' }}>{c.title}</h3>
                <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Example questions */}
          <div style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: '700', marginBottom: '14px' }}>
              {capabilities[activeCapability].icon} EXAMPLE QUESTIONS — {capabilities[activeCapability].title.toUpperCase()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {capabilities[activeCapability].examples.map((q, i) => (
                <div
                  key={i}
                  onClick={() => onNav?.('chat')}
                  style={{ background: '#1a1f2e', border: '1px solid #2d3748', borderRadius: '10px', padding: '12px 16px', color: '#cbd5e1', fontSize: '13px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2d3748'; e.currentTarget.style.color = '#cbd5e1' }}
                >
                  <span>"{q}"</span>
                  <span style={{ color: '#8b5cf6', fontSize: '12px' }}>Ask →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section style={{ backgroundColor: '#111827', padding: '72px 24px', borderTop: '1px solid #2d3748', borderBottom: '1px solid #2d3748' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px,4vw,30px)', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>5 Languages. One guide.</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '36px' }}>Chat in your mother tongue — Kumbh Acharya understands and responds in the language of your heart</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {languages.map((l, i) => (
              <div key={i} style={{ background: '#1a1f2e', border: '1px solid #2d3748', borderRadius: '12px', padding: '16px 24px', textAlign: 'center', minWidth: '100px' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{l.flag}</div>
                <div style={{ color: '#fff', fontWeight: '700', fontSize: '13px' }}>{l.lang}</div>
                <div style={{ color: '#64748b', fontSize: '12px' }}>{l.native}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred timeslots */}
      <section style={{ backgroundColor: '#0f1419', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>Guided by sacred time</h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Kumbh Acharya adapts its wisdom to the current time of day — just like an ancient gurukul</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {timeslots.map((t, i) => (
              <div key={i} style={{ background: '#1a1f2e', border: '1px solid #2d3748', borderRadius: '14px', padding: '18px 24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ fontSize: '28px' }}>{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '14px' }}>{t.name}</span>
                    <span style={{ color: '#d4af37', fontSize: '12px', fontWeight: '600' }}>{t.time}</span>
                  </div>
                  <div style={{ color: '#64748b', fontSize: '13px' }}>{t.desc}</div>
                </div>
                <div style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '8px', padding: '4px 10px', color: '#d4af37', fontSize: '11px', whiteSpace: 'nowrap' }}>{t.vibe}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0f0a1f 0%, #0f1419 100%)', borderTop: '1px solid #2d3748', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
          <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
            Your Vedic guide<br /><span style={{ color: '#8b5cf6' }}>awaits</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px', lineHeight: 1.7 }}>
            3 free conversations per day — no credit card, no commitment.<br />Just ancient wisdom, instantly.
          </p>
          <button onClick={() => onNav?.('chat')} style={{ backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '12px', padding: '16px 40px', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
            🙏 Start Your First Chat — Free
          </button>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  )
}
