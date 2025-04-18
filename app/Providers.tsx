"use client"

import { AppProgressBar as ProgressBar } from "next-nprogress-bar"

import React from "react"
import { Toaster } from "sonner"

export default function Providers(props: React.PropsWithChildren) {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#ff9800"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Toaster />
      {props.children}
    </>
  )
}
