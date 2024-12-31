import { createApi, fetchBlob } from '@/services/api/lib';

const END_POINTS = {
	REPORT: '/report/',
	REPORT_ID: '/report/:id/',
	REPORT_FILE: '/report/:id/get_file/',
};

export const getReports = createApi({
	url: END_POINTS.REPORT,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getReportFile = createApi({
	url: END_POINTS.REPORT_FILE,
	method: 'get',
	transformResponse: (res) => res.body,
});

export const getReportFileLink = fetchBlob({
	url: END_POINTS.REPORT_FILE,
});

export const createReport = createApi({
	url: END_POINTS.REPORT,
	method: 'post',
	transformResponse: (res) => res.body,
});

export const patchReport = createApi({
	url: END_POINTS.REPORT_ID,
	method: 'patch',
	transformResponse: (res) => res.body,
});

export const deleteReport = createApi({
	url: END_POINTS.REPORT_ID,
	method: 'delete',
	transformResponse: (res) => res.body,
});
