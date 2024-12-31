import { useFetch } from '@/hooks/useFetch';
import { useMutate } from '@/hooks/useMutate';
import * as apis from './apis';

export const useGetPlaceholderOfTags = (...props) =>
	useFetch((...body) => apis.getPlaceholderOfTags(...body), ...props);

export const useGetNotificationTemplates = (...props) =>
	useFetch((...body) => apis.getNotificationTemplates(...body), ...props);

export const useCreateNotificationTemplate = (...props) =>
	useMutate((...body) => apis.createNotificationTemplate(...body), ...props);

export const useEditNotificationTemplate = (...props) =>
	useMutate((...body) => apis.editNotificationTemplate(...body), ...props);

export const useDeleteNotificationTemplate = (...props) =>
	useMutate((...body) => apis.deleteNotificationTemplate(...body), ...props);

export const useCreateInboxSendBox = (...props) =>
	useMutate((...body) => apis.createInboxSendBox(...body), ...props);

export const useGetInbox = (...props) =>
	useFetch((...body) => apis.getInbox(...body), ...props);

export const usePatchInboxSetFlag = (...props) =>
	useMutate((...body) => apis.patchInboxSetFlag(...body), ...props);

export const useGetInboxUnreadCount = (...props) =>
	useFetch((...body) => apis.getInboxUnreadCount(...body), ...props);

export const useGetInboxId = (...props) =>
	useFetch((...body) => apis.getInboxId(...body), ...props);

export const usePatchInboxSetFlagFilterset = (...props) =>
	useMutate((...body) => apis.patchInboxSetFlagFilterset(...body), ...props);

export const useGetNotification = (...props) =>
	useFetch((...body) => apis.getNotification(...body), ...props);

export const useGetNotificationId = (...props) =>
	useFetch((...body) => apis.getNotificationId(...body), ...props);

export const useCreateNotificationSendBulk = (...props) =>
	useMutate((...body) => apis.createNotificationSendBulk(...body), ...props);

export const useCreateNotificationSendUsersFilter = (...props) =>
	useMutate((...body) => apis.createNotificationSendUsersFilter(...body), ...props);
