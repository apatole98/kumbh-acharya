import React, { useState } from 'react'
import { AuthProvider, useAuth } from './components/AuthContext.jsx'
import { GamificationProvider } from './context/GamificationContext.jsx'
import { CommunityProvider } from './context/CommunityContext.jsx'
import LoginPage        from './pages/LoginPage.jsx'
import ProfilePage      from './pages/ProfilePage.jsx'
import FeaturesPage     from './pages/FeaturesPage.jsx'
import GamificationPage from './pages/GamificationPage.jsx'
import QuestsPage       from './pages/QuestsPage.jsx'
import LeaderboardPage  from './pages/LeaderboardPage.jsx'
import BadgesPage       from './pages/BadgesPage.jsx'
import CommunityPage    from './pages/CommunityPage.jsx'
import CreatePostPage   from './pages/CreatePostPage.jsx'
import PostDetailPage   from './pages/PostDetailPage.jsx'
import MessagesPage     from './pages/MessagesPage.jsx'
import KumbhAcharya     from './kumbh-acharya.jsx'

function AppRoutes() {
  const { user, loading } = useAuth()
  const [page, setPage]   = useState('chat')
  const [postId, setPostId] = useState(null)

  const nav = (to, data) => { setPage(to); if (data?.postId) setPostId(data.postId) }

  if (loading) return (
    <div style={{ height: '100dvh', backgroundColor: '#0f1419', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', fontFamily: 'inherit' }}>
      <div style={{ fontSize: '48px', animation: 'float 2s ease-in-out infinite' }}>🕉</div>
      <div style={{ color: '#d4af37', fontSize: '16px', fontWeight: '600' }}>Loading...</div>
    </div>
  )

  if (!user) {
    if (page === 'features') return <FeaturesPage onBack={() => setPage('chat')} onChat={() => setPage('chat')} />
    return <LoginPage onFeatures={() => setPage('features')} />
  }

  if (page === 'profile')      return <ProfilePage      onBack={() => setPage('chat')} onNav={nav} />
  if (page === 'features')     return <FeaturesPage     onBack={() => setPage('chat')} onChat={() => setPage('chat')} />
  if (page === 'gamification') return <GamificationPage onNav={nav} />
  if (page === 'quests')       return <QuestsPage       onNav={nav} />
  if (page === 'leaderboard')  return <LeaderboardPage  onNav={nav} />
  if (page === 'badges')       return <BadgesPage       onNav={nav} />
  if (page === 'community')    return <CommunityPage    onNav={nav} onCreatePost={() => setPage('create-post')} onOpenPost={p => nav('post-detail', { postId: p.id })} />
  if (page === 'create-post')  return <CreatePostPage   onBack={() => setPage('community')} onSuccess={() => setPage('community')} />
  if (page === 'post-detail')  return <PostDetailPage   postId={postId} onBack={() => setPage('community')} />
  if (page === 'messages')     return <MessagesPage     onNav={nav} />

  return <KumbhAcharya onNav={nav} />
}

export default function App() {
  return (
    <AuthProvider>
      <GamificationProvider>
        <CommunityProvider>
          <AppRoutes />
        </CommunityProvider>
      </GamificationProvider>
    </AuthProvider>
  )
}
