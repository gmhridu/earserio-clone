/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import SideNav from "./_components/SideNav";
import Loader from "@/components/Loader/Loader";
import { FileListContext } from "@/app/_context/FileListContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const convex = useConvex();
  const { user, isLoading } = useKindeBrowserClient();
  const router = useRouter();
  const [fileList_, setFileList_] = useState()

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
    <>
      <FileListContext.Provider value={{fileList_, setFileList_}}>
        {/* <div className="grid grid-cols-4">
          <div className="h-screen w-80 fixed">
            <SideNav />
          </div>
          <div className="col-span-4 ml-80">{children}</div>
        </div> */}
        <div>
          {children}
        </div>
      </FileListContext.Provider>
    </>
  );
}
