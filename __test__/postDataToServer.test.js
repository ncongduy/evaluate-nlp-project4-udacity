import { postDataToServer } from '../src/client/js/postDataToServer';

describe('post data to server', () => {
	test('post data', async () => {
		const arrayInput = ['test', 'http://localhost:5000/test'];
		const input = await postDataToServer(arrayInput[0], arrayInput[1]);
		const output = 'http://localhost:5000/test';

		expect(input).toEqual(output);
	});
});
