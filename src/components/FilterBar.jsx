import { useState } from 'react';

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'px-2.5 py-1 rounded-md text-xs font-sans border transition-colors ' +
        (active
          ? 'bg-accent text-white border-accent'
          : 'bg-white text-ink border-line hover:bg-neutral-50')
      }
    >
      {children}
    </button>
  );
}

export default function FilterBar({
  filters,
  setFilters,
  sort,
  setSort,
  availableDates,
  participants,
  categories,
  defaultFilters,
  defaultSort,
}) {
  const [open, setOpen] = useState(false);

  const togglePerson = (p) => {
    setFilters((f) => ({
      ...f,
      people: f.people.includes(p)
        ? f.people.filter((x) => x !== p)
        : [...f.people, p],
    }));
  };

  const toggleCategory = (c) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(c)
        ? f.categories.filter((x) => x !== c)
        : [...f.categories, c],
    }));
  };

  const reset = () => {
    setFilters(defaultFilters);
    setSort(defaultSort);
  };

  const activeCount =
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0) +
    (filters.people.length > 0 ? 1 : 0) +
    (filters.categories.length > 0 ? 1 : 0);

  return (
    <section className="mb-5 rounded-md border border-line bg-section">
      <header className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 font-sans text-sm text-ink"
        >
          <span>Filters & sort</span>
          {activeCount > 0 && (
            <span className="rounded-full bg-accent text-white text-xs px-2 py-0.5 font-sans tabular-nums">
              {activeCount}
            </span>
          )}
          <span className="text-muted text-xs">{open ? '▲' : '▼'}</span>
        </button>
        <div className="flex items-center gap-3">
          <label className="font-sans text-xs text-muted hidden sm:inline">
            Sort
          </label>
          <select
            value={sort.key}
            onChange={(e) => setSort((s) => ({ ...s, key: e.target.value }))}
            className="font-sans text-sm rounded-md border border-line bg-white px-2 py-1"
          >
            <option value="date">Date</option>
            <option value="total">Amount</option>
            <option value="payer">Payer</option>
          </select>
          <button
            type="button"
            onClick={() =>
              setSort((s) => ({ ...s, dir: s.dir === 'asc' ? 'desc' : 'asc' }))
            }
            className="font-sans text-sm rounded-md border border-line bg-white px-2 py-1 hover:bg-neutral-50"
            aria-label="Toggle sort direction"
          >
            {sort.dir === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </header>

      {open && (
        <div className="border-t border-line px-4 py-4 space-y-4">
          <div>
            <p className="font-sans text-xs text-muted mb-2">Date</p>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, dateFrom: e.target.value }))
                }
                className="font-sans text-sm rounded-md border border-line bg-white px-2 py-1"
              >
                <option value="">From…</option>
                {availableDates.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <span className="text-muted text-xs font-sans">to</span>
              <select
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, dateTo: e.target.value }))
                }
                className="font-sans text-sm rounded-md border border-line bg-white px-2 py-1"
              >
                <option value="">To…</option>
                {availableDates.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-sans text-xs text-muted">Person</p>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setFilters((f) => ({ ...f, personMode: 'involved' }))
                  }
                  className={
                    'px-2 py-0.5 rounded text-xs font-sans ' +
                    (filters.personMode === 'involved'
                      ? 'bg-ink text-white'
                      : 'text-muted hover:text-ink')
                  }
                >
                  Involved
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFilters((f) => ({ ...f, personMode: 'paid' }))
                  }
                  className={
                    'px-2 py-0.5 rounded text-xs font-sans ' +
                    (filters.personMode === 'paid'
                      ? 'bg-ink text-white'
                      : 'text-muted hover:text-ink')
                  }
                >
                  Paid
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {participants.map((p) => (
                <Chip
                  key={p}
                  active={filters.people.includes(p)}
                  onClick={() => togglePerson(p)}
                >
                  {p}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <p className="font-sans text-xs text-muted mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Chip
                  key={c}
                  active={filters.categories.includes(c)}
                  onClick={() => toggleCategory(c)}
                >
                  {c}
                </Chip>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={reset}
              className="font-sans text-xs text-muted hover:text-ink underline underline-offset-2"
            >
              Reset all
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
