/**
 * Code Challenge:
 * Given a pattern such as "i18n", check if input string "internationalization" matches it.
 * "f6k" should match "facebook", but not "focus".
 */

/**
 * Checks if a string matches the given pattern
 * @param {string} pattern - The pattern string with numbers indicating skipped characters
 * @param {string} str - The input string to check against the pattern
 * @returns {boolean} - True if the string matches the pattern, false otherwise
 */
function matchPattern(pattern, str) {
	// Parse the pattern
	const patternParts = []
	let i = 0
	
	while (i < pattern.length) {
		// If current character is a letter
		if (isNaN(parseInt(pattern[i]))) {
			patternParts.push(pattern[i])
			i++
		} else {
			// If current character is a number
			let num = ''
			while (i < pattern.length && !isNaN(parseInt(pattern[i]))) {
				num += pattern[i]
				i++
			}
			patternParts.push(parseInt(num))
		}
	}
	
	// Check if the pattern matches the string
	let strIndex = 0
	
	for (let j = 0; j < patternParts.length; j++) {
		const part = patternParts[j]
		
		if (typeof part === 'string') {
			// Check if the character matches
			if (str[strIndex] !== part) {
				return false
			}
			strIndex++
		} else {
			// Skip the specified number of characters
			strIndex += part
			
			// Check if we've exceeded the string length
			if (strIndex > str.length) {
				return false
			}
		}
	}
	
	// Check if we've reached the end of the string
	return strIndex === str.length
}

// Required Test Cases
console.log(matchPattern('f6k', 'facebook')) // true
console.log(matchPattern('f6k', 'focus')) // false
console.log(matchPattern('i18n', 'internationalization')) // true

// Time Complexity: O(n) where n is the length of the pattern string
// Space Complexity: O(m) where m is the number of parts in the pattern