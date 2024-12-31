import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useParams } from 'react-router-dom';
import apis from '@/services/api';
import { useLoading } from '@/services/loading';
import {
	CommunicatedInfoProps,
	DocumentProps,
	IdentityProps,
	UserIdentityProps,
} from '@/types';
import { useUserInfo } from './userInfo';

interface ProfileProvider {
	children: JSX.Element | JSX.Element[];
}

interface BankProps {
	bank: { name: string };
	account_number: string;
	iban: string;
}

type ProfileSections =
	| 'identityInfo'
	| 'bankInfo'
	| 'contactInfo'
	| 'documentsInfo'
	| 'userInfo';

interface Context {
	identityInfo: IdentityProps;
	bankInfo: BankProps;
	contactInfo: CommunicatedInfoProps;
	documentsInfo: DocumentProps;
	userInfo: UserIdentityProps;
	reload: (e: ProfileSections[]) => void;
	userId: number;
}

export const profileContext = createContext<Context>({
	identityInfo: {},
	bankInfo: {},
	contactInfo: {},
	documentsInfo: {},
	userInfo: {},
	reload: () => {},
	userId: null,
});

export function ProfileProvider({ children }: ProfileProvider) {
	const { identity } = useUserInfo();
	const { userId: _userId } = useParams();

	const userId = useMemo(() => {
		return _userId || identity.id;
	}, [identity, _userId]);

	const [, setLoading] = useLoading();

	const [identityInfo, setIdentityInfo] = useState({});
	const [userInfo, setUserInfo] = useState({});
	const [bankInfo, setBankInfo] = useState({});
	const [contactInfo, setContactInfo] = useState({});
	const [documentsInfo, setDocumentsInfo] = useState({});

	const STOCKS_DEFAULTS = {
		identityInfo: {},
		bankInfo: {},
		contactInfo: {},
		documentsInfo: {},
		userInfo: {},
	};

	const PROFILE_APIS = {
		identityInfo: apis.getUserIdentityInfo,
		bankInfo: apis.getUserBankInfo,
		contactInfo: apis.getUserCommunicateInfo,
		documentsInfo: apis.getUserDocumentsInfo,
		userInfo: apis.getUser,
	};

	const PROFILE_SETTERS = {
		identityInfo: setIdentityInfo,
		bankInfo: setBankInfo,
		contactInfo: setContactInfo,
		documentsInfo: setDocumentsInfo,
		userInfo: setUserInfo,
	};

	const reload = useCallback(
		(sections: ProfileSections[] = []) => {
			if (!userId) return Promise.resolve();

			const sectionNames = (
				sections.length ? sections : Object.keys(PROFILE_APIS)
			) as ProfileSections[];

			const promises = [
				...sectionNames.map((sectionName) =>
					PROFILE_APIS[sectionName](userId)
						.then((data: any) => {
							PROFILE_SETTERS[sectionName](data);
						})
						.catch(() => {
							return PROFILE_SETTERS[sectionName](STOCKS_DEFAULTS[sectionName]);
						}),
				),
			];

			return Promise.all(promises);
		},
		[userId],
	);

	useEffect(() => {
		setLoading(true);
		reload().finally(() => setLoading(false));
	}, [reload]);

	const contextProviderValue = useMemo(
		() => ({
			userId,
			userInfo,
			identityInfo,
			bankInfo,
			contactInfo,
			documentsInfo,
			reload,
		}),
		[userId, userInfo, identityInfo, bankInfo, contactInfo, documentsInfo, reload],
	);

	return (
		<profileContext.Provider value={contextProviderValue}>
			{children}
		</profileContext.Provider>
	);
}

export const useProfile = () => {
	const profile = useContext(profileContext);

	if (!profile) {
		throw new Error('useContext doesnt use in its provider');
	}

	return profile;
};
