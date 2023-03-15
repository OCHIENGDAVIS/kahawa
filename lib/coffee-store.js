import { getStorePhotos } from '@/data/coffeee-mock';

export async function getStores(
	latLong = { lat: '-1.282783890853083', lng: '36.87932485694198' },
	limit
) {
	const { lat, lng } = latLong;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
		},
	};
	try {
		const url = constructQuery('Coffee', lat, lng, limit);
		const response = await fetch(url, options);
		const data = await response.json();
		const stores = data.results;
		let photos = await getStorePhotos();
		photos = photos.map((photo) => [
			photo.urls['small'],
			photo.urls['regular'],
		]);
		const coffeeStores = stores.map((store, index) => ({
			...store,
			images: photos[index],
		}));
		return coffeeStores;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export function constructQuery(query = 'Coffee', lat, lng, limit = 8) {
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${lat}%2C${lng}&limit=${limit}`;
}

export async function getOneStore(id) {
	const stores = await getStores();
	const store = stores.find((item) => String(item.fsq_id) === String(id));
	return store;
}
