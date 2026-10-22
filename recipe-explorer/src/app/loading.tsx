export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-slate-200 rounded-md w-1/4"></div>
        <div className="h-4 bg-slate-200 rounded-md w-1/2"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
              <div className="aspect-4/3 bg-slate-200 rounded-md"></div>
              <div className="h-4 bg-slate-200 rounded-md w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded-md w-full"></div>
              <div className="h-3 bg-slate-200 rounded-md w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
