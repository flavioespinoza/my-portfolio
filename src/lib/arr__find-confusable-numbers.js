/**
 * Code Challenge:
 * In an auction with 800 bidders, each bidder is assigned a unique paddle number from 1 to 800.
 * 
 * Some bidders have their paddles turned upside down. When this happens,
 * the paddle number is reversed. For example, the paddle number 123 is turned 
 * upside down to form the paddle number 321. 
 * 
 * We call these types of numbers confusable numbers.
 * 
 * A confusable number is any  number that, when turned upside down, forms a different valid
 * number.
 * 
 * Numbers that have a trailing zeroes are invalid and excluded from the result.
 * Reversed numbers > 800 are invalid and excluded from the result.
 * 
 * Your task is to find and return an array of all confusable numbers within the range from 1 to 800.
 */

/**
 * Finds all confusable paddle numbers within a given maximum range
 * @param {number} maxNumber - The maximum paddle number to check (inclusive)
 * @returns {number[]} - Array of confusable paddle numbers
 */
function findConfusableNumbers(maxNumber) {
	// Define digit rotations
	const rotations = {
		'0': '0',
		'1': '1',
		'6': '9',
		'8': '8',
		'9': '6'
	}
	
	const confusableNumbers = []
	
	// Check numbers from 1 to maxNumber
	for (let num = 1; num <= maxNumber; num++) {
		const numStr = num.toString()
		
		// Skip numbers ending with 0 (trailing zeros before flipping)
		if (numStr.endsWith('0')) continue
		
		// Check if all digits can be rotated
		const canBeRotated = [...numStr].every(digit => digit in rotations)
		
		if (canBeRotated) {
			// Rotate the number
			const rotatedStr = [...numStr]
				.reverse()
				.map(digit => rotations[digit])
				.join('')
			
			const rotatedNum = parseInt(rotatedStr)
			
			// Check if rotated number is different and within range
			if (rotatedNum !== num && rotatedNum <= maxNumber) {
				confusableNumbers.push(num)
			}
		}
	}
	
	return confusableNumbers
}

// Required Test Case
const result = findConfusableNumbers(800)
console.log(result.length) // Expected: 28
console.log(result) // Expected: [6, 9, 16, 18, 19, 61, 66, 68, 81, 86, 89, 91, 98, 99, 109, 119, 161, 169, 189, 191, 199, 601, 611, 661, 669, 681, 691, 699]

// Time complexity: O(n * d) where n is maxNumber and d is the average number of digits in the numbers
// Space complexity: O(n) for storing the result array in the worst case
