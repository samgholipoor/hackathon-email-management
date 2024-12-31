import { createApi } from '@/services/api/lib';

const END_POINTS = {
	USER: '/user/',
	USER_ID: '/user/:id/',
	USER_LIST_WITH_FINANCIAL_INFO: '/user/list-with-financial-info/',
	USER_WITH_ALL_INFO: '/user/create_with_all_info/',
	PROMOTE_TO_SUPER_ADMIN: '/user/:id/promote_to_super_admin/',
	IDENTITY_INFO_ID: '/identity-info/:id/',
	IDENTITY_INFO_UPDATE_OR_CREATE: '/identity-info/:id/update_or_create/',
	USER_BANK_INFO_PATCH: '/bank-account-info/:id/',
	USER_BANK_INFO_UPDATE_OR_CREATE: '/bank-account-info/:id/update_or_create/',
	USER_COMMUNICATE_INFO_PATCH: '/communicated-info/:id/',
	USER_COMMUNICATE_INFO_UPDATE_OR_CREATE: '/communicated-info/:id/update_or_create/',
	USER_DOCUMENT_INFO_ID: '/documents-info/:id/',
	USER_DOCUMENT_INFO_UPDATE_OR_CREATE: '/documents-info/:id/update_or_create/',
	MEMBER_MONTHLY_WORKAGE: '/member-monthly-workage/',
	CHANGE_WORKAGE_STATE: '/member-monthly-workage/bulk-change-state/',
	CREATE_USER_WORKAGE: '/member-monthly-workage/bulk-create/',
	MEMBER_MONTHLY_WORKAGE_FILE: '/member-monthly-workage/file_create/',
	WORKAGE_FILE_COLUMN_NAMES: '/member-monthly-workage/workage_file_column_names/',
	CHANGE_STATE_OF_ALL_WORKAGE: '/member-monthly-workage/change_state_of_all/',
	BANKS_INFO: '/banks-info/',
	USER_PERMISSIONS: '/user/:id/permissions/',
	NATURAL_PREDICATIONS_INFO: '/natural-predications-info/',
	LEGAL_MANAGERS_INFO: '/legal-managers-info/',
	LEGAL_MANAGERS_INFO_ID: '/legal-managers-info/:id/',
	CONTRACT_TYPE: '/employment-contract-type/',
	USER_SIMPLE_SEARCH: '/user/simple-search/',
	USER_EXISTS: '/user/user_exists/',
	USER_FINANCIAL_INFO: '/user-financial-info/:id/',
	USERS_WITHOUT_WORKAGE: 'member-monthly-workage/users_without_workage/',
};

export const getUsers = createApi({
	url: END_POINTS.USER,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getUsersOption = createApi({
	url: END_POINTS.USER,
	method: 'get',
	transformResponse: (res) => {
		return {
			...res.body,
			results: res.body.results?.map((user: any) => {
				const { name, id } = user;

				return {
					label: name,
					value: id,
				};
			}),
		};
	},
});

export const getUsersOptionWithNationalCode = createApi({
	url: END_POINTS.USER,
	method: 'get',
	transformResponse: (res) => {
		return {
			...res.body,
			results: res.body.results?.map((user: any) => {
				const { name, id, national_code } = user;

				return {
					label: name + ' | ' + national_code,
					value: id,
				};
			}),
		};
	},
});

export const getWorkageFileColumnNames = createApi({
	url: END_POINTS.WORKAGE_FILE_COLUMN_NAMES,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getUser = createApi({
	url: END_POINTS.USER_ID,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createUser = createApi({
	url: END_POINTS.USER,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const createUserWithAllInfo = createApi({
	url: END_POINTS.USER_WITH_ALL_INFO,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const updateUser = createApi({
	url: END_POINTS.USER_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const putUser = createApi({
	url: END_POINTS.USER_ID,
	method: 'put',
	transformResponse: (res) => res.body,
});

export const promoteToSuperAdmin = createApi({
	url: END_POINTS.PROMOTE_TO_SUPER_ADMIN,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getUserBankInfo = createApi({
	url: END_POINTS.USER_BANK_INFO_PATCH,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createUserBankInfoUpdateOrCreate = createApi({
	url: END_POINTS.USER_BANK_INFO_UPDATE_OR_CREATE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getBanksInfo = createApi({
	url: END_POINTS.BANKS_INFO,
	method: 'get',
	transformResponse: (res) => {
		return {
			...res.body,
			results: res.body.results?.map((bank: any) => {
				const { name, id, ...rest } = bank;

				return {
					...rest,
					label: name,
					value: id,
				};
			}),
		};
	},
});

export const patchUserBankInfo = createApi({
	url: END_POINTS.USER_BANK_INFO_PATCH,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const putUserBankInfo = createApi({
	url: END_POINTS.USER_BANK_INFO_PATCH,
	method: 'put',
	transformResponse: (res) => res.body,
});

export const getUserIdentityInfo = createApi({
	url: END_POINTS.IDENTITY_INFO_ID,
	method: 'get',
	transformResponse: (res) => {
		const data = res.body;
		const { user, ...rest } = data;

		return {
			...rest,
			first_name: user?.first_name,
			last_name: user?.last_name,
		};
	},
});

export const patchUserIdentityInfo = createApi({
	url: END_POINTS.IDENTITY_INFO_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const createIdentityInfoUpdateOrCreate = createApi({
	url: END_POINTS.IDENTITY_INFO_UPDATE_OR_CREATE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const putUserIdentityInfo = createApi({
	url: END_POINTS.IDENTITY_INFO_ID,
	method: 'put',
	transformResponse: (res) => res.body,
});

export const getUserCommunicateInfo = createApi({
	url: END_POINTS.USER_COMMUNICATE_INFO_PATCH,
	method: 'get',
	transformResponse: (res) => {
		const data = res.body;
		const { user, vecalatname_be_third_person, ...rest } = data;
		return {
			...rest,
			vecalatname_be_third_person_id: vecalatname_be_third_person,
		};
	},
});

export const createUserCommunicateInfoUpdateOrCreate = createApi({
	url: END_POINTS.USER_COMMUNICATE_INFO_UPDATE_OR_CREATE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const patchUserCommunicateInfo = createApi({
	url: END_POINTS.USER_COMMUNICATE_INFO_PATCH,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const putUserCommunicateInfo = createApi({
	url: END_POINTS.USER_COMMUNICATE_INFO_PATCH,
	method: 'put',
	transformResponse: (res) => res.body,
});

export const getUserDocumentsInfo = createApi({
	url: END_POINTS.USER_DOCUMENT_INFO_ID,
	method: 'get',
	transformResponse: (res) => {
		const data = res.body;
		return {
			certificate_id: data.certificate,
			id_card_id: data.id_card,
			signature_id: data.signature,
			founded_ad_id: data.founded_ad,
			official_newspaper_id: data.official_newspaper,
			official_newspaper_address_id: data.official_newspaper_address,
		};
	},
});

export const patchUserDocumentsInfo = createApi({
	url: END_POINTS.USER_DOCUMENT_INFO_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const putUserDocumentsInfo = createApi({
	url: END_POINTS.USER_DOCUMENT_INFO_ID,
	method: 'put',
	transformResponse: (res) => res.body,
});

export const patchUserEmail = createApi({
	url: END_POINTS.USER_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const getUsersWorkage = createApi({
	url: END_POINTS.MEMBER_MONTHLY_WORKAGE,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createUserWorkageByFile = createApi({
	url: END_POINTS.MEMBER_MONTHLY_WORKAGE_FILE,
	method: 'post',
	transformResponse: (res) => res.body,
	bodyType: 'formData',
});

export const patchUserWorkage = createApi({
	url: END_POINTS.CHANGE_WORKAGE_STATE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const changeStateOfAllWorkage = createApi({
	url: END_POINTS.CHANGE_STATE_OF_ALL_WORKAGE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const createUserWorkage = createApi({
	url: END_POINTS.CREATE_USER_WORKAGE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const patchUserIdentity = createApi({
	url: END_POINTS.USER_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const getUserPermissions = createApi({
	url: END_POINTS.USER_PERMISSIONS,
	method: 'get',
	transformResponse: (res) => {
		const {
			data: { all_custom_permissions },
		} = res.body || {};

		return all_custom_permissions.map((permission: string) => {
			return permission;
		});
	},
});

export const getNaturalPredicationsInfo = createApi({
	url: END_POINTS.NATURAL_PREDICATIONS_INFO,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createNaturalPredicationInfo = createApi({
	url: END_POINTS.NATURAL_PREDICATIONS_INFO,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const createUserDocumentsInfoUpdateOrCreate = createApi({
	url: END_POINTS.USER_DOCUMENT_INFO_UPDATE_OR_CREATE,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getLegalManagersInfo = createApi({
	url: END_POINTS.LEGAL_MANAGERS_INFO,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createLegalManagersInfo = createApi({
	url: END_POINTS.LEGAL_MANAGERS_INFO,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const editLegalManagersInfo = createApi({
	url: END_POINTS.LEGAL_MANAGERS_INFO_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const deleteLegalManagersInfo = createApi({
	url: END_POINTS.LEGAL_MANAGERS_INFO_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const getContractType = createApi({
	url: END_POINTS.CONTRACT_TYPE,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getUserSimpleSearch = createApi({
	url: END_POINTS.USER_SIMPLE_SEARCH,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getUserListWithFinancialInfo = createApi({
	url: END_POINTS.USER_LIST_WITH_FINANCIAL_INFO,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createUserExists = createApi({
	url: END_POINTS.USER_EXISTS,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getUserFinancialInfo = createApi({
	url: END_POINTS.USER_FINANCIAL_INFO,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getUsersWithoutWorkage = createApi({
	url: END_POINTS.USERS_WITHOUT_WORKAGE,
	method: 'get',
	transformResponse: (res) => res.body,
});
