import { useFetch } from '@/hooks/useFetch';
import { useMutate } from '@/hooks/useMutate';
import * as apis from './apis';

export const useGetReports = (...props) =>
	useFetch((...body) => apis.getReports(...body), ...props);

export const useCreateReport = (...props) =>
	useMutate((...body) => apis.createReport(...body), ...props);

export const usePatchReport = (...props) =>
	useMutate((...body) => apis.patchReport(...body), ...props);

export const useDeleteReport = (...props) =>
	useMutate((...body) => apis.deleteReport(...body), ...props);

export const useGetReportFile = (...props) =>
	useFetch((...body) => apis.getReportFile(...body), ...props);

export const useGetReportFileLink = (...props) =>
	useFetch((...body) => apis.getReportFileLink(...body), ...props);
