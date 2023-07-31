import React from "react"
import { CaretSortIcon, PlusIcon } from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

function ActionMenu({ children }: any) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-green-500 text-white px-4 py-2 flex items-center justify-center rounded-sm pr-8">
          <CaretSortIcon className="h-6 w-6" />
          Action
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

function ActionItem({ children, onClick }: any) {
  return (
    <DropdownMenuItem
      className="px-4 flex  items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </DropdownMenuItem>
  )
}

export { ActionMenu, ActionItem }
