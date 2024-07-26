import { Account } from "@/types/Account";
import { apiClient } from "../api";

const prefix = "account";

export const loginFetcher = async (
  payload: { username: string; password: string } | null
): Promise<Account | null> => {
  if (payload)
    return apiClient.post(`${prefix}/login`, payload).then((res) => res.data);
  return null;
};

export const registerFetcher = async (payload: any) => {
  if (payload)
    return apiClient.post(`${prefix}/`, payload).then((res) => res.data);
};
