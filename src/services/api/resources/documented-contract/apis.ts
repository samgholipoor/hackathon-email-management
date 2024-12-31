import { createApi } from '@/services/api/lib';

const END_POINTS = {
	DOCUMENTED_CONTRACT: '/documented-contract/',
	DOCUMENTED_CONTRACT_ID: '/documented-contract/:id/',
	DOCUMENTED_CONTRACT_CREATE_TRADE_DRAFT:
		'/documented-contract/create-trade-event-drafts-automatically/',
	DOCUMENTED_CONTRACT_CREATE_VEST_DRAFT:
		'/documented-contract/create-vest-drafts-automatically/',
};

export const getDocumentedContract = createApi({
	url: END_POINTS.DOCUMENTED_CONTRACT,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createDocumentedContract = createApi({
	url: END_POINTS.DOCUMENTED_CONTRACT,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const patchDocumentedContract = createApi({
	url: END_POINTS.DOCUMENTED_CONTRACT_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const deleteDocumentedContract = createApi({
	url: END_POINTS.DOCUMENTED_CONTRACT_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const createDocumentedContractCreateTradeDraft = createApi({
	url: END_POINTS.DOCUMENTED_CONTRACT_CREATE_TRADE_DRAFT,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const createDocumentedContractCreateVestDraft = createApi({
	url: END_POINTS.DOCUMENTED_CONTRACT_CREATE_VEST_DRAFT,
	method: 'post',
	transformResponse: (res) => res.body,
});
