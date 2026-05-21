export function iconFor(category) {
  switch (category) {
    case 'transport':
      return '🚗';
    case 'lodging':
      return '🏨';
    case 'meal':
      return '🍽️';
    case 'credit':
      return '🎟️';
    default:
      return '•';
  }
}

export function categoryLabel(category) {
  switch (category) {
    case 'transport': return '交通';
    case 'lodging': return '住宿';
    case 'meal': return '餐饮';
    case 'credit': return '抵扣';
    default: return category;
  }
}

export function subcategoryLabel(sub) {
  switch (sub) {
    case 'gas-parking': return '油费 / 停车';
    case 'rental': return '租车';
    case 'breakfast': return '早餐';
    case 'lunch': return '午餐';
    case 'dinner': return '晚餐';
    default: return sub;
  }
}

export function splitMethodLabel(method) {
  switch (method) {
    case 'even': return '均分';
    case 'custom': return '自定义';
    default: return method;
  }
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
