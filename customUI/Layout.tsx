import React from "react"
import NavigationMenu from "./NavigationMenu"
import TopBar from "./TopBar"

interface layoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: layoutProps) {
  return (
    <div className="flex  max-h-screen bg-[#F4F5F6] overflow-y-hidden max-w-screen-2xl border mx-auto">
      <div className="w-[304px] h-screen rounded-md">
        <NavigationMenu />
      </div>
      <div className="w-full min-h-screen overflow-y-scroll px-6 py-4">
        <TopBar className="mb-6" />
        {children}
      </div>
    </div>
  )
}
