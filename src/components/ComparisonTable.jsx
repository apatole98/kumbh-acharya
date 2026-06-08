import React from 'react'

const ROWS = [
  { feature: 'Daily Chats',          free: '3',       pro: '∞',            onetime: '1' },
  { feature: 'Response Speed',       free: '3–5s',    pro: '1–2s',         onetime: '3–5s' },
  { feature: 'Languages',            free: '✅ x5',   pro: '✅ x5',        onetime: '✅ x5' },
  { feature: 'Chat History',         free: '❌',      pro: '✅',           onetime: '❌' },
  { feature: 'Ritual Scheduler',     free: '❌',      pro: '✅',           onetime: '❌' },
  { feature: 'Daily Mantra (6 AM)',  free: '❌',      pro: '✅',           onetime: '❌' },
  { feature: 'Memory Feature',       free: '❌',      pro: '✅',           onetime: '❌' },
  { feature: 'Kundli Analysis',      free: '❌',      pro: '✅',           onetime: '✅ (₹49)' },
  { feature: 'Notifications',        free: '❌',      pro: '✅',           onetime: '❌' },
  { feature: 'No Ads',               free: '❌',      pro: '✅',           onetime: '❌' },
  { feature: 'Priority Support',     free: '❌',      pro: '✅',           onetime: '❌' },
  { feature: 'Advanced Responses',   free: '❌',      pro: '✅',           onetime: '❌' },
  { feature: 'Ritual Calendar',      free: '❌',      pro: '🔜 Soon',      onetime: '❌' },
  { feature: 'Community Forum',      free: '❌',      pro: '🔜 Soon',      onetime: '❌' },
  { feature: 'Vedic Learning Path',  free: '❌',      pro: '🔜 Soon',      onetime: '❌' },
]

const cellColor = (val) => {
  if (val === '✅' || val.startsWith('✅')) return '#10b981'
  if (val === '❌') return '#475569'
  if (val.startsWith('🔜')) return '#d4af37'
  if (val === '∞') return '#d4af37'
  return '#e2e8f0'
}

export default function ComparisonTable() {
  return (
    <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #3a4557' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }}>
        <thead>
          <tr>
            {['Feature', 'Free', 'Pro 👑', 'One-Time'].map((h, i) => (
              <th key={h} style={{
                padding: '14px 18px', textAlign: i === 0 ? 'left' : 'center',
                backgroundColor: i === 2 ? '#2a1f4e' : '#252d3d',
                color: i === 2 ? '#d4af37' : '#fff',
                fontSize: '12px', fontWeight: '700', letterSpacing: '1px',
                textTransform: 'uppercase', whiteSpace: 'nowrap',
                borderBottom: i === 2 ? '2px solid #d4af37' : '2px solid #3a4557',
                position: 'sticky', top: 0, zIndex: 2,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <tr key={i} className="table-row">
              {[row.feature, row.free, row.pro, row.onetime].map((val, j) => (
                <td key={j} style={{
                  padding: '12px 18px', textAlign: j === 0 ? 'left' : 'center',
                  backgroundColor: i % 2 === 0 ? '#1a1f2e' : '#1e2436',
                  color: j === 0 ? '#cbd5e1' : cellColor(val),
                  fontSize: '13px', fontWeight: j === 2 ? '600' : '400',
                  borderBottom: '1px solid #252d3d',
                  transition: 'background-color 0.15s',
                }}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
