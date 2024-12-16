import { Skeleton } from "@/components/ui/skeleton"

export function CustomSkeletonDemo() {
    return (
        <Skeleton className="bg-transparent flex items-center space-x-4 self-center h-screen w-screen justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            <div className="bg-gray-200 rounded text-center">Loading</div>
        </Skeleton>
    )
}