import useSWR from "swr";
import { getFetcher } from "../fetcher";

const prefix = "question";

export function useSearchQuestion(params: any) {
  params = { ...params, content: params.searchContent };
  delete params.searchContent;

  const { data, isLoading, error, mutate } = useSWR(
    [prefix, params],
    getFetcher
  );

  return { data, isLoading, error, mutate };
}

export function useGetQuestion(id: number) {
  const { data, isLoading, error } = useSWR(`${prefix}/${id}`, getFetcher);

  return { data, isLoading, error };
}
