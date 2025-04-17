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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, ChevronDown } from "lucide-react"
import { useFieldArray } from "react-hook-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

interface RecipeIngredientsProps {
  control: Control<RecipeFormValues>
}

interface SubstituteFieldProps {
  control: Control<RecipeFormValues>
  index: number
  onRemove: () => void
}

function SubstituteField({ control, index, onRemove }: SubstituteFieldProps) {
  const [isOpen, setIsOpen] = useState(true)
  const {
    fields: subFields,
    append: appendSub,
    remove: removeSub,
  } = useFieldArray({
    control,
    name: `substitutes.${index}.substitutes`,
  })

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex gap-2 sm:gap-4">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isOpen ? "" : "-rotate-90"
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <FormField
              control={control}
              name={`substitutes.${index}.original`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-sm">
                    Ingrédient à remplacer {index + 1}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Bœuf" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <CollapsibleContent>
            <div className="space-y-4">
              {subFields.map((subField, subIndex) => (
                <div key={subField.id} className="flex gap-2 sm:gap-4">
                  <FormField
                    control={control}
                    name={`substitutes.${index}.substitutes.${subIndex}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm">
                          Substitut {subIndex + 1}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Poulet" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-8 h-8 w-8"
                    onClick={() => removeSub(subIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => appendSub("")}
              >
                <Plus className="mr-2 h-3 w-3" />
                Ajouter un substitut
              </Button>
            </div>
          </CollapsibleContent>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="mt-8 h-8 w-8"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Collapsible>
  )
}

export function RecipeIngredients({ control }: RecipeIngredientsProps) {
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(true)
  const [isSubstitutesOpen, setIsSubstitutesOpen] = useState(true)

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  })

  const {
    fields: substituteFields,
    append: appendSubstitute,
    remove: removeSubstitute,
  } = useFieldArray({
    control,
    name: "substitutes",
  })

  return (
    <div className="space-y-6 sm:space-y-8">
      <Collapsible open={isIngredientsOpen} onOpenChange={setIsIngredientsOpen}>
        <div className="flex items-center gap-2 mb-4">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isIngredientsOpen ? "" : "-rotate-90"
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <h2 className="text-lg sm:text-xl font-semibold flex-1">
            Ingrédients
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => append("")}
          >
            <Plus className="mr-2 h-3 w-3" />
            Ajouter
          </Button>
        </div>
        <CollapsibleContent>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 sm:gap-4">
                <FormField
                  control={control}
                  name={`ingredients.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm">
                        Ingrédient {index + 1}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: 500g de bœuf, coupé en cubes"
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
                  className="mt-8 h-8 w-8"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={isSubstitutesOpen} onOpenChange={setIsSubstitutesOpen}>
        <div className="flex items-center gap-2 mb-4">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isSubstitutesOpen ? "" : "-rotate-90"
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <h2 className="text-lg sm:text-xl font-semibold flex-1">
            Ingrédients de substitution
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() =>
              appendSubstitute({ original: "", substitutes: [""] })
            }
          >
            <Plus className="mr-2 h-3 w-3" />
            Ajouter
          </Button>
        </div>
        <CollapsibleContent>
          <div className="space-y-4">
            {substituteFields.map((field, index) => (
              <SubstituteField
                key={field.id}
                control={control}
                index={index}
                onRemove={() => removeSubstitute(index)}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
