"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const emojiCategories = {
  gastronomie: [
    "🍽️",
    "🍴",
    "🥢",
    "🥄",
    "🍷",
    "🥂",
    "🍸",
    "🍹",
    "🥃",
    "🍾",
    "🧊",
    "🍶",
    "🍵",
    "☕",
    "🫖",
    "🧋",
    "🥛",
    "🍯",
    "🥜",
    "🧂",
    "🧈",
    "🫒",
    "🧄",
    "🧅",
    "🌶️",
    "🫑",
    "🧆",
    "🥘",
    "🫕",
    "🍲",
    "🥣",
    "🍱",
    "🍚",
    "🍛",
  ],
  platsRaffinés: [
    "🍣",
    "🍤",
    "🦪",
    "🥟",
    "🍜",
    "🍝",
    "🥩",
    "🥓",
    "🍖",
    "🍗",
    "🦴",
    "🥞",
    "🧇",
    "🥐",
    "🥖",
    "🥨",
    "🧀",
    "🥗",
    "🥙",
    "🥪",
    "🌮",
    "🌯",
    "🫔",
    "🥫",
    "🍳",
    "🥚",
    "🧆",
    "🥘",
    "🫕",
    "🍲",
    "🥣",
  ],
  desserts: [
    "🍰",
    "🎂",
    "🧁",
    "🍮",
    "🍦",
    "🍧",
    "🍨",
    "🍫",
    "🍬",
    "🍭",
    "🍩",
    "🍪",
    "🥧",
    "🍯",
    "🍡",
    "🍢",
    "🥮",
    "🍘",
    "🍥",
    "🥠",
  ],
  fruitsLégumes: [
    "🍇",
    "🍈",
    "🍉",
    "🍊",
    "🍋",
    "🍌",
    "🍍",
    "🥭",
    "🍎",
    "🍏",
    "🍐",
    "🍑",
    "🍒",
    "🍓",
    "🫐",
    "🥝",
    "🍅",
    "🫒",
    "🥑",
    "🥦",
    "🥬",
    "🥒",
    "🥕",
    "🌽",
    "🧅",
    "🧄",
    "🥔",
  ],
  restaurant: [
    "🍽️",
    "👨‍🍳",
    "👩‍🍳",
    "🧑‍🍳",
    "🍷",
    "🥂",
    "🍸",
    "🍹",
    "🥃",
    "🍾",
    "🍶",
    "🍵",
    "☕",
    "🫖",
    "🧋",
    "🥛",
    "🍯",
    "🥜",
    "🧂",
    "🧈",
    "🍴",
    "🥢",
    "🥄",
    "🧊",
    "🥡",
    "🥠",
    "🥟",
    "🍱",
    "🍚",
    "🍛",
    "🍜",
    "🍝",
    "🍣",
    "🍤",
    "🦪",
    "🥩",
    "🍖",
    "🍗",
    "🥞",
    "🧇",
    "🥐",
    "🥖",
    "🥨",
    "🧀",
    "🥗",
    "🥙",
    "🥪",
    "🌮",
    "🌯",
    "🫔",
    "🥫",
    "🍳",
    "🥚",
    "🧆",
    "🥘",
    "🫕",
    "🍲",
    "🥣",
    "🍰",
    "🎂",
    "🧁",
    "🍮",
    "🍦",
    "🍧",
    "🍨",
    "🍫",
    "🍬",
    "🍭",
    "🍩",
    "🍪",
    "🥧",
  ],
  boissons: [
    "🍷",
    "🥂",
    "🍸",
    "🍹",
    "🥃",
    "🍾",
    "🍶",
    "🍵",
    "☕",
    "🫖",
    "🧋",
    "🥛",
    "🧃",
    "🥤",
    "🧉",
    "🍺",
    "🍻",
    "🥤",
    "🧋",
  ],
  ambiance: [
    "✨",
    "🌟",
    "💫",
    "🌈",
    "🎉",
    "🎊",
    "🎵",
    "🎶",
    "🎷",
    "🎸",
    "🎹",
    "🥁",
    "🎺",
    "🪗",
    "🎻",
    "🥂",
    "🍾",
    "🕯️",
    "🌆",
    "🌃",
    "🌉",
    "🏙️",
    "🌇",
    "🌅",
    "🌄",
    "🌠",
    "🎇",
    "🎆",
    "💐",
    "🌹",
    "🌸",
    "🌼",
    "🌻",
    "🌺",
    "🥀",
    "🌷",
  ],
}

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("gastronomie")

  const filteredEmojis = searchTerm
    ? Object.values(emojiCategories)
        .flat()
        .filter((emoji) => emoji.includes(searchTerm))
    : emojiCategories[activeCategory as keyof typeof emojiCategories]

  return (
    <div className="w-full">
      <div className="mb-2">
        <Input
          type="text"
          placeholder="Rechercher un emoji..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {!searchTerm && (
        <Tabs
          defaultValue="gastronomie"
          value={activeCategory}
          onValueChange={setActiveCategory}
        >
          <TabsList className="grid grid-cols-3 mb-2 w-full">
            <TabsTrigger value="gastronomie" title="Ustensiles et service">
              🍽️
            </TabsTrigger>
            <TabsTrigger value="platsRaffinés" title="Plats raffinés">
              🍣
            </TabsTrigger>
            <TabsTrigger value="desserts" title="Desserts">
              🍰
            </TabsTrigger>
          </TabsList>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="fruitsLégumes" title="Fruits et légumes">
              🍎
            </TabsTrigger>
            <TabsTrigger value="boissons" title="Boissons">
              🍷
            </TabsTrigger>
            <TabsTrigger value="ambiance" title="Ambiance">
              ✨
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      <div className="grid grid-cols-8 gap-1 mt-2 h-[200px] overflow-y-auto">
        {filteredEmojis.map((emoji, index) => (
          <Button
            key={index}
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => onEmojiSelect(emoji)}
          >
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  )
}
