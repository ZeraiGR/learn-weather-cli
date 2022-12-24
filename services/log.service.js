import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printWeather = (res, icon) => {
	console.log(
		dedent`
			${chalk.bgMagenta(' WEATHER ')} Погода в городе ${res.name}
			${icon}  ${res.weather[0].description}
			Температура ${res.main.temp}°
			Ощущается как: ${res.main.feels_like}°
			Ветер ${res.wind.speed} м/c
		`
	);
};

const printHelp = () => {
	console.log(dedent`
		${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-t [API_KEY] для сохранения токена
		-h для вывода помощи
	`);
};

export { printError, printSuccess, printHelp, printWeather };