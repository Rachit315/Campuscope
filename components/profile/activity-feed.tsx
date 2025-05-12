"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ThumbsUp, Star, Eye, Clock } from "lucide-react"
import Link from "next/link"

// Mock activity data
const mockActivity = [
  {
    id: "1",
    type: "review",
    collegeName: "Stanford University",
    collegeId: "1",
    content: "Posted a review",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2",
    type: "comment",
    collegeName: "MIT",
    collegeId: "2",
    content: "Commented on a review",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "3",
    type: "reaction",
    collegeName: "Harvard University",
    collegeId: "3",
    content: "Reacted to a review",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: "4",
    type: "view",
    collegeName: "UC Berkeley",
    collegeId: "4",
    content: "Viewed a college profile",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
]

interface ActivityFeedProps {
  userId: string
}

export default function ActivityFeed({ userId }: ActivityFeedProps) {
  const [activity, setActivity] = useState(mockActivity)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + "y ago"

    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + "mo ago"

    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + "d ago"

    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + "h ago"

    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + "m ago"

    return Math.floor(seconds) + "s ago"
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "review":
        return <Star className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      case "reaction":
        return <ThumbsUp className="h-4 w-4" />
      case "view":
        return <Eye className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "review":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
      case "comment":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
      case "reaction":
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
      case "view":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>Your recent interactions on CampuScope</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
                  <div className="h-3 w-1/2 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : activity.length > 0 ? (
          <div className="space-y-4">
            {activity.map((item) => (
              <div key={item.id} className="flex items-start space-x-3">
                <div className={`rounded-full p-2 ${getActivityColor(item.type)}`}>{getActivityIcon(item.type)}</div>
                <div>
                  <p className="text-sm">
                    {item.content} on{" "}
                    <Link href={`/college/${item.collegeId}`} className="font-medium hover:underline">
                      {item.collegeName}
                    </Link>
                  </p>
                  <p className="text-xs text-muted-foreground">{getTimeAgo(item.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Clock className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-base font-medium mb-2">No recent activity</h3>
            <p className="text-sm text-muted-foreground">Your recent interactions will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
