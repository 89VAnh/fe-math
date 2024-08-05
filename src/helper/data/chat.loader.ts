import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getFetcher, postFetcher } from "../fetcher";

const prefix = "chat";

export function useSearchChat(params: any) {
  const { data, isLoading, error, mutate } = useSWR(
    [prefix, params],
    getFetcher
  );

  return { data, isLoading, error, mutate };
}

export function useCreateChat() {
  const { trigger, isMutating } = useSWRMutation(prefix, postFetcher);

  return { trigger, isMutating };
}
