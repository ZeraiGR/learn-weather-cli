import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

const getWeather = async (city) => {
	const apikey = await getKeyValue(TOKEN_DICTIONARY.token);

	if (!apikey) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
	}

	const {data: [{lat, lon}]} = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
		params: {
			q: city,
			appid: apikey,
			limit: 1
		}
	});

	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			lat,
			lon,
			appid: apikey,
			units: 'metric',
			lang: 'ru'
		}
	});

	return data;
};

export { getWeather };