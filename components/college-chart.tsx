"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, type TooltipProps } from "recharts"
import { useTheme } from "next-themes"

interface RatingTrend {
  month: string
  rating: number
}

interface CollegeChartProps {
  data: RatingTrend[]
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border p-3 rounded-md shadow-md">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          Rating: <span className="text-primary font-medium">{payload[0].value}</span>
        </p>
      </div>
    )
  }

  return null
}

const CollegeChart = ({ data }: CollegeChartProps) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[300px] w-full skeleton"></div>
  }

  const isDark = theme === "dark"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
          <XAxis dataKey="month" stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} />
          <YAxis
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
            stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default CollegeChart
