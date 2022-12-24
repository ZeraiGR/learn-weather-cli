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

const printWeather = async (city) => {
	try {
		const weather = await getWeather(process.env.CITY ?? city);
		console.log(weather);
	} catch (e) {
		if (e?.response?.status === 404) {
			printError('Неверно указан город');
		} else if (e?.response?.status === 401) {
			printError('Неверно указан токен');
		} else if (e?.response?.status === 400) {
			printError('Не задан город, задайте его через команду -с [CITY]')
		} else{
			printError(e.message);
		}
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
	printWeather();
};

init();