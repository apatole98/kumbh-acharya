import React, { useState } from 'react'

const FAQS = [
  { q: 'Can I upgrade or downgrade anytime?', a: 'Yes, absolutely. Changes take effect immediately. Upgrading unlocks Pro features instantly. Downgrading takes effect at the end of your billing cycle.' },
  { q: "What's the difference between Pro and One-Time?", a: 'Pro is a monthly subscription giving you unlimited chats and all features. One-Time purchases are for specific features (like Kundli Analysis) or bundles — pay once, no recurring charge.' },
  { q: 'Can I use Kumbh Acharya on multiple devices?', a: 'Yes. Simply log in with your account on any device — phone, tablet, or desktop. Your chat history and preferences sync automatically (Pro feature).' },
  { q: "What if I'm not satisfied?", a: 'We offer a full refund within 7 days of purchase, no questions asked. Contact us and we\'ll process it within 24 hours.' },
  { q: 'Is my data secure?', a: 'Yes. Your conversations are encrypted and never shared with third parties. We follow strict data privacy standards. Your spiritual journey is personal — we keep it that way.' },
  { q: 'Can I cancel my Pro subscription anytime?', a: 'Yes, cancel anytime from your Profile page. No lock-in period, no cancellation fees. Your Pro access continues until the end of the current billing period.' },
  { q: 'Do you offer annual plans?', a: 'Yes! The 1-Year Plan is ₹999 (only ₹83/month) — saving you ₹300 compared to monthly billing. Available in the One-Time purchases section.' },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {FAQS.map((faq, i) => (
        <div key={i} style={{
          backgroundColor: '#1a1f2e',
          border: open === i ? '1px solid rgba(212,175,55,0.5)' : '1px solid #3a4557',
          borderRadius: '12px', overflow: 'hidden',
          transition: 'border-color 0.2s',
        }}>
          <button
            className="faq-btn"
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '18px 20px',
              backgroundColor: 'transparent', border: 'none',
              cursor: 'pointer', textAlign: 'left', transition: 'background-color 0.2s',
            }}
          >
            <span style={{ color: open === i ? '#d4af37' : '#e2e8f0', fontSize: '14px', fontWeight: '600', paddingRight: '16px', lineHeight: '1.4' }}>
              {faq.q}
            </span>
            <span style={{
              color: '#d4af37', fontSize: '20px', fontWeight: '300',
              flexShrink: 0, transition: 'transform 0.3s ease',
              transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
              display: 'inline-block', lineHeight: 1,
            }}>+</span>
          </button>

          {open === i && (
            <div style={{
              padding: '0 20px 18px',
              color: '#94a3b8', fontSize: '13px', lineHeight: '1.75',
              borderLeft: '3px solid #d4af37', marginLeft: '20px',
              paddingLeft: '16px', marginRight: '20px',
              animation: 'fadeIn 0.25s ease',
            }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
