/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export interface User {
  id: string;
  email: string | null;
  given_name: string | null;
  family_name: string | null;
  picture: string | null;
}

interface SideNavTopSectionProps {
  user: User | null;
  setActiveTeamInfo: (team: TEAM) => void;
}

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

const menu = [
  {
    id: 1,
    name: "Join or Create Team",
    path: "/teams/create",
    icon: Users,
  },
  {
    id: 2,
    name: "Settings",
    path: "",
    icon: Settings,
    shortcut: "⌘S",
  },
];
export default function SideNavTopSection({
  user,
  setActiveTeamInfo,
}: SideNavTopSectionProps) {
  const convex = useConvex();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [teamList, setTeamList] = useState<TEAM[]>([]);

  useEffect(() => {
    user && getTeamList();
  }, [user]);

  useEffect(() => {
    activeTeam && setActiveTeamInfo(activeTeam);
  }, [activeTeam]);

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeams, {
      email: user?.email as string,
    });
    setTeamList(result);
    setActiveTeam(result[0]);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-x-1 items-center justify-center cursor-pointer hover:bg-slate-300 p-2 hover:rounded-md">
            <Image src={"/logo-1.png"} alt="logo" width={50} height={60} />
            <h3 className="text-xl font-bold inline-flex items-center">
              {activeTeam?.teamName}
              <span className="pl-1">
                <ChevronDown size={16} />
              </span>
            </h3>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 mx-1">
          <div>
            {teamList?.map((team) => (
              <DropdownMenuLabel
                key={team?._id}
                className={`font-medium hover:bg-muted  cursor-pointer rounded-md my-2 ${activeTeam?._id === team?._id && "bg-[#2866DF] text-white hover:bg-[#05328d]"}`}
                onClick={() => setActiveTeam(team)}
              >
                {team?.teamName}
              </DropdownMenuLabel>
            ))}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {menu?.map((item, index) => (
              <Link key={index} href={item?.path}>
                <DropdownMenuItem className="cursor-pointer">
                  <item.icon className="mr-2" size={18} />
                  <span>{item?.name}</span>
                  {item?.shortcut && (
                    <DropdownMenuShortcut>
                      {item?.shortcut}
                    </DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              </Link>
            ))}
            <LogoutLink>
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="mr-2" size={18} />
                <span>Logout</span>
              </DropdownMenuItem>
            </LogoutLink>
            <DropdownMenuSeparator />
            {/* User info */}
            <DropdownMenuItem className="mt-3 mb-2 cursor-pointer">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage
                    title={`${user?.given_name ?? ""} ${user?.family_name ?? ""}`}
                    src={user?.picture || ""}
                    alt="user AvatarImage"
                    className="cursor-pointer"
                  />
                  <AvatarFallback>
                    {typeof user?.family_name === "string" && user?.family_name
                      ? user?.family_name.slice(0, 2).toUpperCase()
                      : "ER"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col px-2">
                  <h3 className="text-sm font-semibold">
                    {user?.given_name ?? ""} {user?.family_name ?? ""}
                  </h3>
                  <span className="text-wrap text-muted-foreground">
                    {user?.email ?? ""}
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* All files button */}
      <Button
        variant={"outline"}
        className="flex justify-between items-center gap-2 w-full mt-8 bg-gray-100"
      >
        <span className="inline-flex items-center gap-x-2">
          <LayoutGrid size={18} />
          <span className="font-semibold">All Files</span>
        </span>
        <span className="text-xs">A</span>
      </Button>
    </div>
  );
}
