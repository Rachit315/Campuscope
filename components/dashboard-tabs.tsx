"use client"

import { useState } from "react"
import type { User, Review } from "@/lib/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PenSquare, UserIcon } from "lucide-react"
import Link from "next/link"
import UserReviewsList from "@/components/user-reviews-list"
import UserProfile from "@/components/user-profile"

interface DashboardTabsProps {
  user: User
  reviews: Review[]
}

export default function DashboardTabs({ user, reviews }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState("reviews")

  return (
    <Tabs defaultValue="reviews" onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="reviews" className="text-base py-3">
          <PenSquare className="mr-2 h-4 w-4" />
          My Reviews
        </TabsTrigger>
        <TabsTrigger value="profile" className="text-base py-3">
          <UserIcon className="mr-2 h-4 w-4" />
          Profile
        </TabsTrigger>
      </TabsList>

      <TabsContent value="reviews" className="mt-0">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>My Reviews</CardTitle>
                <CardDescription>Manage and edit your college reviews</CardDescription>
              </div>
              <Button asChild>
                <Link href="/submit-review">
                  <PenSquare className="mr-2 h-4 w-4" />
                  Write New Review
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <UserReviewsList reviews={reviews} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="profile" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Manage your account settings and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <UserProfile user={user} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
