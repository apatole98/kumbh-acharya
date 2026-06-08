import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from './components/AuthContext.jsx'

const FREE_CHAT_LIMIT = 3

const LANGUAGES = [
  { code: 'hindi',    label: 'हिंदी',    flag: '🇮🇳' },
  { code: 'english',  label: 'English',  flag: '🇬🇧' },
  { code: 'marathi',  label: 'मराठी',    flag: '🇮🇳' },
  { code: 'gujarati', label: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'bengali',  label: 'বাংলা',    flag: '🇮🇳' },
]

const SYSTEM_PROMPTS = {
  hindi:   'आप कुंभ आचार्य हैं - कुंभ मेला के एक सम्मानित आध्यात्मिक गुरु। आपका ज्ञान वैदिक मंत्र, कुंभ परंपरा, और तीर्थयात्रियों की सहायता में है। सम्मानपूर्वक, ज्ञानवान गुरु की तरह बोलें। संक्षिप्त और सार्थक उत्तर दें।',
  english: 'You are Kumbh Acharya - a revered spiritual guide at the Kumbh Mela. Your knowledge spans Vedic mantras, Kumbh traditions, bathing rituals (Shahi Snan), and pilgrim guidance. Speak respectfully as a learned guru. Keep answers concise and meaningful.',
  marathi: 'तुम कुंभ आचार्य आहात - कुंभ मेळ्यातील आदरणीय आध्यात्मिक गुरू. वैदिक मंत्र, कुंभ परंपरा, शाही स्नान आणि तीर्थयात्रींसाठी मार्गदर्शन यांचे गहन ज्ञान आहे. मराठीत आदरपूर्वक उत्तर द्या.',
  gujarati: 'તમે કુંભ આચાર્ય છો - કુંભ મેળાનો એક માનનીય આધ્યાત્મિક માર્ગદર્શક. વૈદિક મંત્ર, કુંભ પરંપરા અને શ્રદ્ધાળુઓ માટે માર્દર્શનનું ગહન જ્ઞાન છે. ગુજરાતીમાં આદરપૂર્વક જવાબ આપો.',
  bengali: 'আপনি কুম্ভ আচার্য - কুম্ভ মেলার একজন সম্মানিত আধ্যাত্মিক গাইড। বৈদিক মন্ত্র, কুম্ভ ঐতিহ্য এবং তীর্থযাত্রীদের পথনির্দেশনায় আপনার গভীর জ্ঞান রয়েছে। বাংলায় শ্রদ্ধার সাথে উত্তর দিন।',
}

const WELCOME_MESSAGES = {
  hindi:   '🙏 जय गंगा माँ! मैं कुंभ आचार्य हूँ। कुंभ मेला, वैदिक मंत्र, या तीर्थयात्रा के बारे में कोई भी प्रश्न पूछें।',
  english: '🙏 Jai Ganga Maa! I am Kumbh Acharya, your spiritual guide. Ask me anything about the Kumbh Mela, Vedic mantras, or your pilgrimage journey.',
  marathi: '🙏 जय गंगा माँ! मी कुंभ आचार्य आहे. कुंभ मेळा, वैदिक मंत्र किंवा तीर्थयात्रेबद्दल कोणताही प्रश्न विचारा.',
  gujarati: '🙏 જय ગંગા માઁ! હું કુંભ આચાર્ય છું. કુંભ મેળો, વૈદિક મંત્રો અથવા તીર્થયાત્રા વિશે કોઈ પ્રશ્ન પૂછો.',
  bengali: '🙏 জয় গঙ্গা মাঁ! আমি কুম্ভ আচার্য। কুম্ভ মেলা, বৈদিক মন্ত্র বা তীর্থযাত্রা সম্পর্কে যেকোনো প্রশ্ন করুন।',
}

const PLACEHOLDER_TEXT = {
  hindi: 'अपना प्रश्न यहाँ लिखें...', english: 'Type your question here...',
  marathi: 'आपला प्रश्न येथे लिहा...', gujarati: 'તમારો પ્રશ્ન અહીં લખો...', bengali: 'আপনার প্রশ্ন এখানে লিখুন...',
}

export default function KumbhAcharya({ onProfile, onFeatures }) {
  const { user, logout } = useAuth()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState('hindi')
  const [loading, setLoading] = useState(false)
  const [chatsUsed, setChatsUsed] = useState(() => {
    const stored = localStorage.getItem('ka_chats_used')
    const storedDate = localStorage.getItem('ka_chats_date')
    const today = new Date().toDateString()
    if (storedDate !== today) {
      localStorage.setItem('ka_chats_date', today)
      localStorage.setItem('ka_chats_used', '0')
      return 0
    }
    return parseInt(stored || '0', 10)
  })
  const [showPaywall, setShowPaywall] = useState(false)
  const [isPaid, setIsPaid] = useState(() => user?.isPro || localStorage.getItem('ka_paid') === 'true')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const msgIdRef = useRef(0)
  const nextId = () => ++msgIdRef.current

  useEffect(() => {
    setMessages([{ id: nextId(), role: 'assistant', text: WELCOME_MESSAGES[language] }])
  }, [language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const chatsRemaining = isPaid ? Infinity : Math.max(0, FREE_CHAT_LIMIT - chatsUsed)

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return
    if (!isPaid && chatsUsed >= FREE_CHAT_LIMIT) { setShowPaywall(true); return }

    setMessages(prev => [...prev, { id: nextId(), role: 'user', text }])
    setInput('')
    setLoading(true)

    const newUsed = chatsUsed + 1
    setChatsUsed(newUsed)
    localStorage.setItem('ka_chats_used', String(newUsed))

    try {
      const res = await fetch('/.netlify/functions/claude-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language, systemPrompt: SYSTEM_PROMPTS[language], userId: user?.userId || 'guest' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'API error')
      setMessages(prev => [...prev, { id: nextId(), role: 'assistant', text: data.response }])
    } catch {
      setMessages(prev => [...prev, {
        id: nextId(), role: 'assistant',
        text: language === 'english' ? '🙏 Sorry, there was a connection problem. Please try again.' : '🙏 क्षमा करें, कनेक्शन में समस्या है। कृपया पुनः प्रयास करें।',
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const handleTextareaInput = (e) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  const handleDemoPayment = () => {
    setIsPaid(true)
    localStorage.setItem('ka_paid', 'true')
    setShowPaywall(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f8f6f1', position: 'relative', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>🕉</span>
          <div>
            <div style={{ color: '#8b5cf6', fontSize: '15px', fontWeight: '700' }}>कुंभ आचार्य</div>
            <div style={{ color: '#9ca3af', fontSize: '11px' }}>Spiritual AI Guide</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {onFeatures && (
            <button onClick={onFeatures} style={{ backgroundColor: 'transparent', color: '#8b5cf6', border: '1px solid #8b5cf6', borderRadius: '7px', padding: '5px 10px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
              Features
            </button>
          )}
          <select style={{ backgroundColor: '#f9fafb', color: '#1f2937', border: '1px solid #e5e7eb', borderRadius: '7px', padding: '5px 8px', fontSize: '12px', outline: 'none', cursor: 'pointer' }}
            value={language} onChange={e => setLanguage(e.target.value)}>
            {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
          </select>

          {/* User avatar menu */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowUserMenu(m => !m)} style={{
              backgroundColor: '#8b5cf6', color: '#fff', border: 'none',
              borderRadius: '50%', width: '32px', height: '32px',
              fontSize: '12px', fontWeight: '700', cursor: 'pointer',
            }}>
              {user?.name?.charAt(0).toUpperCase() || '?'}
            </button>
            {showUserMenu && (
              <div style={{ position: 'absolute', right: 0, top: '38px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '8px', minWidth: '160px', zIndex: 50, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <div style={{ color: '#1f2937', fontSize: '13px', fontWeight: '600', padding: '4px 8px', marginBottom: '4px', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>
                  {user?.name}
                  <span style={{ backgroundColor: isPaid ? '#8b5cf6' : '#f3f4f6', color: isPaid ? '#fff' : '#6b7280', borderRadius: '6px', padding: '1px 6px', fontSize: '10px', fontWeight: '700', marginLeft: '6px' }}>
                    {isPaid ? 'PRO' : 'FREE'}
                  </span>
                </div>
                <button onClick={() => { setShowUserMenu(false); onProfile && onProfile() }} style={{ display: 'block', width: '100%', textAlign: 'left', backgroundColor: 'transparent', color: '#1f2937', border: 'none', padding: '7px 8px', fontSize: '13px', cursor: 'pointer', borderRadius: '6px' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  👤 Profile
                </button>
                <button onClick={logout} style={{ display: 'block', width: '100%', textAlign: 'left', backgroundColor: 'transparent', color: '#dc2626', border: 'none', padding: '7px 8px', fontSize: '13px', cursor: 'pointer', borderRadius: '6px' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef2f2'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Free counter */}
      {!isPaid && (
        <div style={{ backgroundColor: '#f3f0ff', borderBottom: '1px solid #ede9fe', padding: '6px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ color: '#6b7280', fontSize: '12px' }}>
            {language === 'english' ? 'Free chats today' : 'आज के मुफ्त प्रश्न'}
          </span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ backgroundColor: chatsRemaining > 0 ? '#8b5cf6' : '#dc2626', color: '#fff', borderRadius: '10px', padding: '2px 8px', fontSize: '11px', fontWeight: '700' }}>
              {chatsRemaining}/{FREE_CHAT_LIMIT} {language === 'english' ? 'left' : 'शेष'}
            </span>
            {chatsRemaining === 0 && (
              <button onClick={() => setShowPaywall(true)} style={{ backgroundColor: '#d4af37', color: '#1f2937', border: 'none', borderRadius: '6px', padding: '2px 8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>
                Upgrade ⭐
              </button>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', animation: 'fadeIn 0.2s ease' }}>
            <div style={{ fontSize: '10px', color: msg.role === 'user' ? '#8b5cf6' : '#9ca3af', marginBottom: '3px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
              {msg.role === 'user' ? (language === 'english' ? 'You' : 'आप') : 'कुंभ आचार्य'}
            </div>
            <div style={{
              backgroundColor: msg.role === 'user' ? '#ede9fe' : '#fff',
              color: '#1f2937',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              padding: '10px 14px', fontSize: '14px', lineHeight: '1.6',
              border: msg.role === 'user' ? '1px solid #ddd6fe' : '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              wordBreak: 'break-word',
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
            <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '3px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>कुंभ आचार्य</div>
            <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '18px 18px 18px 4px', padding: '12px 16px', display: 'flex', gap: '5px', alignItems: 'center' }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#8b5cf6', animation: 'pulse-dot 1.2s ease-in-out infinite', animationDelay: `${d}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'flex-end', flexShrink: 0 }}>
        <textarea
          ref={textareaRef}
          style={{ flex: 1, backgroundColor: '#f9fafb', color: '#1f2937', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '10px 14px', fontSize: '14px', outline: 'none', resize: 'none', minHeight: '44px', maxHeight: '120px', lineHeight: '1.5' }}
          value={input} onChange={handleTextareaInput} onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDER_TEXT[language]} rows={1} disabled={loading}
          onFocus={e => e.target.style.borderColor = '#8b5cf6'}
          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
        />
        <button
          style={{ backgroundColor: loading || !input.trim() ? '#e5e7eb' : '#8b5cf6', color: loading || !input.trim() ? '#9ca3af' : '#fff', border: 'none', borderRadius: '12px', width: '44px', height: '44px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }}
          onClick={handleSend} disabled={loading || !input.trim()}>
          🙏
        </button>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}
          onClick={() => setShowPaywall(false)}>
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '28px 24px', maxWidth: '360px', width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '44px', marginBottom: '12px' }}>🕉</div>
            <div style={{ color: '#1f2937', fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>
              {language === 'english' ? 'Unlock Unlimited Guidance' : 'असीमित ज्ञान पाएं'}
            </div>
            <div style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
              {language === 'english' ? "You've used your 3 free daily questions. Upgrade to continue." : 'आपने आज के 3 मुफ्त प्रश्न पूछ लिए हैं।'}
            </div>
            {[
              language === 'english' ? '✨ Unlimited daily questions' : '✨ असीमित दैनिक प्रश्न',
              language === 'english' ? '📿 All 5 languages' : '📿 सभी 5 भाषाएं',
              language === 'english' ? '🔱 Priority responses' : '🔱 प्राथमिकता उत्तर',
              language === 'english' ? '🌺 Advanced guidance' : '🌺 उन्नत मार्गदर्शन',
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 0', fontSize: '13px', color: '#1f2937', textAlign: 'left' }}>{f}</div>
            ))}
            <div style={{ color: '#8b5cf6', fontSize: '30px', fontWeight: '800', margin: '16px 0 4px' }}>₹99</div>
            <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '18px' }}>
              {language === 'english' ? 'per month · cancel anytime' : 'प्रति माह · कभी भी रद्द करें'}
            </div>
            <button style={{ backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px 24px', fontSize: '15px', fontWeight: '700', width: '100%', marginBottom: '10px', cursor: 'pointer' }}
              onClick={handleDemoPayment}>
              {language === 'english' ? '🙏 Unlock Now (Demo)' : '🙏 अभी अनलॉक करें (Demo)'}
            </button>
            <button style={{ backgroundColor: 'transparent', color: '#9ca3af', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '10px 24px', fontSize: '13px', width: '100%', cursor: 'pointer' }}
              onClick={() => setShowPaywall(false)}>
              {language === 'english' ? 'Maybe later' : 'बाद में'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
