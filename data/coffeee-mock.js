import { createApi } from 'unsplash-js';

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const stores = [
	{
		fsq_id: '55f56712498e107464613d32',
		categories: [],
		chains: [],
		distance: 5786,
		geocodes: { main: [] },
		link: '/v3/places/55f56712498e107464613d32',
		location: {
			country: 'KE',
			cross_street: '',
			formatted_address: 'Nairobi',
			locality: 'Nairobi',
			region: 'Nairobi',
		},
		name: 'Java House',
		related_places: { parent: [] },
		timezone: 'Africa/Nairobi',
	},
	{
		fsq_id: '528cf126498e65733eb37078',
		categories: [],
		chains: [],
		distance: 6255,
		geocodes: { main: [] },
		link: '/v3/places/528cf126498e65733eb37078',
		location: {
			address: 'Thika Road Mall',
			country: 'KE',
			cross_street: 'Thika Super Highway',
			formatted_address: 'Thika Road Mall (Thika Super Highway), Nairobi',
			locality: 'Nairobi',
			region: 'Nairobi',
		},
		name: 'Artcaffe TRM',
		related_places: { parent: [] },
		timezone: 'Africa/Nairobi',
	},
	{
		fsq_id: '5195f569498e0b9f313090e9',
		categories: [[]],
		chains: [],
		distance: 6209,
		geocodes: { main: [] },
		link: '/v3/places/5195f569498e0b9f313090e9',
		location: {
			address: 'Thika Road',
			country: 'KE',
			cross_street: '',
			formatted_address: 'Thika Road, Nairobi',
			locality: 'Nairobi',
			region: 'Nairobi',
		},
		name: 'Nairobi Java House',
		related_places: { parent: [] },
		timezone: 'Africa/Nairobi',
	},
	{
		fsq_id: '4d441c1dbefe236a8326f1e2',
		categories: [[]],
		chains: [],
		distance: 7057,
		geocodes: { main: [] },
		link: '/v3/places/4d441c1dbefe236a8326f1e2',
		location: {
			address: 'USIU',
			country: 'KE',
			cross_street: 'Thika Road',
			formatted_address: 'USIU (Thika Road), Nairobi',
			locality: 'Nairobi',
			region: 'Nairobi',
		},
		name: 'cafelatta, The Coffee House',
		related_places: {},
		timezone: 'Africa/Nairobi',
	},
	{
		fsq_id: '4fdb4b5ee4b03d02684fe4eb',
		categories: [[]],
		chains: [],
		distance: 6141,
		geocodes: {},
		link: '/v3/places/4fdb4b5ee4b03d02684fe4eb',
		location: {
			address: 'Taj Mall',
			country: 'KE',
			cross_street: '',
			formatted_address: 'Taj Mall, Nairobi',
			locality: 'Nairobi',
			region: 'Nairobi',
		},
		name: 'erick cookies, taj mall',
		related_places: {},
		timezone: 'Africa/Nairobi',
	},
	{
		fsq_id: '55f17875498e06762c048cf3',
		categories: [],
		chains: [],
		distance: 5726,
		geocodes: { main: [] },
		link: '/v3/places/55f17875498e06762c048cf3',
		location: {
			address: 'Garden City Mall',
			country: 'KE',
			cross_street: '',
			formatted_address: 'Garden City Mall, Nairobi',
			locality: 'Nairobi',
			region: 'Nairobi',
		},
		name: 'Art Caffé - Garden City',
		related_places: { parent: [] },
		timezone: 'Africa/Nairobi',
	},
	{
		fsq_id: '548314fe498e2f29fc12af30',
		categories: [[]],
		chains: [],
		distance: 7008,
		geocodes: { main: [] },
		link: '/v3/places/548314fe498e2f29fc12af30',
		location: {
			address: 'Jomo Kenyatta International Airport',
			country: 'KE',
			cross_street: 'Terminal 1',
			formatted_address:
				'Jomo Kenyatta International Airport (Terminal 1), Nairobi',
			locality: 'Nairobi',
			region: 'Nairobi',
		},
		name: 'Paul Caffe',
		related_places: { parent: [] },
		timezone: 'Africa/Nairobi',
	},
	{
		fsq_id: '4f8c2d3fe4b0ddfd84bd64ff',
		categories: [[]],
		chains: [],
		distance: 2668,
		geocodes: { main: [] },
		link: '/v3/places/4f8c2d3fe4b0ddfd84bd64ff',
		location: { country: 'KE', cross_street: '', formatted_address: '' },
		name: 'Chocho Habour- Greespan Mall.',
		related_places: {},
		timezone: 'Africa/Nairobi',
	},
];

export async function getStorePhotos() {
	try {
		const photos = await unsplash.search.getPhotos({
			query: 'Coffee photos',
			page: 1,
			perPage: 10,
		});
		const unsplashResults = photos.response.results;
		return unsplashResults;
	} catch (error) {
		console.log(error);
		throw new Error(error.message);
	}
}

export async function getAllStores() {
	try {
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
		throw new Error(error);
	}
}

export async function getStoreById(id) {
	let photos = await getStorePhotos();
	photos = photos.map((photo) => [
		photo.urls['small'],
		photo.urls['regular'],
	]);
	const coffeeStores = stores.map((store, index) => ({
		...store,
		images: photos[index],
	}));

	const store = await coffeeStores.find((item) => item.fsq_id === id);
	return store;
}
