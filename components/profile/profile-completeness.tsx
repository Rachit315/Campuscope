"use client"

import { useMemo } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle } from "lucide-react"
import type { User } from "@/lib/auth-provider"

interface ProfileCompletenessProps {
  user: User
}

export default function ProfileCompleteness({ user }: ProfileCompletenessProps) {
  const { completionPercentage, completedItems, incompleteItems } = useMemo(() => {
    const items = [
      { name: "Profile picture", completed: !!user.avatarStyle || !user.isAnonymous },
      { name: "Name", completed: !!user.name },
      { name: "Email", completed: !!user.email },
      { name: "Bio", completed: !!user.bio },
      { name: "Location", completed: !!user.location },
      { name: "Education history", completed: !!(user.education && user.education.length > 0) },
      { name: "Skills & interests", completed: !!(user.skills && user.skills.length > 0) },
      { name: "Website", completed: !!user.website },
      {
        name: "Social links",
        completed: !!(user.socialLinks && user.socialLinks.length > 0 && user.socialLinks.some((link) => link.url)),
      },
    ]

    const completed = items.filter((item) => item.completed)
    const percentage = Math.round((completed.length / items.length) * 100)

    return {
      completionPercentage: percentage,
      completedItems: completed,
      incompleteItems: items.filter((item) => !item.completed),
    }
  }, [user])

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Profile Completeness</CardTitle>
        <CardDescription>Complete your profile to get the most out of CampuScope</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{completionPercentage}% complete</span>
              <span className="text-sm text-muted-foreground">
                {completedItems.length}/{completedItems.length + incompleteItems.length} items
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          {incompleteItems.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Items to complete:</h4>
              <ul className="space-y-1">
                {incompleteItems.map((item, index) => (
                  <li key={index} className="text-sm flex items-center text-muted-foreground">
                    <XCircle className="h-4 w-4 mr-2 text-red-500" />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
