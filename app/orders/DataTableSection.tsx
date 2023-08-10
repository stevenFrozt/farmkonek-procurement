import { ActionItem, ActionMenu } from "@/customUI/ActionMenu"
import LineTabComponent from "@/customUI/LineTabComponent"
import MyPagenation from "@/customUI/MyPagenation"
import { MyTable, TableBody, TableHeader } from "@/customUI/MyTable"
import { itemRangeType, pageSettingsType } from "@/types/types"
import { Check, List, Microscope, Plus, User2 } from "lucide-react"
import React, { useState } from "react"
import data from "../data.json"
import { renderStatus } from "@/customUtils/renderStatus"
import { Checkbox } from "@/components/ui/checkbox"

interface DataTableSectionProps {
  setIsViewOrder: any
  setTargetScroll: any
  targetDiv: any
  className?: string
  style?: {}
}

export default function DataTableSection({
  setIsViewOrder,
  setTargetScroll,
  targetDiv,
  className = "",
  style
}: DataTableSectionProps) {
  const headers = [
    { accessor: "id", value: "ID" },
    { accessor: "order_no", value: "Order No." },
    { accessor: "merchant_id", value: "Merchant ID" },
    { accessor: "created_by", value: "Created by" },
    { accessor: "date_needed", value: "Date needed" },
    { accessor: "status", value: "Status" },
    { accessor: "remarks", value: "Remarks" },
    { accessor: "date_created", value: "Date Created" },
    { accessor: "date_modified", value: "Date Modified" },
    { accessor: "Action", value: "Action" }
  ]

  // PAGENATION SETTINGS
  const [pageSettings, setPageSettings] = useState<pageSettingsType>({
    totalItems: data.length,
    pageLimit: 5,
    currentPage: 1
  })

  // ITEM RANGE
  const [itemRange, setItemRange] = useState<itemRangeType>({
    start: 1,
    end: pageSettings.pageLimit
  })

  const [baseData, setBaseData] = useState(data)
  const [renderData, setRenderData] = useState(
    data.slice(itemRange.start - 1, itemRange.end)
  )

  function RowClick() {
    setTargetScroll(targetDiv?.current?.scrollTop || 0)
    setIsViewOrder((prev: boolean) => !prev)
  }

  return (
    <div
      className={`max-w-[50%] overflow-x-hidden p-6 ${className}`}
      style={style}
    >
      <LineTabComponent
        setBaseData={setBaseData}
        setPageSettings={setPageSettings}
        setItemRange={setItemRange}
        pageSettings={pageSettings}
      />

      <MyTable>
        <TableHeader headers={headers} setBaseData={setBaseData} />
        <TableBody>
          {renderData?.map((item, index) => (
            <tr
              className="border-b hover:shadow-inner  cursor-pointer even:bg-accent odd:bg-white text-sm border-l-white  border-l-2 hover:border-l-farm-green  "
              key={index}
              onClick={RowClick}
            >
              <td className="px-4">
                <Checkbox className="bg-background border-ring w-5 h-5 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" />
              </td>
              <td className=" px-3 py-4  ">{item.id}</td>
              <td className=" px-3 py-4  ">{item.order_no}</td>
              <td className=" px-3 py-4  ">{item.merchant_id}</td>
              <td className=" px-3 py-4  ">{item.created_by}</td>
              <td className=" px-3 py-4  ">{item.date_needed}</td>
              <td className=" px-3 py-4    ">
                <div className="flex items-center gap-2 font-bold whitespace-nowrap ">
                  {renderStatus(item.status).indicator}
                  {renderStatus(item.status).label}
                  {renderStatus(item.status).icon}
                </div>
              </td>
              <td className=" px-3 py-4  line-clamp-2 w-80 ">{item.remarks}</td>
              <td className=" px-3 py-4  ">{item.date_created}</td>
              <td className=" px-3 py-4  ">{item.date_modified}</td>
              <td className=" px-3 py-4  ">
                <ActionMenu>
                  <ActionItem onClick={() => {}}>
                    <List className="h-4 w-4" />
                    View Order Details
                  </ActionItem>
                  <ActionItem onClick={() => console.log("hi bro")}>
                    <User2 className="h-4 w-4" />
                    View Merchant
                  </ActionItem>
                </ActionMenu>
              </td>
            </tr>
          ))}
        </TableBody>
      </MyTable>
      <MyPagenation
        pageSettings={pageSettings}
        setPageSettings={setPageSettings}
        itemRange={itemRange}
        setItemRange={setItemRange}
        setRenderData={setRenderData}
        baseData={baseData}
      />
    </div>
  )
}
