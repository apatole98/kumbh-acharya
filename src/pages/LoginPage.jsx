import React, { useState } from 'react'
import { useAuth } from '../components/AuthContext.jsx'

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
    <div style={{
      minHeight: '100dvh', backgroundColor: '#0f1419',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '24px', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{ position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Card */}
      <div className="au" style={{
        width: '100%', maxWidth: '420px', position: 'relative',
        backgroundColor: '#1a1f2e', borderRadius: '20px',
        border: '1px solid #334155',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        overflow: 'hidden',
      }}>
        {/* Gold top bar */}
        <div style={{ height: '3px', background: 'linear-gradient(to right, #8b5cf6, #d4af37, #8b5cf6)' }} />

        <div style={{ padding: '40px 36px 36px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="afl" style={{ fontSize: '44px', marginBottom: '12px', display: 'inline-block' }}>🕉</div>
            <div style={{ fontWeight: '800', fontSize: '22px', color: '#d4af37', letterSpacing: '-0.3px' }}>कुंभ आचार्य</div>
            <div style={{ color: '#64748b', fontSize: '13px', marginTop: '6px' }}>AI Spiritual Guide for Kumbh Mela</div>
            <div style={{ height: '2px', width: '48px', background: 'linear-gradient(to right, #d4af37, transparent)', margin: '14px auto 0', borderRadius: '2px' }} />
          </div>

          {/* Toggle */}
          <div style={{
            display: 'flex', backgroundColor: '#252d3d', borderRadius: '12px',
            padding: '4px', marginBottom: '28px', gap: '4px',
          }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => switchTab(m)} style={{
                flex: 1, padding: '9px', borderRadius: '9px', border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: '700', transition: 'all 0.2s', fontFamily: 'inherit',
                backgroundColor: tab === m ? '#d4af37' : 'transparent',
                color: tab === m ? '#0f1419' : '#64748b',
              }}>
                {m === 'login' ? '🔑 Login' : '✨ Sign Up'}
              </button>
            ))}
          </div>

          {error && (
            <div style={{
              backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px', padding: '10px 14px',
              color: '#f87171', fontSize: '13px', marginBottom: '16px',
              animation: 'fadeIn 0.2s ease',
            }}>⚠️ {error}</div>
          )}
          {success && (
            <div style={{
              backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: '8px', padding: '10px 14px',
              color: '#34d399', fontSize: '13px', marginBottom: '16px',
              animation: 'fadeIn 0.2s ease',
            }}>✅ {success}</div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {tab === 'signup' && (
              <>
                <div>
                  <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.8px', display: 'block', marginBottom: '6px' }}>FULL NAME</label>
                  <input className="input-field" type="text" placeholder="Anurag Patole" value={form.name} onChange={set('name')} style={{ padding: '12px 14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.8px', display: 'block', marginBottom: '6px' }}>EMAIL</label>
                  <input className="input-field" type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} style={{ padding: '12px 14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.8px', display: 'block', marginBottom: '6px' }}>PHONE (10 digits)</label>
                  <input className="input-field" type="tel" placeholder="9876543210" maxLength={10} value={form.phone} onChange={set('phone')} style={{ padding: '12px 14px' }} />
                </div>
              </>
            )}
            {tab === 'login' && (
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.8px', display: 'block', marginBottom: '6px' }}>EMAIL OR PHONE</label>
                <input className="input-field" placeholder="you@email.com or 9876543210" value={form.emailOrPhone} onChange={set('emailOrPhone')} style={{ padding: '12px 14px' }} />
              </div>
            )}
            <div>
              <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.8px', display: 'block', marginBottom: '6px' }}>
                PASSWORD {tab === 'signup' && <span style={{ color: '#475569', fontWeight: '400' }}>(min 8 chars)</span>}
              </label>
              <input className="input-field" type="password" placeholder="••••••••" value={form.password} onChange={set('password')} style={{ padding: '12px 14px' }} />
            </div>

            <button type="submit" disabled={loading} className="btn-gold" style={{ padding: '14px', fontSize: '15px', fontWeight: '800', marginTop: '4px', opacity: loading ? 0.7 : 1 }}>
              {loading ? '⏳ Please wait...' : tab === 'login' ? '🙏 Enter Sanctum' : '✨ Begin Journey'}
            </button>
          </form>

          {/* Switch link */}
          <div style={{ textAlign: 'center', marginTop: '18px', color: '#64748b', fontSize: '13px', cursor: 'pointer' }}
            onClick={() => switchTab(tab === 'login' ? 'signup' : 'login')}>
            {tab === 'login'
              ? <span>No account? <span style={{ color: '#d4af37', fontWeight: '600' }}>Sign Up →</span></span>
              : <span>Already registered? <span style={{ color: '#d4af37', fontWeight: '600' }}>Login →</span></span>
            }
          </div>

          {/* Divider */}
          <div style={{ margin: '18px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#334155' }} />
            <span style={{ color: '#475569', fontSize: '12px' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#334155' }} />
          </div>

          {/* Features link */}
          {onFeatures && (
            <button onClick={onFeatures} style={{
              width: '100%', padding: '12px', backgroundColor: 'transparent',
              border: '1px solid rgba(212,175,55,0.3)', borderRadius: '10px',
              color: '#d4af37', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              transition: 'all 0.2s', fontFamily: 'inherit',
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.08)'; e.currentTarget.style.borderColor = '#d4af37' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)' }}>
              💎 View Plans & Features
            </button>
          )}
        </div>
      </div>

      <div className="au" style={{ marginTop: '24px', color: '#334155', fontSize: '12px', textAlign: 'center' }}>
        🕉 Spreading Dharma through AI &nbsp;·&nbsp; © 2026 Kumbh Acharya
      </div>
    </div>
  )
}
