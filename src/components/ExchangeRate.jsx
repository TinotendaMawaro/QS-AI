export default function ExchangeRate({ rates }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-white tracking-tight">Live Market Exchange & Cost Baseline</h2>
        <p className="text-slate-400 text-xs">Real-time currency conversion for Zimbabwe and regional markets</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { curr: 'USD', base: '$1.00', flag: '🇺🇸', cls: 'bg-slate-50 border-slate-200 text-slate-900' },
          { curr: 'ZiG', base: `ZWG ${rates.ZiG?.toFixed(2) || '?'}`, flag: '🇿🇼', cls: 'bg-amber-50 border-amber-200 text-amber-900' },
          { curr: 'ZAR', base: `R ${rates.ZAR?.toFixed(2) || '?'}`, flag: '🇿🇦', cls: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
          { curr: 'GBP', base: `£${rates.GBP?.toFixed(2) || '?'}`, flag: '🇬🇧', cls: 'bg-indigo-50 border-indigo-200 text-indigo-900' },
        ].map(card => (
          <div key={card.curr} className={`${card.cls} rounded-2xl border p-6 relative overflow-hidden`}>
            <span className="text-2xl absolute top-3 right-4 opacity-20">{card.flag}</span>
            <p className="text-[10px] font-extrabold uppercase tracking-wider opacity-70 mb-1">Mutual Rate / Base</p>
            <p className="text-3xl font-extrabold font-mono">{card.base}</p>
            <p className="text-[9px] font-bold opacity-60 mt-1">US Dollar Base Equivalent</p>
          </div>
        ))}
      </div>
    </div>
  );
}
