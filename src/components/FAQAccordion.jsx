import React, { useState, useMemo } from 'react'
import Reveal from './Reveal.jsx'
import { addRipple } from '../utils/ripple.js'

const FAQS = [
  {
    category: 'Getting Started',
    q: 'What is Kumbh Acharya and how does it work?',
    a: 'Kumbh Acharya is an AI-powered spiritual guide built specifically for Nashik Simhastha Kumbh Mela 2027 pilgrims. Ask it anything — sacred mantras, Shahi Snan dates, how to perform Rudrabhishek, how to reach Trimbakeshwar, or guidance on any Hindu ritual. It responds in 5 languages: Hindi, English, Marathi, Gujarati, and Bengali. Powered by advanced AI trained on Vedic knowledge, it gives accurate, spiritually enriching answers in seconds.',
    link: null,
  },
  {
    category: 'Sinhastha 2027',
    q: 'When are the Shahi Snan dates for Nashik Kumbh 2027?',
    a: 'The four Shahi Snan dates for Nashik Simhastha Kumbh 2027 are:\n• Aug 2, 2027 — First Snan (Shravan Somvar)\n• Aug 31, 2027 ★ — Most Auspicious (Raksha Bandhan/Bhadrapad Amavasya)\n• Sep 11, 2027 — Vaishnava Snan (Nashik Ghat, Ganesh Chaturthi)\n• Sep 12, 2027 — Shaiva Snan (Trimbakeshwar)\nAug 31 is considered the most powerful snan — bathing at Ramkund on this day is believed to grant liberation across generations.',
    link: 'sinhastha',
  },
  {
    category: 'Sinhastha 2027',
    q: 'What is Simhastha Yoga and why is Nashik Kumbh special?',
    a: 'Simhastha Yoga occurs when Jupiter (Brihaspati) enters Leo (Simha Rashi) while the Sun is in Aries — a rare celestial alignment happening roughly every 12 years. At this time, the Godavari River at Nashik and the Kushavarta Kund at Trimbakeshwar are believed to be spiritually equivalent to the Ganga at Prayagraj. The 2027 Kumbh (Oct 31, 2026 – Jul 24, 2028) is the Nashik-Trimbakeshwar Simhastha — expected to draw 10–12 crore pilgrims across its 21-month span.',
    link: 'sinhastha',
  },
  {
    category: 'Pricing',
    q: 'What is the difference between Free and Pro plans?',
    a: 'Free plan: 3 chats per day, all 5 languages, full community access, Sinhastha guide and sacred locations map.\nPro plan (₹99/month): Unlimited chats, priority AI responses, full chat history saved, daily mantra notifications, ritual scheduler, Kundli analysis, and all upcoming features as they launch. Pro is ideal for serious pilgrims who want unrestricted access to Vedic guidance.',
    link: 'features',
  },
  {
    category: 'Getting Started',
    q: 'Can I use Kumbh Acharya on multiple devices?',
    a: 'Yes. Simply log in with your account on any device — phone, tablet, or desktop. Your Pro subscription is tied to your account, not a single device. Chat history sync across devices is a Pro feature coming soon.',
    link: null,
  },
  {
    category: 'AI',
    q: 'What rituals and topics can I ask the AI about?',
    a: 'You can ask about: Shahi Snan preparation & safety, Trimbakeshwar and Nashik ghats, mantras & their correct pronunciation, puja vidhi step-by-step, Hindu calendar & muhurtas, Vedic philosophy & Upanishads, Ayurvedic wellness for pilgrimage, ancestor rituals (Tarpan & Pind Daan), and anything Nashik-Trimbakeshwar Kumbh related. The AI knows Vedic texts deeply and answers with cultural sensitivity.',
    link: 'ai-guide',
  },
  {
    category: 'AI',
    q: 'Is the AI accurate about Hindu scriptures and rituals?',
    a: 'Kumbh Acharya is trained on authentic Vedic sources and cross-referenced with traditional pandit knowledge. For mainstream rituals and Kumbh guidance, it is highly accurate. For rare or regional variations, it will note when multiple interpretations exist. We always recommend consulting your family pandit for life events. The AI is a knowledgeable guide, not a replacement for your guru.',
    link: null,
  },
  {
    category: 'Sinhastha 2027',
    q: 'What safety precautions should I take during Shahi Snan?',
    a: 'During peak Shahi Snan days, crowds can exceed 1 crore pilgrims at a single ghat. Carry minimal valuables, keep a printed ID with an emergency contact, agree on a meeting point with your group beforehand, stay hydrated, and follow police/volunteer directions at all times. Kumbh Acharya can give you ghat-specific crowd timing tips so you avoid the busiest hours.',
    link: 'sinhastha',
  },
  {
    category: 'Getting Started',
    q: 'Can I save or revisit my past conversations?',
    a: 'Pro users get full chat history saved across sessions. Free users can scroll back within the current session, but history resets when you clear your browser data since conversations are stored locally on your device, not on our servers.',
    link: 'features',
  },
  {
    category: 'Community',
    q: 'How does the pilgrim community work?',
    a: 'The community is a forum for Nashik Kumbh 2027 pilgrims. You can post questions, share experiences, find travel companions for the yatra, get local tips from Nashik residents, share blessings and sacred photos, and message other pilgrims directly. All posts are moderated to maintain a respectful, spiritual atmosphere. Earn community bonus points for helpful posts and replies.',
    link: 'community',
  },
  {
    category: 'Pricing',
    q: 'Can I cancel my Pro subscription anytime?',
    a: 'Yes, cancel anytime from your Profile page. There is no lock-in period and no cancellation fees. Your Pro access continues until the end of the current billing cycle. We also offer a 7-day full refund policy — if you are not satisfied, contact us and we will process your refund within 24 hours, no questions asked.',
    link: null,
  },
  {
    category: 'Getting Started',
    q: 'Is my conversation data secure and private?',
    a: 'Yes. Your conversations with Kumbh Acharya are encrypted in transit and at rest. We never sell or share your data with third parties. Your spiritual queries are deeply personal — we treat them with the highest respect and confidentiality. All data is stored locally in your browser (localStorage) — we do not send your chat history to external servers. See our Privacy Policy for full details.',
    link: 'privacy',
  },
  {
    category: 'Pricing',
    q: 'Do you offer an annual plan?',
    a: 'Yes! The 1-Year Plan is ₹999 (only ₹83/month) — saving you ₹300 compared to monthly billing. Available in the One-Time purchases section on the Features/Pricing page. This is the best value for pilgrims who want year-round Vedic guidance through the full Kumbh 2027 season.',
    link: 'features',
  },
]

const CATEGORIES = ['All', 'Getting Started', 'Sinhastha 2027', 'AI', 'Community', 'Pricing']

const catColors = {
  'Getting Started': '#10b981',
  'Sinhastha 2027': '#d4af37',
  'AI': '#8b5cf6',
  'Community': '#06b6d4',
  'Pricing': '#ec4899',
}

export default function FAQAccordion({ onNav }) {
  const [open, setOpen]   = useState(null)
  const [search, setSearch] = useState('')
  const [cat, setCat]     = useState('All')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return FAQS.filter(f => {
      const matchCat = cat === 'All' || f.category === cat
      const matchQ   = !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [search, cat])

  const highlight = (text) => {
    if (!search) return text
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return parts.map((p, i) =>
      regex.test(p) ? <mark key={i} style={{ background: 'rgba(212,175,55,0.3)', color: '#d4af37', borderRadius: '2px', padding: '0 2px' }}>{p}</mark> : p
    )
  }

  return (
    <div>
      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search questions... (e.g. 'shahi snan', 'pricing', 'badges')"
          value={search}
          onChange={e => { setSearch(e.target.value); setOpen(null) }}
          style={{
            width: '100%',
            backgroundColor: '#1a1f2e',
            border: '1px solid #3a4557',
            borderRadius: '10px',
            padding: '12px 42px 12px 16px',
            color: '#e2e8f0',
            fontSize: '14px',
            fontFamily: 'inherit',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = '#d4af37'}
          onBlur={e => e.target.style.borderColor = '#3a4557'}
        />
        <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', opacity: 0.5 }}>🔍</span>
      </div>

      {/* Category filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
        {CATEGORIES.map(c => (
          <button
            key={c}
            className="ripple-host press-fx"
            onMouseDown={addRipple}
            onClick={() => { setCat(c); setOpen(null) }}
            style={{
              background: cat === c ? (catColors[c] || '#d4af37') : 'transparent',
              color: cat === c ? '#0f1419' : (catColors[c] || '#94a3b8'),
              border: `1px solid ${catColors[c] || (cat === c ? '#d4af37' : '#3a4557')}`,
              borderRadius: '20px',
              padding: '5px 14px',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results count */}
      {(search || cat !== 'All') && (
        <div style={{ color: '#475569', fontSize: '12px', marginBottom: '16px' }}>
          {filtered.length} question{filtered.length !== 1 ? 's' : ''} found
          {search && ` for "${search}"`}
          {cat !== 'All' && ` in ${cat}`}
        </div>
      )}

      {/* FAQ items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#475569' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '15px', marginBottom: '8px' }}>No questions found</div>
            <div style={{ fontSize: '13px' }}>Try a different search term or category</div>
            <button onClick={() => { setSearch(''); setCat('All') }} style={{ marginTop: '16px', background: 'transparent', color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
              Clear filters
            </button>
          </div>
        ) : filtered.map((faq, i) => (
          <Reveal as="div" key={`${cat}-${i}-${search}`} direction="up" delay={i * 60} style={{
            backgroundColor: '#1a1f2e',
            border: open === i ? `1px solid ${catColors[faq.category] || 'rgba(212,175,55,0.5)'}` : '1px solid #3a4557',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'border-color 0.2s, box-shadow 0.3s',
            boxShadow: open === i ? `0 0 24px ${catColors[faq.category]}22` : 'none',
          }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '18px 20px',
                backgroundColor: 'transparent', border: 'none',
                cursor: 'pointer', textAlign: 'left',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ flex: 1, paddingRight: '16px' }}>
                <span style={{
                  display: 'inline-block',
                  background: `${catColors[faq.category]}22`,
                  color: catColors[faq.category] || '#d4af37',
                  fontSize: '10px', fontWeight: '700',
                  padding: '2px 8px', borderRadius: '8px',
                  marginBottom: '6px', letterSpacing: '0.5px',
                }}>
                  {faq.category.toUpperCase()}
                </span>
                <div style={{ color: open === i ? '#d4af37' : '#e2e8f0', fontSize: '14px', fontWeight: '600', lineHeight: 1.4 }}>
                  {highlight(faq.q)}
                </div>
              </div>
              <span style={{
                color: '#d4af37', fontSize: '20px', fontWeight: '300',
                flexShrink: 0, transition: 'transform 0.3s ease',
                transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                display: 'inline-block', lineHeight: 1,
              }}>+</span>
            </button>

            {open === i && (
              <div className="anim-fadein" style={{
                padding: '0 20px 18px',
                color: '#94a3b8', fontSize: '13px', lineHeight: '1.85',
                borderLeft: `3px solid ${catColors[faq.category] || '#d4af37'}`,
                marginLeft: '20px', paddingLeft: '16px', marginRight: '20px',
              }}>
                {highlight(faq.a)}
                {faq.link && onNav && (
                  <div style={{ marginTop: '14px' }}>
                    <button
                      className="ripple-host press-fx"
                      onMouseDown={addRipple}
                      onClick={() => onNav(faq.link)}
                      style={{
                        background: 'transparent',
                        color: catColors[faq.category] || '#d4af37',
                        border: `1px solid ${catColors[faq.category] || 'rgba(212,175,55,0.4)'}`,
                        borderRadius: '8px', padding: '7px 14px',
                        fontSize: '12px', fontWeight: '700',
                        cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      Learn more →
                    </button>
                  </div>
                )}
              </div>
            )}
          </Reveal>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{ marginTop: '36px', padding: '24px', background: '#1a1f2e', border: '1px solid #2d3748', borderRadius: '14px', textAlign: 'center' }}>
        <div style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '15px', marginBottom: '8px' }}>Still have questions?</div>
        <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>Our team responds within 24 hours</div>
        <button
          className="ripple-host press-fx glow-gold-lg"
          onMouseDown={addRipple}
          onClick={() => onNav?.('contact')}
          style={{ background: '#d4af37', color: '#0f1419', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', transition: 'transform 200ms var(--ease)' }}
        >
          📧 Contact Us
        </button>
      </div>
    </div>
  )
}
