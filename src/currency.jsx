import { createContext, useContext, useState } from 'react';

// Fetched 2026-05-21 from api.frankfurter.dev (ECB reference rate).
export const USD_TO_CNY = 6.8022;
export const RATE_AS_OF = '2026-05-21';

export function convert(amountUSD, currency) {
  return currency === 'CNY' ? amountUSD * USD_TO_CNY : amountUSD;
}

export function formatMoney(amountUSD, currency) {
  const value = convert(amountUSD, currency);
  const symbol = currency === 'CNY' ? '¥' : '$';
  const sign = value < 0 ? '-' : '';
  return `${sign}${symbol}${Math.abs(value).toFixed(2)}`;
}

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD');
  const value = {
    currency,
    setCurrency,
    format: (amount) => formatMoney(amount, currency),
  };
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside CurrencyProvider');
  return ctx;
}

export function Money({ amount, className = '' }) {
  const { format } = useCurrency();
  return (
    <span className={'font-mono tabular-nums ' + className}>{format(amount)}</span>
  );
}

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  const opts = [
    { id: 'USD', label: '$ 美元' },
    { id: 'CNY', label: '¥ 人民币' },
  ];
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center rounded-full border border-line bg-white shadow-md p-1 font-sans text-sm">
        {opts.map((o) => {
          const active = currency === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setCurrency(o.id)}
              className={
                'px-3 py-1 rounded-full transition-colors ' +
                (active
                  ? 'bg-ink text-white'
                  : 'text-muted hover:text-ink')
              }
              aria-pressed={active}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {currency === 'CNY' && (
        <p className="mt-1 text-[10px] text-muted text-right font-sans pr-1">
          1 美元 = <span className="font-mono">¥{USD_TO_CNY.toFixed(4)}</span> · {RATE_AS_OF}
        </p>
      )}
    </div>
  );
}
