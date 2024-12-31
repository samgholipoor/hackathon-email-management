/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useCallback, useEffect, useState } from 'react';

interface CancelablePromise<T> extends Promise<T> {
	cancel(): void;
}

export const useMutate = (
	request: (...e: any[]) => CancelablePromise<any>,
	defaultValue?: any,
	dependencies: any[] = [],
) => {
	const [data, setData] = useState(defaultValue);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [cancelFetch, setCancelFetch] = useState<() => void>();

	const mutate = useCallback((...args: any) => {
		setLoading(true);

		const sendRequest = request(...args);
		setCancelFetch(() => sendRequest.cancel);

		return sendRequest
			.then((response) => {
				setData(response);
				return response;
			})
			.catch((err) => {
				setError(err);
				throw err;
			})
			.finally(() => setLoading(false));
	}, dependencies);

	useEffect(() => () => cancelFetch?.(), [cancelFetch]);

	return { data, error, loading, mutate };
};
