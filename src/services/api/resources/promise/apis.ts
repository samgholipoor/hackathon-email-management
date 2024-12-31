import { createApi } from '@/services/api/lib';

const END_POINTS = {
	PROMISE_TYPE_SOURCE: '/promise-type-source/',
	PROMISE_TYPE_SOURCE_ID: '/promise-type-source/:id/',
	PROMISE_TYPE_SOURCE_USER_HAS_STOCK: '/promise-type-source/user-has-stock/:id/',
	USER_PROMISE_STOCK_DRAFT: '/user-promise-stock-draft/',
	USER_PROMISE_STOCK_DRAFT_ID: '/user-promise-stock-draft/:id/',
	CHANGE_PROMISE_DRAFT_STATE:
		'/user-promise-stock-draft/bulk-change-promise-draft-state/',
	CHANGE_ALL_PROMISE_DRAFT_STATE: '/user-promise-stock-draft/change_state_of_all/',
	USER_PROMISED_DETAILED: '/user-promise-detail/',
	CREATE_PROMISE_DRAFT: '/user-promise-stock-draft/bulk-create-promise-draft/',
	CREATE_PROMISE_DRAFT_BY_FILE: '/user-promise-stock-draft/file_create/',
	USER_PROMISE_FILE_COLUMN_NAMES: '/user-promise-stock-draft/create_file_column_names/',
	UPDATE_PROMISE_DRAFT: '/user-promise-stock-draft/create-drafts-automatically/',
	VESTING_RECORD: '/vesting-record/',
	VESTING_RECORD_ID: '/vesting-record/:id/',
	TRANSACTIONS_USER_PROMISE_DETAIL_VEST: '/transactions/user-promise-detail-vest/:id/',
	PROMISE_GROUP: '/promise-group/',
	PROMISE_GROUP_ID: '/promise-group/:id/',
};

export const getPromiseTypeSource = createApi({
	url: END_POINTS.PROMISE_TYPE_SOURCE,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createPromiseTypeSource = createApi({
	url: END_POINTS.PROMISE_TYPE_SOURCE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const patchPromiseTypeSource = createApi({
	url: END_POINTS.PROMISE_TYPE_SOURCE_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const deletePromiseTypeSource = createApi({
	url: END_POINTS.PROMISE_TYPE_SOURCE_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const getUserPromiseStockDrafts = createApi({
	url: END_POINTS.USER_PROMISE_STOCK_DRAFT,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getUserPromiseStockDraft = createApi({
	url: END_POINTS.USER_PROMISE_STOCK_DRAFT_ID,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const changeUserPromiseState = createApi({
	url: END_POINTS.CHANGE_PROMISE_DRAFT_STATE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const updatePromiseDraft = createApi({
	url: END_POINTS.UPDATE_PROMISE_DRAFT,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const changeAllPromiseDraftState = createApi({
	url: END_POINTS.CHANGE_ALL_PROMISE_DRAFT_STATE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getUserPromisedDetailed = createApi({
	url: END_POINTS.USER_PROMISED_DETAILED,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createPromiseDraft = createApi({
	url: END_POINTS.CREATE_PROMISE_DRAFT,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const createPromiseByFile = createApi({
	url: END_POINTS.CREATE_PROMISE_DRAFT_BY_FILE,
	method: 'post',
	transformResponse: (res) => res.body,
	bodyType: 'formData',
});

export const getUserPromiseFileColumnNames = createApi({
	url: END_POINTS.USER_PROMISE_FILE_COLUMN_NAMES,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createVestingRecord = createApi({
	url: END_POINTS.VESTING_RECORD,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getVestingRecord = createApi({
	url: END_POINTS.VESTING_RECORD_ID,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const patchTransactionUserPromiseDetailVest = createApi({
	url: END_POINTS.TRANSACTIONS_USER_PROMISE_DETAIL_VEST,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const getPromiseTypeSourceUserHasStockOptions = createApi({
	url: END_POINTS.PROMISE_TYPE_SOURCE_USER_HAS_STOCK,
	method: 'get',
	transformResponse: (res) => {
		const { results } = res.body || {};
		return results.map((company) => ({
			label: company.name,
			value: company.id,
		}));
	},
});

export const getPromiseGroups = createApi({
	url: END_POINTS.PROMISE_GROUP,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const deletePromiseGroups = createApi({
	url: END_POINTS.PROMISE_GROUP_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const createPromiseGroups = createApi({
	url: END_POINTS.PROMISE_GROUP,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const patchPromiseGroups = createApi({
	url: END_POINTS.PROMISE_GROUP_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});
