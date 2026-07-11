import React from "react";
import DashboardShell from "@/components/navigation/DashboardShell";

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
