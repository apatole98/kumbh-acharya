// Official Sinhastha 2026-2028 dates and data
export const SINHASTHA = {
  name: 'Sinhastha Kumbh Mela 2026–2028',
  nameHindi: 'सिंहस्थ कुंभ मेला 2026–2028',
  start: new Date('2026-10-31T12:02:00+05:30'), // Dhwajarohan, 12:02 PM IST
  end:   new Date('2028-07-24T00:00:00+05:30'),
  duration: '21 months',
  lastHeld: 2015,
  nextAfter: 2039,
  river: 'Godavari',
  locations: [
    { name: 'Nashik (Ramkund)', type: 'Vaishnava', dist: 'City center' },
    { name: 'Trimbakeshwar (Kushavarta Kund)', type: 'Shaiva', dist: '28–30 km from Nashik' },
  ],
  expectedPilgrims: '10–12 crore',
}

export const SHAHI_SNAN = [
  {
    n: 1,
    date: 'August 2, 2027',
    dateISO: '2027-08-02',
    tithi: 'Ashadh Somvati Amavasya',
    label: 'First Shahi Snan',
    desc: 'Formal opening of principal bathing phase. Both Nashik and Trimbakeshwar.',
    expected: '50 lakh+',
    color: '#f59e0b',
  },
  {
    n: 2,
    date: 'August 31, 2027',
    dateISO: '2027-08-31',
    tithi: 'Shravan Amavasya',
    label: 'Second Shahi Snan',
    star: true,
    desc: 'Most spiritually potent bathing day. Maximum crowds, maximum blessings.',
    expected: '1 crore+',
    color: '#d4af37',
  },
  {
    n: 3,
    date: 'September 11, 2027',
    dateISO: '2027-09-11',
    tithi: 'Bhadrapada Shukla Ekadashi',
    label: 'Third Shahi Snan',
    desc: 'Vaishnava Akharas bathe at Ramkund, Nashik.',
    expected: '50 lakh+',
    color: '#f59e0b',
  },
  {
    n: 4,
    date: 'September 12, 2027',
    dateISO: '2027-09-12',
    tithi: 'Bhadrapada Shukla Dwadashi',
    label: 'Fourth Shahi Snan',
    desc: 'Shaiva Akharas bathe at Kushavarta Kund, Trimbakeshwar. Concludes royal bathing cycle.',
    expected: '50 lakh+',
    color: '#f59e0b',
  },
]

export const PARVA_SNAN = [
  { date: 'August 9, 2027',  tithi: 'Nagpanchami (Shravan Shukla Panchami)' },
  { date: 'August 17, 2027', tithi: 'Shravan Purnima / Raksha Bandhan / Simha Sankranti — Triple Confluence' },
  { date: 'August 27, 2027', tithi: 'Ganesh Chaturthi (Bhadrapada Shukla Chaturthi)' },
]

export const TIMELINE = [
  { date: 'Oct 31, 2026', label: 'Dhwajarohan', sub: 'Flag hoisting at 12:02 PM — official Mela begins', icon: '🚩', peak: false },
  { date: 'Nov 2026 – Jul 2027', label: 'Regular Bathing Period', sub: 'Daily snans, spiritual activities, early pilgrims', icon: '🌊', peak: false },
  { date: 'Aug 2, 2027', label: 'First Shahi Snan', sub: 'Massive Akhara processions, crores gather', icon: '🔥', peak: true },
  { date: 'Aug 9, 2027', label: 'Nagpanchami Snan', sub: 'Auspicious serpent worship bathing day', icon: '🐍', peak: false },
  { date: 'Aug 17, 2027', label: 'Shravan Purnima / Raksha Bandhan', sub: 'Triple-confluence auspicious snan', icon: '🌕', peak: false },
  { date: 'Aug 27, 2027', label: 'Ganesh Chaturthi', sub: 'Lord Ganesha\'s birth — auspicious bathing', icon: '🐘', peak: false },
  { date: 'Aug 31, 2027', label: 'Second Shahi Snan ★', sub: 'Most auspicious — Shravan Amavasya; 1 crore+ expected', icon: '⭐', peak: true },
  { date: 'Sep 11, 2027', label: 'Third Shahi Snan (Vaishnava)', sub: 'Vaishnava Akharas at Ramkund, Nashik', icon: '🔱', peak: true },
  { date: 'Sep 12, 2027', label: 'Fourth Shahi Snan (Shaiva)', sub: 'Shaiva Akharas at Kushavarta Kund, Trimbakeshwar', icon: '🕉', peak: true },
  { date: 'Jul 24, 2028', label: 'Mela Concludes', sub: '21-month sacred journey ends. Next Sinhastha: 2039.', icon: '🙏', peak: false },
]
