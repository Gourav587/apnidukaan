import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => (
  <div>
    {/* Announcement bar skeleton */}
    <div className="bg-primary/10 py-2 flex justify-center">
      <Skeleton className="h-4 w-64" />
    </div>

    {/* Hero skeleton */}
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto flex flex-col items-center gap-4 text-center">
        <Skeleton className="h-8 w-48 rounded-full" />
        <Skeleton className="h-12 w-80 md:w-[28rem]" />
        <Skeleton className="h-6 w-64 md:w-80" />
        <div className="mt-4 flex gap-3">
          <Skeleton className="h-12 w-36 rounded-xl" />
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>
      </div>
    </section>

    {/* Stats skeleton */}
    <section className="border-b bg-card py-8">
      <div className="container grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    </section>

    {/* Product grid skeleton */}
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-xl border bg-card">
              <Skeleton className="aspect-square w-full" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex items-center justify-between pt-2">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-8 w-16 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default HeroSkeleton;
