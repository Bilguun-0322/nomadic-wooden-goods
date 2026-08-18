import React from "react";
import type { Metadata } from "next";
import { AdminDashboard } from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Админ Удирдлагын Самбар | Нүүдэлчин модон эдлэл",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminDashboard />;
}
