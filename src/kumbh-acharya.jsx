import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useAuth } from './components/AuthContext.jsx'

const FREE_CHAT_LIMIT = 3

const LANGS = [
  { code: 'hindi',    label: 'हिंदी',    flag: '🇮🇳' },
  { code: 'english',  label: 'English',  flag: '🇬🇧' },
  { code: 'marathi',  label: 'मराठी',    flag: '🇮🇳' },
  { code: 'gujarati', label: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'bengali',  label: 'বাংলা',    flag: '🇮🇳' },
]

const SYS = {
  hindi:   'आप कुंभ आचार्य हैं - कुंभ मेला के एक सम्मानित आध्यात्मिक गुरु। वैदिक मंत्र, कुंभ परंपरा, तीर्थयात्रा मार्गदर्शन में विशेषज्ञ। सम्मानपूर्वक, संक्षिप्त उत्तर दें।',
  english: 'You are Kumbh Acharya — a revered spiritual guide at the Kumbh Mela. Expert in Vedic mantras, Kumbh traditions, Shahi Snan rituals, pilgrimage guidance. Speak as a wise guru. Be concise and meaningful.',
  marathi: 'तुम कुंभ आचार्य आहात - कुंभ मेळ्यातील आदरणीय आध्यात्मिक गुरू. वैदिक मंत्र, कुंभ परंपरा यांचे गहन ज्ञान. मराठीत आदरपूर्वक उत्तर द्या.',
  gujarati: 'તમે કુંભ આચાર્ય છો - કુંભ મેળાના આધ્યાત્મિક માર્ગદર્શક. ગુજરાતીમાં આદરપૂર્વક જવાબ આપો.',
  bengali:  'আপনি কুম্ভ আচার্য - কুম্ভ মেলার আধ্যাত্মিক গাইড। বাংলায় শ্রদ্ধার সাথে উত্তর দিন।',
}

const WELCOME = {
  hindi:   '🙏 जय गंगा माँ! मैं कुंभ आचार्य हूँ। कुंभ मेला, वैदिक मंत्र या तीर्थयात्रा के बारे में पूछें।',
  english: '🙏 Jai Ganga Maa! I am Kumbh Acharya, your spiritual guide. Ask me about the Kumbh Mela, Vedic mantras, or your pilgrimage journey.',
  marathi: '🙏 जय गंगा माँ! मी कुंभ आचार्य आहे. कुंभ मेळा, वैदिक मंत्र किंवा तीर्थयात्रेबद्दल विचारा.',
  gujarati: '🙏 જય ગંગા માઁ! હું કુંભ આચાર્ય છું. કુંભ, મંત્ર અથવા યાત્રા વિશે પૂછો.',
  bengali:  '🙏 জয় গঙ্গা মাঁ! আমি কুম্ভ আচার্য। কুম্ভ মেলা, মন্ত্র বা তীর্থযাত্রা সম্পর্কে জিজ্ঞাসা করুন।',
}

const PLACEHOLDER = {
  hindi: 'अपना प्रश्न यहाँ लिखें...', english: 'Type your spiritual question...',
  marathi: 'आपला प्रश्न येथे लिहा...', gujarati: 'પ્રશ્ન અહીં લખો...', bengali: 'প্রশ্ন এখানে লিখুন...',
}

const PAYWALL_FEATS = {
  hindi:   ['✨ असीमित दैनिक प्रश्न', '📿 सभी 5 भाषाएं', '🔱 प्राथमिकता उत्तर', '🌺 उन्नत मार्गदर्शन'],
  english: ['✨ Unlimited daily questions', '📿 All 5 languages', '🔱 Priority responses', '🌺 Advanced guidance'],
  marathi: ['✨ असीमित प्रश्न', '📿 सर्व 5 भाषा', '🔱 प्राधान्य उत्तरे', '🌺 प्रगत मार्गदर्शन'],
  gujarati:['✨ અમર્યાદિત પ્રશ્નો', '📿 5 ભાષાઓ', '🔱 પ્રાથમિક ઉત્તર', '🌺 ઉન્નત માર્ગદર્શન'],
  bengali: ['✨ সীমাহীন প্রশ্ন', '📿 ৫ ভাষা', '🔱 অগ্রাধিকার উত্তর', '🌺 উন্নত নির্দেশনা'],
}

let _id = 0
const uid = () => ++_id

export default function KumbhAcharya({ onProfile, onFeatures }) {
  const { user, logout } = useAuth()
  const [msgs, setMsgs]           = useState([])
  const [input, setInput]         = useState('')
  const [lang, setLang]           = useState('hindi')
  const [loading, setLoading]     = useState(false)
  const [showMenu, setShowMenu]   = useState(false)
  const [showPaywall, setPaywall] = useState(false)
  const [showLangs, setShowLangs] = useState(false)
  const [isPaid, setIsPaid]       = useState(() => user?.isPro || localStorage.getItem('ka_paid') === 'true')
  const [chatsUsed, setChatsUsed] = useState(() => {
    const d = localStorage.getItem('ka_chats_date')
    const today = new Date().toDateString()
    if (d !== today) { localStorage.setItem('ka_chats_date', today); localStorage.setItem('ka_chats_used', '0'); return 0 }
    return parseInt(localStorage.getItem('ka_chats_used') || '0', 10)
  })
  const endRef  = useRef(null)
  const taRef   = useRef(null)

  useEffect(() => { setMsgs([{ id: uid(), role: 'bot', text: WELCOME[lang] }]) }, [lang])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, loading])

  // close menus on outside click
  useEffect(() => {
    const h = () => { setShowMenu(false); setShowLangs(false) }
    document.addEventListener('click', h)
    return () => document.removeEventListener('click', h)
  }, [])

  const remaining = isPaid ? Infinity : Math.max(0, FREE_CHAT_LIMIT - chatsUsed)

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return
    if (!isPaid && chatsUsed >= FREE_CHAT_LIMIT) { setPaywall(true); return }

    setMsgs(p => [...p, { id: uid(), role: 'user', text }])
    setInput('')
    if (taRef.current) { taRef.current.style.height = 'auto' }
    setLoading(true)

    const newUsed = chatsUsed + 1
    setChatsUsed(newUsed)
    localStorage.setItem('ka_chats_used', String(newUsed))

    try {
      const res  = await fetch('/.netlify/functions/claude-api', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: lang, systemPrompt: SYS[lang], userId: user?.userId || 'guest' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMsgs(p => [...p, { id: uid(), role: 'bot', text: data.response }])
    } catch {
      setMsgs(p => [...p, { id: uid(), role: 'bot', text: lang === 'english' ? '🙏 Sorry, there was a connection problem. Please try again.' : '🙏 क्षमा करें, कनेक्शन में समस्या है।' }])
    } finally { setLoading(false) }
  }, [input, loading, isPaid, chatsUsed, lang, user])

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }
  const onInput = (e) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
  const activeLang = LANGS.find(l => l.code === lang)

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh', maxWidth:'640px', margin:'0 auto', background:'#0f1419', position:'relative' }}>

      {/* ═══ HEADER ═══ */}
      <header style={{ background:'#1a1f2e', borderBottom:'1px solid #334155', padding:'0 20px', height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0, boxShadow:'0 2px 12px rgba(0,0,0,0.3)', zIndex:10 }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <span style={{ fontSize:'28px', lineHeight:1 }}>🕉</span>
          <div>
            <div style={{ color:'#d4af37', fontSize:'16px', fontWeight:'800', letterSpacing:'-0.3px' }}>कुंभ आचार्य</div>
            <div style={{ color:'#64748b', fontSize:'11px', marginTop:'1px' }}>Spiritual AI Guide</div>
          </div>
        </div>

        {/* Right controls */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          {onFeatures && (
            <button onClick={onFeatures} style={{ background:'transparent', color:'#94a3b8', border:'1px solid #334155', borderRadius:'8px', padding:'6px 12px', fontSize:'12px', fontWeight:'600', cursor:'pointer', transition:'all 200ms' }}
              onMouseEnter={e=>{e.currentTarget.style.color='#d4af37';e.currentTarget.style.borderColor='rgba(212,175,55,0.5)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='#94a3b8';e.currentTarget.style.borderColor='#334155'}}>
              Plans
            </button>
          )}

          {/* Language picker */}
          <div style={{ position:'relative' }} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>{setShowLangs(v=>!v);setShowMenu(false)}}
              style={{ background:'transparent', color:'#cbd5e1', border:'1px solid #334155', borderRadius:'8px', padding:'6px 10px', fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', transition:'all 200ms' }}
              onMouseEnter={e=>e.currentTarget.style.borderColor='#475569'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='#334155'}>
              <span>{activeLang.flag}</span><span style={{fontSize:'12px'}}>{activeLang.label}</span><span style={{color:'#64748b',fontSize:'10px'}}>▾</span>
            </button>
            {showLangs && (
              <div className="ai" style={{ position:'absolute', right:0, top:'38px', background:'#1a1f2e', border:'1px solid #334155', borderRadius:'12px', padding:'8px', minWidth:'150px', zIndex:50, boxShadow:'0 8px 32px rgba(0,0,0,0.4)' }}>
                {LANGS.map(l => (
                  <button key={l.code} onClick={()=>{setLang(l.code);setShowLangs(false)}}
                    style={{ display:'block', width:'100%', textAlign:'left', background: l.code===lang ? '#252d3d' : 'transparent', color: l.code===lang ? '#d4af37' : '#cbd5e1', border:'none', padding:'9px 12px', fontSize:'13px', borderRadius:'8px', cursor:'pointer', transition:'all 150ms' }}
                    onMouseEnter={e=>{if(l.code!==lang) e.currentTarget.style.background='#252d3d'}}
                    onMouseLeave={e=>{if(l.code!==lang) e.currentTarget.style.background='transparent'}}>
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User avatar */}
          <div style={{ position:'relative' }} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>{setShowMenu(v=>!v);setShowLangs(false)}}
              style={{ background: isPaid ? 'linear-gradient(135deg,#d4af37,#b8962c)' : '#252d3d', color: isPaid ? '#0f1419' : '#cbd5e1', border:'none', borderRadius:'50%', width:'36px', height:'36px', fontSize:'14px', fontWeight:'700', cursor:'pointer', transition:'all 200ms', boxShadow: isPaid ? '0 0 12px rgba(212,175,55,0.4)' : 'none' }}>
              {initials}
            </button>
            {showMenu && (
              <div className="ai" style={{ position:'absolute', right:0, top:'44px', background:'#1a1f2e', border:'1px solid #334155', borderRadius:'14px', padding:'12px', minWidth:'200px', zIndex:50, boxShadow:'0 8px 32px rgba(0,0,0,0.5)' }}>
                {/* User info */}
                <div style={{ padding:'4px 4px 12px', marginBottom:'8px', borderBottom:'1px solid #334155' }}>
                  <div style={{ color:'#fff', fontSize:'14px', fontWeight:'700' }}>{user?.name}</div>
                  <div style={{ color:'#64748b', fontSize:'12px', marginTop:'2px' }}>{user?.email}</div>
                  <span style={{ display:'inline-block', marginTop:'6px', background: isPaid ? '#d4af37' : '#252d3d', color: isPaid ? '#0f1419' : '#64748b', borderRadius:'6px', padding:'2px 8px', fontSize:'10px', fontWeight:'700' }}>
                    {isPaid ? '⭐ PRO' : '🆓 FREE'}
                  </span>
                </div>
                <button onClick={()=>{setShowMenu(false); onProfile?.()}}
                  style={{ display:'block', width:'100%', textAlign:'left', background:'transparent', color:'#cbd5e1', border:'none', padding:'9px 10px', fontSize:'13px', borderRadius:'8px', cursor:'pointer', transition:'all 150ms' }}
                  onMouseEnter={e=>{e.currentTarget.style.background='#252d3d';e.currentTarget.style.color='#d4af37'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='#cbd5e1'}}>
                  👤 My Profile
                </button>
                {!isPaid && (
                  <button onClick={()=>{setShowMenu(false);setPaywall(true)}}
                    style={{ display:'block', width:'100%', textAlign:'left', background:'transparent', color:'#d4af37', border:'none', padding:'9px 10px', fontSize:'13px', borderRadius:'8px', cursor:'pointer', transition:'all 150ms' }}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(212,175,55,0.08)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    ⭐ Upgrade to Pro
                  </button>
                )}
                <div style={{ height:'1px', background:'#334155', margin:'8px 0' }} />
                <button onClick={logout}
                  style={{ display:'block', width:'100%', textAlign:'left', background:'transparent', color:'#ef4444', border:'none', padding:'9px 10px', fontSize:'13px', borderRadius:'8px', cursor:'pointer', transition:'all 150ms' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(239,68,68,0.08)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ═══ FREE COUNTER ═══ */}
      {!isPaid && (
        <div style={{ background:'linear-gradient(90deg,#1a1f2e,#252d3d)', borderBottom:'1px solid #334155', padding:'10px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <span style={{ color:'#94a3b8', fontSize:'13px' }}>
            {lang === 'english' ? 'Free chats today' : 'आज के मुफ्त प्रश्न'}
          </span>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <span style={{ background: remaining > 0 ? 'rgba(212,175,55,0.15)' : 'rgba(239,68,68,0.15)', color: remaining > 0 ? '#d4af37' : '#ef4444', border:`1px solid ${remaining > 0 ? 'rgba(212,175,55,0.4)' : 'rgba(239,68,68,0.4)'}`, borderRadius:'8px', padding:'3px 10px', fontSize:'12px', fontWeight:'700', boxShadow: remaining > 0 ? '0 0 8px rgba(212,175,55,0.2)' : 'none' }}>
              {remaining}/{FREE_CHAT_LIMIT} {lang === 'english' ? 'left' : 'शेष'}
            </span>
            {remaining === 0 && (
              <button onClick={()=>setPaywall(true)} className="btn-gold" style={{ padding:'4px 12px', fontSize:'11px', borderRadius:'7px' }}>
                Upgrade ⭐
              </button>
            )}
          </div>
        </div>
      )}

      {/* ═══ MESSAGES ═══ */}
      <div style={{ flex:1, overflowY:'auto', padding:'20px', display:'flex', flexDirection:'column', gap:'16px' }}>
        {msgs.map((m, i) => (
          <div key={m.id} className="au" style={{ alignSelf: m.role==='user' ? 'flex-end' : 'flex-start', maxWidth:'82%', animationDelay:`${i*0.04}s` }}>
            <div style={{ fontSize:'10px', color: m.role==='user' ? '#a78bfa' : '#64748b', marginBottom:'4px', fontWeight:'600', letterSpacing:'0.6px', textTransform:'uppercase', textAlign: m.role==='user' ? 'right' : 'left' }}>
              {m.role==='user' ? (lang==='english'?'You':'आप') : 'कुंभ आचार्य'}
            </div>
            <div style={{
              background: m.role==='user'
                ? 'linear-gradient(135deg, rgba(139,92,246,0.45) 0%, rgba(212,175,55,0.35) 100%)'
                : '#252d3d',
              color: '#e2e8f0',
              border: m.role==='user' ? '1px solid rgba(212,175,55,0.45)' : '1px solid #334155',
              borderRadius: m.role==='user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              padding:'12px 16px', fontSize:'15px', lineHeight:'1.6',
              boxShadow: m.role==='user' ? '0 4px 16px rgba(139,92,246,0.2)' : '0 2px 8px rgba(0,0,0,0.2)',
              wordBreak:'break-word',
            }}>{m.text}</div>
          </div>
        ))}

        {loading && (
          <div style={{ alignSelf:'flex-start', maxWidth:'82%' }}>
            <div style={{ fontSize:'10px', color:'#64748b', marginBottom:'4px', fontWeight:'600', letterSpacing:'0.6px', textTransform:'uppercase' }}>कुंभ आचार्य</div>
            <div style={{ background:'#252d3d', border:'1px solid #334155', borderRadius:'18px 18px 18px 4px', padding:'14px 18px', display:'flex', gap:'6px', alignItems:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}>
              {[0,0.22,0.44].map((d,i)=>(
                <div key={i} style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#d4af37', animation:`pulseDot 1.2s ease-in-out infinite`, animationDelay:`${d}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* ═══ INPUT ═══ */}
      <div style={{ background:'#1a1f2e', borderTop:'1px solid #334155', padding:'14px 20px', display:'flex', gap:'12px', alignItems:'flex-end', flexShrink:0 }}>
        <textarea ref={taRef}
          className="input-field"
          style={{ flex:1, padding:'12px 16px', resize:'none', minHeight:'48px', maxHeight:'120px', lineHeight:'1.5' }}
          value={input} onChange={onInput} onKeyDown={onKey}
          placeholder={PLACEHOLDER[lang]} rows={1} disabled={loading}
        />
        <button className="btn-gold"
          onClick={send} disabled={loading || !input.trim()}
          style={{ width:'48px', height:'48px', flexShrink:0, borderRadius:'12px', fontSize:'20px', display:'flex', alignItems:'center', justifyContent:'center', opacity: loading||!input.trim() ? 0.45 : 1, cursor: loading||!input.trim() ? 'not-allowed' : 'pointer', transition:'all 200ms' }}>
          🙏
        </button>
      </div>

      {/* ═══ PAYWALL MODAL ═══ */}
      {showPaywall && (
        <div className="ai" style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', zIndex:100 }}
          onClick={()=>setPaywall(false)}>
          <div style={{ background:'linear-gradient(160deg,#1a1f2e 0%,#252d3d 100%)', border:'2px solid rgba(212,175,55,0.35)', borderRadius:'20px', padding:'32px 28px', maxWidth:'380px', width:'100%', textAlign:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.5)', animation:'modalIn 300ms cubic-bezier(0.34,1.56,0.64,1) both' }}
            onClick={e=>e.stopPropagation()}>
            <div className="afl" style={{ fontSize:'44px', marginBottom:'14px' }}>🕉</div>
            <div style={{ color:'#d4af37', fontSize:'22px', fontWeight:'800', marginBottom:'8px', textShadow:'0 2px 8px rgba(0,0,0,0.3)' }}>
              {lang==='english' ? 'Unlock Unlimited Guidance' : 'असीमित ज्ञान पाएं'}
            </div>
            <div style={{ color:'#94a3b8', fontSize:'14px', lineHeight:'1.65', marginBottom:'20px' }}>
              {lang==='english' ? "You've used your 3 free daily questions. Upgrade to continue your spiritual journey." : 'आपने आज के 3 मुफ्त प्रश्न पूछ लिए हैं। अपनी यात्रा जारी रखें।'}
            </div>
            <div style={{ textAlign:'left', marginBottom:'20px' }}>
              {PAYWALL_FEATS[lang].map((f,i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'7px 0', fontSize:'14px', color:'#e2e8f0', borderBottom: i<3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>{f}</div>
              ))}
            </div>
            <div style={{ color:'#d4af37', fontSize:'32px', fontWeight:'800', fontFamily:'monospace', marginBottom:'4px' }}>₹99</div>
            <div style={{ color:'#64748b', fontSize:'12px', marginBottom:'22px' }}>
              {lang==='english' ? 'per month · cancel anytime' : 'प्रति माह · कभी भी रद्द करें'}
            </div>
            <button className="btn-gold" onClick={()=>{ setIsPaid(true); localStorage.setItem('ka_paid','true'); setPaywall(false) }}
              style={{ width:'100%', padding:'14px', fontSize:'15px', borderRadius:'11px', marginBottom:'10px', animation:'pulseGold 2s ease-in-out infinite' }}>
              {lang==='english' ? '🙏 Unlock Now (Demo)' : '🙏 अभी अनलॉक करें (Demo)'}
            </button>
            <button onClick={()=>setPaywall(false)}
              style={{ background:'transparent', color:'#64748b', border:'1px solid #334155', borderRadius:'10px', padding:'11px 24px', fontSize:'13px', width:'100%', cursor:'pointer', transition:'all 200ms' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(212,175,55,0.4)';e.currentTarget.style.color='#d4af37'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#334155';e.currentTarget.style.color='#64748b'}}>
              {lang==='english' ? 'Maybe later' : 'बाद में'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
