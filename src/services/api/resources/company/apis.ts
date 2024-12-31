import { createApi } from '@/services/api/lib';

const END_POINTS = {
	COMPANY: '/company/',
	COMPANY_ID: '/company/:id/',
	COMPANY_USER_HAS_STOCK_ID: '/company/user-has-stock/:id/',
	COMPANY_MEMBER_ROLE: '/company-member-role/',
	UPDATE_COMPANY_MEMBER_ROLE: '/company-member-role/update_roles/',
	TEAM: '/team/',
	TEAM_ID: '/team/:id/',
};

export const getCompanies = createApi({
	url: END_POINTS.COMPANY,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getCompaniesOptions = createApi({
	url: END_POINTS.COMPANY,
	method: 'get',
	transformResponse: (res) => {
		const { results } = res.body || {};
		return results.map((company) => ({
			label: company.name,
			value: company.id,
		}));
	},
});

export const getCompaniesOfUserStocksOptions = createApi({
	url: END_POINTS.COMPANY_USER_HAS_STOCK_ID,
	method: 'get',
	transformResponse: (res) => {
		const { results } = res.body || {};
		return results.map((company) => ({
			label: company.name,
			value: company.id,
		}));
	},
});

export const getTeams = createApi({
	url: END_POINTS.TEAM,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createTeam = createApi({
	url: END_POINTS.TEAM,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const deleteTeam = createApi({
	url: END_POINTS.TEAM_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const editTeam = createApi({
	url: END_POINTS.TEAM_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const getTeamsOptions = createApi({
	url: END_POINTS.TEAM,
	method: 'get',
	transformResponse: (res) => {
		const { results } = res.body || {};
		return results.map((team) => ({
			label: team.name,
			value: team.id,
		}));
	},
});

export const getTeamsWithCompanyOptions = createApi({
	url: END_POINTS.TEAM,
	method: 'get',
	transformResponse: (res) => {
		const { results } = res.body || {};
		return results.map((team) => ({
			label: `شرکت ${team?.company?.name} | تیم ${team?.name}`,
			value: team?.id,
		}));
	},
});

export const createCompany = createApi({
	url: END_POINTS.COMPANY,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const patchCompany = createApi({
	url: END_POINTS.COMPANY_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const getCompanyMemberRole = createApi({
	url: END_POINTS.COMPANY_MEMBER_ROLE,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const updateCompanyMemberRole = createApi({
	url: END_POINTS.UPDATE_COMPANY_MEMBER_ROLE,
	method: 'put',
	transformResponse: (res) => res.body,
});
