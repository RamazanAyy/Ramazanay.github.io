'use client';
import { useState, useCallback, useEffect } from 'react';

type SortOption = 'default' | 'name-asc' | 'name-desc';

interface FilterBarProps {
  series: string[];
  sizes: string[];
  onFilter: (filters: {
    activeSeries: string | null;
    activeSize: string | null;
    sort: SortOption;
  }) => void;
}

export default function FilterBar({ series, sizes, onFilter }: FilterBarProps) {
  const [activeSeries, setActiveSeries] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>('default');

  const notify = useCallback(
    (s: string | null, sz: string | null, so: SortOption) => {
      onFilter({ activeSeries: s, activeSize: sz, sort: so });
    },
    [onFilter],
  );

  useEffect(() => {
    notify(activeSeries, activeSize, sort);
  }, [activeSeries, activeSize, sort, notify]);

  const handleSeriesClick = (s: string) => {
    const next = activeSeries === s ? null : s;
    setActiveSeries(next);
  };

  const handleSizeClick = (s: string) => {
    const next = activeSize === s ? null : s;
    setActiveSize(next);
  };

  const resetAll = () => {
    setActiveSeries(null);
    setActiveSize(null);
    setSort('default');
  };

  const hasActiveFilters = activeSeries !== null || activeSize !== null || sort !== 'default';

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 sm:p-5 space-y-4">
      {/* Series filters */}
      {series.length > 0 && (
        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Seri
          </span>
          <div className="flex flex-wrap gap-2">
            {series.map((s) => (
              <button
                key={s}
                onClick={() => handleSeriesClick(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSeries === s
                    ? 'bg-[#1a5fa8] text-white shadow-sm shadow-[#1a5fa8]/25'
                    : 'bg-[#f4f7fb] text-[#0d2d5e] hover:bg-[#1a5fa8]/10'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size filters */}
      {sizes.length > 0 && (
        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Beden / Boyut
          </span>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => handleSizeClick(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSize === s
                    ? 'bg-[#00b4c8] text-white shadow-sm shadow-[#00b4c8]/25'
                    : 'bg-[#f4f7fb] text-[#0d2d5e] hover:bg-[#00b4c8]/10'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sort + reset row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Siralama
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-lg border border-gray-200 bg-[#f4f7fb] px-3 py-2 text-sm text-[#0d2d5e] focus:outline-none focus:ring-2 focus:ring-[#1a5fa8]/30 focus:border-[#1a5fa8] transition-colors"
          >
            <option value="default">Varsayilan</option>
            <option value="name-asc">A - Z</option>
            <option value="name-desc">Z - A</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Filtreleri Temizle
          </button>
        )}
      </div>
    </div>
  );
}
