import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem
} from "@/components/ui/command"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import ItemLabel from "@/customUI/ItemLabel"
import { cn } from "@/lib/utils"
import { CommandGroup } from "cmdk"
import { Check, ChevronsUpDown } from "lucide-react"
import React, { useState } from "react"

export default function CreateOfferModal({ offerModal, setOfferModal }: any) {
  return (
    <Dialog open={offerModal} onOpenChange={setOfferModal}>
      <DialogContent className="max-w-2xl gap-0 pt-8 mt-8 md:mt-0">
        <div className=" max-h-[95vh] w-full scrollbar-hide overflow-y-auto pb-24 pt-4 md:py-0">
          <h1 className="text-xl font-semibold ">Order Item</h1>
          <Separator />
          <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-2 pt-4 pb-8">
            <ItemLabel label="ID" value="#082361" />
            <ItemLabel label="Merchant ID" value="#082361" />
            <ItemLabel label="Order Number" value="#082361" />
            <ItemLabel label="Created By" value="#082361" />
            <ItemLabel label="Date Needed" value="#082361" />
            <ItemLabel label="Date Created" value="#082361" />
            <ItemLabel label="Date Updated" value="#082361" />
            <ItemLabel label="Status" value="#082361" />
          </div>
          {/* <h1 className="text-xl font-semibold ">Order Offer</h1> */}
          <Separator />
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:px-1">
            <Combobox label="Commodity" />
            <Combobox label="Unit" />
            <Combobox label="Category" />
            <Combobox label="Variety" />
            <Combobox label="Product" />
            <Combobox label="Volume" />
          </div>
          {/* Notes */}
          <div className="mt-4">
            <DropdownMenuLabel>Notes</DropdownMenuLabel>
            <div className="border w-full min-h-[40px] rounded-md p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Similique distinctio enim deserunt magni quibusdam quasi minima
              expedita iusto, obcaecati tenetur!
            </div>
          </div>
          {/* Action */}
          <div className="flex items-center justify-end gap-2 pt-6">
            <Button>Cancel</Button>
            <Button className="bg-farm-green">Save Offer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Combobox({ label = "label" }) {
  const [open, setOpen] = useState(false)

  const testItem = [
    { value: "Item 1", label: "Item 1" },
    { value: "Item 2", label: "Item 2" }
  ]
  return (
    <div>
      <DropdownMenuLabel>{label}</DropdownMenuLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select {label}...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command>
            <CommandInput placeholder={`Search ${label}...`} />
            <CommandEmpty>No {label} found.</CommandEmpty>
            <CommandGroup>
              {/* Items */}

              {testItem.map(framework => (
                <CommandItem
                  className="flex items-center justify-between"
                  key={framework.value}
                  // onSelect={(currentValue) => {
                  //   setValue(currentValue === value ? "" : currentValue)
                  //   setOpen(false)
                  // }}
                >
                  {framework.label}
                  <Check className={cn("mr-2 h-4 w-4", "opacity-100")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
