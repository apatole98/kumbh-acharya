import React, { useState } from 'react'
import { useAuth } from '../components/AuthContext.jsx'
import { useCommunity } from '../context/CommunityContext.jsx'
import { useGamification } from '../context/GamificationContext.jsx'

const TYPE_COLORS = { experience: '#8b5cf6', tip: '#10b981', question: '#f59e0b', photo: '#3b82f6' }

function timeAgo(ts) {
  const diff = (Date.now() - ts) / 1000
  if (diff < 60)     return 'just now'
  if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function PostDetailPage({ postId, onBack }) {
  const { user } = useAuth()
  const { posts, toggleLike, toggleSave, addComment, toggleCommentLike, sendMessage, follows, toggleFollow } = useCommunity()
  const { addPoints, trackCommunity } = useGamification()
  const [comment, setComment] = useState('')
  const [showMsg, setShowMsg] = useState(false)
  const [msgText, setMsgText] = useState('')
  const [msgSent, setMsgSent] = useState(false)

  const post = posts.find(p => p.id === postId)
  if (!post) return (
    <div style={{ backgroundColor: '#0f1419', height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontFamily: 'inherit' }}>
      Post not found. <button onClick={onBack} style={{ color: '#d4af37', background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px' }}>← Back</button>
    </div>
  )

  const tc = TYPE_COLORS[post.type] || '#64748b'
  const isAuthor = user?.name === post.author.name
  const isFollowing = follows.includes(post.author.name)

  const handleComment = () => {
    if (!comment.trim()) return
    addComment(post.id, comment)
    addPoints(5, 'Posted a comment 💬')
    if (!isAuthor) trackCommunity(5, 'Replied to community 💬')
    setComment('')
  }

  const handleLike = () => {
    const wasLiked = post.liked
    toggleLike(post.id)
    if (!wasLiked) addPoints(5, 'Liked a post ❤️')
  }

  const handleSendMsg = () => {
    if (!msgText.trim()) return
    sendMessage(post.author.name, msgText)
    addPoints(5, 'Sent a message ✉️')
    setMsgSent(true)
    setMsgText('')
    setTimeout(() => { setShowMsg(false); setMsgSent(false) }, 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ backgroundColor: 'transparent', border: '1px solid #334155', color: '#94a3b8', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
          ← Back
        </button>
        <div style={{ color: '#d4af37', fontSize: '16px', fontWeight: '800', flex: 1 }}>Post Detail</div>
        <button onClick={() => toggleSave(post.id)} style={{ backgroundColor: 'transparent', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '14px' }}>
          {post.saved ? '🔖' : '📌'}
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0, background: post.author.isPro ? 'linear-gradient(135deg,#d4af37,#8b5cf6)' : '#252d3d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#fff' }}>
            {post.author.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: '700' }}>{post.author.name}</span>
              {post.author.isPro && <span style={{ backgroundColor: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '6px', padding: '1px 6px', fontSize: '9px', color: '#d4af37', fontWeight: '700' }}>PRO</span>}
            </div>
            <div style={{ color: '#64748b', fontSize: '12px' }}>{timeAgo(post.time)}</div>
          </div>
          {!isAuthor && (
            <button onClick={() => toggleFollow(post.author.name)} style={{ backgroundColor: isFollowing ? 'rgba(139,92,246,0.15)' : 'transparent', border: `1px solid ${isFollowing ? 'rgba(139,92,246,0.5)' : '#334155'}`, borderRadius: '10px', padding: '7px 14px', color: isFollowing ? '#a78bfa' : '#94a3b8', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>
              {isFollowing ? '✓ Following' : '+ Follow'}
            </button>
          )}
        </div>

        {/* Type badge */}
        <div style={{ display: 'inline-block', backgroundColor: `${tc}20`, border: `1px solid ${tc}50`, borderRadius: '8px', padding: '3px 10px', fontSize: '11px', color: tc, fontWeight: '700', marginBottom: '12px' }}>
          {post.type}
        </div>

        {/* Title */}
        <div style={{ color: '#fff', fontSize: '20px', fontWeight: '800', lineHeight: 1.3, marginBottom: '14px' }}>{post.title}</div>

        {/* Content */}
        <div style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.75', marginBottom: '16px' }}>{post.content}</div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ backgroundColor: '#252d3d', color: '#8b5cf6', borderRadius: '6px', padding: '3px 10px', fontSize: '12px', fontWeight: '600' }}>#{tag}</span>
            ))}
          </div>
        )}

        {/* Action bar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', padding: '14px', backgroundColor: '#1a1f2e', borderRadius: '14px', border: '1px solid #334155' }}>
          <button onClick={handleLike} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: post.liked ? 'rgba(239,68,68,0.12)' : 'transparent', border: `1px solid ${post.liked ? 'rgba(239,68,68,0.4)' : '#334155'}`, borderRadius: '10px', padding: '9px', cursor: 'pointer', fontFamily: 'inherit' }}>
            <span>{post.liked ? '❤️' : '🤍'}</span>
            <span style={{ color: post.liked ? '#f87171' : '#64748b', fontSize: '13px', fontWeight: '600' }}>{post.likes}</span>
          </button>
          {!isAuthor && (
            <button onClick={() => setShowMsg(true)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: 'transparent', border: '1px solid #334155', borderRadius: '10px', padding: '9px', cursor: 'pointer', fontFamily: 'inherit' }}>
              <span>✉️</span>
              <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Message</span>
            </button>
          )}
        </div>

        {/* Comments */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: '#d4af37', fontSize: '13px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '14px' }}>
            COMMENTS ({post.comments?.length || 0})
          </div>
          {(post.comments || []).map(c => (
            <div key={c.id} style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '12px', padding: '12px 14px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '700' }}>{c.author}</span>
                <span style={{ color: '#475569', fontSize: '11px' }}>{timeAgo(c.time)}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', marginBottom: '8px' }}>{c.text}</div>
              <button onClick={() => toggleCommentLike(post.id, c.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                <span style={{ fontSize: '12px' }}>{c.liked ? '❤️' : '🤍'}</span>
                <span style={{ color: '#64748b', fontSize: '11px' }}>{c.likes}</span>
              </button>
            </div>
          ))}
          {(post.comments || []).length === 0 && (
            <div style={{ color: '#475569', fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>No comments yet. Be first! 🙏</div>
          )}
        </div>

        {/* Add Comment */}
        <div style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '14px', padding: '14px' }}>
          <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '10px' }}>ADD COMMENT</div>
          <textarea className="input-field" value={comment} onChange={e => setComment(e.target.value.slice(0, 300))}
            placeholder="Share your thoughts..." rows={3} style={{ padding: '10px 12px', resize: 'none', lineHeight: '1.5', marginBottom: '10px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#475569', fontSize: '11px' }}>{comment.length}/300</span>
            <button onClick={handleComment} disabled={!comment.trim()} className="btn-gold" style={{ padding: '8px 20px', fontSize: '13px', fontWeight: '700', opacity: comment.trim() ? 1 : 0.4 }}>
              Post (+5 pts)
            </button>
          </div>
        </div>
      </div>

      {/* Message modal */}
      {showMsg && (
        <div className="ai" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }}
          onClick={() => setShowMsg(false)}>
          <div style={{ backgroundColor: '#1a1f2e', borderRadius: '20px 20px 0 0', border: '1px solid #334155', width: '100%', maxWidth: '640px', margin: '0 auto', padding: '24px 20px' }}
            onClick={e => e.stopPropagation()}>
            {msgSent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>✅</div>
                <div style={{ color: '#34d399', fontWeight: '700' }}>Message sent to {post.author.name}!</div>
              </div>
            ) : (
              <>
                <div style={{ color: '#d4af37', fontSize: '15px', fontWeight: '800', marginBottom: '14px' }}>✉️ Message {post.author.name}</div>
                <textarea className="input-field" value={msgText} onChange={e => setMsgText(e.target.value.slice(0, 300))}
                  placeholder={`Say something to ${post.author.name}...`} rows={4} style={{ padding: '12px', resize: 'none', lineHeight: '1.5', marginBottom: '12px' }} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setShowMsg(false)} className="btn-outline" style={{ flex: 1, padding: '11px' }}>Cancel</button>
                  <button onClick={handleSendMsg} disabled={!msgText.trim()} className="btn-gold" style={{ flex: 1, padding: '11px', fontWeight: '800', opacity: msgText.trim() ? 1 : 0.5 }}>Send ✉️</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
