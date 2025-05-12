import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import mockDB from "./mock-db"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await mockDB.findUserByEmail(credentials.email)
        if (!user) {
          return null
        }

        // In a real app, we would use bcrypt.compare here
        const isPasswordValid = user.password === credentials.password
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isAnonymous: user.isAnonymous,
          username: user.username,
          role: user.role,
          avatarStyle: user.avatarStyle,
          avatarColor: user.avatarColor,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isAnonymous = user.isAnonymous
        token.username = user.username
        token.role = user.role
        token.avatarStyle = user.avatarStyle
        token.avatarColor = user.avatarColor
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.isAnonymous = token.isAnonymous as boolean
        session.user.username = token.username as string | undefined
        session.user.role = token.role as string
        session.user.avatarStyle = token.avatarStyle as string | undefined
        session.user.avatarColor = token.avatarColor as string | undefined
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
}

export type User = {
  id: string
  name: string
  email: string
  createdAt: string
  isAnonymous?: boolean
  username?: string
  role?: string
  avatarStyle?: string
  avatarColor?: string
}

export type Review = {
  id: string
  collegeName: string
  collegeInitials: string
  content: string
  rating: number
  timeAgo: string
  date: string
  isAnonymous: boolean
  reactions: {
    [key: string]: number
  }
  tags?: string[]
}

// Helper function to calculate time ago
export function timeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays}d ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears}y ago`
}
