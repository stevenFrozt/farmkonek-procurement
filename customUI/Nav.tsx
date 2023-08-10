"use client"

import { LayoutDashboard, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import logo from "@/public/logo/farmkonekt_logo.png"
import { useAtom } from "jotai"
import { navAtom } from "./Layout"
interface NavProps {
  className?: string
  children?: React.ReactNode
}

function Nav({ className = "", children }: NavProps) {
  const [, setShowNav] = useAtom(navAtom)
  return (
    <div className={` bg-white shadow-lg overflow-hidden   ${className}`}>
      <Image
        src={logo}
        className="h-48 w-48 mx-auto"
        alt="farmkonekt"
        width={1683}
        height={1683}
        priority
        placeholder="blur"
      />
      <div className="flex items-center justify-end text-red-500">
        <button
          className=" px-2 lg:hidden font-semibold flex items-center"
          onClick={() => setShowNav(prev => !prev)}
        >
          Close Menu
          <X className="w-7 h-7 " />
        </button>
      </div>

      {children}
    </div>
  )
}
7

interface navItemProps {
  children: string
  icon?: React.ReactNode
  link?: string
  className?: string
  Badge?: number
}

function NavItem({
  children = "Dashboard",
  icon = <LayoutDashboard />,
  link = "/test",
  className = "",
  Badge
}: navItemProps) {
  const currentPath = usePathname()
  const [isActive, setIsActive] = useState(false)
  const [, setShowNav] = useAtom(navAtom)

  useEffect(() => {
    if (currentPath.includes(link)) setIsActive(true)
  }, [currentPath, link])

  return (
    <Link href={link} onClick={() => setShowNav(false)}>
      <button
        className={` w-full py-6 flex items-center gap-8 text-lg hover:bg-muted border-green-500  ${
          isActive
            ? "border-l-4 text-farm-green  font-semibold "
            : "text-farm-brown font-medium pl-1  "
        } ${className}`}
        onClick={() => (isActive ? window.location.reload() : "")}
      >
        <div className="w-28 flex items-center justify-end pl-2">{icon}</div>
        <div className=" text-left w-full ">
          <div className="relative w-fit">
            {children}

            {Badge ? (
              <div className="absolute bg-red-500 animate-pulse -right-6 -top-0 text-sm w-5 h-5 flex items-center justify-center rounded-full text-white">
                {Badge}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </button>
    </Link>
  )
}

export { NavItem, Nav }
