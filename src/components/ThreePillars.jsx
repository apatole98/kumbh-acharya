import React, { useState } from 'react'
import Reveal from './Reveal.jsx'
import { addRipple } from '../utils/ripple.js'

const pillars = [
  {
    icon: '🤖',
    color: '#8b5cf6',
    colorBg: 'rgba(139,92,246,0.08)',
    colorBorder: 'rgba(139,92,246,0.3)',
    colorGlow: '0 0 40px rgba(139,92,246,0.15)',
    title: 'AI Spiritual Guide',
    subtitle: 'Ancient wisdom, instant answers',
    tagline: 'Your personal Vedic scholar — 24/7',
    desc: 'Ask any question about Vedic rituals, mantras, pilgrimage routes, or sacred texts — and receive thoughtful, scripture-backed answers in seconds. Available in 5 languages, 24/7.',
    expanded: 'Kumbh Acharya\'s AI is trained on thousands of Vedic scriptures, Nashik-Trimbakeshwar history, and modern pilgrimage wisdom. Unlike generic chatbots, it understands context — your situation, your language, your beliefs.',
    benefits: [
      'Personalized mantra recommendations by time & purpose',
      'Puja vidhi step-by-step guidance in your language',
      'Kumbh Mela snan timing, ghats & crowd safety tips',
      'Sanskrit shlokas explained simply without losing depth',
      'Auspicious muhurta & Hindu calendar guidance',
    ],
    stats: ['12L+ Mantras explained', '5 Languages', '24/7 available', '50K+ pilgrims'],
    cta: 'Explore AI Guide →',
    page: 'ai-guide',
  },
  {
    icon: '🚩',
    color: '#d4af37',
    colorBg: 'rgba(212,175,55,0.08)',
    colorBorder: 'rgba(212,175,55,0.3)',
    colorGlow: '0 0 40px rgba(212,175,55,0.12)',
    title: 'Sinhastha 2027 Guide',
    subtitle: 'Complete Nashik Kumbh preparation',
    tagline: 'Dates, ghats, rituals & safety — all in one place',
    desc: 'Everything you need for Nashik Simhastha 2027 — Shahi Snan dates, sacred ghat guides, crowd safety tips, accommodation, and a live countdown to Oct 31, 2026.',
    expanded: 'Nashik-Trimbakeshwar Simhastha 2027 is expected to draw 10–12 crore pilgrims across 21 months. The AI knows every detail — from the Dhwajarohan ceremony to the 4 Shahi Snan muhurtas, so you arrive prepared and leave transformed.',
    benefits: [
      '4 Shahi Snan dates with exact muhurtas',
      'Ramkund & Kushavarta ghat detailed guides',
      'Live countdown to Dhwajarohan (Oct 31, 2026)',
      'Crowd management & safety tips for peak days',
      'Nashik & Trimbakeshwar accommodation guidance',
    ],
    stats: ['4 Shahi Snan', '21-month Kumbh', '10–12 Cr pilgrims', 'Oct 2026 start'],
    cta: 'Explore Sinhastha Guide →',
    page: 'sinhastha',
  },
  {
    icon: '🕌',
    color: '#10b981',
    colorBg: 'rgba(16,185,129,0.08)',
    colorBorder: 'rgba(16,185,129,0.3)',
    colorGlow: '0 0 40px rgba(16,185,129,0.12)',
    title: 'Pilgrim Community',
    subtitle: 'Journey together, grow together',
    tagline: 'Find your Kumbh yatra companions',
    desc: 'Connect with fellow pilgrims planning Nashik Simhastha 2027. Share experiences, seek advice, post photos from sacred sites, and build lifelong spiritual friendships.',
    expanded: 'The Kumbh experience is magnified when shared. Our community brings together pilgrims from every corner of India — find travel companions, get local tips from Nashik residents, share blessings, and support each other on the spiritual path.',
    benefits: [
      'Forum posts & deep spiritual discussions',
      'Direct messaging with fellow pilgrims',
      'Trip planning & yatra buddy-finding',
      'Share blessings & sacred moments',
      'Verified community guides from Nashik & Trimbak',
    ],
    stats: ['5K+ Members', '89+ Posts daily', '3 Languages', 'Moderated'],
    cta: 'Join Community →',
    page: 'community',
  },
]

export default function ThreePillars({ onNav }) {
  const [expanded, setExpanded] = useState(null)
  const [hovered, setHovered] = useState(null)

  const toggle = (i) => setExpanded(expanded === i ? null : i)

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px', padding: '5px 16px', fontSize: '12px', color: '#d4af37', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
          THREE PILLARS OF KUMBH ACHARYA
        </div>
        <h2 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: '800', color: '#fff', marginBottom: '12px', lineHeight: 1.2 }}>
          Everything you need for<br /><span style={{ color: '#d4af37' }}>your Kumbh journey</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '480px', margin: '0 auto' }}>
          Click any pillar to explore in depth
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {pillars.map((p, i) => {
          const isExpanded = expanded === i
          const isHovered = hovered === i

          return (
            <Reveal as="div" key={i} direction="up" delay={i * 120}
              className="ripple-host"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: isExpanded ? p.colorBg : (isHovered ? 'rgba(255,255,255,0.03)' : '#1a1f2e'),
                border: `1px solid ${isExpanded || isHovered ? p.colorBorder : '#2d3748'}`,
                borderRadius: '16px',
                padding: '28px 24px',
                transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.35s ease, transform 0.35s ease',
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: isHovered || isExpanded ? p.colorGlow : 'none',
                transform: isHovered && !isExpanded ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
              }}
              onMouseDown={addRipple}
              onClick={() => toggle(i)}
            >
              {/* top accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(to right, ${p.color}, transparent)`, opacity: isExpanded || isHovered ? 1 : 0.3, transition: 'opacity 0.3s' }} />

              {/* header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div className="icon-spin-hover" style={{ fontSize: '36px', marginBottom: '10px' }}>{p.icon}</div>
                  <div style={{ color: p.color, fontSize: '10px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '6px' }}>{p.subtitle.toUpperCase()}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#fff', margin: 0 }}>{p.title}</h3>
                </div>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: isExpanded ? p.colorBorder : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isExpanded ? p.color : '#3a4557'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isExpanded ? p.color : '#64748b',
                  fontSize: '16px', fontWeight: '300', flexShrink: 0,
                  transition: 'all 0.25s',
                  transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                }}>+</div>
              </div>

              <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>{p.desc}</p>

              {/* Collapsed: quick benefits */}
              {!isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                  {p.benefits.slice(0, 3).map((b, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: p.color, marginTop: '2px', fontSize: '11px' }}>✓</span>
                      <span style={{ color: '#64748b', fontSize: '12px' }}>{b}</span>
                    </div>
                  ))}
                  <div style={{ color: '#475569', fontSize: '11px', marginTop: '2px' }}>+ {p.benefits.length - 3} more — click to expand</div>
                </div>
              )}

              {/* Expanded: full details */}
              {isExpanded && (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic', borderLeft: `3px solid ${p.color}`, paddingLeft: '12px' }}>
                    {p.expanded}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {p.benefits.map((b, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: p.color, marginTop: '2px', fontSize: '12px', fontWeight: '700' }}>✓</span>
                        <span style={{ color: '#cbd5e1', fontSize: '13px' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                  {/* Stats row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '20px' }}>
                    {p.stats.map((s, j) => (
                      <div key={j} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px 10px', textAlign: 'center' }}>
                        <div style={{ color: p.color, fontSize: '12px', fontWeight: '700' }}>{s}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="ripple-host press-fx"
                onMouseDown={addRipple}
                onClick={(e) => { e.stopPropagation(); onNav?.(p.page) }}
                style={{
                  background: isExpanded ? p.color : 'transparent',
                  color: isExpanded ? '#0f1419' : p.color,
                  border: `1px solid ${p.color}`,
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  width: '100%',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = p.color; e.currentTarget.style.color = '#0f1419' }}
                onMouseLeave={e => { e.currentTarget.style.background = isExpanded ? p.color : 'transparent'; e.currentTarget.style.color = isExpanded ? '#0f1419' : p.color }}
              >
                {p.cta}
              </button>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
