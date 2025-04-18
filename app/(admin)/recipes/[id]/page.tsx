import { RecipeView } from "@/components/recipes/recipe-view"
import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"

interface RecipePageProps {
  params: Promise<{ id: string }>
}

export default async function RecipePage({ params }: RecipePageProps) {
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
      <RecipeView recipe={recipe} />
    </div>
  )
}
