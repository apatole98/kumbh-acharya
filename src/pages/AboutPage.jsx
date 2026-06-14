import React from 'react'
import BottomNav from '../components/BottomNav.jsx'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '32px' }}>
    <div style={{ color: '#d4af37', fontSize: '16px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
      {title}
    </div>
    <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.8' }}>{children}</div>
  </div>
)

export default function AboutPage({ onNav }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
        <button onClick={() => onNav?.('chat')} style={{ background: 'transparent', border: 'none', color: '#d4af37', fontSize: '20px', cursor: 'pointer', padding: '4px' }}>←</button>
        <div>
          <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>🕉 About Kumbh Acharya</div>
          <div style={{ color: '#64748b', fontSize: '12px' }}>Our Mission & Story</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>

        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '52px', marginBottom: '16px' }}>🕉</div>
          <div style={{ color: '#d4af37', fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>Kumbh Acharya</div>
          <div style={{ color: '#a78bfa', fontSize: '12px', letterSpacing: '2px', fontWeight: '700', marginBottom: '16px' }}>NASHIK SIMHASTHA 2027</div>
          <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.8' }}>
            Your AI spiritual companion for the Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027. Bridging centuries of Vedic wisdom with modern technology for today's pilgrim.
          </div>
        </div>

        <Section title="🙏 Our Mission">
          The Kumbh Mela is the largest gathering of humans on Earth — yet many pilgrims arrive without knowing the right rituals, auspicious timings, or sacred spots. Kumbh Acharya exists to be your knowledgeable guide: available 24/7, speaking your language, grounded in authentic Vedic tradition.
          <br /><br />
          We believe every pilgrim deserves a guru — not just those who can afford a personal priest. So we built one, powered by AI.
        </Section>

        <Section title="🌊 The Nashik Simhastha 2027">
          The Nashik-Trimbakeshwar Simhastha Kumbh Mela happens only once every 12 years. The next one — beginning October 31, 2026 and culminating July 24, 2028 — will draw tens of millions to the banks of the sacred Godavari (Dakshin Ganga).
          <br /><br />
          It is unique among Kumbh Melas: a dual celebration of both Shaiva and Vaishnava traditions at two sacred sites — Ramkund in Nashik for Vaishnava Akharas, and Kushavarta Kund in Trimbakeshwar for Shaiva Akharas.
        </Section>

        <Section title="🤖 Technology We Use">
          Kumbh Acharya is powered by Claude (by Anthropic), one of the world's most capable and trustworthy AI systems. Every response is generated fresh, drawing from a deep knowledge base of Kumbh Mela logistics, Vedic scripture, Nashik geography, and pilgrimage rituals.
          <br /><br />
          We support 5 languages — Hindi, English, Marathi, Gujarati, and Bengali — because your spiritual journey should happen in your mother tongue.
        </Section>

        <Section title="⭐ Free & Pro Plans">
          We believe access to spiritual guidance should not be gated by wealth. The Free plan offers 3 consultations daily — enough for most pilgrims. The Pro plan (₹99/month) unlocks unlimited guidance for the deeply committed seeker.
        </Section>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '32px' }}>
          {[
            { v: '5', l: 'Languages' },
            { v: '4', l: 'Shahi Snan Dates' },
            { v: '12', l: 'Years Between Kumbhs' },
          ].map(({ v, l }) => (
            <div key={l} style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '14px', padding: '20px 12px', textAlign: 'center' }}>
              <div style={{ color: '#d4af37', fontSize: '28px', fontWeight: '800' }}>{v}</div>
              <div style={{ color: '#64748b', fontSize: '11px', marginTop: '4px' }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', color: '#334155', fontSize: '13px', marginBottom: '80px' }}>
          जय गोदावरी माँ · जय त्र्यंबकेश्वर · जय श्री राम 🙏
        </div>
      </div>

      <BottomNav page="about" onNav={onNav} />
    </div>
  )
}
