/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
// @ts-expect-error: No TypeScript types available for the Checklist plugin
import Checklist from "@editorjs/checklist";
// @ts-expect-error: No TypeScript types available for the Warning plugin
import Warning from "@editorjs/warning";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { FILE } from "../../dashboard/_components/FileList";

interface EditorProps {
  onSaveTrigger: boolean; 
  fileId: any;
  fileData: FILE | undefined;
}

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

export default function Editor({ onSaveTrigger, fileId, fileData }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const [document, setDocument] = useState<any>(rawDocument);
  const updateDocument = useMutation(api.files.updateDocument);

  useEffect(() => {
    if (onSaveTrigger) {
      onSaveDocument();
    }
  }, [onSaveTrigger]);

  useEffect(() => {
    if (!editorRef.current && fileData) {
      initEditor();
    }

    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.destroy();
        editorRef.current = null;
      } else {
        console.warn(
          "Editor instance is not available or destroy is not a function."
        );
      }
    };
  }, [fileData]);

  const onSaveDocument = () => {
    if (editorRef.current) {
      editorRef.current
        .save()
        .then(async (outputData) => {
          await updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          }).then(
            (res) => {
              toast.success("Document Updated", {
                duration: 3000,
                position: "top-center",
              });
            },
            (error) => {
              console.log(error);
              toast.error("Server Error!");
            }
          );
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };

  const initEditor = () => {
    const initialData = fileData?.document
      ? JSON.parse(fileData.document)
      : rawDocument;

    const editor = new EditorJS({
      tools: {
        header: {
          class: Header as unknown as any,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a Header",
          },
        },
        list: {
          class: List as unknown as any,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },
      },
      holder: "editorjs",
      data: initialData,
    });
    editorRef.current = editor;
  };

  return (
    <div className="mx-2">
      <div id="editorjs"></div>
    </div>
  );
}
