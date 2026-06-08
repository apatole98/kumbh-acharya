import React, { useState } from 'react'
import { useAuth } from '../components/AuthContext.jsx'

const s = {
  page: { minHeight: '100dvh', backgroundColor: '#f8f6f1', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" },
  header: {
    backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb',
    padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px',
    position: 'sticky', top: 0, zIndex: 10,
  },
  backBtn: {
    backgroundColor: 'transparent', border: '1px solid #e5e7eb',
    color: '#6b7280', borderRadius: '8px', padding: '6px 12px',
    fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
  },
  headerTitle: { color: '#1f2937', fontSize: '17px', fontWeight: '700' },
  body: { padding: '24px 16px', maxWidth: '480px', margin: '0 auto' },
  avatar: {
    width: '72px', height: '72px', borderRadius: '50%',
    backgroundColor: '#8b5cf6', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '26px', color: '#fff',
    fontWeight: '700', margin: '0 auto 14px',
  },
  name: { textAlign: 'center', fontSize: '20px', fontWeight: '700', color: '#1f2937' },
  badge: (isPro) => ({
    display: 'block', textAlign: 'center', width: 'fit-content', margin: '6px auto 20px',
    backgroundColor: isPro ? '#8b5cf6' : '#f3f4f6',
    color: isPro ? '#fff' : '#6b7280',
    borderRadius: '10px', padding: '3px 12px',
    fontSize: '11px', fontWeight: '700',
  }),
  card: {
    backgroundColor: '#fff', border: '1px solid #e5e7eb',
    borderRadius: '14px', padding: '16px', marginBottom: '14px',
  },
  cardTitle: { color: '#8b5cf6', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' },
  infoLabel: { color: '#6b7280', fontSize: '13px' },
  infoValue: { color: '#1f2937', fontSize: '13px', fontWeight: '500' },
  btn: (v) => ({
    width: '100%', border: 'none', borderRadius: '10px', padding: '12px',
    fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '10px', fontFamily: 'inherit',
    backgroundColor: v === 'purple' ? '#8b5cf6' : v === 'red' ? '#fef2f2' : '#f9fafb',
    color: v === 'purple' ? '#fff' : v === 'red' ? '#dc2626' : '#1f2937',
  }),
  input: {
    width: '100%', backgroundColor: '#f9fafb', color: '#1f2937',
    border: '1px solid #e5e7eb', borderRadius: '10px',
    padding: '10px 14px', fontSize: '14px', outline: 'none',
    marginBottom: '12px', boxSizing: 'border-box', fontFamily: 'inherit',
  },
  label: { color: '#374151', fontSize: '12px', fontWeight: '500', marginBottom: '5px', display: 'block' },
  success: { color: '#16a34a', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '10px', fontSize: '13px', textAlign: 'center', marginBottom: '10px' },
}

export default function ProfilePage({ onBack }) {
  const { user, logout, updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!form.name.trim()) return
    updateUser({ name: form.name, phone: form.phone })
    setEditing(false); setSaved(true)
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

        <div style={s.card}>
          <div style={s.cardTitle}>Account Details</div>
          <div style={s.infoRow}><span style={s.infoLabel}>Email</span><span style={s.infoValue}>{user?.email}</span></div>
          <div style={s.infoRow}><span style={s.infoLabel}>Phone</span><span style={s.infoValue}>{user?.phone || '—'}</span></div>
          <div style={{ ...s.infoRow, borderBottom: 'none' }}>
            <span style={s.infoLabel}>Member Since</span>
            <span style={s.infoValue}>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '—'}</span>
          </div>
        </div>

        <div style={s.card}>
          <div style={s.cardTitle}>Subscription</div>
          <div style={s.infoRow}><span style={s.infoLabel}>Plan</span><span style={s.infoValue}>{user?.isPro ? 'Pro — Unlimited' : 'Free — 3 chats/day'}</span></div>
          <div style={{ ...s.infoRow, borderBottom: 'none' }}><span style={s.infoLabel}>Price</span><span style={s.infoValue}>{user?.isPro ? '₹99/month' : 'Free'}</span></div>
          {!user?.isPro && (
            <button style={{ ...s.btn('purple'), marginTop: '12px' }}
              onClick={() => { updateUser({ isPro: true }); setSaved(true); setTimeout(() => setSaved(false), 2000) }}>
              ⭐ Upgrade to Pro — ₹99/month
            </button>
          )}
        </div>

        {editing ? (
          <div style={s.card}>
            <div style={s.cardTitle}>Edit Profile</div>
            <label style={s.label}>Full Name</label>
            <input style={s.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <label style={s.label}>Phone</label>
            <input style={s.input} value={form.phone} maxLength={10} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            <button style={s.btn('purple')} onClick={handleSave}>💾 Save Changes</button>
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
