#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { setKeyValue } from './services/storage.service.js';

const setToken = async (token) => {
	try {
		await setKeyValue('token', token);
		printSuccess('Токен сохранён!');
	} catch (e) {
		printError(e.message);
	}
};

const init = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		printHelp();
	}
	if (args.s) {
	}
	if (args.t) {
		setToken(args.t);
	}
	// Вывести погоду
};

init();