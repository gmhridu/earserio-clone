/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {useLocalStorage} from 'usehooks-ts'
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "react-responsive";

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
  isCollapsed?: boolean;
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
  isCollapsed,
}: SideNavTopSectionProps) {
  const convex = useConvex();
  const [activeTeam, setActiveTeam] = useLocalStorage<TEAM | null>(
    "activeTeam",
    null
  );
  const [teamList, setTeamList] = useState<TEAM[]>([]);
  const [showAllFiles, setShowAllFiles] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });


  useEffect(() => {
    user && getTeamList();
  }, [user]);

  useEffect(() => {
    if (activeTeam) {
      setActiveTeamInfo(activeTeam);
    } else if (teamList.length > 0) {
      setActiveTeam(teamList[0]);
      setActiveTeamInfo(teamList[0]);
    }
  }, [activeTeam, teamList]);

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeams, {
      email: user?.email as string,
    });
    setTeamList(result);
    if (!activeTeam && result.length > 0) {
      setActiveTeam(result[0]);
    }
  };

  return (
    <div>
      <Select
        onValueChange={(value) => {
          const selectedTeam = teamList.find((team) => team._id === value);
          if (selectedTeam) {
            setActiveTeam(selectedTeam);
            setActiveTeamInfo(selectedTeam);
          }
        }}
        value={activeTeam?._id}
      >
        <SelectTrigger
          className={cn(
            `${isSmallScreen ? "flex-none" : "flex"} items-center gap-2 w-full focus:outline-none focus:ring-white`,
            isCollapsed && "w-9 h-9 justify-center p-0"
          )}
        >
          <>
            {isSmallScreen ? (
              <Button variant={"ghost"} size={"icon"}>
                <Image
                  src={"/logo-1.png"}
                  alt="logo"
                  width={50}
                  height={60}
                  className="size-5 md:size-6"
                />
              </Button>
            ) : (
              <>
                <Image
                  src={"/logo-1.png"}
                  alt="logo"
                  width={50}
                  height={60}
                  className="size-5 md:size-6"
                />
                <span>
                  <SelectValue placeholder="Select a team">
                    {activeTeam?.teamName ?? "Select a team"}
                  </SelectValue>
                </span>
              </>
            )}
          </>
        </SelectTrigger>
        <SelectContent>
          {teamList?.map((team) => (
            <SelectItem
              className="cursor-pointer"
              key={team?._id}
              value={team?._id}
            >
              {team?.teamName}
            </SelectItem>
          ))}
          <Separator className="mt-2" />
          <div className="mt-2">
            {menu?.map((item, index) => (
              <Link
                key={index}
                href={item?.path}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <item.icon className="mr-2" size={18} />
                <span>{item?.name}</span>
                {item?.shortcut && (
                  <span className="ml-auto text-muted-foreground">
                    {item?.shortcut}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Logout button */}
          <div>
            <LogoutLink>
              <Button
                variant="ghost"
                className="flex items-center justify-start gap-2 p-2 w-full"
              >
                <LogOut size={18} className="mr-2" />
                <span>Logout</span>
              </Button>
            </LogoutLink>
          </div>
        </SelectContent>
      </Select>

      {/* All files button */}
      {isSmallScreen ? (
        <Button
          variant={"outline"}
          size={"icon"}
          title="All File"
          className="mt-8 w-full"
        >
          <LayoutGrid size={18} />
        </Button>
      ) : (
        <Link href={'/dashboard/all-files'}>
          <Button
            variant={"outline"}
            className={`flex justify-between items-center gap-2
        w-full mt-8 bg-gray-100`}
              onClick={()=> setShowAllFiles(showAllFiles)}
          >
            <span className="inline-flex items-center gap-x-2">
              <LayoutGrid size={18} />
              <span className="font-semibold">All Files</span>
            </span>
            <span className="text-xs">A</span>
          </Button>
        </Link>
      )}
    </div>
  );
}
