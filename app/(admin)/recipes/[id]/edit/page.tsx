import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import { RecipeForm } from "@/components/recipes/recipe-form"

interface EditRecipePageProps {
  params: Promise<{ id: string }>
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const supabase = await createClient()
  const { id } = await params
  const { data: recipe } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single()

  if (!recipe) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6">
      <RecipeForm initialData={recipe} />
    </div>
  )
}
