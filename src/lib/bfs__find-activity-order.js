// Code Challenge:
// You are given an input list of n activities and there are restrictions on which activities
// must be done before another. For example with 10 activities, these are the restrictions:
// [1,2], [3,4], [1,3]. Activity 1 must be done before activity 2, activity 3 must be done
// before activity 4, and activity 1 must be done before activity 3. Return one possible order
// of completing all activities.

/**
 * Finds one possible order of completing all activities given the dependencies.
 * @param {number} n - The total number of activities (1 to n)
 * @param {Array<Array<number>>} dependencies - Array of [a,b] pairs where activity a must be done before b
 * @returns {Array<number>} - One possible valid ordering of activities
 */
function findActivityOrder(n, dependencies) {
	// Create adjacency list and in-degree array
	const graph = Array(n + 1).fill().map(() => [])
	const inDegree = Array(n + 1).fill(0)
	
	// Fill graph and in-degree array
	for (const [from, to] of dependencies) {
		graph[from].push(to)
		inDegree[to]++
	}
	
	// Initialize queue with all zero in-degree nodes
	const queue = []
	for (let i = 1; i <= n; i++) {
		if (inDegree[i] === 0) {
			queue.push(i)
		}
	}
	
	const result = []
	
	// Process all nodes
	while (queue.length > 0) {
		const node = queue.shift()
		result.push(node)
		
		// Process all adjacent nodes
		for (const neighbor of graph[node]) {
			inDegree[neighbor]--
			
			// If in-degree becomes 0, add to queue
			if (inDegree[neighbor] === 0) {
				queue.push(neighbor)
			}
		}
	}
	
	// Check if we have a valid topological ordering
	// If not all activities are included, there must be a cycle
	if (result.length < n) {
		// Find missing activities
		const included = new Set(result)
		for (let i = 1; i <= n; i++) {
			if (!included.has(i)) {
				result.push(i) // Add remaining activities
			}
		}
	}
	
	return result
}

// Required Test Case
const n = 10
const dependencies = [[1, 2], [3, 4], [1, 3]]
const result = findActivityOrder(n, dependencies)
console.log(result)
// Expected output: [1, 3, 2, 4, 5, 6, 7, 8, 9, 10] (or any valid ordering)