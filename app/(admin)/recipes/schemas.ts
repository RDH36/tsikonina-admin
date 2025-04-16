import { z } from "zod";

export const recipeFormSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  difficulty: z.enum(["facile", "moyen", "difficile"], {
    required_error: "La difficulté est requise",
  }),
  cookingTime: z.number().min(1).max(60),
  mainImage: z.string().nullable(),
  tags: z.array(z.string()).min(1, "Au moins un tag est requis"),
  ingredients: z
    .array(
      z.object({
        quantity: z.string().min(1, "La quantité est requise"),
        name: z.string().min(1, "Le nom de l'ingrédient est requis"),
      })
    )
    .min(1, "Au moins un ingrédient est requis"),
  steps: z
    .array(
      z.object({
        description: z.string().min(1, "La description de l'étape est requise"),
        image: z.string().nullable(),
      })
    )
    .min(1, "Au moins une étape est requise"),
});

export type RecipeFormValues = z.infer<typeof recipeFormSchema>;
