import { useFetch } from '@/hooks/useFetch';
import { useMutate } from '@/hooks/useMutate';
import * as apis from './apis';

export const useGetToken = (...props) =>
	useFetch((...body) => apis.getToken(...body), ...props);

export const useCreateToken = (...props) =>
	useMutate((...body) => apis.createToken(...body), ...props);

export const useDeleteToken = (...props) =>
	useMutate((...body) => apis.deleteToken(...body), ...props);
