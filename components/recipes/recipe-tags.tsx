"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Badge } from "../ui/badge";

const POPULAR_TAGS = [
  "végétarien",
  "vegan",
  "sans gluten",
  "dessert",
  "plat principal",
  "entrée",
  "populaire",
  "facile",
  "healthy",
];

export function RecipeTags() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control: form.control,
  });

  const addTag = (tag: string) => {
    const currentTags = form.getValues("tags") || [];
    if (!currentTags.includes(tag)) {
      append(tag);
    }
  };

  return (
    <FormField
      control={form.control}
      name="tags"
      render={() => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {POPULAR_TAGS.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    onClick={() => addTag(tag)}
                    type="button"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {fields.map((field, index) => (
                  <Badge key={field.id} variant="secondary">
                    {form.getValues(`tags.${index}`)}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 px-1"
                      onClick={() => remove(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
