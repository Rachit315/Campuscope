"use client"

import type React from "react"
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

interface ChartContainerProps {
  children: React.ReactNode
  className?: string
  config?: any
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children, className = "", config }) => {
  return (
    <div className={`relative ${className}`}>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </div>
  )
}

interface ChartTooltipContentProps {
  payload: any[]
  label: string
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({ payload, label }) => {
  if (!payload || payload.length === 0) {
    return null
  }

  return (
    <div className="rounded-md border bg-popover p-4 text-popover-foreground shadow-sm">
      <div className="mb-2 font-medium">{label}</div>
      <ul className="grid gap-1">
        {payload.map((item, index) => (
          <li key={index} className="grid grid-cols-[100px_minmax(120px,_1fr)] items-center gap-2 text-sm">
            <span className="text-muted-foreground">{item.dataKey}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const ChartTooltip = ({ children }: { children?: React.ReactNode }) => {
  return <Tooltip content={children} />
}

export const Chart = ({ children }: { children: React.ReactNode }) => {
  return <RechartsLineChart>{children}</RechartsLineChart>
}

export { Line, XAxis, YAxis }
export const LineChart = RechartsLineChart
