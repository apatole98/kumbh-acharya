import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const DEMO_USER = {
  userId: 'demo_001',
  name: 'Anurag (Demo)',
  email: 'demo@kumbh.app',
  phone: '9999999999',
  password: 'demo1234',
  isPro: true,
  createdAt: new Date(Date.now() - 30 * 86400000).toISOString(), // 30 days ago
}

function seedDemoGamification() {
  const key = 'ka_gami_demo@kumbh.app'
  if (localStorage.getItem(key)) return // already seeded

  const today = new Date().toISOString().split('T')[0]
  const d = new Date(), day = d.getDay()
  const mon = new Date(d); mon.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  const week = mon.toISOString().split('T')[0]

  localStorage.setItem(key, JSON.stringify({
    points:  { total: 1250, available: 1250, earned: 1250, redeemed: 0 },
    streak:  { current: 12, max: 15, lastLogin: today },
    badges:  ['morning_riser', 'mantra_chanter', 'first_post', 'weekly_warrior', 'pro_member', 'diamond_seeker'],
    daily:   { date: today, chats: 2, langs: ['hindi', 'english'], morning: true, done: { dq_login: true, dq_morning: true } },
    weekly:  { week, chats: 14, mantras: 3, langs: ['hindi', 'english', 'marathi'], community: 2, rituals: 2, done: {} },
    total:   { chats: 87, community: 8, langs: ['hindi', 'english', 'marathi', 'gujarati'] },
    mdone:   {},
    log: [
      { pts: 50, reason: 'Morning Mantra quest 🌅', time: Date.now() - 3600000 },
      { pts: 25, reason: 'Daily login 🙏',           time: Date.now() - 7200000 },
      { pts: 10, reason: 'AI Chat 🤖',               time: Date.now() - 9000000 },
      { pts: 10, reason: 'AI Chat 🤖',               time: Date.now() - 10800000 },
      { pts: 25, reason: 'Created a community post 📝', time: Date.now() - 86400000 },
    ],
  }))
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('ka_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    setLoading(false)
  }, [])

  const signup = ({ name, email, phone, password }) => {
    const existing = JSON.parse(localStorage.getItem('ka_users') || '[]')
    const exists = existing.find(u => u.email === email || u.phone === phone)
    if (exists) return { error: 'Email or phone already registered' }
    const newUser = { userId: Date.now().toString(), name, email, phone, password, isPro: false, createdAt: new Date().toISOString() }
    existing.push(newUser)
    localStorage.setItem('ka_users', JSON.stringify(existing))
    const { password: _, ...safeUser } = newUser
    localStorage.setItem('ka_user', JSON.stringify(safeUser))
    setUser(safeUser)
    return { success: true }
  }

  const login = ({ emailOrPhone, password }) => {
    // Allow demo shortcut
    if (emailOrPhone === 'demo@kumbh.app' && password === 'demo1234') {
      return demoLogin()
    }
    const existing = JSON.parse(localStorage.getItem('ka_users') || '[]')
    const found = existing.find(u => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password)
    if (!found) return { error: 'Invalid credentials. Please try again.' }
    const { password: _, ...safeUser } = found
    localStorage.setItem('ka_user', JSON.stringify(safeUser))
    setUser(safeUser)
    return { success: true }
  }

  const demoLogin = () => {
    // Ensure demo user exists in users list
    const existing = JSON.parse(localStorage.getItem('ka_users') || '[]')
    if (!existing.find(u => u.email === DEMO_USER.email)) {
      existing.push(DEMO_USER)
      localStorage.setItem('ka_users', JSON.stringify(existing))
    }
    const { password: _, ...safeUser } = DEMO_USER
    localStorage.setItem('ka_user', JSON.stringify(safeUser))
    seedDemoGamification()
    setUser(safeUser)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('ka_user')
    localStorage.removeItem('ka_chats_used')
    localStorage.removeItem('ka_chats_date')
    setUser(null)
  }

  const updateUser = (updates) => {
    const updated = { ...user, ...updates }
    localStorage.setItem('ka_user', JSON.stringify(updated))
    const all = JSON.parse(localStorage.getItem('ka_users') || '[]')
    const idx = all.findIndex(u => u.userId === user.userId)
    if (idx !== -1) { all[idx] = { ...all[idx], ...updates }; localStorage.setItem('ka_users', JSON.stringify(all)) }
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateUser, demoLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
