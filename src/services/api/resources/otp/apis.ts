import { createApi } from '@/services/api/lib';

const END_POINTS = {
	CREATE_QR_CODE: '/otp/setup_device/',
	CONFIRM_OTP_DEVICE: '/otp/confirm_device/',
	DESTROY_USER_DEVICE: '/otp/destroy_user_devices/:id/',
};

export const createQRCode = createApi({
	url: END_POINTS.CREATE_QR_CODE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const confirmOTPDevice = createApi({
	url: END_POINTS.CONFIRM_OTP_DEVICE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const deleteUserOTP = createApi({
	url: END_POINTS.DESTROY_USER_DEVICE,
	method: 'delete',
	transformResponse: (res) => res.body,
});
