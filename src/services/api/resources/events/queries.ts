import { useMutate } from '@/hooks/useMutate';
import { useFetch } from '@/hooks/useFetch';
import * as apis from './apis';

export const useGetSellOrders = (...props) =>
	useFetch((...body) => apis.getSellOrders(...body), ...props);

export const useGetBuyOrders = (...props) =>
	useFetch((...body) => apis.getBuyOrders(...body), ...props);

export const useGetOffersHistory = (...props) =>
	useFetch((...body) => apis.getOffersHistory(...body), ...props);

export const useGetStocksHistory = (...props) =>
	useFetch((...body) => apis.getStocksHistory(...body), ...props);

export const useBuyStock = (...props) =>
	useMutate((...body) => apis.buyStock(...body), ...props);

export const useSellStock = (...props) =>
	useMutate((...body) => apis.sellStock(...body), ...props);

export const useGetPriceChart = (...props) =>
	useFetch((...body) => apis.getPriceChart(...body), ...props);

export const useGetEvents = (...props) =>
	useFetch((...body) => apis.getEvents(...body), ...props);

export const useGetLastEvent = (...props) =>
	useFetch((...body) => apis.getLastEvent(...body), ...props);

export const useDeleteStock = (...props) =>
	useMutate((...body) => apis.deleteStock(...body), ...props);

export const useCreateTransferEvent = (...props) =>
	useMutate((...body) => apis.createTransferEvent(...body), ...props);

export const useEditTransferEvent = (...props) =>
	useMutate((...body) => apis.editTransferEvent(...body), ...props);

export const useRemoveEventCollateralBlocks = (...props) =>
	useMutate((...body) => apis.removeEventCollateralBlocks(...body), ...props);

export const useRemoveEventRemainingOffers = (...props) =>
	useMutate((...body) => apis.removeEventRemainingOffers(...body), ...props);

export const useCreateTransferEventManual = (...props) =>
	useMutate((...body) => apis.createTransferEventManual(...body), ...props);

export const useGetHistoryTransfer = (...props) =>
	useFetch((...body) => apis.getHistoryTransfer(...body), ...props);

export const useGetMangementVerify = (...props) =>
	useFetch((...body) => apis.getMangementVerify(...body), ...props);

export const useVerifyStock = (...props) =>
	useMutate((...body) => apis.verifyStock(...body), ...props);

export const useSignStockTransferHistory = (...props) =>
	useMutate((...body) => apis.signStockTransferHistory(...body), ...props);

export const useDeleteStockTransferHistorySignatureId = (...props) =>
	useMutate((...body) => apis.deleteStockTransferHistorySignatureId(...body), ...props);

export const useCreateEvent = (...props) =>
	useMutate((...body) => apis.createEvent(...body), ...props);

export const useUpdateEvent = (...props) =>
	useMutate((...body) => apis.updateEvent(...body), ...props);
