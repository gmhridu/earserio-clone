
import { LoaderCircle } from "lucide-react";

import Image from 'next/image'
import React from 'react'

export default function Loader() {
  return (
    <div className="bg-black overflow-hidden">
      <div className="flex h-[95vh]  items-center justify-center overflow-hidden">
        <div className="flex items-center gap-2">
          <Image src={"/logo-1.png"} alt="logo" width={70} height={60} />
          <p className="text-3xl text-white font-semibold">Earser</p>
        </div>
      </div>
      <div className="flex gap-x-2 items-center text-white/90 mb-6 mx-8 pb-1">
        <LoaderCircle className="animate-spin transition-all" size={18}/>
        <span className="text-sm">Loading eraser.io</span>
      </div>
    </div>
  );
}
