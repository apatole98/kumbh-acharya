import React, { useState } from 'react'
import BottomNav from '../components/BottomNav.jsx'

export default function ContactPage({ onNav }) {
  const [form, setForm] = useState({ name: '', email: '', msg: '' })
  const [sent, setSent] = useState(false)

  const submit = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.msg) return
    setSent(true)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
        <button onClick={() => onNav?.('chat')} style={{ background: 'transparent', border: 'none', color: '#d4af37', fontSize: '20px', cursor: 'pointer', padding: '4px' }}>←</button>
        <div>
          <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>📬 Contact Us</div>
          <div style={{ color: '#64748b', fontSize: '12px' }}>We'd love to hear from you</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {[
            { icon: '📧', label: 'Email', value: 'namaste@kumbhacharya.com' },
            { icon: '📍', label: 'Base', value: 'Nashik, Maharashtra' },
            { icon: '🕐', label: 'Response', value: 'Within 24 hours' },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '14px', padding: '18px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{icon}</div>
              <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600', marginBottom: '4px' }}>{label}</div>
              <div style={{ color: '#e2e8f0', fontSize: '12px', fontWeight: '600' }}>{value}</div>
            </div>
          ))}
        </div>

        {sent ? (
          <div style={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px', padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🙏</div>
            <div style={{ color: '#d4af37', fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Message Received!</div>
            <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.7' }}>Thank you for reaching out. We will reply to {form.email} within 24 hours. Jai Godavari Maa!</div>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div style={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ color: '#d4af37', fontSize: '15px', fontWeight: '800', marginBottom: '4px' }}>Send us a message</div>

              {[
                { key: 'name', label: 'Your Name', type: 'text', placeholder: 'e.g. Ramesh Sharma' },
                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>{label}</div>
                  <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder} required
                    style={{ width: '100%', backgroundColor: '#0f1419', border: '1px solid #334155', borderRadius: '10px', padding: '11px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 200ms' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.5)'}
                    onBlur={e => e.target.style.borderColor = '#334155'}
                  />
                </div>
              ))}

              <div>
                <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>Message</div>
                <textarea value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))}
                  placeholder="Tell us about your question, feedback, or issue..." required rows={5}
                  style={{ width: '100%', backgroundColor: '#0f1419', border: '1px solid #334155', borderRadius: '10px', padding: '11px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical', transition: 'border-color 200ms' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.5)'}
                  onBlur={e => e.target.style.borderColor = '#334155'}
                />
              </div>

              <button type="submit"
                style={{ background: 'linear-gradient(135deg,#d4af37,#b8962c)', color: '#0f1419', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit' }}>
                🙏 Send Message
              </button>
            </div>
          </form>
        )}

        <div style={{ height: '80px' }} />
      </div>

      <BottomNav page="contact" onNav={onNav} />
    </div>
  )
}
