import { createApi } from '@/services/api/lib';

const END_POINTS = {
	ASSEMBLY: '/assembly/',
	ASSEMBLY_ID: '/assembly/:id/',
	SURVEY: '/survey/',
	SURVEY_ID: '/survey/:id/',
	SURVEY_RESPOND: '/survey-submit/',
	QUESTION_RESULTS: '/question/:id/result/',
	ANSWER: '/answer/',
	ASSEMBLY_MEMBERSHIP: '/assembly-membership/',
	ASSEMBLY_MEMBERSHIP_ID: '/assembly-membership/:id/',
	ASSEMBLY_PARTICIPANTS_STATS: '/assembly/:id/get-participants-stats/',
};

export const getAssembly = createApi({
	url: END_POINTS.ASSEMBLY,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createAssembly = createApi({
	url: END_POINTS.ASSEMBLY,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const editAssembly = createApi({
	url: END_POINTS.ASSEMBLY_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const deleteAssembly = createApi({
	url: END_POINTS.ASSEMBLY_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const getSurveys = createApi({
	url: END_POINTS.SURVEY,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getSurvey = createApi({
	url: END_POINTS.SURVEY_ID,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const createSurvey = createApi({
	url: END_POINTS.SURVEY,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const putSurvey = createApi({
	url: END_POINTS.SURVEY_ID,
	method: 'put',
	transformResponse: (res) => res.body,
});

export const patchSurvey = createApi({
	url: END_POINTS.SURVEY_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const deleteSurvey = createApi({
	url: END_POINTS.SURVEY_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const createSurveyRespond = createApi({
	url: END_POINTS.SURVEY_RESPOND,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getQuestionResults = createApi({
	url: END_POINTS.QUESTION_RESULTS,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getQuestionAnswer = createApi({
	url: END_POINTS.ANSWER,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getAssemblyMembership = createApi({
	url: END_POINTS.ASSEMBLY_MEMBERSHIP,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const patchAssemblyMembership = createApi({
	url: END_POINTS.ASSEMBLY_MEMBERSHIP_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const deleteAssemblyMembership = createApi({
	url: END_POINTS.ASSEMBLY_MEMBERSHIP_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});

export const createAssemblyMembership = createApi({
	url: END_POINTS.ASSEMBLY_MEMBERSHIP,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const getAssemblyParticipantsStats = createApi({
	url: END_POINTS.ASSEMBLY_PARTICIPANTS_STATS,
	method: 'get',
	transformResponse: (res) => res.body,
});
