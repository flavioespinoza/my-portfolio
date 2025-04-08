'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

type Commit = {
	date: string
	project: string
}

function MorphingChart() {
	const svgRef = useRef<SVGSVGElement | null>(null)
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const [data, setData] = useState<Commit[]>([])
	const [dimensions, setDimensions] = useState({ width: 960, height: 300 })
	const [showingPie, setShowingPie] = useState(false)

	useEffect(() => {
		if (!data.length) return

		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const width = entry.contentRect.width
				setDimensions({ width, height: 300 })
			}
		})
		if (wrapperRef.current) resizeObserver.observe(wrapperRef.current)
		return () => resizeObserver.disconnect()
	}, [data])

	useEffect(() => {
		fetch('/commits/all-commits.json')
			.then((res) => res.json())
			.then(setData)
	}, [])

	useEffect(() => {
		if (!data.length) return

		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const { width, height } = entry.contentRect
				setDimensions({ width, height })
			}
		})
		if (wrapperRef.current) resizeObserver.observe(wrapperRef.current)
		return () => resizeObserver.disconnect()
	}, [data])

	useEffect(() => {
		if (!data.length || !svgRef.current) return

		const svg = d3.select(svgRef.current).attr('height', 100)
		svg.selectAll('*').remove()

		const grouped: Record<string, Record<string, number>> = {}
		data.forEach((commit) => {
			const date = new Date(commit.date).toISOString().split('T')[0]
			if (!grouped[date]) grouped[date] = {}
			if (!grouped[date][commit.project]) grouped[date][commit.project] = 0
			grouped[date][commit.project]++
		})

		const projects = Array.from(new Set(data.map((d) => d.project)))
		const dates = Object.keys(grouped).sort()
		const stackedData = dates.map((date) => {
			const entry: any = { date }
			projects.forEach((p) => (entry[p] = grouped[date][p] || 0))
			return entry
		})

		const totalsByProject = projects.map((project) => ({
			project,
			total: d3.sum(stackedData, (d) => d[project])
		}))
		const totalCommits = d3.sum(totalsByProject, (d) => d.total)

		const { width, height } = dimensions
		const margin = { top: 30, right: 30, bottom: 50, left: 50 }
		const innerWidth = width - margin.left - margin.right
		const innerHeight = height - margin.top - margin.bottom

		const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

		const x = d3.scaleBand().domain(dates.slice().reverse()).range([0, innerWidth]).padding(0.1)
		const y = d3.scaleLinear().range([innerHeight, 0])
		const color = d3.scaleOrdinal(d3.schemeCategory10).domain(projects)

		const stack = d3.stack().keys(projects)
		const layers = stack(stackedData)
		y.domain([0, d3.max(layers[layers.length - 1], (d) => d[1])!])

		const tooltip = d3
			.select('body')
			.append('div')
			.attr('id', 'tooltip')
			.style('position', 'absolute')
			.style('background', '#fff')
			.style('border', '1px solid #ccc')
			.style('padding', '10px')
			.style('border-radius', '4px')
			.style('font-size', '13px')
			.style('pointer-events', 'none')
			.style('opacity', 0)
			.style('box-shadow', '0 2px 6px rgba(0,0,0,0.2)')

		const barsGroup = g.append('g')

		barsGroup
			.selectAll('g')
			.data(layers)
			.join('g')
			.attr('fill', (d) => color(d.key)!)
			.selectAll('rect')
			.data((d) => d.map((v) => ({ ...v, key: d.key })))
			.join('rect')
			.attr('x', (d) => x(String(d.data.date))!)
			.attr('y', (d) => y(d[1]))
			.attr('height', (d) => y(d[0]) - y(d[1]))
			.attr('width', x.bandwidth())
			.attr('class', 'bar')
			.attr('opacity', 0)
			.style('cursor', 'crosshair')
			.on('mouseover', function (event: MouseEvent, d: any) {
				const date = d.data.date
				const total = d3.sum(projects, (p) => d.data[p])
				const content = projects
					.filter((p) => d.data[p] > 0)
					.map((p) => {
						const pct = ((d.data[p] / total) * 100).toFixed(1)
						return `<div style="display:flex;align-items:center;gap:6px;">
							<span style="display:inline-block;width:12px;height:12px;background:${color(p)};border-radius:2px;"></span>
							<span><strong>${p}</strong>: ${d.data[p]} (${pct}%)</span>
						</div>`
					})
					.join('')
				tooltip
					.html(`<div><strong>${date}</strong></div>${content}`)
					.style('left', event.pageX + 10 + 'px')
					.style('top', event.pageY - 28 + 'px')
					.transition()
					.duration(200)
					.style('opacity', 1)
			})
			.on('mousemove', function (event: MouseEvent) {
				tooltip.style('left', event.pageX + 10 + 'px').style('top', event.pageY - 28 + 'px')
			})
			.on('mouseout', function () {
				tooltip.transition().duration(300).style('opacity', 0)
			})

		g.append('g')
			.attr('transform', `translate(0,${innerHeight})`)
			.call(d3.axisBottom(x).tickValues(x.domain().filter((_, i) => i % 5 === 0)))

		g.append('g').call(d3.axisLeft(y))

		const pieGroup = svg
			.append('g')
			.attr('transform', `translate(${width / 2}, ${height / 2})`)
			.style('opacity', showingPie ? 1 : 0)
			.attr('class', 'pie-chart')
			.style('cursor', 'crosshair')

		const pie = d3.pie<any>().value((d) => d.total)
		const arc = d3
			.arc<any>()
			.innerRadius(0)
			.outerRadius(Math.min(innerWidth, innerHeight) / 2.5)

		if (showingPie) {
			// Fade out bars

			barsGroup
				.transition()
				.duration(500)
				.attr('opacity', 0)
				.on('end', () => {
					// Draw and fade in pie
					const arcs = pieGroup
						.selectAll('path')
						.data(pie(totalsByProject), (d, i) => i.toString())
						.join('path')
						.attr(
							'fill',
							(d: d3.PieArcDatum<{ project: string; total: number }>) => color(d.data.project)!
						)
						.on(
							'mouseover',
							function (event: MouseEvent, d: d3.PieArcDatum<{ project: string; total: number }>) {
								const percent = ((d.data.total / totalCommits) * 100).toFixed(1)
								const content = `<div style="display:flex;align-items:center;gap:6px;">
									<span style="display:inline-block;width:12px;height:12px;background:${color(
										d.data.project
									)};border-radius:2px;"></span>
									<span><strong>${d.data.project}</strong>: ${d.data.total} (${percent}%)</span>
								</div>`
								tooltip
									.html(content)
									.style('left', event.pageX + 10 + 'px')
									.style('top', event.pageY - 28 + 'px')
									.transition()
									.duration(200)
									.style('opacity', 1)
							}
						)
						.on('mousemove', function (event: MouseEvent) {
							tooltip.style('left', event.pageX + 10 + 'px').style('top', event.pageY - 28 + 'px')
						})
						.on('mouseout', function () {
							tooltip.transition().duration(300).style('opacity', 0)
						})

					pieGroup.transition().duration(500).style('opacity', 1)

					arcs
						.transition()
						.duration(1000)
						.attrTween('d', function (d) {
							const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
							return (t) => arc(i(t))!
						})
				})
		} else {
			// Fade out pie
			pieGroup
				.transition()
				.duration(500)
				.style('opacity', 0)
				.on('end', () => {
					// Draw and fade in bars
					barsGroup
						.selectAll('g')
						.data(layers)
						.join('g')
						.attr('fill', (d) => color(d.key)!)
						.selectAll('rect')
						.data((d) => d.map((v) => ({ ...v, key: d.key })))
						.join('rect')
						.attr('x', (d) => x(String(d.data.date))!)
						.attr('y', (d) => y(d[1]))
						.attr('height', (d) => y(d[0]) - y(d[1]))
						.attr('width', x.bandwidth())
						.attr('class', 'bar')
						.style('cursor', 'crosshair')
						.on('mouseover', function (event: MouseEvent, d: any) {
							const date = d.data.date
							const total = d3.sum(projects, (p) => d.data[p])
							const content = projects
								.filter((p) => d.data[p] > 0)
								.map((p) => {
									const pct = ((d.data[p] / total) * 100).toFixed(1)
									return `<div style="display:flex;align-items:center;gap:6px;">
							<span style="display:inline-block;width:12px;height:12px;background:${color(p)};border-radius:2px;"></span>
							<span><strong>${p}</strong>: ${d.data[p]} (${pct}%)</span>
						</div>`
								})
								.join('')
							tooltip
								.html(`<div><strong>${date}</strong></div>${content}`)
								.style('left', event.pageX + 10 + 'px')
								.style('top', event.pageY - 28 + 'px')
								.transition()
								.duration(200)
								.style('opacity', 1)
						})
						.on('mousemove', function (event: MouseEvent) {
							tooltip.style('left', event.pageX + 10 + 'px').style('top', event.pageY - 28 + 'px')
						})
						.on('mouseout', function () {
							tooltip.transition().duration(300).style('opacity', 0)
						}).transition().duration(500).style('opacity', 1)
				})

				
		}
	}, [data, dimensions, showingPie])

	return (
		<div ref={wrapperRef} style={{ width: '100%', height: '300px' }}>
			<button onClick={() => setShowingPie((prev) => !prev)} style={{ marginBottom: '1rem' }}>
				Toggle Chart
			</button>
			<svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
		</div>
	)
}

export { MorphingChart }
