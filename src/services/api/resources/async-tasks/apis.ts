import { createApi } from '@/services/api/lib';

const END_POINTS = {
	CELERY_TASKS: '/celery-tasks/',
};

export const getCeleryTasks = createApi({
	url: END_POINTS.CELERY_TASKS,
	method: 'get',
	transformResponse: (res) => res.body,
});
