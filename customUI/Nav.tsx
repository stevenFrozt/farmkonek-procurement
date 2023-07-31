"use client"

import { Badge, LayoutDashboard } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface NavProps {
  className?: string
  children?: React.ReactNode
}

function Nav({ className = "", children }: NavProps) {
  return (
    <div className={` bg-white shadow-lg overflow-hidden ${className}`}>
      <div className="relative w-48 h-48 mx-auto ">
        <Image
          src={"/logo/farmkonekt_logo.png"}
          className="absolute object-cover"
          alt="farmkonekt"
          fill={true}
          priority
          sizes="400px"
        />
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

  useEffect(() => {
    if (currentPath.includes(link)) setIsActive(true)
  }, [currentPath, link])
  return (
    <Link href={link}>
      <button
        className={` w-full py-6 flex items-center gap-8 text-lg hover:bg-muted border-green-500  ${
          isActive
            ? "border-l-4 text-farm-green  font-semibold "
            : "text-farm-brown font-medium pl-1  "
        } ${className}`}
      >
        <div className="w-28 flex items-center justify-end pl-2">{icon}</div>
        <div className="text-left w-full ">
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
