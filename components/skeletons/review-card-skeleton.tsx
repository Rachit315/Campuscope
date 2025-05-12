const ReviewCardSkeleton = () => {
  return (
    <div className="review-card overflow-hidden h-full flex flex-col">
      <div className="p-5">
        <div className="flex items-center pb-3">
          <div className="w-10 h-10 rounded-full skeleton"></div>
          <div className="ml-3 flex-1">
            <div className="h-5 w-32 skeleton mb-1"></div>
            <div className="h-4 w-24 skeleton"></div>
          </div>
          <div className="h-4 w-12 skeleton"></div>
        </div>

        <div className="space-y-2 py-3">
          <div className="h-4 w-full skeleton"></div>
          <div className="h-4 w-full skeleton"></div>
          <div className="h-4 w-3/4 skeleton"></div>
        </div>

        <div className="pt-3">
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="h-8 w-16 rounded-full skeleton"></div>
            <div className="h-8 w-16 rounded-full skeleton"></div>
            <div className="h-8 w-16 rounded-full skeleton"></div>
          </div>
          <div className="h-4 w-40 skeleton"></div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCardSkeleton
