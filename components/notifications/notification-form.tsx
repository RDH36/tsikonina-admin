"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FieldValues } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Loader2, SmilePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"
import { EmojiPicker } from "./emoji-picker"
import { sendNotifications } from "@/app/(admin)/notification/actions/sendNotify"

const notificationFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Le titre doit contenir au moins 3 caractères" })
    .max(50, { message: "Le titre ne peut pas dépasser 50 caractères" }),
  message: z
    .string()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" })
    .max(500, { message: "Le message ne peut pas dépasser 500 caractères" }),
})

type NotificationFormValues = z.infer<typeof notificationFormSchema>

export function NotificationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  })

  async function onSubmit(data: NotificationFormValues) {
    setIsSubmitting(true)

    try {
      await sendNotifications({
        title: data.title,
        body: data.message,
      })

      toast("Notification envoyée")

      form.reset()
    } catch (error) {
      toast(
        `Une erreur est survenue lors de l'envoi de la notification. ${error}`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function insertEmoji(field: FieldValues, emoji: string) {
    const input = document.getElementById(field.name) as
      | HTMLInputElement
      | HTMLTextAreaElement
    if (input) {
      const start = input.selectionStart || 0
      const end = input.selectionEnd || 0
      const newValue =
        field.value.substring(0, start) + emoji + field.value.substring(end)
      field.onChange(newValue)

      setTimeout(() => {
        input.focus()
        input.setSelectionRange(start + emoji.length, start + emoji.length)
      }, 0)
    } else {
      field.onChange(field.value + emoji)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input
                    id="title"
                    placeholder="Titre de la notification"
                    {...field}
                  />
                </FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" type="button">
                      <SmilePlus className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-2">
                    <EmojiPicker
                      onEmojiSelect={(emoji) => insertEmoji(field, emoji)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <FormDescription>
                Le titre qui apparaîtra dans la notification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <div className="flex items-start gap-2">
                <FormControl>
                  <Textarea
                    id="message"
                    placeholder="Contenu de la notification"
                    className="resize-none min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" type="button">
                      <SmilePlus className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-2">
                    <EmojiPicker
                      onEmojiSelect={(emoji) => insertEmoji(field, emoji)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <FormDescription>
                Le contenu détaillé de votre notification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            "Envoyer la notification"
          )}
        </Button>
      </form>
    </Form>
  )
}
