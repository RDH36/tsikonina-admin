import { z } from "zod"

export const recipeFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  image: z.any().optional(),
  time: z.number().min(1, "Le temps de préparation est requis"),
  difficulty: z.enum(["Facile", "Moyen", "Difficile"], {
    required_error: "La difficulté est requise",
  }),
  category: z.enum(["normal", "populaire", "decouverte"], {
    required_error: "La catégorie est requise",
  }),
  isPremium: z.boolean(),
  region: z.string().min(1, "La région est requise"),
  history: z.string().min(1, "L'historique est requis"),
  culturalContext: z.string().min(1, "Le contexte culturel est requis"),
  ingredients: z.array(z.string()).min(1, "Au moins un ingrédient est requis"),
  substitutes: z
    .array(
      z.object({
        original: z.string(),
        substitutes: z.array(z.string()),
      })
    )
    .optional(),
  instructions: z
    .array(z.string())
    .min(1, "Au moins une instruction est requise"),
})

export type RecipeFormValues = z.infer<typeof recipeFormSchema>
