"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Share2 } from "lucide-react"

interface ReviewCardProps {
  review: {
    id: number
    collegeName: string
    collegeInitials: string
    content: string
    rating: number
    timeAgo: string
    reactions: {
      [key: string]: number
    }
  }
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [reactions, setReactions] = useState(review.reactions)
  const [showFullContent, setShowFullContent] = useState(false)
  const [userReacted, setUserReacted] = useState<string | null>(null)

  const truncatedContent =
    review.content.length > 120 && !showFullContent ? `${review.content.substring(0, 120)}...` : review.content

  const handleReaction = (emoji: string) => {
    if (userReacted === emoji) {
      // User is un-reacting
      setReactions((prev) => ({
        ...prev,
        [emoji]: Math.max(0, prev[emoji] - 1),
      }))
      setUserReacted(null)
      toast({
        description: "Reaction removed",
        duration: 1500,
      })
    } else {
      // If user already reacted with a different emoji, remove that first
      if (userReacted) {
        setReactions((prev) => ({
          ...prev,
          [userReacted]: Math.max(0, prev[userReacted] - 1),
        }))
      }

      // Add new reaction
      setReactions((prev) => ({
        ...prev,
        [emoji]: (prev[emoji] || 0) + 1,
      }))
      setUserReacted(emoji)
      toast({
        description: `You reacted with ${emoji}`,
        duration: 1500,
      })
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Check out this review of ${review.collegeName} on CampuScope: https://campuscope.com/college/${review.id}`,
    )
    toast({
      description: "Link copied to clipboard!",
      duration: 2000,
    })
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
      <Card className="review-card overflow-hidden h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {review.collegeInitials}
            </div>
            <div className="ml-3">
              <Link href={`/college/${review.id}`} className="font-bold hover:underline">
                {review.collegeName}
              </Link>
              <div className="flex items-center text-yellow-500 text-sm">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                  ))}
                <span className="text-muted-foreground ml-1">{review.rating}/5</span>
              </div>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">{review.timeAgo}</div>
          </div>
        </CardHeader>

        <CardContent className="pb-3 flex-grow">
          <p className="text-foreground/90">
            {truncatedContent}
            {review.content.length > 120 && (
              <Button
                variant="link"
                className="px-0 h-auto font-medium"
                onClick={() => setShowFullContent(!showFullContent)}
              >
                {showFullContent ? "Show Less" : "Read More"}
              </Button>
            )}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col items-start pt-0">
          <div className="flex flex-wrap gap-2 mb-3 w-full">
            {Object.entries(reactions).map(([emoji, count]) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className={`emoji-reaction ${
                  userReacted === emoji ? "bg-primary/20 border-primary/30" : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {emoji} <span className="ml-1">{count}</span>
              </button>
            ))}
            <button
              onClick={handleShare}
              className="emoji-reaction bg-secondary hover:bg-secondary/80 ml-auto"
              aria-label="Share review"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          <div className="text-xs text-muted-foreground w-full">Posted by Anonymous Student</div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default ReviewCard
