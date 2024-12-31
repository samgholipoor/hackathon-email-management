import { useMutate } from '@/hooks/useMutate';
import { useFetch } from '@/hooks/useFetch';
import * as apis from './apis';

export const useGetUsers = (...props) =>
	useFetch((...body) => apis.getUsers(...body), ...props);

export const useGetUsersOption = (...props) =>
	useFetch((...body) => apis.getUsersOption(...body), ...props);

export const useGetUsersOptionWithNationalCode = (...props) =>
	useFetch((...body) => apis.getUsersOptionWithNationalCode(...body), ...props);

export const useCreateUser = (...props) =>
	useMutate((...body) => apis.createUser(...body), ...props);

export const useCreateUserWithAllInfo = (...props) =>
	useMutate((...body) => apis.createUserWithAllInfo(...body), ...props);

export const useUpdateUser = (...props) =>
	useMutate((...body) => apis.updateUser(...body), ...props);

export const usePromoteToSuperAdmin = (...props) =>
	useMutate((...body) => apis.promoteToSuperAdmin(...body), ...props);

export const useGetUserBankInfo = (...props) =>
	useFetch((...body) => apis.getUserBankInfo(...body), ...props);

export const useGetBanksInfo = (...props) =>
	useFetch((...body) => apis.getBanksInfo(...body), ...props);

export const usePatchUserBankInfo = (...props) =>
	useMutate((...body) => apis.patchUserBankInfo(...body), ...props);

export const usePutUserBankInfo = (...props) =>
	useMutate((...body) => apis.putUserBankInfo(...body), ...props);

export const useCreateUserBankInfoUpdateOrCreate = (...props) =>
	useMutate((...body) => apis.createUserBankInfoUpdateOrCreate(...body), ...props);

export const useGetUserIdentityInfo = (id, ...props) =>
	useFetch(() => apis.getUserIdentityInfo(id), ...props);

export const usePatchUserIdentityInfo = (...props) =>
	useMutate((...body) => apis.patchUserIdentityInfo(...body), ...props);

export const useGetUserCommunicateInfo = (...props) =>
	useFetch((...body) => apis.getUserCommunicateInfo(...body), ...props);

export const usePatchUserCommunicateInfo = (...props) =>
	useMutate((...body) => apis.patchUserCommunicateInfo(...body), ...props);

export const usePutUserCommunicateInfo = (...props) =>
	useMutate((...body) => apis.putUserCommunicateInfo(...body), ...props);

export const useGetUserDocumentsInfo = (id, ...props) =>
	useFetch(() => apis.getUserDocumentsInfo(id), ...props);

export const usePatchUserDocumentsInfo = (...props) =>
	useMutate((...body) => apis.patchUserDocumentsInfo(...body), ...props);

export const usePatchUserEmail = (...props) =>
	useMutate((...body) => apis.patchUserEmail(...body), ...props);

export const useGetUsersWorkage = (...props) =>
	useFetch((...body) => apis.getUsersWorkage(...body), ...props);

export const usePatchUserWorkage = (...props) =>
	useMutate((...body) => apis.patchUserWorkage(...body), ...props);

export const useCreateUserWorkage = (...props) =>
	useMutate((...body) => apis.createUserWorkage(...body), ...props);

export const useCreateUserWorkageByFile = (...props) =>
	useMutate((...body) => apis.createUserWorkageByFile(...body), ...props);

export const useGetWorkageFileColumnNames = (...props) =>
	useFetch((...body) => apis.getWorkageFileColumnNames(...body), ...props);

export const useChangeStateOfAllWorkage = (...props) =>
	useMutate((...body) => apis.changeStateOfAllWorkage(...body), ...props);

export const usePatchUserIdentity = (...props) =>
	useMutate((...body) => apis.patchUserIdentity(...body), ...props);

export const useGetUserPermissions = (id, ...props) =>
	useFetch(() => apis.getUserPermissions(id), ...props);

export const useGetNaturalPredicationsInfo = (...props) =>
	useFetch((...body) => apis.getNaturalPredicationsInfo(...body), ...props);

export const useGetNaturalPredicationsInfoUserId = (...props) =>
	useFetch((...body) => apis.getNaturalPredicationsInfoUserId(...body), ...props);

export const useCreateNaturalPredicationInfo = (...props) =>
	useMutate((...body) => apis.createNaturalPredicationInfo(...body), ...props);

export const usePutUserIdentityInfo = (...props) =>
	useMutate((...body) => apis.putUserIdentityInfo(...body), ...props);

export const usePutUser = (...props) =>
	useMutate((...body) => apis.putUser(...body), ...props);

export const useDeleteNaturalPredicationInfo = (...props) =>
	useMutate((...body) => apis.deleteNaturalPredicationInfo(...body), ...props);

export const usePutUserDocumentsInfo = (...props) =>
	useMutate((...body) => apis.putUserDocumentsInfo(...body), ...props);

export const useCreateUserDocumentsInfoUpdateOrCreate = (...props) =>
	useMutate((...body) => apis.createUserDocumentsInfoUpdateOrCreate(...body), ...props);

export const useCreateUserCommunicateInfoUpdateOrCreate = (...props) =>
	useMutate((...body) => apis.createUserCommunicateInfoUpdateOrCreate(...body), ...props);

export const useCreateIdentityInfoUpdateOrCreate = (...props) =>
	useMutate((...body) => apis.createIdentityInfoUpdateOrCreate(...body), ...props);

export const useGetLegalManagersInfo = (...props) =>
	useFetch((...body) => apis.getLegalManagersInfo(...body), ...props);

export const useCreateLegalManagersInfo = (...props) =>
	useMutate((...body) => apis.createLegalManagersInfo(...body), ...props);

export const useEditLegalManagersInfo = (...props) =>
	useMutate((...body) => apis.editLegalManagersInfo(...body), ...props);

export const useDeleteLegalManagersInfo = (...props) =>
	useMutate((...body) => apis.deleteLegalManagersInfo(...body), ...props);

export const useGetContractType = (...props) =>
	useFetch((...body) => apis.getContractType(...body), ...props);

export const useGetUserSimpleSearch = (...props) =>
	useFetch((...body) => apis.getUserSimpleSearch(...body), ...props);

export const useGetUserListWithFinancialInfo = (...props) =>
	useFetch((...body) => apis.getUserListWithFinancialInfo(...body), ...props);

export const useCreateUserExists = (...props) =>
	useMutate((...body) => apis.createUserExists(...body), ...props);

export const useGetUserFinancialInfo = (...props) =>
	useFetch((...body) => apis.getUserFinancialInfo(...body), ...props);

export const useGetUsersWithoutWorkage = (...props) =>
	useFetch((...body) => apis.getUsersWithoutWorkage(...body), ...props);
