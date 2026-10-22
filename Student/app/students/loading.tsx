import { GridSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-100" />
      <div className="mt-8 h-32 animate-pulse rounded-xl bg-slate-100" />
      <div className="mt-6">
        <GridSkeleton />
      </div>
    </div>
  );
}
