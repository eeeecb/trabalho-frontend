// src/app/layout.tsx
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { cookies } from "next/headers";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "~/components/theme-provider";
import Layout from "~/components/Layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Trabaio Camião",
  description: "Aplicativo criado com T3 Stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${inter.variable}`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Layout>{children}</Layout>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}