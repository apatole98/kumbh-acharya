# 🕉 कुंभ आचार्य | Kumbh Acharya

**AI-powered spiritual guide for Kumbh Mela pilgrims.**  
Ask questions about Vedic mantras, bathing rituals, pilgrimage routes, and Kumbh traditions — in Hindi, English, Marathi, Gujarati, or Bengali.

---

## Features

- 🗣 **5 Languages** — Hindi, English, Marathi, Gujarati, Bengali
- 💬 **Conversational AI** — Powered by Claude 3.5 Sonnet
- 🆓 **Free Tier** — 3 questions per day
- 💳 **Paid Tier** — ₹99/month for unlimited access
- 📱 **Mobile-First** — Optimized for phone screens
- ⚡ **Serverless** — Zero-config Netlify deployment

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# 3. Run locally
npm run start
# Opens at http://localhost:3000
```

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18 + Vite 5                 |
| Backend    | Netlify Functions (serverless)    |
| AI         | Anthropic Claude 3.5 Sonnet       |
| Payments   | Razorpay (Phase 2)                |
| Database   | Supabase (Phase 2)                |
| Deploy     | Netlify                           |

## Deployment to Netlify

### Option A — Drag & Drop
```bash
npm run build
# Drag the dist/ folder to netlify.com/drop
```

### Option B — Git Deploy
1. Push this repo to GitHub
2. Connect repo in Netlify dashboard
3. Build settings auto-detected from `netlify.toml`
4. Add `ANTHROPIC_API_KEY` in Netlify → Site Settings → Environment Variables
5. Deploy!

## Environment Variables

| Variable               | Required | Description                        |
|------------------------|----------|------------------------------------|
| `ANTHROPIC_API_KEY`    | ✅ Yes   | Get from console.anthropic.com     |
| `VITE_RAZORPAY_KEY_ID` | Phase 2  | Razorpay dashboard                 |
| `VITE_SUPABASE_URL`    | Phase 2  | Supabase project URL               |

## Revenue Model

- **Free** — 3 questions/day (localStorage-based)
- **₹99/month** — Unlimited (payment via Razorpay, tracked in Supabase)

## Project Structure

```
kumbh-acharya/
├── src/
│   ├── kumbh-acharya.jsx   # Main chat component
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── netlify/functions/
│   └── claude-api.js       # Serverless API handler
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── vite.config.js
└── netlify.toml
```

## License

MIT — build freely, spread dharma 🙏
