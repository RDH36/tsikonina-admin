"use client"

import { Control } from "react-hook-form"
import { RecipeFormValues } from "@/app/(admin)/recipes/schemas"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

interface RecipeCulturalInfoProps {
  control: Control<RecipeFormValues>
}

export function RecipeCulturalInfo({ control }: RecipeCulturalInfoProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-2 mb-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isOpen ? "" : "-rotate-90"
              }`}
            />
          </Button>
        </CollapsibleTrigger>
        <h2 className="text-xl font-semibold flex-1">
          Informations culturelles
        </h2>
      </div>
      <CollapsibleContent>
        <div className="grid gap-4">
          <FormField
            control={control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Région</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Antananarivo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="history"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Histoire</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Histoire de la recette"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="culturalContext"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contexte culturel</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Contexte culturel de la recette"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
