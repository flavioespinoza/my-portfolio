'use client'

import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart, LinearScale, Tooltip } from 'chart.js'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import Papa from 'papaparse'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip)
dayjs.extend(weekOfYear)

interface CommitData {
	project: string
	branch: string
	date: string
	author: string
	message: string
}

const isCommitData = (data: unknown): data is CommitData => {
	return (
		typeof data === 'object' &&
		data !== null &&
		'project' in data &&
		'branch' in data &&
		'date' in data &&
		'author' in data &&
		'message' in data
	)
}

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

function getBarLabels(data: Commit[], unit: 'day' | 'month' | 'week' | 'year') {
	const grouped: Record<string, number> = {}
	data.forEach((c) => {
		const key = formatGroupKey(c.date, unit)
		grouped[key] = (grouped[key] || 0) + 1
	})
	return Object.keys(grouped)
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
			.then((data) => {
				const commitsData = data.filter(isCommitData)
				setCommits(commitsData)
			})
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

	function getBarCounts(filtered: Commit[], groupBy: string): number[] {
		const grouped: Record<string, number> = {}
		filtered.forEach((commit) => {
			const key = formatGroupKey(commit.date, groupBy as 'day' | 'month' | 'week' | 'year')
			grouped[key] = (grouped[key] || 0) + 1
		})
		return Object.values(grouped)
	}
	return (
		<main className="mx-auto max-w-6xl space-y-6 p-6">
			<h1 className="text-3xl font-bold">GitHub Contributions</h1>

			<div className="mb-2 flex flex-wrap justify-end gap-4 text-right text-sm">
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
						className="rounded border p-1 text-sm"
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
						className="rounded border p-1 text-sm"
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
				className="mb-4 w-full rounded border border-muted p-2 text-sm"
			/>

			<div className="my-6">
				<Bar
					data={{
						labels: getBarLabels(filtered, groupBy),
						datasets: [
							{
								label: 'Commits',
								data: getBarCounts(filtered, groupBy),
								backgroundColor: 'hsl(200 38% 48%)',
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
					className="mt-2 block text-sm text-blue-500 underline"
				>
					Export Filtered Results as CSV
				</a>
			)}

			<a
				href="/api/commits"
				target="_blank"
				rel="noopener noreferrer"
				className="mt-4 block text-sm text-blue-500 underline"
			>
				View or download all-commits.json
			</a>

			<table className="w-full table-auto overflow-hidden rounded-lg border border-border text-sm shadow-sm">
				<thead>
					<tr className="bg-muted text-xs font-semibold uppercase tracking-wide text-muted-foreground">
						<th className="px-3 py-2 text-left">Date</th>
						<th className="px-3 py-2 text-left">Project</th>
						<th className="px-3 py-2 text-left">Branch</th>
						<th className="px-3 py-2 text-left">Author</th>
						<th className="px-3 py-2 text-left">Message</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border">
					{filtered.map((commit, i) => (
						<tr key={i} className="border-b">
							<td className="px-3 py-2">{commit.date}</td>
							<td className="px-3 py-2">{commit.project}</td>
							<td className="px-3 py-2">{commit.branch}</td>
							<td className="px-3 py-2">{commit.author}</td>
							<td
								className="whitespace-pre-wrap px-3 py-2"
								dangerouslySetInnerHTML={{ __html: highlight(commit.message, search) }}
							/>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	)
}
