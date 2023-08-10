import { Input } from "@/components/ui/input"
import { ChevronLeftIcon, ChevronRight } from "lucide-react"
import React, { memo, useEffect } from "react"

interface PagenationProps {
  pageSettings: {
    totalItems: number
    pageLimit: number
    currentPage: number
  }
  setPageSettings: any
  itemRange: {
    start: number
    end: number
  }
  setItemRange: any
  baseData: any
  setRenderData: any
}

function Pagenation({
  pageSettings,
  setPageSettings,
  itemRange,
  setItemRange,
  baseData,
  setRenderData
}: PagenationProps) {
  const pagesCount = Math.ceil(pageSettings.totalItems / pageSettings.pageLimit)

  useEffect(() => {
    setRenderData(baseData.slice(itemRange.start - 1, itemRange.end))
  }, [baseData, itemRange, setRenderData])

  // PAGENATION NEXT PAGE FUNCTION
  function nextPage() {
    setPageSettings((prev: any) => {
      return { ...prev, currentPage: prev.currentPage + 1 }
    })
    setItemRange((prev: any) => {
      return {
        start: prev.start + pageSettings.pageLimit,
        end: prev.end + pageSettings.pageLimit
      }
    })
  }

  // PAGENATION PREVIOUS PAGE FUNCTION
  function prevPage() {
    setPageSettings((prev: any) => {
      return { ...prev, currentPage: prev.currentPage - 1 }
    })

    setItemRange((prev: any) => {
      return {
        start: prev.start - pageSettings.pageLimit,
        end: prev.end - pageSettings.pageLimit
      }
    })
  }

  // WHEN ITEMS PER PAGE CHANGE
  function pageItemsChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "") {
      setPageSettings((prev: any) => {
        return {
          ...prev,
          pageLimit: 0
        }
      })
      setItemRange((prev: any) => {
        return {
          ...prev,
          end: 0
        }
      })
    } else if (isNaN(parseInt(event.target.value))) {
      setPageSettings((prev: any) => {
        return {
          ...prev,
          pageLimit: 0
        }
      })
    } else {
      setPageSettings((prev: any) => {
        return {
          ...prev,
          pageLimit: parseInt(event.target.value)
        }
      })
      if (itemRange.start > parseInt(event.target.value)) {
        setItemRange((prev: any) => {
          return {
            ...prev,
            start: 1
          }
        })
        setPageSettings((prev: any) => {
          return {
            ...prev,
            currentPage: 1
          }
        })
      }
      setItemRange((prev: any) => {
        return {
          ...prev,
          end: parseInt(event.target.value)
        }
      })
    }
  }

  return (
    <div className="flex items-center  py-6 justify-between text-sm ">
      {/* Items per Page 25  */}
      <div className="flex items-center gap-4 ">
        <h1 className="whitespace-nowrap">Items per Page </h1>
        <Input
          className="h-6 max-w-[6ch]"
          value={pageSettings.pageLimit}
          placeholder="5"
          onChange={(event: any) => pageItemsChange(event)}
        />
      </div>
      {/* <span className="bg-ring/50 w-[1.5px] mx-4 rounded-full h-7" /> */}

      {/* < 1 of 20 >  */}
      <div className="flex items-center gap-4 ">
        <button
          onClick={() => prevPage()}
          className={` text-white bg-green-500 rounded-md p-1 hover:scale-105 transition-all duration-150 ${
            pageSettings.currentPage! === 1
              ? "pointer-events-none bg-muted"
              : "pointer-events-auto"
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5  " />
        </button>
        <p className="cursor-default whitespace-nowrap">
          Page {pageSettings.currentPage} of{" "}
          {pagesCount === Infinity ? 0 : pagesCount}
        </p>
        <button
          onClick={() => nextPage()}
          className={`text-white flex items-center bg-green-500 rounded-md p-1 hover:scale-105 transition-all duration-150 
          ${
            pageSettings.currentPage! >= pagesCount || itemRange.end === 0
              ? "pointer-events-none bg-muted"
              : ""
          }
          `}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      {/* <span className="bg-ring/50 w-[1.5px] rounded-full h-7" /> */}

      {/* 1-25 of 500 items */}
      <div className="flex items-center">
        <h1 className="whitespace-nowrap">
          {itemRange?.start === pageSettings.totalItems
            ? itemRange.start
            : `${itemRange?.start} - ${
                itemRange?.end < pageSettings.totalItems
                  ? itemRange?.end
                  : itemRange?.end >= pageSettings.totalItems
                  ? pageSettings.totalItems
                  : !itemRange?.end
                  ? 0
                  : 0
              } `}
          {` of ${pageSettings.totalItems} items`}
        </h1>
      </div>
    </div>
  )
}

export default memo(Pagenation)
