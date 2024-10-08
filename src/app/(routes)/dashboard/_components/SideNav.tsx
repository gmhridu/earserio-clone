"use client";
import React, { useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";


export default function SideNav() {
  const { user } = useKindeBrowserClient();
  const [activeTeam, setActiveTeam] = useState<TEAM>()
  const createFile = useMutation(api.files.createFile);
  

  const onFileCreate = async (fileName: string) => {
    await createFile({
      fileName: fileName,
      teamId: activeTeam?._id as string,
      createdBy: user?.email as string,
      archive: false,
      document: "",
      whiteboard: "",
    })
      .then((res) => {
        if (res){
          toast.success('File Created Successfully!', {
            duration: 3000,
            position: "top-center"
        })
      }
      }, (e) => {
        console.log(e);
        toast.error('Error while creating file',
          {
            duration: 3000,
            position: "top-center"
          }
        )
    })
  }
   
  return (
    <div className="h-screen fixed w-[20rem] max-w-96 border-r p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection user={user} setActiveTeamInfo={(activeTeam)=> setActiveTeam(activeTeam)} />
      </div>

      <div>
        <SideNavBottomSection onFileCreate={onFileCreate} />
      </div>
    </div>
  );
}
