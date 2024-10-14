import React from 'react'

export default function SideNavTops() {
  return (
    <div>
      {" "}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-x-1 items-center justify-center cursor-pointer hover:bg-slate-300 p-2 hover:rounded-md">
            <Image src={"/logo-1.png"} alt="logo" width={50} height={60} />
            <h3 className="text-xl font-bold inline-flex items-center">
              {/* Shadcn Select Component */}
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
    </div>
  );
}
