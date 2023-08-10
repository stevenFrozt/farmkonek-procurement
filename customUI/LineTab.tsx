"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CheckActive {
  activeIndex?: number
  sliderPositionX?: number
  buttonWidth?: number
  sliderStyle?: string
}

interface LineTabProps {
  children: React.ReactNode | any
  className?: string
  sliderStyle?: string
}

function LineTab({
  children,
  className = "",
  sliderStyle = "bg-green-500"
}: LineTabProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [checkActive, setCheckActive] = useState<CheckActive>({
    activeIndex: 0,
    sliderPositionX: 0,
    buttonWidth: 0,
    sliderStyle: ""
  })

  // Get child 1 attributes on Load
  useEffect(() => {
    setCheckActive(prev => ({
      ...prev,
      activeIndex: 0,
      sliderPositionX: 0,
      buttonWidth: (containerRef?.current?.children[0] as HTMLDivElement)
        ?.offsetWidth
    }))
  }, [containerRef])

  return (
    <div className="md:max-w-fit w-full overflow-x-auto scrollbar-hide">
      <div className={`flex gap-2 ${className}}`} ref={containerRef}>
        {/* Buttons Children */}
        {React.Children.map(children, (Button, index) => {
          // Clone the Button element and add the index, checkActive, setCheckActive, containerRef prop
          return React.cloneElement(Button, {
            index,
            checkActive,
            setCheckActive,
            containerRef
          })
        })}
      </div>
      {/* line & moving Line */}
      <div className="border-b-[1px]">
        <motion.div
          className={`w-0 h-[2px]   rounded-full ${sliderStyle} ${checkActive?.sliderStyle}`}
          animate={{
            x: checkActive?.sliderPositionX,
            width: checkActive?.buttonWidth
          }}
        />
      </div>
    </div>
  )
}

interface ButtonProps {
  children?: React.ReactNode
  index?: number
  checkActive?: CheckActive | any
  setCheckActive?: React.Dispatch<React.SetStateAction<CheckActive>> | any
  containerRef?: React.RefObject<HTMLDivElement>
  onClick?: any
  className?: string
  activeColor?: string
  sliderStyle?: string
  badge?: number
  value?: string
}

interface CustomMouseEvent
  extends React.MouseEvent<HTMLButtonElement, MouseEvent> {
  index: number
}

function Button({
  children,
  index,
  checkActive,
  setCheckActive,
  containerRef,
  onClick,
  className = "",
  activeColor = "text-green-500",
  sliderStyle = "",
  badge,
  value = ""
}: ButtonProps) {
  function click(event: CustomMouseEvent) {
    event.index = index || 0
    setCheckActive({
      activeIndex: index,
      sliderPositionX: positionX(
        containerRef?.current?.offsetLeft || 0,
        event.currentTarget.offsetLeft
      ),
      buttonWidth: event.currentTarget.offsetWidth,
      sliderStyle: sliderStyle
    })
    onClick && onClick(event)
  }

  return (
    <button
      data-value={value}
      data-index={index}
      onClick={(e: CustomMouseEvent) => click(e)}
      className={`p-2 relative whitespace-nowrap ${
        checkActive.activeIndex === index ? `${activeColor}` : "text-ring"
      }  ${className}`}
      disabled={checkActive.activeIndex === index ? true : false}
    >
      {badge ? (
        <div className="min-w-[1rem] min-h-[1rem] px-1 text-xs flex items-center justify-center rounded-full bg-red-500 text-white animate-pulse absolute -right-[4px] top-[2px]">
          {badge.toLocaleString()}
        </div>
      ) : (
        ""
      )}

      {children}
    </button>
  )
}

function positionX(parent: number, child: number) {
  return child - parent
}

export { LineTab, Button }
