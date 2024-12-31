import { useFetch } from '@/hooks/useFetch';
import * as apis from './apis';

export const useGetCeleryTasks = (...props) =>
	useFetch((...body) => apis.getCeleryTasks(...body), ...props);
