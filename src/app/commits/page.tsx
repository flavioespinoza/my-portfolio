'use client'

import { useCallback, useEffect, useState } from 'react'
import { MorphingChart } from '@/components/ui/morphing-chart'
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

function getStackedBarData(commits: Commit[]) {
	const projects: Record<string, number> = {}
	commits.forEach((commit) => {
		const project = commit.project
		if (!projects[project]) {
			projects[project] = 0
		}
		projects[project]++
	})

	const datasets = Object.keys(projects).map((project) => {
		return {
			label: project,
			data: commits
				.filter((commit) => commit.project === project)
				.map((commit) => ({ x: commit.date, y: 1 })),
			backgroundColor: '#f07a5d' // or some other color
		}
	})

	const labels = Array.from(new Set(commits.map((commit) => commit.date)))

	return {
		labels,
		datasets
	}
}

export default function CommitsPage() {
	const [filtered, setFiltered] = useState<Commit[]>([])
	const [csvUrl, setCsvUrl] = useState('')
	const [search, setSearch] = useState('')
	const [groupBy, setGroupBy] = useState<'day' | 'month' | 'week' | 'year'>('day')
	const [projectFilter, setProjectFilter] = useState('all')

	const getFiltered = useCallback(
		(filtered: CommitData[]): Commit[] => {
			console.log('getFiltered', filtered)
			setFiltered(filtered)
			return filtered
		},
		[filtered, search, groupBy, projectFilter]
	)

	useEffect(() => {
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
	}, [filtered])

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
						{[...new Set(filtered.map((c) => c.project))].sort().map((p) => (
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
				<MorphingChart {...{ projectFilter, search, groupBy, getFiltered }} />
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
