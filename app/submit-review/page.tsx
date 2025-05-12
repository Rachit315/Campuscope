"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Send, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-provider"
import { Progress } from "@/components/ui/progress"

// Comprehensive list of Indian colleges
const colleges = [
  { id: 1, name: "IIT Madras" },
  { id: 2, name: "IISc Bangalore" },
  { id: 3, name: "IIT Delhi" },
  { id: 4, name: "IIT Bombay" },
  { id: 5, name: "IIT Kanpur" },
  { id: 6, name: "IIT Kharagpur" },
  { id: 7, name: "IIT Roorkee" },
  { id: 8, name: "IIT Guwahati" },
  { id: 9, name: "IIT Hyderabad" },
  { id: 10, name: "NIT Tiruchirappalli" },
  { id: 11, name: "Jadavpur University" },
  { id: 12, name: "VIT Vellore" },
  { id: 13, name: "Anna University" },
  { id: 14, name: "University of Delhi" },
  { id: 15, name: "BITS Pilani" },
  { id: 16, name: "Amrita Vishwa Vidyapeetham" },
  { id: 17, name: "Manipal Academy of Higher Education" },
  { id: 18, name: "Jamia Millia Islamia" },
  { id: 19, name: "Banaras Hindu University" },
  { id: 20, name: "Aligarh Muslim University" },
  { id: 21, name: "SRM Institute of Science and Technology" },
  { id: 22, name: "Thapar Institute of Engineering and Technology" },
  { id: 23, name: "IIIT Hyderabad" },
  { id: 24, name: "NIT Rourkela" },
  { id: 25, name: "Savitribai Phule Pune University" },
  { id: 26, name: "Calcutta University" },
  { id: 27, name: "IIIT Delhi" },
  { id: 28, name: "NIT Warangal" },
  { id: 29, name: "IIIT Bangalore" },
  { id: 30, name: "NIT Surathkal" },
  { id: 31, name: "Chandigarh University" },
  { id: 32, name: "Lovely Professional University" },
  { id: 33, name: "Symbiosis International University" },
  { id: 34, name: "Kalinga Institute of Industrial Technology" },
  { id: 35, name: "Shiv Nadar University" },
  { id: 36, name: "Panjab University" },
  { id: 37, name: "Osmania University" },
  { id: 38, name: "Andhra University" },
  { id: 39, name: "Mumbai University" },
  { id: 40, name: "PSG College of Technology" },
  { id: 41, name: "College of Engineering, Pune" },
  { id: 42, name: "SSN College of Engineering" },
  { id: 43, name: "NMIMS University" },
  { id: 44, name: "Christ University" },
  { id: 45, name: "Jain University" },
  { id: 46, name: "Amity University" },
  { id: 47, name: "Birla Institute of Technology, Mesra" },
  { id: 48, name: "Jamia Hamdard" },
  { id: 49, name: "Pondicherry University" },
  { id: 50, name: "Bharathiar University" },
]

const emojis = ["🔥", "💀", "😭", "🤡", "🧢"]

export default function SubmitReviewPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [review, setReview] = useState({
    college: "",
    content: "",
    rating: [3],
    selectedEmoji: "",
    anonymous: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [progress, setProgress] = useState(0)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push("/login?redirect=/submit-review")
    }
  }, [user, isAuthenticated, router])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview({ ...review, content: e.target.value })
  }

  const handleEmojiSelect = (emoji: string) => {
    setReview({ ...review, selectedEmoji: emoji === review.selectedEmoji ? "" : emoji })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!review.college) {
      toast({
        title: "Error",
        description: "Please select a college",
        variant: "destructive",
      })
      return
    }

    if (review.content.length < 20) {
      toast({
        title: "Error",
        description: "Review must be at least 20 characters",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate API response
    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)

      setTimeout(() => {
        setIsSubmitting(false)
        setIsSuccess(true)

        toast({
          title: "Success!",
          description: `Your review has been submitted ${review.anonymous ? "anonymously" : ""}`,
        })

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }, 500)
    }, 2500)
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  if (isSuccess) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex flex-col items-center justify-center text-center py-12"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Review Submitted Successfully!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for sharing your experience. Your review will help future students make informed decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Return to Home
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <motion.div initial="hidden" animate="visible" variants={formVariants}>
        <Card className="border-2">
          <CardHeader>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl md:text-3xl">Submit Your Review</CardTitle>
              <CardDescription>
                Share your honest experience to help future students make informed decisions.
              </CardDescription>
            </motion.div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="college">Select College</Label>
                <Select value={review.college} onValueChange={(value) => setReview({ ...review, college: value })}>
                  <SelectTrigger id="college" className="w-full">
                    <SelectValue placeholder="Select a college" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    <div className="sticky top-0 bg-background p-2">
                      <input
                        className="w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Search colleges..."
                        onChange={(e) => {
                          const input = e.target.value.toLowerCase()
                          const items = document.querySelectorAll("[data-college-item]")
                          items.forEach((item) => {
                            const text = item.textContent?.toLowerCase() || ""
                            if (text.includes(input)) {
                              item.classList.remove("hidden")
                            } else {
                              item.classList.add("hidden")
                            }
                          })
                        }}
                      />
                    </div>
                    {colleges.map((college) => (
                      <SelectItem key={college.id} value={college.id.toString()} data-college-item>
                        {college.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Can't find your college? We're constantly adding more institutions to our database.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="content">Your Review</Label>
                  <span
                    className={`text-sm ${review.content.length > 500 ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    {review.content.length}/500
                  </span>
                </div>
                <Textarea
                  id="content"
                  placeholder="Share your honest experience about classes, professors, campus life, etc."
                  value={review.content}
                  onChange={handleContentChange}
                  className="min-h-[150px]"
                  maxLength={500}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label>Rating ({review.rating[0]}/5)</Label>
                <Slider
                  defaultValue={[3]}
                  max={5}
                  min={1}
                  step={1}
                  value={review.rating}
                  onValueChange={(value) => setReview({ ...review, rating: value })}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Poor</span>
                  <span>Average</span>
                  <span>Excellent</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label>Choose a Reaction</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {emojis.map((emoji) => (
                    <motion.button
                      key={emoji}
                      type="button"
                      onClick={() => handleEmojiSelect(emoji)}
                      className={`emoji-reaction text-2xl p-3 ${
                        review.selectedEmoji === emoji
                          ? "bg-primary/20 border-primary/30"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center space-x-2">
                <Switch
                  id="anonymous"
                  checked={review.anonymous}
                  onCheckedChange={(checked) => setReview({ ...review, anonymous: checked })}
                />
                <Label htmlFor="anonymous">Post anonymously</Label>
              </motion.div>
            </CardContent>

            <CardFooter>
              <motion.div variants={itemVariants} className="w-full">
                {isSubmitting && <Progress value={progress} className="mb-4" />}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      Submitting...
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Review
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
