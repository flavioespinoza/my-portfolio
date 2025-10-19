/**
 * @param {number[][]} matrix
 * @return {number}
 */
function longestIncreasingPath(matrix) {
	// Handle empty or invalid matrix
	if (!matrix || !matrix.length || !matrix[0].length) return 0

	const rows = matrix.length
	const cols = matrix[0].length
	// Memoization cache to store the longest path length from each cell
	const memo = Array(rows)
		.fill()
		.map(() => Array(cols).fill(0))
	let maxLength = 1 // Minimum path length is 1 for any non-empty matrix

	// Possible movements: up, right, down, left
	const directions = [
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1]
	]

	/**
	 * DFS to find the longest increasing path starting from (row, col)
	 * @param {number} row - Current row
	 * @param {number} col - Current column
	 * @param {number} prevVal - Previous value in the path
	 * @returns {number} Length of the longest increasing path from this cell
	 */
	function dfs(row, col, prevVal) {
		// Check if out of bounds or if current value isn't greater than previous
		if (row < 0 || row >= rows || col < 0 || col >= cols || matrix[row][col] <= prevVal) {
			return 0
		}

		// Return memoized result if already computed
		if (memo[row][col] > 0) {
			return memo[row][col]
		}

		let maxPath = 1 // Current cell counts as length 1

		// Explore all four directions for a strictly increasing path
		for (let [dr, dc] of directions) {
			const newRow = row + dr
			const newCol = col + dc
			// Recursively find the longest path from the next cell
			maxPath = Math.max(maxPath, 1 + dfs(newRow, newCol, matrix[row][col]))
		}

		// Cache the result
		memo[row][col] = maxPath
		return maxPath
	}

	// Iterate through each cell as a potential starting point
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			// Start DFS from each cell, using -Infinity to allow any starting value
			maxLength = Math.max(maxLength, dfs(i, j, -Infinity))
		}
	}

	return maxLength
}

/* Example Tests */
const matrix1 = [
	[3, 4, 5],
	[3, 2, 6],
	[2, 2, 1]
]
console.log(longestIncreasingPath(matrix1)) // Expected Output: 4

const matrix2 = [
	[9, 9, 4],
	[6, 6, 8],
	[2, 1, 1]
]
console.log(longestIncreasingPath(matrix2)) // Expected Output: 4
