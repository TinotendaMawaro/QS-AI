export const TRADES = ['Earthworks', 'Concrete', 'Reinforcement', 'Masonry', 'Roofing', 'Finishes'];

export default function QuantityTakeoff({ takeoffData, globalMultiplier, currency, rates }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-white tracking-tight">Quantity Take-off Sheets</h2>
        <p className="text-slate-400 text-xs">SMM7 standard measurement sheets generated from AI drawing analysis</p>
      </div>

      {TRADES.map(trade => (
        <div key={trade} className="bg-[#0b0f19] border border-slate-800 rounded-xl overflow-hidden">
          <button
            className="w-full p-4 flex items-center justify-between bg-slate-950/40 hover:bg-slate-950/60 transition-colors border-b border-slate-800/80"
          >
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-mono text-xs font-bold">{trade.charAt(0)}</span>
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">{trade}</h3>
            </div>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div className="divide-y divide-slate-800/80">
            {takeoffData[trade]?.map(row => (
              <div key={row.itemNo} className="px-4 py-2.5 grid grid-cols-12 gap-3 items-center text-[11px]">
                <div className="col-span-1 text-slate-500 font-mono">{row.itemNo}</div>
                <div className="col-span-4 text-slate-300 truncate">{row.desc}</div>
                <div className="col-span-2 text-slate-400 font-mono text-center">
                  {row.l} x {row.w} x {row.d} {row.unit}
                </div>
                <div className="col-span-1 text-slate-400 font-mono text-center">x{row.timesing}</div>
                <div className="col-span-1 text-emerald-400 font-extrabold font-mono text-center">
                  {(row.l * row.w * row.d * row.timesing).toFixed(2)}
                </div>
                <div className="col-span-1">
                  <span className="text-slate-500 text-[9px] uppercase block">Base</span>
                  <span className="text-slate-300 font-mono">${row.baseRate}</span>
                </div>
                <div className="col-span-1">
                  <span className="text-slate-500 text-[9px] uppercase block">Adj.</span>
                  <span className="text-white font-extrabold font-mono">${(row.baseRate * globalMultiplier).toFixed(2)}</span>
                </div>
                <div className="col-span-1 text-emerald-400 font-extrabold text-right">
                  ${(row.l * row.w * row.d * row.timesing * row.baseRate * globalMultiplier).toFixed(0)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
