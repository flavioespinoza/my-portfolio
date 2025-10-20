'use client'

import { useCallback, useEffect, useState } from 'react'
import { MorphingChart } from '@flavioespinoza/salsa-ui'
import Papa from 'papaparse'

interface CommitData {
	project: string
	branch: string
	date: string
	author: string
	message: string
}

interface Commit {
	project: string
	branch: string
	date: string
	author: string
	message: string
}

function highlight(text: string, keyword: string) {
	if (!keyword) return text
	const regex = new RegExp(`(${keyword})`, 'gi')
	return text.replace(regex, '<mark>$1</mark>')
}

export default function CommitsPage() {
	const [filtered, setFiltered] = useState<Commit[]>([])
	const [csvUrl, setCsvUrl] = useState('')
	const [search, setSearch] = useState('')
	const [groupBy, setGroupBy] = useState<'day' | 'month' | 'week' | 'year'>('day')
	const [projectFilter, setProjectFilter] = useState('all')

	// Define getFiltered without filtered in dependencies
	const getFiltered = useCallback(
		(filteredCommits: CommitData[]): Commit[] => {
			console.log('getFiltered called')
			setFiltered(filteredCommits)
			return filteredCommits
		},
		[search, projectFilter]
	)

	// Generate CSV URL when filtered commits change
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
		const newUrl = URL.createObjectURL(blob)
		setCsvUrl(newUrl)

		// Cleanup previous URL
		return () => {
			URL.revokeObjectURL(newUrl)
		}
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
							const val = e.target.value as 'day' | 'month' | 'week' | 'year'
							setGroupBy(val)
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
					className="mt-2 block text-sm text-cblue-500 underline"
				>
					Export Filtered Results as CSV
				</a>
			)}

			<a
				href="/api/commits"
				target="_blank"
				rel="noopener noreferrer"
				className="mt-4 block text-sm text-cblue-500 underline"
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
