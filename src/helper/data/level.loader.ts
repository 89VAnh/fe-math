import useSWR from "swr";
import { getFetcher } from "../fetcher";

const prefix = "level";

export function useSearchLevel(params: any) {
  params = { ...params, name: params.searchContent };
  delete params.searchContent;

  const { data, isLoading, error, mutate } = useSWR(
    [prefix, params],
    getFetcher
  );

  return { data, isLoading, error, mutate };
}
