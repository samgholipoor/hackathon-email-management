/* eslint-disable @typescript-eslint/no-use-before-define */
import { createContext, useContext, useMemo, useState } from 'react';
import storage from '@/utils/storage';

interface NotificationProvider {
	children: JSX.Element | JSX.Element[];
}

const notificationKeys = {
	reportingFlag: 'NOTIFICATION_REPORTING',
	confidentialAlertFlag: 'NOTIFICATION_CONFIDENTIAL_ALERT2',
	newWarningFlag: 'NEW_WARNING',
};

interface NotificationContext {
	reportingFlag: boolean;
	confidentialAlertFlag: boolean;
	newWarningFlag: boolean;
	changeFlagToFalse: (...e: (keyof typeof notificationKeys)[]) => void;
}

export const notificationContext = createContext<NotificationContext>({
	reportingFlag: false,
	confidentialAlertFlag: false,
	newWarningFlag: false,
	changeFlagToFalse: () => {},
});

const getNotificationFromStorage = (e: keyof typeof notificationKeys): boolean =>
	storage.get(notificationKeys[e]);
const setNotificationFromStorage = (e: keyof typeof notificationKeys, state: boolean) =>
	storage.set(notificationKeys[e], state);

export function NotificationProvider({ children }: NotificationProvider) {
	const [reportingFlag, setReportingFlag] = useState<boolean>(
		getNotificationFromStorage('reportingFlag') || false,
	);
	const [confidentialAlertFlag, setConfidentialAlertFlag] = useState<boolean>(
		getNotificationFromStorage('confidentialAlertFlag') || false,
	);

	const [newWarningFlag, setNewWarningFlag] = useState<boolean>(
		getNotificationFromStorage('newWarningFlag') || false,
	);

	const NOTIFICATION_SETTER = {
		reportingFlag: setReportingFlag,
		confidentialAlertFlag: setConfidentialAlertFlag,
		newWarningFlag: setNewWarningFlag,
	};

	const changeFlagToFalse = (...e: (keyof typeof notificationKeys)[]) => {
		if (!e) {
			return;
		}

		e.map((notificationName) => {
			NOTIFICATION_SETTER[notificationName](true);
			setNotificationFromStorage(notificationName, true);
		});
	};

	const value = useMemo(
		() => ({
			newWarningFlag,
			reportingFlag,
			confidentialAlertFlag,
			changeFlagToFalse,
		}),
		[newWarningFlag, reportingFlag, confidentialAlertFlag, changeFlagToFalse],
	);

	return (
		<notificationContext.Provider value={value}>{children}</notificationContext.Provider>
	);
}

export const useNotification = () => {
	const notification = useContext(notificationContext);

	if (!notification) {
		throw new Error('useContext doesnt use in its provider');
	}

	return notification;
};
