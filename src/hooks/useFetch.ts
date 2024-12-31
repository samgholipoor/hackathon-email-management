/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Options {
	isInitialLoad: boolean;
	queries: object;
}

interface CancelablePromise<T> extends Promise<T> {
	cancel(): void;
}

export const useFetch = (
	request: () => CancelablePromise<any>,
	defaultValue?: any,
	dependencies: any[] = [],
	options = {},
) => {
	const [data, setData] = useState(defaultValue);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [cancelFetch, setCancelFetch] = useState<() => void>();
	const { isInitialLoad = true } = options as Options;
	const { queries = {} } = options as Options;

	const reload = useCallback((...props) => {
		setError('');
		setLoading((s) => !s);

		const sendRequest = request(...props);
		setCancelFetch(() => sendRequest.cancel);

		return sendRequest
			.then((e) => {
				setData(() => e);
				return e;
			})
			.catch((err) => {
				setError(err);
				setData(defaultValue);
			})
			.finally(() => setLoading((s) => !s));
	}, []);

	useEffect(() => {
		if (isInitialLoad) {
			reload(queries);
		}
	}, dependencies);

	useEffect(() => () => cancelFetch?.(), [cancelFetch]);

	return useMemo(
		() => ({ data, error, loading, reload }),
		[data, error, loading, reload],
	);
};
