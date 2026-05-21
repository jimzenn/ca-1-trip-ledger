import { useMemo } from 'react';
import { computeTotals, simplifyDebts } from '../settle.js';
import { Money } from '../currency.jsx';

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
        <h2 className="font-sans text-sm text-muted mb-2 px-1">余额</h2>
        <div className="rounded-md border border-line bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="font-sans text-xs text-muted bg-section">
              <tr>
                <th className="text-left px-4 py-2 font-normal">人员</th>
                <th className="text-right px-4 py-2 font-normal">💰 已付</th>
                <th className="text-right px-4 py-2 font-normal">📥 应付</th>
                <th className="text-right px-4 py-2 font-normal">⚖️ 净额</th>
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
                    <td className="px-4 py-3 text-right">
                      <Money amount={paid[p]} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Money amount={owed[p]} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Money amount={n} className={tone} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 font-sans text-xs text-muted px-1">
          净额为正：大家欠他/她。净额为负：他/她欠大家。
        </p>
      </div>

      <div>
        <h2 className="font-sans text-sm text-muted mb-2 px-1">建议转账</h2>
        {transfers.length === 0 ? (
          <div className="rounded-md border border-line bg-section px-4 py-8 text-center text-muted">
            已结清，无需转账。
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
                  <span className="text-muted" aria-hidden="true">💸</span>
                  <span className="text-positive">{t.to}</span>
                </div>
                <Money amount={t.amount} />
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 font-sans text-xs text-muted px-1">
          贪心算法简化债务 — 最少转账次数即可结清。
        </p>
      </div>
    </section>
  );
}
