import React, { useState } from 'react'
import { AuthProvider, useAuth } from './components/AuthContext.jsx'
import { CommunityProvider } from './context/CommunityContext.jsx'
import LoginPage        from './pages/LoginPage.jsx'
import ImmersiveLanding from './pages/ImmersiveLanding.jsx'
import ProfilePage      from './pages/ProfilePage.jsx'
import FeaturesPage     from './pages/FeaturesPage.jsx'
import CommunityPage    from './pages/CommunityPage.jsx'
import CreatePostPage   from './pages/CreatePostPage.jsx'
import PostDetailPage   from './pages/PostDetailPage.jsx'
import MessagesPage     from './pages/MessagesPage.jsx'
import KumbhAcharya     from './kumbh-acharya.jsx'
import AboutPage        from './pages/AboutPage.jsx'
import ContactPage      from './pages/ContactPage.jsx'
import TermsPage        from './pages/TermsPage.jsx'
import PrivacyPage      from './pages/PrivacyPage.jsx'
import SinhasthPage     from './pages/SinhasthPage.jsx'
import AIGuidePage      from './pages/AIGuidePage.jsx'
import NotFoundPage     from './pages/NotFoundPage.jsx'

function AppRoutes() {
  const { user, loading } = useAuth()
  const [page, setPage]   = useState('landing')
  const [postId, setPostId] = useState(null)

  const nav = (to, data) => { setPage(to); if (data?.postId) setPostId(data.postId) }

  if (loading) return (
    <div style={{ height: '100dvh', backgroundColor: '#0f1419', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', fontFamily: 'inherit' }}>
      <div style={{ fontSize: '48px', animation: 'float 2s ease-in-out infinite' }}>🕉</div>
      <div style={{ color: '#d4af37', fontSize: '16px', fontWeight: '600' }}>Loading...</div>
    </div>
  )

  if (!user) {
    if (page === 'features') return <FeaturesPage onBack={() => setPage('landing')} onChat={() => setPage('login')} onNav={nav} />
    if (page === 'login')    return <LoginPage    onFeatures={() => setPage('features')} onBack={() => setPage('landing')} />
    if (page === 'sinhastha') return <SinhasthPage onNav={nav} />
    if (page === 'ai-guide')  return <AIGuidePage  onNav={nav} />
    if (page === 'about')     return <AboutPage    onNav={nav} />
    if (page === 'contact')   return <ContactPage  onNav={nav} />
    if (page === 'terms')     return <TermsPage    onNav={nav} />
    if (page === 'privacy')   return <PrivacyPage  onNav={nav} />
    return <ImmersiveLanding onLogin={() => setPage('login')} onFeatures={() => setPage('features')} onNav={nav} />
  }

  if (page === 'landing')     return <ImmersiveLanding onEnterApp={() => setPage('chat')} onFeatures={() => setPage('features')} onNav={nav} />
  if (page === 'profile')     return <ProfilePage  onBack={() => setPage('chat')} onNav={nav} />
  if (page === 'features')    return <FeaturesPage onBack={() => setPage('chat')} onChat={() => setPage('chat')} onNav={nav} />
  if (page === 'community')   return <CommunityPage onNav={nav} onCreatePost={() => setPage('create-post')} onOpenPost={p => nav('post-detail', { postId: p.id })} />
  if (page === 'create-post') return <CreatePostPage onBack={() => setPage('community')} onSuccess={() => setPage('community')} />
  if (page === 'post-detail') return <PostDetailPage postId={postId} onBack={() => setPage('community')} />
  if (page === 'messages')    return <MessagesPage onNav={nav} />
  if (page === 'about')       return <AboutPage    onNav={nav} />
  if (page === 'contact')     return <ContactPage  onNav={nav} />
  if (page === 'terms')       return <TermsPage    onNav={nav} />
  if (page === 'privacy')     return <PrivacyPage  onNav={nav} />
  if (page === 'sinhastha')   return <SinhasthPage onNav={nav} />
  if (page === 'ai-guide')    return <AIGuidePage  onNav={nav} />
  if (page === 'chat')        return <KumbhAcharya onNav={nav} />

  return <NotFoundPage onNav={nav} />
}

export default function App() {
  return (
    <AuthProvider>
      <CommunityProvider>
        <AppRoutes />
      </CommunityProvider>
    </AuthProvider>
  )
}
