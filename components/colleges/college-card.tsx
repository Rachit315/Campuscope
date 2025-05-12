import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"

interface CollegeCardProps {
  college: {
    id: number
    name: string
    location: string
    country: string
    ranking: number
    type: string
    stream: string[]
    rating: number
    reviewCount: number
    imageUrl: string
    tags: string[]
  }
}

export default function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Link href={`/college/${college.id}`}>
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md hover:border-primary/50">
        <div className="relative h-40 overflow-hidden">
          <img
            src={college.imageUrl || "/placeholder.svg"}
            alt={college.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="font-medium">
              #{college.ranking}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-1 line-clamp-1">{college.name}</h3>
          <p className="text-muted-foreground mb-2 text-sm">
            {college.location}, {college.country}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {college.stream.slice(0, 2).map((stream) => (
              <Badge key={stream} variant="outline" className="font-normal text-xs">
                {stream}
              </Badge>
            ))}
            {college.stream.length > 2 && (
              <Badge variant="outline" className="font-normal text-xs">
                +{college.stream.length - 2}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{college.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({college.reviewCount} reviews)</span>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t bg-muted/50 flex flex-wrap gap-1">
          {college.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs">
              {tag}
            </span>
          ))}
        </CardFooter>
      </Card>
    </Link>
  )
}
