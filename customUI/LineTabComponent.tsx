import { useState } from "react"
import { LineTab, Button as LineButton } from "./LineTab"
import data from "../app/data.json"
import MySearch from "./MySearch"

export default function LineTabComponent({
  setBaseData,
  setPageSettings,
  setItemRange,
  pageSettings
}: any) {
  // Search Filter
  const [filterValue, setFilterValue] = useState({
    value: "All",
    label: "All"
  })
  const [searchValue, setSearchValue] = useState("")
  // SEARCH FUNCTION
  function searchItems(searchTerm: string, data: any) {
    let key = filterValue.value
    let result
    if (filterValue.value === "All") {
      result = data.filter((item: any) =>
        Object.values(item).some(
          value =>
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    } else {
      result = data.filter(
        (item: any) =>
          item[key] &&
          item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return result
  }

  // CHANGE TAB
  function changeTab(event: React.MouseEvent<HTMLDivElement>) {
    const eventTarget = event.target as HTMLDivElement
    const value = eventTarget?.dataset?.value || ""

    if (value === "all") {
      setBaseData(data)
      setPageSettings((prev: any) => {
        return {
          ...prev,
          totalItems: data.length
        }
      })
    } else {
      setBaseData(searchItems(value, data))
      setPageSettings((prev: any) => {
        return {
          ...prev,
          totalItems: searchItems(value, data).length
        }
      })
    }

    // RESET settings

    setPageSettings((prev: any) => {
      return {
        ...prev,
        currentPage: 1
      }
    })
    setItemRange((prev: any) => {
      return {
        ...prev,
        start: 1,
        end: pageSettings.pageLimit
      }
    })
  }

  // SEARCH INPUT HANDLER
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      setBaseData(data)
    } else {
      setBaseData(searchItems(event.target.value, data))
      setPageSettings((prev: any) => {
        return { ...prev, currentPage: 1 }
      })
      setItemRange((prev: any) => {
        return {
          ...prev,
          start: 1,
          end: pageSettings.pageLimit
        }
      })
    }
    setPageSettings((prev: any) => {
      return {
        ...prev,
        totalItems: searchItems(event.target.value, data).length
      }
    })
    setSearchValue(event.target.value)
  }

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

  return (
    <div className="flex flex-col-reverse justify-center md:flex-row items-center md:justify-between gap-1 md:gap-0  ">
      <div className="w-full md:w-fit overflow-x-auto scrollbar-hide">
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
      </div>

      {/* SEARCH */}
      <MySearch
        handleSearch={handleSearch}
        filterSelect={filterSelect}
        filterValue={filterValue}
      />
    </div>
  )
}
