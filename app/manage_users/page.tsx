"use client"
import Layout from "@/customUI/Layout"
import UsersSection from "./UsersSection"
import { useAtom } from "jotai"
import RolesSection from "./RolesSection"
import LineTabComponent from "./LineTabComponent"
import PermissionSection from "./PermissionSection"
import { tabIndexAtom } from "./state"

export default function Page() {
  const [currentTab] = useAtom(tabIndexAtom)

  return (
    <Layout>
      <div
        className={` shadow-sm bg-white lg:rounded-xl min-h-[37rem] overflow-x-hidden `}
      >
        <div className="px-6 pt-6 ">
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
