import { useFetch } from '@/hooks/useFetch';
import { useMutate } from '@/hooks/useMutate';
import * as apis from './apis';

export const useGetStockSource = (...props) =>
	useFetch((...body) => apis.getStockSource(...body), ...props);

export const useGetUserStock = (...props) =>
	useFetch((...body) => apis.getUserStock(...body), ...props);

export const useGetUserPausedStock = (...props) =>
	useFetch((...body) => apis.getUserPausedStock(...body), ...props);

export const useGetUserBlockedStock = (...props) =>
	useFetch((...body) => apis.getUserBlockStock(...body), ...props);

export const useCreateUserBlockedStock = (...props) =>
	useMutate((...body) => apis.createUserBlockStock(...body), ...props);

export const usePatchUserBlockedStock = (...props) =>
	useMutate((...body) => apis.patchUserBlockStock(...body), ...props);

export const useDeleteUserBlockedStock = (...props) =>
	useMutate((...body) => apis.deleteUserBlockStock(...body), ...props);

export const useCreateUserPromise = (...props) =>
	useMutate((...body) => apis.createUserPromise(...body), ...props);

export const useCreateUserPausedStock = (...props) =>
	useMutate((...body) => apis.createUserPausedStock(...body), ...props);

export const useGetUserStockGroups = (...props) =>
	useFetch((...body) => apis.getUserStockGroups(...body), ...props);

export const useGetUserStockGroup = (...props) =>
	useFetch((...body) => apis.getUserStockGroup(...body), ...props);

export const useGetMeetingMinutes = (...props) =>
	useFetch((...body) => apis.getMeetingMinutes(...body), ...props);

export const useCreateMeetingMinutes = (...props) =>
	useMutate((...body) => apis.createMeetingMinutes(...body), ...props);

export const useEditMeetingMinutes = (...props) =>
	useMutate((...body) => apis.editMeetingMinutes(...body), ...props);

export const useDeleteMeetingMinutes = (...props) =>
	useMutate((...body) => apis.deleteMeetingMinutes(...body), ...props);

export const useDeleteUserStockDelete = (...props) =>
	useMutate((...body) => apis.deleteUserStockDelete(...body), ...props);

export const useDeleteUserStockForceDelete = (...props) =>
	useMutate((...body) => apis.deleteUserStockForceDelete(...body), ...props);

export const usePatchUserPausedStock = (...props) =>
	useMutate((...body) => apis.patchUserPausedStock(...body), ...props);

export const useDeleteUserPausedStock = (...props) =>
	useMutate((...body) => apis.deleteUserPausedStock(...body), ...props);

export const useGetStockPrice = (...props) =>
	useFetch((...body) => apis.getStockPrice(...body), ...props);

export const useCreateStockPrice = (...props) =>
	useMutate((...body) => apis.createStockPrice(...body), ...props);

export const useCreateStockPriceByFile = (...props) =>
	useMutate((...body) => apis.createStockPriceByFile(...body), ...props);

export const usePatchStockPrice = (...props) =>
	useMutate((...body) => apis.patchStockPrice(...body), ...props);

export const useCreateUserStockCreateFile = (...props) =>
	useMutate((...body) => apis.createUserStockCreateFile(...body), ...props);
