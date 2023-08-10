import React, { useState } from "react"
import { ChevronsUpDown } from "lucide-react"
import { sortData } from "@/customUtils/sortData"
import data from "../app/data.json"
import { DataItem } from "@/types/types"
import { Checkbox } from "@/components/ui/checkbox"

export function MyTable({ children }: any) {
  return (
    <>
      <div className="max-w-full overflow-auto pt-10 bg-white">
        <table>{children}</table>
        {/* {renderData.length === 0 && searchValue !== "" && (
          <div className="flex items-center justify-center min-h-[10rem]">
            {tableMessage}
          </div>
        )} */}
      </div>
    </>
  )
}

export function TableHeader({ headers, setBaseData }: any) {
  // SORT SETTINGS
  const [sorting, setSorting] = useState<{
    key: keyof (typeof data)[0]
    order: "asc" | "desc"
  }>({
    key: "id",
    order: "asc"
  })
  return (
    <>
      <thead>
        <tr className="border-b ">
          <td className="px-4">
            <Checkbox className=" border-ring w-5 h-5 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" />
          </td>
          {headers.map((header: any, index: any) => (
            <td className="py-4 " key={index}>
              <button
                className={`flex items-center text-farm-green font-medium gap-1 py-1 px-3 hover:bg-accent rounded-md whitespace-nowrap  ${
                  header.accessor === "remarks" ? "max-w-[320px]" : ""
                }`}
                onClick={() =>
                  setBaseData(
                    sortData(
                      data,
                      header.accessor as keyof DataItem,
                      setSorting,
                      sorting
                    )
                  )
                }
              >
                {header.value}
                <ChevronsUpDown className="h-4 w-4" />
              </button>
            </td>
          ))}
        </tr>
      </thead>
    </>
  )
}

export function TableBody({ children }: any) {
  return (
    <>
      <tbody>{children}</tbody>
    </>
  )
}
