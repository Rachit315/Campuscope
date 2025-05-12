const CollegeCardSkeleton = () => {
  return (
    <div className="review-card overflow-hidden h-full flex flex-col p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-md skeleton"></div>
        <div className="ml-3">
          <div className="h-5 w-32 skeleton mb-1"></div>
          <div className="h-4 w-24 skeleton"></div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-24 skeleton"></div>
        <div className="h-4 w-20 skeleton"></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 w-20 rounded-full skeleton"></div>
        <div className="h-6 w-24 rounded-full skeleton"></div>
        <div className="h-6 w-16 rounded-full skeleton"></div>
      </div>

      <div className="h-10 w-full rounded-md skeleton mt-auto"></div>
    </div>
  )
}

export default CollegeCardSkeleton
