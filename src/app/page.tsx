// src/app/page.tsx
import type { Metadata } from "next";
import { BlockPage } from "~/components/Layout/page";

export const metadata: Metadata = {
  title: "Transportadora ABC",
  description: "Dashboard do aplicativo Transportadora ABC",
};

export default function HomePage() {
  return <BlockPage />;
}
