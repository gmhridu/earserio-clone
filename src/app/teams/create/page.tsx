'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImUsers } from "react-icons/im";
import Image from 'next/image'
import React, { useState } from 'react'
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const createTeam = useMutation(api.teams.createTeam);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const createNewTeam = async () => {
    const res = await createTeam({
      teamName: teamName,
      createdBy: user?.email || ''
    });
    if (res) {
      toast.success('Team created successfully!', {
        duration: 3000,
        position: 'top-center'
      });
      router.push(`/dashboard`);
      setTeamName('');
    }
  }

  
  return (
    <div className="p-16">
      <Link href={'/dashboard'}>
        <div className="flex gap-x-2 items-center">
          <Image src={"/logo-1.png"} alt="logo" width={60} height={60} />
          <h2 className="font-bold text-2xl">Eraser</h2>
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center py-16 space-y-10">
        <Button
          size={"sm"}
          className="inline-flex gap-x-1 bg-[#1a5829]  text-green-500 cursor-pointer border-t-2 border-green-500"
        >
          <ImUsers size={16} />
          <span className="text-sm font-medium">Team Name</span>
        </Button>
        <div className="space-y-3">
          <h2 className="text-xl text-nowrap sm:text-balance sm:text-3xl lg:text-4xl font-semibold">
            What should we call your team?
          </h2>
          <p className="text-base sm:text-lg text-center text-muted-foreground">
            You can always change this later from settings
          </p>
          <div className="pt-8">
            <Label className="text-base font-semibold text-muted-foreground">
              Team Name
            </Label>
            <Input
              placeholder="Team Name"
              className="mt-1"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <Button
            onClick={() => createNewTeam()}
            disabled={!(teamName && teamName?.length > 0)}
            className={`w-full bg-blue-500 ${teamName && teamName.length > 0 ? "" : "cursor-not-allowed"}`}
          >
            Create Team
          </Button>
        </div>
      </div>
    </div>
  );
}
