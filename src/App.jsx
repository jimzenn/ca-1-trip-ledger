import { useMemo, useState } from 'react';
import { participants, transactions } from './data.js';
import { parseDate } from './settle.js';
import FilterBar from './components/FilterBar.jsx';
import TransactionList from './components/TransactionList.jsx';
import PersonDetail from './components/PersonDetail.jsx';
import SettleSummary from './components/SettleSummary.jsx';

const TABS = [
  { id: 'all', label: 'All Transactions' },
  { id: 'person', label: 'Per Person' },
  { id: 'settle', label: 'Settle Up' },
];

const CATEGORIES = ['transport', 'lodging', 'meal', 'credit'];

const DEFAULT_FILTERS = {
  dateFrom: '',
  dateTo: '',
  people: [],
  personMode: 'involved', // 'involved' | 'paid'
  categories: [],
};

const DEFAULT_SORT = { key: 'date', dir: 'desc' };

export default function App() {
  const [tab, setTab] = useState('all');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState(DEFAULT_SORT);

  const availableDates = useMemo(() => {
    const set = new Set(transactions.map((t) => t.date));
    return [...set].sort((a, b) => parseDate(a) - parseDate(b));
  }, []);

  const filteredTx = useMemo(() => {
    const dFromNum = filters.dateFrom ? parseDate(filters.dateFrom) : null;
    const dToNum = filters.dateTo ? parseDate(filters.dateTo) : null;

    return transactions.filter((t) => {
      const dNum = parseDate(t.date);
      if (dFromNum !== null && dNum < dFromNum) return false;
      if (dToNum !== null && dNum > dToNum) return false;

      if (filters.people.length > 0) {
        if (filters.personMode === 'paid') {
          if (!filters.people.includes(t.payer)) return false;
        } else {
          const overlap = filters.people.some((p) => t.participants.includes(p));
          if (!overlap) return false;
        }
      }

      if (filters.categories.length > 0 && !filters.categories.includes(t.category)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const sortedTx = useMemo(() => {
    const arr = [...filteredTx];
    const mul = sort.dir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      if (sort.key === 'date') {
        return (parseDate(a.date) - parseDate(b.date)) * mul;
      }
      if (sort.key === 'total') {
        return (Math.abs(a.total) - Math.abs(b.total)) * mul;
      }
      if (sort.key === 'payer') {
        return a.payer.localeCompare(b.payer) * mul;
      }
      return 0;
    });
    return arr;
  }, [filteredTx, sort]);

  return (
    <div className="min-h-screen bg-page text-ink">
      <header className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-6">
          <h1 className="text-2xl sm:text-3xl">
            California Coast Trip Ledger
          </h1>
          <p className="mt-1 text-sm text-muted font-sans">
            May 2026 · 6 travelers · {transactions.length} transactions
          </p>
        </div>
        <nav className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto -mb-px">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={
                    'whitespace-nowrap px-3 py-2 text-sm font-sans border-b-2 transition-colors ' +
                    (active
                      ? 'border-accent text-accent'
                      : 'border-transparent text-muted hover:text-ink')
                  }
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-8">
        {tab === 'all' && (
          <>
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              sort={sort}
              setSort={setSort}
              availableDates={availableDates}
              participants={participants}
              categories={CATEGORIES}
              defaultFilters={DEFAULT_FILTERS}
              defaultSort={DEFAULT_SORT}
            />
            <TransactionList transactions={sortedTx} />
          </>
        )}
        {tab === 'person' && (
          <PersonDetail
            participants={participants}
            transactions={transactions}
          />
        )}
        {tab === 'settle' && (
          <SettleSummary
            participants={participants}
            transactions={transactions}
          />
        )}
      </main>

      <footer className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
        <p className="text-xs text-muted font-sans">
          Numbers come from <code>src/data.js</code>. Source of truth for what each
          person owes is the per-transaction <code>shares</code> map.
        </p>
      </footer>
    </div>
  );
}
