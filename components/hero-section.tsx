"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from "next/navigation"

// Mock data for Indian colleges
const colleges = [
  { id: 1, name: "Indian Institute of Technology (IIT) Madras" },
  { id: 2, name: "Indian Institute of Science (IISc) Bangalore" },
  { id: 3, name: "IIT Delhi" },
  { id: 4, name: "IIT Bombay" },
  { id: 5, name: "IIT Kanpur" },
  { id: 6, name: "IIT Kharagpur" },
  { id: 7, name: "AIIMS Delhi" },
  { id: 8, name: "Jawaharlal Nehru University (JNU)" },
  { id: 9, name: "Banaras Hindu University (BHU)" },
  { id: 10, name: "University of Delhi (DU)" },
  { id: 11, name: "National Institute of Technology (NIT) Trichy" },
  { id: 12, name: "IIT Roorkee" },
  { id: 13, name: "Indian Institute of Management (IIM) Ahmedabad" },
  { id: 14, name: "Vellore Institute of Technology (VIT)" },
  { id: 15, name: "Amrita Vishwa Vidyapeetham" },
]

const HeroSection = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Animation delay for hero content
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleSearch = () => {
    if (searchQuery) {
      setIsLoading(true)

      // Check if the search query matches any college name
      const matchedCollege = colleges.find((college) => college.name.toLowerCase() === searchQuery.toLowerCase())

      if (matchedCollege) {
        // If there's a match, redirect to that college's page
        router.push(`/college/${matchedCollege.id}`)
      } else {
        // If no exact match, redirect to colleges search page
        router.push(`/colleges?search=${encodeURIComponent(searchQuery)}`)
      }
    }
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
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-600 text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/4 h-60 w-60 rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-3xl"
        />
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Drop the Truth.
              <br />
              <span className="text-yellow-300">Stay Anonymous.</span>
            </motion.h1>

            <motion.p variants={item} className="text-lg sm:text-xl text-white/80 max-w-lg">
              Real, unfiltered college reviews from students who've been there. No sugar coating, just the tea you need
              before making your decision.
            </motion.p>

            <motion.div variants={item} className="relative max-w-md">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 h-5 w-5 text-white/70" />
                    <Input
                      placeholder="Search for a college..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onClick={() => setOpen(true)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleSearch()
                        }
                      }}
                      className="pl-10 pr-4 py-6 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 transition-all"
                      disabled={isLoading}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[calc(100vw-2rem)] sm:w-[400px]" align="start">
                  <Command>
                    <CommandInput placeholder="Search colleges..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Colleges">
                        {colleges
                          .filter((college) => college.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((college) => (
                            <CommandItem
                              key={college.id}
                              onSelect={() => {
                                setValue(college.name)
                                setSearchQuery(college.name)
                                setOpen(false)
                                // Immediately redirect to the college page when selected from dropdown
                                router.push(`/college/${college.id}`)
                              }}
                            >
                              {college.name}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-white/90"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Searching...</span>
                    <span className="animate-spin">⟳</span>
                  </>
                ) : (
                  <>
                    Find Your School
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Browse Top Reviews
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-yellow-500 rounded-2xl blur-xl opacity-30 animate-pulse-slow"></div>
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    UC
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold">UCLA</h3>
                    <div className="flex items-center text-yellow-300 text-sm">
                      ★★★★☆ <span className="text-white/70 ml-1">4.2/5</span>
                    </div>
                  </div>
                  <div className="ml-auto text-xs text-white/70">2h ago</div>
                </div>

                <p className="text-white/90 mb-4">
                  "The campus is gorgeous but parking is a NIGHTMARE. Literally spent more time looking for parking than
                  in class. Prof Johnson's lectures are fire tho, worth the struggle. Dining hall food is mid at best.
                  💀"
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="emoji-reaction bg-white/10 hover:bg-white/20">
                    🔥 <span className="ml-1">24</span>
                  </span>
                  <span className="emoji-reaction bg-white/10 hover:bg-white/20">
                    💀 <span className="ml-1">18</span>
                  </span>
                  <span className="emoji-reaction bg-white/10 hover:bg-white/20">
                    😭 <span className="ml-1">7</span>
                  </span>
                  <span className="emoji-reaction bg-white/10 hover:bg-white/20">
                    🤡 <span className="ml-1">3</span>
                  </span>
                </div>

                <div className="text-xs text-white/60">Posted by Anonymous Student</div>
              </motion.div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-float"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
