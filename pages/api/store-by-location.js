import { getStores } from '@/lib/coffee-store';

export default async function storeByLocation(req, res) {
	const { latLong, limit } = req.query;
	try {
		const store = await getStores(latLong, limit);
		return res.status(200).json(store);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'something went wrong ' });
	}
}
