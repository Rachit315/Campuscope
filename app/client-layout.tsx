"use client"

import type React from "react"

import { useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/lib/auth-provider"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Scroll to top on page refresh
    window.scrollTo(0, 0)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <div className="flex min-h-screen flex-col" suppressHydrationWarning>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}
