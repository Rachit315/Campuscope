"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import AnonymousAvatar, { type AvatarStyle, type AvatarColor } from "@/components/anonymous-avatar"

interface AvatarCustomizerProps {
  username: string
  initialStyle?: AvatarStyle
  initialColor?: AvatarColor
  onStyleChange: (style: AvatarStyle) => void
  onColorChange: (color: AvatarColor) => void
}

export default function AvatarCustomizer({
  username,
  initialStyle = "gradient",
  initialColor = "blue",
  onStyleChange,
  onColorChange,
}: AvatarCustomizerProps) {
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>(initialStyle)
  const [selectedColor, setSelectedColor] = useState<AvatarColor>(initialColor)

  const handleStyleChange = (style: AvatarStyle) => {
    setSelectedStyle(style)
    onStyleChange(style)
  }

  const handleColorChange = (color: AvatarColor) => {
    setSelectedColor(color)
    onColorChange(color)
  }

  const styles: { value: AvatarStyle; label: string }[] = [
    { value: "gradient", label: "Gradient" },
    { value: "emoji", label: "Emoji" },
    { value: "initials", label: "Initials" },
    { value: "pattern", label: "Pattern" },
    { value: "abstract", label: "Abstract" },
  ]

  const colors: { value: AvatarColor; label: string; bgClass: string }[] = [
    { value: "blue", label: "Blue", bgClass: "bg-blue-500" },
    { value: "green", label: "Green", bgClass: "bg-green-500" },
    { value: "red", label: "Red", bgClass: "bg-red-500" },
    { value: "purple", label: "Purple", bgClass: "bg-purple-500" },
    { value: "pink", label: "Pink", bgClass: "bg-pink-500" },
    { value: "yellow", label: "Yellow", bgClass: "bg-yellow-500" },
    { value: "orange", label: "Orange", bgClass: "bg-orange-500" },
    { value: "cyan", label: "Cyan", bgClass: "bg-cyan-500" },
    { value: "teal", label: "Teal", bgClass: "bg-teal-500" },
    { value: "indigo", label: "Indigo", bgClass: "bg-indigo-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <AnonymousAvatar seed={username || "anonymous"} style={selectedStyle} color={selectedColor} size="xl" />
        <p className="text-sm text-muted-foreground">Preview</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-3">Avatar Style</h3>
          <RadioGroup
            value={selectedStyle}
            onValueChange={(value) => handleStyleChange(value as AvatarStyle)}
            className="grid grid-cols-2 sm:grid-cols-5 gap-2"
          >
            {styles.map((style) => (
              <div key={style.value} className="flex items-center space-x-2">
                <RadioGroupItem value={style.value} id={`style-${style.value}`} className="sr-only" />
                <Label
                  htmlFor={`style-${style.value}`}
                  className={`flex flex-col items-center justify-center p-2 rounded-md border cursor-pointer hover:bg-accent ${
                    selectedStyle === style.value ? "border-primary bg-accent" : "border-muted"
                  }`}
                >
                  <AnonymousAvatar
                    seed={username || "anonymous"}
                    style={style.value as AvatarStyle}
                    color={selectedColor}
                    size="md"
                  />
                  <span className="mt-1 text-xs">{style.label}</span>
                  {selectedStyle === style.value && <Check className="absolute top-1 right-1 h-3 w-3 text-primary" />}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Color</h3>
          <RadioGroup
            value={selectedColor}
            onValueChange={(value) => handleColorChange(value as AvatarColor)}
            className="grid grid-cols-5 sm:grid-cols-10 gap-2"
          >
            {colors.map((color) => (
              <div key={color.value} className="flex items-center space-x-2">
                <RadioGroupItem value={color.value} id={`color-${color.value}`} className="sr-only" />
                <Label
                  htmlFor={`color-${color.value}`}
                  className={`flex items-center justify-center p-1 rounded-full border cursor-pointer hover:opacity-80 ${
                    selectedColor === color.value
                      ? "border-primary ring-2 ring-primary ring-opacity-50"
                      : "border-muted"
                  }`}
                >
                  <div className={`${color.bgClass} h-6 w-6 rounded-full`}></div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}
