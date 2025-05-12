import { Skeleton } from "@/components/ui/skeleton"

export default function PrivacyPolicyLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Skeleton className="h-6 w-24" />
      </div>

      <div className="space-y-8">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>

        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}

        <div className="text-center mt-12 pt-8 border-t">
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    </div>
  )
}
