/* eslint-disable prefer-const */
import { ErrorResponse } from '@remix-run/router';
import createHttpClient from '@/utils/createHttpClient';
import { dynamicArgs } from '@/utils/dynamicArgs';
import { dispatchError } from '@/services/errorNotifier';
import { mergeUrls } from '@/utils/url';
import { getConfig } from '../config';
import { getAuthHeaders, refreshTokenAndSave } from '../auth';

const config = getConfig();

const httpClient = createHttpClient(config.BASE_URL + '/api/v1/', {
	'accept-language': 'fa',
});

interface CreateApi {
	url: string;
	headers?: object;
	method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
	transformResponse?: (e: any) => any;
	bodyType?: 'json' | 'formData' | 'blob';
	auth?: boolean;
}

const dynamicUrlParams = (url: string) =>
	url.split('/').filter((p: string) => p.startsWith(':'));

let isRefreshingAuth = false;
let retryRequestQueue = [];

export const createApi =
	({
		url,
		method = 'get',
		transformResponse = (x) => x,
		headers = {},
		bodyType = 'json',
		auth = true,
	}: CreateApi) =>
	(...args: any) => {
		const getNextArg = dynamicArgs(args);

		let finalUrl = url;
		dynamicUrlParams(url).forEach((dynamicUrlParam) => {
			const value = getNextArg();
			finalUrl = finalUrl.replace(dynamicUrlParam, value);
		});

		let body;
		let contentType;
		if (['post', 'delete', 'patch', 'put'].includes(method)) {
			body = getNextArg();
			if (bodyType === 'json') {
				body = JSON.stringify(body);
				contentType = 'application/json';
			} else if (bodyType === 'formData') {
				const formData = new FormData();
				Object.entries(body).forEach(([key, value]) => {
					// if (Array.isArray(value)) {
					// 	value.forEach((obj, index) => {
					// 		Object.entries(obj).forEach(([k, v]) => {
					// 			formData.append(`${key}[${index}]${k}`, v);
					// 		});
					// 	});
					// } else {
					// 	formData.append(key, value);
					// }
					if (Array.isArray(value)) {
						formData.append(key, JSON.stringify(value));
					} else {
						formData.append(key, value);
					}
				});
				body = formData;
			}
		}

		const queryParams = getNextArg();
		if (queryParams) {
			const fakeUrl = new URL('http://example.com');
			Object.entries(queryParams).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					return value.forEach((val) => fakeUrl.searchParams.append(key, val));
				}
				return fakeUrl.searchParams.append(key, value as string);
			});
			finalUrl += fakeUrl.search;
		}

		const abortController = new AbortController();
		const sendRequest = () =>
			httpClient[method](finalUrl, {
				headers: {
					// put auth header here
					...(auth && getAuthHeaders()),
					...headers,
					...(contentType && { 'content-type': contentType }),
				},
				body,
				signal: abortController.signal,
			});

		let finalPromise = sendRequest();

		finalPromise = finalPromise.catch(async (err: ErrorResponse) => {
			function throwGlobalError() {
				dispatchError(err, 'api');
				// eslint-disable-next-line @typescript-eslint/no-throw-literal
				throw err;
			}
			if (err.status === 401) {
				if (isRefreshingAuth) {
					await new Promise((resolve) => retryRequestQueue.push(resolve));
					return sendRequest();
				} else {
					try {
						isRefreshingAuth = true;
						await refreshTokenAndSave();
						isRefreshingAuth = false;

						retryRequestQueue.forEach((resolve) => resolve());
						retryRequestQueue = [];

						return sendRequest();
					} catch {
						throwGlobalError();
					}
				}
			}
			throwGlobalError();
		});

		finalPromise.cancel = () => abortController.abort();

		return finalPromise.then(transformResponse);
	};

export const fetchBlob =
	({ url }: { url: string }, onProgress: (e: 'done' | number) => void) =>
	(...args: any) => {
		let finalUrl = mergeUrls(config.BASE_URL + '/api/v1/' + url);

		const getNextArg = dynamicArgs(args);

		dynamicUrlParams(url).forEach((dynamicUrlParam) => {
			const value = getNextArg();
			finalUrl = finalUrl.replace(dynamicUrlParam, value);
		});

		const queryParams = getNextArg();
		if (queryParams) {
			const fakeUrl = new URL('http://example.com');
			Object.entries(queryParams).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					return value.forEach((val) => fakeUrl.searchParams.append(key, val));
				}
				return fakeUrl.searchParams.append(key, value as string);
			});
			finalUrl += fakeUrl.search;
		}

		return fetch(finalUrl, {
			headers: {
				...getAuthHeaders(),
			},
			responseType: 'blob',
		}).then((response) => {
			if (response.ok) {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				const blob = progress(response, onProgress);
				return blob;
			}
			throw new Error(response);
		});
	};

async function progress(response: Response, onProgress: (i: 'done' | number) => void) {
	let receivedLength = 0;

	const reader = response.body?.getReader();
	const totalLength = Number(response.headers.get('Content-Length')) || 100;

	const contentType = response.headers.get('Content-Type');
	let blob: Blob;

	const blobPromise = reader.read().then(function processFile({ done, value }) {
		if (done) {
			onProgress('done');
			reader.releaseLock();
			return blob;
		}

		receivedLength += value.byteLength;
		const progressPercent = Math.ceil((receivedLength / totalLength) * 100);
		onProgress(progressPercent);

		const chunk = new Uint8Array(value);
		if (!blob) {
			blob = new Blob([chunk], { type: contentType });
		} else {
			blob = new Blob([blob, chunk], { type: contentType });
		}

		return reader.read().then(processFile);
	});

	const finalBlob = await blobPromise;
	return finalBlob;
}
