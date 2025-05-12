"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Clock, Award } from "lucide-react"
import Link from "next/link"

// Mock data for trending colleges
const mockTrendingColleges = [
  {
    id: 1,
    name: "IIT Bombay",
    location: "Mumbai",
    country: "India",
    trend: "+15% reviews this week",
    imageUrl: "/placeholder.svg?height=200&width=300",
    trendDirection: "up",
  },
  {
    id: 2,
    name: "IIT Kanpur",
    location: "Kanpur",
    country: "India",
    trend: "+12% reviews this week",
    imageUrl: "/placeholder.svg?height=200&width=300",
    trendDirection: "up",
  },
  {
    id: 3,
    name: "IIT Kharagpur",
    location: "Kharagpur",
    country: "India",
    trend: "+10% reviews this week",
    imageUrl: "/placeholder.svg?height=200&width=300",
    trendDirection: "up",
  },
  {
    id: 4,
    name: "Jawaharlal Nehru University (JNU)",
    location: "New Delhi",
    country: "India",
    trend: "+8% reviews this week",
    imageUrl: "/placeholder.svg?height=200&width=300",
    trendDirection: "up",
  },
  {
    id: 5,
    name: "Banaras Hindu University (BHU)",
    location: "Varanasi",
    country: "India",
    trend: "+7% reviews this week",
    imageUrl: "/placeholder.svg?height=200&width=300",
    trendDirection: "up",
  },
  {
    id: 6,
    name: "University of Delhi (DU)",
    location: "Delhi",
    country: "India",
    trend: "+9% reviews this week",
    imageUrl: "/placeholder.svg?height=200&width=300",
    trendDirection: "up",
  },
]

const TrendingColleges = () => {
  const [activeTab, setActiveTab] = useState("trending")
  const [isLoading, setIsLoading] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getFilteredColleges = () => {
    let filtered = [...mockTrendingColleges]

    // Sort based on active tab
    if (activeTab === "trending") {
      filtered.sort((a, b) => {
        const aPercent = Number.parseInt(a.trend.replace(/[^0-9]/g, ""))
        const bPercent = Number.parseInt(b.trend.replace(/[^0-9]/g, ""))
        return bPercent - aPercent
      })
    } else if (activeTab === "recent") {
      // In a real app, this would sort by date
      // For mock data, we'll just shuffle the array
      filtered = [...filtered].sort(() => Math.random() - 0.5)
    } else if (activeTab === "top") {
      // In a real app, this would sort by rating
      // For mock data, we'll just reverse the array
      filtered = [...filtered].reverse()
    }

    return filtered
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <section ref={ref} className="py-8">
      <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"} className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.div variants={item}>
            <h2 className="text-3xl font-bold mb-2">Trending Colleges</h2>
            <p className="text-muted-foreground">Colleges that are generating buzz right now</p>
          </motion.div>

          <motion.div variants={item} className="mt-4 md:mt-0">
            <Tabs defaultValue="trending" className="w-full" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="trending">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="recent">
                  <Clock className="mr-1 h-4 w-4" />
                  Recent
                </TabsTrigger>
                <TabsTrigger value="top">
                  <Award className="mr-1 h-4 w-4" />
                  Top Rated
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? // Skeleton loading state
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <motion.div key={`skeleton-${index}`} variants={item}>
                    <div className="bg-card border rounded-lg overflow-hidden h-full animate-pulse">
                      <div className="h-40 bg-muted" />
                      <div className="p-4 space-y-3">
                        <div className="h-6 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-4 bg-muted rounded w-2/3" />
                      </div>
                    </div>
                  </motion.div>
                ))
            : // Actual colleges
              getFilteredColleges().map((college) => (
                <motion.div key={college.id} variants={item} className="h-full">
                  <Link href={`/college/${college.id}`}>
                    <div className="bg-card border rounded-lg overflow-hidden h-full transition-all duration-300 hover:shadow-md hover:border-primary/50">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={college.imageUrl || "/placeholder.svg"}
                          alt={college.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60" />
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <h3 className="text-xl font-semibold mb-1">{college.name}</h3>
                          <p className="text-sm opacity-90">
                            {college.location}, {college.country}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center">
                          <TrendingUp
                            className={`h-4 w-4 mr-2 ${college.trendDirection === "up" ? "text-green-500" : "text-red-500"}`}
                          />
                          <span
                            className={`text-sm ${college.trendDirection === "up" ? "text-green-500" : "text-red-500"}`}
                          >
                            {college.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>

        <motion.div variants={item} className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/colleges">View All Colleges</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default TrendingColleges
