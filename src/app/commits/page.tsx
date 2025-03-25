'use client'

import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { Bar } from 'react-chartjs-2'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip)
dayjs.extend(weekOfYear)

interface Commit {
  project: string
  branch: string
  date: string
  author: string
  message: string
}

function formatGroupKey(date: string, unit: 'day' | 'month' | 'week' | 'year') {
  const d = dayjs(date)
  switch (unit) {
    case 'day':
      return d.format('MMM D, YYYY')
    case 'month':
      return d.format('MMM YYYY')
    case 'week':
      return `Week ${d.week()} ${d.year()}`
    case 'year':
      return d.format('YYYY')
  }
}

function getBarLabels(data: Commit[], unit: 'day' | 'month' | 'week' | 'year'): string[] {
  const grouped: Record<string, number> = {}
  data.forEach((c) => {
    const key = formatGroupKey(c.date, unit)
    grouped[key] = (grouped[key] || 0) + 1
  })
  return Object.keys(grouped)
}

function getBarCounts(data: Commit[], unit: 'day' | 'month' | 'week' | 'year'): number[] {
  const grouped: Record<string, number> = {}
  data.forEach((c) => {
    const key = formatGroupKey(c.date, unit)
    grouped[key] = (grouped[key] || 0) + 1
  })
  return Object.values(grouped)
}

function highlight(text: string, keyword: string) {
  if (!keyword) return text
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

export default function CommitsPage() {
  const [commits, setCommits] = useState<Commit[]>([])
  const [filtered, setFiltered] = useState<Commit[]>([])
  const [csvUrl, setCsvUrl] = useState('')
  const [search, setSearch] = useState('')
  const [groupBy, setGroupBy] = useState<'day' | 'month' | 'week' | 'year'>('day')
  const [projectFilter, setProjectFilter] = useState('all')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const initialSearch = params.get('search')
    const initialProject = params.get('project')
    const initialGroupBy = params.get('groupBy')

    if (initialSearch) setSearch(initialSearch)
    if (initialProject) setProjectFilter(initialProject)
    if (initialGroupBy) setGroupBy(initialGroupBy as any)

    fetch('/commits/all-commits.json')
      .then((res) => res.json())
      .then((data) => setCommits(data))
      .catch((err) => console.error('Failed to load commits:', err))
  }, [])

  useEffect(() => {
    const filtered = commits
      .filter(
        (c) =>
          (projectFilter === 'all' || c.project === projectFilter) &&
          JSON.stringify(c).toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())

    setFiltered(filtered)

    const csv = Papa.unparse(
      filtered.map(({ project, branch, date, author, message }) => ({
        project,
        branch,
        date,
        author,
        message
      }))
    )
    const blob = new Blob([csv], { type: 'text/csv' })
    setCsvUrl(URL.createObjectURL(blob))
  }, [commits, search, projectFilter, groupBy])

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">GitHub Contributions</h1>

      <div className="text-sm mb-2 text-right flex flex-wrap justify-end gap-4">
        <div>
          <label className="mr-2">Project</label>
          <select
            value={projectFilter}
            onChange={(e) => {
              const val = e.target.value
              setProjectFilter(val)
              const url = new URL(window.location.href)
              url.searchParams.set('project', val)
              window.history.replaceState(null, '', url.toString())
            }}
            className="border rounded p-1 text-sm"
          >
            <option value="all">All</option>
            {[...new Set(commits.map((c) => c.project))].sort().map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2">Group by</label>
          <select
            value={groupBy}
            onChange={(e) => {
              const val = e.target.value
              setGroupBy(val as any)
              const url = new URL(window.location.href)
              url.searchParams.set('groupBy', val)
              window.history.replaceState(null, '', url.toString())
            }}
            className="border rounded p-1 text-sm"
          >
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search commits..."
        value={search}
        onChange={(e) => {
          const val = e.target.value
          setSearch(val)
          const url = new URL(window.location.href)
          url.searchParams.set('search', val)
          window.history.replaceState(null, '', url.toString())
        }}
        className="border border-muted p-2 rounded w-full mb-4 text-sm"
      />

      <div className="my-6">
        <Bar
          data={{
            labels: getBarLabels(filtered, groupBy),
            datasets: [
              {
                label: 'Commits',
                data: getBarCounts(filtered, groupBy),
                backgroundColor: '#4f46e5'
              }
            ]
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

      <table className="w-full table-auto border text-sm border-border rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-muted text-muted-foreground font-semibold text-xs uppercase tracking-wide">
            <th className="text-left py-2 px-3">Date</th>
            <th className="text-left py-2 px-3">Project</th>
            <th className="text-left py-2 px-3">Branch</th>
            <th className="text-left py-2 px-3">Author</th>
            <th className="text-left py-2 px-3">Message</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {filtered.map((commit, i) => (
            <tr key={i} className="border-b">
              <td className="py-2 px-3">{commit.date}</td>
              <td className="py-2 px-3">{commit.project}</td>
              <td className="py-2 px-3">{commit.branch}</td>
              <td className="py-2 px-3">{commit.author}</td>
              <td
                className="py-2 px-3 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: highlight(commit.message, search) }}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
