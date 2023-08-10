"use client"
import React, { useEffect, useRef } from "react"
import NavigationMenu from "./NavigationMenu"
import TopBar from "./TopBar"
import { atom, useAtom } from "jotai"
interface layoutProps {
  children?: React.ReactNode
  target?: React.Ref<HTMLDivElement>
}

export const navAtom = atom(false)

export default function Layout({ children, target }: layoutProps) {
  const [showNav, setShowNav] = useAtom(navAtom)
  return (
    <div className="lg:flex block max-h-screen bg-[#F4F5F6] overflow-y-hidden max-w-screen-2xl border lg:mx-auto">
      <div
        className={`${
          showNav ? "inline" : "hidden"
        } z-50 absolute bg-red-500/50 lg:static w-full lg:inline  lg:w-[304px] h-screen rounded-md `}
      >
        <NavigationMenu />
      </div>
      <div
        className="w-full min-h-screen h-screen overflow-y-scroll lg:px-6 lg:py-4 pb-4"
        ref={target}
      >
        <TopBar className="lg:mb-6" />
        {children}
      </div>
    </div>
  )
}
