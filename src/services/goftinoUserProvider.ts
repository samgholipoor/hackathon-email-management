import { useCallback, useEffect, useRef, useState } from 'react';
import { useUserInfo } from '@/services/userInfo';
import { goftino } from './goftino';
import { useUpdateUser } from './api';

const useLoadGoftino = () => {
	const [goftinoLoaded, setGoftinoLoaded] = useState(false);

	const handleLoadedGoftino = () => {
		setGoftinoLoaded(true);
	};

	useEffect(() => {
		goftino.handleGoftinoReadyEvent(handleLoadedGoftino);

		return () => {
			goftino.removeGoftinoReadyEvent(handleLoadedGoftino);
		};
	}, []);

	return [goftinoLoaded];
};

const GoftinoUserProvider = () => {
	const [goftinoLoaded] = useLoadGoftino();
	const { identity } = useUserInfo();
	const { mutate: updateUser } = useUpdateUser();

	const handleSetGoftinoUser = () => {
		const name = identity.name || '-';
		const email = identity.email || '-';
		const nationalCode = identity?.national_code || '-';
		const company = identity?.team?.company?.name || '-';
		const team = identity?.team?.name || '-';
		goftino.setUser({
			name,
			email,
			tags: `کدملی: ${nationalCode},شرکت کاربر: ${company},تیم کاربر: ${team}`,
		});
	};

	const handleSetGoftinoUserId = (userId: string): Promise<any> => {
		return goftino.setUserId(userId);
	};

	const getUserGoftinoId = () => {
		return goftino.getUserId();
	};

	const retryCount = useRef(1);
	const saveUserGofintoIdInDB = async (userGoftinoId: string) => {
		try {
			await updateUser(identity.id, { goftino_id: userGoftinoId });
		} catch (error) {
			retryCount.current += 1;
			if (retryCount.current <= 3) {
				saveUserGofintoIdInDB(userGoftinoId);
			}
		}
	};

	const handleSetUserGoftino = useCallback(() => {
		if (!goftinoLoaded || Number.isNaN(identity.id)) {
			return;
		}

		if (identity.goftino_id) {
			handleSetGoftinoUserId(identity.goftino_id).then(handleSetGoftinoUser);
		} else {
			const userGoftinoId = getUserGoftinoId();
			saveUserGofintoIdInDB(userGoftinoId);
		}
	}, [goftinoLoaded, identity]);

	useEffect(() => {
		handleSetUserGoftino();
	}, [handleSetUserGoftino]);

	return null;
};

export default GoftinoUserProvider;
