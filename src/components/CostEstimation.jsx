export default function CostEstimation({ globalMultiplier }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">Cost Estimation Engine</h2>
          <p className="text-slate-400 text-xs">Advanced AI elemental costing and projection analytics</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1.5 rounded text-[10px] font-extrabold shadow-md shadow-emerald-500/10 transition-colors">
            Generate Report
          </button>
          <button className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded text-[10px] font-semibold transition-colors">
            Historical Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Elemental Cost Composition</h3>
              <span className="text-[9px] text-slate-500 font-mono">Projection Model: AI v2.1</span>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Foundation Elements', pct: 85 },
                { label: 'Structural Framework', pct: 72 },
                { label: 'Superstructure Elements', pct: 88 },
                { label: 'Roofing Systems', pct: 65 },
                { label: 'Internal Finishes', pct: 44 },
              ].map(item => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300">{item.label}</span>
                    <span className={`font-bold font-mono ${item.pct >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {item.pct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${item.pct >= 80 ? 'bg-emerald-500' : 'bg-amber-400'}`}
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Completion Confidence', val: '92%', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
            { label: 'Market Factor', val: `${globalMultiplier}x`, color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
            { label: 'Site Efficiency', val: '88%', color: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' },
          ].map(card => (
            <div key={card.label} className={`${card.color} rounded-2xl border p-5 space-y-2`}>
              <span className="text-[10px] font-extrabold uppercase tracking-widest block">{card.label}</span>
              <p className="text-2xl font-extrabold">{card.val}</p>
              <p className="text-[10px] opacity-70">Relative to regional benchmarks</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl">
        <div className="p-5 border-b border-slate-800/80 bg-slate-950/30">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Financial Summary Analysis</h3>
        </div>
        <div className="p-5 space-y-4">
          {[
            { legend: 'Labor Cost', pct: 34, amt: '145,420.00', color: 'bg-emerald-400' },
            { legend: 'Structural Material', pct: 52, amt: '222,300.00', color: 'bg-blue-400' },
            { legend: 'Equipment On-Site', pct: 9, amt: '38,475.00', color: 'bg-purple-400' },
            { legend: 'Site Management', pct: 5, amt: '21,375.00', color: 'bg-slate-400' },
          ].map(bar => (
            <div key={bar.legend}>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${bar.color}`}></span>
                  <span className="text-xs text-slate-300">{bar.legend}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-white font-extrabold">USD {bar.amt}</span>
                  <span className="text-[9px] text-slate-500 ml-2">({bar.pct}%)</span>
                </div>
              </div>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                <div className={`${bar.color} h-full rounded-full`} style={{ width: `${bar.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
