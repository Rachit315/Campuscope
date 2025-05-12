import { Suspense } from "react"
import type { Metadata } from "next"
import CollegesList from "@/components/colleges/colleges-list"
import CollegesListSkeleton from "@/components/skeletons/colleges-list-skeleton"

export const metadata: Metadata = {
  title: "Colleges | CampuScope",
  description: "Explore and discover colleges from around the world",
}

export default function CollegesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Colleges</h1>
          <p className="text-muted-foreground">
            Explore and discover colleges from around the world. Filter by location, ranking, and more.
          </p>
        </div>

        <Suspense fallback={<CollegesListSkeleton />}>
          <CollegesList />
        </Suspense>
      </div>
    </main>
  )
}
