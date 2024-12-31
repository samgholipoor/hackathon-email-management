import { createApi } from '@/services/api/lib';

const END_POINTS = {
	CREDITS: '/credits/',
	CREDITS_WITHDRAW: '/credits/withdraw/',
	GET_DEPOSIT_LINK: '/credits/get_deposit_link/',
	WITHDRAWS: '/withdraw/withdraw_list/',
	ADD_REAL_CREDIT: '/credits/add_real_credit_by_admin/',
	ADD_VIRTUAL_CREDIT: '/virtual-credit/change_virtual_credit_by_admin/',
	REQUEST_VIRTUAL_CREDIT: '/virtual-credit/request-credit/',
	WITHDRAW: '/withdraw/',
	DEPOSIT: '/deposit/',
	REJECT_WITHDRAW: '/withdraw/:id/reject_withdraw/',
	VERIFY_WITHDRAW: '/withdraw/:id/verify_withdraw/',
};

export const getCredits = createApi({
	url: END_POINTS.CREDITS,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getWithdraws = createApi({
	url: END_POINTS.WITHDRAWS,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getDepositLink = createApi({
	url: END_POINTS.GET_DEPOSIT_LINK,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const withdrawFromAccount = createApi({
	url: END_POINTS.CREDITS_WITHDRAW,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const addRealCredit = createApi({
	url: END_POINTS.ADD_REAL_CREDIT,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const addVirtualCredit = createApi({
	url: END_POINTS.ADD_VIRTUAL_CREDIT,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const requestVirtualCredit = createApi({
	url: END_POINTS.REQUEST_VIRTUAL_CREDIT,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getUserWithdraws = createApi({
	url: END_POINTS.WITHDRAW,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getUserDeposits = createApi({
	url: END_POINTS.DEPOSIT,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const rejectWithdraw = createApi({
	url: END_POINTS.REJECT_WITHDRAW,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const verifyWithdraw = createApi({
	url: END_POINTS.VERIFY_WITHDRAW,
	method: 'post',
	transformResponse: (res) => res.body,
});
