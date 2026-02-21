import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-neutral-200', className)}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-card border border-neutral-200 p-4">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="mt-4 h-5 w-3/4" />
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-1 h-4 w-2/3" />
      <Skeleton className="mt-4 h-10 w-full rounded-button" />
    </div>
  );
}
