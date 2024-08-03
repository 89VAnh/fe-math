"use server";

import { Account } from "@/types/Account";
import { SESSION_TOKEN, USER_COOKIE } from "@/utils/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(account: Account) {
  const cookieStore = cookies();

  cookieStore.set(USER_COOKIE, JSON.stringify(account));
  cookieStore.set(SESSION_TOKEN, account?.token || "");

  redirect("/");
}

export async function getUser(): Promise<Account> {
  const cookieStore = cookies();
  const user = cookieStore.get(USER_COOKIE)?.value;

  if (!user) {
    return {} as Account;
  } else return JSON.parse(user) as Account;
}

export async function logout() {
  const cookieStore = cookies();

  cookieStore.delete(USER_COOKIE);
  cookieStore.delete(SESSION_TOKEN);
  redirect("/login");
}

export async function signup() {
  redirect("/login");
}
