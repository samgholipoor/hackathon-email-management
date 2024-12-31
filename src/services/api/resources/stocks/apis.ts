import { createApi } from '@/services/api/lib';

const END_POINTS = {
	STOCK_SOURCE: '/stock-source/',
	USER_STOCK: '/user-stock/user-promise/',
	USER_STOCK_CREATE_FILE: '/user-stock/user-promise/file_create/',
	USER_BLOCK_STOCK: '/transactions/user-blocked-stock/',
	USER_BLOCK_STOCK_ID: '/transactions/user-blocked-stock/:id/',
	USER_PAUSED_STOCK: '/user-stock/user-paused-stock/',
	USER_PAUSED_STOCK_ID: '/user-stock/user-paused-stock/:id/',
	USER_STOCK_DELETE: '/user-stock/user-promise/:id/',
	USER_STOCK_FORCE_DELETE: '/user-stock/user-promise/:id/force_delete/',
	USER_STOCK_GROUPS: '/promise-group/user-groups/:id/',
	USER_STOCK_GROUP_ID: '/user-stock/user-promise/user/:id/group/:group_id/',
	MEETING_MINUTES: '/meeting-minutes/',
	MEETING_MINUTES_ID: '/meeting-minutes/:id/',
	STOCK_PRICE: '/stock-price/',
	STOCK_PRICE_FILE_CREATE: '/stock-price/file_create/',
	STOCK_PRICE_ID: '/stock-price/:id/',
};

export const deleteUserStockDelete = createApi({
	url: END_POINTS.USER_STOCK_DELETE,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const deleteUserStockForceDelete = createApi({
	url: END_POINTS.USER_STOCK_FORCE_DELETE,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const getStockSource = createApi({
	url: END_POINTS.STOCK_SOURCE,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getUserStock = createApi({
	url: END_POINTS.USER_STOCK,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getUserPausedStock = createApi({
	url: END_POINTS.USER_PAUSED_STOCK,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const patchUserPausedStock = createApi({
	url: END_POINTS.USER_PAUSED_STOCK_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const deleteUserPausedStock = createApi({
	url: END_POINTS.USER_PAUSED_STOCK_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const createUserPromise = createApi({
	url: END_POINTS.USER_STOCK,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getUserBlockStock = createApi({
	url: END_POINTS.USER_BLOCK_STOCK,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createUserBlockStock = createApi({
	url: END_POINTS.USER_BLOCK_STOCK,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const patchUserBlockStock = createApi({
	url: END_POINTS.USER_BLOCK_STOCK_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const deleteUserBlockStock = createApi({
	url: END_POINTS.USER_BLOCK_STOCK_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const createUserPausedStock = createApi({
	url: END_POINTS.USER_PAUSED_STOCK,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getUserStockGroups = createApi({
	url: END_POINTS.USER_STOCK_GROUPS,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getUserStockGroup = createApi({
	url: END_POINTS.USER_STOCK_GROUP_ID,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getMeetingMinutes = createApi({
	url: END_POINTS.MEETING_MINUTES,
	method: 'get',
	transformResponse: (res) => {
		return {
			...res.body,
			results: res.body?.results?.map((stockbook) => ({
				...stockbook,
				stock_book_files: stockbook?.stock_book_files?.map((f) => f.file),
			})),
		};
	},
});

export const createMeetingMinutes = createApi({
	url: END_POINTS.MEETING_MINUTES,
	method: 'post',
	transformResponse: (res) => res.body,
	bodyType: 'formData',
});

export const editMeetingMinutes = createApi({
	url: END_POINTS.MEETING_MINUTES_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
	bodyType: 'formData',
});

export const deleteMeetingMinutes = createApi({
	url: END_POINTS.MEETING_MINUTES_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const getStockPrice = createApi({
	url: END_POINTS.STOCK_PRICE,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const patchStockPrice = createApi({
	url: END_POINTS.STOCK_PRICE_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const createStockPrice = createApi({
	url: END_POINTS.STOCK_PRICE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const createStockPriceByFile = createApi({
	url: END_POINTS.STOCK_PRICE_FILE_CREATE,
	method: 'post',
	transformResponse: (res) => res.body,
	bodyType: 'formData',
});

export const createUserStockCreateFile = createApi({
	url: END_POINTS.USER_STOCK_CREATE_FILE,
	method: 'post',
	transformResponse: (res) => res.body,
	bodyType: 'formData',
});
