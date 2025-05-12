import type { Metadata } from "next"
import TrendingReviews from "@/components/trending-reviews"
import TrendingColleges from "@/components/trending-colleges"

export const metadata: Metadata = {
  title: "Trending | CampuScope",
  description: "Discover trending colleges and reviews from students around the world",
}

export default function TrendingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Trending</h1>
          <p className="text-muted-foreground">
            Discover what's hot in the college world. See trending reviews, popular colleges, and the latest campus
            buzz.
          </p>
        </div>

        <div className="space-y-16">
          <TrendingColleges />
          <TrendingReviews />
        </div>
      </div>
    </main>
  )
}
