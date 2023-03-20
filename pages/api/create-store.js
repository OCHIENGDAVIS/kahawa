import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base(
	process.env.AIRTABLE_BASE
);

const table = base('coffee-stores');

const createStore = async (req, res) => {
	switch (req.method) {
		case 'POST':
			const { fsq_id, name, address, neighborhood, voting, imgUrl } =
				req.body;

			try {
				const coffeeStoreRecords = await table
					.select({
						filterByFormula: `fsq_id="${fsq_id}"`,
					})
					.firstPage();
				if (coffeeStoreRecords.length !== 0) {
					const records = coffeeStoreRecords.map((record) => {
						return {
							...record.fields,
						};
					});
					return res.json({ type: 'success', records });
				} else {
					// create a new coffee store
					console.log('NAME:', req.body);
					const createRecords = await table.create([
						{
							fields: {
								...req.body,
							},
						},
					]);
					const records = createRecords.map((record) => {
						return {
							...record.fields,
						};
					});
					return res.json({
						type: 'success',
						message: 'created successfully',
						records,
					});
				}
			} catch (error) {
				console.log(error);
				return res.status(400).json({
					type: 'error',
					message: 'Error finding the store',
					error,
				});
			}
		default:
			return res.json({ message: 'method not supported' });
	}
};

export default createStore;
