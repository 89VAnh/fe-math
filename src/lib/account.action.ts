"use server";

import { Account } from "@/types/Account";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(account: Account) {
  const cookieStore = cookies();

  cookieStore.set("user", JSON.stringify(account));
  cookieStore.set("session_token", account?.token || "");

  redirect("/");
}

export async function getUser(): Promise<Account> {
  const cookieStore = cookies();
  const user = cookieStore.get("user")?.value;

  if (!user) {
    return {} as Account;
  } else return JSON.parse(user) as Account;
}

export async function logout() {
  const cookieStore = cookies();

  cookieStore.delete("user");
  cookieStore.delete("session_token");
  redirect("/login");
}

export async function signup() {
  redirect("/login");
}
