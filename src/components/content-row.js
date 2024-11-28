export function ContentRow({ title, children }) {
  return (
    <div className="space-y-4 py-4">
      <h2 className="text-xl font-semibold text-white px-4">{title}</h2>
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto px-4 scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
