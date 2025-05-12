"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { AvatarStyle, AvatarColor } from "@/components/anonymous-avatar"

// Mock user data with expanded fields
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    createdAt: new Date("2023-01-01").toISOString(),
    bio: "Computer Science student passionate about web development and AI.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
      { platform: "Twitter", url: "https://twitter.com/johndoe" },
      { platform: "GitHub", url: "https://github.com/johndoe" },
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning"],
    education: [
      {
        id: "1",
        institution: "Stanford University",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startYear: 2018,
        endYear: 2022,
        current: false,
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
    createdAt: new Date("2023-02-15").toISOString(),
  },
]

// Update the User type with new fields
export type User = {
  id: string
  name: string
  email: string
  createdAt: string
  isAnonymous?: boolean
  username?: string
  avatarStyle?: AvatarStyle
  avatarColor?: AvatarColor
  bio?: string
  location?: string
  website?: string
  socialLinks?: Array<{ platform: string; url: string }>
  skills?: string[]
  education?: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startYear: number
    endYear: number | null
    current: boolean
  }>
}

// Update the AuthContextType to include setAvatarPreferences
type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, redirectTo?: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
  setAnonymityPreference: (isAnonymous: boolean, username?: string) => void
  setAvatarPreferences: (style: AvatarStyle, color: AvatarColor) => void
  updateProfile: (updates: Partial<User>) => void
}

// Update the default context value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  setAnonymityPreference: () => {},
  setAvatarPreferences: () => {},
  updateProfile: () => {},
})

export const useAuth = () => useContext(AuthContext)

// Add the updateProfile function to the AuthProvider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Failed to load user from localStorage:", error)
        localStorage.removeItem("user")
      } finally {
        setIsLoading(false)
      }
    }

    // Small delay to prevent hydration issues
    const timer = setTimeout(loadUser, 100)
    return () => clearTimeout(timer)
  }, [])

  const login = async (email: string, password: string, redirectTo?: string): Promise<boolean> => {
    try {
      // Simulate API call with mock data
      const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        
        // Handle redirect after successful login
        if (redirectTo) {
          router.push(redirectTo)
        } else {
          router.push("/dashboard")
        }
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const userExists = mockUsers.some((u) => u.email === email)
      if (userExists) {
        return false
      }

      // Create new user
      const newUser = {
        id: String(mockUsers.length + 1),
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      }

      // Add to mock database
      mockUsers.push(newUser)

      // Set as current user
      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  const setAnonymityPreference = (isAnonymous: boolean, username?: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        isAnonymous,
        username: isAnonymous ? username : undefined,
        // Set default avatar preferences for anonymous users
        avatarStyle: isAnonymous ? "gradient" : undefined,
        avatarColor: isAnonymous ? "blue" : undefined,
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const setAvatarPreferences = (style: AvatarStyle, color: AvatarColor) => {
    if (user) {
      const updatedUser = {
        ...user,
        avatarStyle: style,
        avatarColor: color,
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...updates,
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        setAnonymityPreference,
        setAvatarPreferences,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
