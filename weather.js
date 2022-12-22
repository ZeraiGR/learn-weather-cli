#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printHelp, printMessage } from './services/log.servise.js';

const init = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		printHelp();
	}
	if (args.s) {
		// Сохранить город
	}
	if (args.t) {
		// Сохранить токен
	}
	// Вывести погоду
};

init();