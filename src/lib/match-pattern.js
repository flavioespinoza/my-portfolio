// Given a pattern such as “i18n” , check if input string “internationalization” matches it. “f6k” should match “facebook”, but not “focus”.

const matchPattern = (pattern, input) => {
  // break the pattern into characters (start, length_between, end)
  const start = pattern[0] 
  const end = pattern[pattern.length - 1]
  const length_between = Number(pattern.slice(1, pattern.length - 1))
  
  console.log(start)
  console.log(end)
  console.log(length_between)
  
  // check if length_between + 2 === input.length else return false
  if (length_between + 2 !== input.length) return false

  // check if start char === input[0]
  if (start !== input[0]) return false

  // check if end char === input[input.length - 1]
  if (end !== input[input.length - 1]) return false

  return true

}; 


console.log(matchPattern('f6k', 'facebook'))
console.log(matchPattern('f6k', 'focus'))
console.log(matchPattern('i18n', 'internationalization'))