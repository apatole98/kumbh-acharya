import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from '../components/AuthContext.jsx'

const GamificationContext = createContext(null)
export const useGamification = () => useContext(GamificationContext)

export const RARITY_COLORS = {
  common: '#64748b', uncommon: '#10b981', rare: '#3b82f6',
  epic: '#8b5cf6', legendary: '#d4af37', special: '#f59e0b',
}

export const ALL_BADGES = [
  { id: 'morning_riser',   name: 'Morning Riser',    icon: '🌅', desc: 'Login 5 days before 8 AM',       cat: 'spiritual', rarity: 'common'    },
  { id: 'mantra_chanter',  name: 'Mantra Chanter',   icon: '🕉',  desc: 'Ask 25 mantra questions',        cat: 'spiritual', rarity: 'uncommon'  },
  { id: 'ritual_scholar',  name: 'Ritual Scholar',   icon: '🔱', desc: 'Learn 10 different rituals',     cat: 'spiritual', rarity: 'uncommon'  },
  { id: 'daily_devotee',   name: 'Daily Devotee',    icon: '🙏', desc: 'Login 30 days in a row',         cat: 'spiritual', rarity: 'rare'      },
  { id: 'diamond_seeker',  name: 'Diamond Seeker',   icon: '💎', desc: 'Earn 500+ total points',         cat: 'spiritual', rarity: 'rare'      },
  { id: 'acharya',         name: 'Acharya Master',   icon: '👑', desc: 'Complete 500 total chats',       cat: 'spiritual', rarity: 'legendary' },
  { id: 'enlightened',     name: 'Enlightened One',  icon: '✨', desc: 'Earn 1000+ lifetime points',     cat: 'spiritual', rarity: 'legendary' },
  { id: 'kumbh_veteran',   name: 'Kumbh Veteran',    icon: '🌺', desc: 'Use app for 90+ days',           cat: 'spiritual', rarity: 'epic'      },
  { id: 'streak_champion', name: 'Streak Champion',  icon: '⚡', desc: '20+ day login streak',           cat: 'spiritual', rarity: 'rare'      },
  { id: 'hall_of_fame',    name: 'Hall of Fame',     icon: '🎖', desc: 'Top 10 on leaderboard',          cat: 'spiritual', rarity: 'legendary' },
  { id: 'century_seeker',  name: 'Century Seeker',   icon: '💯', desc: 'Complete 100 total chats',       cat: 'spiritual', rarity: 'epic'      },
  { id: 'multilingual',    name: 'Multilingual Sage',icon: '🌍', desc: 'Chat in all 5 languages',        cat: 'spiritual', rarity: 'epic'      },
  { id: 'first_post',      name: 'First Post',       icon: '💬', desc: 'Share your first experience',    cat: 'community', rarity: 'common'    },
  { id: 'comm_helper',     name: 'Community Helper', icon: '👥', desc: 'Help 5 people in community',     cat: 'community', rarity: 'uncommon'  },
  { id: 'popular_pilgrim', name: 'Popular Pilgrim',  icon: '🌟', desc: 'Get 50+ likes on a post',       cat: 'community', rarity: 'rare'      },
  { id: 'story_teller',    name: 'Story Teller',     icon: '📸', desc: 'Share 5+ experiences',           cat: 'community', rarity: 'uncommon'  },
  { id: 'weekly_warrior',  name: 'Weekly Warrior',   icon: '⚔', desc: 'Complete 20 chats in a week',   cat: 'community', rarity: 'uncommon'  },
  { id: 'comm_leader',     name: 'Community Leader', icon: '🏆', desc: 'Help 50+ people',                cat: 'community', rarity: 'legendary' },
  { id: 'pro_member',      name: 'Pro Member',       icon: '💳', desc: 'Active Pro subscription',        cat: 'pro',       rarity: 'special'   },
  { id: 'early_support',   name: 'Early Supporter',  icon: '💰', desc: 'One of first 100 Pro members',   cat: 'pro',       rarity: 'legendary' },
]

const DAILY_QUESTS = [
  { id: 'dq_morning',   title: 'Morning Mantra',     desc: 'Chat before 8 AM',              type: 'chat_morning', req: 1, points: 50, icon: '🌅' },
  { id: 'dq_curiosity', title: 'Spiritual Curiosity', desc: 'Ask 3 spiritual questions',     type: 'chat',         req: 3, points: 50, icon: '🕉'  },
  { id: 'dq_language',  title: 'Language Explorer',  desc: 'Chat in 2 different languages',  type: 'language',     req: 2, points: 50, icon: '🗣'  },
  { id: 'dq_login',     title: 'Daily Devotee',      desc: 'Login today',                    type: 'login',        req: 1, points: 25, icon: '🙏'  },
]

const WEEKLY_QUESTS = [
  { id: 'wq_devoted',   title: 'Devoted Seeker',   desc: '20 chats this week',             type: 'chat',      req: 20, points: 200, icon: '⚡' },
  { id: 'wq_mantra',    title: 'Mantra Master',     desc: 'Ask 5 mantra-related questions', type: 'mantra',    req: 5,  points: 150, icon: '📿' },
  { id: 'wq_languages', title: 'Knowledge Quest',   desc: 'Chat in all 5 languages',        type: 'language',  req: 5,  points: 200, icon: '🌍' },
  { id: 'wq_community', title: 'Community Helper',  desc: 'Help 3 pilgrims',                type: 'community', req: 3,  points: 150, icon: '💝' },
  { id: 'wq_ritual',    title: 'Ritual Scholar',    desc: 'Learn 5 different rituals',      type: 'ritual',    req: 5,  points: 200, icon: '🔱' },
]

const MILESTONE_QUESTS = [
  { id: 'mq_100',  title: '100 Days Pilgrim', desc: '100 total chats',       type: 'total_chat', req: 100, points: 1000, reward: '1 month free Pro',  icon: '💯' },
  { id: 'mq_500',  title: 'Spiritual Guide',  desc: '500 total chats',       type: 'total_chat', req: 500, points: 5000, reward: 'Lifetime Pro',       icon: '👑' },
  { id: 'mq_comm', title: 'Community Pillar', desc: 'Help 50 people',        type: 'comm_total', req: 50,  points: 3000, reward: '3 months free Pro',  icon: '🏛' },
  { id: 'mq_lang', title: 'Language Master',  desc: 'Chat in 5 languages',   type: 'multilang',  req: 5,   points: 2000, reward: '2 months free Pro',  icon: '🌺' },
]

const todayStr = () => new Date().toISOString().split('T')[0]
const weekStr  = () => {
  const d = new Date(), day = d.getDay()
  const mon = new Date(d); mon.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  return mon.toISOString().split('T')[0]
}

function mkFresh() {
  return {
    points:  { total: 25, available: 25, earned: 25, redeemed: 0 },
    streak:  { current: 1, max: 1, lastLogin: todayStr() },
    badges:  [],
    daily:   { date: todayStr(), chats: 0, langs: [], morning: false, done: { dq_login: true } },
    weekly:  { week: weekStr(), chats: 0, mantras: 0, langs: [], community: 0, rituals: 0, done: {} },
    total:   { chats: 0, community: 0, langs: [] },
    mdone:   {},
    log:     [{ pts: 25, reason: 'First login bonus 🎉', time: Date.now() }],
  }
}

function load(key) { try { return JSON.parse(localStorage.getItem(key) || 'null') } catch { return null } }
function persist(key, val) { try { localStorage.setItem(key, JSON.stringify(val)) } catch {} }

export function GamificationProvider({ children }) {
  const { user } = useAuth()
  const [gami, setGami] = useState(null)
  const storKey = user ? `ka_gami_${user.email}` : null

  useEffect(() => {
    if (!user) { setGami(null); return }
    let d = load(storKey) || mkFresh()

    // Reset daily
    if (d.daily?.date !== todayStr()) {
      d.daily = { date: todayStr(), chats: 0, langs: [], morning: false, done: {} }
    }
    // Reset weekly
    if (d.weekly?.week !== weekStr()) {
      d.weekly = { week: weekStr(), chats: 0, mantras: 0, langs: [], community: 0, rituals: 0, done: {} }
    }
    // Update streak
    if (d.streak?.lastLogin !== todayStr()) {
      const yest = new Date(); yest.setDate(yest.getDate() - 1)
      const yStr = yest.toISOString().split('T')[0]
      d.streak.current = d.streak.lastLogin === yStr ? (d.streak.current || 0) + 1 : 1
      d.streak.max = Math.max(d.streak.max || 0, d.streak.current)
      d.streak.lastLogin = todayStr()
      // login quest bonus
      if (!d.daily.done?.dq_login) {
        d.daily.done = { ...d.daily.done, dq_login: true }
        d.points.total += 25; d.points.available += 25; d.points.earned += 25
        d.log = [{ pts: 25, reason: 'Daily login 🙏', time: Date.now() }, ...(d.log || []).slice(0, 29)]
      }
    }
    if (!d.daily.done?.dq_login) {
      d.daily.done = { ...d.daily.done, dq_login: true }
    }

    setGami(d)
    persist(storKey, d)
  }, [user?.email])

  const update = useCallback((updater) => {
    setGami(prev => {
      if (!prev) return prev
      const next = updater(prev)
      if (storKey) persist(storKey, next)
      return next
    })
  }, [storKey])

  const trackChat = useCallback((language = 'hindi', content = '') => {
    update(prev => {
      const isMantra  = /mantra|मंत्र|om |ॐ|chant/i.test(content)
      const isRitual  = /ritual|puja|pooja|snan|स्नान|पूजा|aarti|आरती/i.test(content)
      const isMorning = new Date().getHours() < 8
      const dlangs    = [...new Set([...(prev.daily?.langs || []),  language])]
      const wlangs    = [...new Set([...(prev.weekly?.langs || []), language])]
      const tlangs    = [...new Set([...(prev.total?.langs || []),  language])]
      return {
        ...prev,
        daily:  { ...prev.daily,  chats: (prev.daily?.chats || 0) + 1,  langs: dlangs, morning: prev.daily?.morning || isMorning },
        weekly: { ...prev.weekly, chats: (prev.weekly?.chats || 0) + 1, mantras: (prev.weekly?.mantras || 0) + (isMantra ? 1 : 0), rituals: (prev.weekly?.rituals || 0) + (isRitual ? 1 : 0), langs: wlangs },
        total:  { ...prev.total,  chats: (prev.total?.chats || 0) + 1,  langs: tlangs },
        points: { ...prev.points, total: prev.points.total + 10, available: prev.points.available + 10, earned: prev.points.earned + 10 },
        log:    [{ pts: 10, reason: 'AI Chat 🤖', time: Date.now() }, ...(prev.log || []).slice(0, 29)],
      }
    })
  }, [update])

  const trackCommunity = useCallback((pts = 50, reason = 'Community help') => {
    update(prev => ({
      ...prev,
      weekly: { ...prev.weekly, community: (prev.weekly?.community || 0) + 1 },
      total:  { ...prev.total,  community: (prev.total?.community  || 0) + 1 },
      points: { ...prev.points, total: prev.points.total + pts, available: prev.points.available + pts, earned: prev.points.earned + pts },
      log:    [{ pts, reason, time: Date.now() }, ...(prev.log || []).slice(0, 29)],
    }))
  }, [update])

  const addPoints = useCallback((pts, reason) => {
    update(prev => ({
      ...prev,
      points: { ...prev.points, total: prev.points.total + pts, available: prev.points.available + pts, earned: prev.points.earned + pts },
      log:    [{ pts, reason, time: Date.now() }, ...(prev.log || []).slice(0, 29)],
    }))
  }, [update])

  const unlockBadge = useCallback((badgeId) => {
    update(prev => {
      if ((prev.badges || []).includes(badgeId)) return prev
      return { ...prev, badges: [...(prev.badges || []), badgeId] }
    })
  }, [update])

  const claimQuest = useCallback((questId, qtype, pts) => {
    update(prev => {
      const key = qtype === 'daily' ? 'daily' : qtype === 'weekly' ? 'weekly' : 'mdone'
      if (qtype === 'milestone') {
        if (prev.mdone?.[questId]) return prev
        return { ...prev, mdone: { ...prev.mdone, [questId]: true }, points: { ...prev.points, total: prev.points.total + pts, available: prev.points.available + pts, earned: prev.points.earned + pts }, log: [{ pts, reason: '🏆 Quest claimed!', time: Date.now() }, ...(prev.log || []).slice(0, 29)] }
      }
      const section = prev[key] || {}
      if (section.done?.[questId]) return prev
      return { ...prev, [key]: { ...section, done: { ...(section.done || {}), [questId]: true } }, points: { ...prev.points, total: prev.points.total + pts, available: prev.points.available + pts, earned: prev.points.earned + pts }, log: [{ pts, reason: '⚡ Quest claimed!', time: Date.now() }, ...(prev.log || []).slice(0, 29)] }
    })
  }, [update])

  const getDailyQuests = () => {
    if (!gami) return []
    return DAILY_QUESTS.map(q => {
      let progress = 0
      if (q.type === 'chat')         progress = gami.daily?.chats || 0
      else if (q.type === 'chat_morning') progress = gami.daily?.morning ? 1 : 0
      else if (q.type === 'language') progress = (gami.daily?.langs || []).length
      else if (q.type === 'login')    progress = 1
      const completed = !!(gami.daily?.done?.[q.id])
      const ready     = !completed && progress >= q.req
      return { ...q, progress: Math.min(progress, q.req), completed, ready }
    })
  }

  const getWeeklyQuests = () => {
    if (!gami) return []
    return WEEKLY_QUESTS.map(q => {
      let progress = 0
      if (q.type === 'chat')      progress = gami.weekly?.chats     || 0
      else if (q.type === 'mantra')    progress = gami.weekly?.mantras   || 0
      else if (q.type === 'language')  progress = (gami.weekly?.langs || []).length
      else if (q.type === 'community') progress = gami.weekly?.community || 0
      else if (q.type === 'ritual')    progress = gami.weekly?.rituals   || 0
      const completed = !!(gami.weekly?.done?.[q.id])
      const ready     = !completed && progress >= q.req
      return { ...q, progress: Math.min(progress, q.req), completed, ready }
    })
  }

  const getMilestoneQuests = () => {
    if (!gami) return []
    return MILESTONE_QUESTS.map(q => {
      let progress = 0
      if (q.type === 'total_chat') progress = gami.total?.chats     || 0
      else if (q.type === 'comm_total') progress = gami.total?.community || 0
      else if (q.type === 'multilang')  progress = (gami.total?.langs || []).length
      const completed = !!(gami.mdone?.[q.id])
      const ready     = !completed && progress >= q.req
      return { ...q, progress: Math.min(progress, q.req), completed, ready }
    })
  }

  return (
    <GamificationContext.Provider value={{ gami, trackChat, trackCommunity, addPoints, unlockBadge, claimQuest, getDailyQuests, getWeeklyQuests, getMilestoneQuests }}>
      {children}
    </GamificationContext.Provider>
  )
}
