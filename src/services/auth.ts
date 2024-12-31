import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import createHttpClient from '@/utils/createHttpClient';
import Storage from '@/utils/storage';
import { STORAGE_KEYS } from '@/constants';
import { getConfig } from './config';
import { dispatchError } from './errorNotifier';

interface UserInfo {
	user_id: number;
	otp_verified: boolean;
}

export interface UserCredentialsProps extends UserInfo {
	access: string;
	refresh: string;
}

const config = getConfig();

const httpClient = createHttpClient(config.BASE_URL + '/api/v1/', {
	'content-type': 'application/json',
	'accept-language': 'fa',
});

const getUserFromStorage = (): UserCredentialsProps => Storage.get(STORAGE_KEYS.USER);

const getUserInfo = (s: string): UserInfo => {
	const { user_id, otp_verified } = jwtDecode(s) as UserInfo;

	return {
		user_id,
		otp_verified,
	};
};

export const getUser = (): UserCredentialsProps | null => {
	const user = getUserFromStorage();

	if (!user) {
		return null;
	}

	return {
		...user,
		...getUserInfo(user.access),
	};
};

export const getAuthHeaders = () => {
	try {
		return {
			authorization: `Bearer ${getUserFromStorage().access}`,
		};
	} catch (error) {
		return {};
	}
};

type CallbackListener = (e: any) => void;

let changeListeners: CallbackListener[] = [];

const callChangeListeners = (newUser: any) => {
	changeListeners.forEach((callback) => callback(newUser));
};

export const onUserChange = (callback: CallbackListener) => {
	changeListeners = [...changeListeners, callback];
};

export const offUserChange = (callback: CallbackListener) => {
	const index = changeListeners.indexOf(callback);
	if (index > -1) {
		changeListeners = [
			...changeListeners.slice(0, index),
			...changeListeners.slice(index + 1),
		];
	}
};

export const logout = () => {
	Storage.remove(STORAGE_KEYS.USER);
	callChangeListeners({});
};

export const login = (credentials: {
	email: string;
	password: string;
	otp_code: string;
}) => {
	return httpClient
		.post('login/', {
			body: JSON.stringify(credentials),
		})
		.then((data: any) => {
			const user: Pick<UserCredentialsProps, 'access' | 'refresh'> = {
				access: data.body.access,
				refresh: data.body.refresh,
			};

			Storage.set(STORAGE_KEYS.USER, user);
			callChangeListeners({ ...user, ...getUserInfo(data.body.access) });
			return data;
		})
		.catch((e: Error) => {
			dispatchError(e, 'api');
			Storage.remove(STORAGE_KEYS.USER);
			callChangeListeners(null);
			throw e;
		});
};

export const refreshTokenAndSave = () => {
	const { refresh } = getUserFromStorage() || {};

	if (!refresh) {
		Storage.remove(STORAGE_KEYS.USER);
		callChangeListeners(null);
		return Promise.reject();
	}

	return httpClient
		.post('login/refresh/', {
			headers: {
				...getAuthHeaders(),
			},
			body: JSON.stringify({
				refresh,
			}),
		})
		.then((data: any) => {
			const user = getUserFromStorage();
			const currentUser = {
				...user,
				access: data.body.access,
			};
			Storage.set(STORAGE_KEYS.USER, currentUser);
			callChangeListeners({ ...currentUser, ...getUserInfo(data.body.access) });
			return data;
		})
		.catch((e: Error) => {
			dispatchError(e, 'api');
			Storage.remove(STORAGE_KEYS.USER);
			callChangeListeners(null);
			throw e;
		});
};

export const forgotPassword = (formData: object) => {
	return httpClient
		.post('user/forgot/', {
			body: JSON.stringify(formData),
		})
		.then((data: any) => {
			return data;
		})
		.catch((e: Error) => {
			dispatchError(e, 'api');
			throw e;
		});
};

export const resetPassword = (formData: object) => {
	return httpClient
		.post('user/reset/', {
			body: JSON.stringify(formData),
		})
		.then((data: any) => {
			return data;
		})
		.catch((e: Error) => {
			dispatchError(e, 'api');
			throw e;
		});
};

export const useUserCredentials = (): UserCredentialsProps | null => {
	const [userCredentials, setUserCredentials] = useState<UserCredentialsProps | null>(
		getUser(),
	);

	useEffect(() => {
		onUserChange(setUserCredentials);
		return () => {
			offUserChange(setUserCredentials);
		};
	}, []);

	return userCredentials;
};
