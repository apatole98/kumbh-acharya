import React, { useState } from 'react'
import { useAuth } from '../components/AuthContext.jsx'

const s = {
  page: {
    minHeight: '100dvh', backgroundColor: '#f8f6f1',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif",
  },
  wrap: { width: '100%', maxWidth: '420px' },
  card: {
    backgroundColor: '#fff', border: '1px solid #e5e7eb',
    borderRadius: '20px', padding: '32px 28px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  },
  logo: { textAlign: 'center', marginBottom: '24px' },
  logoIcon: { fontSize: '44px' },
  logoTitle: { color: '#8b5cf6', fontSize: '22px', fontWeight: '800', marginTop: '8px' },
  logoSub: { color: '#6b7280', fontSize: '13px', marginTop: '4px' },
  tabs: { display: 'flex', marginBottom: '24px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e5e7eb' },
  tab: (active) => ({
    flex: 1, padding: '10px', textAlign: 'center', fontSize: '14px', fontWeight: '600',
    cursor: 'pointer', border: 'none', fontFamily: 'inherit',
    backgroundColor: active ? '#8b5cf6' : 'transparent',
    color: active ? '#fff' : '#6b7280',
    transition: 'all 0.2s',
  }),
  label: { color: '#374151', fontSize: '13px', fontWeight: '500', marginBottom: '6px', display: 'block' },
  input: {
    width: '100%', backgroundColor: '#f9fafb', color: '#1f2937',
    border: '1px solid #e5e7eb', borderRadius: '10px',
    padding: '11px 14px', fontSize: '14px', outline: 'none',
    marginBottom: '16px', boxSizing: 'border-box', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  btn: {
    width: '100%', backgroundColor: '#8b5cf6', color: '#fff',
    border: 'none', borderRadius: '10px', padding: '13px',
    fontSize: '15px', fontWeight: '700', cursor: 'pointer',
    marginTop: '4px', fontFamily: 'inherit', transition: 'background-color 0.2s',
  },
  error: {
    backgroundColor: '#fef2f2', border: '1px solid #fecaca',
    color: '#dc2626', borderRadius: '8px', padding: '10px 14px',
    fontSize: '13px', marginBottom: '16px',
  },
  success: {
    backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
    color: '#16a34a', borderRadius: '8px', padding: '10px 14px',
    fontSize: '13px', marginBottom: '16px',
  },
  link: { color: '#8b5cf6', fontSize: '13px', textAlign: 'center', marginTop: '16px', cursor: 'pointer', fontWeight: '500' },
  featuresLink: { textAlign: 'center', marginTop: '16px' },
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

export default function LoginPage({ onFeatures }) {
  const { signup, login } = useAuth()
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', phone: '', emailOrPhone: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')
    const err = validate(tab, form)
    if (err) { setError(err); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
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
    setTab(t); setError(''); setSuccess('')
    setForm({ name: '', email: '', phone: '', emailOrPhone: '', password: '' })
  }

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <div style={s.card}>
          <div style={s.logo}>
            <div style={s.logoIcon}>🕉</div>
            <div style={s.logoTitle}>कुंभ आचार्य</div>
            <div style={s.logoSub}>AI Spiritual Guide for Kumbh Mela</div>
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
                <input style={s.input} placeholder="Anurag Patole" value={form.name} onChange={set('name')}
                  onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                <label style={s.label}>Email</label>
                <input style={s.input} type="email" placeholder="you@email.com" value={form.email} onChange={set('email')}
                  onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                <label style={s.label}>Phone (10 digits)</label>
                <input style={s.input} type="tel" placeholder="9876543210" maxLength={10} value={form.phone} onChange={set('phone')}
                  onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </>
            )}
            {tab === 'login' && (
              <>
                <label style={s.label}>Email or Phone</label>
                <input style={s.input} placeholder="you@email.com or 9876543210" value={form.emailOrPhone} onChange={set('emailOrPhone')}
                  onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </>
            )}
            <label style={s.label}>Password {tab === 'signup' && <span style={{ color: '#9ca3af', fontWeight: '400' }}>(min 8 chars)</span>}</label>
            <input style={s.input} type="password" placeholder="••••••••" value={form.password} onChange={set('password')}
              onFocus={e => e.target.style.borderColor = '#8b5cf6'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'} />

            <button style={s.btn} type="submit" disabled={loading}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#7c3aed'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#8b5cf6'}>
              {loading ? '⏳ Please wait...' : tab === 'login' ? '🙏 Login' : '🙏 Create Account'}
            </button>
          </form>

          <div style={s.link} onClick={() => switchTab(tab === 'login' ? 'signup' : 'login')}>
            {tab === 'login' ? "Don't have an account? Sign Up →" : 'Already have an account? Login →'}
          </div>
        </div>

        {onFeatures && (
          <div style={s.featuresLink}>
            <span onClick={onFeatures} style={{ color: '#8b5cf6', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>
              View Features & Pricing →
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
