"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, ThumbsUp, MessageSquare, TrendingUp } from "lucide-react"

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Reviews",
      value: "12",
      icon: <MessageSquare className="h-5 w-5" />,
      change: "+3 this month",
      trend: "up",
    },
    {
      title: "Review Views",
      value: "1,248",
      icon: <Eye className="h-5 w-5" />,
      change: "+22% from last month",
      trend: "up",
    },
    {
      title: "Reactions Received",
      value: "342",
      icon: <ThumbsUp className="h-5 w-5" />,
      change: "+18% from last month",
      trend: "up",
    },
    {
      title: "Trending Reviews",
      value: "2",
      icon: <TrendingUp className="h-5 w-5" />,
      change: "Currently trending",
      trend: "neutral",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">{stat.title}</span>
                <div className="p-2 bg-primary/10 rounded-full text-primary">{stat.icon}</div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div
                className={`text-xs ${
                  stat.trend === "up"
                    ? "text-green-500 dark:text-green-400"
                    : stat.trend === "down"
                      ? "text-red-500 dark:text-red-400"
                      : "text-muted-foreground"
                }`}
              >
                {stat.change}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default DashboardStats
