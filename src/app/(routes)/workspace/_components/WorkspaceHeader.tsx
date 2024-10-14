"use client";
import { Button } from "@/components/ui/button";
import { Save, Share2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface SAVE {
  onSave: () => void;
  fileName: string;
}

export default function WorkspaceHeader({ onSave, fileName }: SAVE) {
  return (
    <div className="p-3 border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href={"/dashboard"}>
          <Image src={"/logo-1.png"} alt="logo" width={40} height={40} />
        </Link>
        <h2 className="font-bold">{fileName}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button
          className="text-[12px] gap-2 bg-yellow-600 hover:bg-yellow-800"
          onClick={onSave}
        >
          {" "}
          <Save size={18} />
          <span>Save</span>
        </Button>
        <Button className="text-[12px] gap-2 bg-blue-600 hover:bg-blue-900">
          <span>Share</span>
          <Share2Icon size={18} />
        </Button>
      </div>
    </div>
  );
}
