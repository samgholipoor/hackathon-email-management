import { useFetch } from '@/hooks/useFetch';
import { useMutate } from '@/hooks/useMutate';
import * as apis from './apis';

export const useGetCompanies = (...props) =>
	useFetch((...body) => apis.getCompanies(...body), ...props);

export const useGetCompaniesOption = (...props) =>
	useFetch((...body) => apis.getCompaniesOptions(...body), ...props);

export const useGetCompaniesOfUserStocksOptions = (...props) =>
	useFetch((...body) => apis.getCompaniesOfUserStocksOptions(...body), ...props);

export const useGetTeamsOptions = (...props) =>
	useFetch((...body) => apis.getTeamsOptions(...body), ...props);

export const useCreateCompany = (...props) =>
	useMutate((...body) => apis.createCompany(...body), ...props);

export const usePatchCompany = (...props) =>
	useMutate((...body) => apis.patchCompany(...body), ...props);

export const useGetCompanyMemberRole = (...props) =>
	useFetch((...body) => apis.getCompanyMemberRole(...body), ...props);

export const useUpdateCompanyMemberRole = (...props) =>
	useMutate((...body) => apis.updateCompanyMemberRole(...body), ...props);

export const useGetTeamsWithCompanyOptions = (...props) =>
	useFetch((...body) => apis.getTeamsWithCompanyOptions(...body), ...props);

export const useGetTeams = (...props) =>
	useFetch((...body) => apis.getTeams(...body), ...props);

export const useDeleteTeam = (...props) =>
	useMutate((...body) => apis.deleteTeam(...body), ...props);

export const useEditTeam = (...props) =>
	useMutate((...body) => apis.editTeam(...body), ...props);

export const useCreateTeam = (...props) =>
	useMutate((...body) => apis.createTeam(...body), ...props);
