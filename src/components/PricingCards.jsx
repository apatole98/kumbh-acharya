import React from 'react'
import { useAuth } from './AuthContext.jsx'

const PLANS = [
  {
    id: 'free',
    title: 'FREE',
    price: '₹0',
    period: '/month',
    desc: 'Perfect for beginners',
    badge: 'Popular for Beginners',
    badgeColor: '#6b7280',
    highlight: false,
    cta: 'Start Free',
    features: [
      { label: '3 questions per day', ok: true },
      { label: 'Hindi & English', ok: true },
      { label: 'Basic spiritual guidance', ok: true },
      { label: 'Kumbh Mela info', ok: true },
      { label: 'Web access', ok: true },
      { label: 'Unlimited questions', ok: false },
      { label: 'All 5 languages', ok: false },
      { label: 'Chat history', ok: false },
      { label: 'Kundli analysis', ok: false },
      { label: 'Priority support', ok: false },
    ],
  },
  {
    id: 'pro',
    title: 'PRO ⭐',
    price: '₹99',
    period: '/month',
    desc: 'Full spiritual journey',
    badge: 'BEST VALUE',
    badgeColor: '#8b5cf6',
    highlight: true,
    cta: 'Upgrade Now',
    features: [
      { label: 'Unlimited questions', ok: true },
      { label: 'All 5 languages', ok: true },
      { label: 'Advanced spiritual guidance', ok: true },
      { label: 'Kumbh Mela info', ok: true },
      { label: 'Chat history saved', ok: true },
      { label: 'Vedic mantra library', ok: true },
      { label: 'Ritual calendar', ok: true },
      { label: 'Priority responses', ok: true },
      { label: 'No daily limits', ok: true },
      { label: 'Early access to features', ok: true },
      { label: 'Kundli analysis', ok: true },
      { label: 'Priority support', ok: true },
    ],
  },
  {
    id: 'onetime',
    title: 'ONE-TIME',
    price: '₹10–₹999',
    period: '',
    desc: 'Pay for what you need',
    badge: 'Flexible',
    badgeColor: '#d4af37',
    highlight: false,
    cta: 'View All Plans',
    items: [
      { price: '₹10', label: 'Single Chat' },
      { price: '₹49', label: 'Kundli Analysis' },
      { price: '₹299', label: '3-Month Bundle' },
      { price: '₹999', label: '1-Year Bundle' },
    ],
    features: [
      { label: 'Pay per use', ok: true },
      { label: 'No subscription', ok: true },
      { label: 'Kundli analysis', ok: true },
      { label: 'All languages', ok: true },
      { label: 'Flexible credits', ok: true },
      { label: 'Priority support', ok: false },
      { label: 'Unlimited questions', ok: false },
      { label: 'Early access', ok: false },
    ],
  },
]

export default function PricingCards({ onAction }) {
  const { user } = useAuth()

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      padding: '0 0 8px',
    }}>
      {PLANS.map(plan => (
        <div key={plan.id} style={{
          backgroundColor: '#fff',
          border: plan.highlight ? '2px solid #8b5cf6' : '1px solid #e5e7eb',
          borderRadius: '16px',
          padding: '24px',
          position: 'relative',
          animation: plan.highlight ? 'glow 3s ease-in-out infinite' : 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'default',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          {/* Badge */}
          <div style={{
            position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
            backgroundColor: plan.badgeColor, color: '#fff',
            borderRadius: '20px', padding: '3px 14px', fontSize: '11px', fontWeight: '700',
            whiteSpace: 'nowrap',
          }}>{plan.badge}</div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: '700', color: plan.highlight ? '#8b5cf6' : '#1f2937', marginBottom: '8px' }}>{plan.title}</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937' }}>
              {plan.price}<span style={{ fontSize: '14px', fontWeight: '400', color: '#6b7280' }}>{plan.period}</span>
            </div>
            <div style={{ color: '#6b7280', fontSize: '13px', marginTop: '4px' }}>{plan.desc}</div>
          </div>

          {/* One-time items */}
          {plan.items && (
            <div style={{ backgroundColor: '#f9f5f0', borderRadius: '10px', padding: '12px', marginBottom: '16px' }}>
              {plan.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '13px', borderBottom: i < plan.items.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <span style={{ color: '#1f2937' }}>{item.label}</span>
                  <span style={{ fontWeight: '700', color: '#8b5cf6' }}>{item.price}</span>
                </div>
              ))}
            </div>
          )}

          {/* Features list */}
          <ul style={{ listStyle: 'none', marginBottom: '20px' }}>
            {plan.features.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 0', fontSize: '13px', color: f.ok ? '#1f2937' : '#9ca3af' }}>
                <span>{f.ok ? '✅' : '❌'}</span>
                {f.label}
              </li>
            ))}
          </ul>

          <button
            onClick={() => onAction && onAction(plan.id)}
            style={{
              width: '100%',
              backgroundColor: plan.highlight ? '#8b5cf6' : plan.id === 'onetime' ? '#d4af37' : '#f3f0ff',
              color: plan.highlight ? '#fff' : plan.id === 'onetime' ? '#fff' : '#8b5cf6',
              border: 'none', borderRadius: '10px',
              padding: '12px', fontSize: '14px', fontWeight: '700',
              cursor: 'pointer', transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.9)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'none'}
          >
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  )
}
