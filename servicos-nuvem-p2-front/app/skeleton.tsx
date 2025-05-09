import { Skeleton } from "@/components/ui/skeleton"

export function MovieCardSkeleton() {
    return (
        <div className="overflow-hidden w-[24%] aspect-[6/11] gap-2 bg-background p-0">
            <Skeleton className="w-full h-full"/>
        </div>
    )
}

export function MovieFeaturedSkeleton() {
    return (
        <div className="overflow-hidden w-full h-[300px] bg-background p-0">
            <Skeleton className="w-full h-full" />
        </div>
    )
}