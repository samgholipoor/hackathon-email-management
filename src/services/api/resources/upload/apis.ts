import { createApi } from '@/services/api/lib';

const END_POINTS = {
	RESOURCE_UPLOAD: '/upload/base64/',
};

export const uploadFile = createApi({
	url: END_POINTS.RESOURCE_UPLOAD,
	method: 'post',
	transformResponse: (res) => res.body,
});
