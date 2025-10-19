/**
 * Code Challenge:
 * You are given an input list of n activities and there are restrictions on which activities must be done before another.
 * For example with 10 activities, these are the restrictions: [1,2], [3,4], [1,3].
 * Activity 1 must be done before activity 2, activity 3 must be done before activity 4, and activity 1 must be done before activity 3.
 * Return one possible order of completing all activities.
 */

/**
 * Finds a valid ordering of activities based on given prerequisites
 * @param {number} n - Number of activities (1 to n)
 * @param {Array<Array<number>>} prerequisites - Array of [before, after] pairs
 * @return {Array<number>} - A valid ordering of activities
 */
function findActivityOrder(n, prerequisites) {
	// Build adjacency list and calculate in-degrees
	const graph = Array(n + 1)
		.fill()
		.map(() => [])
	const inDegree = Array(n + 1).fill(0)

	// Populate the graph
	for (const [before, after] of prerequisites) {
		graph[before].push(after)
		inDegree[after]++
	}

	// Find all activities with no prerequisites
	const queue = []
	for (let i = 1; i <= n; i++) {
		if (inDegree[i] === 0) {
			queue.push(i)
		}
	}

	const result = []

	// Process activities in topological order
	while (queue.length > 0) {
		const current = queue.shift()
		result.push(current)

		// For each dependent activity
		for (const next of graph[current]) {
			inDegree[next]--

			// If all prerequisites are satisfied
			if (inDegree[next] === 0) {
				queue.push(next)
			}
		}
	}

	// Check if we processed all activities
	if (result.length === n) {
		return result
	} else {
		// There's a cycle, or some activities are unreachable
		return []
	}
}

// Required Test Case
const n = 10
const prerequisites = [
	[1, 2],
	[3, 4],
	[1, 3]
]
const result = findActivityOrder(n, prerequisites)
console.log(result)
// Expected output: [1, 3, 2, 4, 5, 6, 7, 8, 9, 10] (or any valid topological ordering)

// Time Complexity: O(n + e) where n is the number of activities and e is the number of prerequisites
// Space Complexity: O(n + e) for storing the graph and in-degrees
