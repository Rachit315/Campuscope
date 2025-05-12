"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, ExternalLink, School } from "lucide-react"
import Link from "next/link"

// Mock saved colleges data
const mockSavedColleges = [
  {
    id: "1",
    name: "Stanford University",
    location: "Stanford, CA",
    savedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "2",
    name: "MIT",
    location: "Cambridge, MA",
    savedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: "3",
    name: "Harvard University",
    location: "Cambridge, MA",
    savedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
]

interface SavedCollegesProps {
  userId: string
}

export default function SavedColleges({ userId }: SavedCollegesProps) {
  const [savedColleges, setSavedColleges] = useState(mockSavedColleges)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const removeSavedCollege = (id: string) => {
    setSavedColleges(savedColleges.filter((college) => college.id !== id))
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Saved Colleges</CardTitle>
        <CardDescription>Colleges you've bookmarked for later</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-md bg-muted animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
                  <div className="h-3 w-1/2 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : savedColleges.length > 0 ? (
          <div className="space-y-4">
            {savedColleges.map((college) => (
              <div key={college.id} className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 rounded-md p-2 text-primary">
                    <School className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{college.name}</h4>
                    <p className="text-xs text-muted-foreground">{college.location}</p>
                    <p className="text-xs text-muted-foreground mt-1">Saved on {formatDate(college.savedAt)}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <Link href={`/college/${college.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSavedCollege(college.id)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Bookmark className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Bookmark className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-base font-medium mb-2">No saved colleges</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Bookmark colleges to keep track of ones you're interested in
            </p>
            <Button asChild size="sm">
              <Link href="/colleges">Browse Colleges</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
