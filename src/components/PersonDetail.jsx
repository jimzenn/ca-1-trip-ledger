import { useMemo, useState } from 'react';
import { formatUSD, parseDate } from '../settle.js';

function SummaryCard({ label, value, tone }) {
  const toneClass =
    tone === 'positive'
      ? 'text-positive'
      : tone === 'negative'
      ? 'text-negative'
      : 'text-ink';
  return (
    <div className="rounded-md border border-line bg-white p-4">
      <p className="font-sans text-xs text-muted">{label}</p>
      <p className={'mt-1 text-xl tabular-nums ' + toneClass}>{value}</p>
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
      ? 'others owe ' + person
      : net < -0.005
      ? person + ' owes the group'
      : 'all square';

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <label className="font-sans text-sm text-muted">Viewing</label>
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
        <SummaryCard label="Paid" value={formatUSD(paid)} />
        <SummaryCard label="Owed" value={formatUSD(owed)} />
        <SummaryCard label="Net" value={formatUSD(net)} tone={netTone} />
      </div>
      <p className="font-sans text-xs text-muted -mt-2">{netHint}</p>

      <div>
        <h2 className="font-sans text-sm text-muted mb-2 px-1">
          Transactions involving {person}
        </h2>
        {involvedTx.length === 0 ? (
          <div className="rounded-md border border-line bg-section px-4 py-8 text-center text-muted">
            {person} isn't part of any transaction.
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
                    <div className="font-sans text-xs text-muted w-10 tabular-nums shrink-0 pt-0.5">
                      {tx.date}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="truncate">{tx.venue}</p>
                        <div className="text-right tabular-nums shrink-0">
                          {hasShare ? (
                            <span
                              className={
                                share < 0
                                  ? 'text-positive'
                                  : 'text-ink'
                              }
                            >
                              {formatUSD(share)}
                            </span>
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
                            <span className="text-accent">paid in full</span>
                            {' · '}total{' '}
                            <span className="tabular-nums">
                              {formatUSD(tx.total)}
                            </span>
                          </>
                        ) : (
                          <>share of {formatUSD(tx.total)} (paid by {tx.payer})</>
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
