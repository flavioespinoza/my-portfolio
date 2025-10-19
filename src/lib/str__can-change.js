/**
 * Code Challenge:
 * You are given two strings start and target, both of length n. Each string consists only of the characters 'L', 'R', and '_' where:
 * - The characters 'L' and 'R' represent pieces, where a piece 'L' can move to the left only if there is a blank space directly to its left, and a piece 'R' can move to the right only if there is a blank space directly to its right.
 * - The character '_' represents a blank space that can be occupied by any of the 'L' or 'R' pieces.
 * Return true if it is possible to obtain the string target by moving the pieces of the string start any number of times. Otherwise, return false.
 */

/**
 * Determines if it's possible to convert start string to target string using the movement rules
 * @param {string} start - The initial configuration string
 * @param {string} target - The target configuration string
 * @return {boolean} - Whether it's possible to reach the target
 */
function canChange(start, target) {
	// Check if strings have the same length
	if (start.length !== target.length) {
		return false
	}

	// Remove all blank spaces and check if the relative order of L and R is the same
	const startLR = start.replace(/_/g, '')
	const targetLR = target.replace(/_/g, '')
	if (startLR !== targetLR) {
		return false
	}

	// Check position constraints for L and R pieces
	let startIndex = 0
	let targetIndex = 0
	const n = start.length

	while (startIndex < n && targetIndex < n) {
		// Skip blank spaces
		while (startIndex < n && start[startIndex] === '_') startIndex++
		while (targetIndex < n && target[targetIndex] === '_') targetIndex++

		// If both reached the end, we're done
		if (startIndex === n && targetIndex === n) {
			return true
		}

		// If only one reached the end, they don't match
		if (startIndex === n || targetIndex === n) {
			return false
		}

		// Check current characters
		if (start[startIndex] !== target[targetIndex]) {
			return false
		}

		// Check position constraints based on piece type
		if (start[startIndex] === 'L' && startIndex < targetIndex) {
			// L can only move left, not right
			return false
		}
		if (start[startIndex] === 'R' && startIndex > targetIndex) {
			// R can only move right, not left
			return false
		}

		// Move to next non-blank character
		startIndex++
		targetIndex++
	}

	return true
}

// Required Test Cases
// Example 1
console.log(canChange('_L__R__R_', 'L______RR'))
// Expected output: true

// Example 2
console.log(canChange('R_L_', '__LR'))
// Expected output: false

// Example 3
console.log(canChange('_R', 'R_'))
// Expected output: false

/*
Time Complexity: O(n) where n is the length of the strings.
  - We make a single pass through both strings.
  - String replacement operations are also O(n).

Space Complexity: O(n) for storing the filtered strings without blank spaces.
*/
