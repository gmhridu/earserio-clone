/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FileListContext } from "@/app/_context/FileListContext";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { User } from "./SideNavTopSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Archive,
  Copy,
  Link2,
  MoreHorizontal,
  Move,
  Pen,
  Share,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  whiteboard: string;
  teamId: string;
  _id: string;
  _creationTime: number;
}

export interface UserProps {
  user: User | null;
}

const fileDropDown = [
  {
    id: 1,
    name: "Copy Link",
    icon: Link2,
    path: "",
    shortcut: "Alt + Shift + C",
  },
  {
    id: 2,
    name: "Rename",
    icon: Pen,
    path: "",
    shortcut: "Alt + Shift + R",
  },
  {
    id: 3,
    name: "Share",
    icon: Share,
    path: "",
    shortcut: "Ctrl + I",
  },
  {
    id: 4,
    name: "Move",
    icon: Move,
    path: "",
    shortcut: "Alt + M",
  },
  {
    id: 5,
    name: "Duplicate",
    icon: Copy,
    path: "",
    shortcut: "Ctrl + D",
  },
  {
    id: 6,
    name: "Archive",
    icon: Archive,
    path: "",
    shortcut: "Ctrl + E",
  },
];

export default function FileList() {
  const { fileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const { user }: UserProps = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    if (fileList_) {
      setFileList(fileList_);
    }
  }, [fileList_]);
  return (
    <div className="mt-10 mx-5">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">File Name</TableHead>
              <TableHead>Create At</TableHead>
              <TableHead className="w-[550px]">Edited</TableHead>
              <TableHead className="w-[100px]">Author</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fileList &&
              fileList?.map((file: FILE, index: number) => (
                <TableRow key={index}
                  onClick={() => router.push(`/workspace/${file?._id}`)}
                className="cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {file?.fileName}
                  </TableCell>
                  <TableCell>
                    {moment(file?._creationTime).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell>
                    {moment(file?._creationTime).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-5">
                      <Avatar>
                        <AvatarImage
                          title={`${user?.given_name ?? ""} ${user?.family_name ?? ""}`}
                          src={user?.picture || ""}
                          alt="User Avatar"
                          width={25}
                          height={25}
                          className="cursor-pointer"
                        />
                        <AvatarFallback>
                          {typeof user?.family_name === "string" &&
                          user?.family_name
                            ? user?.family_name.slice(0, 2).toUpperCase()
                            : "ER"}
                        </AvatarFallback>
                      </Avatar>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-full">
                            <MoreHorizontal size={20} />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="border-none mr-8 w-56">
                          {fileDropDown?.map((menu, index) => (
                            <Link href={menu?.path} key={index}>
                              <DropdownMenuItem className="cursor-pointer">
                                <menu.icon className="mr-2" size={16} />
                                <span>{menu?.name}</span>
                                {menu?.shortcut && (
                                  <DropdownMenuShortcut>
                                    {menu?.shortcut}
                                  </DropdownMenuShortcut>
                                )}
                              </DropdownMenuItem>
                            </Link>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
