const CollegeDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-10 w-32 skeleton mb-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="review-card overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <div className="h-8 w-48 skeleton mb-2"></div>
                  <div className="h-4 w-32 skeleton"></div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="h-10 w-16 skeleton mb-1"></div>
                  <div className="h-4 w-24 skeleton"></div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="h-8 w-64 skeleton mb-4"></div>

              <div className="space-y-3 mb-6">
                <div className="h-4 w-full skeleton"></div>
                <div className="h-4 w-full skeleton"></div>
                <div className="h-4 w-3/4 skeleton"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="space-y-1">
                      <div className="h-4 w-16 skeleton"></div>
                      <div className="h-6 w-24 skeleton"></div>
                    </div>
                  ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="h-6 w-20 rounded-full skeleton"></div>
                  ))}
              </div>

              <div className="h-px w-full skeleton my-6"></div>

              <div className="space-y-4">
                <div className="h-6 w-40 skeleton mb-4"></div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="h-4 w-20 skeleton"></div>
                          <div className="h-4 w-8 skeleton"></div>
                        </div>
                        <div className="h-2 w-full skeleton rounded-full"></div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="review-card overflow-hidden">
            <div className="p-6 border-b">
              <div className="h-6 w-32 skeleton"></div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="h-4 w-32 skeleton"></div>
                      <div className="h-6 w-16 rounded-full skeleton"></div>
                    </div>
                  ))}
              </div>

              <div className="h-px w-full skeleton my-4"></div>

              <div className="space-y-2">
                <div className="h-5 w-32 skeleton"></div>
                <div className="space-y-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="h-4 w-full skeleton"></div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollegeDetailSkeleton
