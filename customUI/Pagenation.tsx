import { Input } from "@/components/ui/input"
import { ChevronLeftIcon, ChevronRight } from "lucide-react"
import React, { memo } from "react"

interface PagenationProps {
  pageSettings: {
    totalItems: number
    pageLimit: number
    currentPage: number
  }

  itemRange: {
    start: number
    end: number
  }
  pageItemsChange: (event: any) => void
  nextPage: () => void
  prevPage: () => void
}

function Pagenation({
  pageSettings,
  itemRange,
  pageItemsChange,
  nextPage,
  prevPage
}: PagenationProps) {
  const pagesCount = Math.ceil(pageSettings.totalItems / pageSettings.pageLimit)

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
