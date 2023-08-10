"use client"
import { LineTab, Button as LineButton } from "@/customUI/LineTab"
import MySearch from "@/customUI/MySearch"
import React, { useEffect, useState } from "react"
import data from "../data.json"
import {
  ArrowUpFromLine,
  Check,
  CheckCircle,
  ChevronsUpDown,
  Microscope,
  Plus,
  RefreshCcw,
  ShoppingBag,
  XCircle
} from "lucide-react"
import Pagenation from "@/customUI/Pagenation"
import { ActionItem, ActionMenu } from "@/customUI/ActionMenu"
import { Checkbox } from "@/components/ui/checkbox"
import Layout from "@/customUI/Layout"

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
interface DataItem {
  id: number
  order_no: string
  merchant_id: string
  created_by: string
  date_needed: string
  remarks: string | null
  status: string
  date_created: string
  date_modified: string | null
}
interface sortingType {
  key: null | keyof DataItem
  order: string
}
interface pageSettingsType {
  totalItems: number
  pageLimit: number
  currentPage: number
}
interface itemRangeType {
  start: number
  end: number
}

export default function Orders() {
  // PAGENATION SETTINGS
  const [pageSettings, setPageSettings] = useState<pageSettingsType>({
    totalItems: data.length,
    pageLimit: 5,
    currentPage: 1
  })

  // DATA
  const [baseData, setBaseData] = useState<DataItem[]>(data)
  const [renderData, setRenderData] = useState<DataItem[]>(
    baseData.slice(0, pageSettings.pageLimit)
  )

  // ITEM RANGE
  const itemRangeDefault = { start: 1, end: pageSettings.pageLimit }
  const [itemRange, setItemRange] = useState<itemRangeType>({
    start: 1,
    end: renderData.length
  })
  // SORTING SETTINGS
  const [sorting, setSorting] = useState<sortingType>({
    key: "id",
    order: "asc"
  })
  // Search Filter
  const [filterValue, setFilterValue] = React.useState({
    value: "All",
    label: "All"
  })

  const [searchValue, setSearchValue] = useState("")

  const [tableMessage, setTableMessage] = useState("No Data Available")

  // SET RENDER DATA ON LOAD and When BaseData Change
  useEffect(() => {
    // console.table(pageSettings)
    // console.table(itemRange)
    // console.log(renderData.length)
    setRenderData(baseData.slice(itemRange.start - 1, itemRange.end))
  }, [baseData, itemRange])

  function changeFilterHandler() {}

  //   RERENDER WHEN CHANGING FILTER WHEN SEARCH IS NOT EMPTY
  useEffect(() => {
    if (searchValue !== "") {
      setBaseData(searchItems(searchValue))
      setPageSettings(prev => {
        return { ...prev, currentPage: 1 }
      })
      setItemRange(prev => {
        return {
          ...prev,
          start: itemRangeDefault.start,
          end: itemRangeDefault.end
        }
      })
      setPageSettings(prev => {
        return { ...prev, totalItems: searchItems(searchValue).length }
      })
    }
  }, [filterValue])

  // CHANGING SEARCH FILTER FUNCTION
  function filterSelect(
    filter: { value: string; label: string },
    currentValue: string,
    setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    setFilterValue(
      currentValue === filterValue.label.toLocaleLowerCase()
        ? { value: "All", label: "All" }
        : filter
    )
    setFilterOpen(false)
  }
  // SORT DATA FUNCTION
  function sortData(key: keyof DataItem) {
    let order = "asc"
    if (sorting.key === key && sorting.order === "asc") {
      order = "desc"
    }
    const sortedData = [...baseData]?.sort((a, b) => {
      if (a[key]! < b[key]!) return order === "asc" ? -1 : 1
      if (a[key]! > b[key]!) return order === "asc" ? 1 : -1
      return 0
    })
    setBaseData(sortedData)
    setSorting({ key, order })
  }
  // SEARCH FUNCTION
  function searchItems(searchTerm: string) {
    let key: keyof DataItem = filterValue.value as keyof DataItem
    let result
    if (filterValue.value === "All") {
      result = data.filter(item =>
        Object.values(item).some(
          value =>
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    } else {
      result = data.filter(
        item =>
          item[key] &&
          item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (result.length === 0) {
      setTableMessage(`No results found for "${searchTerm}" `)
    }
    return result
  }
  // SEARCH INPUT HANDLER
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      setBaseData(data)
    } else {
      setBaseData(searchItems(event.target.value))
      setPageSettings(prev => {
        return { ...prev, currentPage: 1 }
      })
      setItemRange(prev => {
        return {
          ...prev,
          start: itemRangeDefault.start,
          end: itemRangeDefault.end
        }
      })
    }
    setPageSettings(prev => {
      return { ...prev, totalItems: searchItems(event.target.value).length }
    })
    setSearchValue(event.target.value)
  }
  // WHEN ITEMS PER PAGE CHANGE
  function pageItemsChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "") {
      setPageSettings(prev => {
        return {
          ...prev,
          pageLimit: 0
        }
      })
      setItemRange(prev => {
        return {
          ...prev,
          end: 0
        }
      })
    } else if (isNaN(parseInt(event.target.value))) {
      setPageSettings(prev => {
        return {
          ...prev,
          pageLimit: 0
        }
      })
    } else {
      setPageSettings(prev => {
        return {
          ...prev,
          pageLimit: parseInt(event.target.value)
        }
      })
      if (itemRange.start > parseInt(event.target.value)) {
        setItemRange(prev => {
          return {
            ...prev,
            start: 1
          }
        })
        setPageSettings(prev => {
          return {
            ...prev,
            currentPage: 1
          }
        })
      }
      setItemRange(prev => {
        return {
          ...prev,
          end: parseInt(event.target.value)
        }
      })
    }
  }
  // PAGENATION NEXT PAGE FUNCTION
  function nextPage() {
    setPageSettings((prev: pageSettingsType) => {
      return { ...prev, currentPage: prev.currentPage + 1 }
    })
    setItemRange((prev: itemRangeType) => {
      return {
        start: prev.start + pageSettings.pageLimit,
        end: prev.end + pageSettings.pageLimit
      }
    })
  }
  // PAGENATION PREVIOUS PAGE FUNCTION
  function prevPage() {
    setPageSettings((prev: pageSettingsType) => {
      return { ...prev, currentPage: prev.currentPage - 1 }
    })

    setItemRange((prev: itemRangeType) => {
      return {
        start: prev.start - pageSettings.pageLimit,
        end: prev.end - pageSettings.pageLimit
      }
    })
  }
  // RENDER STATUS
  function renderStatus(status: string) {
    const lowerCaseStatus = status.toLowerCase()
    let indicator
    let icon
    let label

    switch (lowerCaseStatus) {
      case "new":
        indicator = (
          <div className="w-3 h-3 mr-2 bg-blue-500 rounded-full ">
            <div className="w-3 h-3 animate-ping-slow bg-blue-500 rounded-full " />
          </div>
        )
        label = <p className="font-semibold text-blue-500">{status}</p>
        break
      case "submitted":
        indicator = <div className="w-3 h-3 mr-2 bg-purple-500 rounded-full" />
        icon = <ArrowUpFromLine className="w-5 h-5 text-purple-500" />
        label = <p className="font-semibold text-purple-500">{status}</p>
        break
      case "accepted":
        indicator = <div className="w-3 h-3 mr-2 bg-green-500 rounded-full" />
        icon = <CheckCircle className="w-5 h-5 text-green-500" />
        label = <p className="font-semibold text-green-500">{status}</p>
        break
      case "processing":
        indicator = <div className="w-3 h-3 mr-2 bg-yellow-500 rounded-full" />
        icon = (
          <RefreshCcw className="w-5 h-5 animate-spin-slow text-yellow-500" />
        )
        label = <p className="font-semibold text-yellow-500">{status}</p>
        break
      case "order placed":
        indicator = <div className="w-3 h-3 mr-2 bg-indigo-500 rounded-full" />
        icon = <ShoppingBag className="w-5 h-5 text-indigo-500" />
        label = <p className="font-semibold text-indigo-500">{status}</p>
        break
      case "completed":
        indicator = <div className="w-3 h-3 mr-2 bg-teal-500 rounded-full" />
        icon = <Check className="w-5 h-5 text-teal-500" />
        label = <p className="font-semibold text-teal-500">{status}</p>
        break
      case "cancelled":
        indicator = <div className="w-3 h-3 mr-2 bg-red-500 rounded-full" />
        icon = <XCircle className="w-5 h-5 text-red-500" />
        label = <p className="font-semibold text-red-500">{status}</p>
        break
      default:
        indicator = <div className="w-3 h-3 mr-2 bg-gray-400 rounded-full" />
        break
    }

    return { indicator, icon, label }
  }

  // CHANGE TAB
  function changeTab(event: React.MouseEvent<HTMLDivElement>) {
    const eventTarget = event.target as HTMLDivElement
    const value = eventTarget?.dataset?.value || ""

    if (value === "all") {
      setBaseData(data)
      setPageSettings(prev => {
        return {
          ...prev,
          totalItems: data.length
        }
      })
    } else {
      setBaseData(searchItems(value))
      setPageSettings(prev => {
        return {
          ...prev,
          totalItems: searchItems(value).length
        }
      })
    }

    setPageSettings(prev => {
      return {
        ...prev,
        currentPage: 1
      }
    })
    setItemRange(prev => {
      return {
        ...prev,
        start: itemRangeDefault.start,
        end: itemRangeDefault.end
      }
    })
  }

  return (
    <Layout>
      <div className=" shadow-sm bg-white rounded-xl min-h-[37rem] overflow-x-hidden p-6">
        <div className="flex items-center justify-between pl-2">
          <LineTab>
            <LineButton onClick={changeTab} value="all">
              All
            </LineButton>
            <LineButton onClick={changeTab} badge={2} value="new">
              New
            </LineButton>
            <LineButton onClick={changeTab} value="submitted">
              Submitted
            </LineButton>
            <LineButton onClick={changeTab} value="accepted">
              Accepted
            </LineButton>
            <LineButton onClick={changeTab} value="completed">
              Completed
            </LineButton>
          </LineTab>
          {/* SEARCH */}
          <MySearch
            handleSearch={handleSearch}
            filterSelect={filterSelect}
            filterValue={filterValue}
            className="ml-40"
          />
        </div>
        {/* TABLE */}
        <div className="max-w-full overflow-x-auto pt-10">
          <table>
            <thead>
              <tr className="border-b ">
                <td className="px-4">
                  <Checkbox className=" border-ring w-5 h-5 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" />
                </td>
                {headers.map((header, index) => (
                  <td className="py-4 " key={index}>
                    <button
                      className={`flex items-center text-farm-green font-medium gap-1 py-1 px-3 hover:bg-accent rounded-md whitespace-nowrap  ${
                        header.accessor === "remarks" ? "max-w-[320px]" : ""
                      }`}
                      onClick={() =>
                        sortData(header.accessor as keyof DataItem)
                      }
                    >
                      {header.value}
                      <ChevronsUpDown className="h-4 w-4" />
                    </button>
                  </td>
                ))}
              </tr>
            </thead>
            {/* TABLE BODY */}
            <tbody>
              {renderData?.map((item, index) => (
                <tr
                  className="border-b hover:shadow-inner  cursor-pointer even:bg-accent odd:bg-white text-sm border-l-white  border-l-2 hover:border-l-farm-green  "
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
                  <td className=" px-3 py-4    ">
                    <div className="flex items-center gap-2 font-bold whitespace-nowrap ">
                      {renderStatus(item.status).indicator}
                      {renderStatus(item.status).label}
                      {renderStatus(item.status).icon}
                    </div>
                  </td>
                  <td className=" px-3 py-4  line-clamp-2 w-80 ">
                    {item.remarks}
                  </td>

                  <td className=" px-3 py-4  ">{item.date_created}</td>
                  <td className=" px-3 py-4  ">{item.date_modified}</td>
                  <td className=" px-3 py-4  ">
                    <ActionMenu>
                      <ActionItem onClick={() => console.log("hi bro")}>
                        <Check className="h-4 w-4" />
                        Accept Order
                      </ActionItem>
                      <ActionItem onClick={() => console.log("hi bro")}>
                        <Plus className="h-4 w-4" />
                        Create Offer
                      </ActionItem>
                      <ActionItem onClick={() => console.log("hi bro")}>
                        <Microscope className="w-4 h-4" />
                        View breakDown
                      </ActionItem>
                    </ActionMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderData.length === 0 && searchValue !== "" && (
            <div className="flex items-center justify-center min-h-[10rem]">
              {tableMessage}
            </div>
          )}
        </div>

        {/* PAGENATION */}
        <Pagenation
          pageSettings={pageSettings}
          itemRange={itemRange}
          pageItemsChange={pageItemsChange}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </Layout>
  )
}
