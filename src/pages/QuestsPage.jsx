import React, { useState } from 'react'
import { useGamification } from '../context/GamificationContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

const TABS = ['Daily', 'Weekly', 'Milestone']

function QuestCard({ q, type, onClaim }) {
  const pct = Math.round((q.progress / q.req) * 100)
  return (
    <div style={{
      backgroundColor: '#1a1f2e', borderRadius: '14px', padding: '18px',
      border: `1px solid ${q.completed ? '#334155' : q.ready ? 'rgba(212,175,55,0.5)' : '#334155'}`,
      opacity: q.completed ? 0.7 : 1, transition: 'all 200ms',
      marginBottom: '12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ fontSize: '26px', flexShrink: 0, marginTop: '2px' }}>
          {q.completed ? '✅' : q.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
            <div style={{ color: q.completed ? '#64748b' : '#fff', fontSize: '14px', fontWeight: '700', textDecoration: q.completed ? 'line-through' : 'none' }}>
              {q.title}
            </div>
            <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: '700', flexShrink: 0, backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '8px', padding: '2px 8px' }}>
              +{q.points}
            </div>
          </div>
          <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '10px' }}>{q.desc}</div>

          {/* Progress bar */}
          <div style={{ height: '6px', backgroundColor: '#252d3d', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
            <div style={{
              height: '100%', width: `${pct}%`,
              background: q.completed ? '#334155' : q.ready ? '#d4af37' : 'linear-gradient(to right, #8b5cf6, #d4af37)',
              borderRadius: '3px', transition: 'width 0.6s ease',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: '#94a3b8', fontSize: '11px' }}>
              {q.progress}/{q.req}  {q.completed ? '— Complete!' : `(${pct}%)`}
            </div>
            {q.reward && <div style={{ color: '#a78bfa', fontSize: '11px', fontWeight: '600' }}>🎁 {q.reward}</div>}
          </div>
        </div>
      </div>

      {q.ready && (
        <button onClick={() => onClaim(q.id, type, q.points)} style={{
          width: '100%', marginTop: '12px', padding: '10px',
          background: 'linear-gradient(135deg, #d4af37, #b8962c)',
          border: 'none', borderRadius: '10px', color: '#0f1419',
          fontSize: '13px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit',
          animation: 'pulseGold 2s ease-in-out infinite',
        }}>
          🎉 Claim {q.points} Points!
        </button>
      )}
    </div>
  )
}

export default function QuestsPage({ onNav }) {
  const [tab, setTab] = useState(0)
  const { getDailyQuests, getWeeklyQuests, getMilestoneQuests, claimQuest, gami } = useGamification()

  const daily     = getDailyQuests()
  const weekly    = getWeeklyQuests()
  const milestone = getMilestoneQuests()

  const lists = [daily, weekly, milestone]
  const types = ['daily', 'weekly', 'milestone']

  const dailyPts   = daily.filter(q => q.completed).reduce((s, q) => s + q.points, 0)
  const weeklyPts  = weekly.filter(q => q.completed).reduce((s, q) => s + q.points, 0)
  const readyCount = [...daily, ...weekly, ...milestone].filter(q => q.ready).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '16px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>⚔ Quests</div>
            <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>{readyCount > 0 ? `${readyCount} quest${readyCount > 1 ? 's' : ''} ready to claim! 🎉` : 'Complete quests to earn points'}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>{(gami?.points?.total || 0).toLocaleString()}</div>
            <div style={{ color: '#64748b', fontSize: '11px' }}>Total pts</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
          {TABS.map((t, i) => {
            const count = [daily, weekly, milestone][i].filter(q => q.ready).length
            return (
              <button key={t} onClick={() => setTab(i)} style={{
                flex: 1, padding: '8px 4px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit',
                backgroundColor: tab === i ? '#d4af37' : '#252d3d',
                color: tab === i ? '#0f1419' : '#94a3b8',
                fontSize: '12px', fontWeight: '700', position: 'relative',
              }}>
                {t}
                {count > 0 && <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#ef4444', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '9px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Quest List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {/* Summary bar */}
        {tab === 0 && (
          <div style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ color: '#94a3b8', fontSize: '13px' }}>Today earned</div>
            <div style={{ color: '#d4af37', fontWeight: '700', fontSize: '14px' }}>+{dailyPts} / 175 pts</div>
          </div>
        )}
        {tab === 1 && (
          <div style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ color: '#94a3b8', fontSize: '13px' }}>This week earned</div>
            <div style={{ color: '#d4af37', fontWeight: '700', fontSize: '14px' }}>+{weeklyPts} / 900 pts</div>
          </div>
        )}
        {tab === 2 && (
          <div style={{ backgroundColor: '#1a1228', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' }}>
            <div style={{ color: '#a78bfa', fontSize: '13px', fontWeight: '600' }}>🏆 Long-term achievements with special rewards</div>
          </div>
        )}

        {lists[tab].map(q => (
          <QuestCard key={q.id} q={q} type={types[tab]} onClaim={claimQuest} />
        ))}
      </div>

      <BottomNav page="gamification" onNav={onNav} />
    </div>
  )
}
