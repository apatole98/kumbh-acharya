import React, { useState } from 'react'
import { useGamification, ALL_BADGES, RARITY_COLORS } from '../context/GamificationContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

const CATS = ['All', 'Spiritual', 'Community', 'Pro']

export default function BadgesPage({ onNav }) {
  const { gami } = useGamification()
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const myBadges = gami?.badges || []
  const filtered = ALL_BADGES.filter(b => filter === 'All' || b.cat === filter.toLowerCase())
  const unlockedCount = myBadges.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '16px 20px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>🎖 Badges</div>
            <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>{unlockedCount} / {ALL_BADGES.length} unlocked</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#d4af37,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '800', color: '#fff' }}>
            {unlockedCount}
          </div>
        </div>
        {/* Filter */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '12px' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: '6px 14px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', fontSize: '12px', fontWeight: '600', backgroundColor: filter === c ? '#d4af37' : '#252d3d', color: filter === c ? '#0f1419' : '#94a3b8' }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {filtered.map(badge => {
            const unlocked = myBadges.includes(badge.id)
            const rColor   = RARITY_COLORS[badge.rarity]
            return (
              <button key={badge.id} onClick={() => setSelected(badge)} style={{
                backgroundColor: unlocked ? '#1a1f2e' : '#111827',
                border: `1px solid ${unlocked ? rColor : '#1e293b'}`,
                borderRadius: '14px', padding: '16px 10px', textAlign: 'center',
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: unlocked ? `0 0 12px ${rColor}25` : 'none',
                transition: 'all 200ms', opacity: unlocked ? 1 : 0.5,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = rColor }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = unlocked ? rColor : '#1e293b' }}>
                <div style={{ fontSize: '30px', marginBottom: '8px', filter: unlocked ? 'none' : 'grayscale(1)', lineHeight: 1 }}>
                  {badge.icon}
                </div>
                <div style={{ color: unlocked ? '#e2e8f0' : '#475569', fontSize: '11px', fontWeight: '700', lineHeight: 1.3, marginBottom: '4px' }}>
                  {badge.name}
                </div>
                <div style={{ backgroundColor: `${rColor}25`, border: `1px solid ${rColor}40`, borderRadius: '6px', padding: '2px 6px', display: 'inline-block' }}>
                  <span style={{ color: rColor, fontSize: '9px', fontWeight: '700', textTransform: 'uppercase' }}>
                    {badge.rarity}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
        <div style={{ height: '8px' }} />
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="ai" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100, padding: '0' }}
          onClick={() => setSelected(null)}>
          <div style={{ backgroundColor: '#1a1f2e', borderRadius: '20px 20px 0 0', border: `1px solid ${RARITY_COLORS[selected.rarity]}40`, width: '100%', maxWidth: '640px', padding: '28px 24px', animation: 'slideUp 0.3s ease' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '52px', marginBottom: '12px', filter: myBadges.includes(selected.id) ? 'none' : 'grayscale(1)' }}>{selected.icon}</div>
              <div style={{ color: '#fff', fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>{selected.name}</div>
              <div style={{ display: 'inline-block', backgroundColor: `${RARITY_COLORS[selected.rarity]}25`, border: `1px solid ${RARITY_COLORS[selected.rarity]}`, borderRadius: '10px', padding: '3px 14px', marginBottom: '14px' }}>
                <span style={{ color: RARITY_COLORS[selected.rarity], fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>{selected.rarity}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>{selected.desc}</div>
            </div>
            <div style={{ backgroundColor: myBadges.includes(selected.id) ? 'rgba(16,185,129,0.1)' : '#252d3d', border: `1px solid ${myBadges.includes(selected.id) ? 'rgba(16,185,129,0.3)' : '#334155'}`, borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              {myBadges.includes(selected.id)
                ? <div style={{ color: '#34d399', fontWeight: '700' }}>✅ Badge Unlocked!</div>
                : <div style={{ color: '#64748b' }}>🔒 Keep going to unlock this badge</div>
              }
            </div>
            <button onClick={() => setSelected(null)} style={{ width: '100%', marginTop: '14px', padding: '13px', backgroundColor: '#252d3d', border: '1px solid #334155', borderRadius: '12px', color: '#94a3b8', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>
              Close
            </button>
          </div>
        </div>
      )}

      <BottomNav page="gamification" onNav={onNav} />
    </div>
  )
}
