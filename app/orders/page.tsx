"use client"
import Layout from "@/customUI/Layout"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import DataTableSection from "./DataTableSection"
import ViewOrder from "./ViewOrderSection"

export default function Page() {
  // SWITCHING TO ORDER DETAILS BACK TO DataTableSection
  const [isViewOrder, setIsViewOrder] = useState(false)
  // Scroll Container
  const targetDiv = useRef<HTMLDivElement>(null)
  const [targetScroll, setTargetScroll] = useState(0)

  // Returning to previous Scroll value
  useEffect(() => {
    if (isViewOrder && targetDiv.current != null) {
      targetDiv.current.scrollTop = 0
    } else if (!isViewOrder && targetDiv.current != null) {
      targetDiv.current.scrollTop = targetScroll || 0
    }
  }, [isViewOrder, targetScroll])

  return (
    <Layout target={targetDiv}>
      <div
        className={` shadow-sm bg-white rounded-xl min-h-[37rem] overflow-x-hidden ${
          isViewOrder ? " overflow-hidden" : ""
        } `}
      >
        {/* Container */}
        <motion.div
          animate={{
            x: isViewOrder ? "-50%" : "0%"
          }}
          transition={{ duration: 0.2, type: "tween" }}
          className="w-[calc(100%*2)] flex overflow-y-hidden"
        >
          {/* Transactions */}
          <DataTableSection
            setIsViewOrder={setIsViewOrder}
            setTargetScroll={setTargetScroll}
            targetDiv={targetDiv}
            style={isViewOrder ? { height: 0 } : {}}
          />
          {/* View Order  */}
          <ViewOrder
            setIsViewOrder={setIsViewOrder}
            style={!isViewOrder ? { height: 0 } : {}}
          />
        </motion.div>
      </div>
    </Layout>
  )
}
