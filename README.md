# Flavio Espinoza – Portfolio

A developer portfolio built with Next.js 15, React 19, Tailwind CSS, and Chart.js.  
Includes full-stack LLM-powered projects, a Git commit tracker, and responsive UI components.

## 🌐 Live Preview

**[Live Preview on Vercel](https://my-portfolio-lt8gin5a0-flavio-espinozas-projects.vercel.app)**

---

## 🚀 Getting Started

```bash
git clone https://github.com/flavioespinoza/my-portfolio.git
cd my-portfolio
yarn install
yarn dev
```

---

## 🧰 Tech Stack

- **[Next.js 15 (App Router)](https://nextjs.org/docs/app)**
- **[React 19](https://react.dev)**
- **[Tailwind CSS 3](https://tailwindcss.com)**
- **[Fluid Tailwind](https://fluid.tw/#basic-usage)**
- **[Zustand](https://zustand-demo.pmnd.rs)**
- **[Chart.js](https://www.chartjs.org)**
- **[Day.js](https://day.js.org)** for date logic
- **[PapaParse](https://www.papaparse.com)** for CSV exports

---

## 📊 Features

- AI Chat Assistant (GPT-4o)
- LLM-powered Data Visualizer
- GitHub commit tracker with search + charting
- CSV export of filtered results
- Dark/light theme-ready layout
- Fully responsive with mobile nav
- URL-persistent filters

---

## 📦 Deploy to Vercel

This project is deployed with [Vercel](https://vercel.com/).

```bash
vercel --prod
```

- Run from: `/Users/flavio/Documents/Portfolio/my-portfolio`
- Make sure you're logged into Vercel (`vercel login`)

---

## 🔧 TODO (Next Priorities)

### 🧠 Portfolio and Projects Focus

- [x] ✅ Fix `/projects` page — `ai-chat-assistant` not displaying
- [x] ✅ Fix `/projects` page — `ai-llm-data-visualizer` not displaying
- [x] ✅ Make sticky header background opaque
- [x] ✅ Migrate bless-ui to salsa-ui
- [x] ✅ Ensure all buttons have cursor-pointer and default to variant="outline"
- [x] ✅ Hook up contact form to Formspree endpoint
- [x] ✅ Add spam protection (honeypot)
- [x] ✅ Show success/failure message when submitting the form
- [x] ✅ Fix light/dark th eme (needs to work with salsa-ui) and make button square
- [x] ✅ Apply sage and hotpink to all @flavioespinoza/salsa-ui Button with variant default
- [x] ✅ Redesign @flavioespinoza/salsa-ui input
- [x] ✅ Redo all docs for salsa-ui
- [x] ✅ Changed bar/pie chart to stacked-bar/pie in pure d3.js
- [x] ✅ 
- [x] ✅ 

- [ ] ⏳ Apply sage and hotpink to all @flavioespinoza/salsa-ui components (checkbox, buttonVariants, etc.)
- [ ] ⏳ Update Header and Header-Mobile and docs in salsa-ui
- [ ] ⏳ input-and-button-from-youtube.png
- [ ] ⏳ 
- [ ] ⏳
- [ ] ⏳

### 🤖 AI Chat Assistant: Project Improvements Checklist

- [x] ✅ Deployed live to Vercel
- [x] ✅ Theme toggle (light/dark) using `next-themes`
- [x] ✅ Zustand store for chat message history
- [x] ✅ Input + button UI using `shadcn/ui`
- [x] ✅ Graceful API error handling
- [x] ✅ API call to OpenAI Chat API (`gpt-4o`)
- [x] ✅ Messages persist visually in session
- [x] ✅ Assistant replies formatted clearly
- [x] ✅ Loading indicator while awaiting response
- [x] ✅ Mobile responsive layout
- [x] ✅ Embedded in `/projects` page via `<iframe>`
- [x] ✅ Default light theme
- [x] ✅ Optional: Save chat state in Zustand persist
- [x] ✅ Improve formatting for long replies (Markdown, code blocks)
- [x] ✅ Provide option to use key + enter to send chat or enter key only - if enter key only you will need to provide a shift + enter for new line
- [x] ✅ Add checkbox to salsa-ui
- [ ] ⏳
- [ ] ⏳

### 🧠 Job Search Focus

#### 📂 1. AI/Frontend Portfolio Projects

- [ ] ⏳ Add README and source links to `/projects`
- [ ] ⏳ Include screen recordings or interactive demos
- [ ] ⏳ Add “what I used” stack badges + links to GitHub

#### 🧠 2. Target AI-Focused Job Roles

- [ ] ⏳ Write a blurb for “AI Prompt Engineer / AI Frontend Dev”
- [ ] ⏳ Add to resume and README (possible `/ai.md` page)
- [ ] ⏳ Write 2 short paragraphs you could use in cold emails or cover letters

#### 💼 3. Application System

- [ ] ⏳ Build or repurpose a Notion or spreadsheet tracker
- [ ] ⏳ Add columns: company, title, role type, status, contact
- [ ] ⏳ Add filtering for Remote, US-based, SLC metro

#### 📝 4. Prepare for Outreach

- [ ] ⏳ Write your go-to LinkedIn message for recruiters
- [ ] ⏳ Create templated email for reaching out to startups or AI companies
- [ ] ⏳ (Optional) Set up a contact form auto-responder that thanks visitors

---

### 📝 5. Other Tasks Completed

- [x] ✅ Add `next-themes` to `app/layout.tsx`
- [x] ✅ Polish the `/about` page layout and spacing
- [x] ✅ Add global navigation bar (Home, Projects, Commits, About)
- [x] ✅ Auto deploy the site to Vercel when `main` changes
- [x] ✅ Add favicon, metadata, and Open Graph image
- [x] ✅ Make `all-commits.json` downloadable or viewable via route
- [x] ✅ Add a simple `/contact` page with email or social links

### 6. Not sure if needed

- [ ] ⏳ Add usage logging or metrics
