function canOpenLock(currentPattern, openPattern, safePatterns) {
	// Convert all patterns to strings
	currentPattern = String(currentPattern)
	openPattern = String(openPattern)
	safePatterns = safePatterns.map((pattern) => String(pattern))

	// Check if current and open patterns are safe
	if (!safePatterns.includes(currentPattern) || !safePatterns.includes(openPattern)) {
		return false
	}

	// If current is already open, return true
	if (currentPattern === openPattern) {
		return true
	}

	// Build adjacency list
	const graph = {}
	for (const pattern of safePatterns) {
		graph[pattern] = []
	}

	// Fill adjacency list with patterns that differ by exactly one bit
	for (let i = 0; i < safePatterns.length; i++) {
		for (let j = i + 1; j < safePatterns.length; j++) {
			const p1 = safePatterns[i]
			const p2 = safePatterns[j]

			let diffCount = 0
			for (let k = 0; k < p1.length; k++) {
				if (p1[k] !== p2[k]) {
					diffCount++
				}
			}

			if (diffCount === 1) {
				graph[p1].push(p2)
				graph[p2].push(p1)
			}
		}
	}

	// BFS using adjacency list
	const queue = [currentPattern]
	const visited = new Set([currentPattern])

	while (queue.length > 0) {
		const pattern = queue.shift()

		for (const nextPattern of graph[pattern]) {
			if (!visited.has(nextPattern)) {
				if (nextPattern === openPattern) {
					return true
				}

				visited.add(nextPattern)
				queue.push(nextPattern)
			}
		}
	}

	return false
}

// Test cases for binary lock function
function testCanOpenLock() {
	// Test case setup
	const testCases = [
		{
			name: 'Example from problem statement',
			currentPattern: '010',
			openPattern: '111',
			safePatterns: ['000', '001', '010', '101', '111'],
			expected: true
		},
		{
			name: 'Already open',
			currentPattern: '111',
			openPattern: '111',
			safePatterns: ['000', '111'],
			expected: true
		},
		{
			name: 'Current pattern not safe',
			currentPattern: '010',
			openPattern: '111',
			safePatterns: ['000', '001', '101', '111'],
			expected: false
		},
		{
			name: 'Open pattern not safe',
			currentPattern: '010',
			openPattern: '111',
			safePatterns: ['000', '001', '010', '101'],
			expected: false
		},
		{
			name: 'No path exists',
			currentPattern: '000',
			openPattern: '111',
			safePatterns: ['000', '001', '010', '111'],
			expected: false
		},
		{
			name: 'Longer pattern',
			currentPattern: '01010',
			openPattern: '10101',
			safePatterns: ['01010', '11010', '11011', '11001', '10001', '10101'],
			expected: true
		},
		{
			name: 'Single switch',
			currentPattern: '0',
			openPattern: '1',
			safePatterns: ['0', '1'],
			expected: true
		},
		{
			name: 'Complex path',
			currentPattern: '0000',
			openPattern: '1111',
			safePatterns: ['0000', '0001', '0011', '0111', '1111', '1000', '1100', '1110'],
			expected: true
		},
		{
			name: 'Dead end path',
			currentPattern: '000',
			openPattern: '111',
			safePatterns: ['000', '100', '010', '001', '110', '011', '111'],
			expected: true
		}
	]

	// Run tests
	for (const test of testCases) {
		const result = canOpenLock(test.currentPattern, test.openPattern, test.safePatterns)
		console.log(`Test: ${test.name} - ${result === test.expected ? 'PASS' : 'FAIL'}`)
		console.log(`  Current: ${test.currentPattern}`)
		console.log(`  Open: ${test.openPattern}`)
		console.log(`  Safe: ${test.safePatterns}`)
		console.log(`  Expected: ${test.expected}, Got: ${result}`)
		console.log('---')
	}
}

// Run the tests
testCanOpenLock()
