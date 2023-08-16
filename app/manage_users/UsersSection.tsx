import { ActionItem, ActionMenu } from "@/customUI/ActionMenu"
import MyPagenation from "@/customUI/MyPagenation"
import { MyTable, TableBody, TableHeader } from "@/customUI/MyTable"
import { itemRangeType, pageSettingsType } from "@/types/types"
import { User, UserCircle, UserCog } from "lucide-react"
import React, { useState } from "react"
import data from "../data.json"
import { renderStatus } from "@/customUtils/renderStatus"
import { Checkbox } from "@/components/ui/checkbox"
import LineTabComponent from "./LineTabComponent"

interface UsersTableSectionProps {
  className?: string
  style?: {}
}

export default function UsersTableSection({
  className = "",
  style
}: UsersTableSectionProps) {
  const headers = [
    { accessor: "merchant_id", value: "Merchant ID" },
    { accessor: "name", value: "Name" },
    { accessor: "role", value: "Role" },
    { accessor: "contact_no", value: "Contact No." },
    { accessor: "owner", value: "Owner" },
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

  function RowClick() {}

  return (
    <div
      className={`max-w-[100%] overflow-x-auto  lg:p-6 lg:pt-0 px-6   ${className}`}
      style={style}
    >
      <MyTable>
        <TableHeader headers={headers} setBaseData={setBaseData} />
        <TableBody>
          {renderData?.map((item, index) => (
            <tr
              className={` border-b hover:shadow-inner cursor-pointer even:bg-accent odd:bg-white text-xs md:text-sm border-x-white  border-x-2  hover:border-x-farm-green ${
                item.status === "Completed" ? "text-gray-300" : ""
              } `}
              key={index}
            >
              <td className="px-4">
                <Checkbox className=" bg-background border-ring w-5 h-5 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" />
              </td>
              <td className=" px-3 py-4" onClick={RowClick}>
                {item.merchant_id}
              </td>
              <td className=" px-3 py-4" onClick={RowClick}>
                {item.created_by}
              </td>
              <td className=" px-3 py-4" onClick={RowClick}>
                {item.date_needed}
              </td>
              <td className=" px-3 py-4" onClick={RowClick}>
                <div className="flex items-center gap-2 font-bold whitespace-nowrap  ">
                  {renderStatus(item.status).indicator}
                  {renderStatus(item.status).label}
                  {renderStatus(item.status).icon}
                </div>
              </td>
              <td className=" px-3 py-4" onClick={RowClick}>
                {item.created_by}
              </td>
              <td className=" px-3 py-4  ">
                <ActionMenu>
                  <ActionItem onClick={() => {}}>
                    <User className="h-4 w-4" />
                    View User
                  </ActionItem>
                  <ActionItem onClick={() => console.log("hi bro")}>
                    <UserCircle className="h-4 w-4" />
                    View Merchant
                  </ActionItem>
                  <ActionItem onClick={() => console.log("hi bro")}>
                    <UserCog className="h-4 w-4" />
                    Assign User
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
