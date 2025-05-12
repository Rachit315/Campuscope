"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import CollegeCardSkeleton from "@/components/skeletons/college-card-skeleton"

// Mock data for featured colleges
const featuredColleges = [
  {
    id: 1,
    name: "Indian Institute of Technology (IIT) Madras",
    location: "Chennai",
    reviewCount: 1243,
    avgRating: 4.7,
    tags: ["Engineering", "Research", "Tech"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Indian Institute of Science (IISc)",
    location: "Bangalore",
    reviewCount: 987,
    avgRating: 4.8,
    tags: ["Science", "Research", "Postgraduate"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "IIT Delhi",
    location: "New Delhi",
    reviewCount: 1056,
    avgRating: 4.6,
    tags: ["Engineering", "Innovation", "Startups"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "AIIMS Delhi",
    location: "New Delhi",
    reviewCount: 1102,
    avgRating: 4.9,
    tags: ["Medical", "Healthcare", "Research"],
    image: "/placeholder.svg?height=100&width=100",
  },
]

const FeaturedColleges = () => {
  const [isLoading, setIsLoading] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

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
    <section ref={ref} className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"} className="space-y-8">
          <motion.div variants={item} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Featured Colleges</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore top colleges with the most active reviews and discussions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? // Skeleton loading state
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <motion.div key={`skeleton-${index}`} variants={item}>
                      <CollegeCardSkeleton />
                    </motion.div>
                  ))
              : // Actual colleges
                featuredColleges.map((college, index) => (
                  <motion.div
                    key={college.id}
                    variants={item}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <img
                            src={college.image || "/placeholder.svg"}
                            alt={college.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div className="ml-3">
                            <h3 className="font-bold">{college.name}</h3>
                            <p className="text-sm text-muted-foreground">{college.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-yellow-500">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <span key={i}>{i < Math.floor(college.avgRating) ? "★" : "☆"}</span>
                              ))}
                            <span className="ml-1 text-foreground">{college.avgRating}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{college.reviewCount} reviews</div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {college.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button asChild className="w-full" variant="outline">
                          <Link href={`/college/${college.id}`}>
                            View College
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </div>

          <motion.div variants={item} className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/colleges">
                Browse All Colleges
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedColleges
