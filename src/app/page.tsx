// src/app/page.tsx
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Activity, Users, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";
import { BlockPage } from "~/components/Layout/page";

export const metadata: Metadata = {
  title: "Dashboard - Trabaio Camião",
  description: "Dashboard do aplicativo Trabaio Camião",
};

export default function HomePage() {
  return <BlockPage />;
}