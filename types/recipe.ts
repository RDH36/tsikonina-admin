export type Recipe = {
  id: string
  title: string
  description: string
  image_url: string | null
  time: number
  difficulty: "Facile" | "Moyen" | "Difficile"
  category: string
  is_premium: boolean
  region: string
  history: string
  cultural_context: string
  ingredients: string[]
  substitutes: { original: string; substitutes: string[] }[] | null
  instructions: string[]
  user_id: string
  created_at: string
  updated_at: string
}
