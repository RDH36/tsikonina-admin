"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  RecipeFormValues,
  recipeFormSchema,
} from "@/app/(admin)/recipes/schemas"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { RecipeBasicInfo } from "./recipe-basic-info"
import { RecipeIngredients } from "./recipe-ingredients"
import { RecipeMainImage } from "./recipe-main-image"
import { RecipeCulturalInfo } from "./recipe-cultural-info"
import { RecipeInstructions } from "./recipe-instructions"

export function RecipeForm() {
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: undefined,
      time: 30,
      image: null,
      category: "",
      isPremium: false,
      region: "",
      history: "",
      culturalContext: "",
      ingredients: [""],
      substitutes: [],
      instructions: [""],
    },
  })

  const onSubmit = (data: RecipeFormValues) => {
    console.log(data)
    // Ici vous pouvez envoyer les données à votre API
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <div className="sticky top-0 z-10 bg-background py-3 border-b">
          <div className="flex items-center justify-between max-w-[1200px] mx-auto px-4 sm:px-6">
            <h1 className="text-xl sm:text-3xl font-bold">
              Ajouter une recette
            </h1>
            <div>
              <Button type="submit" size="sm" className="cursor-pointer">
                Enregistrer
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto p-4 sm:px-6 space-y-6 pb-20">
          <RecipeMainImage control={form.control} />
          <RecipeBasicInfo control={form.control} />
          <RecipeCulturalInfo control={form.control} />
          <RecipeIngredients control={form.control} />
          <RecipeInstructions control={form.control} />
        </div>
      </form>
    </Form>
  )
}
