import React from 'react'

const TABS = [
  { id: 'chat',      icon: '🕉',  label: 'Chat'      },
  { id: 'sinhastha', icon: '🚩',  label: 'Sinhastha' },
  { id: 'community', icon: '👥',  label: 'Community' },
  { id: 'ai-guide',  icon: '🤖',  label: 'AI Guide'  },
  { id: 'profile',   icon: '👤',  label: 'Me'        },
]

export default function BottomNav({ page, onNav }) {
  return (
    <nav style={{
      backgroundColor: '#1a1f2e', borderTop: '1px solid #334155',
      display: 'flex', flexShrink: 0,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
    }}>
      {TABS.map(tab => {
        const active = page === tab.id
        return (
          <button key={tab.id} onClick={() => onNav?.(tab.id)} style={{
            flex: 1, padding: '10px 4px 12px', border: 'none',
            backgroundColor: 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
            transition: 'all 200ms',
            borderTop: `2px solid ${active ? '#d4af37' : 'transparent'}`,
            fontFamily: 'inherit',
          }}>
            <span style={{ fontSize: '19px', lineHeight: 1 }}>{tab.icon}</span>
            <span style={{ fontSize: '9px', fontWeight: active ? '700' : '500', color: active ? '#d4af37' : '#64748b' }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
