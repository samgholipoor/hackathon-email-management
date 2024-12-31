import { useFetch } from '@/hooks/useFetch';
import { useMutate } from '@/hooks/useMutate';
import * as apis from './apis';

export const useGetDocumentedContract = (...props) =>
	useFetch((...body) => apis.getDocumentedContract(...body), ...props);

export const useCreateDocumentedContract = (...props) =>
	useMutate((...body) => apis.createDocumentedContract(...body), ...props);

export const usePatchDocumentedContract = (...props) =>
	useMutate((...body) => apis.patchDocumentedContract(...body), ...props);

export const useCreateDocumentedContractCreateTradeDraft = (...props) =>
	useMutate(
		(...body) => apis.createDocumentedContractCreateTradeDraft(...body),
		...props,
	);

export const useCreateDocumentedContractCreateVestDraft = (...props) =>
	useMutate((...body) => apis.createDocumentedContractCreateVestDraft(...body), ...props);
