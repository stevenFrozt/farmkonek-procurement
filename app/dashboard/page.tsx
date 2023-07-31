"use client"

import { Separator } from "@/components/ui/separator"
import NavigationMenu from "@/customUI/NavigationMenu"
import TopBar from "@/customUI/TopBar"
import Image from "next/image"
import React, { useEffect, useState } from "react"

export default function dashboard() {
  return (
    <div className="flex w-full min-h-screen bg-[#F4F5F6]">
      <div className="w-[25%] h-1"></div>
      <NavigationMenu />
      {/* Content */}
      <div className="w-full px-8 py-4 space-y-8">
        <TopBar />
        <Banner />
        <Summary />
      </div>
    </div>
  )
}

function Banner() {
  return (
    <div className="px-20  shadow-sm bg-white rounded-xl w-full flex items-center justify-center">
      <div className="space-y-4 w-1/2 py-10 ">
        <h1 className="text-2xl tracking-wide uppercase">
          Welcome Back,
          <span className="px-2 font-medium text-farm-yellow">John!</span>
        </h1>
        <Separator />
        <p className="text-justify leading-relaxed ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, eius.
          Illo ratione, eius architecto explicabo beatae non, amet at doloremque
          hic commodi perspiciatis. Dolorem ipsum, ullam reprehenderit aperiam,
          consequatur inventore neque autem dolor eos dolorum, animi quis
          sapiente numquam totam?
        </p>
      </div>
      {/* Image */}
      <div className="w-60 h-60 relative mx-auto">
        <Image
          src={"/dashboard/bannerFarmer.jpg"}
          alt="farmer"
          fill
          className="object-cover absolute"
        />
      </div>
    </div>
  )
}

function Summary() {
  return (
    <div className="flex items-stretch justify-between ">
      {/* ORDERS */}
      <CardSummary image="/dashboard/order.jpg" number={105} title="orders" />
      {/* Merchants */}
      <CardSummary
        image="/dashboard/merchant.jpg"
        number={105_555_150}
        title="merchants"
      />
      {/* USERS */}
      <CardSummary
        image="/dashboard/users copy.jpg"
        number={105}
        title="users"
      />
      {/* Products */}
      <CardSummary
        image="/dashboard/products.jpg"
        number={105}
        title="products"
      />
    </div>
  )
}

interface CardSummaryProps {
  image: string
  number: number
  title: string
}
function CardSummary({ image, number, title }: CardSummaryProps) {
  const [size, setSize] = useState(45)

  useEffect(() => {
    function DynamicFontSize() {
      const length = number?.toString().length

      if (length < 7) {
        setSize(45)
      } else if (length <= 9 && length >= 7) {
        setSize(35)
      } else if (length >= 12) {
        setSize(25)
      } else {
        setSize(45)
      }
    }
    DynamicFontSize()
  }, [number])

  return (
    <div className="flex flex-col  items-center justify-center p-4 rounded-xl shadow-sm w-[22%]   bg-white overflow-hidden">
      <div className="flex flex-col items-center justify-between  font-semibold text-farm-brown">
        {/* IMAGE */}
        <div className="relative w-52 h-36">
          <Image
            src={image}
            alt="farmer"
            fill
            className="object-contain absolute"
          />
        </div>
        {/* NUMBER */}
        <h1 className={`text-farm-green  `} style={{ fontSize: `${size}px` }}>
          {number.toLocaleString()}
        </h1>
        {/* TITLE */}
        <h3 className="uppercase">{title}</h3>
      </div>
    </div>
  )
}
