"use client"

import { Camera, X } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useRef, useState } from "react"
import { Control } from "react-hook-form"

import { RecipeFormValues } from "@/app/(admin)/recipes/schemas"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RecipeMainImageProps {
  control: Control<RecipeFormValues>
  isLoading?: boolean
  initialImage?: string | null
}

export function RecipeMainImage({
  control,
  isLoading = false,
  initialImage = null,
}: RecipeMainImageProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleMainImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onChange(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeMainImage = (onChange: (file: File | null) => void) => {
    setPreview(null)
    onChange(null)
  }

  const handleImageAreaClick = () => {
    if (!isLoading && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <FormField
          control={control}
          name="image"
          render={({ field: { onChange } }) => (
            <FormItem>
              <Label>Image principale</Label>
              <div className="mt-2">
                <div
                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                  onClick={handleImageAreaClick}
                >
                  {preview ? (
                    <>
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeMainImage(onChange)
                        }}
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="w-full h-full bg-muted flex flex-col items-center justify-center gap-2">
                      <Camera className="h-12 w-12 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Cliquez pour ajouter une image
                      </span>
                    </div>
                  )}
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleMainImageChange(e, onChange)}
                  disabled={isLoading}
                  value=""
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
