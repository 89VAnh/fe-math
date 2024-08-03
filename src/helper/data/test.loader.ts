import useSWR from "swr";
import { getFetcher } from "../fetcher";

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

  console.log(data?.questions);

  return { data, isLoading, error };
}
