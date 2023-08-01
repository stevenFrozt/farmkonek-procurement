"use client"

import { Separator } from "@/components/ui/separator"
import NavigationMenu from "@/customUI/NavigationMenu"
import TopBar from "@/customUI/TopBar"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import bannerImage from "@/public/dashboard/bannerFarmer.jpg"
import Layout from "@/customUI/Layout"

export default function dashboard() {
  return (
    <Layout>
      <div className="w-full space-y-8">
        <Banner />
        <Summary />
      </div>
    </Layout>
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
        <p className=" hyphens-auto leading-relaxed ">
          &qoute;Embrace Efficiency and Seize Opportunities with Farmkonekt
          Procurement! We seamlessly link suppliers to empower progress and
          provide you with the ultimate gateway to success. Experience elevated
          productivity and seamless sourcing, unlocking the full potential of
          your business. Welcome to a new era of procurement excellence!&qoute;
        </p>
      </div>
      {/* Image */}
      <Image
        src={bannerImage}
        placeholder="blur"
        alt="farmer"
        width={2000}
        height={2000}
        className="w-60 h-60 mx-auto"
      />
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
            sizes="800px"
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
