import { useMutate } from '@/hooks/useMutate';
import { useFetch } from '@/hooks/useFetch';
import * as apis from './apis';

export const useGetAppConfig = (...props) =>
	useFetch((...body) => apis.getAppConfig(...body), ...props);

export const useGetConstant = (...props) =>
	useFetch((...body) => apis.getConstant(...body), ...props);

export const usePatchConstant = (...props) =>
	useMutate((...body) => apis.patchConstant(...body), ...props);
