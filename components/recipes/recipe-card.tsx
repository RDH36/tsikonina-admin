"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChefHat, Crown } from "lucide-react"
import { Recipe } from "@/types/recipe"
import Link from "next/link"

interface RecipeCardProps {
  recipe: Pick<
    Recipe,
    | "id"
    | "title"
    | "description"
    | "image_url"
    | "time"
    | "difficulty"
    | "is_premium"
    | "category"
  >
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg">
        <div className="relative aspect-video">
          {recipe.image_url ? (
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
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
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {recipe.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.time} min</span>
            </div>
            <Badge variant="outline">{recipe.difficulty}</Badge>
            <Badge variant="secondary">{recipe.category}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
