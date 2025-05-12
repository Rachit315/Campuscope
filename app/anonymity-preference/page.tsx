"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-provider"
import { EyeOff, User } from "lucide-react"
import AvatarCustomizer from "@/components/avatar-customizer"
import type { AvatarStyle, AvatarColor } from "@/components/anonymous-avatar"

export default function AnonymityPreferencePage() {
  const { user, isAuthenticated, isLoading, setAnonymityPreference, setAvatarPreferences } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [isAnonymous, setIsAnonymous] = useState(false)
  const [username, setUsername] = useState("")
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>("gradient")
  const [avatarColor, setAvatarColor] = useState<AvatarColor>("blue")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("identity")

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Initialize state from user if available
  useEffect(() => {
    if (user) {
      setIsAnonymous(!!user.isAnonymous)
      setUsername(user.username || "")
      setAvatarStyle(user.avatarStyle || "gradient")
      setAvatarColor(user.avatarColor || "blue")
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate username if anonymous
    if (isAnonymous && (!username || username.trim() === "")) {
      setError("Username is required when anonymous mode is selected")
      return
    }

    // Set anonymity preference
    setAnonymityPreference(isAnonymous, username)

    // Set avatar preferences if anonymous
    if (isAnonymous) {
      setAvatarPreferences(avatarStyle, avatarColor)
    }

    toast({
      title: isAnonymous ? "Anonymous mode activated" : "Standard mode activated",
      description: isAnonymous
        ? `You'll be known as "${username}" in public`
        : "Your real name will be displayed publicly",
    })

    router.push("/dashboard")
  }

  if (isLoading || !user) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh]">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Choose Your Identity</CardTitle>
            <CardDescription>Select how you want to appear on CampuScope</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="identity">Identity</TabsTrigger>
                  <TabsTrigger value="avatar" disabled={!isAnonymous}>
                    Avatar
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="identity" className="space-y-6 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={isAnonymous ? "outline" : "default"}
                      className={`h-24 flex flex-col items-center justify-center ${
                        !isAnonymous ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setIsAnonymous(false)}
                    >
                      <User className="h-8 w-8 mb-2" />
                      <span>Real Identity</span>
                    </Button>

                    <Button
                      type="button"
                      variant={isAnonymous ? "default" : "outline"}
                      className={`h-24 flex flex-col items-center justify-center ${
                        isAnonymous ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => {
                        setIsAnonymous(true)
                        setActiveTab("identity") // Stay on identity tab when selecting anonymous
                      }}
                    >
                      <EyeOff className="h-8 w-8 mb-2" />
                      <span>Anonymous</span>
                    </Button>
                  </div>

                  {isAnonymous && (
                    <div className="space-y-2">
                      <Label htmlFor="username">Choose a username</Label>
                      <Input
                        id="username"
                        placeholder="CoolStudent123"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">This is how others will see you on the platform</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => setActiveTab("avatar")}
                      >
                        Customize your avatar
                      </Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="avatar" className="space-y-4 pt-4">
                  <AvatarCustomizer
                    username={username}
                    initialStyle={avatarStyle}
                    initialColor={avatarColor}
                    onStyleChange={setAvatarStyle}
                    onColorChange={setAvatarColor}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => setActiveTab("identity")}>
                    Back to identity settings
                  </Button>
                </TabsContent>
              </Tabs>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full">
                Continue to Dashboard
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-xs text-muted-foreground text-center">
              {isAnonymous
                ? "In anonymous mode, your real identity will be hidden from other users"
                : "Your real name will be visible to other users"}
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
