import React, { useState, useEffect } from 'react'
import { SINHASTHA } from '../data/sinhastha-dates.js'

function getTimeLeft() {
  const now = new Date()
  const diff = SINHASTHA.start - now
  if (diff <= 0) return null
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

function getMessage(days) {
  if (days > 180) return 'Start your spiritual preparation now'
  if (days > 90)  return 'Join thousands who are already preparing'
  if (days > 30)  return 'Only a few months away — prepare now!'
  if (days > 7)   return 'Less than a month! Get ready'
  if (days > 0)   return '🔥 This week! Sinhastha begins!'
  return 'Sinhastha has begun — Jai Godavari Maa!'
}

export default function SinhasthCountdown({ compact = false }) {
  const [t, setT] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!t) return null

  if (compact) {
    return (
      <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(139,92,246,0.08))', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '14px', padding: '12px 16px', textAlign: 'center', fontFamily: "'Segoe UI',Arial,sans-serif" }}>
        <div style={{ color: '#64748b', fontSize: '10px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '8px' }}>SINHASTHA BEGINS IN</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          {[{ v: t.days, l: 'Days' }, { v: t.hours, l: 'Hrs' }, { v: t.minutes, l: 'Min' }].map(({ v, l }) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ color: '#d4af37', fontSize: '22px', fontWeight: '900', fontFamily: 'monospace', lineHeight: 1 }}>{String(v).padStart(2, '0')}</div>
              <div style={{ color: '#64748b', fontSize: '9px', fontWeight: '700', letterSpacing: '0.8px' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ color: '#475569', fontSize: '10px', marginTop: '8px' }}>Oct 31, 2026 · 12:02 PM IST</div>
      </div>
    )
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(139,92,246,0.08))', border: '1px solid rgba(212,175,55,0.35)', borderRadius: '20px', padding: '28px 24px', textAlign: 'center', fontFamily: "'Segoe UI',Arial,sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
        <span style={{ fontSize: '18px' }}>🚩</span>
        <div style={{ color: '#d4af37', fontSize: '13px', fontWeight: '800', letterSpacing: '1.5px' }}>SINHASTHA 2026 BEGINS IN</div>
        <span style={{ fontSize: '18px' }}>🚩</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', margin: '16px 0' }}>
        {[{ v: t.days, l: 'Days' }, { v: t.hours, l: 'Hours' }, { v: t.minutes, l: 'Minutes' }, { v: t.seconds, l: 'Seconds' }].map(({ v, l }) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '12px', padding: '10px 12px', minWidth: '52px' }}>
              <div style={{ color: '#d4af37', fontSize: '28px', fontWeight: '900', fontFamily: 'monospace', lineHeight: 1 }}>{String(v).padStart(2, '0')}</div>
            </div>
            <div style={{ color: '#64748b', fontSize: '10px', fontWeight: '700', letterSpacing: '0.8px', marginTop: '5px' }}>{l.toUpperCase()}</div>
          </div>
        ))}
      </div>

      <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>📅 October 31, 2026 · Dhwajarohan (Flag Hoisting) · 12:02 PM IST</div>
      <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: '600' }}>{getMessage(t.days)}</div>
    </div>
  )
}
