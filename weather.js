#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { getKeyValue, setKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather, getIcon } from './services/api.service.js';

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

const saveCity = async (city) => {
	if (!city.length) {
		printError('Не передан city');
		return;
	}

	try {
		await setKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('Город сохранён!');
	} catch (e) {
		printError(e.message);
	}

	// try {
	// 	await getWeather(city);
	// } catch (e) {
	// 	printError('Такого города не существует! Проверьте правильность написания');
	// }
};

const getForecast = async () => {
	try {
		const city = await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(process.env.CITY ?? city);
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (e) {
		if (e?.response?.status === 404) {
			printError('Неверно указан город');
		} else if (e?.response?.status === 401) {
			printError('Неверно указан токен');
		} else if (e?.response?.status === 400) {
			printError('Не задан город, задайте его через команду -s [CITY]')
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
		saveCity(args.s);
	}
	if (args.t) {
		saveToken(args.t);
	}
	getForecast();
};

init();