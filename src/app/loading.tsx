import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Page Header Skeleton */}
      <div className="bg-gradient-to-r from-brand-secondary to-brand-secondary/90 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-72 bg-white/10" />
          <Skeleton className="mt-4 h-6 w-96 max-w-full bg-white/10" />
        </div>
      </div>

      {/* Breadcrumb Skeleton */}
      <div className="bg-neutral-50 border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-neutral-200 overflow-hidden">
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
