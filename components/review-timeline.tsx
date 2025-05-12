"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReviewCard from "@/components/review-card"
import AnonymousAvatar from "@/components/anonymous-avatar"

interface Review {
  id: number
  collegeName: string
  collegeInitials: string
  content: string
  rating: number
  timeAgo: string
  date: string // Actual date for timeline
  reactions: {
    [key: string]: number
  }
  tags?: string[]
}

interface ReviewTimelineProps {
  reviews: Review[]
  collegeId?: number
}

export default function ReviewTimeline({ reviews, collegeId }: ReviewTimelineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [touchStart, setTouchStart] = useState(0)

  // Group reviews by month/year
  const groupedReviews = reviews.reduce(
    (groups, review) => {
      const date = new Date(review.date)
      const key = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`

      if (!groups[key]) {
        groups[key] = []
      }

      groups[key].push(review)
      return groups
    },
    {} as Record<string, Review[]>,
  )

  // Convert to array for easier rendering
  const timelineGroups = Object.entries(groupedReviews).map(([date, reviews]) => ({
    date,
    reviews,
  }))

  // Handle scroll navigation
  const navigateReview = (direction: number) => {
    setDirection(direction)
    setCurrentIndex((prev) => {
      const newIndex = prev + direction
      return Math.max(0, Math.min(newIndex, reviews.length - 1))
    })
  }

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchEnd = e.touches[0].clientY
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      setIsScrolling(true)
      if (diff > 0) {
        navigateReview(1) // Swipe up
      } else {
        navigateReview(-1) // Swipe down
      }
      setTouchStart(touchEnd)
    }
  }

  const handleTouchEnd = () => {
    setIsScrolling(false)
  }

  // Handle wheel events
  const handleWheel = (e: React.WheelEvent) => {
    if (isScrolling) return

    setIsScrolling(true)
    if (e.deltaY > 0) {
      navigateReview(1) // Scroll down
    } else {
      navigateReview(-1) // Scroll up
    }

    // Debounce scroll events
    setTimeout(() => {
      setIsScrolling(false)
    }, 500)
  }

  // Scroll to current review
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const currentReview = container.querySelector(`[data-index="${currentIndex}"]`)

      if (currentReview) {
        currentReview.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }, [currentIndex])

  return (
    <div className="relative h-full max-h-[600px] overflow-hidden">
      {/* Navigation controls */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateReview(-1)}
          disabled={currentIndex === 0}
          className="rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateReview(1)}
          disabled={currentIndex === reviews.length - 1}
          className="rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Timeline indicator */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border z-0">
        <div
          className="absolute w-3 h-3 rounded-full bg-primary -left-[5px]"
          style={{
            top: `${(currentIndex / (reviews.length - 1)) * 100}%`,
            transition: "top 0.3s ease-out",
          }}
        />
      </div>

      {/* Reviews timeline */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto hide-scrollbar px-4 py-8"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="pl-8 space-y-12">
          {timelineGroups.map((group, groupIndex) => (
            <div key={group.date} className="space-y-6">
              <h3 className="text-lg font-bold sticky top-0 bg-background/80 backdrop-blur-sm py-2 z-10">
                {group.date}
              </h3>

              {group.reviews.map((review, reviewIndex) => {
                const index = reviews.findIndex((r) => r.id === review.id)
                const isActive = currentIndex === index

                return (
                  <div key={review.id} data-index={index} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-12 top-4 flex items-center">
                      <div className={`w-2 h-2 rounded-full ${isActive ? "bg-primary" : "bg-muted"}`} />
                      <div className="absolute -left-4">
                        <AnonymousAvatar
                          seed={review.collegeInitials}
                          size="sm"
                          style={isActive ? "gradient" : "initials"}
                        />
                      </div>
                    </div>

                    {/* Review card with animation */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0.7, scale: 0.95 }}
                        animate={{
                          opacity: isActive ? 1 : 0.7,
                          scale: isActive ? 1 : 0.95,
                        }}
                        transition={{ duration: 0.3 }}
                        className="transform origin-center"
                      >
                        <Card className={`border ${isActive ? "border-primary shadow-lg" : "border-border"}`}>
                          <ReviewCard review={review} />

                          {/* Tags */}
                          {review.tags && review.tags.length > 0 && (
                            <div className="px-5 pb-4 flex flex-wrap gap-2">
                              {review.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
