/**
 * Identifies all confusable numbers in a bidding room with 800 bidders
 * A confusable number is one that, when turned upside down, becomes a different valid number
 * @returns {Array} Array of objects with original number and its upside-down counterpart
 */
function findConfusableNumbers() {
	const result = []
	const maxNumber = 800

	// Map of digits that have valid upside-down counterparts
	// Key: original digit, Value: upside-down digit
	const flippableDigits = {
		0: '0', // 0 flips to 0
		1: '1', // 1 flips to 1
		6: '9', // 6 flips to 9
		8: '8', // 8 flips to 8
		9: '6' // 9 flips to 6
	}

	// Check each number from 1 to maxNumber
	for (let num = 1; num <= maxNumber; num++) {
		const numStr = num.toString()

		// Skip numbers with digits that can't be flipped
		if (numStr.split('').some((digit) => !Object.keys(flippableDigits).includes(digit))) {
			continue
		}

		// Skip numbers ending with 0 (they would lose their leading digit when flipped)
		if (numStr.endsWith('0')) {
			continue
		}

		// Calculate the flipped number
		let flippedStr = ''
		for (let i = numStr.length - 1; i >= 0; i--) {
			flippedStr += flippableDigits[numStr[i]]
		}

		const flippedNum = parseInt(flippedStr, 10)

		// Check if the flipped number is different from the original
		// and is within the valid range (≤ maxNumber)
		if (flippedNum !== num && flippedNum <= maxNumber) {
			result.push(num)
		}
	}

	return result
}

// Execute the function and display results
const confusableNumbers = findConfusableNumbers()
console.log(confusableNumbers.length) // 28
console.log(confusableNumbers)
let output = [
	6, 9, 16, 18, 19, 61, 66, 68, 81, 86, 89, 91, 98, 99, 109, 119, 161, 169, 189, 191, 199, 601, 611,
	661, 669, 681, 691, 699
]



function findConfusableNumbers1(max = 800) {
	const flipMap = { 0: '0', 1: '1', 6: '9', 8: '8', 9: '6' }
	const confusable = []

	for (let i = 1; i <= max; i++) {
		const str = i.toString()

		// Skip numbers with invalid digits
		if ([...str].some((d) => !(d in flipMap))) continue

		// Flip and reverse
		const flippedArr = [...str].reverse().map((d) => flipMap[d])
		const flippedStr = flippedArr.join('')

		// Skip if flipped version starts with '0' (i.e., original number ends with 0)
		if (flippedStr.startsWith('0')) continue

		const flippedNum = parseInt(flippedStr, 10)

		if (flippedNum !== i && flippedNum >= 1 && flippedNum <= max) {
			confusable.push(i)
		}
	}

	return confusable
}

const result = findConfusableNumbers1()
console.log(result.length) // 28
console.log(result)
let output1 = [
	6, 9, 16, 18, 19, 61, 66, 68, 81, 86, 89, 91, 98, 99, 109, 119, 161, 169, 189, 191, 199, 601, 611,
	661, 669, 681, 691, 699
]

function findConfusableNumbers2(limit = 800) {
	const flipMap = { 0: '0', 1: '1', 6: '9', 8: '8', 9: '6' }
	const confusables = []

	for (let i = 1; i <= limit; i++) {
		const str = i.toString()

		// Skip numbers with trailing zero
		if (str.endsWith('0')) continue

		// Check for invalid digits
		if ([...str].some((d) => !(d in flipMap))) continue

		// Flip and reverse
		const flippedStr = [...str]
			.reverse()
			.map((d) => flipMap[d])
			.join('')
		const flippedNum = parseInt(flippedStr, 10)

		// Skip if flipped number is equal to original or exceeds limit
		if (flippedNum === i || flippedNum > limit) continue

		confusables.push(i)
	}

	return confusables
}

// Example usage:
console.log(findConfusableNumbers2().length) // 28
console.log(findConfusableNumbers2())
let console2 = [
	6, 9, 16, 18, 19, 61, 66, 68, 81, 86, 89, 91, 98, 99, 109, 119, 161, 169, 189, 191, 199, 601, 611,
	661, 669, 681, 691, 699
]
