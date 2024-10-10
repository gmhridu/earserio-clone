/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";

export interface EditorProps {
  onSaveTrigger: boolean; 
  fileId: any;
  fileData: FILE | undefined;
}

export default function Canvas({ onSaveTrigger, fileId, fileData }: EditorProps) {
  const [loading, setLoading] = useState(true);
  const [whiteboardData, setWhiteboardData] = useState<any>(null); 
  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  
  useEffect(() => {
    if (onSaveTrigger) {
      saveWhiteBoard();
    }
  }, [onSaveTrigger]);

  
  const saveWhiteBoard = async () => {
    await updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteboardData),
    })
      .then((res) => {
        console.log(res);
    })
  };

  
  const handleChange = (excalidrawElements: any) => {
    setWhiteboardData(excalidrawElements);
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-screen w-full" />
        </div>
      </div>
    );
  }

  let initialElements;
  try {
    initialElements =
      fileData && fileData.whiteboard ? JSON.parse(fileData.whiteboard) : [];
  } catch (error) {
    console.error("Error parsing whiteboard data:", error);
    initialElements = [];
  }


  return (
    <div style={{ height: "90%" }}>
      <Excalidraw
        theme="light"
        initialData={{
          elements: initialElements,
        }}
        onChange={handleChange}
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: false,
            export: false,
          },
        }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.ToolbarHint />
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.MenuItemHelp />
          </WelcomeScreen.Center>
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
}
