import React, { useState } from 'react'
import { AuthProvider, useAuth } from './components/AuthContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import FeaturesPage from './pages/FeaturesPage.jsx'
import KumbhAcharya from './kumbh-acharya.jsx'

function AppRoutes() {
  const { user, loading } = useAuth()
  const [page, setPage] = useState('chat')

  if (loading) {
    return (
      <div style={{
        height: '100dvh', backgroundColor: '#f8f6f1',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '16px',
        fontFamily: "'Segoe UI',Arial,sans-serif",
      }}>
        <div style={{ fontSize: '48px' }}>🕉</div>
        <div style={{ color: '#8b5cf6', fontSize: '16px', fontWeight: '600' }}>Loading...</div>
      </div>
    )
  }

  if (!user) {
    if (page === 'features') return <FeaturesPage onBack={() => setPage('chat')} onChat={() => setPage('chat')} />
    return <LoginPage onFeatures={() => setPage('features')} />
  }

  if (page === 'profile') return <ProfilePage onBack={() => setPage('chat')} />
  if (page === 'features') return <FeaturesPage onBack={() => setPage('chat')} onChat={() => setPage('chat')} />

  return <KumbhAcharya onProfile={() => setPage('profile')} onFeatures={() => setPage('features')} />
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
