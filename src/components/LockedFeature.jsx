import React from 'react'

export default function LockedFeature({ label = 'Pro Feature', reason = 'Upgrade to Pro to unlock this feature', onUpgrade, compact = false }) {
  if (compact) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '8px', padding: '4px 10px', cursor: onUpgrade ? 'pointer' : 'default' }}
        onClick={onUpgrade}>
        <span style={{ fontSize: '12px' }}>🔒</span>
        <span style={{ fontSize: '11px', color: '#a78bfa', fontWeight: '700' }}>PRO</span>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '16px', padding: '28px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</div>
      <div style={{ color: '#a78bfa', fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{label}</div>
      <div style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>{reason}</div>
      {onUpgrade && (
        <button onClick={onUpgrade}
          style={{ background: 'linear-gradient(135deg,#d4af37,#b8962c)', color: '#0f1419', border: 'none', borderRadius: '10px', padding: '12px 28px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit' }}>
          ⭐ Upgrade to Pro — ₹99/mo
        </button>
      )}
    </div>
  )
}
