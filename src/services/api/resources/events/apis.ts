import { createApi } from '@/services/api/lib';
import { generateUUID } from '@/utils/uuid';

const END_POINTS = {
	EVENT: '/event/',
	EVENT_ID: '/event/:id/',
	STOCK: '/user/stocks/:id/',
	STOCK_SELL: '/user/stocks/sell/',
	STOCK_BUY: '/user/stocks/buy/',
	OFFER_HISTORY: '/user/stocks/history/offer_history/',
	STOCK_HISTORY: '/user/stocks/history/stock_history/',
	PRICE_CHART: '/transfer-event/price_chart/',
	TRANSFER_EVENT: '/transfer-event/',
	TRANSFER_EVENT_MANUAL: '/transfer-event/:id/manual-transfer/',
	TRANSFER_EVENT_DETAILT: '/transfer-event/:id/',
	TRANSFER_EVENT_REMOVE_COLLATERAL_BLOCKS:
		'/transfer-event/:id/remove_collateral_blocks/',
	TRANSFER_EVENT_REMOVE_REMAINING_OFFERS: '/transfer-event/:id/remove_remaining_offers/',
	HISTORY_TRANSFER: '/history/transfer/',
	MANAGEMENT_VERIFY: '/history/transfer/approve_waiting/',
	STOCK_TRANSFER_HISTORY_SIGNATURE: '/stock-transfer-history-signature/',
	STOCK_TRANSFER_HISTORY_SIGNATURE_ID: '/stock-transfer-history-signature/:id/',
	VERIFY_STOCK: '/final-step-admin-verify/',
};

export const getEvents = createApi({
	url: END_POINTS.EVENT,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getLastEvent = createApi({
	url: END_POINTS.EVENT,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createEvent = createApi({
	url: END_POINTS.EVENT,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const updateEvent = createApi({
	url: END_POINTS.EVENT_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const getSellOrders = createApi({
	url: END_POINTS.STOCK_SELL,
	method: 'get',
	transformResponse: (res) => {
		const body = res.body;
		return {
			...body,
			results: body.results?.map((r) => ({
				...r,
				id: generateUUID(),
			})),
		};
	},
});

export const getBuyOrders = createApi({
	url: END_POINTS.STOCK_BUY,
	method: 'get',
	transformResponse: (res) => {
		const body = res.body;
		return {
			...body,
			results: body.results?.map((r) => ({
				...r,
				id: generateUUID(),
			})),
		};
	},
});

export const buyStock = createApi({
	url: END_POINTS.STOCK_BUY,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const sellStock = createApi({
	url: END_POINTS.STOCK_SELL,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getOffersHistory = createApi({
	url: END_POINTS.OFFER_HISTORY,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getStocksHistory = createApi({
	url: END_POINTS.STOCK_HISTORY,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getPriceChart = createApi({
	url: END_POINTS.PRICE_CHART,
	method: 'get',
	transformResponse: (res) => {
		const data = res.body;
		return {
			...data,
			results: data.results.map((item) => ({
				...item,
				label: item.event_name || item.date,
				value: Math.ceil(item.avg),
			})),
		};
	},
});

export const deleteStock = createApi({
	url: END_POINTS.STOCK,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const createTransferEvent = createApi({
	url: END_POINTS.TRANSFER_EVENT,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const editTransferEvent = createApi({
	url: END_POINTS.TRANSFER_EVENT_DETAILT,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const removeEventCollateralBlocks = createApi({
	url: END_POINTS.TRANSFER_EVENT_REMOVE_COLLATERAL_BLOCKS,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const removeEventRemainingOffers = createApi({
	url: END_POINTS.TRANSFER_EVENT_REMOVE_REMAINING_OFFERS,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const createTransferEventManual = createApi({
	url: END_POINTS.TRANSFER_EVENT_MANUAL,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getHistoryTransfer = createApi({
	url: END_POINTS.HISTORY_TRANSFER,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getMangementVerify = createApi({
	url: END_POINTS.MANAGEMENT_VERIFY,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const verifyStock = createApi({
	url: END_POINTS.VERIFY_STOCK,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const signStockTransferHistory = createApi({
	url: END_POINTS.STOCK_TRANSFER_HISTORY_SIGNATURE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const deleteStockTransferHistorySignatureId = createApi({
	url: END_POINTS.STOCK_TRANSFER_HISTORY_SIGNATURE_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});
