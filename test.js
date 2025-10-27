function compareArrays(clud, deep, grok, chat, veni, questions) {
	const results = {
		matching: {},
		differences: []
	}

	for (let i = 0; i < clud.length; i++) {
		const questionNum = i + 1
		const cludValue = clud[i]
		const deepValue = deep[i]
		const grokValue = grok[i]
		const chatValue = chat[i]
		const veniValue = veni[i]

		const allMatch =
			cludValue === deepValue &&
			deepValue === grokValue &&
			grokValue === chatValue &&
			chatValue === veniValue
		const cludDeepMatch = cludValue === deepValue
		const cludGrokMatch = cludValue === grokValue
		const cludChatMatch = cludValue === chatValue
		const cludVeniMatch = cludValue === veniValue
		const deepGrokMatch = deepValue === grokValue
		const deepChatMatch = deepValue === chatValue
		const deepVeniMatch = deepValue === veniValue
		const grokChatMatch = grokValue === chatValue
		const grokVeniMatch = grokValue === veniValue
		const chatVeniMatch = chatValue === veniValue

		results.matching[questionNum] = allMatch

		if (!allMatch) {
			results.differences.push({
				question: questionNum,
				text: questions[i].text,
				choices: questions[i].choices,
				chat: chatValue,
				clud: cludValue,
				deep: deepValue,
				grok: grokValue,
				veni: veniValue,
				matches: {
					'clud-deep': cludDeepMatch,
					'clud-grok': cludGrokMatch,
					'clud-chat': cludChatMatch,
					'clud-veni': cludVeniMatch,
					'deep-grok': deepGrokMatch,
					'deep-chat': deepChatMatch,
					'deep-veni': deepVeniMatch,
					'grok-chat': grokChatMatch,
					'grok-veni': grokVeniMatch,
					'chat-veni': chatVeniMatch
				}
			})
		}
	}

	return results
}

// Question data structure
const questions = [
	{
		text: 'What is the primary function of a rubric in the context of AI model training?',
		choices: {
			a: 'To provide a creative writing prompt for the AI.',
			b: "To serve as a precise, objective scoring guide for evaluating an AI's response.",
			c: "To summarize the AI's final answer for a project manager.",
			d: 'To help experts brainstorm a golden response.'
		}
	},
	{
		text: 'What is the most important and universally applied component of a rubric?',
		choices: { a: 'Weight', b: 'Rationale', c: 'Criterion Description', d: 'Criterion Type' }
	},
	{
		text: 'The foundational principle of a strong criterion description is that it must be:',
		choices: {
			a: 'open to expert interpretation.',
			b: 'at least 50 words long.',
			c: 'gradable as true or false.',
			d: 'easy for the AI to answer.'
		}
	},
	{
		text: 'Which of the following is the clearest example of a criterion that is not self-contained?',
		choices: {
			a: 'States the correct closing price for the Dow Jones Industrial Average.',
			b: 'Provides a strong analysis of recent stock market trends.',
			c: "Lists the stock's ticker symbol as 'AAPL' and its sector as 'Technology.'",
			d: 'States that the Dow Jones Industrial Average closed at 38,852.27 on May 15, 2024.'
		}
	},
	{
		text: 'Which of the following is the clearest example of a criterion that is not clear and unambiguous?',
		choices: {
			a: 'The response is formatted as a three-paragraph memo.',
			b: 'Includes an appropriate amount of technical detail for the intended audience.',
			c: "States that the project's budget is $50,000 USD.",
			d: 'Recommends investing $40,000 in Bitcoin.'
		}
	},
	{
		text: 'Which of the following is the clearest example of a criterion that is not strong unambiguous, falsifiable statements?',
		choices: {
			a: 'The legal analysis provides a convincing and insightful argument.',
			b: 'The response cites the landmark case Marbury v. Madison.',
			c: 'States the name of the presiding judge in the case.',
			d: 'The final document is under the 1,000-word count limit.'
		}
	},
	{
		text: 'Which of the following is the clearest example of a stacked criterion?',
		choices: {
			a: 'Calculates the 2024 projected revenue in USD.',
			b: 'Recommends metformin as a first-line treatment, in accordance with ADA guidelines.',
			c: "Identifies Germany's 2022 renewable energy share and states that it is higher than France's.",
			d: "The model's response is formatted as a five-bullet-point memo."
		}
	},
	{
		text: 'Which of the following is the clearest example of a criterion that lacks universal expert agreement?',
		choices: {
			a: 'Recommends an initial treatment of metformin for a patient with Type 2 diabetes, per ADA guidelines.',
			b: "The patient's treatment plan is formatted as a one-page summary.",
			c: "Proposes the most innovative and effective treatment plan for the patient's condition.",
			d: "The treatment plan sufficiently addresses the patient's primary symptoms."
		}
	},
	{
		text: 'Which of the following is the clearest example of a criterion that is not timeless?',
		choices: {
			a: 'Identifies the monarch of the United Kingdom on January 1, 1985, as Queen Elizabeth II.',
			b: 'States the current population of Tokyo.',
			c: 'The response correctly identifies the capital of Japan as Tokyo in 2015.',
			d: 'Explains the historical significance of the Meiji Restoration in Japan.'
		}
	},
	{
		text: 'If a criterion requires a reviewer to do their own research or calculations to verify it, that criterion has failed to be:',
		choices: { a: 'clear and unambiguous.', b: 'timeless.', c: 'self-contained.', d: 'unstacked.' }
	},
	{
		text: "Criterion description: 'The model provides a thorough analysis of the company's financial health.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It is not timeless.',
			b: 'It is not a clear and unambiguous falsifiable statement.',
			c: 'It is a stacked criterion.',
			d: 'It has a prompt-rubric mismatch.',
			e: 'It is a strong criterion description.'
		}
	},
	{
		text: "Criterion description: 'States the correct gross domestic product (GDP) of Canada.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It is not self-contained.',
			b: 'It is not timeless.',
			c: 'It is a stacked criterion.',
			d: 'It is not clear and unambiguous.',
			e: 'It is a strong criterion description.'
		}
	},
	{
		text: "Criterion description: 'Identifies the main character of the novel as Jay Gatsby and the year it was published as 1925.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It is not self-contained.',
			b: 'It lacks universal expert agreement.',
			c: 'It is not clear and unambiguous.',
			d: 'It is a stacked criterion.',
			e: 'It is a strong criterion description.'
		}
	},
	{
		text: "Criterion: 'Identifies that the attached patient's lab report shows a blood glucose level of 126 mg/dL, consistent with prediabetes according to ADA guidelines.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It is not self-contained.',
			b: 'It is not timeless.',
			c: 'It is not clear or unambiguous.',
			d: 'It lacks universal expert agreement.',
			e: 'It is a strong criterion description.'
		}
	},
	{
		text: "Criterion description: 'Recommends the most creative marketing strategy for the new product.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It is not self-contained.',
			b: 'It lacks universal expert agreement.',
			c: 'It is not timeless.',
			d: 'It is a stacked criterion.',
			e: 'It is a strong rubric criterion.'
		}
	},
	{
		text: "Criterion description: 'States the name of the current United States Secretary of State as Marco Rubio.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It is not self-contained.',
			b: 'It is not falsifiable (gradable as true-or-false).',
			c: 'It is not timeless.',
			d: 'It is a stacked criterion.',
			e: 'It is a strong criterion description.'
		}
	},
	{
		text: "Criterion: 'The response includes a reasonable number of sources.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It is not self-contained.',
			b: 'It is not clear and unambiguous.',
			c: 'It is not timeless.',
			d: 'It is a stacked criterion.',
			e: 'It is a strong criterion description.'
		}
	},
	{
		text: "Criterion: 'Correctly identifies the defendant's name as 'John Smith'.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It is a stacked criterion.',
			b: 'It is not self-contained.',
			c: 'It is not clear and unambiguous.',
			d: 'It is not timeless.',
			e: 'It is a strong criterion description.'
		}
	},
	{
		text: "Criterion: 'The model's explanation of the legal precedent is adequate.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It is not timeless.',
			b: 'It is not self-contained.',
			c: 'It is a stacked criterion.',
			d: 'It is not clear, unambiguous, and falsifiable.',
			e: 'It is a strong criterion description.'
		}
	},
	{
		text: "Criterion: 'States the company's Q1 2024 revenue was $15.2M.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It is not timeless.',
			b: 'It is not self-contained.',
			c: 'It is a stacked criterion.',
			d: 'It lacks universal expert agreement.',
			e: 'It is a strong criterion description.'
		}
	},
	{
		text: "Criterion: 'Calculates the final project budget as €35,000 and confirms it is under the €50,000 limit.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It is not self-contained.',
			b: 'It is a stacked criterion.',
			c: 'It is not timeless.',
			d: 'It is not clear and unambiguous.',
			e: 'It is a strong criterion description.'
		}
	},
	{
		text: "Criterion: 'Writes a compelling and persuasive argument for the defense.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It lacks universal expert agreement.',
			b: 'It is not timeless.',
			c: 'It is not self-contained.',
			d: 'It is a stacked criterion.',
			e: 'It is a strong criterion description.'
		}
	},
	{
		text: "Criterion: 'States the U.S. population on January 1, 2025 as 336,548,210.' Why isn't this a strong criterion description?",
		choices: {
			a: 'It is not timeless.',
			b: 'It is not clear and unambiguous.',
			c: 'It is a stacked criterion.',
			d: 'It is not self-contained.',
			e: 'It is a strong criterion description.'
		}
	},
	{
		text: "Prompt: 'Using the attached financial statement, calculate the company's total revenue for fiscal year 2023.' Criterion: 'Explains that the primary driver for the 2023 revenue was a 15% growth in the North American market.'",
		choices: { a: 'Prompt-rubric mismatch', b: 'No mismatch' }
	},
	{
		text: "Prompt: 'From the attached 'Global Market Report.pdf', identify the company with the largest market share in the European semiconductor industry in 2022.' Criterion: 'Identifies 'ChipCorp' as the company with the largest market share in the European semiconductor industry in 2022.'",
		choices: { a: 'Prompt-rubric mismatch', b: 'No mismatch' }
	},
	{
		text: "Prompt: 'Based on the provided patient file, list the patient's current medications.' Criterion: 'Recommends discontinuing the use of metformin due to potential side effects.'",
		choices: { a: 'Prompt-rubric mismatch', b: 'No mismatch' }
	},
	{
		text: "Prompt: 'List the key specifications for the 'Model X' smartphone from the provided product sheet.' Criterion: 'Compares the camera specifications of the 'Model X' to its main competitor, the 'Photon Pro'.'",
		choices: { a: 'Prompt-rubric mismatch', b: 'No mismatch' }
	}
]

// Usage
const clud = [
	'b',
	'c',
	'c',
	'b',
	'b',
	'a',
	'c',
	'c',
	'b',
	'c',
	'b',
	'b',
	'd',
	'e',
	'b',
	'c',
	'b',
	'e',
	'd',
	'e',
	'b',
	'a',
	'e',
	'a',
	'b',
	'a',
	'a'
]
const deep = [
	'b',
	'c',
	'c',
	'a',
	'b',
	'a',
	'c',
	'c',
	'b',
	'c',
	'b',
	'b',
	'd',
	'a',
	'b',
	'c',
	'b',
	'e',
	'd',
	'e',
	'b',
	'a',
	'e',
	'a',
	'b',
	'a',
	'a'
]
const grok = [
	'b',
	'c',
	'c',
	'b',
	'b',
	'a',
	'c',
	'c',
	'b',
	'c',
	'b',
	'a',
	'd',
	'a',
	'b',
	'c',
	'b',
	'b',
	'd',
	'a',
	'b',
	'a',
	'a',
	'a',
	'b',
	'a',
	'a'
]
const chat = [
	'b',
	'c',
	'c',
	'b',
	'b',
	'a',
	'c',
	'c',
	'b',
	'c',
	'b',
	'b',
	'd',
	'b',
	'b',
	'c',
	'b',
	'b',
	'd',
	'a',
	'b',
	'a',
	'a',
	'a',
	'b',
	'a',
	'a'
]
const veni = [
	'b',
	'c',
	'c',
	'b',
	'b',
	'a',
	'c',
	'c',
	'b',
	'c',
	'b',
	'b',
	'e',
	'd',
	'b',
	'b',
	'c',
	'e',
	'b',
	'a',
	'b',
	'a',
	'a',
	'a',
	'b',
	'b',
	'a'
]

const comparison = compareArrays(clud, deep, grok, chat, veni, questions)

console.log('MATCHING STATUS:')
console.log(comparison.matching)

console.log('\nDIFFERENCES:')
console.log(comparison.differences)
