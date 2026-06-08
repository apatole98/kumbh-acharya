import React from 'react'

const ROWS = [
  { feature: 'Daily Questions', free: '3/day', pro: 'Unlimited', onetime: 'Per purchase' },
  { feature: 'Languages', free: 'Hindi, English', pro: 'All 5', onetime: 'All 5' },
  { feature: 'Spiritual Guidance', free: 'Basic', pro: 'Advanced', onetime: 'Advanced' },
  { feature: 'Kumbh Mela Info', free: '✅', pro: '✅', onetime: '✅' },
  { feature: 'Vedic Mantras', free: '✅', pro: '✅', onetime: '✅' },
  { feature: 'Chat History', free: '❌', pro: '✅', onetime: '❌' },
  { feature: 'Kundli Analysis', free: '❌', pro: '✅', onetime: '✅ (₹49)' },
  { feature: 'Ritual Calendar', free: '❌', pro: '✅', onetime: '❌' },
  { feature: 'Priority Responses', free: '❌', pro: '✅', onetime: '❌' },
  { feature: 'No Daily Limit', free: '❌', pro: '✅', onetime: '❌' },
  { feature: 'Early Access', free: '❌', pro: '✅', onetime: '❌' },
  { feature: 'Priority Support', free: '❌', pro: '✅', onetime: '❌' },
  { feature: 'Subscription Required', free: 'No', pro: 'Yes', onetime: 'No' },
  { feature: 'Price', free: '₹0', pro: '₹99/mo', onetime: '₹10–₹999' },
]

export default function ComparisonTable() {
  return (
    <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
        <thead>
          <tr style={{ backgroundColor: '#8b5cf6' }}>
            <th style={th('left')}>Feature</th>
            <th style={th()}>Free</th>
            <th style={{ ...th(), backgroundColor: '#7c3aed' }}>Pro ⭐</th>
            <th style={th()}>One-Time</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <tr key={i}
              style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f0ff'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#fff' : '#fafafa'}
            >
              <td style={td('left')}>{row.feature}</td>
              <td style={td()}>{row.free}</td>
              <td style={{ ...td(), fontWeight: '600', color: '#8b5cf6' }}>{row.pro}</td>
              <td style={td()}>{row.onetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const th = (align = 'center') => ({
  padding: '12px 16px', textAlign: align, color: '#fff',
  fontSize: '13px', fontWeight: '700', whiteSpace: 'nowrap',
})

const td = (align = 'center') => ({
  padding: '11px 16px', textAlign: align, fontSize: '13px',
  color: '#1f2937', borderBottom: '1px solid #f3f4f6',
})
