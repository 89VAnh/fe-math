import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getFetcher, postFetcher } from "../fetcher";
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
