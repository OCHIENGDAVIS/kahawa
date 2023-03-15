import { SET_LAT_LONG, SET_COFFEE_STORES } from './action-types';

export default function storeReducer(state, action) {
	switch (action.type) {
		case SET_LAT_LONG:
			return {
				...state,
				latLong: { lat: action.payload.lat, lng: action.payload.lng },
			};
		case SET_COFFEE_STORES:
			return {
				...state,
				coffeeStores: [...action.payload.coffeeStores],
			};

		default:
			return state;
	}
}
