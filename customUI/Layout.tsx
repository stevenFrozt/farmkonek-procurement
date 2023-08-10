"use client"
import React, { useEffect, useRef } from "react"
import NavigationMenu from "./NavigationMenu"
import TopBar from "./TopBar"
interface layoutProps {
  children?: React.ReactNode
  target?: React.Ref<HTMLDivElement>
}

export default function Layout({ children, target }: layoutProps) {
  return (
    <div className="flex  max-h-screen bg-[#F4F5F6] overflow-y-hidden max-w-screen-2xl border mx-auto">
      <div className=" hidden lg:inline  lg:w-[304px] h-screen rounded-md ">
        <NavigationMenu />
      </div>
      <div
        className="w-full min-h-screen overflow-y-scroll lg:px-6 lg:py-4"
        ref={target}
      >
        <TopBar className="mb-6 " />
        {children}
      </div>
    </div>
  )
}
