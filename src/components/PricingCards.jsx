import React from 'react'
import { useAuth } from './AuthContext.jsx'

const PLANS = [
  {
    id: 'free',
    title: 'FREE',
    price: '₹0',
    period: '/ forever',
    sub: 'For the curious seeker',
    highlight: false,
    badge: null,
    cta: 'Start Free',
    ctaStyle: 'outline',
    note: 'No credit card required',
    features: [
      { ok: true,  label: '3 Chats per day' },
      { ok: true,  label: '5 Languages' },
      { ok: true,  label: 'Basic Spiritual Guidance' },
      { ok: true,  label: 'Instant Responses' },
      { ok: false, label: 'Chat History' },
      { ok: false, label: 'Ritual Scheduler' },
      { ok: false, label: 'Daily Mantra' },
      { ok: false, label: 'Advanced Features' },
    ],
  },
  {
    id: 'pro',
    title: '👑 PRO',
    price: '₹99',
    period: '/ month',
    sub: 'For dedicated spiritual seekers',
    highlight: true,
    badge: 'MOST POPULAR',
    cta: 'Upgrade to Pro',
    ctaStyle: 'gold',
    note: '14-day free trial',
    features: [
      { ok: true, label: 'Unlimited Chats' },
      { ok: true, label: '5 Languages' },
      { ok: true, label: 'Priority Responses (2x faster)' },
      { ok: true, label: 'Chat History & Search' },
      { ok: true, label: 'Ritual Scheduler' },
      { ok: true, label: 'Daily Mantra (6 AM)' },
      { ok: true, label: 'Memory Feature' },
      { ok: true, label: 'Advanced Responses' },
      { ok: true, label: 'No Ads' },
      { ok: true, label: 'Priority Support' },
    ],
  },
  {
    id: 'onetime',
    title: 'ONE-TIME',
    price: '₹10–₹999',
    period: '',
    sub: 'Pay as you go',
    highlight: false,
    badge: null,
    cta: 'View All Plans',
    ctaStyle: 'purple',
    note: 'Flexible options for everyone',
    items: [
      { icon: '💬', label: 'Single Chat',    price: '₹10' },
      { icon: '🔮', label: 'Kundli Analysis', price: '₹49' },
      { icon: '📅', label: '3-Month Plan',   price: '₹299', save: 'Save ₹100' },
      { icon: '⭐', label: '1-Year Plan',    price: '₹999', save: 'Save ₹300' },
    ],
    features: [],
  },
]

export default function PricingCards({ onAction }) {
  const { user } = useAuth()

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}>
      {PLANS.map((plan, idx) => (
        <div
          key={plan.id}
          className={`pricing-card anim-fadeup-${idx} ${plan.highlight ? 'anim-float anim-glow' : ''}`}
          style={{
            backgroundColor: '#1a1f2e',
            border: plan.highlight ? '2px solid #d4af37' : '1px solid #3a4557',
            borderRadius: '18px',
            padding: '28px 24px',
            position: 'relative',
          }}
        >
          {/* Badge */}
          {plan.badge && (
            <div style={{
              position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
              backgroundColor: '#d4af37', color: '#0f1419',
              borderRadius: '20px', padding: '4px 16px',
              fontSize: '11px', fontWeight: '800', letterSpacing: '1px', whiteSpace: 'nowrap',
            }}>{plan.badge}</div>
          )}

          {/* Header */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: plan.highlight ? '#d4af37' : '#cbd5e1', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
              {plan.title}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '36px', fontWeight: '800', color: '#fff', fontFamily: 'monospace' }}>{plan.price}</span>
              <span style={{ fontSize: '14px', color: '#64748b' }}>{plan.period}</span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '6px' }}>{plan.sub}</div>
            {plan.id === 'pro' && (
              <div style={{ marginTop: '8px', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', color: '#d4af37', display: 'inline-block' }}>
                💰 Save ₹300/year with annual plan
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#3a4557', marginBottom: '20px' }} />

          {/* One-time items */}
          {plan.items && (
            <div style={{ marginBottom: '20px' }}>
              {plan.items.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: i < plan.items.length - 1 ? '1px solid #252d3d' : 'none',
                }}>
                  <span style={{ fontSize: '13px', color: '#cbd5e1' }}>{item.icon} {item.label}</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#d4af37', fontFamily: 'monospace' }}>{item.price}</span>
                    {item.save && <div style={{ fontSize: '10px', color: '#10b981' }}>{item.save}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Features list */}
          {plan.features.length > 0 && (
            <ul style={{ listStyle: 'none', marginBottom: '24px' }}>
              {plan.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', fontSize: '13px', color: f.ok ? '#e2e8f0' : '#475569' }}>
                  <span style={{ fontSize: '15px', flexShrink: 0 }}>{f.ok ? '✅' : '❌'}</span>
                  {f.label}
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <button
            onClick={() => onAction && onAction(plan.id)}
            className={plan.ctaStyle === 'gold' ? 'cta-btn-gold' : 'cta-btn-outline'}
            style={{
              width: '100%', border: 'none', borderRadius: '10px',
              padding: '13px', fontSize: '14px', fontWeight: '700',
              cursor: 'pointer', transition: 'all 0.2s', marginBottom: '8px',
              ...(plan.ctaStyle === 'gold' && { backgroundColor: '#d4af37', color: '#0f1419' }),
              ...(plan.ctaStyle === 'purple' && { backgroundColor: 'transparent', color: '#8b5cf6', border: '1px solid #8b5cf6' }),
              ...(plan.ctaStyle === 'outline' && { backgroundColor: 'transparent', color: '#d4af37', border: '1px solid #d4af37' }),
            }}
          >{plan.cta}</button>
          <div style={{ textAlign: 'center', fontSize: '12px', color: '#475569' }}>{plan.note}</div>
        </div>
      ))}
    </div>
  )
}
