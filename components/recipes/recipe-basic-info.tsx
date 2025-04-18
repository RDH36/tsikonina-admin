"use client"

import { Control } from "react-hook-form"
import {
  RecipeFormValues,
  recipeFormSchema,
} from "@/app/(admin)/recipes/schemas"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

interface RecipeBasicInfoProps {
  control: Control<RecipeFormValues, typeof recipeFormSchema>
}

export function RecipeBasicInfo({ control }: RecipeBasicInfoProps) {
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
        <h2 className="text-xl font-semibold flex-1">Informations de base</h2>
      </div>
      <CollapsibleContent>
        <div className="grid gap-4">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de la recette" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description courte de la recette"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temps de préparation (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulté</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez la difficulté" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Facile">Facile</SelectItem>
                      <SelectItem value="Moyen">Moyen</SelectItem>
                      <SelectItem value="Difficile">Difficile</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Populaire" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="isPremium"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 sm:p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Recette Premium</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
