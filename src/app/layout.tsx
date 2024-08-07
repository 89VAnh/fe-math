import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trăc nghiệm toán",
  description: "răc nghiệm toán trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='vi'>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
