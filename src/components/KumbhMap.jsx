import React, { useState } from 'react'

const LOCATIONS = [
  {
    id: 'ramkund',
    name: 'Ramkund',
    nameHindi: 'रामकुंड',
    type: 'Sacred Bathing Ghat',
    icon: '🌊',
    color: '#60a5fa',
    lat: 19.9975,
    lng: 73.7898,
    city: 'Nashik',
    desc: 'The holiest bathing ghat in Nashik — where Lord Rama bathed during his 14-year exile. Site of Shahi Snan for Vaishnava Akharas. The sacred Godavari flows here.',
    tip: 'Best time: 4–6 AM on Shahi Snan days. Aug 31, 2027 is the most auspicious.',
    zoom: 17,
  },
  {
    id: 'trimbakeshwar',
    name: 'Trimbakeshwar',
    nameHindi: 'त्र्यंबकेश्वर',
    type: '12th Jyotirlinga Temple',
    icon: '🔱',
    color: '#d4af37',
    lat: 19.9308,
    lng: 73.5142,
    city: 'Trimbak (38 km from Nashik)',
    desc: 'One of the 12 sacred Jyotirlingas of India. Kushavarta Kund here is the origin of the Godavari River and the Shaiva Shahi Snan site for Kumbh 2027.',
    tip: 'Book Rudrabhishek in advance. Temple opens 5:30 AM. Sep 12, 2027 — Shaiva Shahi Snan.',
    zoom: 16,
  },
  {
    id: 'ganga-ghat',
    name: 'Ganga Ghat',
    nameHindi: 'गंगा घाट',
    type: 'Main Bathing Area',
    icon: '🏊',
    color: '#06b6d4',
    lat: 19.9982,
    lng: 73.7925,
    city: 'Nashik (200m from Ramkund)',
    desc: 'The main bathing ghat adjacent to Ramkund. Stretches along the Godavari with stone steps (ghats). Central hub for pilgrims during Simhastha.',
    tip: 'Arrive before 5 AM on peak days. Facilities: changing rooms, lockers available.',
    zoom: 17,
  },
  {
    id: 'sita-gufa',
    name: 'Sita Gufa',
    nameHindi: 'सीता गुफा',
    type: 'Ancient Cave Temple',
    icon: '🪨',
    color: '#a78bfa',
    lat: 19.9895,
    lng: 73.7632,
    city: 'Panchavati, Nashik',
    desc: 'The ancient cave where Goddess Sita is believed to have lived during the 14-year exile with Lord Rama and Lakshmana. A deeply sacred and atmospheric site.',
    tip: 'Open 9 AM – 6 PM. 10 min walk from Panchavati. Free entry. Narrow cave — go early.',
    zoom: 17,
  },
  {
    id: 'panchavati',
    name: 'Panchavati',
    nameHindi: 'पंचवटी',
    type: 'Sacred Garden & Temples',
    icon: '🌳',
    color: '#10b981',
    lat: 19.9920,
    lng: 73.8152,
    city: 'Nashik',
    desc: 'The sacred grove of 5 banyan trees (panch = 5, vati = banyan) where Lord Rama lived. Includes Kalaram Temple — one of Nashik\'s most important temples.',
    tip: 'Walk along the Godavari from Ramkund (~1 km). Kalaram Temple: 5:30 AM – 9 PM.',
    zoom: 16,
  },
]

function buildMapUrl(location) {
  const { lat, lng, zoom } = location
  const delta = zoom >= 17 ? 0.003 : zoom >= 16 ? 0.006 : 0.012
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`
}

export default function KumbhMap({ onNav }) {
  const [active, setActive] = useState(LOCATIONS[0])
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div style={{ fontFamily: "'Segoe UI','Noto Sans Devanagari',Arial,sans-serif" }}>

      {/* Location selector cards */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {LOCATIONS.map(loc => (
          <button
            key={loc.id}
            onClick={() => { setActive(loc); setShowDetails(false) }}
            style={{
              background: active.id === loc.id ? `${loc.color}18` : '#1a1f2e',
              border: `1px solid ${active.id === loc.id ? loc.color : '#2d3748'}`,
              borderRadius: '10px',
              padding: '8px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => { if (active.id !== loc.id) e.currentTarget.style.borderColor = loc.color }}
            onMouseLeave={e => { if (active.id !== loc.id) e.currentTarget.style.borderColor = '#2d3748' }}
          >
            <span style={{ fontSize: '16px' }}>{loc.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: active.id === loc.id ? loc.color : '#e2e8f0', fontSize: '12px', fontWeight: '700' }}>{loc.name}</div>
              <div style={{ color: '#475569', fontSize: '10px' }}>{loc.city}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Map frame */}
      <div style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: `2px solid ${active.color}`,
        boxShadow: `0 0 32px ${active.color}22`,
        marginBottom: '16px',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}>
        {/* Active location badge overlay */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px', zIndex: 10,
          background: 'rgba(15,20,25,0.9)',
          border: `1px solid ${active.color}`,
          borderRadius: '10px',
          padding: '8px 12px',
          display: 'flex', alignItems: 'center', gap: '8px',
          backdropFilter: 'blur(4px)',
        }}>
          <span style={{ fontSize: '20px' }}>{active.icon}</span>
          <div>
            <div style={{ color: active.color, fontWeight: '800', fontSize: '13px' }}>{active.name}</div>
            <div style={{ color: '#94a3b8', fontSize: '10px' }}>{active.type}</div>
          </div>
        </div>

        {/* Open in full maps button */}
        <a
          href={`https://www.openstreetmap.org/?mlat=${active.lat}&mlon=${active.lng}#map=17/${active.lat}/${active.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute', top: '12px', right: '12px', zIndex: 10,
            background: 'rgba(15,20,25,0.9)',
            border: '1px solid #3a4557',
            borderRadius: '8px',
            padding: '6px 12px',
            color: '#94a3b8',
            fontSize: '11px',
            fontWeight: '600',
            textDecoration: 'none',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#d4af37'; e.currentTarget.style.borderColor = '#d4af37' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#3a4557' }}
        >
          🗺 Full Map ↗
        </a>

        <iframe
          key={active.id}
          src={buildMapUrl(active)}
          title={`Map of ${active.name}`}
          width="100%"
          height="400"
          style={{ display: 'block', border: 'none', filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)' }}
          loading="lazy"
          allowFullScreen
        />
      </div>

      {/* Location detail card */}
      <div style={{
        background: `${active.color}08`,
        border: `1px solid ${active.color}30`,
        borderRadius: '14px',
        padding: '20px',
        transition: 'all 0.3s',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '24px' }}>{active.icon}</span>
              <div>
                <div style={{ color: '#fff', fontWeight: '800', fontSize: '16px' }}>{active.name}</div>
                <div style={{ color: active.color, fontSize: '11px', fontWeight: '600' }}>{active.nameHindi}</div>
              </div>
            </div>
            <div style={{ display: 'inline-block', background: `${active.color}18`, border: `1px solid ${active.color}40`, borderRadius: '20px', padding: '2px 10px', color: active.color, fontSize: '10px', fontWeight: '700' }}>
              {active.type}
            </div>
          </div>
          <div style={{ color: '#475569', fontSize: '11px', textAlign: 'right' }}>
            <div>{active.lat.toFixed(4)}°N</div>
            <div>{active.lng.toFixed(4)}°E</div>
          </div>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.7, marginBottom: '12px' }}>
          {active.desc}
        </p>

        <div style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '8px', padding: '10px 12px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '14px', flexShrink: 0 }}>💡</span>
          <div style={{ color: '#d4af37', fontSize: '12px', lineHeight: 1.6 }}>{active.tip}</div>
        </div>
      </div>

      {/* All locations mini list */}
      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {LOCATIONS.filter(l => l.id !== active.id).map(loc => (
          <button
            key={loc.id}
            onClick={() => setActive(loc)}
            style={{
              background: '#1a1f2e', border: '1px solid #2d3748',
              borderRadius: '12px', padding: '12px 14px',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: '10px',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = loc.color; e.currentTarget.style.background = `${loc.color}0a` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2d3748'; e.currentTarget.style.background = '#1a1f2e' }}
          >
            <span style={{ fontSize: '20px' }}>{loc.icon}</span>
            <div>
              <div style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '700' }}>{loc.name}</div>
              <div style={{ color: '#475569', fontSize: '11px' }}>{loc.type}</div>
            </div>
            <span style={{ marginLeft: 'auto', color: '#475569', fontSize: '12px' }}>→</span>
          </button>
        ))}
      </div>
    </div>
  )
}
