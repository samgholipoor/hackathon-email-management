import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useGetUsersOptionWithNationalCode } from '@/services/api';

const useUserSelect = () => {
	const {
		data: userOptions,
		reload,
		loading,
	} = useGetUsersOptionWithNationalCode({ results: [], count: 0 }, [], {
		isInitialLoad: false,
	});

	const fetchUsers = useCallback((props?: { query: string }) => {
		reload({
			page: 1,
			page_size: 15,
			...props,
		});
	}, []);

	useEffect(() => {
		fetchUsers();
	}, []);

	const [selectedUser, setSelectedUser] = useState();
	const debouncedUser = useDebounce(selectedUser, 400);
	const prevSelectedUser = useRef('');

	useEffect(() => {
		if (prevSelectedUser.current !== debouncedUser) {
			prevSelectedUser.current = debouncedUser || '';
			fetchUsers({ query: debouncedUser || '' });
		}
	}, [debouncedUser]);

	return useMemo(
		() => ({
			userOptions: userOptions?.results,
			setSelectedUser: setSelectedUser,
			loading,
		}),
		[setSelectedUser, userOptions, loading],
	);
};

export default useUserSelect;
