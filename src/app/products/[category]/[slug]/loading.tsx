import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailLoading() {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Breadcrumb Skeleton */}
      <div className="bg-neutral-50 border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      </div>

      {/* Product Detail Skeleton */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Back link */}
        <Skeleton className="h-5 w-40 mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />

            <div className="border-t border-b border-neutral-200 py-4">
              <Skeleton className="h-5 w-48" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-6 w-32" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-64" />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Skeleton className="h-6 w-32" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-7 w-24 rounded-full" />
                ))}
              </div>
            </div>

            <Skeleton className="h-12 w-48 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
