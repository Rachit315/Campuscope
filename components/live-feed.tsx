"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Clock } from "lucide-react"

// Mock data for live feed
const initialReviews = [
  {
    id: 1,
    collegeName: "Harvard University",
    collegeInitials: "HU",
    content: "Just had the most mind-blowing lecture in CS50. Professor Malan is an actual legend!",
    timeAgo: "2m ago",
    emoji: "🔥",
  },
  {
    id: 2,
    collegeName: "Stanford University",
    collegeInitials: "SU",
    content: "The food at Arrillaga dining is surprisingly good today. They finally listened to our feedback!",
    timeAgo: "5m ago",
    emoji: "😍",
  },
  {
    id: 3,
    collegeName: "MIT",
    collegeInitials: "MIT",
    content: "Pulling an all-nighter at the Media Lab. The creativity here at 3am is unmatched.",
    timeAgo: "12m ago",
    emoji: "💀",
  },
]

// New reviews that will be added during polling
const newReviews = [
  {
    id: 4,
    collegeName: "Yale University",
    collegeInitials: "YU",
    content: "Just registered for next semester's classes. Got into all my top choices!",
    timeAgo: "Just now",
    emoji: "🎉",
  },
  {
    id: 5,
    collegeName: "Princeton University",
    collegeInitials: "PU",
    content: "The architecture on this campus never gets old. Every building tells a story.",
    timeAgo: "Just now",
    emoji: "😮",
  },
]

const LiveFeed = () => {
  const [reviews, setReviews] = useState(initialReviews)
  const [activeTab, setActiveTab] = useState("live")
  const [newReviewIndex, setNewReviewIndex] = useState(0)
  const [showNewReviewBadge, setShowNewReviewBadge] = useState(false)
  const feedRef = useRef<HTMLDivElement>(null)

  // Simulate polling for new reviews
  useEffect(() => {
    const interval = setInterval(() => {
      if (newReviewIndex < newReviews.length) {
        const newReview = newReviews[newReviewIndex]
        setReviews((prev) => [newReview, ...prev.slice(0, 4)])
        setNewReviewIndex((prev) => prev + 1)
        setShowNewReviewBadge(true)

        // Hide the badge after 3 seconds
        setTimeout(() => {
          setShowNewReviewBadge(false)
        }, 3000)
      } else {
        clearInterval(interval)
      }
    }, 15000) // Add a new review every 15 seconds

    return () => clearInterval(interval)
  }, [newReviewIndex])

  const scrollToTop = () => {
    if (feedRef.current) {
      feedRef.current.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Live Feed</h2>
              <p className="text-muted-foreground">See what students are saying right now</p>
            </div>

            <Tabs defaultValue="live" className="mt-4 md:mt-0" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="live">
                  <Activity className="mr-1 h-4 w-4" />
                  Live
                </TabsTrigger>
                <TabsTrigger value="recent">
                  <Clock className="mr-1 h-4 w-4" />
                  Recent
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Campus Chatter</CardTitle>
                {showNewReviewBadge && (
                  <Badge variant="default" className="animate-pulse cursor-pointer" onClick={scrollToTop}>
                    New Review
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div
                ref={feedRef}
                className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
              >
                <AnimatePresence>
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="border-b border-border pb-4 last:border-0"
                    >
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {review.collegeInitials}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{review.collegeName}</p>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{review.emoji}</span>
                              <span className="text-xs text-muted-foreground">{review.timeAgo}</span>
                            </div>
                          </div>
                          <p className="text-sm mt-1">{review.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default LiveFeed
