import { Skeleton } from '@/components/ui/skeleton';

export default function ContactLoading() {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Page Header Skeleton */}
      <div className="bg-gradient-to-r from-brand-secondary to-brand-secondary/90 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-48 bg-white/10" />
          <Skeleton className="mt-4 h-6 w-80 max-w-full bg-white/10" />
        </div>
      </div>

      {/* Breadcrumb Skeleton */}
      <div className="bg-neutral-50 border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Contact Content Skeleton */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-56" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 rounded-xl border border-neutral-200 p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
            <Skeleton className="h-12 w-36 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
