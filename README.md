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

- [ ] Add next-theme to app/layout.tsx
- [ ] Polish the `/about` page layout and spacing
- [ ] Add global navigation bar (Home, Projects, Commits, About)
- [ ] Deploy the site to Vercel or Netlify
- [ ] Add favicon, metadata, and Open Graph image
- [ ] Make `all-commits.json` downloadable or viewable via route
- [ ] Add a simple `/contact` page with email or social links
- [ ] Hook up the contact form to Formspree, Resend, or custom API route
- [ ] Add spam protection (honeypot or ReCAPTCHA)
- [ ] Show success/failure toast when submitting the form
