'use client'

import { memo, useCallback, useDeferredValue, useMemo, useState } from 'react'
import { FixedSizeList as VirtualList } from 'react-window'

interface Item {
	id: string
	name: string
	value: number
}

interface FilteredListProps {
	items: Item[]
	onItemClick: (id: string) => void
	filterText: string
}

const ListItem = memo(
	({ item, onItemClick }: { item: Item; onItemClick: (id: string) => void }) => {
		const handleClick = useCallback(() => {
			onItemClick(item.id)
		}, [item.id, onItemClick])

		return (
			<div
				onClick={handleClick}
				className="hover:bg-gray-100 cursor-pointer border-b p-3 transition-colors duration-100"
			>
				<span className="font-medium">{item.name}</span>
				<span className="text-gray-600 ml-2">${item.value}</span>
			</div>
		)
	}
)
ListItem.displayName = 'ListItem'

const FilteredList = memo<FilteredListProps>(({ items, onItemClick, filterText }) => {
	// 🧠 Smooth filtering — lets user type without blocking rendering
	const deferredFilter = useDeferredValue(filterText)

	// 🧩 Filter results memoized for performance
	const filteredItems = useMemo(() => {
		const lower = deferredFilter.toLowerCase()
		return items.filter((item) => item.name.toLowerCase().includes(lower))
	}, [items, deferredFilter])

	// 🧱 Stable row renderer
	const Row = useCallback(
		({ index, style }: any) => {
			const item = filteredItems[index]
			return (
				<div style={style}>
					<ListItem item={item} onItemClick={onItemClick} />
				</div>
			)
		},
		[filteredItems, onItemClick]
	)

	// 🧩 Graceful empty state
	if (filteredItems.length === 0) {
		return (
			<div className="text-gray-500 bg-gray-50 rounded-lg border p-6 text-center">
				No items found.
			</div>
		)
	}

	return (
		<VirtualList
			height={600}
			itemCount={filteredItems.length}
			itemSize={56}
			width="100%"
			itemKey={(index) => filteredItems[index].id} // ✅ stable keys
		>
			{Row}
		</VirtualList>
	)
})
FilteredList.displayName = 'FilteredList'

export default function List() {
	const [items, setItems] = useState<Item[]>(() =>
		Array.from({ length: 10000 }, (_, i) => ({
			id: `${i + 1}`,
			name: `Item ${i + 1}`,
			value: Math.floor(Math.random() * 1000)
		}))
	)

	const [filterText, setFilterText] = useState('')
	const [count, setCount] = useState(0)

	const handleItemClick = useCallback((id: string) => {
		console.log('Clicked item:', id)
		setItems((prev) => prev.filter((item) => item.id !== id))
	}, [])

	return (
		<div className="mx-auto max-w-xl p-4">
			<div className="mb-4 space-y-2">
				<input
					type="text"
					value={filterText}
					onChange={(e) => setFilterText(e.target.value)}
					placeholder="Filter items..."
					className="w-full rounded border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<div className="flex items-center gap-2">
					<button
						onClick={() => setCount(count + 1)}
						className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					>
						Re-render parent: {count}
					</button>
					<span className="text-gray-600 text-sm">Showing {items.length} items</span>
				</div>
			</div>

			<FilteredList items={items} onItemClick={handleItemClick} filterText={filterText} />
		</div>
	)
}
