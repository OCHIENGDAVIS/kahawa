export async function getStores() {
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: process.env.FOURSQUARE_API_KEY,
		},
	};
	try {
		const url = constructQuery(
			'Coffee',
			-1.2695266280335928,
			36.91481585110427,
			8
		);
		const response = await fetch(url, options);
		const data = await response.json();
		const stores = data.results;
		return stores;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export function constructQuery(query = 'Coffee', lat, lng, limit) {
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${lat}%2C${lng}&limit=${limit}`;
}

export async function getOneStore(id) {
	const stores = await getStores();
	const store = stores.find((item) => item.fsq_id === id);
	return store;
}
