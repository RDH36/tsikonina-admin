"use client"

import { Control, useFieldArray } from "react-hook-form"
import { RecipeFormValues } from "@/app/(admin)/recipes/schemas"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, ChevronDown } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

interface RecipeInstructionsProps {
  control: Control<RecipeFormValues>
}

export function RecipeInstructions({ control }: RecipeInstructionsProps) {
  const [isOpen, setIsOpen] = useState(true)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "instructions",
  })

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
        <h2 className="text-xl font-semibold flex-1">Instructions</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append("")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une étape
        </Button>
      </div>
      <CollapsibleContent>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4">
              <FormField
                control={control}
                name={`instructions.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Étape {index + 1}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`Décrivez l'étape ${index + 1}`}
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-8"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
