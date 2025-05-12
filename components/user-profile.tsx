"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import AnonymousAvatar from "@/components/anonymous-avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Trash2, MapPin } from "lucide-react"
import ProfileCompleteness from "@/components/profile/profile-completeness"
import EducationHistory from "@/components/profile/education-history"
import SavedColleges from "@/components/profile/saved-colleges"
import ActivityFeed from "@/components/profile/activity-feed"

interface UserProfileProps {
  user: User
}

export default function UserProfile({ user }: UserProfileProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [bio, setBio] = useState(user.bio || "")
  const [location, setLocation] = useState(user.location || "")
  const [website, setWebsite] = useState(user.website || "")
  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>(
    user.socialLinks || [
      { platform: "LinkedIn", url: "" },
      { platform: "Twitter", url: "" },
      { platform: "Instagram", url: "" },
    ],
  )
  const [skills, setSkills] = useState<string[]>(user.skills || [])
  const [newSkill, setNewSkill] = useState("")
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    reviewReplies: true,
    newFollowers: true,
    collegeUpdates: false,
    marketingEmails: false,
  })

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
      setIsUpdating(false)
    }, 1000)
  }

  const handleAvatarClick = () => {
    if (user.isAnonymous) {
      router.push("/anonymity-preference")
    }
  }

  const updateSocialLink = (index: number, field: "platform" | "url", value: string) => {
    const updatedLinks = [...socialLinks]
    updatedLinks[index][field] = value
    setSocialLinks(updatedLinks)
  }

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }])
  }

  const removeSocialLink = (index: number) => {
    const updatedLinks = [...socialLinks]
    updatedLinks.splice(index, 1)
    setSocialLinks(updatedLinks)
  }

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        {user.isAnonymous ? (
          <AnonymousAvatar
            seed={user.username || "anonymous"}
            style={user.avatarStyle || "gradient"}
            color={user.avatarColor || "blue"}
            size="xl"
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleAvatarClick}
          />
        ) : (
          <Avatar className="h-24 w-24 text-2xl">
            <AvatarFallback className="bg-primary text-primary-foreground">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        )}

        <div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">
              {user.isAnonymous ? user.username : user.name}
              {user.isAnonymous && (
                <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                  Anonymous
                </span>
              )}
            </h2>
            <p className="text-muted-foreground">{user.email}</p>
            {user.location && (
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" /> {user.location}
              </p>
            )}
            {user.isAnonymous && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-xs self-start"
                onClick={() => router.push("/anonymity-preference")}
              >
                Customize avatar
              </Button>
            )}
          </div>
        </div>
      </div>

      <ProfileCompleteness user={user} />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="resize-none"
                  rows={4}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Social Media Links</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addSocialLink} className="h-8 text-xs">
                    <PlusCircle className="h-3 w-3 mr-1" /> Add Link
                  </Button>
                </div>
                <div className="space-y-3">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Platform (e.g., LinkedIn)"
                        value={link.platform}
                        onChange={(e) => updateSocialLink(index, "platform", e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSocialLink(index)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Skills & Interests</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill or interest"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addSkill} disabled={!newSkill}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSkill(skill)}
                        className="h-4 w-4 p-0 ml-1"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {skills.length === 0 && (
                    <p className="text-sm text-muted-foreground">No skills or interests added yet</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="Enter your current password" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password (optional)</Label>
                <Input id="new-password" type="password" placeholder="Enter a new password" />
              </div>
            </div>

            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  Updating...
                </div>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="education">
          <EducationHistory userId={user.id} />
        </TabsContent>

        <TabsContent value="activity">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SavedColleges userId={user.id} />
            <ActivityFeed userId={user.id} />
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationPreferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationPreferences({ ...notificationPreferences, emailNotifications: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="review-replies">Review Replies</Label>
                  <p className="text-sm text-muted-foreground">Get notified when someone replies to your reviews</p>
                </div>
                <Switch
                  id="review-replies"
                  checked={notificationPreferences.reviewReplies}
                  onCheckedChange={(checked) =>
                    setNotificationPreferences({ ...notificationPreferences, reviewReplies: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-followers">New Followers</Label>
                  <p className="text-sm text-muted-foreground">Get notified when someone follows you</p>
                </div>
                <Switch
                  id="new-followers"
                  checked={notificationPreferences.newFollowers}
                  onCheckedChange={(checked) =>
                    setNotificationPreferences({ ...notificationPreferences, newFollowers: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="college-updates">College Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about updates to colleges you've reviewed or saved
                  </p>
                </div>
                <Switch
                  id="college-updates"
                  checked={notificationPreferences.collegeUpdates}
                  onCheckedChange={(checked) =>
                    setNotificationPreferences({ ...notificationPreferences, collegeUpdates: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={notificationPreferences.marketingEmails}
                  onCheckedChange={(checked) =>
                    setNotificationPreferences({ ...notificationPreferences, marketingEmails: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}
