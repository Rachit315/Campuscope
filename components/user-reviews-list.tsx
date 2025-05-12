"use client"

import { useState } from "react"
import type { Review } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Eye, PenSquare } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { updateReviewAction, deleteReviewAction } from "@/app/actions"

interface UserReviewsListProps {
  reviews: Review[]
}

export default function UserReviewsList({ reviews }: UserReviewsListProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const [editedRating, setEditedRating] = useState<number[]>([5])
  const [editedAnonymous, setEditedAnonymous] = useState(true)

  const handleEditReview = (review: Review) => {
    setEditingReview(review)
    setEditedContent(review.content)
    setEditedRating([review.rating])
    setEditedAnonymous(review.isAnonymous)
  }

  const handleUpdateReview = async () => {
    if (!editingReview) return

    setIsUpdating(true)

    try {
      const formData = new FormData()
      formData.append("content", editedContent)
      formData.append("rating", editedRating[0].toString())
      formData.append("isAnonymous", editedAnonymous.toString())

      const result = await updateReviewAction(editingReview.id, formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Your review has been updated",
        })
        setEditingReview(null)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update review",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteReview = async (reviewId: number) => {
    setIsDeleting(true)

    try {
      const result = await deleteReviewAction(reviewId)

      if (result.success) {
        toast({
          title: "Success",
          description: "Your review has been deleted",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete review",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
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
      {reviews.map((review) => (
        <Card key={review.id} className="overflow-hidden">
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
                  <DialogFooter>
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
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your review for {review.collegeName}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteReview(review.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                          Deleting...
                        </div>
                      ) : (
                        "Delete"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </Card>
      ))}
      <Toaster />
    </div>
  )
}
