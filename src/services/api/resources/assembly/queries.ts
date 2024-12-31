import { useFetch } from '@/hooks/useFetch';
import { useMutate } from '@/hooks/useMutate';
import * as apis from './apis';

export const useGetAssemblies = (...props) =>
	useFetch((...body) => apis.getAssembly(...body), ...props);

export const useCreateAssembly = (...props) =>
	useMutate((...body) => apis.createAssembly(...body), ...props);

export const useEditAssembly = (...props) =>
	useMutate((...body) => apis.editAssembly(...body), ...props);

export const useDeleteAssembly = (...props) =>
	useMutate((...body) => apis.deleteAssembly(...body), ...props);

export const useGetSurveys = (...props) =>
	useFetch((...body) => apis.getSurveys(...body), ...props);

export const useGetSurvey = (...props) =>
	useFetch((...body) => apis.getSurvey(...body), ...props);

export const useCreateSurvey = (...props) =>
	useMutate((...body) => apis.createSurvey(...body), ...props);

export const usePutSurvey = (...props) =>
	useMutate((...body) => apis.putSurvey(...body), ...props);

export const usePatchSurvey = (...props) =>
	useMutate((...body) => apis.patchSurvey(...body), ...props);

export const useDeleteSurvey = (...props) =>
	useMutate((...body) => apis.deleteSurvey(...body), ...props);

export const useCreateSurveyRespond = (...props) =>
	useMutate((...body) => apis.createSurveyRespond(...body), ...props);

export const useGetQuestionResults = (...props) =>
	useFetch((...body) => apis.getQuestionResults(...body), ...props);

export const useGetQuestionAnswer = (...props) =>
	useFetch((...body) => apis.getQuestionAnswer(...body), ...props);

export const useGetAssemblyMembership = (...props) =>
	useFetch((...body) => apis.getAssemblyMembership(...body), ...props);

export const usePatchAssemblyMembership = (...props) =>
	useMutate((...body) => apis.patchAssemblyMembership(...body), ...props);

export const useDeleteAssemblyMembership = (...props) =>
	useMutate((...body) => apis.deleteAssemblyMembership(...body), ...props);

export const useCreateAssemblyMembership = (...props) =>
	useMutate((...body) => apis.createAssemblyMembership(...body), ...props);

export const useGetAssemblyParticipantsStats = (...props) =>
	useFetch((...body) => apis.getAssemblyParticipantsStats(...body), ...props);
