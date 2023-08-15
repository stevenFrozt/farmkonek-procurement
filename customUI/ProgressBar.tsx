"use client"

import React from "react"
import { AppProgressBar } from "next-nprogress-bar"

export default function ProgressBar() {
  return (
    <>
      <AppProgressBar
        height="4px"
        color="#147A41"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}
