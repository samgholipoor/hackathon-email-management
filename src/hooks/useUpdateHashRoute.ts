import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useUpdateHashRoute = (
	initialHashValue: string,
	transformHash = (x: string): any => x,
): [string, (e: string, s?: boolean) => void] => {
	const navigate = useNavigate();
	const { search, pathname, state, hash } = useLocation();

	useEffect(() => {
		if (!hash) {
			navigate(
				{
					pathname: pathname,
					search: search,
					hash: initialHashValue,
				},
				{ replace: true, state: { ...state } },
			);
		}
	}, [initialHashValue, pathname, search, state, hash]);

	const handleChangeHashRoute = useCallback(
		(newHash: string, hasSearch = true) => {
			navigate(
				{
					pathname: pathname,
					...(hasSearch ? { search: search } : null),
					hash: newHash,
				},
				{ replace: true, state: { ...state } },
			);
		},
		[pathname, search, state],
	);

	return [transformHash(hash), handleChangeHashRoute];
};

export default useUpdateHashRoute;
