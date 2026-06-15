import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useAuth } from '../components/AuthContext.jsx'
import Footer from '../components/Footer.jsx'
import SinhasthCountdown from '../components/SinhasthCountdown.jsx'

const SECTIONS = [
  {
    mantra:  'ॐ गं गणपतये नमः',
    title:   'कुंभ आचार्य',
    sub:     'Enter the Sacred Digital Realm',
    story:   'Where ancient Vedic wisdom meets divine technology. Step into a living, breathing spiritual world — crafted for every Kumbh pilgrim.',
    cta:     false,
    color:   0xd4af37,
    camZ:    5,
    camY:    0,
  },
  {
    mantra:  'ॐ नमः शिवाय',
    title:   'The Sacred Bathing',
    sub:     'Triveni Sangam — Where Three Rivers Meet',
    story:   'Millions of pilgrims have sought purification in these sacred waters since time immemorial. Ask Kumbh Acharya about every Shahi Snan date, ritual, and mantra.',
    cta:     false,
    color:   0x60a5fa,
    camZ:    4,
    camY:    -0.5,
  },
  {
    mantra:  'ॐ ह्रीं श्रीं',
    title:   'Infinite Wisdom',
    sub:     'Ancient Knowledge • 5 Languages • 24/7',
    story:   'From Vedic mantras to pilgrimage guidance — in Hindi, English, Marathi, Gujarati, or Bengali. Your divine guide is always present, always illuminated.',
    cta:     false,
    color:   0x8b5cf6,
    camZ:    3.5,
    camY:    -1,
  },
  {
    mantra:  'ॐ शान्तिः शान्तिः शान्तिः',
    title:   'Your Sacred Journey',
    sub:     'Quests • Badges • Community • Leaderboard',
    story:   'Every question earns you points. Daily quests deepen your knowledge. Badges mark milestones of your unique spiritual path. Join thousands of pilgrims.',
    cta:     false,
    color:   0x10b981,
    camZ:    4,
    camY:    -1.5,
  },
  {
    mantra:  'ॐ तत् सत्',
    title:   'Transcend Today',
    sub:     'Begin your eternal journey — ₹99/month',
    story:   'Join thousands of pilgrims walking the path to enlightenment. Your Kumbh Acharya awaits in the sacred digital realm.',
    cta:     true,
    color:   0xffffff,
    camZ:    6,
    camY:    -2,
  },
]

/* ── Inline Login Form ──────────────────────────────── */
function LoginInline({ onClose }) {
  const { signup, login, demoLogin } = useAuth()
  const [tab, setTab]     = useState('login')
  const [form, setForm]   = useState({ name: '', email: '', phone: '', emailOrPhone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async ev => {
    ev.preventDefault(); setError(''); setLoading(true)
    await new Promise(r => setTimeout(r, 350))
    const res = tab === 'signup' ? signup(form) : login(form)
    if (res.error) setError(res.error)
    setLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#1a1f2e', borderRadius: '20px', border: '1px solid #334155', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.7)', maxWidth: '400px', margin: '0 auto', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>
      <div style={{ height: '3px', background: 'linear-gradient(to right, #8b5cf6, #d4af37, #8b5cf6)' }} />
      <div style={{ padding: '28px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>🕉 Kumbh Acharya</div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '22px', cursor: 'pointer', lineHeight: 1, padding: '0 4px' }}>×</button>
        </div>

        {/* Demo */}
        <button onClick={demoLogin} style={{ width: '100%', padding: '12px 14px', marginBottom: '14px', background: 'linear-gradient(135deg,#1a1228,#252d3d)', border: '1px solid rgba(139,92,246,0.5)', borderRadius: '12px', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 200ms' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#a78bfa'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)'}>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <div style={{ color: '#a78bfa', fontSize: '13px', fontWeight: '800' }}>🧪 Try Demo (Pro Account)</div>
            <div style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>1250 pts · 12-day streak · 6 badges</div>
          </div>
          <span style={{ color: '#8b5cf6', fontSize: '18px' }}>→</span>
        </button>

        {/* Toggle */}
        <div style={{ display: 'flex', backgroundColor: '#252d3d', borderRadius: '12px', padding: '4px', marginBottom: '18px', gap: '4px' }}>
          {['login', 'signup'].map(m => (
            <button key={m} onClick={() => { setTab(m); setError('') }} style={{ flex: 1, padding: '8px', borderRadius: '9px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '700', fontFamily: 'inherit', backgroundColor: tab === m ? '#d4af37' : 'transparent', color: tab === m ? '#0f1419' : '#64748b', transition: 'all 200ms' }}>
              {m === 'login' ? '🔑 Login' : '✨ Sign Up'}
            </button>
          ))}
        </div>

        {error && <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '10px 12px', color: '#f87171', fontSize: '13px', marginBottom: '12px' }}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tab === 'signup' && (
            <>
              <input className="input-field" placeholder="Full Name" value={form.name} onChange={set('name')} required style={{ padding: '11px 14px' }} />
              <input className="input-field" type="email" placeholder="Email" value={form.email} onChange={set('email')} required style={{ padding: '11px 14px' }} />
              <input className="input-field" type="tel" placeholder="Phone (10 digits)" maxLength={10} value={form.phone} onChange={set('phone')} required style={{ padding: '11px 14px' }} />
            </>
          )}
          {tab === 'login' && (
            <input className="input-field" placeholder="Email or Phone" value={form.emailOrPhone} onChange={set('emailOrPhone')} required style={{ padding: '11px 14px' }} />
          )}
          <input className="input-field" type="password" placeholder="Password" value={form.password} onChange={set('password')} required minLength={tab === 'signup' ? 8 : 1} style={{ padding: '11px 14px' }} />
          <button type="submit" disabled={loading} className="btn-gold" style={{ padding: '13px', fontSize: '14px', fontWeight: '800', marginTop: '4px', opacity: loading ? 0.7 : 1 }}>
            {loading ? '⏳ Please wait...' : tab === 'login' ? '🙏 Enter Sanctum' : '✨ Begin Journey'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ── Main Immersive Landing ────────────────────────── */
export default function ImmersiveLanding({ onFeatures, onEnterApp, onNav }) {
  const canvasRef     = useRef(null)
  const stateRef      = useRef({})   // three.js refs
  const frameRef      = useRef(null)
  const scrollRef     = useRef(null)
  const [section, setSection]       = useState(0)
  const [showLogin, setShowLogin]   = useState(false)
  const [loaded, setLoaded]         = useState(false)

  /* ── Three.js init ── */
  useEffect(() => {
    const canvas  = canvasRef.current
    if (!canvas) return
    const mobile  = window.innerWidth < 768
    let W = window.innerWidth, H = window.innerHeight

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: false })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2))
    renderer.setClearColor(0x0a0e14, 1)

    /* Scene */
    const scene  = new THREE.Scene()
    scene.fog    = new THREE.FogExp2(0x0a0e14, 0.04)

    /* Camera */
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 100)
    camera.position.set(0, 0, 5)

    /* ── Particles ── */
    const COUNT = mobile ? 1800 : 3500
    const pos   = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 2 + Math.random() * 9
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      pos[i*3+2] = r * Math.cos(phi)
    }
    const pGeo  = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const pMat  = new THREE.PointsMaterial({ size: mobile ? 0.05 : 0.04, color: 0xd4af37, transparent: true, opacity: 0.75, sizeAttenuation: true })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    /* ── River particles (bottom band) ── */
    const RCOUNT = mobile ? 600 : 1200
    const rpos   = new Float32Array(RCOUNT * 3)
    for (let i = 0; i < RCOUNT; i++) {
      rpos[i*3]   = (Math.random() - 0.5) * 14
      rpos[i*3+1] = -2.5 + (Math.random() - 0.5) * 0.8
      rpos[i*3+2] = (Math.random() - 0.5) * 6
    }
    const rGeo = new THREE.BufferGeometry()
    rGeo.setAttribute('position', new THREE.BufferAttribute(rpos, 3))
    const rMat = new THREE.PointsMaterial({ size: 0.03, color: 0x60a5fa, transparent: true, opacity: 0.5, sizeAttenuation: true })
    const river = new THREE.Points(rGeo, rMat)
    scene.add(river)

    /* ── Sacred geometry group ── */
    const sacred = new THREE.Group()

    // Main torus knot
    const tkGeo = new THREE.TorusKnotGeometry(1.0, 0.22, 120, 16)
    const tkMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, wireframe: true, transparent: true, opacity: 0.18 })
    const tk    = new THREE.Mesh(tkGeo, tkMat)
    sacred.add(tk)

    // Outer ring
    const ringGeo = new THREE.TorusGeometry(2.2, 0.015, 8, 80)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.12 })
    const ring    = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 3
    sacred.add(ring)

    // Floating shapes
    const floaters = []
    const shapes = [
      new THREE.IcosahedronGeometry(0.12, 0),
      new THREE.OctahedronGeometry(0.14, 0),
      new THREE.TetrahedronGeometry(0.15, 0),
    ]
    for (let i = 0; i < 10; i++) {
      const geo = shapes[i % shapes.length]
      const mat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0xd4af37 : 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.35 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set((Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4.5, (Math.random() - 0.5) * 3 - 1)
      mesh.userData = {
        ox: mesh.position.x, oy: mesh.position.y,
        rs: (Math.random() - 0.5) * 0.025,
        fs: 0.3 + Math.random() * 0.6,
        fo: Math.random() * Math.PI * 2,
      }
      sacred.add(mesh)
      floaters.push(mesh)
    }
    scene.add(sacred)

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0x0f1419, 2))
    const goldLight   = new THREE.PointLight(0xd4af37, 3, 12)
    goldLight.position.set(2, 2, 3)
    scene.add(goldLight)
    const purpleLight = new THREE.PointLight(0x8b5cf6, 2, 10)
    purpleLight.position.set(-3, -1, 2)
    scene.add(purpleLight)

    /* Store refs */
    const s = stateRef.current
    s.renderer = renderer; s.scene = scene; s.camera = camera
    s.particles = particles; s.river = river; s.sacred = sacred
    s.tk = tk; s.tkMat = tkMat; s.pMat = pMat; s.rMat = rMat
    s.goldLight = goldLight; s.purpleLight = purpleLight
    s.floaters = floaters; s.targetColor = new THREE.Color(0xd4af37)
    s.clock = new THREE.Clock()
    s.sectionIndex = 0

    /* ── Animate ── */
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      const t = s.clock.getElapsedTime()

      particles.rotation.y  = t * 0.04
      particles.rotation.x  = t * 0.015
      river.position.x      = Math.sin(t * 0.3) * 0.4
      sacred.rotation.y     = t * 0.08

      // Torus knot breathe
      const breathe = 0.9 + Math.sin(t * 0.6) * 0.1
      tk.scale.setScalar(breathe)
      tk.rotation.x = t * 0.2
      tk.rotation.z = t * 0.15

      // Float shapes
      floaters.forEach(f => {
        const ud = f.userData
        f.rotation.x += ud.rs
        f.rotation.y += ud.rs * 0.8
        f.position.y  = ud.oy + Math.sin(t * ud.fs + ud.fo) * 0.22
      })

      // Lerp particle color to target
      pMat.color.lerp(s.targetColor, 0.03)
      tkMat.color.lerp(s.targetColor, 0.03)
      goldLight.color.lerp(s.targetColor, 0.03)
      goldLight.intensity = 2.5 + Math.sin(t * 1.8) * 0.7

      // Camera gentle sway
      camera.position.x = Math.sin(t * 0.12) * 0.3
      camera.position.y += (s.targetCamY - camera.position.y) * 0.03
      camera.position.z += (s.targetCamZ - camera.position.z) * 0.03

      renderer.render(scene, camera)
    }
    s.targetCamY = 0; s.targetCamZ = 5
    animate()

    /* ── Resize ── */
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', onResize)

    setTimeout(() => setLoaded(true), 200)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  /* ── Section color/camera updates ── */
  useEffect(() => {
    const s = stateRef.current
    if (!s.targetColor) return
    const sec = SECTIONS[section]
    s.targetColor.set(sec.color)
    s.targetCamZ = sec.camZ
    s.targetCamY = sec.camY
  }, [section])

  /* ── Scroll tracking ── */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const prog = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight)
      const idx  = Math.min(Math.floor(prog * SECTIONS.length), SECTIONS.length - 1)
      setSection(idx)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const sec = SECTIONS[section]

  return (
    <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden', backgroundColor: '#0a0e14', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* ── Canvas ── */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />

      {/* ── Vignette overlay ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,14,20,0.7) 100%)', pointerEvents: 'none' }} />

      {/* ── Scrollable sections ── */}
      <div ref={scrollRef} style={{ position: 'relative', zIndex: 10, height: '100dvh', overflowY: 'auto' }}>
        {SECTIONS.map((s, i) => (
          <section key={i} style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 80px', textAlign: 'center', position: 'relative' }}>

            {/* Mantra */}
            <div style={{ fontSize: 'clamp(16px, 4vw, 26px)', color: '#d4af37', fontWeight: '700', letterSpacing: '6px', marginBottom: '20px', textShadow: '0 0 30px rgba(212,175,55,0.6)', lineHeight: 1.4, opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease', animation: 'fadeIn 1.2s ease' }}>
              {s.mantra}
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 'clamp(36px, 9vw, 80px)', fontWeight: '900', color: '#fff', lineHeight: 1.05, marginBottom: '12px', textShadow: '0 4px 32px rgba(0,0,0,0.7)', letterSpacing: '-1px' }}>
              {s.title}
            </h1>

            {/* Sub */}
            <div style={{ fontSize: 'clamp(13px, 2.5vw, 18px)', color: '#a78bfa', fontWeight: '600', marginBottom: '18px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              {s.sub}
            </div>

            {/* Gold divider */}
            <div style={{ height: '2px', width: '60px', background: 'linear-gradient(to right, transparent, #d4af37, transparent)', borderRadius: '2px', marginBottom: '20px' }} />

            {/* Story */}
            <p style={{ color: '#94a3b8', fontSize: 'clamp(14px, 2.2vw, 17px)', lineHeight: '1.85', maxWidth: '540px', marginBottom: s.cta ? '36px' : '0' }}>
              {s.story}
            </p>

            {/* CTA */}
            {s.cta && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '340px' }}>
                {/* Countdown */}
                {i === 0 && (
                  <div style={{ marginBottom: '4px' }}>
                    <SinhasthCountdown />
                  </div>
                )}
                <button onClick={onEnterApp || (() => setShowLogin(true))} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg,#d4af37,#b8962c)', border: 'none', borderRadius: '14px', color: '#0f1419', fontSize: '16px', fontWeight: '900', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 0 40px rgba(212,175,55,0.45)', animation: 'pulseGold 2s ease-in-out infinite' }}>
                  {onEnterApp ? '🕉 Enter the Sanctum' : '🙏 Prepare for Sinhastha 2026'}
                </button>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => onNav?.('sinhastha')} style={{ flex: 1, padding: '12px', backgroundColor: 'transparent', border: '1px solid rgba(212,175,55,0.35)', borderRadius: '12px', color: '#d4af37', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 200ms' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    🚩 Sinhastha Guide
                  </button>
                  <button onClick={onFeatures} style={{ flex: 1, padding: '12px', backgroundColor: 'transparent', border: '1px solid rgba(139,92,246,0.35)', borderRadius: '12px', color: '#a78bfa', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 200ms' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(139,92,246,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    💎 View Plans
                  </button>
                </div>
              </div>
            )}

            {/* Scroll indicator */}
            {i === 0 && (
              <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <div style={{ color: '#475569', fontSize: '10px', letterSpacing: '3px', marginBottom: '10px' }}>SCROLL TO EXPLORE</div>
                <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, #d4af37, transparent)', margin: '0 auto', animation: 'scrollPulse 2s ease-in-out infinite' }} />
              </div>
            )}
          </section>
        ))}
        <Footer onNav={page => onNav ? onNav(page) : onFeatures && page === 'features' ? onFeatures() : null} />
      </div>

      {/* ── Top Nav ── */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: 'linear-gradient(to bottom, rgba(10,14,20,0.95), transparent)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🕉</span>
          <span style={{ color: '#d4af37', fontSize: '16px', fontWeight: '800' }}>Kumbh Acharya</span>
        </div>
        <button onClick={onEnterApp || (() => setShowLogin(true))} style={{ backgroundColor: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '10px', padding: '8px 20px', color: '#d4af37', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 200ms' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.22)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.12)'}>
          {onEnterApp ? '🕉 Enter Sanctum' : 'Login / Sign Up'}
        </button>
      </div>

      {/* ── Section dots ── */}
      <div style={{ position: 'fixed', right: '18px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 50 }}>
        {SECTIONS.map((_, i) => (
          <button key={i} onClick={() => { scrollRef.current?.scrollTo({ top: i * scrollRef.current.clientHeight, behavior: 'smooth' }) }} style={{ width: section === i ? '6px' : '5px', height: section === i ? '22px' : '5px', backgroundColor: section === i ? '#d4af37' : 'rgba(212,175,55,0.25)', borderRadius: '4px', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.35s ease' }} />
        ))}
      </div>

      {/* ── Login Modal ── */}
      {showLogin && (
        <div className="ai" style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={() => setShowLogin(false)}>
          <div style={{ width: '100%' }} onClick={e => e.stopPropagation()}>
            <LoginInline onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes scrollPulse {
          0%,100% { opacity:0; transform:scaleY(0.5) translateY(-8px); }
          50%      { opacity:1; transform:scaleY(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
