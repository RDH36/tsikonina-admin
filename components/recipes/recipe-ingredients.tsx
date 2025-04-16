"use client";

import { Plus, Trash2 } from "lucide-react";
import { Control, useFieldArray } from "react-hook-form";

import { RecipeFormValues } from "@/app/(admin)/recipes/schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface RecipeIngredientsProps {
  control: Control<RecipeFormValues>;
}

export function RecipeIngredients({ control }: RecipeIngredientsProps) {
  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Ingrédients</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ quantity: "", name: "" })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un ingrédient
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <FormField
                control={control}
                name={`ingredients.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantité</FormLabel>
                    <FormControl>
                      <Input placeholder="250g" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-8">
              <FormField
                control={control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingrédient</FormLabel>
                    <FormControl>
                      <Input placeholder="de farine" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 flex items-end justify-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
