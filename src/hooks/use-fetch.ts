// Create a reusable hook for fetching data with loading/error states
// Your implementation should handle:
// - Loading state
// - Error state
// - Data state
// - Automatic cleanup
import { useEffect, useState } from 'react'

type User = {
	id: number
	name: string
	email: string
	// Add more properties as needed
}

function useFetch<T>(url: string) {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null | unknown>(null)

	useEffect(() => {
		let isCancelled = false

		const fetchData = async () => {
			try {
				setLoading(true)
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const data = await response.json()
				if (!isCancelled) {
					setData(data)
				}
			} catch (error) {
				if (!isCancelled) {
					setError(error)
				}
			} finally {
				if (!isCancelled) {
					setLoading(false)
				}
			}
		}

		fetchData()

		return () => {
			// Cleanup function to prevent memory leaks
			isCancelled = true
		}
	}, [url])

	return { data, loading, error }
}

// Usage example:
const { data, loading, error } = useFetch<User[]>('/api/users')
