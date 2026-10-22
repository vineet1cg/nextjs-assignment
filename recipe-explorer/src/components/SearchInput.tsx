interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  sortBy = "recent",
  onSortChange,
  placeholder = "Search recipes or ingredients...",
}: SearchInputProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <span className="text-base font-bold leading-none">×</span>
          </button>
        )}
      </div>

      {onSortChange && (
        <div className="flex items-center gap-2 shrink-0 text-xs text-slate-500 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
          <label htmlFor="sort-select" className="whitespace-nowrap font-medium text-slate-600">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-700 focus:outline-hidden focus:border-emerald-500"
          >
            <option value="recent">Most recent</option>
            <option value="time-asc">Prep time (fastest)</option>
            <option value="name-asc">Alphabetical (A-Z)</option>
          </select>
        </div>
      )}
    </div>
  );
}
