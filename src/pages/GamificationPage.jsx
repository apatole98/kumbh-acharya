import React from 'react'
import { useAuth } from '../components/AuthContext.jsx'
import { useGamification, ALL_BADGES, RARITY_COLORS } from '../context/GamificationContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

function levelOf(pts) {
  if (pts < 100)  return { n: 1, name: 'Seeker',       next: 100  }
  if (pts < 300)  return { n: 2, name: 'Pilgrim',      next: 300  }
  if (pts < 700)  return { n: 3, name: 'Devotee',      next: 700  }
  if (pts < 1500) return { n: 4, name: 'Sage',         next: 1500 }
  if (pts < 3000) return { n: 5, name: 'Acharya',      next: 3000 }
  return { n: 6, name: 'Enlightened', next: null }
}

const StatCard = ({ icon, value, label, color = '#d4af37' }) => (
  <div style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '14px', padding: '18px 16px', textAlign: 'center' }}>
    <div style={{ fontSize: '26px', marginBottom: '6px' }}>{icon}</div>
    <div style={{ fontSize: '22px', fontWeight: '800', color, marginBottom: '2px' }}>{value}</div>
    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>{label}</div>
  </div>
)

export default function GamificationPage({ onNav }) {
  const { user } = useAuth()
  const { gami, getDailyQuests } = useGamification()

  if (!gami) return <div style={{ backgroundColor: '#0f1419', height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Loading...</div>

  const pts = gami.points?.total || 0
  const streak = gami.streak?.current || 0
  const lv = levelOf(pts)
  const lvPct = lv.next ? Math.round((pts / lv.next) * 100) : 100
  const earned = gami.points?.earned || 0
  const myBadges = ALL_BADGES.filter(b => (gami.badges || []).includes(b.id))
  const dailyQuests = getDailyQuests()
  const dailyDone = dailyQuests.filter(q => q.completed).length
  const dailyTotal = dailyQuests.filter(q => q.completed || q.ready).length
  const log = (gami.log || []).slice(0, 6)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '16px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>⚡ Gamification</div>
            <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>Namaste, {user?.name?.split(' ')[0]}! 🙏</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#d4af37', fontSize: '22px', fontWeight: '800' }}>{pts.toLocaleString()}</div>
            <div style={{ color: '#64748b', fontSize: '11px' }}>Total Points</div>
          </div>
        </div>
      </div>

      {/* Scrollable */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

        {/* Streak Banner */}
        <div className="agl" style={{ background: 'linear-gradient(135deg, #1a1228, #1a1f2e)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '16px', padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '6px' }}>🔥</div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#ef4444', marginBottom: '4px' }}>{streak}-Day Streak</div>
          <div style={{ color: '#94a3b8', fontSize: '13px' }}>
            {streak === 0 ? 'Login daily to start your streak!' : streak < 5 ? 'Keep going! Reward at 5 days 🎁' : streak < 10 ? 'Amazing! Reward at 10 days ⚡' : 'You\'re on fire! Incredible dedication 🏆'}
          </div>
          {gami.streak?.max > streak && (
            <div style={{ color: '#64748b', fontSize: '12px', marginTop: '6px' }}>Personal best: {gami.streak.max} days</div>
          )}
        </div>

        {/* Level Progress */}
        <div style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <div style={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}>Level {lv.n} — {lv.name}</div>
              <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>{pts} pts {lv.next ? `/ ${lv.next} for Lv.${lv.n + 1}` : '— Max level!'}</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #d4af37)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', color: '#fff' }}>
              {lv.n}
            </div>
          </div>
          <div style={{ height: '8px', backgroundColor: '#252d3d', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${lvPct}%`, background: 'linear-gradient(to right, #8b5cf6, #d4af37)', borderRadius: '4px', transition: 'width 0.8s ease' }} />
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <StatCard icon="💎" value={earned.toLocaleString()} label="Points Earned" />
          <StatCard icon="💬" value={gami.total?.chats || 0} label="Total Chats" color="#a78bfa" />
          <StatCard icon="🏅" value={myBadges.length} label="Badges" color="#10b981" />
        </div>

        {/* Daily Quest Summary */}
        <div style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '14px', padding: '18px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ color: '#d4af37', fontSize: '13px', fontWeight: '700', letterSpacing: '0.8px' }}>TODAY'S QUESTS</div>
            <div style={{ color: '#64748b', fontSize: '12px' }}>{dailyDone}/{dailyQuests.length} done</div>
          </div>
          {dailyQuests.map(q => (
            <div key={q.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>{q.completed ? '✅' : q.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: q.completed ? '#64748b' : '#e2e8f0', fontSize: '13px', fontWeight: '600', textDecoration: q.completed ? 'line-through' : 'none' }}>{q.title}</div>
                <div style={{ height: '4px', backgroundColor: '#252d3d', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(q.progress / q.req) * 100}%`, backgroundColor: q.completed ? '#334155' : '#d4af37', borderRadius: '2px', transition: 'width 0.5s ease' }} />
                </div>
              </div>
              <span style={{ color: '#d4af37', fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap' }}>+{q.points}</span>
            </div>
          ))}
          <button onClick={() => onNav('quests')} style={{ width: '100%', marginTop: '6px', padding: '10px', backgroundColor: 'transparent', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '10px', color: '#d4af37', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>
            View All Quests →
          </button>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          {[
            { icon: '🏆', label: 'Leaderboard', sub: 'See your rank', page: 'leaderboard' },
            { icon: '🎖', label: 'My Badges', sub: `${myBadges.length} unlocked`, page: 'badges' },
          ].map(item => (
            <button key={item.page} onClick={() => onNav(item.page)} style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '14px', padding: '20px 16px', textAlign: 'center', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '700' }}>{item.label}</div>
              <div style={{ color: '#64748b', fontSize: '11px', marginTop: '3px' }}>{item.sub}</div>
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        {log.length > 0 && (
          <div style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '14px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ color: '#d4af37', fontSize: '13px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '14px' }}>RECENT ACTIVITY</div>
            {log.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < log.length - 1 ? '1px solid #252d3d' : 'none' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>{item.reason}</span>
                <span style={{ color: '#d4af37', fontSize: '13px', fontWeight: '700' }}>+{item.pts}</span>
              </div>
            ))}
          </div>
        )}

        {/* Points Redemption */}
        <div style={{ backgroundColor: '#1a1228', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '14px', padding: '18px', marginBottom: '8px' }}>
          <div style={{ color: '#a78bfa', fontSize: '13px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '12px' }}>💜 POINTS REDEMPTION</div>
          {[
            { pts: 50,  reward: '1 week free Pro' },
            { pts: 250, reward: '1 month free Pro' },
            { pts: 500, reward: '3 months free Pro' },
          ].map(r => {
            const canRedeem = (gami.points?.available || 0) >= r.pts
            return (
              <div key={r.pts} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #252d3d' }}>
                <span style={{ color: '#e2e8f0', fontSize: '13px' }}>{r.pts} pts → {r.reward}</span>
                <button onClick={() => alert('Razorpay redemption coming in Phase 4! 🙏')} style={{ backgroundColor: canRedeem ? 'rgba(139,92,246,0.2)' : '#252d3d', border: `1px solid ${canRedeem ? 'rgba(139,92,246,0.5)' : '#334155'}`, borderRadius: '8px', padding: '4px 12px', color: canRedeem ? '#a78bfa' : '#475569', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>
                  {canRedeem ? 'Redeem' : 'Not enough'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <BottomNav page="gamification" onNav={onNav} />
    </div>
  )
}
