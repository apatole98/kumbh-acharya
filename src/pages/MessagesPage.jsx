import React, { useState } from 'react'
import { useAuth } from '../components/AuthContext.jsx'
import { useCommunity } from '../context/CommunityContext.jsx'
import { useGamification } from '../context/GamificationContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

function timeAgo(ts) {
  const diff = (Date.now() - ts) / 1000
  if (diff < 60)     return 'now'
  if (diff < 3600)   return `${Math.floor(diff / 60)}m`
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h`
  return `${Math.floor(diff / 86400)}d`
}

export default function MessagesPage({ onNav }) {
  const { user } = useAuth()
  const { msgs, sendMessage } = useCommunity()
  const { addPoints } = useGamification()
  const [selected, setSelected] = useState(null)
  const [input, setInput] = useState('')

  // Collect all conversation partners
  const threads = Object.entries(msgs).map(([name, messages]) => ({
    name, messages,
    last: messages[messages.length - 1],
    unread: messages.filter(m => m.from !== user?.name && !m.read).length,
  })).sort((a, b) => (b.last?.time || 0) - (a.last?.time || 0))

  const handleSend = () => {
    if (!selected || !input.trim()) return
    sendMessage(selected, input)
    addPoints(5, 'Sent a message ✉️')
    setInput('')
  }

  const selectedMsgs = selected ? (msgs[selected] || []) : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '16px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {selected && (
            <button onClick={() => setSelected(null)} style={{ backgroundColor: 'transparent', border: '1px solid #334155', color: '#94a3b8', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
              ← Back
            </button>
          )}
          <div>
            <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>
              ✉️ {selected ? selected : 'Messages'}
            </div>
            {!selected && <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>{threads.length} conversations</div>}
          </div>
        </div>
      </div>

      {!selected ? (
        /* Thread list */
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {threads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>✉️</div>
              <div style={{ fontSize: '15px', marginBottom: '8px' }}>No messages yet</div>
              <div style={{ fontSize: '13px' }}>Open a community post and message the author!</div>
            </div>
          ) : threads.map(thread => (
            <button key={thread.name} onClick={() => setSelected(thread.name)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
              backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '14px',
              padding: '14px 16px', marginBottom: '10px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              transition: 'all 200ms',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#334155'}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg,#334155,#475569)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>
                {thread.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '700', marginBottom: '3px' }}>{thread.name}</div>
                <div style={{ color: '#64748b', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {thread.last?.from === user?.name ? 'You: ' : ''}{thread.last?.text}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ color: '#475569', fontSize: '11px', marginBottom: '4px' }}>{timeAgo(thread.last?.time)}</div>
                {thread.unread > 0 && (
                  <span style={{ backgroundColor: '#d4af37', color: '#0f1419', borderRadius: '10px', padding: '1px 6px', fontSize: '10px', fontWeight: '700' }}>{thread.unread}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Message thread */
        <>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {selectedMsgs.length === 0 && (
              <div style={{ textAlign: 'center', color: '#64748b', fontSize: '13px', marginTop: '40px' }}>Start your conversation with {selected} 🙏</div>
            )}
            {selectedMsgs.map(m => {
              const isMe = m.from === user?.name
              return (
                <div key={m.id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  <div style={{ fontSize: '10px', color: '#475569', marginBottom: '3px', textAlign: isMe ? 'right' : 'left', fontWeight: '600' }}>
                    {isMe ? 'You' : m.from} · {timeAgo(m.time)}
                  </div>
                  <div style={{ background: isMe ? 'linear-gradient(135deg,rgba(139,92,246,0.4),rgba(212,175,55,0.3))' : '#1a1f2e', border: `1px solid ${isMe ? 'rgba(212,175,55,0.35)' : '#334155'}`, borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', lineHeight: '1.55' }}>
                    {m.text}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input */}
          <div style={{ backgroundColor: '#1a1f2e', borderTop: '1px solid #334155', padding: '12px 20px', display: 'flex', gap: '10px', alignItems: 'flex-end', flexShrink: 0 }}>
            <input className="input-field" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={`Message ${selected}...`} style={{ flex: 1, padding: '11px 14px' }} />
            <button onClick={handleSend} disabled={!input.trim()} className="btn-gold" style={{ width: '44px', height: '44px', flexShrink: 0, borderRadius: '10px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: input.trim() ? 1 : 0.4 }}>
              🙏
            </button>
          </div>
        </>
      )}

      {!selected && <BottomNav page="community" onNav={onNav} />}
    </div>
  )
}
