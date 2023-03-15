import { createContext, useReducer } from 'react';

import storeReducer from './store.reducer';

export const StoreContext = createContext();

export default function StoreContextProvider(props) {
	const initialState = { latLong: { lat: '', lng: '' }, coffeeStores: [] };
	const [state, dispatch] = useReducer(storeReducer, initialState);
	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{props.children}
		</StoreContext.Provider>
	);
}
