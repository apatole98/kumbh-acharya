import React, { useState } from 'react'
import { useAuth } from '../components/AuthContext.jsx'
import BottomNav from '../components/BottomNav.jsx'

export default function ProfilePage({ onBack, onNav }) {
  const { user, logout, updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!form.name.trim()) return
    updateUser({ name: form.name, phone: form.phone })
    setEditing(false); setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ backgroundColor: 'transparent', border: '1px solid #334155', color: '#94a3b8', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#d4af37'; e.currentTarget.style.borderColor = '#d4af37' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#334155' }}>
          ← Back
        </button>
        <span style={{ fontSize: '20px' }}>🕉</span>
        <span style={{ color: '#e2e8f0', fontSize: '17px', fontWeight: '700' }}>My Profile</span>
      </div>

      {/* Scrollable Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>

        {/* Avatar + Name */}
        <div className="au" style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg,#8b5cf6,#d4af37)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#fff', fontWeight: '800', margin: '0 auto 12px', boxShadow: '0 0 24px rgba(139,92,246,0.35)' }}>
            {initials}
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>{user?.name}</div>
          <div style={{ display: 'inline-block', backgroundColor: user?.isPro ? 'rgba(212,175,55,0.15)' : 'rgba(100,116,139,0.2)', border: `1px solid ${user?.isPro ? 'rgba(212,175,55,0.5)' : '#334155'}`, color: user?.isPro ? '#d4af37' : '#64748b', borderRadius: '20px', padding: '3px 14px', fontSize: '12px', fontWeight: '700' }}>
            {user?.isPro ? '👑 Pro Member' : '🆓 Free Plan'}
          </div>
        </div>

        {saved && (
          <div className="au" style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', textAlign: 'center', marginBottom: '16px' }}>
            ✅ Profile updated!
          </div>
        )}

        {/* Account Details */}
        <div className="au1 card" style={{ marginBottom: '14px' }}>
          <div style={{ color: '#d4af37', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>Account Details</div>
          {[
            { label: 'Email',        value: user?.email },
            { label: 'Phone',        value: user?.phone || '—' },
            { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '—' },
          ].map((row, i, arr) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #252d3d' : 'none' }}>
              <span style={{ color: '#64748b', fontSize: '13px' }}>{row.label}</span>
              <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '500' }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Subscription */}
        <div className="au2 card" style={{ marginBottom: '14px' }}>
          <div style={{ color: '#d4af37', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>Subscription</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #252d3d' }}>
            <span style={{ color: '#64748b', fontSize: '13px' }}>Plan</span>
            <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '500' }}>{user?.isPro ? 'Pro — Unlimited' : 'Free — 3 chats/day'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: user?.isPro ? 'none' : '1px solid #252d3d' }}>
            <span style={{ color: '#64748b', fontSize: '13px' }}>Price</span>
            <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '500' }}>{user?.isPro ? '₹99/month' : 'Free'}</span>
          </div>
          {!user?.isPro && (
            <button className="btn-gold" style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '800', marginTop: '14px' }}
              onClick={() => { updateUser({ isPro: true }); setSaved(true); setTimeout(() => setSaved(false), 2500) }}>
              👑 Upgrade to Pro — ₹99/month
            </button>
          )}
        </div>

        {/* Edit Profile */}
        {editing ? (
          <div className="au card" style={{ marginBottom: '14px' }}>
            <div style={{ color: '#d4af37', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>Edit Profile</div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.8px', display: 'block', marginBottom: '6px' }}>FULL NAME</label>
              <input className="input-field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ padding: '11px 14px' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.8px', display: 'block', marginBottom: '6px' }}>PHONE</label>
              <input className="input-field" value={form.phone} maxLength={10} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={{ padding: '11px 14px' }} />
            </div>
            <button className="btn-gold" style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '700', marginBottom: '8px' }} onClick={handleSave}>💾 Save Changes</button>
            <button className="btn-outline" style={{ width: '100%', padding: '11px', fontSize: '14px' }} onClick={() => setEditing(false)}>Cancel</button>
          </div>
        ) : (
          <button className="btn-outline" style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '600', marginBottom: '10px' }} onClick={() => setEditing(true)}>
            ✏️ Edit Profile
          </button>
        )}

        {/* Logout */}
        <button style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', color: '#f87171', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', marginBottom: '8px' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.15)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)'}
          onClick={logout}>
          🚪 Logout
        </button>

        <div style={{ textAlign: 'center', color: '#334155', fontSize: '12px', marginTop: '12px' }}>🕉 Kumbh Acharya — © 2026</div>
      </div>

      <BottomNav page="profile" onNav={onNav} />
    </div>
  )
}
