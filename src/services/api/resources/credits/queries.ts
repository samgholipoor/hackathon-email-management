import { useFetch } from '@/hooks/useFetch';
import { useMutate } from '@/hooks/useMutate';
import * as apis from './apis';

export const useGetWithdraws = (...props) =>
	useFetch((...body) => apis.getWithdraws(...body), ...props);

export const useGetDepositLink = (...props) =>
	useMutate((...body) => apis.getDepositLink(...body), ...props);

export const useWithdrawFromAcount = (...props) =>
	useMutate((...body) => apis.withdrawFromAccount(...body), ...props);

export const useAddRealCredit = (...props) =>
	useMutate((...body) => apis.addRealCredit(...body), ...props);

export const useAddVirtualCredit = (...props) =>
	useMutate((...body) => apis.addVirtualCredit(...body), ...props);

export const useRequestVirtualCredit = (...props) =>
	useMutate((...body) => apis.requestVirtualCredit(...body), ...props);

export const useGetUserWithdraws = (...props) =>
	useFetch((...body) => apis.getUserWithdraws(...body), ...props);

export const useGetUserDeposits = (...props) =>
	useFetch((...body) => apis.getUserDeposits(...body), ...props);

export const useRejectWithdraw = (...props) =>
	useMutate((...body) => apis.rejectWithdraw(...body), ...props);

export const useVerifyWithdraw = (...props) =>
	useMutate((...body) => apis.verifyWithdraw(...body), ...props);
