# Setup Guide — Kumbh Acharya

## Step 1: Prerequisites

- Node.js 18+ installed (`node -v`)
- npm 9+ (`npm -v`)
- A free Anthropic account

## Step 2: Get Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up / Log in
3. Click **API Keys** → **Create Key**
4. Copy the key (starts with `sk-ant-...`)
5. Add $5 credits (minimum) for testing

## Step 3: Local Setup

```bash
# Clone or download the project
cd kumbh-acharya

# Install all dependencies
npm install

# Create local env file
cp .env.example .env.local

# Edit .env.local
nano .env.local
# Set: ANTHROPIC_API_KEY=sk-ant-v1-your-key-here
```

## Step 4: Run Locally

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) — you should see the Kumbh Acharya chat interface.

Test it: type a question like "कुंभ मेला कब होता है?" and press Enter.

## Step 5: Deploy to Netlify

### First-time setup:
1. Push to GitHub (see below)
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click **Add new site** → **Import from Git**
4. Connect GitHub, select `kumbh-acharya` repo
5. Build settings are auto-filled from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
6. Click **Deploy site**
7. Go to **Site configuration** → **Environment variables**
8. Add `ANTHROPIC_API_KEY` = your key
9. **Trigger redeploy** (required after adding env vars)

Your site is live at `https://your-site-name.netlify.app`

## Step 6: Push to GitHub

```bash
cd kumbh-acharya
git init
git add .
git commit -m "Initial Kumbh Acharya MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kumbh-acharya.git
git push -u origin main
```

---

## Phase 2: Add Razorpay Payments

1. Create account at [razorpay.com](https://razorpay.com)
2. Get Test Key ID from Dashboard → Settings → API Keys
3. Add to `.env.local`: `VITE_RAZORPAY_KEY_ID=rzp_test_xxx`
4. Replace demo payment button with Razorpay checkout

## Phase 3: Add Supabase (User Auth + Usage Tracking)

1. Create project at [supabase.com](https://supabase.com)
2. Get URL and anon key from Settings → API
3. Add to `.env.local`
4. Create `users` and `chat_usage` tables
5. Replace localStorage tracking with database calls

---

## Troubleshooting

### "API key not configured"
→ Add `ANTHROPIC_API_KEY` to Netlify env vars and redeploy.

### "Invalid API key"
→ Check the key starts with `sk-ant-` and was copied correctly.

### "Rate limit reached"
→ Wait 60 seconds and try again. Add more credits if persistent.

### Functions not working locally
→ Use `netlify dev` instead of `npm run start` for full function support.
   Install Netlify CLI: `npm install -g netlify-cli`
   Then: `netlify dev`

### Build fails
→ Make sure Node.js 18+ is installed: `node -v`
→ Delete `node_modules/` and run `npm install` again.
