import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutLoading() {
  return (
    <div className="container max-w-5xl py-10 space-y-10">
      <div className="space-y-4">
        <Skeleton className="h-12 w-[300px]" />
        <Skeleton className="h-6 w-full max-w-[600px]" />
      </div>

      <Tabs defaultValue="project" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="project" disabled>
            The Project
          </TabsTrigger>
          <TabsTrigger value="developer" disabled>
            The Developer
          </TabsTrigger>
        </TabsList>
        <TabsContent value="project" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[250px]" />
              <Skeleton className="h-4 w-[350px]" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Skeleton className="h-5 w-[150px] mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div>
                <Skeleton className="h-5 w-[150px] mb-2" />
                <div className="space-y-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                </div>
              </div>

              <div>
                <Skeleton className="h-5 w-[150px] mb-2" />
                <div className="grid gap-4 md:grid-cols-3">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Card key={i}>
                        <CardHeader className="pb-2">
                          <Skeleton className="h-5 w-[100px]" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-4 w-full mb-1" />
                          <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              <div>
                <Skeleton className="h-5 w-[150px] mb-2" />
                <div className="space-y-4">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="pl-6 border-l-2 border-primary/20">
                        <Skeleton className="h-5 w-[120px] mb-1" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Skeleton className="h-10 w-[200px]" />
      </div>
    </div>
  )
}
