import walletReducer from '@/redux/wallet-slice'
import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
	return configureStore({
		reducer: {
			wallet: walletReducer
		}
	})
}

// Infer types
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
