"use client"
import Layout from "@/customUI/Layout"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import UsersSection from "./UsersSection"
import { atom, useAtom } from "jotai"
import RolesSection from "./RolesSection"
import LineTabComponent from "./LineTabComponent"
import PermissionSection from "./PermissionSection"

export const tabIndex = atom(0)

export default function Page() {
  const [currentTab] = useAtom(tabIndex)

  return (
    <Layout>
      <div
        className={` shadow-sm bg-white lg:rounded-xl min-h-[37rem] overflow-x-hidden `}
      >
        <div className="px-6 pt-6 pb-4">
          <LineTabComponent />
        </div>

        {currentTab === 0 ? (
          <UsersSection />
        ) : currentTab === 1 ? (
          <RolesSection />
        ) : (
          <PermissionSection />
        )}
      </div>
    </Layout>
  )
}
