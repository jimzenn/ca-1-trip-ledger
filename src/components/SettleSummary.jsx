import { useMemo } from 'react';
import { computeTotals, simplifyDebts, formatUSD } from '../settle.js';

export default function SettleSummary({ participants, transactions }) {
  const { paid, owed, net, transfers } = useMemo(() => {
    const { paid, owed, net } = computeTotals(transactions, participants);
    const transfers = simplifyDebts(net);
    return { paid, owed, net, transfers };
  }, [participants, transactions]);

  const sortedPeople = [...participants].sort((a, b) => net[b] - net[a]);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-sans text-sm text-muted mb-2 px-1">Balances</h2>
        <div className="rounded-md border border-line bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="font-sans text-xs text-muted bg-section">
              <tr>
                <th className="text-left px-4 py-2 font-normal">Person</th>
                <th className="text-right px-4 py-2 font-normal">Paid</th>
                <th className="text-right px-4 py-2 font-normal">Owed</th>
                <th className="text-right px-4 py-2 font-normal">Net</th>
              </tr>
            </thead>
            <tbody>
              {sortedPeople.map((p) => {
                const n = net[p];
                const tone =
                  n > 0.005
                    ? 'text-positive'
                    : n < -0.005
                    ? 'text-negative'
                    : 'text-muted';
                return (
                  <tr key={p} className="border-t border-line">
                    <td className="px-4 py-3">{p}</td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatUSD(paid[p])}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatUSD(owed[p])}
                    </td>
                    <td
                      className={'px-4 py-3 text-right tabular-nums ' + tone}
                    >
                      {formatUSD(n)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 font-sans text-xs text-muted px-1">
          Positive Net = group owes them. Negative Net = they owe the group.
        </p>
      </div>

      <div>
        <h2 className="font-sans text-sm text-muted mb-2 px-1">
          Suggested Transfers
        </h2>
        {transfers.length === 0 ? (
          <div className="rounded-md border border-line bg-section px-4 py-8 text-center text-muted">
            All settled — nothing to transfer.
          </div>
        ) : (
          <ul className="rounded-md border border-line bg-white divide-y divide-line">
            {transfers.map((t, i) => (
              <li
                key={i}
                className="px-5 py-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-negative">{t.from}</span>
                  <span className="text-muted">→</span>
                  <span className="text-positive">{t.to}</span>
                </div>
                <span className="tabular-nums">{formatUSD(t.amount)}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 font-sans text-xs text-muted px-1">
          Greedy debt simplification — minimum transfers to settle the trip.
        </p>
      </div>
    </section>
  );
}
