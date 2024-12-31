import { useEffect, useMemo, useState } from 'react';

function useDebounce<T>(searchTerm: T, timeout: number) {
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<T>(searchTerm);

	useEffect(() => {
		const timerId = setTimeout(() => setDebouncedSearchTerm(searchTerm), timeout || 500);

		return () => {
			clearTimeout(timerId);
		};
	}, [searchTerm, timeout]);

	return useMemo(() => debouncedSearchTerm, [debouncedSearchTerm]);
}

export default useDebounce;
