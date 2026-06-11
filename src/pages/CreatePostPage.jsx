import React, { useState } from 'react'
import { useCommunity } from '../context/CommunityContext.jsx'
import { useGamification } from '../context/GamificationContext.jsx'

const TYPES = [
  { id: 'experience', label: 'Experience', icon: '🌺', desc: 'Share your spiritual journey' },
  { id: 'tip',        label: 'Tip',        icon: '💡', desc: 'Help other pilgrims' },
  { id: 'question',   label: 'Question',   icon: '❓', desc: 'Ask the community' },
  { id: 'photo',      label: 'Photo',      icon: '📸', desc: 'Share a moment' },
]

const SUGGESTED_TAGS = ['shahi-snan', 'triveni', 'mantra', 'ghat', 'prayagraj', 'kumbh2025', 'beginner', 'tips', 'spiritual', 'guide']

export default function CreatePostPage({ onBack, onSuccess }) {
  const { createPost } = useCommunity()
  const { addPoints, unlockBadge } = useGamification()
  const [type, setType]       = useState('experience')
  const [title, setTitle]     = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags]       = useState([])
  const [customTag, setCustomTag] = useState('')
  const [posting, setPosting] = useState(false)

  const toggleTag = (t) => setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : prev.length < 5 ? [...prev, t] : prev)

  const addCustomTag = () => {
    const t = customTag.trim().toLowerCase().replace(/\s+/g, '-')
    if (t && !tags.includes(t) && tags.length < 5) { setTags(prev => [...prev, t]); setCustomTag('') }
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return
    setPosting(true)
    await new Promise(r => setTimeout(r, 500))
    createPost({ title: title.trim(), content: content.trim(), type, tags })
    addPoints(25, 'Created a community post 📝')
    unlockBadge('first_post')
    setPosting(false)
    onSuccess?.()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ backgroundColor: 'transparent', border: '1px solid #334155', color: '#94a3b8', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
          ← Back
        </button>
        <div>
          <div style={{ color: '#d4af37', fontSize: '16px', fontWeight: '800' }}>Share Your Story</div>
          <div style={{ color: '#64748b', fontSize: '11px' }}>+25 points for posting 🎁</div>
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

        {/* Type selector */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '10px' }}>POST TYPE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {TYPES.map(t => (
              <button key={t.id} onClick={() => setType(t.id)} style={{ padding: '12px', border: `1px solid ${type === t.id ? '#d4af37' : '#334155'}`, borderRadius: '12px', backgroundColor: type === t.id ? 'rgba(212,175,55,0.1)' : '#1a1f2e', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 200ms' }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{t.icon}</div>
                <div style={{ color: type === t.id ? '#d4af37' : '#e2e8f0', fontSize: '13px', fontWeight: '700' }}>{t.label}</div>
                <div style={{ color: '#64748b', fontSize: '11px' }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '8px' }}>
            TITLE <span style={{ color: '#475569' }}>({title.length}/100)</span>
          </div>
          <input className="input-field" value={title} onChange={e => setTitle(e.target.value.slice(0, 100))}
            placeholder="Give your post a meaningful title..." style={{ padding: '12px 14px' }} />
        </div>

        {/* Content */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '8px' }}>
            YOUR STORY <span style={{ color: '#475569' }}>({content.length}/500)</span>
          </div>
          <textarea className="input-field" value={content} onChange={e => setContent(e.target.value.slice(0, 500))}
            placeholder="Share your experience, tips, or question with fellow pilgrims..." rows={5}
            style={{ padding: '12px 14px', resize: 'none', lineHeight: '1.6' }} />
        </div>

        {/* Tags */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '10px' }}>TAGS ({tags.length}/5)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {SUGGESTED_TAGS.map(t => (
              <button key={t} onClick={() => toggleTag(t)} style={{ padding: '5px 12px', border: `1px solid ${tags.includes(t) ? '#8b5cf6' : '#334155'}`, borderRadius: '20px', backgroundColor: tags.includes(t) ? 'rgba(139,92,246,0.15)' : 'transparent', color: tags.includes(t) ? '#a78bfa' : '#64748b', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: tags.includes(t) ? '700' : '500' }}>
                #{t}
              </button>
            ))}
          </div>
          {/* Selected tags */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
              {tags.map(t => (
                <span key={t} onClick={() => toggleTag(t)} style={{ padding: '4px 10px', backgroundColor: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.5)', borderRadius: '20px', color: '#a78bfa', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>
                  #{t} ×
                </span>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input className="input-field" value={customTag} onChange={e => setCustomTag(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCustomTag()}
              placeholder="Custom tag..." style={{ padding: '8px 12px', fontSize: '13px', flex: 1 }} />
            <button onClick={addCustomTag} style={{ padding: '8px 14px', backgroundColor: '#252d3d', border: '1px solid #334155', borderRadius: '10px', color: '#94a3b8', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>Add</button>
          </div>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={!title.trim() || !content.trim() || posting} className="btn-gold" style={{ width: '100%', padding: '15px', fontSize: '15px', fontWeight: '800', opacity: (!title.trim() || !content.trim() || posting) ? 0.5 : 1 }}>
          {posting ? '⏳ Sharing...' : '🙏 Share with Community (+25 pts)'}
        </button>
      </div>
    </div>
  )
}
