import { useMutate } from '@/hooks/useMutate';
import * as apis from './apis';

export const useCreateQRCode = (...props) =>
	useMutate((...body) => apis.createQRCode(...body), ...props);

export const useConfirmOTPDevice = (...props) =>
	useMutate((...body) => apis.confirmOTPDevice(...body), ...props);

export const useDeleteUserOTP = (...props) =>
	useMutate((...body) => apis.deleteUserOTP(...body), ...props);
