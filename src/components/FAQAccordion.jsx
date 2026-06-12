import React, { useState } from 'react'

const FAQS = [
  {
    q: 'What is Kumbh Acharya and how does it work?',
    a: 'Kumbh Acharya is an AI-powered spiritual guide built specifically for Maha Kumbh Mela 2025 pilgrims. Ask it anything — sacred mantras, Shahi Snan dates, how to perform Tarpan, how to reach Prayagraj, the significance of Triveni Sangam, or guidance on any Hindu ritual. It responds in 5 languages: Hindi, English, Marathi, Gujarati, and Bengali. Powered by advanced AI trained on Vedic knowledge, it gives accurate, spiritually enriching answers in seconds.',
  },
  {
    q: 'When are the Shahi Snan (Royal Bath) dates for Kumbh Mela 2025?',
    a: 'The five Shahi Snan dates for Maha Kumbh Mela 2025 in Prayagraj are:\n• Makar Sankranti — 14 January 2025 (first royal bath)\n• Mauni Amavasya — 29 January 2025 (most auspicious; crores bathe in silence)\n• Basant Panchami — 3 February 2025\n• Maghi Purnima — 12 February 2025\n• Maha Shivratri — 26 February 2025 (final bath)\nMauni Amavasya is considered the most powerful snan — bathing at Triveni Sangam on this day is believed to wash away sins of seven lifetimes.',
  },
  {
    q: 'What is Triveni Sangam and why is it sacred?',
    a: 'Triveni Sangam is the confluence of three holy rivers at Prayagraj: the visible Ganga (flowing from the north), the visible Yamuna (flowing from the south, with distinctly darker blue waters), and the mystical invisible Saraswati river (believed to flow underground). This meeting point is one of the holiest sites in Hinduism. Bathing here during Kumbh Mela is said to liberate the soul from the cycle of birth and rebirth (moksha) and purify karmic impurities accumulated over multiple lifetimes.',
  },
  {
    q: 'What is the difference between Free and Pro plans?',
    a: 'Free plan: 3 chats per day, all 5 languages, access to all basic features.\nPro plan (₹99/month): Unlimited chats, priority AI responses (faster), full chat history saved, daily mantra notifications at 6 AM, ritual scheduler, Kundli analysis, and all upcoming features as they launch. Pro is ideal for serious pilgrims and spiritual seekers who want unrestricted access to Vedic guidance.',
  },
  {
    q: 'Can I use Kumbh Acharya on multiple devices?',
    a: 'Yes. Simply log in with your account on any device — phone, tablet, or desktop. Your Pro subscription is tied to your account, not a single device. Chat history sync across devices is a Pro feature and is coming soon.',
  },
  {
    q: 'What rituals should I perform at Kumbh Mela?',
    a: 'The main rituals at Kumbh Mela are: Snan (holy bath at Triveni Sangam, ideally at sunrise during Brahma Muhurta), Tarpan (offering water mixed with sesame seeds to ancestors, facing south), Daan (charity — donating to sadhus, Brahmins, and the poor is especially meritorious during Kumbh), Kalpavas (a month-long spiritual stay with one meal per day, sleeping on the ground, and daily bathing), and Pind Daan (rice-ball offerings for departed ancestors). Ask Kumbh Acharya for step-by-step guidance on performing any of these rituals.',
  },
  {
    q: 'What should I carry when going to Kumbh Mela?',
    a: 'Essential items for Kumbh pilgrims: a copper or brass Gangajal pot to collect holy water, saffron or yellow clothing for the bath, a Rudraksha mala for chanting, dhoop/agarbatti for rituals, your Aadhaar card (required for registration), and small denomination cash for donations. Avoid carrying leather items near the ghats, and refrain from non-vegetarian food and alcohol during the mela period for maximum spiritual merit.',
  },
  {
    q: 'Can I cancel my Pro subscription anytime?',
    a: 'Yes, cancel anytime from your Profile page. There is no lock-in period and no cancellation fees. Your Pro access continues until the end of the current billing cycle. We also offer a 7-day full refund policy — if you are not satisfied, contact us and we will process your refund within 24 hours, no questions asked.',
  },
  {
    q: 'Is my conversation data secure and private?',
    a: 'Yes. Your conversations with Kumbh Acharya are encrypted in transit and at rest. We never sell or share your data with third parties. Your spiritual queries and journey are deeply personal — we treat them with the highest respect and confidentiality. We follow strict data privacy standards in accordance with Indian IT laws.',
  },
  {
    q: 'Do you offer an annual plan?',
    a: 'Yes! The 1-Year Plan is ₹999 (only ₹83/month) — saving you ₹300 compared to monthly billing. This is available in the One-Time purchases section. It is the best value for pilgrims who want year-round Vedic guidance, not just during Kumbh season.',
  },
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
