export default function CollegesListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <div className="h-10 bg-muted rounded-md animate-pulse" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-10 w-24 bg-muted rounded-md animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={`skeleton-${index}`} className="bg-card border rounded-lg overflow-hidden h-full animate-pulse">
              <div className="h-40 bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-2/3" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 bg-muted rounded w-16" />
                  <div className="h-6 bg-muted rounded w-16" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
