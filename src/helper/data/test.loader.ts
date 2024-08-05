import { Test } from "@/types/Test";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getFetcher, postFetcher } from "../fetcher";

const prefix = "test";

export function useSearchTest(params: any) {
  params = { ...params, id: params.searchContent };
  delete params.searchContent;

  const { data, isLoading, error, mutate } = useSWR(
    [prefix, params],
    getFetcher
  );

  return { data, isLoading, error, mutate };
}

export function useGetTest(id: string) {
  const { data, isLoading, error } = useSWR(`${prefix}/${id}`, getFetcher);

  return { data, isLoading, error };
}

export function useSubmitTest() {
  const { trigger, error, isMutating } = useSWRMutation(
    `${prefix}/submit`,
    postFetcher
  );

  return { trigger, error, isMutating };
}
