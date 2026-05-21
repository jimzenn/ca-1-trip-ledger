export function formatUSD(amount) {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  return `${sign}$${abs.toFixed(2)}`;
}

export function parseDate(mdy) {
  const [m, d] = mdy.split("/").map(Number);
  return m * 100 + d;
}

export function computeTotals(transactions, participants) {
  const paid = {};
  const owed = {};
  for (const p of participants) {
    paid[p] = 0;
    owed[p] = 0;
  }
  for (const tx of transactions) {
    paid[tx.payer] = (paid[tx.payer] ?? 0) + tx.total;
    for (const [person, share] of Object.entries(tx.split.shares)) {
      owed[person] = (owed[person] ?? 0) + share;
    }
  }
  const net = {};
  for (const p of participants) {
    net[p] = (paid[p] ?? 0) - (owed[p] ?? 0);
  }
  return { paid, owed, net };
}

export function simplifyDebts(net) {
  const balances = { ...net };
  const transfers = [];
  const EPS = 0.01;
  let safety = 1000;

  while (safety-- > 0) {
    let creditor = null;
    let debtor = null;
    for (const p of Object.keys(balances)) {
      if (creditor === null || balances[p] > balances[creditor]) creditor = p;
      if (debtor === null || balances[p] < balances[debtor]) debtor = p;
    }
    if (
      creditor === null ||
      debtor === null ||
      balances[creditor] <= EPS ||
      balances[debtor] >= -EPS
    ) {
      break;
    }
    const amount = Math.min(balances[creditor], -balances[debtor]);
    const rounded = Math.round(amount * 100) / 100;
    transfers.push({ from: debtor, to: creditor, amount: rounded });
    balances[creditor] -= amount;
    balances[debtor] += amount;
  }

  return transfers;
}
