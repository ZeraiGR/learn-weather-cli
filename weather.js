#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { setKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан token');
		return;
	}

	try {
		await setKeyValue(TOKEN_DICTIONARY.token, token);
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
		saveToken(args.t);
	}
	
	getWeather('moscow');
};

init();