import useSWR from "swr";
import { getFetcher } from "../fetcher";

const prefix = "result";

export function useGetResult(id: number) {
  const { data, isLoading, error } = useSWR(`${prefix}/${id}`, getFetcher);

  return { data, isLoading, error };
}

export function useSearchResult(params: any) {
  const { data, isLoading, error } = useSWR([prefix, params], getFetcher);

  return { data, isLoading, error };
}
