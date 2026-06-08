import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from './components/AuthContext.jsx'

const FREE_CHAT_LIMIT = 3

const LANGUAGES = [
  { code: 'hindi',   label: 'हिंदी',    flag: '🇮🇳' },
  { code: 'english', label: 'English',  flag: '🇬🇧' },
  { code: 'marathi', label: 'मराठी',    flag: '🇮🇳' },
  { code: 'gujarati',label: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'bengali', label: 'বাংলা',    flag: '🇮🇳' },
]

const SYSTEM_PROMPTS = {
  hindi:   'आप कुंभ आचार्य हैं - कुंभ मेला के एक सम्मानित आध्यात्मिक गुरु। आपका ज्ञान वैदिक मंत्र, कुंभ परंपरा, और तीर्थयात्रियों की सहायता में है। सम्मानपूर्वक, ज्ञानवान गुरु की तरह बोलें। संक्षिप्त और सार्थक उत्तर दें।',
  english: 'You are Kumbh Acharya - a revered spiritual guide at the Kumbh Mela. Your knowledge spans Vedic mantras, Kumbh traditions, bathing rituals (Shahi Snan), and pilgrim guidance. Speak respectfully as a learned guru. Keep answers concise and meaningful.',
  marathi: 'तुम कुंभ आचार्य आहात - कुंभ मेळ्यातील आदरणीय आध्यात्मिक गुरू. वैदिक मंत्र, कुंभ परंपरा, शाही स्नान आणि तीर्थयात्रींसाठी मार्गदर्शन यांचे गहन ज्ञान आहे. मराठीत आदरपूर्वक उत्तर द्या.',
  gujarati: 'તમે કુંભ આચાર્ય છો - કુંભ મેળાનો એક માનનીય આધ્યાત્મિક માર્ગદર્શક. વૈદિક મંત્ર, કુંભ પરંપરા અને શ્રદ્ધાળુઓ માટે માર્ગદર્શનનું ગહન જ્ઞાન છે. ગુજરાતીમાં આદરપૂર્વક જવાબ આપો.',
  bengali: 'আপনি কুম্ভ আচার্য - কুম্ভ মেলার একজন সম্মানিত আধ্যাত্মিক গাইড। বৈদিক মন্ত্র, কুম্ভ ঐতিহ্য এবং তীর্থযাত্রীদের পথনির্দেশনায় আপনার গভীর জ্ঞান রয়েছে। বাংলায় শ্রদ্ধার সাথে উত্তর দিন।',
}

const WELCOME_MESSAGES = {
  hindi:   '🙏 जय गंगा माँ! मैं कुंभ आचार्य हूँ। कुंभ मेला, वैदिक मंत्र, या तीर्थयात्रा के बारे में कोई भी प्रश्न पूछें।',
  english: '🙏 Jai Ganga Maa! I am Kumbh Acharya, your spiritual guide. Ask me anything about the Kumbh Mela, Vedic mantras, or your pilgrimage journey.',
  marathi: '🙏 जय गंगा माँ! मी कुंभ आचार्य आहे. कुंभ मेळा, वैदिक मंत्र किंवा तीर्थयात्रेबद्दल कोणताही प्रश्न विचारा.',
  gujarati: '🙏 જય ગંગા માઁ! હું કુંભ આચાર્ય છું. કુંભ મેળો, વૈદિક મંત્રો અથવા તીર્થયાત્રા વિશે કોઈ પ્રશ્ન પૂછો.',
  bengali: '🙏 জয় গঙ্গা মাঁ! আমি কুম্ভ আচার্য। কুম্ভ মেলা, বৈদিক মন্ত্র বা তীর্থযাত্রা সম্পর্কে যেকোনো প্রশ্ন করুন।',
}

const PLACEHOLDER_TEXT = {
  hindi:   'अपना प्रश्न यहाँ लिखें...',
  english: 'Type your question here...',
  marathi: 'आपला प्रश्न येथे लिहा...',
  gujarati: 'તમારો પ્રશ્ન અહીં લખો...',
  bengali: 'আপনার প্রশ্ন এখানে লিখুন...',
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
    maxWidth: '480px',
    margin: '0 auto',
    backgroundColor: '#1a1a4d',
    position: 'relative',
  },
  header: {
    backgroundColor: '#12124a',
    borderBottom: '2px solid #d4af37',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  headerIcon: {
    fontSize: '28px',
    lineHeight: 1,
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleMain: {
    color: '#d4af37',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  titleSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '11px',
    marginTop: '1px',
  },
  langSelect: {
    backgroundColor: '#1a1a4d',
    color: '#d4af37',
    border: '1px solid #d4af37',
    borderRadius: '6px',
    padding: '5px 8px',
    fontSize: '13px',
    outline: 'none',
    cursor: 'pointer',
  },
  freeCounter: {
    backgroundColor: '#12124a',
    borderBottom: '1px solid rgba(212,175,55,0.3)',
    padding: '6px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  counterText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '12px',
  },
  counterBadge: {
    backgroundColor: '#d4af37',
    color: '#1a1a4d',
    borderRadius: '10px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: '700',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  messageBubble: (isUser) => ({
    maxWidth: '85%',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    backgroundColor: isUser ? '#d4af37' : 'rgba(255,255,255,0.1)',
    color: isUser ? '#1a1a4d' : '#ffffff',
    borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
    padding: '10px 14px',
    fontSize: '14px',
    lineHeight: '1.5',
    border: isUser ? 'none' : '1px solid rgba(212,175,55,0.2)',
    wordBreak: 'break-word',
  }),
  senderLabel: (isUser) => ({
    fontSize: '10px',
    color: isUser ? 'rgba(26,26,77,0.7)' : 'rgba(212,175,55,0.8)',
    marginBottom: '3px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  }),
  loadingDots: {
    display: 'flex',
    gap: '5px',
    padding: '4px 0',
    alignItems: 'center',
  },
  dot: (delay) => ({
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#d4af37',
    animation: 'pulse 1.2s ease-in-out infinite',
    animationDelay: delay,
  }),
  inputArea: {
    backgroundColor: '#12124a',
    borderTop: '2px solid #d4af37',
    padding: '12px 16px',
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  textarea: {
    flex: 1,
    backgroundColor: '#1a1a4d',
    color: '#ffffff',
    border: '1px solid rgba(212,175,55,0.4)',
    borderRadius: '12px',
    padding: '10px 14px',
    fontSize: '14px',
    outline: 'none',
    resize: 'none',
    minHeight: '44px',
    maxHeight: '120px',
    lineHeight: '1.5',
    fontFamily: 'inherit',
  },
  sendBtn: (disabled) => ({
    backgroundColor: disabled ? 'rgba(212,175,55,0.3)' : '#d4af37',
    color: '#1a1a4d',
    border: 'none',
    borderRadius: '12px',
    width: '44px',
    height: '44px',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s',
  }),
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: 100,
  },
  modal: {
    backgroundColor: '#12124a',
    border: '2px solid #d4af37',
    borderRadius: '16px',
    padding: '28px 24px',
    maxWidth: '360px',
    width: '100%',
    textAlign: 'center',
  },
  modalIcon: {
    fontSize: '48px',
    marginBottom: '12px',
  },
  modalTitle: {
    color: '#d4af37',
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  modalText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  modalPrice: {
    color: '#d4af37',
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '4px',
  },
  modalPriceSub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '12px',
    marginBottom: '20px',
  },
  payBtn: {
    backgroundColor: '#d4af37',
    color: '#1a1a4d',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: '700',
    width: '100%',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  dismissBtn: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.5)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '10px',
    padding: '10px 24px',
    fontSize: '13px',
    width: '100%',
    cursor: 'pointer',
  },
  features: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  featureItem: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '13px',
    padding: '4px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
}

export default function KumbhAcharya({ onProfile }) {
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
    setMessages([{
      id: nextId(),
      role: 'assistant',
      text: WELCOME_MESSAGES[language],
    }])
  }, [language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const chatsRemaining = isPaid ? Infinity : Math.max(0, FREE_CHAT_LIMIT - chatsUsed)

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    if (!isPaid && chatsUsed >= FREE_CHAT_LIMIT) {
      setShowPaywall(true)
      return
    }

    const userMsg = { id: nextId(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const newChatsUsed = chatsUsed + 1
    setChatsUsed(newChatsUsed)
    localStorage.setItem('ka_chats_used', String(newChatsUsed))

    try {
      const res = await fetch('/.netlify/functions/claude-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language,
          systemPrompt: SYSTEM_PROMPTS[language],
          userId: 'guest',
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'API error')

      setMessages(prev => [...prev, {
        id: nextId(),
        role: 'assistant',
        text: data.response,
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        id: nextId(),
        role: 'assistant',
        text: language === 'english'
          ? '🙏 I apologize, there was an error connecting to the divine knowledge. Please try again.'
          : '🙏 क्षमा करें, कनेक्शन में समस्या है। कृपया पुनः प्रयास करें।',
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
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
    <>
      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <span style={styles.headerIcon}>🕉</span>
            <div style={styles.headerTitle}>
              <span style={styles.titleMain}>कुंभ आचार्य</span>
              <span style={styles.titleSub}>Spiritual AI Guide</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select
              style={styles.langSelect}
              value={language}
              onChange={e => setLanguage(e.target.value)}
              aria-label="Select language"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(m => !m)}
                style={{
                  backgroundColor: '#d4af37', color: '#1a1a4d',
                  border: 'none', borderRadius: '50%',
                  width: '34px', height: '34px', fontSize: '13px',
                  fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {user?.name?.charAt(0).toUpperCase() || '?'}
              </button>
              {showUserMenu && (
                <div style={{
                  position: 'absolute', right: 0, top: '40px',
                  backgroundColor: '#12124a', border: '1px solid rgba(212,175,55,0.4)',
                  borderRadius: '10px', padding: '8px', minWidth: '150px', zIndex: 50,
                }}>
                  <div style={{ color: '#d4af37', fontSize: '13px', fontWeight: '600', padding: '4px 8px', marginBottom: '4px' }}>
                    {user?.name}
                    <span style={{
                      backgroundColor: isPaid ? '#d4af37' : 'rgba(255,255,255,0.1)',
                      color: isPaid ? '#1a1a4d' : 'rgba(255,255,255,0.5)',
                      borderRadius: '6px', padding: '1px 6px', fontSize: '10px',
                      fontWeight: '700', marginLeft: '6px',
                    }}>{isPaid ? 'PRO' : 'FREE'}</span>
                  </div>
                  <button onClick={() => { setShowUserMenu(false); onProfile && onProfile() }} style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    backgroundColor: 'transparent', color: '#fff', border: 'none',
                    padding: '8px', fontSize: '13px', cursor: 'pointer',
                    borderRadius: '6px', fontFamily: 'inherit',
                  }}>👤 Profile</button>
                  <button onClick={logout} style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    backgroundColor: 'transparent', color: '#fca5a5', border: 'none',
                    padding: '8px', fontSize: '13px', cursor: 'pointer',
                    borderRadius: '6px', fontFamily: 'inherit',
                  }}>🚪 Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Free tier counter */}
        {!isPaid && (
          <div style={styles.freeCounter}>
            <span style={styles.counterText}>
              {language === 'english' ? 'Free chats today' : 'आज के मुफ्त प्रश्न'}
            </span>
            <span style={styles.counterBadge}>
              {Math.max(0, FREE_CHAT_LIMIT - chatsUsed)}/{FREE_CHAT_LIMIT} {language === 'english' ? 'left' : 'शेष'}
            </span>
          </div>
        )}

        {/* Messages */}
        <div style={styles.messages}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}
            >
              <div style={styles.senderLabel(msg.role === 'user')}>
                {msg.role === 'user'
                  ? (language === 'english' ? 'You' : 'आप')
                  : 'कुंभ आचार्य'}
              </div>
              <div style={styles.messageBubble(msg.role === 'user')}>
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
              <div style={styles.senderLabel(false)}>कुंभ आचार्य</div>
              <div style={styles.messageBubble(false)}>
                <div style={styles.loadingDots}>
                  <div style={styles.dot('0s')} />
                  <div style={styles.dot('0.2s')} />
                  <div style={styles.dot('0.4s')} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={styles.inputArea}>
          <textarea
            ref={textareaRef}
            style={styles.textarea}
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder={PLACEHOLDER_TEXT[language]}
            rows={1}
            disabled={loading}
            aria-label="Message input"
          />
          <button
            style={styles.sendBtn(loading || !input.trim())}
            onClick={handleSend}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            🙏
          </button>
        </div>

        {/* Paywall Modal */}
        {showPaywall && (
          <div style={styles.overlay} onClick={() => setShowPaywall(false)}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
              <div style={styles.modalIcon}>🕉</div>
              <div style={styles.modalTitle}>
                {language === 'english' ? 'Unlock Unlimited Guidance' : 'असीमित ज्ञान पाएं'}
              </div>
              <div style={styles.modalText}>
                {language === 'english'
                  ? "You've used your 3 free daily questions. Upgrade to continue your spiritual journey."
                  : 'आपने आज के 3 मुफ्त प्रश्न पूछ लिए हैं। अपनी आध्यात्मिक यात्रा जारी रखने के लिए अपग्रेड करें।'}
              </div>

              <div style={styles.features}>
                {[
                  language === 'english' ? '✨ Unlimited daily questions' : '✨ असीमित दैनिक प्रश्न',
                  language === 'english' ? '📿 All 5 languages' : '📿 सभी 5 भाषाएं',
                  language === 'english' ? '🔱 Priority responses' : '🔱 प्राथमिकता उत्तर',
                  language === 'english' ? '🌺 Advanced spiritual guidance' : '🌺 उन्नत आध्यात्मिक मार्गदर्शन',
                ].map((f, i) => (
                  <div key={i} style={styles.featureItem}>{f}</div>
                ))}
              </div>

              <div style={styles.modalPrice}>₹99</div>
              <div style={styles.modalPriceSub}>
                {language === 'english' ? 'per month · cancel anytime' : 'प्रति माह · कभी भी रद्द करें'}
              </div>

              <button style={styles.payBtn} onClick={handleDemoPayment}>
                {language === 'english' ? '🙏 Unlock Now (Demo)' : '🙏 अभी अनलॉक करें (Demo)'}
              </button>
              <button style={styles.dismissBtn} onClick={() => setShowPaywall(false)}>
                {language === 'english' ? 'Maybe later' : 'बाद में'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
