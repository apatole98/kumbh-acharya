import React, { useState } from 'react'
import { useAuth } from '../components/AuthContext.jsx'

const s = {
  page: {
    minHeight: '100dvh',
    backgroundColor: '#1a1a4d',
    fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif",
    color: '#fff',
  },
  header: {
    backgroundColor: '#12124a',
    borderBottom: '2px solid #d4af37',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  backBtn: {
    backgroundColor: 'transparent',
    border: '1px solid rgba(212,175,55,0.5)',
    color: '#d4af37',
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  headerTitle: { color: '#d4af37', fontSize: '18px', fontWeight: '700' },
  body: { padding: '20px 16px', maxWidth: '480px', margin: '0 auto' },
  avatar: {
    width: '72px', height: '72px', borderRadius: '50%',
    backgroundColor: '#d4af37', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '28px', color: '#1a1a4d',
    fontWeight: '700', margin: '0 auto 16px',
  },
  name: { textAlign: 'center', fontSize: '20px', fontWeight: '700', color: '#d4af37' },
  badge: (isPro) => ({
    display: 'inline-block',
    backgroundColor: isPro ? '#d4af37' : 'rgba(255,255,255,0.1)',
    color: isPro ? '#1a1a4d' : 'rgba(255,255,255,0.6)',
    borderRadius: '10px', padding: '3px 10px',
    fontSize: '11px', fontWeight: '700',
    margin: '6px auto 20px', display: 'block', textAlign: 'center', width: 'fit-content',
  }),
  card: {
    backgroundColor: '#12124a',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '14px',
    padding: '16px',
    marginBottom: '14px',
  },
  cardTitle: { color: 'rgba(212,175,55,0.8)', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  infoLabel: { color: 'rgba(255,255,255,0.5)', fontSize: '13px' },
  infoValue: { color: '#fff', fontSize: '13px', fontWeight: '500' },
  btn: (variant) => ({
    width: '100%',
    backgroundColor: variant === 'gold' ? '#d4af37' : variant === 'red' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)',
    color: variant === 'gold' ? '#1a1a4d' : variant === 'red' ? '#fca5a5' : '#fff',
    border: variant === 'red' ? '1px solid rgba(239,68,68,0.3)' : 'none',
    borderRadius: '10px',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '10px',
    fontFamily: 'inherit',
  }),
  input: {
    width: '100%',
    backgroundColor: '#1a1a4d',
    color: '#fff',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '14px',
    outline: 'none',
    marginBottom: '12px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  label: { color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '5px', display: 'block' },
  success: { color: '#86efac', fontSize: '13px', textAlign: 'center', marginBottom: '10px' },
}

export default function ProfilePage({ onBack }) {
  const { user, logout, updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!form.name.trim()) return
    updateUser({ name: form.name, phone: form.phone })
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={onBack}>← Back</button>
        <span style={s.headerTitle}>My Profile</span>
      </div>

      <div style={s.body}>
        <div style={s.avatar}>{initials}</div>
        <div style={s.name}>{user?.name}</div>
        <div style={s.badge(user?.isPro)}>{user?.isPro ? '⭐ Pro Member' : '🆓 Free Plan'}</div>

        {saved && <div style={s.success}>✅ Profile updated!</div>}

        {/* Info card */}
        <div style={s.card}>
          <div style={s.cardTitle}>Account Details</div>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>Email</span>
            <span style={s.infoValue}>{user?.email}</span>
          </div>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>Phone</span>
            <span style={s.infoValue}>{user?.phone || '—'}</span>
          </div>
          <div style={{ ...s.infoRow, borderBottom: 'none' }}>
            <span style={s.infoLabel}>Member Since</span>
            <span style={s.infoValue}>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '—'}</span>
          </div>
        </div>

        {/* Subscription card */}
        <div style={s.card}>
          <div style={s.cardTitle}>Subscription</div>
          <div style={s.infoRow}>
            <span style={s.infoLabel}>Plan</span>
            <span style={s.infoValue}>{user?.isPro ? 'Pro — Unlimited' : 'Free — 3 chats/day'}</span>
          </div>
          <div style={{ ...s.infoRow, borderBottom: 'none' }}>
            <span style={s.infoLabel}>Price</span>
            <span style={s.infoValue}>{user?.isPro ? '₹99/month' : 'Free'}</span>
          </div>
          {!user?.isPro && (
            <button style={{ ...s.btn('gold'), marginTop: '12px' }}
              onClick={() => { updateUser({ isPro: true }); setSaved(true); setTimeout(() => setSaved(false), 2000) }}>
              ⭐ Upgrade to Pro — ₹99/month
            </button>
          )}
        </div>

        {/* Edit profile */}
        {editing ? (
          <div style={s.card}>
            <div style={s.cardTitle}>Edit Profile</div>
            <label style={s.label}>Full Name</label>
            <input style={s.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <label style={s.label}>Phone</label>
            <input style={s.input} value={form.phone} maxLength={10} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            <button style={s.btn('gold')} onClick={handleSave}>💾 Save Changes</button>
            <button style={s.btn('neutral')} onClick={() => setEditing(false)}>Cancel</button>
          </div>
        ) : (
          <button style={s.btn('neutral')} onClick={() => setEditing(true)}>✏️ Edit Profile</button>
        )}

        <button style={s.btn('red')} onClick={logout}>🚪 Logout</button>
      </div>
    </div>
  )
}
