import React from 'react'
import { useAuth } from '../components/AuthContext.jsx'
import PricingCards from '../components/PricingCards.jsx'
import ComparisonTable from '../components/ComparisonTable.jsx'
import ComingSoonSection from '../components/ComingSoonSection.jsx'
import FAQSection from '../components/FAQSection.jsx'

const sec = (bg = '#f8f6f1') => ({
  backgroundColor: bg,
  padding: '48px 20px',
})

const container = {
  maxWidth: '960px',
  margin: '0 auto',
}

const sectionTitle = {
  fontSize: '24px',
  fontWeight: '800',
  color: '#1f2937',
  marginBottom: '8px',
}

const sectionSub = {
  color: '#6b7280',
  fontSize: '14px',
  marginBottom: '32px',
}

export default function FeaturesPage({ onBack, onChat }) {
  const { user } = useAuth()

  const handlePlanAction = (planId) => {
    if (planId === 'free') { onChat && onChat() }
    else if (planId === 'pro') {
      alert('💳 Razorpay integration coming in Phase 4! Click OK to unlock Pro in demo mode.')
      const stored = JSON.parse(localStorage.getItem('ka_user') || '{}')
      stored.isPro = true
      localStorage.setItem('ka_user', JSON.stringify(stored))
      onChat && onChat()
    } else {
      alert('One-time purchase plans coming soon! 🙏')
    }
  }

  return (
    <div style={{ fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif", backgroundColor: '#f8f6f1', minHeight: '100dvh' }}>

      {/* Nav */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🕉</span>
          <span style={{ fontWeight: '700', color: '#8b5cf6', fontSize: '16px' }}>कुंभ आचार्य</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onBack} style={navBtn(false)}>← Back</button>
          <button onClick={onChat} style={navBtn(true)}>
            {user ? '💬 Open Chat' : '🙏 Get Started'}
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ ...sec('#8b5cf6'), textAlign: 'center', padding: '64px 20px' }}>
        <div style={{ ...container }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🕉</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>
            Your Complete Spiritual Guide
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', maxWidth: '560px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Ask anything about Kumbh Mela, Vedic mantras, and pilgrimage traditions in 5 languages. Free forever or unlock unlimited with Pro.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onChat} style={{ backgroundColor: '#d4af37', color: '#1f2937', border: 'none', borderRadius: '10px', padding: '13px 28px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
              🙏 {user ? 'Open Chat' : 'Start Free'}
            </button>
            <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', padding: '13px 28px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              View Pricing ↓
            </button>
          </div>
        </div>
      </div>

      {/* Quick features */}
      <div style={sec('#fff')}>
        <div style={container}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { icon: '🗣', title: '5 Languages', desc: 'Hindi, English, Marathi, Gujarati, Bengali' },
              { icon: '🕉', title: 'Vedic Knowledge', desc: 'Mantras, rituals, and ancient wisdom' },
              { icon: '📍', title: 'Kumbh Guide', desc: 'Ghats, snan dates, routes, and camps' },
              { icon: '⚡', title: 'Instant Answers', desc: 'AI-powered responses in seconds' },
            ].map((f, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f9f5f0', borderRadius: '12px' }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{f.icon}</div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#1f2937', marginBottom: '6px' }}>{f.title}</div>
                <div style={{ color: '#6b7280', fontSize: '12px' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" style={sec()}>
        <div style={container}>
          <div style={sectionTitle}>💎 Choose Your Plan</div>
          <div style={sectionSub}>Simple, transparent pricing. No hidden fees.</div>
          <PricingCards onAction={handlePlanAction} />
        </div>
      </div>

      {/* Comparison table */}
      <div style={sec('#fff')}>
        <div style={container}>
          <div style={sectionTitle}>📊 Full Feature Comparison</div>
          <div style={sectionSub}>See exactly what you get with each plan</div>
          <ComparisonTable />
        </div>
      </div>

      {/* Coming soon */}
      <div style={sec()}>
        <div style={container}>
          <div style={sectionTitle}>🚀 Coming Soon</div>
          <div style={sectionSub}>We're building more — get notified first</div>
          <ComingSoonSection />
        </div>
      </div>

      {/* FAQ */}
      <div style={sec('#fff')}>
        <div style={container}>
          <div style={sectionTitle}>❓ Frequently Asked Questions</div>
          <div style={sectionSub}>Everything you need to know</div>
          <FAQSection />
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ ...sec('#8b5cf6'), textAlign: 'center', padding: '48px 20px' }}>
        <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
          Ready to begin your spiritual journey?
        </div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '24px' }}>
          Join thousands of pilgrims guided by Kumbh Acharya 🙏
        </div>
        <button onClick={onChat} style={{ backgroundColor: '#d4af37', color: '#1f2937', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>
          🕉 {user ? 'Open Chat' : 'Start Free — No Credit Card'}
        </button>
      </div>
    </div>
  )
}

const navBtn = (primary) => ({
  backgroundColor: primary ? '#8b5cf6' : 'transparent',
  color: primary ? '#fff' : '#6b7280',
  border: primary ? 'none' : '1px solid #e5e7eb',
  borderRadius: '8px', padding: '8px 14px',
  fontSize: '13px', fontWeight: '600', cursor: 'pointer',
})
