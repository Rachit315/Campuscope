import HeroSection from "@/components/hero-section"
import TrendingReviews from "@/components/trending-reviews"
import FeaturedColleges from "@/components/featured-colleges"
import TestimonialSection from "@/components/testimonial-section"
import LiveFeed from "@/components/live-feed"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrendingReviews />
      <FeaturedColleges />
      <LiveFeed />
      <TestimonialSection />
    </div>
  )
}
