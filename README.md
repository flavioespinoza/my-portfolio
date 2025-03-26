# Flavio Espinoza – Portfolio

A developer portfolio built with Next.js 15, React 19, Tailwind CSS, and Chart.js.  
Includes full-stack LLM-powered projects, a Git commit tracker, and responsive UI components.

## 🌐 Live Preview

**[my-portfolio.vercel.app](https://my-portfolio-lt8gin5a0-flavio-espinozas-projects.vercel.app)**

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

- **Next.js 15 (App Router)**
- **React 19**
- **Tailwind CSS 4**
- **Zustand**
- **Chart.js + react-chartjs-2**
- **Day.js** for date logic
- **PapaParse** for CSV exports

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

### 🧠 Job Search Focus

#### 📂 1. AI/Frontend Portfolio Projects
- [ ] Add README and source links to `/projects`
- [ ] Include screen recordings or interactive demos
- [ ] Add “what I used” stack badges + links to GitHub

#### 🧠 2. Target AI-Focused Job Roles
- [ ] Write a blurb for “AI Prompt Engineer / AI Frontend Dev”
- [ ] Add to resume and README (possible `/ai.md` page)
- [ ] Write 2 short paragraphs you could use in cold emails or cover letters

#### 💼 3. Application System
- [ ] Build or repurpose a Notion or spreadsheet tracker
- [ ] Add columns: company, title, role type, status, contact
- [ ] Add filtering for Remote, US-based, SLC metro

#### 📝 4. Prepare for Outreach
- [ ] Write your go-to LinkedIn message for recruiters
- [ ] Create templated email for reaching out to startups or AI companies
- [ ] (Optional) Set up a contact form auto-responder that thanks visitors

#### 5. Portfolio / Other
- [ ] Hook up contact form to Formspree endpoint
- [ ] Add spam protection (honeypot or ReCAPTCHA)
- [ ] Show success/failure toast when submitting the form

#### 6. Complete
- [x] Add next-theme to app/layout.tsx
- [x] Polish the `/about` page layout and spacing
- [x] Add global navigation bar (Home, Projects, Commits, About)
- [x] Verify Auto Deploy the site to Vercel when `main` changes
- [x] Auto Deploy the site to Vercel when `main` changes
- [x] Add favicon, metadata, and Open Graph image
- [x] Make `all-commits.json` downloadable or viewable via route
- [x] Add a simple `/contact` page with email or social links
