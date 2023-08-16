import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { SearchIcon } from "lucide-react"
import React, { useState } from "react"

export default function EditRoleModal({
  showEditRoleModal,
  setShowEditRoleModal
}: any) {
  return (
    <div>
      <Dialog open={showEditRoleModal} onOpenChange={setShowEditRoleModal}>
        <DialogContent className="max-w-2xl gap-0 mt-8 md:mt-0 pt-8 ">
          <div className=" max-h-[95vh] w-full overflow-y-auto scrollbar-hide pb-20 md:pb-0">
            <h1 className="text-xl font-semibold ">Edit Role</h1>
            <Separator />
            <p className="text-xs py-2 mb-2 ">
              Assigned to users, roles define their authorized actions, access
              rights, and responsibilities within a system, facilitating
              efficient management, security, and appropriate resource usage.
            </p>
            <div className="m-1 space-y-6">
              <div>
                <Label htmlFor="role_name">Name</Label>
                <Input
                  type="text"
                  id="role_name"
                  className="w-full mt-1"
                  placeholder="Enter Role Name"
                />
              </div>
              <div>
                <Label htmlFor="role_description">Description</Label>
                <Textarea
                  id="role_description"
                  className="w-full mt-1"
                  placeholder="Enter Role Description"
                />
              </div>
            </div>
            <div className="pt-6">
              <h1 className="text-xl font-semibold ">Role Permission</h1>
              <Separator />
              <div>
                <div className="py-2 mx-1 flex items-center justify-between flex-wrap gap-1 md:gap-2">
                  <Search />
                  <Button>Select All</Button>
                </div>
                <div className="border py-8 px-8 rounded-md flex items-center flex-wrap gap-4 max-h-[276px] overflow-y-auto">
                  <RoleButton title="Create" />
                  <RoleButton title="Read:farms" />
                  <RoleButton title="test:fa" />
                  <RoleButton title="g:farms" />
                  <RoleButton title="Create:farms" />
                  <RoleButton title="Create:farms" />
                  <RoleButton title="Create:farmers_incorporat" />
                  <RoleButton title="Create:farmers_food/Veg" />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="md:hover:bg-farm-green bg-green-500">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function RoleButton({ title = "title" }: any) {
  const [isCheck, setIsCheck] = useState(false)
  return (
    <div
      onClick={() => setIsCheck(prev => !prev)}
      className={`${
        isCheck ? "border-green-500" : ""
      } bg-white border-2 text-xs md:text-sm border-gray-300 py-2 px-4 rounded-md  flex items-center  justify-center max-w-fit gap-2 cursor-pointer md:hover:shadow-lg md:hover:scale-105 transition-all duration-150 md:hover:border-farm-yellow `}
    >
      <Checkbox
        checked={isCheck}
        className=" bg-background border-ring w-4 h-4 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
      />
      {title}
    </div>
  )
}

function Search() {
  return (
    <div className="relative w-full md:w-1/2">
      <input
        type="text"
        className="py-2 px-3 text-sm pr-8 border  my-2 h-10 w-full overflow-hidden rounded-md outline-ring"
        placeholder="Search Permissions..."
      />
      <SearchIcon className="absolute top-1/2   -translate-y-1/2 right-2 h-5 w-5 text-ring" />
    </div>
  )
}
