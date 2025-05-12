"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, X } from "lucide-react"
import CollegeCard from "@/components/colleges/college-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for colleges
const mockColleges = [
  {
    id: 1,
    name: "Indian Institute of Technology (IIT) Madras",
    location: "Chennai",
    country: "India",
    ranking: 1,
    type: "Government",
    stream: ["Engineering", "Research", "Technology"],
    rating: 4.8,
    reviewCount: 1243,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Engineering", "Research", "Tech"],
  },
  {
    id: 2,
    name: "Indian Institute of Science (IISc)",
    location: "Bangalore",
    country: "India",
    ranking: 2,
    type: "Government",
    stream: ["Science", "Research", "Postgraduate"],
    rating: 4.9,
    reviewCount: 1567,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Science", "Research", "Postgraduate"],
  },
  {
    id: 3,
    name: "IIT Delhi",
    location: "New Delhi",
    country: "India",
    ranking: 3,
    type: "Government",
    stream: ["Engineering", "Innovation", "Technology"],
    rating: 4.7,
    reviewCount: 982,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Engineering", "Innovation", "Startups"],
  },
  {
    id: 4,
    name: "IIT Bombay",
    location: "Mumbai",
    country: "India",
    ranking: 4,
    type: "Government",
    stream: ["Engineering", "Design", "Technology"],
    rating: 4.8,
    reviewCount: 1342,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Engineering", "Design", "International"],
  },
  {
    id: 5,
    name: "IIT Kanpur",
    location: "Kanpur",
    country: "India",
    ranking: 5,
    type: "Government",
    stream: ["Engineering", "Research", "Technology"],
    rating: 4.6,
    reviewCount: 876,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Engineering", "Research", "Technology"],
  },
  {
    id: 6,
    name: "IIT Kharagpur",
    location: "Kharagpur",
    country: "India",
    ranking: 6,
    type: "Government",
    stream: ["Engineering", "Architecture", "Technology"],
    rating: 4.5,
    reviewCount: 1120,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Engineering", "Architecture", "Technology"],
  },
  {
    id: 7,
    name: "AIIMS Delhi",
    location: "New Delhi",
    country: "India",
    ranking: 7,
    type: "Government",
    stream: ["Medical", "Healthcare", "Research"],
    rating: 4.9,
    reviewCount: 932,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Medical", "Healthcare", "Research"],
  },
  {
    id: 8,
    name: "Jawaharlal Nehru University (JNU)",
    location: "New Delhi",
    country: "India",
    ranking: 8,
    type: "Government",
    stream: ["Arts", "Humanities", "Social Sciences"],
    rating: 4.7,
    reviewCount: 845,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Arts", "Humanities", "Social Sciences"],
  },
  {
    id: 9,
    name: "Banaras Hindu University (BHU)",
    location: "Varanasi",
    country: "India",
    ranking: 9,
    type: "Government",
    stream: ["Sciences", "Humanities", "Medicine"],
    rating: 4.4,
    reviewCount: 789,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Sciences", "Humanities", "Medicine"],
  },
  {
    id: 10,
    name: "University of Delhi (DU)",
    location: "Delhi",
    country: "India",
    ranking: 10,
    type: "Government",
    stream: ["Commerce", "Arts", "Law"],
    rating: 4.3,
    reviewCount: 1267,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Commerce", "Arts", "Law"],
  },
  {
    id: 11,
    name: "National Institute of Technology (NIT) Trichy",
    location: "Tamil Nadu",
    country: "India",
    ranking: 11,
    type: "Government",
    stream: ["Engineering", "Technology", "Sciences"],
    rating: 4.6,
    reviewCount: 912,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Engineering", "Technology", "Sciences"],
  },
  {
    id: 12,
    name: "IIT Roorkee",
    location: "Roorkee",
    country: "India",
    ranking: 12,
    type: "Government",
    stream: ["Civil Engineering", "Mechanical", "Earth Sciences"],
    rating: 4.5,
    reviewCount: 723,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Civil Engineering", "Mechanical", "Earth Sciences"],
  },
  {
    id: 13,
    name: "Indian Institute of Management (IIM) Ahmedabad",
    location: "Gujarat",
    country: "India",
    ranking: 13,
    type: "Government",
    stream: ["MBA", "Management", "Business"],
    rating: 4.8,
    reviewCount: 1056,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["MBA", "Management", "Business"],
  },
  {
    id: 14,
    name: "Vellore Institute of Technology (VIT)",
    location: "Vellore",
    country: "India",
    ranking: 14,
    type: "Private",
    stream: ["Engineering", "Technology", "Global"],
    rating: 4.2,
    reviewCount: 1432,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Engineering", "Technology", "Global"],
  },
  {
    id: 15,
    name: "Amrita Vishwa Vidyapeetham",
    location: "Coimbatore",
    country: "India",
    ranking: 15,
    type: "Private",
    stream: ["Engineering", "Research", "Technology"],
    rating: 4.3,
    reviewCount: 876,
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["Engineering", "Research", "Technology"],
  },
]

export default function CollegesList() {
  const [colleges, setColleges] = useState(mockColleges)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedStream, setSelectedStream] = useState("")
  const [rankingRange, setRankingRange] = useState([1, 15])
  const [showFilters, setShowFilters] = useState(false)
  const [activeView, setActiveView] = useState("grid")
  const [isLoading, setIsLoading] = useState(true)

  // Get unique countries, types, and streams for filters
  const countries = [...new Set(mockColleges.map((college) => college.country))]
  const types = [...new Set(mockColleges.map((college) => college.type))]
  const streams = [...new Set(mockColleges.flatMap((college) => college.stream))].sort()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter colleges based on search query and filters
    let filtered = [...mockColleges]

    if (searchQuery) {
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          college.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCountry) {
      filtered = filtered.filter((college) => college.country === selectedCountry)
    }

    if (selectedType) {
      filtered = filtered.filter((college) => college.type === selectedType)
    }

    if (selectedStream) {
      filtered = filtered.filter((college) => college.stream.includes(selectedStream))
    }

    filtered = filtered.filter((college) => college.ranking >= rankingRange[0] && college.ranking <= rankingRange[1])

    setColleges(filtered)
  }, [searchQuery, selectedCountry, selectedType, selectedStream, rankingRange])

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCountry("")
    setSelectedType("")
    setSelectedStream("")
    setRankingRange([1, 15])
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search colleges..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {(selectedCountry || selectedType || selectedStream || rankingRange[0] > 1 || rankingRange[1] < 15) && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                {[
                  selectedCountry ? 1 : 0,
                  selectedType ? 1 : 0,
                  selectedStream ? 1 : 0,
                  rankingRange[0] > 1 || rankingRange[1] < 15 ? 1 : 0,
                ].reduce((a, b) => a + b, 0)}
              </Badge>
            )}
          </Button>

          <Tabs defaultValue="grid" value={activeView} onValueChange={setActiveView}>
            <TabsList className="grid w-[160px] grid-cols-2">
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-card border rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Filters</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
              <X className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Stream</label>
              <Select value={selectedStream} onValueChange={setSelectedStream}>
                <SelectTrigger>
                  <SelectValue placeholder="All Streams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Streams</SelectItem>
                  {streams.map((stream) => (
                    <SelectItem key={stream} value={stream}>
                      {stream}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Ranking</label>
                <span className="text-sm text-muted-foreground">
                  {rankingRange[0]} - {rankingRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={[1, 15]}
                min={1}
                max={15}
                step={1}
                value={rankingRange}
                onValueChange={setRankingRange}
                className="py-4"
              />
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-6">
        <Tabs defaultValue="grid" value={activeView} onValueChange={setActiveView}>
          <TabsList className="grid w-[160px] grid-cols-2">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="mt-6">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {isLoading ? (
                // Skeleton loading state
                Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <motion.div key={`skeleton-${index}`} variants={item} className="h-full">
                      <div className="bg-card border rounded-lg overflow-hidden h-full animate-pulse">
                        <div className="h-40 bg-muted" />
                        <div className="p-4 space-y-3">
                          <div className="h-6 bg-muted rounded w-3/4" />
                          <div className="h-4 bg-muted rounded w-1/2" />
                          <div className="h-4 bg-muted rounded w-2/3" />
                          <div className="flex gap-2 pt-2">
                            <div className="h-6 bg-muted rounded w-16" />
                            <div className="h-6 bg-muted rounded w-16" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
              ) : colleges.length > 0 ? (
                colleges.map((college) => (
                  <motion.div key={college.id} variants={item} className="h-full">
                    <CollegeCard college={college} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No colleges found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <div className="space-y-4">
              {isLoading ? (
                // Skeleton loading state
                Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div key={`skeleton-${index}`} className="bg-card border rounded-lg overflow-hidden animate-pulse">
                      <div className="p-4 flex flex-col md:flex-row gap-4">
                        <div className="h-24 w-full md:w-40 bg-muted rounded" />
                        <div className="flex-1 space-y-3">
                          <div className="h-6 bg-muted rounded w-3/4" />
                          <div className="h-4 bg-muted rounded w-1/2" />
                          <div className="h-4 bg-muted rounded w-2/3" />
                          <div className="flex gap-2 pt-2">
                            <div className="h-6 bg-muted rounded w-16" />
                            <div className="h-6 bg-muted rounded w-16" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : colleges.length > 0 ? (
                colleges.map((college) => (
                  <motion.div
                    key={college.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border rounded-lg overflow-hidden"
                  >
                    <div className="p-4 flex flex-col md:flex-row gap-4">
                      <div className="h-40 md:h-auto md:w-48 rounded-md overflow-hidden">
                        <img
                          src={college.imageUrl || "/placeholder.svg"}
                          alt={college.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{college.name}</h3>
                        <p className="text-muted-foreground mb-2">
                          {college.location}, {college.country}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {college.stream.map((s) => (
                            <Badge key={s} variant="secondary" className="font-normal">
                              {s}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center">
                            <span className="font-medium mr-1">#{college.ranking}</span>
                            <span className="text-sm text-muted-foreground">Ranking</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-1">{college.rating}</span>
                            <span className="text-sm text-muted-foreground">({college.reviewCount} reviews)</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {college.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No colleges found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
