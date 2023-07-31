import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CommandGroup } from "cmdk"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import React, { memo, useState } from "react"

const filters = [
  { value: "id", label: "ID" },
  { value: "order_no", label: "Order No." },
  { value: "merchant_id", label: "Merchant ID" },
  { value: "created_by", label: "Created By" },
  { value: "date_needed", label: "Date needed" },
  { value: "remarks", label: "Remarks" },
  { value: "status", label: "Status" },
  { value: "date_created", label: "Date Created" },
  { value: "date_modified", label: "Date Modified" }
]
interface MySearchProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  filterSelect: (
    filter: { value: string; label: string },
    currentValue: string,
    setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => void
  filterValue: { value: string; label: string }
  className?: string
}

function MySearch({
  handleSearch,
  filterSelect,
  filterValue,
  className
}: MySearchProps) {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <label
      htmlFor="search"
      className={`my-4 p-1 pr-2 flex items-center  h-10 max-w-[30%] rounded-md border border-input bg-background  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Popover open={filterOpen} onOpenChange={setFilterOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center p-2  hover:text-green-500   whitespace-nowrap">
            {filterValue.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Filter" />
            <CommandGroup>
              {filters.map(filter => (
                <CommandItem
                  key={filter.value}
                  onSelect={currentValue =>
                    filterSelect(filter, currentValue, setFilterOpen)
                  }
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      filterValue.value === filter.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {filter.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandEmpty>No framework found.</CommandEmpty>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-ring">|</p>

      <input
        onChange={handleSearch}
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        className=" p-2 rounded-md border-none outline-none w-full "
      />
      <div className="w-fit text-ring relative ">
        <Search className=" h-[18px] w-[18px] " />
      </div>
    </label>
  )
}

export default memo(MySearch)
