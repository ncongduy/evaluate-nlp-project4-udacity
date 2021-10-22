import { getDataFromServer } from '../src/client/js/getDataFromServer';

describe('get data from server', () => {
	test('it should get data from url (link)', async () => {
		const url = 'http://localhost:5000/data';
		const fetchData = await getDataFromServer(url);

        const input = typeof fetchData;
		const output = 'object';

		expect(typeOfData(input)).toEqual(output);
	});
});
