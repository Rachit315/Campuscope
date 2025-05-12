"use client"

import { useMemo } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export type AvatarStyle = "gradient" | "emoji" | "initials" | "pattern" | "abstract"
export type AvatarColor =
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "pink"
  | "orange"
  | "cyan"
  | "teal"
  | "indigo"

interface AnonymousAvatarProps {
  seed?: string
  size?: "sm" | "md" | "lg" | "xl"
  style?: AvatarStyle
  color?: AvatarColor
  className?: string
  onClick?: () => void
}

const EMOJIS = ["🦊", "🐱", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐙", "🦄", "🦉", "🦋", "🐝", "🐢"]

const GRADIENTS: Record<AvatarColor, string> = {
  pink: "from-pink-500 to-purple-500",
  purple: "from-purple-500 to-indigo-500",
  indigo: "from-indigo-500 to-blue-500",
  blue: "from-blue-500 to-cyan-500",
  cyan: "from-cyan-500 to-teal-500",
  teal: "from-teal-500 to-green-500",
  green: "from-green-500 to-lime-500",
  yellow: "from-lime-500 to-yellow-500",
  orange: "from-yellow-500 to-amber-500",
  red: "from-orange-500 to-red-500",
}

const PATTERNS: Record<AvatarColor, string> = {
  blue: "bg-blue-100 dark:bg-blue-900",
  green: "bg-green-100 dark:bg-green-900",
  yellow: "bg-yellow-100 dark:bg-yellow-900",
  red: "bg-red-100 dark:bg-red-900",
  purple: "bg-purple-100 dark:bg-purple-900",
  pink: "bg-pink-100 dark:bg-pink-900",
  orange: "bg-orange-100 dark:bg-orange-900",
  cyan: "bg-cyan-100 dark:bg-cyan-900",
  teal: "bg-teal-100 dark:bg-teal-900",
  indigo: "bg-indigo-100 dark:bg-indigo-900",
}

const ABSTRACT_PATTERNS = [
  "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
  "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
  "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)",
  "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
  "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
  "linear-gradient(to right, #434343 0%, black 100%)",
]

export default function AnonymousAvatar({
  seed = "anonymous",
  size = "md",
  style = "gradient",
  color = "blue",
  className = "",
  onClick,
}: AnonymousAvatarProps) {
  // Generate a consistent hash from the seed
  const hashCode = useMemo(() => {
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash)
    }
    return Math.abs(hash)
  }, [seed])

  // Get a consistent emoji based on the hash
  const emoji = useMemo(() => {
    return EMOJIS[hashCode % EMOJIS.length]
  }, [hashCode])

  // Get a consistent gradient based on the hash or use the provided color
  const gradient = useMemo(() => {
    return GRADIENTS[color] || GRADIENTS.blue
  }, [color])

  // Get a consistent pattern based on the hash or use the provided color
  const pattern = useMemo(() => {
    return PATTERNS[color] || PATTERNS.blue
  }, [color])

  // Get a consistent abstract pattern based on the hash
  const abstractPattern = useMemo(() => {
    return ABSTRACT_PATTERNS[hashCode % ABSTRACT_PATTERNS.length]
  }, [hashCode])

  // Get initials (first 2 characters of seed)
  const initials = useMemo(() => {
    return seed.substring(0, 2).toUpperCase()
  }, [seed])

  // Determine size class
  const sizeClass = useMemo(() => {
    switch (size) {
      case "sm":
        return "h-8 w-8 text-xs"
      case "md":
        return "h-10 w-10 text-sm"
      case "lg":
        return "h-12 w-12 text-base"
      case "xl":
        return "h-16 w-16 text-lg"
      default:
        return "h-10 w-10 text-sm"
    }
  }, [size])

  return (
    <Avatar className={`${sizeClass} ${className} ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
      {style === "gradient" && (
        <AvatarFallback className={`bg-gradient-to-br ${gradient} text-white`}>{initials}</AvatarFallback>
      )}
      {style === "emoji" && <AvatarFallback className={`${pattern} text-primary`}>{emoji}</AvatarFallback>}
      {style === "initials" && (
        <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
      )}
      {style === "pattern" && (
        <AvatarFallback className={`${pattern} border border-muted`}>
          <span className="font-bold">{initials}</span>
        </AvatarFallback>
      )}
      {style === "abstract" && (
        <AvatarFallback style={{ background: abstractPattern }} className="text-white">
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  )
}
