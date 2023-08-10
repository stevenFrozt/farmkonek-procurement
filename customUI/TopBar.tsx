import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useAtom } from "jotai"
import Image from "next/image"
import React from "react"
import { navAtom } from "./Layout"
interface TopBarProps {
  className?: string
}
export default function TopBar({ className }: TopBarProps) {
  const [, setShowNav] = useAtom(navAtom)
  return (
    <div
      className={`py-2 px-2 lg:px-6 shadow-sm bg-white lg:rounded-xl w-full flex items-center overflow-hidden justify-between lg:justify-end ${className}`}
    >
      {/* Nav */}
      <button
        className="ml-4 lg:hidden"
        onClick={() => setShowNav(prev => !prev)}
      >
        <HamburgerMenuIcon className="h-7 w-7" />
      </button>
      {/* Profile */}
      <div className="flex items-center ">
        <div className="text-right pr-2 text-xs text-gray-500">
          <h1 className="font-semibold text-sm text-black">John Doe</h1>
          John@gmail.com
        </div>
        <div className=" outline outline-farm-yellow outline-2 w-10 h-10 bg-gray-300 rounded-full overflow-hidden relative">
          <Image
            src={"/dashboard/bannerFarmer.jpg"}
            alt={"Profile"}
            width={2000}
            height={2000}
            className="object-cover absolute"
          />
        </div>
      </div>
    </div>
  )
}
