/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import SideNav from "./_components/SideNav";
import Loader from "@/components/Loader/Loader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const convex = useConvex();
  const { user, isLoading } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    user && checkTeams();
  },[user]);

  const checkTeams = async () => {
    const result = await convex.query(api.teams.getTeams, { email: user?.email || '' })
    if (!result?.length) {
      router.push('teams/create')
    }

  }

  if (isLoading) return <Loader/>;

  return (
    <div>
      <div className="grid grid-cols-4">
        <div>
        <SideNav/>
        </div>
        <div className="grid-cols-3">
          {children}
        </div>
      </div>
    </div>
  );
}
