/**
 * Code Challenge:
 * Given an integer array nums with possible duplicates, randomly output the index
 * of a given target number. You can assume that the given target number must exist in the array.
 */

/**
 * Returns a random index of the target value in the given array
 * @param {number[]} nums - The array to search in
 * @param {number} target - The target value to find
 * @return {number} A random index where target appears in nums
 */
function findTargetIndex(nums, target) {
	// Find all indices where target appears
	const indices = []

	for (let i = 0; i < nums.length; i++) {
		if (nums[i] === target) {
			indices.push(i)
		}
	}

	// Randomly select one of the indices
	const randomIndex = Math.floor(Math.random() * indices.length)
	return indices[randomIndex]
}

// Required Test Case
const nums = [1, 2, 3, 3, 4, 5]
const target = 3
console.log(findTargetIndex(nums, target))
// Expected output: either 2 or 3 (randomly chosen)

// Time Complexity: O(n) where n is the length of nums array
// Space Complexity: O(k) where k is the frequency of the target in the array
