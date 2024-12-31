import { useMutate } from '@/hooks/useMutate';
import * as apis from './apis';

export const useUploadFile = (...props) =>
	useMutate((...body) => apis.uploadFile(...body), ...props);
