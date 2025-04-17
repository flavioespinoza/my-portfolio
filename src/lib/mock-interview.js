// Given an integer array nums with possible duplicates, randomly output the index of a given target number. You can assume that the given target number must exist in the array.

// Implement the Solution class:

// Solution(int[] nums) Initializes the object with the array nums.
// int pick(int target) Picks a random index i from nums where nums[i] == target. If there are multiple valid i's, then each index should have an equal probability of returning.

// Input
// ["Solution", "pick", "pick", "pick"]
// [[[1, 2, 3, 3, 3]], [3], [1], [3]]
// Output
// [null, 4, 0, 2]

// Explanation
// Solution solution = new Solution([1, 2, 3, 3, 3]);
// solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
// solution.pick(1); // It should return 0. Since in the array only nums[0] is equal to 1.
// solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.

// 1 <= nums.length <= 2 * 104
// -2^31 <= nums[i] <= 2^31 - 1
// target is an integer from nums.
// At most 104 calls will be made to pick.

// Array size - precompute the i for all unique vals (capp lengh)
// Value range - hasmap
// Limit on Pick call - O(1) this will make it scalable

// precompute a map of value -> list of i
// Use the pick method to fetch the i's and randomly select

function preprocess(nums) {
	const map = {}
	for (let i = 0; i < nums.length; i++) {
		if (!map[nums[i]]) map[nums[i]] = []
		map[nums[i]].push(i)
	}
	return map
}

function pick(map, target) {
	const indices = map[target]
	const randomIndex = Math.floor(Math.random() * indices.length)
	return indices[randomIndex]
}

function testSolution() {
	const result1 = []
	const nums = [1, 2, 3, 3, 3]
	const map = preprocess(nums)

	console.log('map', map)

	// validate
	for (let i = 0; i < 10; i++) {
		result1.push(pick(map, 3))
	}

	console.log(result1)
}

testSolution()

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */

// You are given two strings start and target, both of length n. Each string consists only of the characters 'L', 'R', and '_' where:

// The characters 'L' and 'R' represent pieces, where a piece 'L' can move to the left only if there is a blank space directly to its left, and a piece 'R' can move to the right only if there is a blank space directly to its right.
// The character '_' represents a blank space that can be occupied by any of the 'L' or 'R' pieces.
// Return true if it is possible to obtain the string target by moving the pieces of the string start any number of times. Otherwise, return false.

// Example 1:

// Input: start = "_L__R__R_", target = "L______RR"
// Output: true
// Explanation: We can obtain the string target from start by doing the following moves:
// - Move the first piece one step to the left, start becomes equal to "L___R__R_".
// - Move the last piece one step to the right, start becomes equal to "L___R___R".
// - Move the second piece three steps to the right, start becomes equal to "L______RR".
// Since it is possible to get the string target from start, we return true.

// Example 2:

// Input: start = "R_L_", target = "__LR"
// Output: false
// Explanation: The 'R' piece in the string start can move one step to the right to obtain "_RL_".
// After that, no pieces can move anymore, so it is impossible to obtain the string target from start.

// Example 3:

// Input: start = "_R", target = "R_"
// Output: false
// Explanation: The piece in the string start can move only to the right, so it is impossible to obtain the string target from start.

// _L__R__R_ => L______RR
// 1. check chars are equal and string.lengh is equal
// Traverse through start and track positions of L and R
// from left to right
//  L in start must not preceed it position to target
//  R in start must not succeed it position to target
// continue until both pointers travers the string if all checks pass return true

// two pointers i and j (start target)
// traverse both strings at the same time skipping _
// Compare positions of L and R and validate movement rules
// Make sure the relative order of L and R are preserved
// return true if all checks pass

const canChange = function (start, target) {
	if (start.length !== target.length) return false

	let i = 0 // Pointer for start
	let j = 0 // Pointer for target

	while (i < start.length && j < target.length) {
		// Skip blanks in start
		while (i < start.length && start[i] === '_') {
			i++
		}
		// Skip blanks in target
		while (j < target.length && target[j] === '_') {
			j++
		}

		// If both pointers are within bounds, check characters
		if (i < start.length && j < target.length) {
			if (start[i] !== target[j]) return false // Characters must match
			if (start[i] === 'L' && i < j) return false // L can't move right
			if (start[i] === 'R' && i > j) return false // R can't move left
			i++
			j++
		}
	}

	// Check if remaining characters in both strings are all '_'
	while (i < start.length) {
		if (start[i] !== '_') return false
		i++
	}
	while (j < target.length) {
		if (target[j] !== '_') return false
		j++
	}

	return true
}

console.log(canChange('_L__R__R_', 'L______RR')) // true
// console.log(canChange('R_L_', '__LR')) // false
// console.log(canChange('_R', 'R_')) // false
