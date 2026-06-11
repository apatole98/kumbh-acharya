import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from '../components/AuthContext.jsx'

const CommunityContext = createContext(null)
export const useCommunity = () => useContext(CommunityContext)

export const LEADERBOARD = [
  { rank: 1,  name: 'Priya Sharma',   pts: 4820, streak: 45, badges: ['acharya','daily_devotee'],   isPro: true  },
  { rank: 2,  name: 'Ramesh Patel',   pts: 3940, streak: 32, badges: ['diamond_seeker','mantra_chanter'], isPro: true  },
  { rank: 3,  name: 'Meera Devi',     pts: 3210, streak: 28, badges: ['popular_pilgrim','story_teller'], isPro: true  },
  { rank: 4,  name: 'Arjun Singh',    pts: 2870, streak: 21, badges: ['weekly_warrior'],             isPro: false },
  { rank: 5,  name: 'Sunita Mishra',  pts: 2540, streak: 18, badges: ['comm_helper'],                isPro: true  },
  { rank: 6,  name: 'Vikram Nair',    pts: 2180, streak: 15, badges: ['first_post','story_teller'],  isPro: false },
  { rank: 7,  name: 'Kavitha Rao',    pts: 1960, streak: 12, badges: ['popular_pilgrim'],            isPro: true  },
  { rank: 8,  name: 'Deepak Joshi',   pts: 1720, streak: 10, badges: ['streak_champion'],            isPro: false },
  { rank: 9,  name: 'Anita Gupta',    pts: 1450, streak: 8,  badges: ['daily_devotee'],              isPro: true  },
  { rank: 10, name: 'Suresh Kumar',   pts: 1230, streak: 6,  badges: [],                             isPro: false },
  { rank: 11, name: 'Lalita Singh',   pts: 1080, streak: 5,  badges: [],                             isPro: false },
  { rank: 12, name: 'Mohan Das',      pts:  920, streak: 4,  badges: [],                             isPro: false },
  { rank: 13, name: 'Geeta Verma',    pts:  810, streak: 3,  badges: [],                             isPro: false },
  { rank: 14, name: 'Ravi Shankar',   pts:  690, streak: 2,  badges: [],                             isPro: false },
  { rank: 15, name: 'Pooja Nair',     pts:  520, streak: 1,  badges: [],                             isPro: false },
]

const SEED_POSTS = [
  {
    id: 'seed_1', author: { name: 'Priya Sharma', isPro: true },
    title: 'My First Shahi Snan at Triveni Sangam 🙏',
    content: 'Today at Triveni Sangam was life-changing. Thousands of pilgrims gathered before dawn. The cold water felt like a divine embrace. Come by 4 AM to avoid the crowd. Om Namah Shivaya! 🕉',
    type: 'experience', tags: ['shahi-snan', 'triveni', 'kumbh2025'],
    likes: 245, liked: false, saved: false, comments: [
      { id: 'c1', author: 'Ramesh P.', text: 'Beautiful! Which ghat exactly?', likes: 5, liked: false, time: Date.now() - 1800000 },
      { id: 'c2', author: 'Meera D.', text: '🙏 Om Namah Shivaya! I had the same experience.', likes: 12, liked: false, time: Date.now() - 900000 },
    ],
    time: Date.now() - 7200000,
  },
  {
    id: 'seed_2', author: { name: 'Ramesh Patel', isPro: false },
    title: 'Pro Tip: Best time to visit Ganga Ghats ⏰',
    content: 'After 4 visits, I found 5–6 AM is the BEST time. Less crowd, beautiful sunrise, morning aarti. Avoid 10 AM–4 PM — too hot and crowded. Carry your own prasad and water.',
    type: 'tip', tags: ['tips', 'ganga-ghat', 'timing'],
    likes: 182, liked: false, saved: false, comments: [
      { id: 'c3', author: 'Arjun S.', text: 'Confirmed! 5 AM is magical ✨', likes: 8, liked: false, time: Date.now() - 3600000 },
    ],
    time: Date.now() - 18000000,
  },
  {
    id: 'seed_3', author: { name: 'Meera Devi', isPro: true },
    title: 'कुंभ में पहली बार — अविस्मरणीय अनुभव 🌺',
    content: 'पहली बार कुंभ मेला गई। शाही स्नान के दौरान जो दिव्य अनुभव हुआ, वो शब्दों में बयान नहीं। गंगा माँ का आशीर्वाद हम सबको मिले। कुंभ आचार्य से जरूर मार्गदर्शन लें।',
    type: 'experience', tags: ['hindi', 'shahi-snan', 'spiritual'],
    likes: 134, liked: false, saved: false, comments: [],
    time: Date.now() - 28800000,
  },
  {
    id: 'seed_4', author: { name: 'Arjun Singh', isPro: false },
    title: 'Question: Which mantras to chant during Snan? 🤔',
    content: 'New to Kumbh. Which mantras should I chant while taking the sacred dip? Kumbh Acharya suggested "Om Gange Cha Yamune Chaiva..." — are there others? Would love community input!',
    type: 'question', tags: ['mantra', 'snan', 'beginner'],
    likes: 89, liked: false, saved: false, comments: [
      { id: 'c4', author: 'Priya S.', text: 'Also chant "Har Har Gange" 108 times! 🙏', likes: 23, liked: false, time: Date.now() - 7200000 },
      { id: 'c5', author: 'Meera D.', text: 'Gayatri Mantra is always appropriate for any sacred occasion.', likes: 17, liked: false, time: Date.now() - 5400000 },
    ],
    time: Date.now() - 43200000,
  },
  {
    id: 'seed_5', author: { name: 'Sunita Mishra', isPro: true },
    title: 'Accommodation Guide for Kumbh Pilgrims 🏕',
    content: 'Book camps near Sangam area 2 months in advance! Tent villages are great and affordable. Government camps are cheapest. Stay at ashrams for authentic spiritual experience. Avoid last-minute booking — prices triple!',
    type: 'tip', tags: ['accommodation', 'guide', 'planning'],
    likes: 203, liked: false, saved: false, comments: [],
    time: Date.now() - 72000000,
  },
  {
    id: 'seed_6', author: { name: 'Deepak Joshi', isPro: false },
    title: '🔥 15-day streak! Feeling blessed every day',
    content: 'Just hit my 15-day streak on Kumbh Acharya! Learning something new about Vedic traditions every day. Today I learned about Amrit Kaal during Shahi Snan. Who else is on a streak?',
    type: 'experience', tags: ['streak', 'vedic', 'learning'],
    likes: 98, liked: false, saved: false, comments: [
      { id: 'c6', author: 'Vikram N.', text: 'I am on 12 days! Keep going 🔥', likes: 4, liked: false, time: Date.now() - 14400000 },
    ],
    time: Date.now() - 172800000,
  },
  {
    id: 'seed_7', author: { name: 'Kavitha Rao', isPro: true },
    title: 'Prayagraj food guide for pilgrims 🍛',
    content: 'Worried about food? Try: Daal Puri near Sangam ₹30, Kachori Sabzi at old city ₹40, fresh Lassi ₹20. Avoid street food after 8 PM. Carry ORS packets. Stay healthy during your pilgrimage!',
    type: 'tip', tags: ['food', 'guide', 'prayagraj'],
    likes: 156, liked: false, saved: false, comments: [],
    time: Date.now() - 259200000,
  },
]

function loadData() {
  try {
    const d = JSON.parse(localStorage.getItem('ka_community_v2') || 'null')
    if (d?.posts) return d
  } catch {}
  return { posts: SEED_POSTS, msgs: {} }
}

function saveData(posts, msgs) {
  try { localStorage.setItem('ka_community_v2', JSON.stringify({ posts, msgs })) } catch {}
}

export function CommunityProvider({ children }) {
  const { user } = useAuth()
  const [posts, setPosts]   = useState(SEED_POSTS)
  const [msgs, setMsgs]     = useState({})
  const [follows, setFollows] = useState([])

  useEffect(() => {
    const d = loadData()
    setPosts(d.posts || SEED_POSTS)
    setMsgs(d.msgs || {})
  }, [])

  const createPost = useCallback((data) => {
    if (!user) return null
    const post = {
      id: `p_${Date.now()}`, author: { name: user.name, isPro: !!user.isPro },
      ...data, likes: 0, liked: false, saved: false, comments: [], time: Date.now(),
    }
    setPosts(prev => { const next = [post, ...prev]; saveData(next, msgs); return next })
    return post
  }, [user, msgs])

  const toggleLike = useCallback((postId) => {
    setPosts(prev => {
      const next = prev.map(p => p.id !== postId ? p : { ...p, liked: !p.liked, likes: p.likes + (!p.liked ? 1 : -1) })
      saveData(next, msgs)
      return next
    })
  }, [msgs])

  const toggleSave = useCallback((postId) => {
    setPosts(prev => { const next = prev.map(p => p.id !== postId ? p : { ...p, saved: !p.saved }); saveData(next, msgs); return next })
  }, [msgs])

  const addComment = useCallback((postId, text) => {
    if (!user || !text.trim()) return
    const c = { id: `c_${Date.now()}`, author: user.name, text: text.trim(), likes: 0, liked: false, time: Date.now() }
    setPosts(prev => {
      const next = prev.map(p => p.id !== postId ? p : { ...p, comments: [...(p.comments || []), c] })
      saveData(next, msgs)
      return next
    })
  }, [user, msgs])

  const toggleCommentLike = useCallback((postId, commentId) => {
    setPosts(prev => {
      const next = prev.map(p => {
        if (p.id !== postId) return p
        return { ...p, comments: (p.comments || []).map(c => c.id !== commentId ? c : { ...c, liked: !c.liked, likes: c.likes + (!c.liked ? 1 : -1) }) }
      })
      saveData(next, msgs)
      return next
    })
  }, [msgs])

  const sendMessage = useCallback((toName, text) => {
    if (!user || !text.trim()) return
    const msg = { id: `m_${Date.now()}`, from: user.name, text: text.trim(), time: Date.now() }
    setMsgs(prev => {
      const thread = [...(prev[toName] || []), msg]
      const next = { ...prev, [toName]: thread }
      saveData(posts, next)
      return next
    })
  }, [user, posts])

  const toggleFollow = useCallback((name) => {
    setFollows(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }, [])

  return (
    <CommunityContext.Provider value={{ posts, createPost, toggleLike, toggleSave, addComment, toggleCommentLike, sendMessage, msgs, follows, toggleFollow }}>
      {children}
    </CommunityContext.Provider>
  )
}
