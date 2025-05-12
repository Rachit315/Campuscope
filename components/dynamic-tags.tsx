"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Plus, TagIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

interface DynamicTagsProps {
  tags: string[]
  onTagsChange?: (tags: string[]) => void
  readOnly?: boolean
  maxTags?: number
  suggestedTags?: string[]
  className?: string
}

export default function DynamicTags({
  tags = [],
  onTagsChange,
  readOnly = false,
  maxTags = 10,
  suggestedTags = [],
  className = "",
}: DynamicTagsProps) {
  const [inputValue, setInputValue] = useState("")
  const [localTags, setLocalTags] = useState<string[]>(tags)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Update local tags when props change
  useEffect(() => {
    setLocalTags(tags)
  }, [tags])

  const handleAddTag = (tag: string) => {
    // Normalize tag: lowercase, trim, replace spaces with hyphens
    const normalizedTag = tag.toLowerCase().trim().replace(/\s+/g, "-")

    if (!normalizedTag) return

    // Check if tag already exists
    if (localTags.includes(normalizedTag)) {
      toast({
        description: `Tag "${normalizedTag}" already exists`,
        variant: "destructive",
      })
      return
    }

    // Check max tags limit
    if (localTags.length >= maxTags) {
      toast({
        description: `Maximum ${maxTags} tags allowed`,
        variant: "destructive",
      })
      return
    }

    const newTags = [...localTags, normalizedTag]
    setLocalTags(newTags)
    onTagsChange?.(newTags)
    setInputValue("")
    setIsPopoverOpen(false)
  }

  const handleRemoveTag = (tagToRemove: string) => {
    if (readOnly) return

    const newTags = localTags.filter((tag) => tag !== tagToRemove)
    setLocalTags(newTags)
    onTagsChange?.(newTags)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag(inputValue)
    } else if (e.key === "Backspace" && !inputValue && localTags.length > 0) {
      handleRemoveTag(localTags[localTags.length - 1])
    }
  }

  // Filter suggested tags that aren't already added
  const filteredSuggestions = suggestedTags.filter(
    (tag) => !localTags.includes(tag) && (inputValue ? tag.toLowerCase().includes(inputValue.toLowerCase()) : true),
  )

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {localTags.map((tag) => (
        <motion.div
          key={tag}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <Badge variant="secondary" className={`text-xs py-1 px-2 ${readOnly ? "" : "pr-1"}`}>
            #{tag}
            {!readOnly && (
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                onClick={() => handleRemoveTag(tag)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove tag</span>
              </Button>
            )}
          </Badge>
        </motion.div>
      ))}

      {!readOnly && (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            {localTags.length < maxTags ? (
              <div className="flex items-center">
                <Input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add tag..."
                  className="h-8 min-w-[100px] w-auto"
                />
                <Button variant="ghost" size="sm" className="ml-1 h-8 w-8 p-0" onClick={() => setIsPopoverOpen(true)}>
                  <TagIcon className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                Max tags reached ({maxTags})
              </Badge>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-2" align="start">
            <div className="space-y-2">
              <div className="text-sm font-medium">Suggested Tags</div>
              {filteredSuggestions.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {filteredSuggestions.map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                      onClick={() => handleAddTag(suggestion)}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  {inputValue ? "No matching tags" : "No suggestions available"}
                </div>
              )}

              {inputValue && !filteredSuggestions.includes(inputValue) && (
                <div className="pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => handleAddTag(inputValue)}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add "{inputValue}"
                  </Button>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
