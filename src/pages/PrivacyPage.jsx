import React from 'react'
import BottomNav from '../components/BottomNav.jsx'

const Section = ({ n, title, children }) => (
  <div style={{ marginBottom: '28px' }}>
    <div style={{ color: '#d4af37', fontSize: '14px', fontWeight: '800', marginBottom: '8px' }}>{n}. {title}</div>
    <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.8' }}>{children}</div>
  </div>
)

export default function PrivacyPage({ onNav }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
        <button onClick={() => onNav?.('chat')} style={{ background: 'transparent', border: 'none', color: '#d4af37', fontSize: '20px', cursor: 'pointer', padding: '4px' }}>←</button>
        <div>
          <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>🔐 Privacy Policy</div>
          <div style={{ color: '#64748b', fontSize: '12px' }}>Last updated: June 2026</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
        <div style={{ backgroundColor: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '12px', padding: '14px 16px', marginBottom: '28px', color: '#94a3b8', fontSize: '13px', lineHeight: '1.7' }}>
          Your privacy is sacred to us — like the Godavari herself, we keep your data pure.
        </div>

        <Section n={1} title="Information We Collect">
          <strong style={{ color: '#e2e8f0' }}>Account data:</strong> Name, email address, and password (hashed) when you register.
          <br /><br />
          <strong style={{ color: '#e2e8f0' }}>Usage data:</strong> Number of daily chats used, gamification points, badges, and quest completion — stored locally on your device (localStorage) and not on our servers.
          <br /><br />
          <strong style={{ color: '#e2e8f0' }}>Chat messages:</strong> Your questions are sent to Anthropic's Claude API to generate responses. We do not store your chat history on our servers.
        </Section>

        <Section n={2} title="How We Use Your Information">
          We use your account data to authenticate you and personalize your experience. We do not sell, rent, or share your personal information with third parties for marketing purposes.
        </Section>

        <Section n={3} title="AI Processing">
          Your spiritual queries are processed by Anthropic's Claude AI. Anthropic's own privacy policy governs how they handle API requests. We send only your message text and selected language — never your name, email, or payment information.
        </Section>

        <Section n={4} title="Local Data Storage">
          Gamification data (points, badges, streaks), chat preferences, language selection, and daily chat counts are stored in your browser's localStorage. This data stays on your device and is never uploaded to our servers. Clearing your browser data will reset this information.
        </Section>

        <Section n={5} title="Cookies">
          We use minimal cookies solely for session authentication. We do not use tracking cookies, analytics cookies, or advertising cookies.
        </Section>

        <Section n={6} title="Data Security">
          Passwords are never stored in plain text. Account data is transmitted over HTTPS. We follow industry-standard security practices to protect your information.
        </Section>

        <Section n={7} title="Your Rights">
          You may request deletion of your account and associated data at any time by contacting us at namaste@kumbhacharya.com. We will process deletion requests within 7 business days.
        </Section>

        <Section n={8} title="Children's Privacy">
          Kumbh Acharya is not directed to children under 13. We do not knowingly collect personal information from children under 13.
        </Section>

        <Section n={9} title="Contact">
          For privacy concerns or data requests: namaste@kumbhacharya.com
        </Section>

        <div style={{ height: '80px' }} />
      </div>

      <BottomNav page="privacy" onNav={onNav} />
    </div>
  )
}
