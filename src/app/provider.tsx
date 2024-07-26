"use client";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { SWRConfig } from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

const swrConfig = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
  revalidateIfStale: false,
  revalidateOnReconnect: false,
  fetcher,
};

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SWRConfig value={swrConfig}>
      <NextUIProvider>{children}</NextUIProvider>
    </SWRConfig>
  );
}
