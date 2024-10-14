/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import dynamic from "next/dynamic";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import Loader from "@/components/Loader/Loader";
const Editor = dynamic(() => import("../_components/Editor"), {
  ssr: false,
});
const Canvas = dynamic(() => import("../_components/Canvas"), {
  ssr: false,
});

interface Params {
  fileId: any;
}

interface FileIdProps {
  params: Params;
}

export default function Workspace({ params }: FileIdProps) {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileName = fileData?.fileName as string;

  useEffect(() => {
    if (params?.fileId) {
      getFileData();
    }
  }, [params?.fileId]);

  const getFileData = async () => {
    setIsLoading(true);
    try {
      const res = await convex.query(api.files.getFileById, {
        _id: params?.fileId,
      });
      setFileData(res);
    } catch (error) {
      console.error("Error fetching file data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    setTriggerSave((prev) => !prev);
  };

  

  if (isLoading) return <Loader />;
  return (
    <div>
      <WorkspaceHeader onSave={handleSave} fileName={fileName} />

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-screen">
          <Editor
            onSaveTrigger={triggerSave}
            fileId={params?.fileId}
            fileData={fileData}
          />
        </div>
        <div className="h-screen border-l col-span-2 md:col-span-1">
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={params?.fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
}
