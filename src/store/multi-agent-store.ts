import { create } from 'zustand'

interface AgentState {
	topic: string
	loading: boolean
	results: {
		research: string
		content: string
		review: string
	} | null
	activeAgent: string | null
	error: string | null
	setTopic: (topic: string) => void
	setLoading: (loading: boolean) => void
	setResults: (results: any) => void
	setActiveAgent: (agent: string | null) => void
	setError: (error: string | null) => void
	reset: () => void
}

export const useMultiAgentStore = create<AgentState>((set) => ({
	topic: '',
	loading: false,
	results: null,
	activeAgent: null,
	error: null,
	setTopic: (topic) => set({ topic }),
	setLoading: (loading) => set({ loading }),
	setResults: (results) => set({ results }),
	setActiveAgent: (activeAgent) => set({ activeAgent }),
	setError: (error) => set({ error }),
	reset: () =>
		set({
			topic: '',
			loading: false,
			results: null,
			activeAgent: null,
			error: null
		})
}))
