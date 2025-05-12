"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    quote:
      "CampuScope helped me find the real vibe of my dream school before I committed. The anonymous reviews were brutally honest and exactly what I needed.",
    author: "Freshman at UCLA",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    quote:
      "I was torn between two schools until I read the reviews on CampuScope. Students were keeping it 100 about the dorms, which helped me dodge a bullet.",
    author: "Junior at NYU",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    quote:
      "The anonymous format lets people speak their truth. I've seen reviews mention issues that no college tour would ever show you.",
    author: "Senior at Michigan State",
    avatar: "/placeholder.svg?height=50&width=50",
  },
]

const TestimonialSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"} className="space-y-8">
          <motion.div variants={item} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Students Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              CampuScope is changing how students choose their colleges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={item}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="h-8 w-8 text-primary/40 mb-4" />

                    <p className="text-foreground/90 flex-grow mb-6 italic">"{testimonial.quote}"</p>

                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <p className="font-medium">{testimonial.author}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialSection
