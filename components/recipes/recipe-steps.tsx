"use client";

import { Camera, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent } from "react";
import { Control, useFieldArray } from "react-hook-form";

import { RecipeFormValues } from "@/app/(admin)/recipes/schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RecipeStepsProps {
  control: Control<RecipeFormValues>;
}

export function RecipeSteps({ control }: RecipeStepsProps) {
  const { fields, append, remove } = useFieldArray({
    name: "steps",
    control,
  });

  const handleStepImageChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeStepImage = (onChange: (value: string | null) => void) => {
    onChange(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Méthode</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ description: "", image: null })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une étape
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {index + 1}
                </div>
                <Label>Étape {index + 1}</Label>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <FormField
              control={control}
              name={`steps.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez cette étape..."
                      className="h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`steps.${index}.image`}
              render={({ field }) => (
                <FormItem>
                  <div className="relative flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-6">
                    {field.value ? (
                      <div className="relative aspect-video w-full">
                        <Image
                          src={field.value}
                          alt={`Photo étape ${index + 1}`}
                          fill
                          className="rounded-lg object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -right-2 -top-2 h-8 w-8"
                          onClick={() => removeStepImage(field.onChange)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Camera className="mb-2 h-8 w-8 text-gray-400" />
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id={`step-image-${index}`}
                          onChange={(e) =>
                            handleStepImageChange(index, e, field.onChange)
                          }
                        />
                        <Label htmlFor={`step-image-${index}`}>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <span>Ajouter une photo</span>
                          </Button>
                        </Label>
                      </>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
