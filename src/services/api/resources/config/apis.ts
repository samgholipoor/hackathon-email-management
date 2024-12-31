import { createApi } from '@/services/api/lib';

const END_POINTS = {
	CONFIG: '/config/config/',
	CONSTANT: '/constant/',
	CONSTANT_ID: '/constant/:id/',
};

export const getAppConfig = createApi({
	url: END_POINTS.CONFIG,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getConstant = createApi({
	url: END_POINTS.CONSTANT,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const patchConstant = createApi({
	url: END_POINTS.CONSTANT_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});
