// Create a Redux slice for managing wallet connection state
// Requirements:
// - State: address, chainId, isConnecting, error
// - Actions: connect, disconnect, switchChain
// - Async thunk for connecting wallet
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BrowserProvider } from 'ethers'

// For Ethereum interaction
declare global {
	interface Window {
		ethereum?: any
	}
}

interface WalletState {
	address: string | null
	chainId: number | null
	isConnecting: boolean
	isConnected: boolean
	error: string | null
}

const initialState: WalletState = {
	address: null,
	chainId: null,
	isConnecting: false,
	isConnected: false,
	error: null
}

// Create async thunk for connecting
export const connectWallet = createAsyncThunk('wallet/connect', async (_, { rejectWithValue }) => {
	try {
		if (!window.ethereum) {
			throw new Error('Web3 provider not found')
		}

		const provider = new BrowserProvider(window.ethereum)
		const accounts = await provider.send('eth_requestAccounts', [])
		console.log('accounts :', accounts)

		if (!accounts) {
			throw new Error('Unable to connect to Ethereum')
		}

		const network = await provider.getNetwork()
		console.log('Network:', network)

		return {
			address: accounts[0],
			chainId: Number(network.chainId)
		}
	} catch (error: any) {
		console.error('Failed to connect to Ethereum:', error)
		return rejectWithValue(error.message || 'Failed to connect to Ethereum')
	}
})

const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		disconnect: (state) => {
			state.address = null
			state.chainId = null
			state.isConnected = false
			state.error = null
		},
		switchChain: (state, action: PayloadAction<number>) => {
			state.chainId = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(connectWallet.pending, (state) => {
				state.isConnecting = true
				state.error = null
			})
			.addCase(connectWallet.fulfilled, (state, action) => {
				state.address = action.payload.address
				state.chainId = action.payload.chainId
				state.isConnecting = false
				state.isConnected = true
			})
			.addCase(connectWallet.rejected, (state, action) => {
				state.error = action.payload as string
				state.isConnecting = false
			})
	}
})

export const { disconnect, switchChain } = walletSlice.actions
export default walletSlice.reducer
