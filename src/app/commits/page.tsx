'use client'

import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js"
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip)
import React from "react"
import Papa from "papaparse"
import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
dayjs.extend(weekOfYear)

interface Commit {
  project: string
  branch: string
  date: string
  author: string
  message: string
}

import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
dayjs.extend(weekOfYear)
function formatGroupKey(date: string, unit: "day" | "month" | "week" | "year") {
  const d = dayjs(date)
  switch (unit) {
    case "day": return d.format("MMM D, YYYY")
    case "month": return d.format("MMM YYYY")
    case "week": return "Week " + d.week() + " " + d.year()
    case "year": return d.format("YYYY")
  }
}
  const parts = date.split(" ")
  return unit === "day" ? parts.slice(0, 3).join(" ") : parts.slice(1, 2).join(" ") + " " + parts[4]
}
function getBarLabels(data: Commit[], unit: "day" | "month" | "week" | "year"): string[] {
  const grouped = {} as Record<string, number>
  data.forEach((c) => {
    const key = formatGroupKey(c.date, unit)
    grouped[key] = (grouped[key] || 0) + 1
  })
  return Object.keys(grouped)
}

function getBarCounts(data: Commit[], unit: "day" | "month" | "week" | "year"): number[] {
  const grouped = {} as Record<string, number>
  data.forEach((c) => {
    const key = formatGroupKey(c.date, unit)
    grouped[key] = (grouped[key] || 0) + 1
  })
  return Object.values(grouped)
}
function highlight(text: string, keyword: string) {
  if (!keyword) return text
  const regex = new RegExp(`(${keyword})`, "gi")
  return text.replace(regex, "<mark>$1</mark>")
}
export default function CommitsPage() {
  const [commits, setCommits] = useState<Commit[]>([])
import { Bar } from "react-chartjs-2"
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js"
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip)
const [search, setSearch] = useState("")
import { Bar } from "react-chartjs-2"
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js"
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip)
const filtered = commits
  .filter((c) => (projectFilter === "all" || c.project === projectFilter) && JSON.stringify(c).toLowerCase().includes(search.toLowerCase()))
  .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
setFiltered(filtered)
const csv = Papa.unparse(filtered.map(({ project, branch, date, author, message }) => ({ project, branch, date, author, message })))
const blob = new Blob([csv], { type: "text/csv" })
setCsvUrl(URL.createObjectURL(blob))
import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
dayjs.extend(weekOfYear)

  useEffect(() => {
  const searchParam = new URLSearchParams(window.location.search).get("search")
  if (searchParam) setSearch(searchParam)
  const params = new URLSearchParams(window.location.search)
  const initialProject = params.get("project")
  const initialGroupBy = params.get("groupBy")
  if (initialProject) setProjectFilter(initialProject)
  if (initialGroupBy) setGroupBy(initialGroupBy as any)
import React from "react"
import Papa from "papaparse"
    fetch('/commits/all-commits.json')
      .then((res) => res.json())
      .then((data) => setCommits(data))
      .catch((err) => console.error('Failed to load commits:', err))
  }, [])

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">GitHub Contributions</h1>
<div className="text-sm mb-2 text-right">
<label className="mr-2">Project</label>
onChange={(e) => {
  const val = e.target.value;
  setProjectFilter(val);
  const url = new URL(window.location.href);
  url.searchParams.set("project", val);
  window.history.replaceState(null, "", url.toString())
}}
  <option value="all">All</option>
  {[...new Set(commits.map((c) => c.project))].sort().map((p) => (
    <option key={p} value={p}>{p}</option>
  ))}
</select>
  <label className="mr-2">Group by</label>
onChange={(e) => {
  const val = e.target.value;
  setGroupBy(val as any);
  const url = new URL(window.location.href);
  url.searchParams.set("groupBy", val);
  window.history.replaceState(null, "", url.toString())
}}
    <option value="day">Day</option>
    <option value="month">Month</option>
    <option value="week">Week</option>
    <option value="year">Year</option>
  </select>
</div>
<div className="my-6">
  <Bar
    data={{
      labels: getBarLabels(filtered, groupBy),
      datasets: [{
        label: "Commits per Day",
        data: getBarCounts(filtered, groupBy),
        backgroundColor: "#4f46e5"
      }]
    }}
    options={{
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }}
    height={100}
  />
</div>
{csvUrl && (
  <a
    href={csvUrl}
    download="filtered-commits.csv"
    className="text-sm underline text-blue-500 block mt-2"
  >
    Export Filtered Results as CSV
  </a>
)}
`<input
  type="text"
  placeholder="Search commits..."
  value={search}
onChange={(e) => {
  const val = e.target.value;
  setSearch(val);
  const url = new URL(window.location.href);
  url.searchParams.set("search", val);
  window.history.replaceState(null, "", url.toString())
}}
  className="border border-muted p-2 rounded w-full mb-4 text-sm"
/>`,
      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-3">Date</th>
            <th className="text-left py-2 px-3">Project</th>
            <th className="text-left py-2 px-3">Branch</th>
            <th className="text-left py-2 px-3">Author</th>
            <th className="text-left py-2 px-3">Message</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((commit, i) => (
            <tr key={i} className="border-b">
              <td className="py-1 px-3">{commit.date}</td>
              <td className="py-1 px-3">{commit.project}</td>
              <td className="py-1 px-3">{commit.branch}</td>
              <td className="py-1 px-3">{commit.author}</td>
<td className="py-1 px-3 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlight(commit.message, search) }} />
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
