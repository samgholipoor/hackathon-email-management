import { useFetch } from '@/hooks/useFetch';
import { useMutate } from '@/hooks/useMutate';
import * as apis from './apis';

export const useGetPromiseTypeSource = (...props) =>
	useFetch((...body) => apis.getPromiseTypeSource(...body), ...props);

export const useCreatePromiseTypeSource = (...props) =>
	useMutate((...body) => apis.createPromiseTypeSource(...body), ...props);

export const usePatchPromiseTypeSource = (...props) =>
	useMutate((...body) => apis.patchPromiseTypeSource(...body), ...props);

export const useDeletePromiseTypeSource = (...props) =>
	useMutate((...body) => apis.deletePromiseTypeSource(...body), ...props);

export const useGetUserPromiseStockDrafts = (...props) =>
	useFetch((...body) => apis.getUserPromiseStockDrafts(...body), ...props);

export const useGetUserPromiseStockDraft = (...props) =>
	useFetch((...body) => apis.getUserPromiseStockDraft(...body), ...props);

export const useChangeUserPromiseState = (...props) =>
	useMutate((...body) => apis.changeUserPromiseState(...body), ...props);

export const useUpdatePromiseDraft = (...props) =>
	useMutate((...body) => apis.updatePromiseDraft(...body), ...props);

export const useChangeAllPromiseDraftState = (...props) =>
	useMutate((...body) => apis.changeAllPromiseDraftState(...body), ...props);

export const useGetUserPromisedDetailed = (...props) =>
	useFetch((...body) => apis.getUserPromisedDetailed(...body), ...props);

export const useCreatePromiseDraft = (...props) =>
	useMutate((...body) => apis.createPromiseDraft(...body), ...props);

export const useCreatePromiseByFile = (...props) =>
	useMutate((...body) => apis.createPromiseByFile(...body), ...props);

export const useGetUserPromiseFileColumnNames = (...props) =>
	useFetch((...body) => apis.getUserPromiseFileColumnNames(...body), ...props);

export const useCreateVestingRecord = (...props) =>
	useMutate((...body) => apis.createVestingRecord(...body), ...props);

export const useGetVestingRecord = (...props) =>
	useFetch((...body) => apis.getVestingRecord(...body), ...props);

export const usePatchTransactionUserPromiseDetailVest = (...props) =>
	useMutate((...body) => apis.patchTransactionUserPromiseDetailVest(...body), ...props);

export const useGetPromiseTypeSourceUserHasStockOptions = (...props) =>
	useFetch((...body) => apis.getPromiseTypeSourceUserHasStockOptions(...body), ...props);

export const useGetPromiseGroups = (...props) =>
	useFetch((...body) => apis.getPromiseGroups(...body), ...props);

export const useDeletePromiseGroups = (...props) =>
	useMutate((...body) => apis.deletePromiseGroups(...body), ...props);

export const useCreatePromiseGroups = (...props) =>
	useMutate((...body) => apis.createPromiseGroups(...body), ...props);

export const usePatchPromiseGroups = (...props) =>
	useMutate((...body) => apis.patchPromiseGroups(...body), ...props);
