"use client"

import { Camera, X } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { Control } from "react-hook-form"

import { RecipeFormValues } from "@/app/(admin)/recipes/schemas"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RecipeMainImageProps {
  control: Control<RecipeFormValues>
}

export function RecipeMainImage({ control }: RecipeMainImageProps) {
  const [mainImage, setMainImage] = useState<string | null>(null)

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setMainImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeMainImage = () => {
    setMainImage(null)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <div className="relative flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12">
                {mainImage ? (
                  <div className="relative aspect-video w-full max-w-2xl">
                    <Image
                      src={mainImage}
                      alt="Photo principale"
                      fill
                      className="rounded-lg object-cover"
                      onLoad={() => {
                        field.onChange(mainImage)
                      }}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -right-2 -top-2 h-8 w-8"
                      onClick={() => {
                        removeMainImage()
                        field.onChange(null)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Camera className="mb-4 h-12 w-12 text-gray-400" />
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="main-image"
                      onChange={handleMainImageChange}
                    />
                    <Label htmlFor="main-image">
                      <Button type="button" variant="outline" asChild>
                        <span>Télécharger la photo</span>
                      </Button>
                    </Label>
                  </>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
