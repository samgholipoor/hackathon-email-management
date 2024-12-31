import { createApi } from '@/services/api/lib';

const END_POINTS = {
	INBOX: '/inbox/',
	INBOX_ID: '/inbox/:id/',
	INBOX_SEND_BOX: '/inbox/send-bulk/',
	INBOX_UNREAD_COUNT: '/inbox/:name/unread_count/',
	NOTIFICATION: '/notification/',
	NOTIFICATION_ID: '/notification/:id/',
	NOTIFICATION_SEND_BULK: '/notification/send-bulk/',
	GET_PLACEHOLDER_OF_TAGS: '/notification-template/place-holder-of-inboxes/',
	NOTIFICATION_TEMPLATE: '/notification-template/',
	NOTIFICATION_TEMPLATE_ID: '/notification-template/:id/',
	INBOX_SET_FLAG: '/notification/set_flag/',
	INBOX_SET_FLAG_FILTERSET: '/notification/set_flag_filterset/',
	NOTIFICATION_SEND_USERS_FILTER: '/notification/send-users-filter/',
};

export const getPlaceholderOfTags = createApi({
	url: END_POINTS.GET_PLACEHOLDER_OF_TAGS,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getNotificationTemplates = createApi({
	url: END_POINTS.NOTIFICATION_TEMPLATE,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createNotificationTemplate = createApi({
	url: END_POINTS.NOTIFICATION_TEMPLATE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const editNotificationTemplate = createApi({
	url: END_POINTS.NOTIFICATION_TEMPLATE_ID,
	method: 'put',
	transformResponse: (res) => res.body,
});

export const deleteNotificationTemplate = createApi({
	url: END_POINTS.NOTIFICATION_TEMPLATE_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const createInboxSendBox = createApi({
	url: END_POINTS.INBOX_SEND_BOX,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getInbox = createApi({
	url: END_POINTS.INBOX,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getInboxId = createApi({
	url: END_POINTS.INBOX_ID,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const patchInboxSetFlag = createApi({
	url: END_POINTS.INBOX_SET_FLAG,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const getInboxUnreadCount = createApi({
	url: END_POINTS.INBOX_UNREAD_COUNT,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const patchInboxSetFlagFilterset = createApi({
	url: END_POINTS.INBOX_SET_FLAG_FILTERSET,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const getNotification = createApi({
	url: END_POINTS.NOTIFICATION,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getNotificationId = createApi({
	url: END_POINTS.NOTIFICATION_ID,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createNotificationSendBulk = createApi({
	url: END_POINTS.NOTIFICATION_SEND_BULK,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const createNotificationSendUsersFilter = createApi({
	url: END_POINTS.NOTIFICATION_SEND_USERS_FILTER,
	method: 'post',
	transformResponse: (res) => res.body,
});
