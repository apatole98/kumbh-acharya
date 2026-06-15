import React, { useState } from 'react'
import Footer from '../components/Footer.jsx'

const steps = [
  { icon: '💬', num: '01', title: 'Ask a spiritual question', desc: 'Chat with Kumbh Acharya about mantras, rituals, Shahi Snan dates, Trimbakeshwar significance — anything.', points: '+10 pts per chat' },
  { icon: '📿', num: '02', title: 'Complete daily quests', desc: 'New quests every day tied to Hindu calendar events. Navratri quest, Ekadashi quest, Shahi Snan countdown — stay spiritually active.', points: '+25–100 pts per quest' },
  { icon: '🏅', num: '03', title: 'Unlock sacred badges', desc: 'Earn 40+ unique badges: Mantra Master, Kumbh Pilgrim, Sanskrit Scholar, Community Guide. Show your spiritual journey.', points: 'Permanent achievements' },
  { icon: '🏆', num: '04', title: 'Climb the leaderboard', desc: 'Compete with pilgrims across India. Weekly resets keep it fresh. Top pilgrims get featured in the Community.', points: 'Weekly recognition' },
  { icon: '🎁', num: '05', title: 'Redeem real rewards', desc: 'Coming soon: trade Dharma Points for Kumbh 2027 discounts, prasad delivery, e-pass priority, and exclusive content.', points: 'Real-world value' },
]

const benefits = [
  {
    icon: '🧠',
    title: 'Build lasting spiritual habits',
    desc: 'Psychology research shows gamification increases habit formation by 3x. Daily quests make morning prayers a habit, not a chore.',
    color: '#8b5cf6',
  },
  {
    icon: '🔥',
    title: 'Stay motivated with streaks',
    desc: 'Maintain your spiritual streak — consecutive days of practice build momentum. Miss a day? Your community will encourage you back.',
    color: '#ef4444',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Make it a family journey',
    desc: 'Compete with family members. Parents and children on the same leaderboard. Make Kumbh 2027 preparation a shared family experience.',
    color: '#10b981',
  },
  {
    icon: '📈',
    title: 'Track your spiritual growth',
    desc: 'See your progress over time. How many mantras learned? How many rituals understood? Your Dharma Points tell your story.',
    color: '#d4af37',
  },
]

const quests = [
  { icon: '🌅', title: 'Brahma Muhurta Practice', desc: 'Learn the significance of 4-6 AM meditation', pts: 25, difficulty: 'Easy' },
  { icon: '🔱', title: 'Trimbakeshwar Pilgrimage', desc: 'Complete the 12 Jyotirlinga knowledge quest', pts: 75, difficulty: 'Medium' },
  { icon: '🙏', title: 'Shahi Snan Preparation', desc: 'Master the sacred bathing rituals for Aug 31', pts: 100, difficulty: 'Hard' },
  { icon: '📖', title: 'Vedic Knowledge Week', desc: '7-day streak of daily Vedic learning', pts: 150, difficulty: 'Epic' },
]

export default function WhyGamificationPage({ onNav }) {
  const [activeStep, setActiveStep] = useState(null)

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
        <button onClick={() => onNav?.('gamification')} style={{ backgroundColor: '#d4af37', color: '#0f1419', border: 'none', borderRadius: '8px', padding: '9px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
          🏆 Start Earning
        </button>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, #0f1419 0%, #1a0f2e 50%, #0f1419 100%)', padding: '96px 24px 80px', textAlign: 'center', borderBottom: '1px solid #2d3748', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px', padding: '5px 16px', fontSize: '12px', color: '#d4af37', fontWeight: '700', letterSpacing: '1px', marginBottom: '20px' }}>
            🏆 GAMIFIED SPIRITUALITY
          </div>
          <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: '800', color: '#fff', lineHeight: 1.15, marginBottom: '16px' }}>
            Why we made<br /><span style={{ color: '#d4af37' }}>spirituality a game</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '560px', margin: '0 auto 36px', lineHeight: 1.8 }}>
            Ancient rishis made learning fun through stories, riddles, and rewards. We brought that spirit to the digital age — making your Kumbh 2027 preparation addictive in the best possible way.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNav?.('gamification')} style={{ backgroundColor: '#d4af37', color: '#0f1419', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
              🏆 View My Progress
            </button>
            <button onClick={() => onNav?.('chat')} style={{ backgroundColor: 'transparent', color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              💬 Start Earning Now
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ backgroundColor: '#0f1419', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>How it works</h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Five simple steps to your spiritual growth</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {steps.map((s, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                style={{
                  background: activeStep === i ? 'rgba(212,175,55,0.05)' : '#1a1f2e',
                  border: `1px solid ${activeStep === i ? 'rgba(212,175,55,0.3)' : '#2d3748'}`,
                  borderRadius: '14px',
                  padding: '20px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <span style={{ color: '#d4af37', fontSize: '11px', fontWeight: '800' }}>{s.num}</span>
                      <span style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '15px' }}>{s.title}</span>
                    </div>
                    {activeStep === i && (
                      <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.7, marginTop: '8px' }}>{s.desc}</p>
                    )}
                  </div>
                  <div style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '8px', padding: '4px 10px', color: '#d4af37', fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap' }}>
                    {s.points}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ backgroundColor: '#111827', padding: '80px 24px', borderTop: '1px solid #2d3748', borderBottom: '1px solid #2d3748' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>Why gamification works for spirituality</h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Science-backed reasons, ancient wisdom-validated</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ background: '#1a1f2e', border: '1px solid #2d3748', borderRadius: '14px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: b.color, opacity: 0.6 }} />
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{b.icon}</div>
                <h3 style={{ color: '#fff', fontWeight: '700', fontSize: '14px', marginBottom: '8px' }}>{b.title}</h3>
                <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample quests */}
      <section style={{ backgroundColor: '#0f1419', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>Sample Kumbh Quests</h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>New quests every day, aligned with the Hindu calendar</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            {quests.map((q, i) => (
              <div key={i} style={{ background: '#1a1f2e', border: '1px solid #2d3748', borderRadius: '14px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '28px' }}>{q.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '14px' }}>{q.title}</span>
                    <span style={{ background: 'rgba(212,175,55,0.1)', color: '#d4af37', fontSize: '10px', fontWeight: '800', padding: '2px 8px', borderRadius: '8px', whiteSpace: 'nowrap', marginLeft: '8px' }}>+{q.pts} pts</span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '10px' }}>{q.desc}</p>
                  <span style={{
                    fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px',
                    background: q.difficulty === 'Easy' ? 'rgba(16,185,129,0.1)' : q.difficulty === 'Medium' ? 'rgba(212,175,55,0.1)' : q.difficulty === 'Hard' ? 'rgba(239,68,68,0.1)' : 'rgba(139,92,246,0.1)',
                    color: q.difficulty === 'Easy' ? '#10b981' : q.difficulty === 'Medium' ? '#d4af37' : q.difficulty === 'Hard' ? '#ef4444' : '#8b5cf6',
                  }}>
                    {q.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => onNav?.('gamification')} style={{ backgroundColor: '#d4af37', color: '#0f1419', border: 'none', borderRadius: '10px', padding: '14px 36px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>
              🏆 Start My First Quest
            </button>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </div>
  )
}
