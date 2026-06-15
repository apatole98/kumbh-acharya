import React from 'react'
import BottomNav from '../components/BottomNav.jsx'

const Section = ({ n, title, children }) => (
  <div style={{ marginBottom: '28px' }}>
    <div style={{ color: '#d4af37', fontSize: '14px', fontWeight: '800', marginBottom: '8px' }}>{n}. {title}</div>
    <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.8' }}>{children}</div>
  </div>
)

export default function TermsPage({ onNav }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', backgroundColor: '#0f1419', fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>
      <div style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #334155', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
        <button onClick={() => onNav?.('chat')} style={{ background: 'transparent', border: 'none', color: '#d4af37', fontSize: '20px', cursor: 'pointer', padding: '4px' }}>←</button>
        <div>
          <div style={{ color: '#d4af37', fontSize: '18px', fontWeight: '800' }}>📜 Terms of Service</div>
          <div style={{ color: '#64748b', fontSize: '12px' }}>Last updated: June 2026</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
        <div style={{ backgroundColor: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '12px', padding: '14px 16px', marginBottom: '28px', color: '#94a3b8', fontSize: '13px', lineHeight: '1.7' }}>
          By using Kumbh Acharya, you agree to these terms. Please read them carefully.
        </div>

        <Section n={1} title="Acceptance of Terms">
          By accessing or using the Kumbh Acharya application ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
        </Section>

        <Section n={2} title="Description of Service">
          Kumbh Acharya is an AI-powered spiritual guidance application for the Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027. The Service provides information about pilgrimage rituals, dates, mantras, travel logistics, and related spiritual content through AI-generated responses.
        </Section>

        <Section n={3} title="Spiritual Disclaimer">
          The guidance provided by Kumbh Acharya is for informational and spiritual education purposes only. It does not replace the advice of a qualified pandit, priest, or Vedic scholar. For critical religious rituals (especially Shraadha, Pitru Tarpan, Abhishek), please consult a qualified human priest.
        </Section>

        <Section n={4} title="Free and Pro Plans">
          The Free plan provides 3 AI consultations per day. The Pro plan (₹99/month) provides unlimited consultations. Subscription fees are charged monthly. Cancellation takes effect at the end of the current billing period. No refunds are provided for partial months.
        </Section>

        <Section n={5} title="User Conduct">
          You agree not to use the Service to generate harmful, abusive, or illegal content; to misrepresent yourself or impersonate others; to attempt to extract or reverse-engineer the underlying AI model; or to use automated tools to exceed the stated free usage limits.
        </Section>

        <Section n={6} title="Intellectual Property Rights">
          All content on Kumbh Acharya — including but not limited to website design and layout, AI technology and responses, text and graphics, software and source code, brand name and logo, and community features — is the exclusive property of Kumbh Acharya and is protected under international copyright and intellectual property laws.<br /><br />
          <strong style={{ color: '#e2e8f0' }}>You may NOT:</strong><br />
          • Copy, reproduce, or distribute any content without written permission<br />
          • Modify or create derivative works based on our platform<br />
          • Reverse-engineer or attempt to extract the underlying AI technology<br />
          • Claim ownership of any Kumbh Acharya intellectual property<br />
          • Use our branding, name, or logo without prior written consent<br /><br />
          Vedic texts, mantras, and traditional Hindu knowledge referenced in responses are part of the public domain of sacred cultural heritage. However, our curation, presentation, translation, and AI-generated explanations of such content remain our intellectual property.<br /><br />
          Violation of these terms will result in immediate account termination and may result in legal action under applicable laws.
        </Section>

        <Section n={7} title="Limitation of Liability">
          Kumbh Acharya is provided "as is" without warranties of any kind. We are not liable for any decisions made based on AI-generated spiritual guidance, nor for any inaccuracies in event dates, travel logistics, or ritual procedures.
        </Section>

        <Section n={8} title="Changes to Terms">
          We reserve the right to update these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms.
        </Section>

        <Section n={9} title="Contact & Copyright Concerns">
          For general questions about these terms, contact us at <strong style={{ color: '#d4af37' }}>namaste@kumbhacharya.com</strong><br /><br />
          For copyright or intellectual property concerns:<br />
          📧 <strong style={{ color: '#d4af37' }}>legal@kumbhacharya.com</strong><br /><br />
          We take intellectual property rights seriously and will respond to all valid claims within 5 business days.
        </Section>

        {/* Copyright notice */}
        <div style={{ marginTop: '32px', padding: '18px 20px', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ color: '#8b5cf6', fontWeight: '800', fontSize: '13px', marginBottom: '6px' }}>© 2026 Kumbh Acharya. All Rights Reserved.</div>
          <div style={{ color: '#475569', fontSize: '12px', lineHeight: 1.7 }}>
            Website design, AI technology, and all content are protected intellectual property.<br />
            Unauthorized reproduction or distribution is prohibited.
          </div>
        </div>

        <div style={{ height: '80px' }} />
      </div>

      <BottomNav page="terms" onNav={onNav} />
    </div>
  )
}
