import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import { TRPCReactProvider } from "api/trpc/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feature Flag Dashboard",
  description: "Dashboard to manage feature flags",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCReactProvider>
          <MantineProvider>{children}</MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
