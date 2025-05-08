import React from "react"

import { NotificationForm } from "@/components/notifications/notification-form"

export default function Notification() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Envoyer une Notification</h1>
      <NotificationForm />
    </div>
  )
}
