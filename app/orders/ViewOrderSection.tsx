import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ActionItem, ActionMenu } from "@/customUI/ActionMenu"
import ItemLabel from "@/customUI/ItemLabel"
import { MyTable, TableBody, TableHeader } from "@/customUI/MyTable"
import { renderStatus } from "@/customUtils/renderStatus"
import { Check, ChevronLeft, Microscope, Plus } from "lucide-react"
import { useState } from "react"
import data from "../data.json"
import CreateOfferModal from "./CreateOfferModal"
import OrderBreakDown from "./OrderBreakDown"
import MySearch from "@/customUI/MySearch"

interface ViewOrderProps {
  setIsViewOrder: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
  style?: {}
}

const headers = [
  { accessor: "commodity", value: "Commodity" },
  { accessor: "category", value: "Category" },
  { accessor: "product", value: "Product" },
  { accessor: "variety", value: "Variety" },
  { accessor: "volume", value: "Volume" },
  { accessor: "unit", value: "Unit" },
  { accessor: "status", value: "Status" },
  { accessor: "datecreated", value: "Date Created" },
  { accessor: "action", value: "Action" }
]

export default function ViewOrder({
  setIsViewOrder,
  className,
  style
}: ViewOrderProps) {
  const [baseData, setBaseData] = useState(data)
  const [renderData, setRenderData] = useState(data.slice(0, 5))

  const [offerModal, setOfferModal] = useState(false)
  const [breakDownModal, setBreakDownModal] = useState(false)

  return (
    <div
      className={`max-w-[50%] w-1/2 lg:p-10 pt-6 pr-4  ${className}`}
      style={style}
    >
      <div>
        {/* Back */}
        <button
          className="flex hover:-translate-y-1 transition-transform duration-150 p-2"
          onClick={() => setIsViewOrder((prev: boolean) => !prev)}
        >
          <ChevronLeft />
          Back
        </button>
        {/* order Content */}
        <div className="pl-6 pt-10 ">
          {/* Order Details */}
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold pb-2">
              Order Details
            </h1>
            <Separator />
            <div className="pt-8 flex flex-col md:flex-row  gap-4">
              {/* Details */}
              <div className="grid md:grid-cols-2 md:w-1/2 gap-2">
                <ItemLabel label="ID" value="#082361" />
                <ItemLabel label="Merchant ID" value="#082361" />
                <ItemLabel label="Order Number" value="#082361" />
                <ItemLabel label="Created By" value="#082361" />
                <ItemLabel label="Date Needed" value="#082361" />
                <ItemLabel label="Date Created" value="#082361" />
                <ItemLabel label="Date Updated" value="#082361" />
                <ItemLabel label="Status" value="#082361" />
              </div>

              {/* Remarks */}
              <div className="md:w-1/2 ">
                <div className="w-full min-h-[100%]  border border-ring p-4 rounded-md space-y-1">
                  <label className="font-semibold ">Remarks</label>
                  <p className="text-slate-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Suscipit quisquam omnis laboriosam rerum aperiam distinctio
                    dolores saepe porro totam nulla!
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Order Items */}
          <div className="pt-20">
            <h1 className="text-xl lg:text-2xl font-semibold pb-2 flex items-center gap-2">
              Order Items{" "}
              <div className="min-h-[28px] min-w-[28px] p-1 text-sm rounded-full flex items-center justify-center bg-slate-300">
                5
              </div>
            </h1>
            <Separator />
            {/* <MySearch /> */}
            <div>
              <MyTable>
                <TableHeader headers={headers} setBaseData={setBaseData} />
                <TableBody>
                  {renderData?.map((item, index) => (
                    <tr
                      className="border-b hover:shadow-inner text-xs md:text-base  cursor-pointer even:bg-accent odd:bg-white  border-l-white  border-l-2 hover:border-l-farm-green  "
                      key={index}
                    >
                      <td className="px-4">
                        <Checkbox className="bg-background border-ring w-5 h-5 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" />
                      </td>
                      <td className=" px-3 py-4  ">{item.id}</td>
                      <td className=" px-3 py-4  ">{item.order_no}</td>
                      <td className=" px-3 py-4  ">{item.merchant_id}</td>
                      <td className=" px-3 py-4  ">{item.created_by}</td>
                      <td className=" px-3 py-4  ">{item.date_needed}</td>
                      <td className=" px-3 py-4  ">{item.date_created}</td>
                      <td className=" px-3 py-4    ">
                        <div className="flex items-center gap-2 font-bold whitespace-nowrap ">
                          {renderStatus(item.status).indicator}
                          {renderStatus(item.status).label}
                          {renderStatus(item.status).icon}
                        </div>
                      </td>
                      <td className=" px-3 py-4  ">{item.date_modified}</td>
                      <td className=" px-3 py-4  ">
                        <ActionMenu>
                          <ActionItem onClick={() => {}}>
                            <Check className="h-4 w-4" />
                            Accept Order
                          </ActionItem>
                          <ActionItem
                            onClick={() => setOfferModal(prev => !prev)}
                          >
                            <Plus className="h-4 w-4" />
                            Create Offer
                          </ActionItem>
                          <ActionItem
                            onClick={() => setBreakDownModal(prev => !prev)}
                          >
                            <Microscope className="w-4 h-4" />
                            View breakDown
                          </ActionItem>
                        </ActionMenu>
                      </td>
                    </tr>
                  ))}
                </TableBody>
              </MyTable>
              {/* MODALS */}
              <CreateOfferModal
                offerModal={offerModal}
                setOfferModal={setOfferModal}
              />
              <OrderBreakDown
                offerModal={breakDownModal}
                setOfferModal={setBreakDownModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
