import React from 'react'
import { useAuth } from '../components/AuthContext.jsx'
import PricingCards from '../components/PricingCards.jsx'
import ComparisonTable from '../components/ComparisonTable.jsx'
import ComingSoonGrid from '../components/ComingSoonGrid.jsx'
import FAQAccordion from '../components/FAQAccordion.jsx'
import ThreePillars from '../components/ThreePillars.jsx'
import Testimonials from '../components/Testimonials.jsx'

const Section = ({ bg, children, id }) => (
  <section id={id} style={{ backgroundColor: bg || '#0f1419', padding: '72px 20px' }}>
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>{children}</div>
  </section>
)

const SectionHead = ({ title, sub }) => (
  <div style={{ marginBottom: '40px' }}>
    <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#fff', marginBottom: '10px', lineHeight: 1.3 }}>{title}</h2>
    <div style={{ color: '#64748b', fontSize: '15px' }}>{sub}</div>
    <div style={{ height: '2px', background: 'linear-gradient(to right, #d4af37, transparent)', width: '60px', marginTop: '14px', borderRadius: '2px' }} />
  </div>
)

export default function FeaturesPage({ onBack, onChat, onNav }) {
  const { user } = useAuth()

  const nav = (page) => {
    if (page === 'chat') { onChat?.(); return }
    onNav?.(page)
  }

  const handlePlan = (planId) => {
    if (planId === 'free') {
      onChat && onChat()
    } else if (planId === 'pro') {
      if (window.confirm('💳 Razorpay coming in Phase 4!\n\nClick OK to unlock Pro in demo mode now.')) {
        const stored = JSON.parse(localStorage.getItem('ka_user') || '{}')
        stored.isPro = true
        localStorage.setItem('ka_user', JSON.stringify(stored))
        onChat && onChat()
      }
    } else {
      alert('One-time purchase plans coming soon! 🙏')
    }
  }

  return (
    <div style={{ backgroundColor: '#0f1419', minHeight: '100dvh', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* ── Sticky Nav ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: 'rgba(15,20,25,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #3a4557',
        padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={{ backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid #3a4557', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#d4af37'; e.currentTarget.style.borderColor = '#d4af37' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#3a4557' }}>
            ← Back
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>🕉</span>
            <span style={{ fontWeight: '700', color: '#d4af37', fontSize: '15px' }}>Kumbh Acharya</span>
          </div>
        </div>
        <button onClick={onChat} className="cta-btn-gold" style={{
          backgroundColor: '#d4af37', color: '#0f1419', border: 'none',
          borderRadius: '8px', padding: '9px 20px', fontSize: '13px',
          fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
        }}>
          {user ? '💬 Open Chat' : '🙏 Get Started'}
        </button>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(160deg, #0f1419 0%, #1a1228 50%, #0f1419 100%)',
        padding: '96px 24px 80px', textAlign: 'center',
        borderBottom: '1px solid #3a4557', position: 'relative', overflow: 'hidden',
      }}>
        {/* decorative bg circles */}
        <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="anim-fadeup" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px', padding: '5px 16px', fontSize: '12px', color: '#d4af37', fontWeight: '600', letterSpacing: '1px', marginBottom: '20px' }}>
            🕉 SPIRITUAL AI GUIDE
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '800', color: '#fff', lineHeight: 1.2, marginBottom: '16px' }}>
            Your complete guide to<br />
            <span style={{ color: '#d4af37' }}>Nashik Simhastha 2027</span>
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ height: '3px', width: '80px', backgroundColor: '#d4af37', borderRadius: '2px', animation: 'goldLine 1s 0.5s ease both', animationFillMode: 'both' }} />
          </div>
          <p className="anim-fadeup-1" style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '560px', margin: '0 auto 12px', lineHeight: 1.7 }}>
            AI spiritual guide + gamified learning + pilgrim community — everything you need to make your Kumbh journey transformative.
          </p>
          <p className="anim-fadeup-1" style={{ color: '#64748b', fontSize: '13px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.6 }}>
            Join 50,000+ pilgrims who are using Kumbh Acharya to prepare spiritually, stay informed, and connect with their community before Nashik Kumbh 2027.
          </p>
          <div className="anim-fadeup-2" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onChat} className="cta-btn-gold" style={{ backgroundColor: '#d4af37', color: '#0f1419', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}>
              🙏 {user ? 'Open Chat' : 'Start Free'}
            </button>
            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="cta-btn-outline" style={{ backgroundColor: 'transparent', color: '#d4af37', border: '1px solid rgba(212,175,55,0.5)', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
              View Pricing ↓
            </button>
          </div>
        </div>
      </section>

      {/* ── Quick Features ── */}
      <Section bg="#111827">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {[
            { icon: '🗣', title: '5 Languages', desc: 'Hindi, English, Marathi, Gujarati, Bengali' },
            { icon: '🕉', title: 'Vedic Knowledge', desc: 'Mantras, rituals, ancient wisdom' },
            { icon: '📍', title: 'Kumbh Guide', desc: 'Ghats, snan dates, routes' },
            { icon: '⚡', title: 'Instant Answers', desc: 'AI responses in seconds' },
          ].map((f, i) => (
            <div key={i} className={`anim-fadeup-${i % 3}`} style={{ backgroundColor: '#1a1f2e', border: '1px solid #3a4557', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{f.icon}</div>
              <div style={{ fontWeight: '700', fontSize: '13px', color: '#e2e8f0', marginBottom: '5px' }}>{f.title}</div>
              <div style={{ color: '#64748b', fontSize: '12px' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Divider */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #d4af37, transparent)', opacity: 0.4 }} />

      {/* ── Three Pillars ── */}
      <Section>
        <ThreePillars onNav={nav} />
      </Section>

      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #3a4557, transparent)' }} />

      {/* ── Testimonials ── */}
      <Section bg="#111827">
        <Testimonials />
      </Section>

      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #d4af37, transparent)', opacity: 0.4 }} />

      {/* ── Pricing ── */}
      <Section id="pricing">
        <SectionHead title="💎 Choose Your Plan" sub="Simple, transparent pricing. No hidden fees. No surprises." />
        <PricingCards onAction={handlePlan} />
      </Section>

      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #3a4557, transparent)' }} />

      {/* ── Comparison ── */}
      <Section bg="#111827">
        <SectionHead title="📊 Compare All Features" sub="See exactly what's included in each plan" />
        <ComparisonTable />
      </Section>

      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #d4af37, transparent)', opacity: 0.4 }} />

      {/* ── Coming Soon ── */}
      <Section>
        <SectionHead title="🚀 What's Coming" sub="Exciting features in development — be the first to know" />
        <ComingSoonGrid />
      </Section>

      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #3a4557, transparent)' }} />

      {/* ── FAQ ── */}
      <Section bg="#111827">
        <SectionHead title="❓ Frequently Asked Questions" sub="Everything you need to know" />
        <FAQAccordion onNav={nav} />
      </Section>

      {/* ── Bottom CTA ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1228 0%, #0f1419 100%)',
        borderTop: '1px solid #3a4557',
        padding: '72px 24px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>
            Ready to begin your<br /><span style={{ color: '#d4af37' }}>spiritual journey?</span>
          </div>
          <div style={{ height: '2px', width: '60px', backgroundColor: '#d4af37', margin: '16px auto 20px', borderRadius: '2px' }} />
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '32px', lineHeight: 1.7 }}>
            Join thousands of pilgrims guided by Kumbh Acharya every day 🙏
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onChat} style={{ backgroundColor: 'transparent', color: '#d4af37', border: '1px solid rgba(212,175,55,0.5)', borderRadius: '10px', padding: '13px 28px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}>
              Start Free
            </button>
            <button onClick={() => handlePlan('pro')} className="cta-btn-gold" style={{ backgroundColor: '#d4af37', color: '#0f1419', border: 'none', borderRadius: '10px', padding: '13px 32px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s' }}>
              👑 Upgrade to Pro — ₹99/mo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0a0e14', borderTop: '1px solid #1e2736', padding: '24px', textAlign: 'center' }}>
        <div style={{ color: '#334155', fontSize: '12px' }}>
          🕉 Kumbh Acharya — Spreading Dharma through AI &nbsp;·&nbsp; © 2026
        </div>
      </footer>
    </div>
  )
}
