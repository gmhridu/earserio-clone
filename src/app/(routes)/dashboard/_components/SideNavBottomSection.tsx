"use client";
import React, { useState } from "react";
import { Archive, Flag, Github, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Constant from "@/app/_constant/Constant";
import PricingDialog from "./PricingDialog";
import { useMediaQuery } from "react-responsive";

interface SideNavBottomSectionProps {
  onFileCreate: (fileName: string) => void;
  totalFiles?: number;
}

const menuList = [
  {
    id: 1,
    name: "Getting Started",
    icon: Flag,
    path: "getting-started",
  },
  {
    id: 2,
    name: "Github",
    icon: Github,
    path: "",
  },
  {
    id: 3,
    name: "Archive",
    icon: Archive,
    path: "",
  },
];
export default function SideNavBottomSection({
  onFileCreate,
  totalFiles = 0,
}: SideNavBottomSectionProps) {
  const pathname = usePathname();
  const progressPercentage = Math.min((totalFiles / 5) * 100, 100);

  const [fileInput, setFileInput] = useState("");
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div>
      {menuList?.map((menu, index) => (
        <Link key={index} href={menu?.path}>
          {isSmallScreen ? (
            <Button
              variant={"outline"}
              size={"icon"}
              className={`w-full hover:bg-muted mt-1 ${pathname === menu?.path ? "bg-gray-100" : ""}`}
              title={"menu?.name"}
            >
              <menu.icon size={18} />
            </Button>
          ) : (
            <Button
              variant={"outline"}
              className={`flex justify-between items-center gap-0.5 w-full hover:bg-muted mt-1 ${pathname === menu?.path ? "bg-gray-100" : ""}`}
            >
              <span className="inline-flex items-center gap-x-2">
                <menu.icon size={18} />
                <span className="font-semibold">{menu?.name}</span>
              </span>
            </Button>
          )}
        </Link>
      ))}
      {/* new file button */}
      <Dialog>
        <DialogTrigger asChild>
          {isSmallScreen ? (
            <Button
              variant={"outline"}
              size={"icon"}
              title="Add New File"
              className="mt-3 w-full"
            >
              <Plus size={18} />
            </Button>
          ) : (
            <Button className="w-full mt-3 font-semibold bg-blue-600 hover:bg-blue-800 justify-start">
              New File
            </Button>
          )}
        </DialogTrigger>
        {totalFiles < Constant?.MAX_FREE_FILE ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
            </DialogHeader>
            <div className="pt-8">
              <Label className="text-base font-semibold text-muted-foreground">
                Team Name
              </Label>
              <Input
                placeholder="Team Name"
                className="mt-1"
                onChange={(e) => setFileInput(e.target.value)}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={!(fileInput && fileInput.length > 3)}
                  onClick={() => onFileCreate(fileInput)}
                  type="button"
                  className={`w-full bg-blue-500`}
                >
                  Create Team
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        ) : (
          <PricingDialog />
        )}
      </Dialog>
      {/* progress bar */}
      {!isSmallScreen && (
        <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
          <div
            className={`h-4 ${totalFiles === 5 ? "bg-red-600" : "bg-blue-600"} rounded-full`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      )}
      {/* progress percentage */}
      {!isSmallScreen && (
        <div className="mt-2">
          <p className="text-sm">
            <strong>{totalFiles}</strong> out of{" "}
            <strong>{Constant.MAX_FREE_FILE}</strong> files used.
          </p>
          <p className="text-nowrap text-sm">
            <span className="underline">Upgrade</span> your plan for unlimited
            access.
          </p>
        </div>
      )}
    </div>
  );
}
