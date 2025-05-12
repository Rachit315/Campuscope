"use client"

import React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface HeatmapData {
  day: string
  hour: string
  value: number
}

interface ReviewHeatmapProps {
  data: HeatmapData[]
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hours = ["8AM", "12PM", "4PM", "8PM"]

const ReviewHeatmap = ({ data }: ReviewHeatmapProps) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[200px] w-full skeleton"></div>
  }

  const isDark = theme === "dark"
  const maxValue = Math.max(...data.map((d) => d.value))

  const getColor = (value: number) => {
    const intensity = value / maxValue

    if (isDark) {
      // Dark theme: purple to white gradient
      return `rgba(147, 51, 234, ${intensity * 0.9 + 0.1})`
    } else {
      // Light theme: light purple to dark purple gradient
      return `rgba(147, 51, 234, ${intensity * 0.8 + 0.2})`
    }
  }

  const getValue = (day: string, hour: string) => {
    const item = data.find((d) => d.day === day && d.hour === hour)
    return item ? item.value : 0
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[500px]">
        <div className="grid grid-cols-[auto_repeat(4,1fr)] gap-2">
          <div className="h-8"></div> {/* Empty top-left cell */}
          {hours.map((hour) => (
            <div key={hour} className="text-center text-sm text-muted-foreground font-medium">
              {hour}
            </div>
          ))}
          {days.map((day) => (
            <React.Fragment key={day}>
              <div className="flex items-center text-sm text-muted-foreground font-medium">{day}</div>
              {hours.map((hour) => {
                const value = getValue(day, hour)
                return (
                  <motion.div
                    key={`${day}-${hour}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: days.indexOf(day) * 0.05 + hours.indexOf(hour) * 0.05 }}
                    className="h-12 rounded-md flex items-center justify-center text-xs font-medium"
                    style={{
                      backgroundColor: getColor(value),
                      color: value > maxValue * 0.7 ? "white" : isDark ? "white" : "black",
                    }}
                  >
                    {value > 0 ? value : ""}
                  </motion.div>
                )
              })}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Low</span>
            <div className="flex space-x-1">
              {[0.2, 0.4, 0.6, 0.8, 1].map((intensity) => (
                <div
                  key={intensity}
                  className="w-5 h-5 rounded"
                  style={{ backgroundColor: getColor(intensity * maxValue) }}
                ></div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">High</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewHeatmap
