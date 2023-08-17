import { LineTab, Button as LineButton } from "../../customUI/LineTab"
import MySearch from "../../customUI/MySearch"
import { useAtom } from "jotai"
import { tabIndexAtom } from "./state"
import { Button } from "@/components/ui/button"
import { Plus, UserPlus } from "lucide-react"

export default function LineTabComponent({}: any) {
  const [currentTab, setCurrentTab] = useAtom(tabIndexAtom)
  // CHANGE TAB
  function changeTab(event: React.MouseEvent<HTMLDivElement>) {
    const eventTarget = event.target as HTMLDivElement
    const value = eventTarget?.dataset?.value || ""

    switch (value) {
      case "Users":
        setCurrentTab(0)
        break
      case "Roles":
        setCurrentTab(1)
        break
      case "Permissions":
        setCurrentTab(2)
        break
      default:
        setCurrentTab(0)
        break
    }
  }

  return (
    <div className="flex flex-col justify-center md:flex-row items-center md:justify-between gap-1 md:gap-0  ">
      <div className="w-full flex justify-center md:w-fit overflow-x-auto scrollbar-hide pr-4">
        <LineTab>
          <LineButton onClick={changeTab} value="Users">
            Users
          </LineButton>
          <LineButton onClick={changeTab} value="Roles">
            Roles
          </LineButton>
          <LineButton onClick={changeTab} value="Permissions">
            Permissions
          </LineButton>
        </LineTab>
      </div>

      {/* SEARCH */}

      {currentTab === 1 ? (
        <Button className="flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-500  ">
          <UserPlus className="h-5 w-5" /> Create Role
        </Button>
      ) : currentTab === 2 ? (
        <Button className="flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-500  ">
          <Plus className="h-5 w-5" /> Create Permission
        </Button>
      ) : (
        ""
      )}
    </div>
  )
}
