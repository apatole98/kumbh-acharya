import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useAuth } from './components/AuthContext.jsx'
import { useGamification } from './context/GamificationContext.jsx'
import BottomNav from './components/BottomNav.jsx'

const FREE_CHAT_LIMIT = 3

const LANGS = [
  { code: 'hindi',    label: 'हिंदी',    flag: '🇮🇳' },
  { code: 'english',  label: 'English',  flag: '🇬🇧' },
  { code: 'marathi',  label: 'मराठी',    flag: '🇮🇳' },
  { code: 'gujarati', label: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'bengali',  label: 'বাংলা',    flag: '🇮🇳' },
]

const SYS = {
  hindi: `आप कुंभ आचार्य हैं — प्रयागराज महाकुंभ 2025 के सम्मानित वैदिक विद्वान और आध्यात्मिक गुरु।

आपको निम्न विषयों का गहन ज्ञान है:
- महाकुंभ 2025, प्रयागराज: 13 जनवरी – 26 फरवरी 2025
- त्रिवेणी संगम: गंगा, यमुना और अदृश्य सरस्वती का पवित्र मिलन
- शाही स्नान तिथियां: मकर संक्रांति (14 जन), मौनी अमावस्या (29 जन — सर्वाधिक पुण्यदायी), बसंत पंचमी (3 फर), माघी पूर्णिमा (12 फर), महाशिवरात्रि (26 फर)
- पवित्र मंत्र: गंगा मंत्र (ॐ नमो गंगायै विश्वरूपिण्यै नारायण्यै नमो नमः), पंचाक्षर (ॐ नमः शिवाय), महामृत्युंजय (ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्...), गायत्री (ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं...), हनुमान (ॐ हनुमते नमः), दुर्गा (ॐ दुं दुर्गायै नमः), लक्ष्मी (ॐ श्रीं महालक्ष्म्यै नमः)
- अनुष्ठान: स्नान, तर्पण, दान, कल्पवास, पिंड दान, संध्या वंदनम
- 13 अखाड़े: निरंजनी, जूना, महानिर्वाणी, आवाहन, अटल, अग्नि, आनंद, निर्मोही, दिगम्बर, निर्वाणी, पंचाग्नि, वैष्णव आदि
- तीर्थयात्री सुझाव: गंगाजल पात्र साथ रखें, केसरी/पीले वस्त्र पहनें, मेले में मांसाहार न करें, साधुओं को दान करें, अक्षयवट, हनुमान मंदिर और मनकामेश्वर के दर्शन करें

एक ज्ञानी, करुणामय गुरु के रूप में उत्तर दें। संक्षिप्त, आध्यात्मिक रूप से समृद्ध उत्तर दें।`,

  english: `You are Kumbh Acharya — a deeply revered Vedic scholar and spiritual guide at the Maha Kumbh Mela 2025 in Prayagraj.

Your deep knowledge covers:
- Maha Kumbh Mela 2025, Prayagraj: 13 January – 26 February 2025
- Triveni Sangam: sacred confluence of Ganga, Yamuna, and the invisible Saraswati river
- Shahi Snan (Royal Bath) dates: Makar Sankranti (14 Jan), Mauni Amavasya (29 Jan — most auspicious, crores bathe in silence), Basant Panchami (3 Feb), Maghi Purnima (12 Feb), Maha Shivratri (26 Feb)
- Sacred mantras: Ganga (ॐ नमो गंगायै विश्वरूपिण्यै नारायण्यै नमो नमः), Panchakshara Shiva (ॐ नमः शिवाय), Mahamrityunjaya (ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात्), Gayatri (ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्), Hanuman (ॐ हनुमते नमः), Durga (ॐ दुं दुर्गायै नमः), Lakshmi (ॐ श्रीं महालक्ष्म्यै नमः)
- Rituals: Snan (holy bathing), Tarpan (ancestor water offering), Daan (charity), Kalpavas (month-long spiritual discipline at the mela), Pind Daan (ancestral rites), Sandhya Vandanam (dawn/dusk prayers)
- 13 Akharas: Niranjani, Juna, Mahanirvani, Avahan, Atal, Agni, Anand, Nirmohi, Digambar, Nirvani, Panchagni, Vaishnava and others
- Pilgrim tips: Carry Gangajal pot, wear saffron/yellow, avoid non-veg during mela, donate to sadhus, visit Akshayavat (immortal banyan tree), Hanuman temple at Sangam, Mankameshwar temple

Speak as a wise, compassionate guru. Give meaningful, accurate, spiritually enriching answers.`,

  marathi: `तुम्ही कुंभ आचार्य आहात — प्रयागराज महाकुंभ 2025 मधील आदरणीय वैदिक विद्वान आणि आध्यात्मिक गुरू.

तुमच्याकडे खालील विषयांचे सखोल ज्ञान आहे:
- महाकुंभ मेळा 2025, प्रयागराज: 13 जानेवारी – 26 फेब्रुवारी 2025
- त्रिवेणी संगम: गंगा, यमुना आणि अदृश्य सरस्वती यांचा पवित्र संगम
- शाही स्नान तिथी: मकर संक्रांती (14 जाने), मौनी अमावस्या (29 जाने — सर्वात पुण्यदायी), बसंत पंचमी (3 फेब), माघी पूर्णिमा (12 फेब), महाशिवरात्री (26 फेब)
- पवित्र मंत्र: गंगा मंत्र, पंचाक्षरी (ॐ नमः शिवाय), महामृत्युंजय, गायत्री, हनुमान मंत्र
- विधी: स्नान, तर्पण, दान, कल्पवास, पिंड दान, संध्यावंदन
- तीर्थयात्रेसाठी सुचना: गंगाजल घेऊन चला, केशरी/पिवळे कपडे घाला, मांसाहार टाळा, साधूंना दान करा, अक्षयवट, हनुमान मंदिर दर्शन करा

ज्ञानी आणि करुणामय गुरू म्हणून मराठीत उत्तर द्या.`,

  gujarati: `તમે કુંભ આચાર્ય છો — પ્રયાગરાજ મહાકુંભ 2025ના આદરણીય વૈદિક વિદ્વાન અને આધ્યાત્મિક માર્ગદર્શક.

તમારી પાસે ઊંડું જ્ઞાન છે:
- મહાકુંભ 2025, પ્રયાગરાજ: 13 જાન્યુઆરી – 26 ફેબ્રુઆરી 2025
- ત્રિવેણી સંગમ: ગંગા, યમુના અને અદૃશ્ય સરસ્વતીનો પવિત્ર સ્નગ
- શાહી સ્નાન: મકર સંક્રાંતિ (14 જાન), મૌની અમાવસ્યા (29 જાન), બસંત પંચમી (3 ફેબ), માઘી પૂર્ણિમા (12 ફેબ), મહાશિવરાત્રી (26 ફેબ)
- પવિત્ર મંત્ર: ગાયત્રી, ૐ નમઃ શિવાય, મહામૃત્યુંજય, ગંગા મંત્ર, હનુમાન મંત્ર
- વિધિ: સ્નાન, તર્પણ, દાન, કલ્પવાસ, પિંડ દાન

ગુજરાતીમાં આદર સાથે અને સ્પષ્ટ ઉત્તર આપો.`,

  bengali: `আপনি কুম্ভ আচার্য — প্রয়াগরাজ মহাকুম্ভ 2025-এর সম্মানিত বৈদিক পণ্ডিত ও আধ্যাত্মিক গাইড।

আপনার গভীর জ্ঞান রয়েছে:
- মহাকুম্ভ 2025, প্রয়াগরাজ: ১৩ জানুয়ারি – ২৬ ফেব্রুয়ারি 2025
- ত্রিবেণী সঙ্গম: গঙ্গা, যমুনা ও অদৃশ্য সরস্বতীর পবিত্র মিলন
- শাহী স্নানের তারিখ: মকর সংক্রান্তি (১৪ জান), মৌনী অমাবস্যা (২৯ জান — সবচেয়ে পুণ্যদায়ী), বসন্ত পঞ্চমী (৩ ফেব), মাঘী পূর্ণিমা (১২ ফেব), মহাশিবরাত্রি (২৬ ফেব)
- পবিত্র মন্ত্র: গায়ত্রী, ওঁ নমঃ শিবায়, মহামৃত্যুঞ্জয়, গঙ্গা মন্ত্র, হনুমান মন্ত্র
- আচার: স্নান, তর্পণ, দান, কল্পবাস, পিণ্ড দান

বাংলায় শ্রদ্ধার সাথে এবং অর্থবহ উত্তর দিন।`,
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

const CHIPS = {
  hindi:    ['🕉 आज का शुभ मंत्र', '🌊 शाही स्नान कब है?', '📿 गायत्री मंत्र बताएं', '🗺 संगम कैसे पहुंचें?', '🔱 संगम का महत्व'],
  english:  ['🕉 Today\'s sacred mantra', '🌊 When is Shahi Snan?', '📿 Teach me Gayatri Mantra', '🗺 How to reach Sangam?', '🔱 Significance of Triveni'],
  marathi:  ['🕉 आजचा शुभ मंत्र', '🌊 शाही स्नान कधी आहे?', '📿 गायत्री मंत्र सांगा', '🗺 संगमला कसे जायचे?', '🔱 कुंभाचे महत्त्व'],
  gujarati: ['🕉 આજનો શુભ મંત્ર', '🌊 શાહી સ્નાન ક્યારે?', '📿 ગાયત્રી મંત્ર શીખવો', '🗺 સંગમ કેવી રીતે જવું?', '🔱 ત્રિવેણીનું મહત્વ'],
  bengali:  ['🕉 আজকের শুভ মন্ত্র', '🌊 শাহী স্নান কখন?', '📿 গায়ত্রী মন্ত্র শেখান', '🗺 সঙ্গমে কীভাবে যাবেন?', '🔱 ত্রিবেণীর মাহাত্ম্য'],
}

let _id = 0
const uid = () => ++_id

export default function KumbhAcharya({ onNav }) {
  const { user, logout }           = useAuth()
  const { trackChat, gami }        = useGamification() || {}
  const [msgs, setMsgs]            = useState([])
  const [input, setInput]          = useState('')
  const [lang, setLang]            = useState('hindi')
  const [loading, setLoading]      = useState(false)
  const [showMenu, setShowMenu]    = useState(false)
  const [showPaywall, setPaywall]  = useState(false)
  const [showLangs, setShowLangs]  = useState(false)
  const [isPaid, setIsPaid]        = useState(() => user?.isPro || localStorage.getItem('ka_paid') === 'true')
  const [chatsUsed, setChatsUsed]  = useState(() => {
    const d = localStorage.getItem('ka_chats_date')
    const today = new Date().toDateString()
    if (d !== today) { localStorage.setItem('ka_chats_date', today); localStorage.setItem('ka_chats_used', '0'); return 0 }
    return parseInt(localStorage.getItem('ka_chats_used') || '0', 10)
  })
  const endRef = useRef(null)
  const taRef  = useRef(null)

  useEffect(() => { setMsgs([{ id: uid(), role: 'bot', text: WELCOME[lang] }]) }, [lang])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, loading])

  useEffect(() => {
    const h = () => { setShowMenu(false); setShowLangs(false) }
    document.addEventListener('click', h)
    return () => document.removeEventListener('click', h)
  }, [])

  const remaining = isPaid ? Infinity : Math.max(0, FREE_CHAT_LIMIT - chatsUsed)
  const streak    = gami?.streak?.current || 0
  const points    = gami?.points?.total   || 0
  const initials  = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
  const activeLang = LANGS.find(l => l.code === lang)

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return
    if (!isPaid && chatsUsed >= FREE_CHAT_LIMIT) { setPaywall(true); return }

    setMsgs(p => [...p, { id: uid(), role: 'user', text }])
    setInput('')
    if (taRef.current) taRef.current.style.height = 'auto'
    setLoading(true)

    const newUsed = chatsUsed + 1
    setChatsUsed(newUsed)
    localStorage.setItem('ka_chats_used', String(newUsed))
    trackChat?.(lang, text)

    try {
      const res  = await fetch('/api/claude-api', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: lang, systemPrompt: SYS[lang], userId: user?.userId || 'guest' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMsgs(p => [...p, { id: uid(), role: 'bot', text: data.response }])

    } catch (err) {
      setMsgs(p => [...p, { id: uid(), role: 'bot', text: `⚠️ Error: ${err.message}` }])
    } finally { setLoading(false) }
  }, [input, loading, isPaid, chatsUsed, lang, user, trackChat])

  const sendChip = useCallback((chip) => {
    const text = chip.replace(/^[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\s]+/u, '').trim()
    setInput(text)
    setTimeout(() => {
      setInput('')
      if (!isPaid && chatsUsed >= FREE_CHAT_LIMIT) { setPaywall(true); return }
      setMsgs(p => [...p, { id: uid(), role: 'user', text }])
      setLoading(true)
      const newUsed = chatsUsed + 1
      setChatsUsed(newUsed)
      localStorage.setItem('ka_chats_used', String(newUsed))
      trackChat?.(lang, text)
      fetch('/api/claude-api', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: lang, systemPrompt: SYS[lang], userId: user?.userId || 'guest' }),
      }).then(r => r.json()).then(data => {
        setMsgs(p => [...p, { id: uid(), role: 'bot', text: data.response || '' }])
      }).catch(() => {
        setMsgs(p => [...p, { id: uid(), role: 'bot', text: '🙏 क्षमा करें, कनेक्शन में समस्या है।' }])
      }).finally(() => setLoading(false))
    }, 0)
  }, [isPaid, chatsUsed, lang, user, trackChat])

  const onKey   = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }
  const onInput = (e) => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', maxWidth: '640px', margin: '0 auto', background: '#0f1419', position: 'relative' }}>

      {/* ═══ HEADER ═══ */}
      <header style={{ background: '#1a1f2e', borderBottom: '1px solid #334155', padding: '0 16px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.3)', zIndex: 10 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px', lineHeight: 1 }}>🕉</span>
          <div>
            <div style={{ color: '#d4af37', fontSize: '15px', fontWeight: '800', letterSpacing: '-0.3px' }}>कुंभ आचार्य</div>
            {streak > 0 && <div style={{ color: '#ef4444', fontSize: '10px', fontWeight: '700' }}>🔥 {streak}-day streak</div>}
          </div>
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Points pill */}
          {points > 0 && (
            <div onClick={() => onNav?.('gamification')} style={{ backgroundColor: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '20px', padding: '4px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '11px' }}>💎</span>
              <span style={{ color: '#d4af37', fontSize: '11px', fontWeight: '700' }}>{points}</span>
            </div>
          )}

          {/* Language picker */}
          <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => { setShowLangs(v => !v); setShowMenu(false) }}
              style={{ background: 'transparent', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '8px', padding: '5px 8px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 200ms' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#475569'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#334155'}>
              <span>{activeLang.flag}</span><span style={{ fontSize: '11px', display: 'none' }}>{activeLang.label}</span><span style={{ color: '#64748b', fontSize: '9px' }}>▾</span>
            </button>
            {showLangs && (
              <div className="ai" style={{ position: 'absolute', right: 0, top: '38px', background: '#1a1f2e', border: '1px solid #334155', borderRadius: '12px', padding: '8px', minWidth: '150px', zIndex: 50, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                {LANGS.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code); setShowLangs(false) }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', background: l.code === lang ? '#252d3d' : 'transparent', color: l.code === lang ? '#d4af37' : '#cbd5e1', border: 'none', padding: '9px 12px', fontSize: '13px', borderRadius: '8px', cursor: 'pointer', transition: 'all 150ms' }}
                    onMouseEnter={e => { if (l.code !== lang) e.currentTarget.style.background = '#252d3d' }}
                    onMouseLeave={e => { if (l.code !== lang) e.currentTarget.style.background = 'transparent' }}>
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User avatar */}
          <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => { setShowMenu(v => !v); setShowLangs(false) }}
              style={{ background: isPaid ? 'linear-gradient(135deg,#d4af37,#b8962c)' : '#252d3d', color: isPaid ? '#0f1419' : '#cbd5e1', border: 'none', borderRadius: '50%', width: '34px', height: '34px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 200ms', boxShadow: isPaid ? '0 0 12px rgba(212,175,55,0.4)' : 'none' }}>
              {initials}
            </button>
            {showMenu && (
              <div className="ai" style={{ position: 'absolute', right: 0, top: '42px', background: '#1a1f2e', border: '1px solid #334155', borderRadius: '14px', padding: '12px', minWidth: '200px', zIndex: 50, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                <div style={{ padding: '4px 4px 12px', marginBottom: '8px', borderBottom: '1px solid #334155' }}>
                  <div style={{ color: '#fff', fontSize: '14px', fontWeight: '700' }}>{user?.name}</div>
                  <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>{user?.email}</div>
                  <span style={{ display: 'inline-block', marginTop: '6px', background: isPaid ? '#d4af37' : '#252d3d', color: isPaid ? '#0f1419' : '#64748b', borderRadius: '6px', padding: '2px 8px', fontSize: '10px', fontWeight: '700' }}>
                    {isPaid ? '⭐ PRO' : '🆓 FREE'}
                  </span>
                </div>
                {[
                  { label: '👤 My Profile',    action: () => { setShowMenu(false); onNav?.('profile') } },
                  { label: '⚡ Quests',         action: () => { setShowMenu(false); onNav?.('gamification') } },
                  { label: '👥 Community',     action: () => { setShowMenu(false); onNav?.('community') } },
                  { label: '🏆 Leaderboard',   action: () => { setShowMenu(false); onNav?.('leaderboard') } },
                  { label: '💎 Plans',          action: () => { setShowMenu(false); onNav?.('features') } },
                ].map(item => (
                  <button key={item.label} onClick={item.action}
                    style={{ display: 'block', width: '100%', textAlign: 'left', background: 'transparent', color: '#cbd5e1', border: 'none', padding: '9px 10px', fontSize: '13px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#252d3d'; e.currentTarget.style.color = '#d4af37' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#cbd5e1' }}>
                    {item.label}
                  </button>
                ))}
                <div style={{ height: '1px', background: '#334155', margin: '8px 0' }} />
                <button onClick={logout}
                  style={{ display: 'block', width: '100%', textAlign: 'left', background: 'transparent', color: '#ef4444', border: 'none', padding: '9px 10px', fontSize: '13px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ═══ FREE COUNTER ═══ */}
      {!isPaid && (
        <div style={{ background: 'linear-gradient(90deg,#1a1f2e,#252d3d)', borderBottom: '1px solid #334155', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>{lang === 'english' ? 'Free chats today' : 'आज के मुफ्त प्रश्न'}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: remaining > 0 ? 'rgba(212,175,55,0.15)' : 'rgba(239,68,68,0.15)', color: remaining > 0 ? '#d4af37' : '#ef4444', border: `1px solid ${remaining > 0 ? 'rgba(212,175,55,0.4)' : 'rgba(239,68,68,0.4)'}`, borderRadius: '8px', padding: '3px 10px', fontSize: '12px', fontWeight: '700' }}>
              {remaining}/{FREE_CHAT_LIMIT} {lang === 'english' ? 'left' : 'शेष'}
            </span>
            {remaining === 0 && (
              <button onClick={() => setPaywall(true)} className="btn-gold" style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '7px' }}>Upgrade ⭐</button>
            )}
          </div>
        </div>
      )}

      {/* ═══ MESSAGES ═══ */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {msgs.map((m, i) => (
          <div key={m.id} className="au" style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '82%', animationDelay: `${i * 0.04}s` }}>
            <div style={{ fontSize: '10px', color: m.role === 'user' ? '#a78bfa' : '#64748b', marginBottom: '4px', fontWeight: '600', letterSpacing: '0.6px', textTransform: 'uppercase', textAlign: m.role === 'user' ? 'right' : 'left' }}>
              {m.role === 'user' ? (lang === 'english' ? 'You' : 'आप') : 'कुंभ आचार्य'}
            </div>
            <div style={{ background: m.role === 'user' ? 'linear-gradient(135deg,rgba(139,92,246,0.45),rgba(212,175,55,0.35))' : '#252d3d', color: '#e2e8f0', border: m.role === 'user' ? '1px solid rgba(212,175,55,0.45)' : '1px solid #334155', borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', padding: '12px 16px', fontSize: '15px', lineHeight: '1.6', boxShadow: m.role === 'user' ? '0 4px 16px rgba(139,92,246,0.2)' : '0 2px 8px rgba(0,0,0,0.2)', wordBreak: 'break-word' }}>
              {m.text}
            </div>
          </div>
        ))}

        {/* Suggestion chips — show only on first welcome message */}
        {msgs.length === 1 && !loading && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '100%' }}>
            <div style={{ color: '#475569', fontSize: '10px', fontWeight: '600', letterSpacing: '0.8px', marginBottom: '8px' }}>
              {lang === 'english' ? 'QUICK QUESTIONS' : 'त्वरित प्रश्न'}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {CHIPS[lang].map((chip, i) => (
                <button key={i} onClick={() => sendChip(chip)}
                  style={{ backgroundColor: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '20px', padding: '7px 13px', color: '#d4af37', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 200ms', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.18)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.08)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)' }}>
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '82%' }}>
            <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px', fontWeight: '600', letterSpacing: '0.6px', textTransform: 'uppercase' }}>कुंभ आचार्य</div>
            <div style={{ background: '#252d3d', border: '1px solid #334155', borderRadius: '18px 18px 18px 4px', padding: '14px 18px', display: 'flex', gap: '6px', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              {[0, 0.22, 0.44].map((d, i) => (
                <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d4af37', animation: `pulseDot 1.2s ease-in-out infinite`, animationDelay: `${d}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* ═══ INPUT ═══ */}
      <div style={{ background: '#1a1f2e', borderTop: '1px solid #334155', padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'flex-end', flexShrink: 0 }}>
        <textarea ref={taRef} className="input-field"
          style={{ flex: 1, padding: '11px 14px', resize: 'none', minHeight: '46px', maxHeight: '120px', lineHeight: '1.5' }}
          value={input} onChange={onInput} onKeyDown={onKey}
          placeholder={PLACEHOLDER[lang]} rows={1} disabled={loading}
        />
        <button className="btn-gold" onClick={send} disabled={loading || !input.trim()}
          style={{ width: '46px', height: '46px', flexShrink: 0, borderRadius: '12px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: loading || !input.trim() ? 0.45 : 1, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', transition: 'all 200ms' }}>
          🙏
        </button>
      </div>

      {/* ═══ BOTTOM NAV ═══ */}
      <BottomNav page="chat" onNav={onNav} />

      {/* ═══ PAYWALL MODAL ═══ */}
      {showPaywall && (
        <div className="ai" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}
          onClick={() => setPaywall(false)}>
          <div style={{ background: 'linear-gradient(160deg,#1a1f2e 0%,#252d3d 100%)', border: '2px solid rgba(212,175,55,0.35)', borderRadius: '20px', padding: '32px 28px', maxWidth: '380px', width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', animation: 'modalIn 300ms cubic-bezier(0.34,1.56,0.64,1) both' }}
            onClick={e => e.stopPropagation()}>
            <div className="afl" style={{ fontSize: '44px', marginBottom: '14px' }}>🕉</div>
            <div style={{ color: '#d4af37', fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>
              {lang === 'english' ? 'Unlock Unlimited Guidance' : 'असीमित ज्ञान पाएं'}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.65', marginBottom: '20px' }}>
              {lang === 'english' ? "You've used your 3 free daily questions. Upgrade to continue." : 'आपने आज के 3 मुफ्त प्रश्न पूछ लिए हैं। यात्रा जारी रखें।'}
            </div>
            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              {PAYWALL_FEATS[lang].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', fontSize: '14px', color: '#e2e8f0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>{f}</div>
              ))}
            </div>
            <div style={{ color: '#d4af37', fontSize: '32px', fontWeight: '800', fontFamily: 'monospace', marginBottom: '4px' }}>₹99</div>
            <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '22px' }}>{lang === 'english' ? 'per month · cancel anytime' : 'प्रति माह · कभी भी रद्द करें'}</div>
            <button className="btn-gold" onClick={() => { setIsPaid(true); localStorage.setItem('ka_paid', 'true'); setPaywall(false) }}
              style={{ width: '100%', padding: '14px', fontSize: '15px', borderRadius: '11px', marginBottom: '10px', animation: 'pulseGold 2s ease-in-out infinite' }}>
              {lang === 'english' ? '🙏 Unlock Now (Demo)' : '🙏 अभी अनलॉक करें (Demo)'}
            </button>
            <button onClick={() => setPaywall(false)}
              style={{ background: 'transparent', color: '#64748b', border: '1px solid #334155', borderRadius: '10px', padding: '11px 24px', fontSize: '13px', width: '100%', cursor: 'pointer', transition: 'all 200ms', fontFamily: 'inherit' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.color = '#d4af37' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.color = '#64748b' }}>
              {lang === 'english' ? 'Maybe later' : 'बाद में'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
