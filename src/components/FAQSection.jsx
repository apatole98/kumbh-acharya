import React, { useState } from 'react'

const FAQS = [
  { q: 'What is Kumbh Acharya?', a: 'Kumbh Acharya is an AI-powered spiritual guide trained on Vedic texts, Kumbh Mela traditions, and pilgrimage knowledge. You can ask questions in Hindi, English, Marathi, Gujarati, or Bengali.' },
  { q: 'How many free questions do I get?', a: 'Free users get 3 questions per day. The counter resets at midnight. Upgrade to Pro for unlimited daily questions.' },
  { q: 'What payment methods are accepted?', a: 'We support UPI, Credit/Debit cards, Net Banking via Razorpay (coming soon). Currently in demo mode — upgrade button unlocks Pro for testing.' },
  { q: 'Is my data safe?', a: 'Your account data is stored securely in localStorage for now. In Phase 2, we migrate to Supabase with full encryption. We never share your data.' },
  { q: 'Can I cancel my Pro subscription?', a: 'Yes, you can cancel anytime from your Profile page. No questions asked. Your Pro access continues until the end of the billing period.' },
  { q: 'Which languages are supported?', a: 'Currently: Hindi, English, Marathi, Gujarati, and Bengali. More languages are planned based on user demand.' },
  { q: 'Is this real spiritual guidance?', a: 'Kumbh Acharya provides AI-generated spiritual information based on Vedic texts. For personal rituals and major decisions, we recommend consulting a qualified human pandit.' },
]

export default function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <div>
      {FAQS.map((faq, i) => (
        <div key={i} style={{
          backgroundColor: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '10px', marginBottom: '10px', overflow: 'hidden',
        }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '16px', backgroundColor: 'transparent',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              color: '#1f2937', fontSize: '14px', fontWeight: '600',
            }}
          >
            <span>🙏 {faq.q}</span>
            <span style={{
              color: '#8b5cf6', fontSize: '18px', fontWeight: '700',
              transition: 'transform 0.3s',
              transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
              display: 'inline-block',
            }}>+</span>
          </button>
          {open === i && (
            <div style={{
              padding: '0 16px 16px',
              color: '#6b7280', fontSize: '13px', lineHeight: '1.7',
              animation: 'fadeIn 0.2s ease',
            }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
