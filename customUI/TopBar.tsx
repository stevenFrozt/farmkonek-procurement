import Image from "next/image"
import React from "react"

interface TopBarProps {
  className?: string
}
export default function TopBar({ className }: TopBarProps) {
  return (
    <div
      className={`py-2 px-6 shadow-sm bg-white rounded-xl w-full flex items-center justify-end ${className}}`}
    >
      <div className="flex items-center ">
        <div className="text-right pr-2 text-xs text-gray-500">
          <h1 className="font-semibold text-sm text-black">John Doe</h1>
          John@gmail.com
        </div>
        <div className=" outline outline-farm-yellow outline-2 w-10 h-10 bg-gray-300 rounded-full overflow-hidden relative">
          <Image
            src={"/dashboard/bannerFarmer.jpg"}
            alt={"Profile"}
            fill
            className="object-cover absolute"
          />
        </div>
      </div>
    </div>
  )
}
