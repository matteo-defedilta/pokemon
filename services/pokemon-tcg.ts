import axios from 'axios';

const API_URL = 'https://api.pokemontcg.io/v2';

const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		'X-Api-Key': process.env.POKEMON_TCG_API_KEY,
	},
});

export const getCards = async (params?: object) => {
	const response = await instance.get('/cards', { params });
	return response.data;
};

export const getFeaturedCards = async (
	pageSize: number = 20,
	orderBy?: string,
	q?: string
) => {
	const params = {
		pageSize: pageSize,
		orderBy: orderBy, //'-set.releaseDate'
		q: q,
	};
	const response = await instance.get('/cards', { params });
	return response.data;
};
