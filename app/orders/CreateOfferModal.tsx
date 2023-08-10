import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandInput } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import ItemLabel from "@/customUI/ItemLabel"
import { ChevronsUpDown } from "lucide-react"
import React, { useState } from "react"

export default function CreateOfferModal({ offerModal, setOfferModal }: any) {
  return (
    <Dialog open={offerModal} onOpenChange={setOfferModal}>
      <DialogContent className="max-w-2xl gap-0 pt-8">
        <h1 className="text-xl font-semibold ">Order Item</h1>
        <Separator />
        <div className="grid grid-cols-2 w-full gap-2 pt-4 pb-12">
          <ItemLabel label="ID" value="#082361" />
          <ItemLabel label="Merchant ID" value="#082361" />
          <ItemLabel label="Order Number" value="#082361" />
          <ItemLabel label="Created By" value="#082361" />
          <ItemLabel label="Date Needed" value="#082361" />
          <ItemLabel label="Date Created" value="#082361" />
          <ItemLabel label="Date Updated" value="#082361" />
          <ItemLabel label="Status" value="#082361" />
        </div>
        <h1 className="text-xl font-semibold ">Order Offer</h1>
        <Separator />
        <div className="pt-4">
          <Combobox />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Combobox() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DropdownMenuLabel>Email</DropdownMenuLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            Select framework...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
