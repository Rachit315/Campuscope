"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface College {
  id: number
  name: string
  location: string
  image: string
  ratings: {
    overall: number
    infrastructure: number
    placement: number
    food: number
    ragging: number
    campusVibe: number
    academics: number
    socialLife: number
    value: number
  }
  stats: {
    acceptance: string
    tuition: string
    students: number
    graduationRate: string
  }
  tags: string[]
}

// Mock data for colleges
const mockColleges: College[] = [
  {
    id: 1,
    name: "Harvard University",
    location: "Cambridge, MA",
    image: "/placeholder.svg?height=100&width=100",
    ratings: {
      overall: 4.5,
      infrastructure: 4.8,
      placement: 4.9,
      food: 4.2,
      ragging: 1.2, // Lower is better for ragging
      campusVibe: 4.6,
      academics: 4.9,
      socialLife: 4.3,
      value: 4.1,
    },
    stats: {
      acceptance: "4%",
      tuition: "$51,925",
      students: 22947,
      graduationRate: "98%",
    },
    tags: ["Ivy League", "Research", "Prestigious"],
  },
  {
    id: 2,
    name: "Stanford University",
    location: "Stanford, CA",
    image: "/placeholder.svg?height=100&width=100",
    ratings: {
      overall: 4.7,
      infrastructure: 4.9,
      placement: 4.8,
      food: 4.5,
      ragging: 1.0,
      campusVibe: 4.8,
      academics: 4.8,
      socialLife: 4.5,
      value: 4.2,
    },
    stats: {
      acceptance: "4.3%",
      tuition: "$56,169",
      students: 16914,
      graduationRate: "96%",
    },
    tags: ["Tech", "Innovation", "Sports"],
  },
  {
    id: 3,
    name: "MIT",
    location: "Cambridge, MA",
    image: "/placeholder.svg?height=100&width=100",
    ratings: {
      overall: 4.6,
      infrastructure: 4.7,
      placement: 4.9,
      food: 3.8,
      ragging: 1.5,
      campusVibe: 4.2,
      academics: 5.0,
      socialLife: 3.9,
      value: 4.4,
    },
    stats: {
      acceptance: "6.7%",
      tuition: "$55,878",
      students: 11520,
      graduationRate: "95%",
    },
    tags: ["Engineering", "STEM", "Research"],
  },
  {
    id: 4,
    name: "UC Berkeley",
    location: "Berkeley, CA",
    image: "/placeholder.svg?height=100&width=100",
    ratings: {
      overall: 4.3,
      infrastructure: 4.1,
      placement: 4.5,
      food: 3.9,
      ragging: 2.1,
      campusVibe: 4.7,
      academics: 4.6,
      socialLife: 4.4,
      value: 4.5,
    },
    stats: {
      acceptance: "14.5%",
      tuition: "$14,226",
      students: 42501,
      graduationRate: "93%",
    },
    tags: ["Public", "Research", "Activism"],
  },
  {
    id: 5,
    name: "NYU",
    location: "New York, NY",
    image: "/placeholder.svg?height=100&width=100",
    ratings: {
      overall: 4.2,
      infrastructure: 4.0,
      placement: 4.4,
      food: 4.3,
      ragging: 1.8,
      campusVibe: 4.9,
      academics: 4.5,
      socialLife: 4.8,
      value: 3.7,
    },
    stats: {
      acceptance: "16%",
      tuition: "$54,880",
      students: 51847,
      graduationRate: "85%",
    },
    tags: ["Urban", "Arts", "Global"],
  },
]

interface CollegeComparisonProps {
  initialColleges?: number[]
}

export default function CollegeComparison({ initialColleges }: CollegeComparisonProps) {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([])
  const [availableColleges, setAvailableColleges] = useState<College[]>(mockColleges)
  const [comparisonCategory, setComparisonCategory] = useState("all")

  useEffect(() => {
    if (initialColleges && initialColleges.length > 0) {
      const colleges = initialColleges
        .map((id) => mockColleges.find((college) => college.id === id))
        .filter(Boolean) as College[]

      setSelectedColleges(colleges)
      updateAvailableColleges(colleges)
    }
  }, [initialColleges])

  const updateAvailableColleges = (selected: College[]) => {
    const selectedIds = selected.map((college) => college.id)
    setAvailableColleges(mockColleges.filter((college) => !selectedIds.includes(college.id)))
  }

  const addCollege = (collegeId: string) => {
    const college = mockColleges.find((c) => c.id === Number.parseInt(collegeId))
    if (college && selectedColleges.length < 3) {
      const newSelected = [...selectedColleges, college]
      setSelectedColleges(newSelected)
      updateAvailableColleges(newSelected)
    }
  }

  const removeCollege = (collegeId: number) => {
    const newSelected = selectedColleges.filter((college) => college.id !== collegeId)
    setSelectedColleges(newSelected)
    updateAvailableColleges(newSelected)
  }

  const getMaxRating = (category: keyof College["ratings"]) => {
    return Math.max(...selectedColleges.map((college) => college.ratings[category]))
  }

  const getBestCollege = (category: keyof College["ratings"]) => {
    if (selectedColleges.length === 0) return null

    // For ragging, lower is better
    if (category === "ragging") {
      return selectedColleges.reduce(
        (best, current) => (current.ratings[category] < best.ratings[category] ? current : best),
        selectedColleges[0],
      )
    }

    // For all other categories, higher is better
    return selectedColleges.reduce(
      (best, current) => (current.ratings[category] > best.ratings[category] ? current : best),
      selectedColleges[0],
    )
  }

  const ratingCategories = [
    { id: "infrastructure", name: "Infrastructure", description: "Campus buildings, facilities, and amenities" },
    { id: "placement", name: "Placement", description: "Job opportunities and career services" },
    { id: "food", name: "Food", description: "Dining options, quality, and variety" },
    { id: "ragging", name: "Ragging Level", description: "Level of hazing or ragging (lower is better)" },
    { id: "campusVibe", name: "Campus Vibe", description: "Overall atmosphere and student experience" },
    { id: "academics", name: "Academics", description: "Quality of education and faculty" },
    { id: "socialLife", name: "Social Life", description: "Events, clubs, and social activities" },
    { id: "value", name: "Value", description: "Return on investment for tuition and fees" },
  ]

  const filteredCategories =
    comparisonCategory === "all" ? ratingCategories : ratingCategories.filter((cat) => cat.id === comparisonCategory)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">College Comparison</h2>
          <p className="text-muted-foreground">Compare up to 3 colleges side by side</p>
        </div>

        <div className="flex items-center gap-2">
          <Select disabled={selectedColleges.length >= 3} onValueChange={addCollege}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Add college" />
            </SelectTrigger>
            <SelectContent>
              {availableColleges.map((college) => (
                <SelectItem key={college.id} value={college.id.toString()}>
                  {college.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" disabled={selectedColleges.length >= 3}>
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add up to 3 colleges to compare</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {selectedColleges.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">Select colleges to compare</p>
            <Select onValueChange={addCollege}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Add college" />
              </SelectTrigger>
              <SelectContent>
                {availableColleges.map((college) => (
                  <SelectItem key={college.id} value={college.id.toString()}>
                    {college.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* College cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {selectedColleges.map((college, index) => (
                <motion.div
                  key={college.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-2 relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => removeCollege(college.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-3">
                        <img
                          src={college.image || "/placeholder.svg"}
                          alt={college.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div>
                          <CardTitle className="text-lg">{college.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{college.location}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-yellow-500">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <span key={i}>{i < Math.floor(college.ratings.overall) ? "★" : "☆"}</span>
                            ))}
                          <span className="ml-1 text-foreground">{college.ratings.overall}</span>
                        </div>
                        <Badge variant="outline">{college.stats.acceptance} Acceptance</Badge>
                      </div>

                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Tuition:</span>
                          <span className="font-medium">{college.stats.tuition}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Students:</span>
                          <span className="font-medium">{college.stats.students.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Graduation Rate:</span>
                          <span className="font-medium">{college.stats.graduationRate}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {college.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Comparison tabs */}
          <div className="mt-8">
            <Tabs defaultValue="all" onValueChange={setComparisonCategory}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Categories</TabsTrigger>
                {ratingCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="hidden md:inline-flex">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Mobile category selector */}
              <div className="block md:hidden mb-4">
                <Select value={comparisonCategory} onValueChange={setComparisonCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {ratingCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Comparison charts */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-8">
                    {filteredCategories.map((category) => {
                      const bestCollege = getBestCollege(category.id as keyof College["ratings"])

                      return (
                        <div key={category.id} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{category.name}</h3>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{category.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            {bestCollege && (
                              <div className="flex items-center gap-1 text-sm">
                                <span className="text-muted-foreground">Best:</span>
                                <Badge variant="outline" className="font-medium">
                                  {bestCollege.name}
                                </Badge>
                              </div>
                            )}
                          </div>

                          <div className="space-y-4">
                            {selectedColleges.map((college) => {
                              const rating = college.ratings[category.id as keyof College["ratings"]]
                              const isBest = bestCollege?.id === college.id

                              // For ragging, lower is better, so invert the progress
                              const progressValue =
                                category.id === "ragging" ? ((5 - rating) / 5) * 100 : (rating / 5) * 100

                              return (
                                <div key={college.id} className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span className={isBest ? "font-medium text-primary" : ""}>{college.name}</span>
                                    <span className={isBest ? "font-medium text-primary" : ""}>
                                      {rating.toFixed(1)}/5
                                      {category.id === "ragging" && " (lower is better)"}
                                    </span>
                                  </div>
                                  <Progress
                                    value={progressValue}
                                    className={isBest ? "bg-muted h-2" : "bg-muted h-2"}
                                  />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </Tabs>
          </div>

          <div className="flex justify-center mt-4">
            <Button asChild variant="outline">
              <a href={`/colleges/compare/${selectedColleges.map((c) => c.id).join("-")}`}>
                View Detailed Comparison
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
