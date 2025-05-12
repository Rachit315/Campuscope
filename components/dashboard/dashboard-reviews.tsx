"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Eye, PenSquare } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

// Mock data for user reviews
const mockReviews = [
  {
    id: 1,
    collegeName: "Stanford University",
    collegeInitials: "SU",
    content:
      "The CS program is top-notch but the workload is INSANE. Pulled 3 all-nighters in one week during finals. Worth it for the connections though.",
    rating: 4,
    timeAgo: "3h ago",
    isAnonymous: true,
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
    isAnonymous: false,
    reactions: {
      "🔥": 19,
      "💀": 7,
      "😭": 31,
      "🤡": 12,
      "🧢": 8,
    },
  },
]

const DashboardReviews = () => {
  const [reviews, setReviews] = useState(mockReviews)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [editingReview, setEditingReview] = useState<(typeof mockReviews)[0] | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const [editedRating, setEditedRating] = useState<number[]>([5])
  const [editedAnonymous, setEditedAnonymous] = useState(true)

  const handleEditReview = (review: (typeof mockReviews)[0]) => {
    setEditingReview(review)
    setEditedContent(review.content)
    setEditedRating([review.rating])
    setEditedAnonymous(review.isAnonymous)
  }

  const handleUpdateReview = async () => {
    if (!editingReview) return

    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      const updatedReviews = reviews.map((review) =>
        review.id === editingReview.id
          ? {
              ...review,
              content: editedContent,
              rating: editedRating[0],
              isAnonymous: editedAnonymous,
            }
          : review,
      )

      setReviews(updatedReviews)
      setEditingReview(null)
      setIsUpdating(false)

      toast({
        title: "Success",
        description: "Your review has been updated",
      })
    }, 1000)
  }

  const handleDeleteReview = async (reviewId: number) => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      const updatedReviews = reviews.filter((review) => review.id !== reviewId)
      setReviews(updatedReviews)
      setIsDeleting(false)

      toast({
        title: "Success",
        description: "Your review has been deleted",
      })
    }, 1000)
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">You haven't written any reviews yet</h3>
        <p className="text-muted-foreground mb-6">
          Share your experiences to help other students make informed decisions
        </p>
        <Button asChild>
          <Link href="/submit-review">
            <PenSquare className="mr-2 h-4 w-4" />
            Write Your First Review
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
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
                  <div className="ml-auto flex items-center gap-2">
                    <Badge variant={review.isAnonymous ? "outline" : "secondary"}>
                      {review.isAnonymous ? "Anonymous" : "Public"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{review.timeAgo}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pb-3">
                <p className="text-foreground/90">{review.content}</p>
              </CardContent>

              <CardFooter className="flex justify-between pt-0">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(review.reactions).map(([emoji, count]) => (
                    <span key={emoji} className="emoji-reaction bg-secondary">
                      {emoji} <span className="ml-1">{count}</span>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/college/${review.id}`}>
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Link>
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleEditReview(review)}>
                        <Pencil className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Edit Review</DialogTitle>
                        <DialogDescription>Make changes to your review for {review.collegeName}</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="content">Review Content</Label>
                          <Textarea
                            id="content"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            rows={5}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Rating ({editedRating[0]}/5)</Label>
                          <Slider
                            value={editedRating}
                            onValueChange={setEditedRating}
                            max={5}
                            min={1}
                            step={1}
                            className="py-4"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Poor</span>
                            <span>Average</span>
                            <span>Excellent</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch id="anonymous" checked={editedAnonymous} onCheckedChange={setEditedAnonymous} />
                          <Label htmlFor="anonymous">Post anonymously</Label>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setEditingReview(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateReview} disabled={isUpdating}>
                          {isUpdating ? (
                            <div className="flex items-center">
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                              Updating...
                            </div>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDeleteReview(review.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                        Deleting...
                      </div>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1 h-4 w-4"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                        Delete
                      </>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default DashboardReviews
