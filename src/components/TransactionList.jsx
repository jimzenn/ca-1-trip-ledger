import { useState } from 'react';
import { iconFor } from '../settle.js';
import { useCurrency } from '../currency.jsx';

function CategoryLabel({ category, subcategory }) {
  const parts = [category];
  if (subcategory) parts.push(subcategory);
  return (
    <span className="font-sans text-xs text-muted">
      <span aria-hidden="true" className="mr-1">{iconFor(category)}</span>
      {parts.join(' · ')}
    </span>
  );
}

function TransactionRow({ tx }) {
  const [open, setOpen] = useState(false);
  const { format } = useCurrency();
  const isCredit = tx.total < 0;

  return (
    <li className="border-b border-line last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-4 py-4 hover:bg-neutral-50 transition-colors"
      >
        <div className="flex items-start gap-3">
          <div className="font-sans text-xs text-muted w-10 tabular-nums shrink-0 pt-0.5">
            {tx.date}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate">{tx.venue}</p>
                <p className="mt-0.5">
                  <CategoryLabel
                    category={tx.category}
                    subcategory={tx.subcategory}
                  />
                </p>
              </div>
              <div
                className={
                  'tabular-nums shrink-0 ' +
                  (isCredit ? 'text-positive' : 'text-ink')
                }
              >
                {format(tx.total)}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-sans text-xs text-muted">
                paid by{' '}
                <span className="text-ink">{tx.payer}</span>
              </span>
              <span className="font-sans text-xs text-muted">·</span>
              <div className="flex flex-wrap gap-1">
                {tx.participants.map((p) => (
                  <span
                    key={p}
                    className="font-sans text-xs px-1.5 py-0.5 rounded bg-white border border-line text-ink"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 -mt-1">
          <div className="ml-12 rounded-md border border-line bg-section p-3">
            <p className="font-sans text-xs text-muted mb-2">
              Split ({tx.split.method})
            </p>
            <ul className="space-y-1">
              {Object.entries(tx.split.shares).map(([person, share]) => (
                <li
                  key={person}
                  className="flex justify-between text-sm tabular-nums"
                >
                  <span>{person}</span>
                  <span className={share < 0 ? 'text-positive' : ''}>
                    {format(share)}
                  </span>
                </li>
              ))}
            </ul>
            {tx.notes && (
              <p className="mt-3 pt-3 border-t border-line text-sm text-muted">
                {tx.notes}
              </p>
            )}
            <p className="mt-3 font-sans text-[10px] text-muted">id: {tx.id}</p>
          </div>
        </div>
      )}
    </li>
  );
}

export default function TransactionList({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-md border border-line bg-section px-4 py-10 text-center">
        <p className="text-muted">No transactions match these filters.</p>
      </div>
    );
  }

  return (
    <ul className="rounded-md border border-line bg-white overflow-hidden">
      {transactions.map((tx) => (
        <TransactionRow key={tx.id} tx={tx} />
      ))}
    </ul>
  );
}
