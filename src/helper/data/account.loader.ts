import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getFetcher, patchFetcher, postFetcher, putFetcher } from "../fetcher";
const prefix = "account";

export function useLogin() {
  const { trigger, error, isMutating } = useSWRMutation(
    `${prefix}/login`,
    postFetcher
  );

  return { trigger, error, isMutating };
}

export function useRegister() {
  const { trigger, error, isMutating } = useSWRMutation(
    `${prefix}/`,
    postFetcher
  );

  return { trigger, error, isMutating };
}

export function useSearchAccount(params: any) {
  params = { ...params, name: params.searchContent };
  delete params.searchContent;

  const { data, isLoading, error, mutate } = useSWR(
    [`${prefix}`, params],
    getFetcher
  );

  return { data, isLoading, error, mutate };
}

export function useChangePassword() {
  const { trigger, isMutating } = useSWRMutation(
    `${prefix}/change-password`,
    patchFetcher
  );

  return { trigger, isMutating };
}

export function useUpdateAccount() {
  const { trigger, isMutating } = useSWRMutation(prefix, putFetcher);

  return { trigger, isMutating };
}
