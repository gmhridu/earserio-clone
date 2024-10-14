/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FileListContext";
import { useMediaQuery } from "react-responsive";

type Props = {
  isCollapsed?: boolean;
}

export default function SideNav({isCollapsed}: Props) {
  const { user } = useKindeBrowserClient();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [totalFiles, setTotalFiles] = useState<number>();
  const createFile = useMutation(api.files.createFile);
  const convex = useConvex();
  const { setFileList_ } = useContext(FileListContext);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  
 

  useEffect(() => {
    if (activeTeam) {
      getFiles();
    }
  }, [activeTeam]);

  const onFileCreate = async (fileName: string) => {
    await createFile({
      fileName: fileName,
      teamId: activeTeam?._id as string,
      createdBy: user?.email as string,
      archive: false,
      document: "",
      whiteboard: "",
    }).then(
      async (res) => {
        if (res) {
          toast.success("File Created Successfully!", {
            duration: 3000,
            position: "top-center",
          });
          await getFiles();
        }
      },
      (e) => {
        console.log(e);
        toast.error("Error while creating file", {
          duration: 3000,
          position: "top-center",
        });
      }
    );
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id as string,
    });
    setFileList_(result);
    setTotalFiles(result?.length);
  };

  return (
    <div
      className={`h-screen  p-2 flex flex-col ${isSmallScreen && "items-center justify-center"}`}
    >
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          isCollapsed={isCollapsed}
          setActiveTeamInfo={(activeTeam) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection
          onFileCreate={onFileCreate}
          totalFiles={totalFiles}
        />
      </div>
    </div>
  );
}
