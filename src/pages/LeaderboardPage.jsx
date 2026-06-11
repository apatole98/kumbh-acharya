import React, { useState } from 'react'
import { useAuth } from '../components/AuthContext.jsx'
import { useGamification } from '../context/GamificationContext.jsx'
import { LEADERBOARD } from '../context/CommunityContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

const RANK_REWARDS = [
  { rank: 1,     reward: '3 months Pro + Featured badge', color: '#ffd700' },
  { rank: 2,     reward: '2 months Pro',                  color: '#c0c0c0' },
  { rank: 3,     reward: '1 month Pro',                   color: '#cd7f32' },
  { rank: '4-10',reward: '2 weeks Pro each',              color: '#64748b' },
]

function RankMedal({ rank }) {
  if (rank === 1) return <span style={{ fontSize: '22px' }}>🥇</span>
  if (rank === 2) return <span style={{ fontSize: '22px' }}>🥈</span>
  if (rank === 3) return <span style={{ fontSize: '22px' }}>🥉</span>
  return <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '700', width: '22px', textAlign: 'center', display: 'inline-block' }}>#{rank}</span>
}

function Avatar({ name, isPro, size = 36 }) {
  const initials = name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: '700', color: '#fff', background: isPro ? 'linear-gradient(135deg,#d4af37,#8b5cf6)' : 'linear-gradient(135deg,#334155,#475569)' }}>
      {initials}
    </div>
  )
}

export default function LeaderboardPage({ onNav }) {
  const { user } = useAuth()
  const { gami } = useGamification()
  const [tab, setTab] = useState(0)

  const userPts = gami?.points?.total || 0
  // Insert real user into leaderboard
  const myRow = { name: user?.name || 'You', pts: userPts, streak: gami?.streak?.current || 0, badges: gami?.badges || [], isPro: user?.isPro || false, isMe: true }
  const board = [...LEADERBOARD].sort((a, b) => b.pts - a.pts)
  const insertIdx = board.findIndex(r => userPts > r.pts)
  let myRank = insertIdx === -1 ? board.length + 1 : insertIdx + 1
  const displayBoard = [...board]
  if (insertIdx === -1) displayBoard.push({ ...myRow, rank: myRank })
  else displayBoard.splice(insertIdx, 0, { ...myRow, rank: myRank })
  // Re-rank
  displayBoard.forEach((r, i) => { r.rank = i + 1 })

  const TABS = ['🌍 Global', '📅 Weekly', '👥 Community']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '16px 20px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>🏆 Leaderboard</div>
            <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>Your rank: <span style={{ color: '#d4af37', fontWeight: '700' }}>#{myRank}</span></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>{userPts.toLocaleString()}</div>
            <div style={{ color: '#64748b', fontSize: '11px' }}>Your points</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '0' }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{ flex: 1, padding: '8px 4px', border: 'none', borderRadius: '10px 10px 0 0', cursor: 'pointer', fontFamily: 'inherit', backgroundColor: tab === i ? '#0f1419' : 'transparent', color: tab === i ? '#d4af37' : '#64748b', fontSize: '11px', fontWeight: '700' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Board */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>

        {/* Seasonal Rewards Banner */}
        <div style={{ backgroundColor: '#1a1228', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' }}>
          <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '8px' }}>🎁 MONTHLY REWARDS (Resets June 30)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {RANK_REWARDS.map(r => (
              <div key={r.rank} style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '4px 10px', fontSize: '11px' }}>
                <span style={{ color: r.color, fontWeight: '700' }}>#{r.rank}</span>
                <span style={{ color: '#94a3b8' }}> — {r.reward}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
          {[displayBoard[1], displayBoard[0], displayBoard[2]].map((r, i) => r && (
            <div key={r.name} style={{
              backgroundColor: '#1a1f2e', border: `1px solid ${i === 1 ? 'rgba(212,175,55,0.5)' : '#334155'}`,
              borderRadius: '14px', padding: '16px 10px', textAlign: 'center',
              marginTop: i === 1 ? '0' : '16px',
              boxShadow: i === 1 ? '0 0 20px rgba(212,175,55,0.15)' : 'none',
              position: 'relative',
            }}>
              {r.isMe && <div style={{ position: 'absolute', top: '6px', right: '6px', backgroundColor: '#8b5cf6', color: '#fff', fontSize: '8px', fontWeight: '700', borderRadius: '4px', padding: '1px 4px' }}>YOU</div>}
              <Avatar name={r.name} isPro={r.isPro} size={42} />
              <div style={{ fontSize: i === 1 ? '24px' : '20px', marginTop: '8px' }}>
                {r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : '🥉'}
              </div>
              <div style={{ color: '#e2e8f0', fontSize: '12px', fontWeight: '700', marginTop: '4px', lineHeight: 1.2 }}>{r.name.split(' ')[0]}</div>
              <div style={{ color: '#d4af37', fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>{r.pts.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* Full list */}
        {displayBoard.slice(3).map(r => (
          <div key={`${r.name}_${r.rank}`} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            backgroundColor: r.isMe ? 'rgba(139,92,246,0.12)' : '#1a1f2e',
            border: `1px solid ${r.isMe ? 'rgba(139,92,246,0.4)' : '#334155'}`,
            borderRadius: '12px', padding: '12px 16px', marginBottom: '8px',
          }}>
            <RankMedal rank={r.rank} />
            <Avatar name={r.name} isPro={r.isPro} />
            <div style={{ flex: 1 }}>
              <div style={{ color: r.isMe ? '#a78bfa' : '#e2e8f0', fontSize: '14px', fontWeight: r.isMe ? '700' : '600' }}>
                {r.name} {r.isMe && <span style={{ color: '#8b5cf6', fontSize: '10px', fontWeight: '700' }}>(You)</span>}
              </div>
              <div style={{ color: '#64748b', fontSize: '11px', marginTop: '1px' }}>🔥 {r.streak}-day streak</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#d4af37', fontSize: '14px', fontWeight: '700' }}>{r.pts.toLocaleString()}</div>
              <div style={{ color: '#64748b', fontSize: '10px' }}>pts</div>
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', color: '#334155', fontSize: '12px', marginTop: '16px', paddingBottom: '8px' }}>
          🕉 Updated hourly · Resets monthly
        </div>
      </div>

      <BottomNav page="leaderboard" onNav={onNav} />
    </div>
  )
}
