import React, { useState } from 'react'
import { useAuth } from '../components/AuthContext.jsx'
import { useCommunity } from '../context/CommunityContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

const TYPE_COLORS = { experience: '#8b5cf6', tip: '#10b981', question: '#f59e0b', photo: '#3b82f6' }
const TYPE_ICONS  = { experience: '🌺', tip: '💡', question: '❓', photo: '📸' }

function timeAgo(ts) {
  const diff = (Date.now() - ts) / 1000
  if (diff < 60)     return 'just now'
  if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function FeedCard({ post, onLike, onSave, onOpen }) {
  const tc = TYPE_COLORS[post.type] || '#64748b'
  return (
    <div className="au" style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px' }}>
      {/* Top */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          {/* Avatar */}
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, background: post.author.isPro ? 'linear-gradient(135deg,#d4af37,#8b5cf6)' : '#252d3d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#fff' }}>
            {post.author.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '700' }}>{post.author.name}</span>
              {post.author.isPro && <span style={{ backgroundColor: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '6px', padding: '1px 6px', fontSize: '9px', color: '#d4af37', fontWeight: '700' }}>PRO</span>}
            </div>
            <div style={{ color: '#64748b', fontSize: '11px' }}>{timeAgo(post.time)}</div>
          </div>
          <div style={{ backgroundColor: `${tc}20`, border: `1px solid ${tc}50`, borderRadius: '8px', padding: '3px 8px', fontSize: '11px', color: tc, fontWeight: '700' }}>
            {TYPE_ICONS[post.type]} {post.type}
          </div>
        </div>

        {/* Title + Content */}
        <div style={{ color: '#fff', fontSize: '15px', fontWeight: '700', marginBottom: '8px', lineHeight: 1.3 }}>{post.title}</div>
        <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.65', marginBottom: '12px' }}>
          {post.content.length > 180 ? post.content.slice(0, 180) + '...' : post.content}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{ backgroundColor: '#252d3d', color: '#8b5cf6', borderRadius: '6px', padding: '2px 8px', fontSize: '11px', fontWeight: '600' }}>#{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderTop: '1px solid #252d3d', gap: '4px' }}>
        <button onClick={() => onLike(post.id)} style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: post.liked ? 'rgba(239,68,68,0.12)' : 'transparent', border: `1px solid ${post.liked ? 'rgba(239,68,68,0.4)' : 'transparent'}`, borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms' }}>
          <span style={{ fontSize: '14px' }}>{post.liked ? '❤️' : '🤍'}</span>
          <span style={{ color: post.liked ? '#f87171' : '#64748b', fontSize: '12px', fontWeight: '600' }}>{post.likes}</span>
        </button>
        <button onClick={() => onOpen(post)} style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'transparent', border: '1px solid transparent', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontFamily: 'inherit' }}>
          <span style={{ fontSize: '14px' }}>💬</span>
          <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '600' }}>{post.comments?.length || 0}</span>
        </button>
        <div style={{ flex: 1 }} />
        <button onClick={() => onSave(post.id)} style={{ backgroundColor: post.saved ? 'rgba(212,175,55,0.12)' : 'transparent', border: `1px solid ${post.saved ? 'rgba(212,175,55,0.4)' : 'transparent'}`, borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px' }}>
          {post.saved ? '🔖' : '📌'}
        </button>
        <button onClick={() => onOpen(post)} style={{ backgroundColor: 'transparent', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', color: '#94a3b8', fontSize: '12px', fontWeight: '600', fontFamily: 'inherit' }}>
          Read more
        </button>
      </div>
    </div>
  )
}

export default function CommunityPage({ onNav, onCreatePost, onOpenPost }) {
  const { user } = useAuth()
  const { posts, toggleLike, toggleSave } = useCommunity()
  const [filter, setFilter] = useState('Latest')

  const FILTERS = ['Latest', 'Trending', 'Saved', 'Q&A', 'Tips']

  const sorted = [...posts].filter(p => {
    if (filter === 'Saved')  return p.saved
    if (filter === 'Q&A')    return p.type === 'question'
    if (filter === 'Tips')   return p.type === 'tip'
    return true
  }).sort((a, b) => {
    if (filter === 'Trending') return (b.likes + (b.comments?.length || 0)) - (a.likes + (a.comments?.length || 0))
    return b.time - a.time
  })

  const handleLike = (id) => {
    toggleLike(id)
    const post = posts.find(p => p.id === id)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '14px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>👥 Community</div>
            <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>{posts.length} pilgrims sharing their journey</div>
          </div>
          <button onClick={onCreatePost} style={{ background: 'linear-gradient(135deg,#d4af37,#b8962c)', border: 'none', borderRadius: '10px', padding: '9px 16px', color: '#0f1419', fontSize: '13px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit' }}>
            ✏️ Share
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 14px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', fontSize: '12px', fontWeight: '600', backgroundColor: filter === f ? '#d4af37' : '#252d3d', color: filter === f ? '#0f1419' : '#94a3b8' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🙏</div>
            <div style={{ fontSize: '15px', marginBottom: '8px' }}>No posts yet</div>
            <div style={{ fontSize: '13px' }}>Be the first to share your experience!</div>
          </div>
        ) : sorted.map(post => (
          <FeedCard key={post.id} post={post} onLike={handleLike} onSave={toggleSave} onOpen={onOpenPost} />
        ))}
      </div>

      <BottomNav page="community" onNav={onNav} />
    </div>
  )
}
