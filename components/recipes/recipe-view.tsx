"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Clock, ChefHat, Crown, Loader2 } from "lucide-react"
import { Recipe } from "@/types/recipe"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface RecipeViewProps {
  recipe: Recipe
}

export function RecipeView({ recipe }: RecipeViewProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      if (recipe.image_url) {
        try {
          const fileName = recipe.image_url.split("/").pop()
          if (fileName) {
            console.log("Tentative de suppression de l'image:", fileName)

            const { error: storageError } = await supabase.storage
              .from("recipes")
              .remove([`recipes/${fileName}`])

            if (storageError) {
              console.error(
                "Erreur lors de la suppression de l'image:",
                storageError
              )
              toast.error("Erreur lors de la suppression de l'image")
              setIsDeleting(false)
              return
            }

            console.log("Image supprimée avec succès")
          }
        } catch (error) {
          console.error("Erreur lors de la suppression de l'image:", error)
          // On continue même si la suppression de l'image échoue
        }
      }

      const { error: deleteError } = await supabase
        .from("recipes")
        .delete()
        .eq("id", recipe.id)

      if (deleteError) {
        throw deleteError
      }

      toast.success("Recette supprimée avec succès")
      router.push("/recipes")
      router.refresh()
    } catch (error) {
      console.error("Erreur lors de la suppression de la recette:", error)
      toast.error(
        "Une erreur est survenue lors de la suppression de la recette"
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        <div className="flex gap-2">
          <Link href={`/recipes/${recipe.id}/edit`}>
            <Button variant="outline" size="sm" disabled={isDeleting}>
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={isDeleting}>
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. La recette et son image seront
                  définitivement supprimées.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Annuler
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Suppression...
                    </>
                  ) : (
                    "Supprimer"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
        {recipe.image_url ? (
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <ChefHat className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        {recipe.is_premium && (
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className="gap-1 bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Crown className="h-3 w-3" />
              Premium
            </Badge>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{recipe.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Informations</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{recipe.time} minutes</span>
              </div>
              <div>
                <Badge variant="outline">{recipe.difficulty}</Badge>
              </div>
              <div>
                <Badge variant="secondary">{recipe.category}</Badge>
              </div>
              <div>
                <Badge variant="secondary">{recipe.region}</Badge>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Contexte culturel</h2>
            <p className="text-muted-foreground">{recipe.cultural_context}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Historique</h2>
            <p className="text-muted-foreground">{recipe.history}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Ingrédients</h2>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {recipe.substitutes && recipe.substitutes.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Substituts</h2>
              <div className="space-y-2">
                {recipe.substitutes.map((substitute, index) => (
                  <div key={index}>
                    <p className="font-medium">{substitute.original}</p>
                    <ul className="list-disc list-inside ml-4">
                      {substitute.substitutes.map((sub, i) => (
                        <li key={i}>{sub}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
