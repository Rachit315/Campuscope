"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PollOption {
  id: string
  text: string
  votes: number
}

interface InstantPollProps {
  id: string
  question: string
  options: PollOption[]
  totalVotes?: number
  onVote?: (pollId: string, optionId: string) => void
  className?: string
}

export default function InstantPoll({
  id,
  question,
  options: initialOptions,
  totalVotes: initialTotalVotes,
  onVote,
  className = "",
}: InstantPollProps) {
  const [options, setOptions] = useState<PollOption[]>(initialOptions)
  const [totalVotes, setTotalVotes] = useState(
    initialTotalVotes || initialOptions.reduce((sum, option) => sum + option.votes, 0),
  )
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Check if user has already voted in localStorage
  useEffect(() => {
    const storedVote = localStorage.getItem(`poll_${id}`)
    if (storedVote) {
      setSelectedOption(storedVote)
      setHasVoted(true)
      setShowResults(true)
    }
  }, [id])

  // Simulate real-time updates with random votes every 5-10 seconds
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (Math.random() > 0.7) {
          // 30% chance of a new vote
          const randomOptionIndex = Math.floor(Math.random() * options.length)

          setOptions((prevOptions) => {
            const newOptions = [...prevOptions]
            newOptions[randomOptionIndex] = {
              ...newOptions[randomOptionIndex],
              votes: newOptions[randomOptionIndex].votes + 1,
            }
            return newOptions
          })

          setTotalVotes((prev) => prev + 1)
        }
      },
      Math.random() * 5000 + 5000,
    ) // Random interval between 5-10 seconds

    return () => clearInterval(interval)
  }, [options.length])

  const handleVote = (optionId: string) => {
    if (hasVoted) return

    setSelectedOption(optionId)

    // Update local state
    setOptions((prevOptions) =>
      prevOptions.map((option) => (option.id === optionId ? { ...option, votes: option.votes + 1 } : option)),
    )

    setTotalVotes((prev) => prev + 1)
    setHasVoted(true)
    setShowResults(true)

    // Save vote to localStorage
    localStorage.setItem(`poll_${id}`, optionId)

    // Call onVote callback if provided
    onVote?.(id, optionId)
  }

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0
    return Math.round((votes / totalVotes) * 100)
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{question}</CardTitle>
            <CardDescription>
              {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => setShowResults(!showResults)}
          >
            <BarChart2 className="h-4 w-4 mr-1" />
            {showResults ? "Hide" : "Show"} Results
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {options.map((option) => {
            const percentage = getPercentage(option.votes)
            const isSelected = selectedOption === option.id
            const isWinning = Math.max(...options.map((o) => o.votes)) === option.votes && option.votes > 0

            return (
              <div key={option.id} className="relative">
                <Button
                  variant={isSelected ? "default" : "outline"}
                  className={`w-full justify-start h-auto py-3 ${hasVoted ? "cursor-default" : ""}`}
                  onClick={() => !hasVoted && handleVote(option.id)}
                  disabled={hasVoted}
                >
                  <div className="flex items-center w-full">
                    <div className="mr-2 flex-shrink-0">
                      {isSelected ? (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                      )}
                    </div>
                    <span>{option.text}</span>

                    {showResults && <span className="ml-auto text-sm font-medium">{percentage}%</span>}
                  </div>
                </Button>

                {showResults && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`absolute left-0 bottom-0 h-1 ${isSelected ? "bg-primary" : "bg-muted"}`}
                      style={{ borderRadius: "0 0 0.375rem 0.375rem" }}
                    />
                  </AnimatePresence>
                )}

                {showResults && isWinning && option.votes > 0 && (
                  <Badge className="absolute -right-2 -top-2 text-xs" variant="default">
                    Leading
                  </Badge>
                )}
              </div>
            )
          })}
        </div>

        {hasVoted && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Thanks for voting! {showResults ? "Results are live." : ""}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
