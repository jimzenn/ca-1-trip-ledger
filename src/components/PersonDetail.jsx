import { useMemo, useState } from 'react';
import { parseDate, iconFor } from '../settle.js';
import { Money } from '../currency.jsx';

function SummaryCard({ label, amount, tone }) {
  const toneClass =
    tone === 'positive'
      ? 'text-positive'
      : tone === 'negative'
      ? 'text-negative'
      : 'text-ink';
  return (
    <div className="rounded-md border border-line bg-white p-4">
      <p className="font-sans text-xs text-muted">{label}</p>
      <p className="mt-1">
        <Money amount={amount} className={'text-xl ' + toneClass} />
      </p>
    </div>
  );
}

export default function PersonDetail({ participants, transactions }) {
  const [person, setPerson] = useState(participants[0]);

  const { paid, owed, net, involvedTx } = useMemo(() => {
    let paid = 0;
    let owed = 0;
    const involvedTx = [];
    for (const tx of transactions) {
      if (tx.payer === person) paid += tx.total;
      if (person in tx.split.shares) {
        owed += tx.split.shares[person];
        involvedTx.push(tx);
      } else if (tx.participants.includes(person)) {
        involvedTx.push(tx);
      }
    }
    involvedTx.sort((a, b) => parseDate(a.date) - parseDate(b.date));
    return { paid, owed, net: paid - owed, involvedTx };
  }, [person, transactions]);

  const netTone = net > 0.005 ? 'positive' : net < -0.005 ? 'negative' : 'default';
  const netHint =
    net > 0.005
      ? `大家欠 ${person}`
      : net < -0.005
      ? `${person} 欠大家`
      : '已结清';

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <label className="font-sans text-sm text-muted">查看</label>
        <select
          value={person}
          onChange={(e) => setPerson(e.target.value)}
          className="font-sans text-sm rounded-md border border-line bg-white px-3 py-2"
        >
          {participants.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SummaryCard label="💰 已付" amount={paid} />
        <SummaryCard label="📥 应付" amount={owed} />
        <SummaryCard label="⚖️ 净额" amount={net} tone={netTone} />
      </div>
      <p className="font-sans text-xs text-muted -mt-2">{netHint}</p>

      <div>
        <h2 className="font-sans text-sm text-muted mb-2 px-1">
          {person} 参与的账单
        </h2>
        {involvedTx.length === 0 ? (
          <div className="rounded-md border border-line bg-section px-4 py-8 text-center text-muted">
            {person} 没有参与任何账单。
          </div>
        ) : (
          <ul className="rounded-md border border-line bg-white overflow-hidden">
            {involvedTx.map((tx) => {
              const share = tx.split.shares[person];
              const isPayer = tx.payer === person;
              const hasShare = share !== undefined;
              return (
                <li
                  key={tx.id}
                  className="border-b border-line last:border-b-0 px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="font-mono text-xs text-muted w-10 tabular-nums shrink-0 pt-1">
                      {tx.date}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="truncate">
                          <span aria-hidden="true" className="mr-1.5">
                            {iconFor(tx.category)}
                          </span>
                          {tx.venue}
                        </p>
                        <div className="text-right shrink-0">
                          {hasShare ? (
                            <Money
                              amount={share}
                              className={
                                share < 0 ? 'text-positive' : 'text-ink'
                              }
                            />
                          ) : (
                            <span className="text-muted text-sm font-sans">
                              —
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="mt-0.5 font-sans text-xs text-muted">
                        {isPayer ? (
                          <>
                            <span className="text-accent">全额支付</span>
                            {' · 总额 '}
                            <Money amount={tx.total} />
                          </>
                        ) : (
                          <>
                            <Money amount={tx.total} /> 中的份额（{tx.payer} 支付）
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
