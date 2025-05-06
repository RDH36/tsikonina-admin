"use client"

import React from "react"
import { sendNotifications } from "./actions/sendNotify"
import { Button } from "@/components/ui/button"

export default function Notification() {
  const handleClick = async () => {
    const res = await sendNotifications({
      title: "Hello Raymond 💬",
      body: "Un nouveau webtoon t’attend...",
      data: { route: "/webtoon" },
    })
    console.log("Résultat des envois :", res)
  }

  return (
    <div>
      <h2>Notification</h2>
      <Button
        onClick={() => {
          handleClick()
        }}
        className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
      >
        Envoyer une notification ✨
      </Button>
    </div>
  )
}
