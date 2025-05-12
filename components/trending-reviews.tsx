"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlameIcon as Fire, Clock, ThumbsUp } from "lucide-react"
import ReviewCard from "@/components/review-card"
import ReviewCardSkeleton from "@/components/skeletons/review-card-skeleton"

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    collegeName: "Stanford University",
    collegeInitials: "SU",
    content:
      "The CS program is top-notch but the workload is INSANE. Pulled 3 all-nighters in one week during finals. Worth it for the connections though.",
    rating: 4,
    timeAgo: "3h ago",
    reactions: {
      "🔥": 42,
      "💀": 28,
      "😭": 15,
      "🤡": 5,
      "🧢": 2,
    },
  },
  {
    id: 2,
    collegeName: "NYU",
    collegeInitials: "NY",
    content:
      "Living in NYC as a student is both amazing and terrible. The opportunities are endless but so is the cost. Tisch professors actually work in the industry which is cool.",
    rating: 3,
    timeAgo: "5h ago",
    reactions: {
      "🔥": 19,
      "💀": 7,
      "😭": 31,
      "🤡": 12,
      "🧢": 8,
    },
  },
  {
    id: 3,
    collegeName: "UC Berkeley",
    collegeInitials: "UCB",
    content:
      "Campus is beautiful but safety is a real concern. Had my laptop stolen at the library. Professors are brilliant but some can barely teach. The activism scene is intense.",
    rating: 3,
    timeAgo: "1d ago",
    reactions: {
      "🔥": 27,
      "💀": 34,
      "😭": 18,
      "🤡": 9,
      "🧢": 3,
    },
  },
  {
    id: 4,
    collegeName: "MIT",
    collegeInitials: "MIT",
    content:
      "If you enjoy pain, you'll love it here. The problem sets are designed to break you. But the research opportunities are unmatched and the community is surprisingly supportive.",
    rating: 5,
    timeAgo: "2d ago",
    reactions: {
      "🔥": 56,
      "💀": 41,
      "😭": 22,
      "🤡": 4,
      "🧢": 7,
    },
  },
  {
    id: 5,
    collegeName: "University of Michigan",
    collegeInitials: "UM",
    content:
      "Football games are the highlight of the semester. Campus is huge so get ready to walk. Winter is brutal but the community makes it worth it. Great balance of academics and social life.",
    rating: 4,
    timeAgo: "3d ago",
    reactions: {
      "🔥": 38,
      "💀": 12,
      "😭": 9,
      "🤡": 6,
      "🧢": 4,
    },
  },
  {
    id: 6,
    collegeName: "Columbia University",
    collegeInitials: "CU",
    content:
      "The core curriculum will have you reading more books than you thought possible. New York City is your campus which is amazing but also distracting. Networking opportunities are endless.",
    rating: 4,
    timeAgo: "4d ago",
    reactions: {
      "🔥": 31,
      "💀": 15,
      "😭": 11,
      "🤡": 8,
      "🧢": 5,
    },
  },
]

const TrendingReviews = () => {
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [activeTab, setActiveTab] = useState("trending")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getFilteredReviews = () => {
    let filtered = [...mockReviews]

    // Filter by emoji if selected
    if (selectedEmoji) {
      filtered = filtered.filter((review) => review.reactions[selectedEmoji] && review.reactions[selectedEmoji] > 0)
    }

    // Sort based on active tab
    if (activeTab === "trending") {
      filtered.sort(
        (a, b) =>
          Object.values(b.reactions).reduce((sum, val) => sum + val, 0) -
          Object.values(a.reactions).reduce((sum, val) => sum + val, 0),
      )
    } else if (activeTab === "recent") {
      filtered.sort((a, b) => {
        if (a.timeAgo.includes("h") && b.timeAgo.includes("h")) {
          return Number.parseInt(a.timeAgo) - Number.parseInt(b.timeAgo)
        }
        return a.timeAgo.includes("h") ? -1 : 1
      })
    } else if (activeTab === "top") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    return filtered.slice(0, visibleReviews)
  }

  const handleEmojiFilter = (emoji: string) => {
    setSelectedEmoji((prev) => (prev === emoji ? null : emoji))
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"} className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <motion.div variants={item}>
              <h2 className="text-3xl font-bold mb-2">Trending Reviews</h2>
              <p className="text-muted-foreground">The real tea about campus life, straight from students</p>
            </motion.div>

            <motion.div variants={item} className="mt-4 md:mt-0 space-y-4">
              <Tabs defaultValue="trending" className="w-full" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="trending">
                    <Fire className="mr-1 h-4 w-4" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="recent">
                    <Clock className="mr-1 h-4 w-4" />
                    Recent
                  </TabsTrigger>
                  <TabsTrigger value="top">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    Top Rated
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground mr-2">Filter by:</span>
                {["🔥", "💀", "😭", "🤡", "🧢"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiFilter(emoji)}
                    className={`emoji-reaction text-sm ${
                      selectedEmoji === emoji ? "bg-primary/20 border-primary/30" : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? // Skeleton loading state
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <motion.div key={`skeleton-${index}`} variants={item}>
                      <ReviewCardSkeleton />
                    </motion.div>
                  ))
              : // Actual reviews
                getFilteredReviews().map((review, index) => (
                  <motion.div key={review.id} variants={item} className="h-full">
                    <ReviewCard review={review} />
                  </motion.div>
                ))}
          </div>

          {visibleReviews < mockReviews.length && !isLoading && (
            <motion.div variants={item} className="mt-10 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleReviews((prev) => prev + 3)}
                className="animate-bounce-slow"
              >
                Load More Reviews
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default TrendingReviews
