import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather.data.json');

const setKeyValue = async (key, value) => {
	let data = {};

	if (await isExist(filePath)) {
		data = JSON.parse(await promises.readFile(filePath));
	}

	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
	if (await isExist(filePath)) {
		const data = JSON.parse(await promises.readFile(filePath));
		return data[key];
	}

	return undefined;
};

const isExist = async (path) => {
	try {
		await promises.stat(path);
		return true;
	} catch (e) {
		return false;
	}
}

export { setKeyValue, getKeyValue };