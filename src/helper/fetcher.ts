import { apiClient } from "./api";

type Params = {
  [key: string]: any;
};

export async function getFetcher(urlOrParams: string | [string, Params]) {
  if (typeof urlOrParams === "string") {
    const url = urlOrParams;
    return await apiClient.get(url).then((res) => res.data);
  } else {
    const [url, params] = urlOrParams;
    return await apiClient.get(url, { params }).then((res) => res.data);
  }
}

export async function postFetcher(url: string, { arg }: { arg: any }) {
  return await apiClient.post(url, arg).then((res) => res.data);
}

export async function deleteFetcher(url: string, { arg }: { arg: any }) {
  await apiClient.delete(url + "/" + arg).then((res) => res.data);
}

export async function putFetcher(url: string, { arg }: { arg: any }) {
  console.log(arg);
  return await apiClient.put(url, arg).then((res) => res.data);
}

export async function patchFetcher(url: string, { arg }: { arg: any }) {
  console.log(arg);
  return await apiClient.patch(url, arg).then((res) => res.data);
}
