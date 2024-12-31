import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import apis from '@/services/api';
import { useUserCredentials } from '@/services/auth';
import { useLoading } from '@/services/loading';
import { UserPermissions } from '@/types';

interface UserInfoProviderProps {
	children: JSX.Element | JSX.Element[];
}

interface FinancialInfoProps {
	blocked_by_admin: number;
	blocked_by_offer_stock_count: number;
	real_blocked_by_offer_credit: number;
	real_usable_credit: number;
	real_verify_pending_credit: number;
	usable_stock_count: number;
	sold_verify_pending_stock_count: number;
	virtual_blocked_by_offer_credit: number;
	virtual_usable_credit: number;
	virtual_verify_pending_credit: number;
	realseed_stock: number;
	sum_of_sells: number;
	sum_of_buys: number;
	wested_stock_count: number;
	sold_stock_count: number;
	bought_stock_count: number;
	company_creation_stock_count: number;
	documented_vested_by_stock_count: number;
	documented_vested_for_stock_count: number;
}

interface ProfileImage {
	attachment: string;
	original_name: string;
	created_at: string;
	id: string;
}

interface IdentityProps {
	id: number;
	name: string;
	first_name: string;
	last_name: string;
	email: string;
	is_policy_accepted: boolean;
	mobile_number: number;
	national_code: number;
	is_admin_in_any_company: boolean | null;
	is_super_admin: boolean | null;
	is_trader: boolean;
	type: 'L' | 'E' | null;
	profile_image: ProfileImage;
	user_type: 'I' | 'F' | 'L';
	team: {
		company: { name: string };
		name: string;
	};
	goftino_id: string;
}

type StockTypes = 'financialInfo' | 'identity' | 'appConfig' | 'inboxUnreadCount';

interface AppConfigProps {
	credit_cost_for_stock_block?: number;
}

interface UserInfoContextProps {
	financialInfo: FinancialInfoProps;
	identity: IdentityProps;
	appConfig: AppConfigProps;
	userPermissions: UserPermissions[];
	inboxUnreadCount: { unread: number };
	hasUserCertainPermissions: (...e: UserPermissions[]) => boolean;
	reload: (e: StockTypes[]) => void;
}

const financialInfoInitialValue = {
	blocked_by_admin: NaN,
	blocked_by_offer_stock_count: NaN,
	real_blocked_by_offer_credit: NaN,
	real_usable_credit: NaN,
	real_verify_pending_credit: NaN,
	usable_stock_count: NaN,
	sold_verify_pending_stock_count: NaN,
	virtual_blocked_by_offer_credit: NaN,
	virtual_usable_credit: NaN,
	virtual_verify_pending_credit: NaN,
	realseed_stock: NaN,
	sum_of_sells: NaN,
	sum_of_buys: NaN,
	wested_stock_count: NaN,
	sold_stock_count: NaN,
	bought_stock_count: NaN,
	company_creation_stock_count: NaN,
};

const identityInitialValue = {
	id: NaN,
	name: '',
	first_name: '',
	last_name: '',
	email: '',
	is_policy_accepted: false,
	mobile_number: NaN,
	national_code: NaN,
	is_admin_in_any_company: null,
	is_super_admin: null,
	is_trader: false,
	type: null,
};

export const userInfoContext = createContext<UserInfoContextProps>({
	financialInfo: financialInfoInitialValue,
	identity: identityInitialValue,
	appConfig: {},
	userPermissions: [],
	inboxUnreadCount: { unread: 0 },
	hasUserCertainPermissions: (x) => false,
	reload: () => {},
});

export function UserInfoProvider({ children }: UserInfoProviderProps) {
	const userCredentials = useUserCredentials();
	const [, setLoading] = useLoading();

	const [financialInfo, setFinancialInfo] = useState<FinancialInfoProps>(
		financialInfoInitialValue,
	);
	const [identity, setIdentity] = useState<IdentityProps>(identityInitialValue);
	const [appConfig, setAppConfig] = useState<AppConfigProps>({});
	const [userPermissions, setUserPermissions] = useState<UserPermissions[]>([]);
	const [notifications, setNotifications] = useState({});
	const [inboxUnreadCount, setInboxUnreadCount] = useState<{ unread: number }>({
		unread: 0,
	});

	const STOCKS_DEFAULTS = {
		financialInfo: financialInfoInitialValue,
		identity: identityInitialValue,
		appConfig: {},
		userPermissions: [],
		inboxUnreadCount: {},
		notifications: {},
	};

	const STOCKS_APIS = {
		financialInfo: (id: string) => apis.getUserFinancialInfo(id),
		identity: (id: string) => apis.getUser(id),
		appConfig: () => apis.getAppConfig(),
		userPermissions: (id: string) => apis.getUserPermissions(id),
		inboxUnreadCount: () => apis.getInboxUnreadCount('GE'),
		notifications: () =>
			apis.getNotification({ inbox__name: 'GE', send_popup: true, is_read: false }),
	};

	const STOCKS_SETTERS = {
		financialInfo: setFinancialInfo,
		identity: setIdentity,
		appConfig: setAppConfig,
		userPermissions: setUserPermissions,
		inboxUnreadCount: setInboxUnreadCount,
		notifications: setNotifications,
	};

	const reload = useCallback(
		(sections: StockTypes[] = []) => {
			if (!userCredentials || !userCredentials?.otp_verified) return Promise.resolve();

			const sectionNames = (
				sections.length ? sections : Object.keys(STOCKS_APIS)
			) as StockTypes[];

			const promises = [
				...sectionNames.map((sectionName: StockTypes) =>
					STOCKS_APIS[sectionName](userCredentials.user_id.toString())
						.then((data: any) => {
							STOCKS_SETTERS[sectionName](data);
							return data;
						})
						.catch(() => STOCKS_SETTERS[sectionName](STOCKS_DEFAULTS[sectionName])),
				),
			];

			return Promise.all(promises);
		},
		[userCredentials],
	);

	useEffect(() => {
		setLoading(true);
		reload().finally(() => setLoading(false));
	}, [reload]);

	useEffect(() => {
		const interval = setInterval(() => {
			reload(['inboxUnreadCount']);
		}, 60000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const hasUserCertainPermissions = useCallback(
		(...permissions: UserPermissions[]) => {
			if (
				!userPermissions ||
				!(userPermissions?.length > 0) ||
				!permissions ||
				!(permissions?.length > 0)
			) {
				return false;
			}

			return permissions.every((permission) => userPermissions?.includes(permission));
		},
		[userPermissions],
	);

	const contextProviderValue = useMemo(
		() => ({
			financialInfo,
			identity,
			appConfig,
			userPermissions,
			inboxUnreadCount,
			hasUserCertainPermissions,
			notifications,
			reload,
		}),
		[
			financialInfo,
			identity,
			appConfig,
			userPermissions,
			inboxUnreadCount,
			hasUserCertainPermissions,
			notifications,
			reload,
		],
	);

	return (
		<userInfoContext.Provider value={contextProviderValue}>
			{children}
		</userInfoContext.Provider>
	);
}

export const useUserInfo = () => {
	const userInfo = useContext(userInfoContext);
	if (!userInfo) {
		throw new Error('useContext doesnt use in its provider');
	}

	return userInfo;
};
