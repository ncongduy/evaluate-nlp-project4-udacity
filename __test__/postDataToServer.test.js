import { postDataToServer } from '../src/client/js/postDataToServer';

describe('post data to server', () => {
	test('post data', async () => {
		const arrayInput = ['txt=test', 'http://localhost:5000/data'];
		const input = await postDataToServer(arrayInput[0], arrayInput[1]);
		const output = 'http://localhost:5000/data';

		expect(input).toEqual(output);
	});
});
