import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useAuth } from './components/AuthContext.jsx'
import { useGamification } from './context/GamificationContext.jsx'
import BottomNav from './components/BottomNav.jsx'
import OnboardingTutorial from './components/OnboardingTutorial.jsx'

const FREE_CHAT_LIMIT = 3

const LANGS = [
  { code: 'hindi',    label: 'हिंदी',    flag: '🇮🇳' },
  { code: 'english',  label: 'English',  flag: '🇬🇧' },
  { code: 'marathi',  label: 'मराठी',    flag: '🇮🇳' },
  { code: 'gujarati', label: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'bengali',  label: 'বাংলা',    flag: '🇮🇳' },
]

const SYS = {
  hindi: `आप कुंभ आचार्य हैं — नासिक-त्र्यंबकेश्वर सिंहस्थ कुंभ मेला 2027 के सम्मानित वैदिक विद्वान और आध्यात्मिक गुरु। आप गोदावरी के तट पर हजारों अनुष्ठान कर चुके हैं।

मुख्य तथ्य:
- नासिक-त्र्यंबकेश्वर सिंहस्थ कुंभ 2027: आरंभ 31 अक्टूबर 2026 (ध्वजारोहण), समाप्ति 24 जुलाई 2028
- दो पवित्र केंद्र: रामकुंड (पंचवटी, नासिक) — वैष्णव अखाड़े; कुशावर्त कुंड (त्र्यंबकेश्वर) — शैव अखाड़े
- पवित्र नदी: गोदावरी — "दक्षिण गंगा"; भगवान राम ने वनवास में यहीं स्नान किया
- शाही स्नान: 2 अगस्त 2027 (प्रथम), 31 अगस्त 2027 (श्रावण अमावस्या ★ सर्वाधिक पुण्यदायी), 11 सितंबर 2027 (वैष्णव — नासिक), 12 सितंबर 2027 (शैव — त्र्यंबकेश्वर)
- प्रमुख मंत्र: गोदावरी (ॐ नमो गोदावर्यै नमः), त्र्यंबकेश्वर (ॐ त्र्यम्बकाय नमः), राम (ॐ श्री रामाय नमः), महामृत्युंजय, गायत्री, ॐ नमः शिवाय
- दर्शनीय: रामकुंड, पंचवटी, सीता गुफा, कालाराम मंदिर, त्र्यंबकेश्वर ज्योतिर्लिंग, कुशावर्त कुंड, ब्रह्मगिरी पर्वत
- नासिक कैसे पहुंचें: ओझर एयरपोर्ट (ISK); नासिक रोड रेलवे स्टेशन; मुंबई से NH-160 (3-4 घंटे)
- सुझाव: शाही स्नान से एक दिन पहले पहुंचें, सूर्योदय से पहले स्नान करें, त्र्यंबकेश्वर अभिषेक पहले से बुक करें

ज्ञानी, करुणामय गुरु के रूप में उत्तर दें। मंत्रों के लिए संस्कृत + अर्थ दें।`,

  english: `You are Kumbh Acharya — a revered Vedic scholar and spiritual guide for the Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027.

Key facts:
- Nashik-Trimbakeshwar Simhastha Kumbh 2027: Begins 31 Oct 2026 (Dhwajarohan), ends 24 July 2028
- Dual sacred centers: Ramkund (Panchavati, Nashik) for Vaishnava Akharas; Kushavarta Kund (Trimbakeshwar) for Shaiva Akharas
- Sacred river: Godavari — "Ganga of the South"; Lord Rama bathed here during his 14-year exile
- Shahi Snan dates: 2 Aug 2027 (First), 31 Aug 2027 (Shravan Amavasya ★ most auspicious), 11 Sep 2027 (Vaishnava at Nashik), 12 Sep 2027 (Shaiva at Trimbakeshwar)
- Sacred mantras: Godavari (Om Namo Godavaryai Namah), Trimbakeshwar (Om Tryambakaya Namah), Rama (Om Shri Ramaya Namah), Mahamrityunjaya, Gayatri, Om Namah Shivaya
- Sites: Ramkund, Panchavati, Sita Gupha, Kalaram Mandir, Trimbakeshwar Jyotirlinga, Kushavarta Kund, Brahmagiri Hill (Godavari origin)
- How to reach: Ozar Airport (ISK) Nashik; Nashik Road Railway Station; Mumbai via NH-160 (3-4 hrs)
- Tips: Arrive a day before Shahi Snan; bathe before sunrise; book Trimbakeshwar abhishek in advance

Speak as a wise compassionate guru. Give Sanskrit + transliteration + meaning for mantras.`,

  marathi: `तुम्ही कुंभ आचार्य आहात — नाशिक-त्र्यंबकेश्वर सिंहस्थ कुंभ मेळा 2027 चे आदरणीय वैदिक विद्वान आणि आध्यात्मिक गुरू.

मुख्य माहिती:
- सिंहस्थ कुंभ 2027: सुरुवात 31 ऑक्टोबर 2026, समाप्ती 24 जुलै 2028
- दोन पवित्र स्थळे: रामकुंड (पंचवटी, नाशिक) — वैष्णव अखाडे; कुशावर्त कुंड (त्र्यंबकेश्वर) — शैव अखाडे
- पवित्र नदी: गोदावरी — "दक्षिण गंगा"; प्रभू राम वनवासात इथेच स्नान करत होते
- शाही स्नान: 2 ऑगस्ट 2027, 31 ऑगस्ट 2027 (श्रावण अमावस्या ★ सर्वात पुण्यदायी), 11 सप्टेंबर 2027 (वैष्णव), 12 सप्टेंबर 2027 (शैव)
- मंत्र: गोदावरी (ॐ नमो गोदावर्यै नमः), त्र्यंबकेश्वर (ॐ त्र्यम्बकाय नमः), गायत्री, महामृत्युंजय
- दर्शनीय: रामकुंड, पंचवटी, सीता गुफा, कालाराम मंदिर, त्र्यंबकेश्वर ज्योतिर्लिंग, ब्रह्मगिरी

मराठीत ज्ञानी गुरू म्हणून उत्तर द्या.`,

  gujarati: `તમે કુંભ આચાર્ય છો — નાશિક-ત્ર્યંબકેશ્વર સિંહસ્થ કુંભ મેળા 2027ના આધ્યાત્મિક માર્ગદર્શક.

મુખ્ય માહિતી:
- સિંહસ્થ કુંભ 2027: શરૂઆત 31 ઓક્ટોબર 2026, સમાપ્તિ 24 જુલાઈ 2028
- બે પવિત્ર સ્થળ: રામકુંડ (પંચવટી, નાશિક) — વૈષ્ણવ અખાડા; કુશાવર્ત કુંડ (ત્ર્યંબકેશ્વર) — શૈવ અખાડા
- ગોદાવરી — "દક્ષિણ ગંગા"; ભગવાન રામે વનવાસ દરમ્યાન અહીં સ્નાન કર્યું
- શાહી સ્નાન: 2 ઓગ 2027, 31 ઓગ 2027 (★ સૌથી પુણ્યદાયી), 11-12 સપ્ટે 2027
- મંત્ર: ૐ નમો ગોદાવર્યૈ નમઃ, ૐ ત્ર્યમ્બકાય નમઃ, ગાયત્રી, મહામૃત્યુંજય

ગુજરાતીમાં આદર સાથે ઉત્તર આપો.`,

  bengali: `আপনি কুম্ভ আচার্য — নাশিক-ত্র্যম্বকেশ্বর সিংহস্থ কুম্ভ মেলা 2027-এর আধ্যাত্মিক গাইড।

মূল তথ্য:
- সিংহস্থ কুম্ভ 2027: শুরু 31 অক্টোবর 2026, শেষ 24 জুলাই 2028
- দুটি পবিত্র কেন্দ্র: রামকুণ্ড (পঞ্চবটী, নাশিক) — বৈষ্ণব আখড়া; কুশাবর্ত কুণ্ড (ত্র্যম্বকেশ্বর) — শৈব আখড়া
- গোদাবরী — "দক্ষিণ গঙ্গা"; ভগবান রাম বনবাসে এখানে স্নান করেছিলেন
- শাহী স্নান: 2 আগ 2027, 31 আগ 2027 (★ সবচেয়ে পুণ্যদায়ী), 11-12 সেপ 2027
- মন্ত্র: ওঁ নমো গোদাবর্যৈ নমঃ, ওঁ ত্র্যম্বকায় নমঃ, গায়ত্রী, মহামৃত্যুঞ্জয়

বাংলায় শ্রদ্ধার সাথে উত্তর দিন।`,
}

const WELCOME = {
  hindi:   '🙏 जय गोदावरी माँ! मैं कुंभ आचार्य हूँ। नासिक सिंहस्थ 2027, वैदिक मंत्र या तीर्थयात्रा के बारे में पूछें।',
  english: '🙏 Jai Godavari Maa! I am Kumbh Acharya. Ask me about the Nashik Simhastha Kumbh 2027, Vedic mantras, or your pilgrimage.',
  marathi: '🙏 जय गोदावरी माई! मी कुंभ आचार्य आहे. नाशिक सिंहस्थ 2027, वैदिक मंत्र किंवा यात्रेबद्दल विचारा.',
  gujarati: '🙏 જય ગોદાવરી માઁ! હું કુંભ આચાર્ય છું. નાશિક સિંહસ્થ 2027, મંત્ર અથવા યાત્રા વિશે પૂછો.',
  bengali:  '🙏 জয় গোদাবরী মাঁ! আমি কুম্ভ আচার্য। নাশিক সিংহস্থ 2027, মন্ত্র বা তীর্থযাত্রা সম্পর্কে জিজ্ঞাসা করুন।',
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
  hindi:    ['🕉 आज का शुभ मंत्र', '🌊 शाही स्नान कब है?', '📿 गायत्री मंत्र बताएं', '🗺 नासिक कैसे पहुंचें?', '🔱 त्र्यंबकेश्वर दर्शन'],
  english:  ["🕉 Today's sacred mantra", '🌊 Shahi Snan 2027 dates', '📿 Godavari mantra', '🗺 How to reach Nashik?', '🔱 Trimbakeshwar darshan'],
  marathi:  ['🕉 आजचा शुभ मंत्र', '🌊 शाही स्नान तारखा 2027', '📿 गोदावरी मंत्र सांगा', '🗺 नाशिकला कसे जायचे?', '🔱 त्र्यंबकेश्वर दर्शन'],
  gujarati: ['🕉 આજનો શુભ મંત્ર', '🌊 શાહી સ્નાન 2027', '📿 ગોદાવરી મંત્ર', '🗺 નાશિક કેવી રીતે જવું?', '🔱 ત્ર્યંબકેશ્વર દર્શન'],
  bengali:  ['🕉 আজকের শুভ মন্ত্র', '🌊 শাহী স্নান 2027', '📿 গোদাবরী মন্ত্র', '🗺 নাশিক কীভাবে যাবেন?', '🔱 ত্র্যম্বকেশ্বর দর্শন'],
}

// ── Time slots: brahma(4-6), pratah(6-12), madhyahna(12-16), sandhya(16-19), ratri(19-28)
function getTimeSlot() {
  const h = new Date().getHours()
  if (h >= 4  && h < 6)  return 'brahma'
  if (h >= 6  && h < 12) return 'pratah'
  if (h >= 12 && h < 16) return 'madhyahna'
  if (h >= 16 && h < 19) return 'sandhya'
  return 'ratri'
}

const TIME_DATA = {
  brahma: {
    label:   { hindi: 'ब्रह्म मुहूर्त', english: 'Brahma Muhurta', marathi: 'ब्रह्म मुहूर्त', gujarati: 'બ્રહ્મ મુહૂર્ત', bengali: 'ব্রহ্ম মুহূর্ত' },
    emoji:   '🌙',
    color:   '#6366f1',
    mantra:  'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
    mantraName: { hindi: 'गायत्री मंत्र', english: 'Gayatri Mantra', marathi: 'गायत्री मंत्र', gujarati: 'ગાયત્રી મંત્ર', bengali: 'গায়ত্রী মন্ত্র' },
    tip: {
      hindi:    '🌙 ब्रह्म मुहूर्त (4–6 AM) — सबसे पवित्र समय। गोदावरी स्नान का सर्वोत्तम काल।',
      english:  '🌙 Brahma Muhurta (4–6 AM) — the holiest time of day. Best for Godavari snan and meditation.',
      marathi:  '🌙 ब्रह्म मुहूर्त (4–6 AM) — दिवसातील सर्वात पवित्र वेळ। गोदावरी स्नानासाठी सर्वोत्तम।',
      gujarati: '🌙 બ્રહ્મ મુહૂર્ત (4–6 AM) — સૌથી પવિત્ર સમય. ગોદાવરી સ્નાન માટે શ્રેષ્ઠ.',
      bengali:  '🌙 ব্রহ্ম মুহূর্ত (4–6 AM) — সবচেয়ে পবিত্র সময়। গোদাবরী স্নানের সেরা সময়।',
    },
    chips: {
      hindi:    ['🌙 ब्रह्म मुहूर्त स्नान विधि', '📿 प्रातः गायत्री जाप', '🔱 त्र्यंबकेश्वर अभिषेक', '🌊 शाही स्नान तिथि', '🗺 नासिक कैसे पहुंचें?'],
      english:  ['🌙 Brahma Muhurta snan ritual', '📿 Morning Gayatri chanting', '🔱 Trimbakeshwar abhishek', '🌊 Shahi Snan 2027 dates', '🗺 How to reach Nashik?'],
      marathi:  ['🌙 ब्रह्म मुहूर्त स्नान विधी', '📿 सकाळी गायत्री जप', '🔱 त्र्यंबकेश्वर अभिषेक', '🌊 शाही स्नान तारखा', '🗺 नाशिकला कसे जायचे?'],
      gujarati: ['🌙 બ્રહ્મ મુહૂર્ત સ્નાન', '📿 ગાયત્રી જાપ', '🔱 ત્ર્યંબકેશ્વર અભિષેક', '🌊 શાહી સ્નાન 2027', '🗺 નાશિક કેવી રીતે?'],
      bengali:  ['🌙 ব্রহ্ম মুহূর্ত স্নান', '📿 গায়ত্রী জপ', '🔱 ত্র্যম্বকেশ্বর অভিষেক', '🌊 শাহী স্নান 2027', '🗺 নাশিক কীভাবে যাবেন?'],
    },
    welcome: {
      hindi:    '🙏 ॐ — ब्रह्म मुहूर्त में स्वागत है। यह स्नान, ध्यान और मंत्र जाप का सर्वोत्तम समय है। पूछें।',
      english:  '🙏 Om — Welcome in the sacred Brahma Muhurta. The best time for snan, meditation, and mantra. How may I guide you?',
      marathi:  '🙏 ॐ — ब्रह्म मुहूर्तात स्वागत आहे. स्नान, ध्यान आणि मंत्र जपाची सर्वोत्तम वेळ.',
      gujarati: '🙏 ૐ — બ્રહ્મ મુહૂર્તમાં સ્વાગત. સ્નાન, ધ્યાન અને મંત્ર જાપ માટે સર્વોત્તમ સમય.',
      bengali:  '🙏 ওঁ — ব্রহ্ম মুহূর্তে স্বাগত। স্নান, ধ্যান ও মন্ত্র জপের সেরা সময়।',
    },
  },
  pratah: {
    label:   { hindi: 'प्रातःकाल', english: 'Morning', marathi: 'सकाळ', gujarati: 'સવાર', bengali: 'প্রভাত' },
    emoji:   '🌅',
    color:   '#f59e0b',
    mantra:  'ॐ सूर्याय नमः',
    mantraName: { hindi: 'सूर्य मंत्र', english: 'Surya Mantra', marathi: 'सूर्य मंत्र', gujarati: 'સૂર્ય મંત્ર', bengali: 'সূর্য মন্ত্র' },
    tip: {
      hindi:    '🌅 प्रातःकाल — सूर्य नमस्कार, गोदावरी आरती और राम दर्शन (पंचवटी) का समय।',
      english:  '🌅 Morning — time for Surya Namaskar, Godavari aarti, and Rama darshan at Panchavati.',
      marathi:  '🌅 सकाळ — सूर्य नमस्कार, गोदावरी आरती आणि पंचवटीत राम दर्शनाची वेळ.',
      gujarati: '🌅 સવાર — સૂર્ય નમસ્કાર, ગોદાવરી આરતી અને રામ દર્શન.',
      bengali:  '🌅 প্রভাত — সূর্য নমস্কার, গোদাবরী আরতি ও পঞ্চবটীতে রাম দর্শনের সময়।',
    },
    chips: {
      hindi:    ['🌅 सूर्य नमस्कार मंत्र', '🏛 रामकुंड स्नान विधि', '📿 गोदावरी मंत्र बताएं', '🌊 शाही स्नान कब है?', '🗺 पंचवटी दर्शन गाइड'],
      english:  ['🌅 Surya Namaskar mantra', '🏛 Ramkund snan ritual', '📿 Godavari mantra', '🌊 Shahi Snan 2027 dates', '🗺 Panchavati darshan guide'],
      marathi:  ['🌅 सूर्य नमस्कार मंत्र', '🏛 रामकुंड स्नान विधी', '📿 गोदावरी मंत्र', '🌊 शाही स्नान तारखा', '🗺 पंचवटी दर्शन'],
      gujarati: ['🌅 સૂર્ય નમસ્કાર', '🏛 રામકુંડ સ્નાન', '📿 ગોદાવરી મંત્ર', '🌊 શાહી સ્નાન 2027', '🗺 પંચવટી દર્શન'],
      bengali:  ['🌅 সূর্য নমস্কার মন্ত্র', '🏛 রামকুণ্ড স্নান', '📿 গোদাবরী মন্ত্র', '🌊 শাহী স্নান 2027', '🗺 পঞ্চবটী দর্শন'],
    },
    welcome: {
      hindi:    '🙏 जय गोदावरी माँ! शुभ प्रभात। रामकुंड स्नान और पंचवटी दर्शन का उत्तम समय है। क्या जानना चाहते हैं?',
      english:  '🙏 Jai Godavari Maa! Good morning. Auspicious time for Ramkund snan and Panchavati darshan. How may I guide you?',
      marathi:  '🙏 जय गोदावरी माई! शुभ प्रभात. रामकुंड स्नान आणि पंचवटी दर्शनाची उत्तम वेळ.',
      gujarati: '🙏 જય ગોદાવરી માઁ! શુભ પ્રભાત. રામકુંડ સ્નાન અને પંચવટી દર્શન માટે ઉત્તમ સમય.',
      bengali:  '🙏 জয় গোদাবরী মাঁ! শুভ প্রভাত। রামকুণ্ড স্নান ও পঞ্চবটী দর্শনের উত্তম সময়।',
    },
  },
  madhyahna: {
    label:   { hindi: 'मध्याह्न', english: 'Afternoon', marathi: 'दुपार', gujarati: 'બપોર', bengali: 'দুপুর' },
    emoji:   '☀️',
    color:   '#d4af37',
    mantra:  'ॐ त्र्यम्बकाय नमः',
    mantraName: { hindi: 'त्र्यंबकेश्वर मंत्र', english: 'Trimbakeshwar Mantra', marathi: 'त्र्यंबकेश्वर मंत्र', gujarati: 'ત્ર્યંબકેશ્વર મંત્ર', bengali: 'ত্র্যম্বকেশ্বর মন্ত্র' },
    tip: {
      hindi:    '☀️ मध्याह्न — त्र्यंबकेश्वर ज्योतिर्लिंग दर्शन, ब्रह्मगिरी ट्रेक और तर्पण का उत्तम समय।',
      english:  '☀️ Afternoon — ideal for Trimbakeshwar Jyotirlinga darshan, Brahmagiri trek, and Tarpan rituals.',
      marathi:  '☀️ दुपार — त्र्यंबकेश्वर ज्योतिर्लिंग दर्शन, ब्रह्मगिरी ट्रेक आणि तर्पण विधीसाठी उत्तम.',
      gujarati: '☀️ બપોર — ત્ર્યંબકેશ્વર જ્યોતિર્લિંગ દર્શન અને ત્ર્પણ માટે ઉત્તમ.',
      bengali:  '☀️ দুপুর — ত্র্যম্বকেশ্বর জ্যোতির্লিঙ্গ দর্শন, ব্রহ্মগিরি ট্রেক এবং তর্পণের সময়।',
    },
    chips: {
      hindi:    ['☀️ तर्पण विधि बताएं', '🔱 त्र्यंबकेश्वर का महत्व', '⛰ ब्रह्मगिरी ट्रेक गाइड', '📿 महामृत्युंजय मंत्र', '🌊 शाही स्नान तिथि 2027'],
      english:  ['☀️ How to do Tarpan', '🔱 Trimbakeshwar significance', '⛰ Brahmagiri trek guide', '📿 Mahamrityunjaya mantra', '🌊 Shahi Snan 2027 dates'],
      marathi:  ['☀️ तर्पण विधी', '🔱 त्र्यंबकेश्वर महत्व', '⛰ ब्रह्मगिरी ट्रेक', '📿 महामृत्युंजय मंत्र', '🌊 शाही स्नान 2027'],
      gujarati: ['☀️ તર્પણ વિધિ', '🔱 ત્ર્યંબકેશ્વર', '⛰ બ્રહ્મગિરી ટ્રેક', '📿 મહામૃત્યુંજય', '🌊 શાહી સ્નાન 2027'],
      bengali:  ['☀️ তর্পণ বিধি', '🔱 ত্র্যম্বকেশ্বর', '⛰ ব্রহ্মগিরি ট্রেক', '📿 মহামৃত্যুঞ্জয় মন্ত্র', '🌊 শাহী স্নান 2027'],
    },
    welcome: {
      hindi:    '🙏 जय गोदावरी माँ! शुभ दोपहर। त्र्यंबकेश्वर दर्शन और तर्पण का उत्तम समय है। पूछें।',
      english:  '🙏 Jai Godavari Maa! Good afternoon. Ideal time for Trimbakeshwar darshan and Tarpan. How may I guide you?',
      marathi:  '🙏 जय गोदावरी माई! शुभ दुपार. त्र्यंबकेश्वर दर्शन आणि तर्पणाची उत्तम वेळ.',
      gujarati: '🙏 જય ગોદાવરી માઁ! શુભ બપોર. ત્ર્યંબકેશ્વર દર્શન અને તર્પણ માટે ઉત્તમ.',
      bengali:  '🙏 জয় গোদাবরী মাঁ! শুভ অপরাহ্ন। ত্র্যম্বকেশ্বর দর্শন ও তর্পণের উত্তম সময়।',
    },
  },
  sandhya: {
    label:   { hindi: 'संध्याकाल', english: 'Sandhya (Evening)', marathi: 'संध्याकाळ', gujarati: 'સંધ્યા', bengali: 'সন্ধ্যা' },
    emoji:   '🌆',
    color:   '#f97316',
    mantra:  'ॐ नमो गोदावर्यै नमः',
    mantraName: { hindi: 'गोदावरी आरती मंत्र', english: 'Godavari Aarti Mantra', marathi: 'गोदावरी आरती मंत्र', gujarati: 'ગોદાવરી આરતી મંત્ર', bengali: 'গোদাবরী আরতি মন্ত্র' },
    tip: {
      hindi:    '🌆 संध्याकाल — गोदावरी घाट पर दीपदान और संध्या आरती का समय। दीये जलाएं और प्रार्थना करें।',
      english:  '🌆 Sandhya time — Godavari ghat Deepdan and evening aarti. Light diyas and offer prayers.',
      marathi:  '🌆 संध्याकाळ — गोदावरी घाटावर दीपदान आणि संध्या आरतीची वेळ.',
      gujarati: '🌆 સંધ્યા — ગોદાવરી ઘાટ પર દીપદાન અને સંધ્યા આરતીનો સમય.',
      bengali:  '🌆 সন্ধ্যা — গোদাবরী ঘাটে দীপদান ও সন্ধ্যা আরতির সময়।',
    },
    chips: {
      hindi:    ['🌆 संध्या आरती कहाँ होती है?', '🪔 दीपदान विधि बताएं', '📿 संध्या वंदन मंत्र', '🌊 शाही स्नान तिथि', '🔱 सीता गुफा दर्शन'],
      english:  ['🌆 Where is Sandhya aarti?', '🪔 Deepdan ritual guide', '📿 Sandhya Vandanam mantra', '🌊 Shahi Snan 2027', '🔱 Sita Gupha darshan'],
      marathi:  ['🌆 संध्या आरती कुठे होते?', '🪔 दीपदान विधी', '📿 संध्या वंदन मंत्र', '🌊 शाही स्नान 2027', '🔱 सीता गुफा'],
      gujarati: ['🌆 સંધ્યા આરતી ક્યાં?', '🪔 દીપદાન', '📿 સંધ્યા વંદન', '🌊 શાહી સ્નાન 2027', '🔱 સીતા ગુફા'],
      bengali:  ['🌆 সন্ধ্যা আরতি কোথায়?', '🪔 দীপদান বিধি', '📿 সন্ধ্যা বন্দনা', '🌊 শাহী স্নান 2027', '🔱 সীতা গুহা'],
    },
    welcome: {
      hindi:    '🙏 जय गोदावरी माँ! शुभ संध्या। गोदावरी आरती और दीपदान का समय। क्या जानना चाहते हैं?',
      english:  '🙏 Jai Godavari Maa! Blessed Sandhya. Time for Godavari aarti and deepdan. How may I guide you?',
      marathi:  '🙏 जय गोदावरी माई! शुभ संध्याकाळ. गोदावरी आरती आणि दीपदानाची वेळ.',
      gujarati: '🙏 જય ગોદાવરી માઁ! શુભ સંધ્યા. ગોદાવરી આરતી અને દીપદાનનો સમય.',
      bengali:  '🙏 জয় গোদাবরী মাঁ! শুভ সন্ধ্যা। গোদাবরী আরতি ও দীপদানের সময়।',
    },
  },
  ratri: {
    label:   { hindi: 'रात्रि', english: 'Night', marathi: 'रात्र', gujarati: 'રાત', bengali: 'রাত্রি' },
    emoji:   '🌕',
    color:   '#8b5cf6',
    mantra:  'ॐ नमः शिवाय',
    mantraName: { hindi: 'शिव पंचाक्षर मंत्र', english: 'Shiva Panchakshara', marathi: 'शिव पंचाक्षर', gujarati: 'શિવ પંચાક્ષર', bengali: 'শিব পঞ্চাক্ষর' },
    tip: {
      hindi:    '🌕 रात्रि — शिव का समय। महामृत्युंजय और ॐ नमः शिवाय जाप से रात्रि की रक्षा होती है।',
      english:  '🌕 Night — sacred time of Lord Shiva. Chanting Mahamrityunjaya and Om Namah Shivaya brings divine protection.',
      marathi:  '🌕 रात्र — शिवाची वेळ. महामृत्युंजय आणि ॐ नमः शिवाय जपाने रात्रीची रक्षा होते.',
      gujarati: '🌕 રાત — શિવનો સમય. મહામૃત્યુંજય અને ૐ નમઃ શિવાય જાપ.',
      bengali:  '🌕 রাত্রি — শিবের সময়। মহামৃত্যুঞ্জয় ও ওঁ নমঃ শিবায় জপে রাত্রির রক্ষা।',
    },
    chips: {
      hindi:    ['🌕 रात्रि का शिव मंत्र', '📿 महामृत्युंजय जाप विधि', '🔱 त्र्यंबकेश्वर रात्रि पूजा', '🌊 अगला शाही स्नान कब?', '😴 शयन मंत्र बताएं'],
      english:  ['🌕 Night Shiva mantra', '📿 Mahamrityunjaya chanting', '🔱 Trimbakeshwar night puja', '🌊 Next Shahi Snan date', '😴 Bedtime prayer mantra'],
      marathi:  ['🌕 रात्रीचा शिव मंत्र', '📿 महामृत्युंजय जप', '🔱 त्र्यंबकेश्वर रात्री पूजा', '🌊 पुढील शाही स्नान', '😴 शयन मंत्र'],
      gujarati: ['🌕 રાત્રિ શિવ મંત્ર', '📿 મહામૃત્યુંજય', '🔱 ત્ર્યંબકેશ્વર રાત્રિ', '🌊 શાહી સ્નાન 2027', '😴 શયન મંત્ર'],
      bengali:  ['🌕 রাত্রির শিব মন্ত্র', '📿 মহামৃত্যুঞ্জয় জপ', '🔱 ত্র্যম্বকেশ্বর রাত্রি', '🌊 শাহী স্নান 2027', '😴 শয়ন মন্ত্র'],
    },
    welcome: {
      hindi:    '🙏 ॐ नमः शिवाय। शुभ रात्रि। शिव का समय है — मंत्र जाप और ध्यान से रात्रि पावन होती है।',
      english:  '🙏 Om Namah Shivaya. Good night. Sacred time of Lord Shiva — mantra chanting and meditation bless the night.',
      marathi:  '🙏 ॐ नमः शिवाय. शुभ रात्र. शिवाची वेळ — मंत्र जप आणि ध्यानाने रात्र पावन होते.',
      gujarati: '🙏 ૐ નમઃ શિવાય. શુભ રાત. શિવનો સમય — મંત્ર જાપ અને ધ્યાન.',
      bengali:  '🙏 ওঁ নমঃ শিবায়। শুভ রাত্রি। শিবের সময় — মন্ত্র জপ ও ধ্যানে রাত পবিত্র হয়।',
    },
  },
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
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('ka_onboarded'))
  const [isPaid, setIsPaid]        = useState(() => user?.isPro || localStorage.getItem('ka_paid') === 'true')
  const [chatsUsed, setChatsUsed]  = useState(() => {
    const d = localStorage.getItem('ka_chats_date')
    const today = new Date().toDateString()
    if (d !== today) { localStorage.setItem('ka_chats_date', today); localStorage.setItem('ka_chats_used', '0'); return 0 }
    return parseInt(localStorage.getItem('ka_chats_used') || '0', 10)
  })
  const endRef   = useRef(null)
  const taRef    = useRef(null)
  const timeSlot = getTimeSlot()
  const td       = TIME_DATA[timeSlot]

  useEffect(() => { setMsgs([{ id: uid(), role: 'bot', text: td.welcome[lang] }]) }, [lang])
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
        body: JSON.stringify({ message: text, language: lang, systemPrompt: SYS[lang], timeSlot, userId: user?.userId || 'guest' }),
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
        body: JSON.stringify({ message: text, language: lang, systemPrompt: SYS[lang], timeSlot, userId: user?.userId || 'guest' }),
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
        {/* Logo + Home button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => onNav?.('landing')} title="Go to Home"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '10px', padding: '6px 10px', color: '#d4af37', fontSize: '16px', cursor: 'pointer', lineHeight: 1, transition: 'all 200ms', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.22)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)' }}>
            🏠
          </button>
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
                  { label: '🏠 Home / Landing', action: () => { setShowMenu(false); onNav?.('landing') }, highlight: true },
                  { label: '👤 My Profile',    action: () => { setShowMenu(false); onNav?.('profile') } },
                  { label: '⚡ Quests',         action: () => { setShowMenu(false); onNav?.('gamification') } },
                  { label: '👥 Community',     action: () => { setShowMenu(false); onNav?.('community') } },
                  { label: '🏆 Leaderboard',   action: () => { setShowMenu(false); onNav?.('leaderboard') } },
                  { label: '💎 Plans',          action: () => { setShowMenu(false); onNav?.('features') } },
                ].map(item => (
                  <button key={item.label} onClick={item.action}
                    style={{ display: 'block', width: '100%', textAlign: 'left', background: item.highlight ? 'rgba(212,175,55,0.08)' : 'transparent', color: item.highlight ? '#d4af37' : '#cbd5e1', border: item.highlight ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent', padding: '9px 10px', fontSize: '13px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms', marginBottom: item.highlight ? '6px' : '0' }}
                    onMouseEnter={e => { e.currentTarget.style.background = item.highlight ? 'rgba(212,175,55,0.15)' : '#252d3d'; e.currentTarget.style.color = '#d4af37' }}
                    onMouseLeave={e => { e.currentTarget.style.background = item.highlight ? 'rgba(212,175,55,0.08)' : 'transparent'; e.currentTarget.style.color = item.highlight ? '#d4af37' : '#cbd5e1' }}>
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
        <div style={{ background: 'linear-gradient(90deg,#1a1f2e,#252d3d)', borderBottom: '1px solid #334155', padding: '8px 16px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ color: '#94a3b8', fontSize: '11px' }}>{lang === 'english' ? '🆓 Free chats today' : '🆓 आज के मुफ्त प्रश्न'}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: remaining > 0 ? '#d4af37' : '#ef4444', fontSize: '11px', fontWeight: '700' }}>
                {remaining}/{FREE_CHAT_LIMIT} {lang === 'english' ? 'left' : 'शेष'}
              </span>
              {remaining === 0
                ? <button onClick={() => setPaywall(true)} className="btn-gold" style={{ padding: '3px 10px', fontSize: '11px', borderRadius: '7px' }}>⭐ Pro</button>
                : <button onClick={() => setPaywall(true)} style={{ background: 'transparent', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '7px', padding: '2px 8px', color: '#64748b', fontSize: '10px', cursor: 'pointer', fontFamily: 'inherit' }}>Upgrade</button>
              }
            </div>
          </div>
          <div style={{ height: '4px', backgroundColor: '#252d3d', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(remaining / FREE_CHAT_LIMIT) * 100}%`, background: remaining > 1 ? 'linear-gradient(to right, #d4af37, #f59e0b)' : remaining === 1 ? '#f97316' : '#ef4444', borderRadius: '2px', transition: 'width 0.5s ease, background 0.5s ease' }} />
          </div>
        </div>
      )}

      {/* ═══ MANTRA OF THE MOMENT ═══ */}
      <div style={{ background: `linear-gradient(90deg, rgba(${td.color === '#d4af37' ? '212,175,55' : td.color === '#f59e0b' ? '245,158,11' : td.color === '#f97316' ? '249,115,22' : td.color === '#8b5cf6' ? '139,92,246' : td.color === '#6366f1' ? '99,102,241' : '139,92,246'},0.12) 0%, transparent 100%)`, borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '9px 16px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <span style={{ fontSize: '16px', flexShrink: 0 }}>{td.emoji}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: td.color, fontSize: '10px', fontWeight: '700', letterSpacing: '0.8px', marginBottom: '2px' }}>
            {td.label[lang].toUpperCase()} · {td.mantraName[lang]}
          </div>
          <div style={{ color: '#e2e8f0', fontSize: '12px', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {td.mantra}
          </div>
        </div>
        <button onClick={() => sendChip(td.tip[lang])} style={{ flexShrink: 0, backgroundColor: `${td.color}18`, border: `1px solid ${td.color}40`, borderRadius: '8px', padding: '4px 9px', color: td.color, fontSize: '10px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
          {lang === 'english' ? 'GUIDE' : 'जानें'}
        </button>
      </div>

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
              {td.chips[lang].map((chip, i) => (
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

      {/* ═══ ONBOARDING ═══ */}
      {showOnboarding && (
        <OnboardingTutorial onDone={() => { localStorage.setItem('ka_onboarded', '1'); setShowOnboarding(false) }} />
      )}

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
