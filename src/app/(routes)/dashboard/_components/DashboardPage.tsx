"use client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Header from "./Header";
import FileList from "./FileList";
import { User } from "./SideNavTopSection";
import SideNav from "./SideNav";
import { useMediaQuery } from "react-responsive";
import AllFiles from "../all-files/page";

type Props = {
  defaultLayout: number[] | undefined;
  navCollapsedSize: number;
  defaultCollapsed: boolean;
  user: User | null
};

export default function DashboardPage({
  defaultLayout = [30, 70],
  navCollapsedSize,
  defaultCollapsed,
  user
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState<boolean>(false);
   const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          console.log(sizes);
        }}
        className="items-stretch h-full min-h-screen"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true && !isSmallScreen}
          minSize={20}
          maxSize={30}
          onCollapse={() => {
            setIsCollapsed(true);
          }}
          onResize={() => {
            setIsCollapsed(false);
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div className="flex flex-col">
            {/* side-bar */}
            <SideNav />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle={!isSmallScreen} />
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={40}
        >
          <div>
            <Header user={user} />

            {showAllFiles ? <AllFiles /> : <FileList />}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
