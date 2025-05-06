"use server"

import { supabase } from "@/lib/supabase"
import { Expo, ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk"

const expo = new Expo()

export async function sendNotifications({
  title,
  body,
  data,
}: {
  title: string
  body: string
  data?: Record<string, string>
}) {
  const { data: tokens, error } = await supabase
    .from("expo_push_tokens")
    .select("expoPushToken")

  if (error) {
    console.error("Erreur Supabase :", error)
    throw new Error("Impossible de récupérer les tokens")
  }

  const messages: ExpoPushMessage[] = tokens
    .filter(({ expoPushToken }) => Expo.isExpoPushToken(expoPushToken))
    .map(({ expoPushToken }) => ({
      to: expoPushToken,
      sound: "default",
      title,
      body,
      data,
    }))

  const chunks = expo.chunkPushNotifications(messages)
  const tickets: ExpoPushTicket[] = []

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
      tickets.push(...ticketChunk)
    } catch (err) {
      console.error("Erreur d’envoi des notifications :", err)
    }
  }

  return { success: true, tickets }
}
