import { Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { RecipeList } from "@/components/recipes/recipe-list"

export default function Recipes() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Recettes</h1>
        <Link href="/recipes/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une recette
          </Button>
        </Link>
      </div>
      <RecipeList />
    </div>
  )
}
