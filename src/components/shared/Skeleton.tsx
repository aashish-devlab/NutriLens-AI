import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-white/5 border border-white/5",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 space-y-4 rounded-[2.5rem] bg-white/5 border border-white/10">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[60%]" />
        <Skeleton className="h-3 w-[40%]" />
      </div>
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
