"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useState } from "react"

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
import { createClient } from "@/utils/supabase/client"
import { Recipe } from "@/types/recipe"

interface RecipeFormProps {
  initialData?: Recipe
}

export function RecipeForm({ initialData }: RecipeFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: initialData
      ? {
          id: initialData.id,
          title: initialData.title,
          description: initialData.description,
          difficulty: initialData.difficulty,
          time: initialData.time,
          image: null,
          category: initialData.category,
          isPremium: initialData.is_premium,
          region: initialData.region,
          history: initialData.history,
          culturalContext: initialData.cultural_context,
          ingredients: initialData.ingredients,
          substitutes: initialData.substitutes || [],
          instructions: initialData.instructions,
        }
      : {
          title: "",
          description: "",
          time: 0,
          difficulty: "Facile",
          category: "normal",
          isPremium: false,
          region: "",
          history: "",
          culturalContext: "",
          ingredients: [],
          substitutes: [],
          instructions: [],
        },
  })

  const onSubmit = async (data: RecipeFormValues) => {
    try {
      setIsLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast.error("Vous devez être connecté pour créer une recette")
        return
      }

      // Gestion de l'image
      let imageUrl = initialData?.image_url || null
      if (data.image instanceof File) {
        const file = data.image
        const fileExt = file.type.split("/")[1] || "jpg"
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `recipes/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from("recipes")
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage.from("recipes").getPublicUrl(filePath)

        imageUrl = publicUrl
      }

      if (initialData) {
        // Mise à jour de la recette
        const { error } = await supabase
          .from("recipes")
          .update({
            title: data.title,
            description: data.description,
            image_url: imageUrl,
            time: data.time,
            difficulty: data.difficulty,
            category: data.category,
            is_premium: data.isPremium,
            region: data.region,
            history: data.history,
            cultural_context: data.culturalContext,
            ingredients: data.ingredients,
            substitutes: data.substitutes,
            instructions: data.instructions,
          })
          .eq("id", initialData.id)

        if (error) throw error
        toast.success("Recette mise à jour avec succès")
      } else {
        // Création d'une nouvelle recette
        const { error } = await supabase.from("recipes").insert({
          title: data.title,
          description: data.description,
          image_url: imageUrl,
          time: data.time,
          difficulty: data.difficulty,
          category: data.category,
          is_premium: data.isPremium,
          region: data.region,
          history: data.history,
          cultural_context: data.culturalContext,
          ingredients: data.ingredients,
          substitutes: data.substitutes,
          instructions: data.instructions,
          user_id: user.id,
        })

        if (error) throw error
        toast.success("Recette créée avec succès")
      }

      router.push("/recipes")
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la recette:", error)
      toast.error("Une erreur est survenue lors de la sauvegarde de la recette")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <div className="sticky top-0 z-10 bg-background py-3 border-b">
          <div className="flex items-center justify-between max-w-[1200px] mx-auto px-4 sm:px-6">
            <h1 className="text-xl sm:text-3xl font-bold">
              {initialData ? "Modifier la recette" : "Ajouter une recette"}
            </h1>
            <div>
              <Button
                type="submit"
                size="sm"
                className="cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  "Enregistrer"
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto p-4 sm:px-6 space-y-6 pb-20">
          <RecipeMainImage
            control={form.control}
            isLoading={isLoading}
            initialImage={initialData?.image_url}
          />
          <RecipeBasicInfo control={form.control} />
          <RecipeCulturalInfo control={form.control} />
          <RecipeIngredients control={form.control} />
          <RecipeInstructions control={form.control} />
        </div>
      </form>
    </Form>
  )
}
