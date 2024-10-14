"use client"
import { Input } from '@/components/ui/input'
import { Search, Send } from 'lucide-react'
import React from 'react'
import { User } from './SideNavTopSection'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export interface UserProps {
  user: User | null;
}

export default function Header({ user }: UserProps) {
  return (
    <div className="flex justify-end gap-2 w-full items-center mt-5">
      <div className="flex gap-2 items-center relative">
        <Search size={18} className="absolute left-3" />
        <Input type="text" placeholder="Search" className="pl-9" />
      </div>
      <div className='flex gap-2 items-center'>
        <Avatar>
          <AvatarImage
            title={`${user?.given_name ?? ""} ${user?.family_name ?? ""}`}
            src={user?.picture || ""}
            alt="User Avatar"
            className="cursor-pointer"
          />
          <AvatarFallback>
            {typeof user?.family_name === "string" && user?.family_name
              ? user?.family_name.slice(0, 2).toUpperCase()
              : "ER"}
          </AvatarFallback>
        </Avatar>
        <div>
          <Button size={"sm"} className='flex items-center gap-x-2 bg-blue-600 hover:bg-blue-800'>
            <Send size={14}/>
            <span className="">Invite</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
