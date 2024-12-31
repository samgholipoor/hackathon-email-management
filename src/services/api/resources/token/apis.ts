import { createApi } from '@/services/api/lib';

const END_POINTS = {
	TOKEN: '/token/',
	CREAT_TOKEN: '/token/create-token/',
	DELETE_TOKEN: '/token/delete-token/',
};

export const getToken = createApi({
	url: END_POINTS.TOKEN,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createToken = createApi({
	url: END_POINTS.CREAT_TOKEN,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const deleteToken = createApi({
	url: END_POINTS.DELETE_TOKEN,
	method: 'post',
	transformResponse: (res) => res.body,
});
