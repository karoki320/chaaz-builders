export default function ShopLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse">
      <div className="h-4 w-32 bg-neutral-200 rounded mb-4" />
      <div className="h-8 w-56 bg-neutral-200 rounded mb-6" />
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-20 bg-neutral-200 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl3 bg-white shadow-soft overflow-hidden">
            <div className="h-40 bg-neutral-200" />
            <div className="p-4 space-y-2">
              <div className="h-3 bg-neutral-200 rounded w-3/4" />
              <div className="h-4 bg-neutral-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
