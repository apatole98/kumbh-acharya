import React, { useState } from 'react'
import { useAuth } from '../components/AuthContext.jsx'

const s = {
  page: {
    minHeight: '100dvh',
    backgroundColor: '#1a1a4d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif",
  },
  card: {
    backgroundColor: '#12124a',
    border: '2px solid #d4af37',
    borderRadius: '20px',
    padding: '32px 28px',
    width: '100%',
    maxWidth: '400px',
  },
  logo: { textAlign: 'center', marginBottom: '24px' },
  logoIcon: { fontSize: '48px' },
  logoTitle: { color: '#d4af37', fontSize: '22px', fontWeight: '700', marginTop: '8px' },
  logoSub: { color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '4px' },
  tabs: { display: 'flex', marginBottom: '24px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.3)' },
  tab: (active) => ({
    flex: 1,
    padding: '10px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: active ? '#d4af37' : 'transparent',
    color: active ? '#1a1a4d' : 'rgba(255,255,255,0.6)',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  }),
  label: { color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginBottom: '6px', display: 'block' },
  input: {
    width: '100%',
    backgroundColor: '#1a1a4d',
    color: '#fff',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: '10px',
    padding: '11px 14px',
    fontSize: '14px',
    outline: 'none',
    marginBottom: '16px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  btn: {
    width: '100%',
    backgroundColor: '#d4af37',
    color: '#1a1a4d',
    border: 'none',
    borderRadius: '10px',
    padding: '13px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '4px',
    fontFamily: 'inherit',
  },
  error: {
    backgroundColor: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.4)',
    color: '#fca5a5',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '13px',
    marginBottom: '16px',
  },
  success: {
    backgroundColor: 'rgba(34,197,94,0.15)',
    border: '1px solid rgba(34,197,94,0.4)',
    color: '#86efac',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '13px',
    marginBottom: '16px',
  },
  link: { color: '#d4af37', fontSize: '13px', textAlign: 'center', marginTop: '16px', cursor: 'pointer' },
}

function validate(tab, form) {
  if (tab === 'signup') {
    if (!form.name.trim()) return 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Enter a valid email'
    if (!/^\d{10}$/.test(form.phone)) return 'Phone must be 10 digits'
    if (form.password.length < 8) return 'Password must be at least 8 characters'
  } else {
    if (!form.emailOrPhone.trim()) return 'Email or phone is required'
    if (!form.password) return 'Password is required'
  }
  return null
}

export default function LoginPage() {
  const { signup, login } = useAuth()
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', phone: '', emailOrPhone: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    const err = validate(tab, form)
    if (err) { setError(err); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    if (tab === 'signup') {
      const res = signup(form)
      if (res.error) setError(res.error)
      else setSuccess('Account created! Welcome to Kumbh Acharya 🙏')
    } else {
      const res = login(form)
      if (res.error) setError(res.error)
    }
    setLoading(false)
  }

  const switchTab = (t) => {
    setTab(t)
    setError('')
    setSuccess('')
    setForm({ name: '', email: '', phone: '', emailOrPhone: '', password: '' })
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo}>
          <div style={s.logoIcon}>🕉</div>
          <div style={s.logoTitle}>कुंभ आचार्य</div>
          <div style={s.logoSub}>Spiritual AI Guide</div>
        </div>

        <div style={s.tabs}>
          <button style={s.tab(tab === 'login')} onClick={() => switchTab('login')}>Login</button>
          <button style={s.tab(tab === 'signup')} onClick={() => switchTab('signup')}>Sign Up</button>
        </div>

        {error && <div style={s.error}>⚠️ {error}</div>}
        {success && <div style={s.success}>✅ {success}</div>}

        <form onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <>
              <label style={s.label}>Full Name</label>
              <input style={s.input} placeholder="Anurag Patole" value={form.name} onChange={set('name')} />
              <label style={s.label}>Email</label>
              <input style={s.input} type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
              <label style={s.label}>Phone (10 digits)</label>
              <input style={s.input} type="tel" placeholder="9876543210" maxLength={10} value={form.phone} onChange={set('phone')} />
            </>
          )}
          {tab === 'login' && (
            <>
              <label style={s.label}>Email or Phone</label>
              <input style={s.input} placeholder="you@email.com or 9876543210" value={form.emailOrPhone} onChange={set('emailOrPhone')} />
            </>
          )}
          <label style={s.label}>Password {tab === 'signup' && '(min 8 characters)'}</label>
          <input style={s.input} type="password" placeholder="••••••••" value={form.password} onChange={set('password')} />

          <button style={s.btn} type="submit" disabled={loading}>
            {loading ? '⏳ Please wait...' : tab === 'login' ? '🙏 Login' : '🙏 Create Account'}
          </button>
        </form>

        <div style={s.link} onClick={() => switchTab(tab === 'login' ? 'signup' : 'login')}>
          {tab === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </div>
      </div>
    </div>
  )
}
