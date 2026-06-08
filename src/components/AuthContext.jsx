import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
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

    const newUser = {
      userId: Date.now().toString(),
      name,
      email,
      phone,
      password,
      isPro: false,
      createdAt: new Date().toISOString(),
    }
    existing.push(newUser)
    localStorage.setItem('ka_users', JSON.stringify(existing))

    const { password: _, ...safeUser } = newUser
    localStorage.setItem('ka_user', JSON.stringify(safeUser))
    setUser(safeUser)
    return { success: true }
  }

  const login = ({ emailOrPhone, password }) => {
    const existing = JSON.parse(localStorage.getItem('ka_users') || '[]')
    const found = existing.find(
      u => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password
    )
    if (!found) return { error: 'Invalid credentials. Please try again.' }

    const { password: _, ...safeUser } = found
    localStorage.setItem('ka_user', JSON.stringify(safeUser))
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
    if (idx !== -1) {
      all[idx] = { ...all[idx], ...updates }
      localStorage.setItem('ka_users', JSON.stringify(all))
    }
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
