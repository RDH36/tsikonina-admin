"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  RecipeFormValues,
  recipeFormSchema,
} from "@/app/(admin)/recipes/schemas";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RecipeBasicInfo } from "./recipe-basic-info";
import { RecipeIngredients } from "./recipe-ingredients";
import { RecipeMainImage } from "./recipe-main-image";
import { RecipeSteps } from "./recipe-steps";
import { RecipeTags } from "./recipe-tags";

export function RecipeForm() {
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: undefined,
      cookingTime: 30,
      mainImage: null,
      tags: [],
      ingredients: [{ quantity: "", name: "" }],
      steps: [{ description: "", image: null }],
    },
  });

  const onSubmit = (data: RecipeFormValues) => {
    console.log(data);
    // Ici vous pouvez envoyer les données à votre API
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Ajouter une recette</h1>
          <div className="space-x-2">
            <Button type="submit" className="cursor-pointer">
              Enregistrer
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <RecipeMainImage control={form.control} />
          <RecipeBasicInfo control={form.control} />
          <RecipeTags />
          <RecipeIngredients control={form.control} />
          <RecipeSteps control={form.control} />
        </div>
      </form>
    </Form>
  );
}
