import React, { useState } from 'react'
import BottomNav from '../components/BottomNav.jsx'
import SinhasthCountdown from '../components/SinhasthCountdown.jsx'
import { SINHASTHA, SHAHI_SNAN, PARVA_SNAN, TIMELINE } from '../data/sinhastha-dates.js'

const S = { fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }

const SectionHead = ({ title, sub }) => (
  <div style={{ marginBottom: '20px' }}>
    <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800', marginBottom: '4px' }}>{title}</div>
    {sub && <div style={{ color: '#64748b', fontSize: '13px' }}>{sub}</div>}
  </div>
)

export default function SinhasthPage({ onNav }) {
  const [expandedDate, setExpandedDate] = useState(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', ...S }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
        <button onClick={() => onNav?.('chat')} style={{ background: 'transparent', border: 'none', color: '#d4af37', fontSize: '20px', cursor: 'pointer', padding: '4px', lineHeight: 1 }}>←</button>
        <div>
          <div style={{ color: '#d4af37', fontSize: '17px', fontWeight: '800' }}>🚩 Sinhastha 2026–2028</div>
          <div style={{ color: '#64748b', fontSize: '12px' }}>Official Nashik-Trimbakeshwar Kumbh Mela</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(139,92,246,0.1))', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '20px', padding: '28px 20px', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🕉</div>
          <div style={{ color: '#d4af37', fontSize: '24px', fontWeight: '900', marginBottom: '4px' }}>Sinhastha 2026–2028</div>
          <div style={{ color: '#a78bfa', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', marginBottom: '12px' }}>NASHIK-TRIMBAKESHWAR KUMBH MELA</div>
          <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.7', marginBottom: '16px' }}>
            The rarest spiritual alignment on Earth — once every 12 years. When Jupiter enters Leo, the Godavari becomes the gateway to moksha.
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { v: '21', l: 'Month Duration' },
              { v: '12', l: 'Years Between' },
              { v: '10–12 Cr', l: 'Pilgrims Expected' },
            ].map(({ v, l }) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ color: '#d4af37', fontSize: '22px', fontWeight: '800' }}>{v}</div>
                <div style={{ color: '#64748b', fontSize: '10px', fontWeight: '600' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown */}
        <div style={{ marginBottom: '20px' }}>
          <SinhasthCountdown />
        </div>

        {/* What is Sinhastha */}
        <div style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
          <SectionHead title="🌟 What is Sinhastha?" />
          <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.8', marginBottom: '14px' }}>
            <strong style={{ color: '#e2e8f0' }}>Simhastha</strong> means "Jupiter (Brihaspati) in Leo (Simha Rashi)." This rare astrological alignment — occurring once every 12 years — is believed to pour divine energy into the Godavari river, making every drop of water a vehicle of moksha (liberation).
          </div>
          <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.8', marginBottom: '16px' }}>
            According to puranic tradition, drops of the divine nectar (Amrit) from the cosmic churning of the ocean fell on four sacred places: Prayagraj, Haridwar, Ujjain, and Nashik. The Kumbh Mela at Nashik — called Sinhastha — celebrates this cosmic event.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              '✨ Happens every 12 years in Nashik',
              '✨ Last Sinhastha: 2015–16',
              '✨ Next after this: 2039',
              '✨ 21-month duration (longest ever planned)',
              '✨ 10–12 crore pilgrims expected (4–5× of 2015)',
              '✨ Governs by Nashik-Trimbakeshwar Kumbh Mela Authority (NTKMA)',
            ].map((f, i) => (
              <div key={i} style={{ color: '#e2e8f0', fontSize: '13px' }}>{f}</div>
            ))}
          </div>
        </div>

        {/* Shahi Snan Dates */}
        <div style={{ marginBottom: '20px' }}>
          <SectionHead title="🔥 Shahi Snan (Royal Bath) Dates" sub="Mark these in your calendar — most spiritually potent days" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SHAHI_SNAN.map(snan => (
              <button key={snan.n} onClick={() => setExpandedDate(expandedDate === snan.n ? null : snan.n)}
                style={{ background: expandedDate === snan.n ? `${snan.color}14` : '#1a1f2e', border: `1px solid ${snan.star ? 'rgba(212,175,55,0.5)' : '#334155'}`, borderRadius: '14px', padding: '16px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 200ms', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${snan.color}20`, border: `2px solid ${snan.color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: snan.color, flexShrink: 0 }}>{snan.n}</div>
                    <div>
                      <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '700' }}>
                        {snan.label} {snan.star && '⭐'}
                      </div>
                      <div style={{ color: snan.color, fontSize: '13px', fontWeight: '700' }}>{snan.date}</div>
                    </div>
                  </div>
                  <div style={{ color: '#475569', fontSize: '16px' }}>{expandedDate === snan.n ? '▲' : '▼'}</div>
                </div>
                {expandedDate === snan.n && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #334155' }}>
                    <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>TITHI</div>
                    <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px' }}>{snan.tithi}</div>
                    <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>SIGNIFICANCE</div>
                    <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px' }}>{snan.desc}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: `${snan.color}14`, border: `1px solid ${snan.color}40`, borderRadius: '8px', padding: '4px 10px' }}>
                      <span style={{ fontSize: '12px' }}>👥</span>
                      <span style={{ color: snan.color, fontSize: '12px', fontWeight: '700' }}>Expected: {snan.expected}</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Parva Snan */}
        <div style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '16px', padding: '18px', marginBottom: '20px' }}>
          <SectionHead title="🌕 Other Auspicious Snan Dates" sub="All Purnimas, Amavasyas, and Ekadashis are also sacred" />
          {PARVA_SNAN.map(({ date, tithi }) => (
            <div key={date} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid #252d3d' }}>
              <span style={{ color: '#d4af37', fontSize: '12px', fontWeight: '700', minWidth: '100px', flexShrink: 0 }}>{date}</span>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>{tithi}</span>
            </div>
          ))}
          <div style={{ color: '#475569', fontSize: '12px', marginTop: '10px' }}>
            + All Purnimas, Amavasyas, Ekadashis during the mela period · 44 muhurtas at Nashik · 53 at Trimbakeshwar
          </div>
        </div>

        {/* Full Timeline */}
        <div style={{ marginBottom: '20px' }}>
          <SectionHead title="📅 Full Sinhastha Timeline" sub="From Dhwajarohan to Mela's end" />
          <div style={{ position: 'relative', paddingLeft: '24px' }}>
            <div style={{ position: 'absolute', left: '10px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(to bottom, #d4af37, rgba(212,175,55,0.1))' }} />
            {TIMELINE.map(({ date, label, sub, icon, peak }, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: '16px' }}>
                <div style={{ position: 'absolute', left: '-20px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: peak ? '#d4af37' : '#334155', border: `2px solid ${peak ? '#d4af37' : '#475569'}`, boxShadow: peak ? '0 0 10px rgba(212,175,55,0.5)' : 'none' }} />
                <div style={{ background: peak ? 'rgba(212,175,55,0.06)' : '#1a1f2e', border: `1px solid ${peak ? 'rgba(212,175,55,0.25)' : '#252d3d'}`, borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '16px' }}>{icon}</span>
                    <div>
                      <div style={{ color: peak ? '#d4af37' : '#e2e8f0', fontSize: '13px', fontWeight: '700' }}>{label}</div>
                      <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>{date}</div>
                    </div>
                    {peak && <span style={{ marginLeft: 'auto', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '6px', padding: '2px 7px', color: '#d4af37', fontSize: '10px', fontWeight: '700' }}>PEAK</span>}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '12px', paddingLeft: '24px' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sacred Locations */}
        <div style={{ marginBottom: '20px' }}>
          <SectionHead title="📍 Sacred Bathing Sites" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { name: 'Nashik', sub: 'Ramkund, Panchavati', for: 'Vaishnava devotees', icon: '🏛', detail: 'City center · Lord Rama bathed here · Jai Shri Ram', color: '#f59e0b' },
              { name: 'Trimbakeshwar', sub: 'Kushavarta Kund', for: 'Shaiva devotees', icon: '🔱', detail: '28–30 km from Nashik · Jyotirlinga site · Godavari origin', color: '#8b5cf6' },
            ].map(({ name, sub, for: f, icon, detail, color }) => (
              <div key={name} style={{ backgroundColor: '#1a1f2e', border: `1px solid ${color}25`, borderRadius: '16px', padding: '18px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>
                <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '800', marginBottom: '2px' }}>{name}</div>
                <div style={{ color: color, fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>{sub}</div>
                <div style={{ color: '#64748b', fontSize: '11px', marginBottom: '8px' }}>{f}</div>
                <div style={{ color: '#475569', fontSize: '11px', lineHeight: '1.5' }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pilgrim Prep */}
        <div style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
          <SectionHead title="🎒 Prepare for Sinhastha 2026" sub="Start now — 10 crore pilgrims can't be wrong" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { title: '🧘 Spiritual Prep', items: ['Start daily meditation', 'Learn Godavari mantras', 'Understand Kumbh rituals', 'Use Kumbh Acharya daily', 'Join the community'] },
              { title: '🧳 Practical Prep', items: ['Book accommodation early', 'Plan travel (road/rail/air)', 'Keep Aadhaar card ready', 'Download official Kumbh app', 'Learn local customs'] },
            ].map(({ title, items }) => (
              <div key={title}>
                <div style={{ color: '#d4af37', fontSize: '13px', fontWeight: '700', marginBottom: '10px' }}>{title}</div>
                {items.map((item, i) => (
                  <div key={i} style={{ color: '#94a3b8', fontSize: '12px', padding: '4px 0', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <span style={{ color: '#10b981', flexShrink: 0 }}>✓</span>{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(139,92,246,0.1))', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '16px', padding: '24px', textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🕉</div>
          <div style={{ color: '#d4af37', fontSize: '17px', fontWeight: '800', marginBottom: '8px' }}>Ready to begin your journey?</div>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px', lineHeight: '1.7' }}>
            Ask Kumbh Acharya anything — from travel tips to mantras, from ritual guidance to historical significance.
          </div>
          <button onClick={() => onNav?.('chat')}
            style={{ background: 'linear-gradient(135deg,#d4af37,#b8962c)', color: '#0f1419', border: 'none', borderRadius: '12px', padding: '14px 32px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit' }}>
            🙏 Start Spiritual Preparation
          </button>
        </div>
      </div>

      <BottomNav page="sinhastha" onNav={onNav} />
    </div>
  )
}
