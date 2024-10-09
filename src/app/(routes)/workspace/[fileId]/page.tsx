/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import dynamic from "next/dynamic";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
const Editor = dynamic(() => import("../_components/Editor"), {
  ssr: false, 
});

interface Params {
  fileId: any;
}

interface FileIdProps{
  params: Params;
}

export default function Workspace({params}: FileIdProps) {
  const [triggerSave, setTriggerSave] = useState(false); 
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE>();

  useEffect(() => {
    if (params?.fileId) {
      getFileData();
    }
  },[params?.fileId])

  const getFileData = async () => {
    const res = await convex.query(api.files.getFileById, { _id: params?.fileId });
    setFileData(res); 
  }

 
  const handleSave = () => {
    setTriggerSave((prev) => !prev); 
  };

  return (
    <div>
      <WorkspaceHeader onSave={handleSave} />

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <Editor onSaveTrigger={triggerSave} fileId={params?.fileId} fileData={fileData} />
        </div>
        <div className="">Canvas</div>
      </div>
    </div>
  );
}
