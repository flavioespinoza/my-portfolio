// Find the number of unique shapes in a grid of 1's and 0's

// 0 0 0 1
// 1 1 0 1
// 0 1 0 0
// 1 0 0 1
// 1 0 0 1

// Expected output: 2

// So if I'm understanding this correctly, the problem is to find the number of
// unique shapes inside a grid of the matrix. Shapes are defined as connected
// components of 1's (including diagonals), and uniqueness is determined by exact
// congruency (size, rotation, etc.), meaning two shapes are only considered unique
// if they can't perfectly overlap.

const countUniqueShapes = (grid) => {
	const rows = grid.length // Get number of rows
	const cols = grid[0].length // Get number of columns
	const visited = new Set() // Track visited cells
	const uniqueShapes = new Set() // Store unique canonical forms of shapes

	// Function to normalize a shape
	const normalizeShape = (shape) => {
		// Sort points by rows and columns
		const sortedShape = shape.sort((a, b) => a[0] - b[0] || a[1] - b[1])
		const normalized = []
		const baseRow = sortedShape[0][0]
		const baseCol = sortedShape[0][1]
		for (const [r, c] of sortedShape) {
			// Translate each point to relative position
			normalized.push([r - baseRow, c - baseCol])
		}
		// Convert normalized shape to a string for easy storage in Set
		return normalized.map(([r, c]) => `${r},${c}`).join('|')
	}

	// Depth-First Search function to find connected components
	const dfs = (row, col, shape) => {
		// Boundary conditions: out of bounds, already visited, or zero cell
		if (
			row < 0 ||
			col < 0 ||
			row >= rows ||
			col >= cols ||
			grid[row][col] === 0 ||
			visited.has(`${row},${col}`)
		) {
			return
		}
		visited.add(`${row},${col}`) // Mark the cell as visited
		shape.push([row, col]) // Add current cell to the shape
		// Explore all neighbors (including diagonals)
		dfs(row - 1, col, shape) // Up
		dfs(row + 1, col, shape) // Down
		dfs(row, col - 1, shape) // Left
		dfs(row, col + 1, shape) // Right
		dfs(row - 1, col - 1, shape) // Top-left diagonal
		dfs(row - 1, col + 1, shape) // Top-right diagonal
		dfs(row + 1, col - 1, shape) // Bottom-left diagonal
		dfs(row + 1, col + 1, shape) // Bottom-right diagonal
	}

	// Main loop to iterate through the grid
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (grid[r][c] === 1 && !visited.has(`${r},${c}`)) {
				const shape = [] // Initialize an empty shape
				dfs(r, c, shape) // Use DFS to collect all points in the shape
				const canonicalShape = normalizeShape(shape) // Normalize to canonical form
				uniqueShapes.add(canonicalShape) // Add canonical form to the unique shapes set
			}
		}
	}

	return uniqueShapes.size // Return the count of unique shapes
}

// 0 0 0 1
// 1 1 0 1
// 0 1 0 0
// 1 0 0 1
// 1 0 0 1

// Expected output: 2
console.log(
	countUniqueShapes([
		[0, 0, 0, 1],
		[1, 1, 0, 1],
		[0, 1, 0, 0],
		[1, 0, 0, 1],
		[1, 0, 0, 1]
	])
) // 2

// Expected output: 2
console.log(
	countUniqueShapes([
		[0, 0, 0, 1],
		[1, 0, 0, 1],
		[0, 0, 0, 0],
		[1, 0, 0, 1],
		[1, 0, 0, 1]
	])
) // 2

// Solution
// Comments Breakdown
// Grid Representation: rows and cols are extracted from the matrix to easily loop through it.
// Visited Tracking: A set is used to keep track of explored cells, avoiding revisiting and infinite loops.
// Shape Normalization: The function normalizeShape ensures all shapes are represented uniformly, making it easier to compare shapes for uniqueness.
// Sorting and translation are performed relative to the top-left corner of the shape.
// The normalized shape is converted into a string for storage in a set.
// DFS Implementation: The dfs function uses recursion to collect all connected cells in a shape and mark them as visited.
// It explores all possible connections, including diagonals.
// Main Logic: The grid is iterated cell by cell; for each 1 (unvisited), DFS collects the shape, normalizes it, and stores its canonical version.
// Final Count of Unique Shapes: The uniqueShapes set ensures duplicates are automatically removed, and the size of the set gives the total unique shapes.
