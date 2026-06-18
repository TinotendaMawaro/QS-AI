export default function PricingDatabase({ prices }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-white tracking-tight">Market Intelligence Database</h2>
        <p className="text-slate-400 text-xs">Real-time supplier pricing and construction material costs</p>
      </div>

      {Object.entries(prices).map(([category, items]) => (
        <div key={category} className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">{category}</h3>
            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider border border-emerald-500/15 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Live Data Feed
            </span>
          </div>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/20">
                <th className="text-left p-3 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider md:table-cell">Item Name</th>
                <th className="text-left p-3 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider md:table-cell">Supplier Network</th>
                <th className="text-right p-3 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Market Price</th>
                <th className="text-center p-3 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Trend</th>
                <th className="text-right p-3 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-slate-800/60 last:border-b-0 hover:bg-slate-900/30 transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-[10px] font-extrabold text-slate-500 border border-slate-800 shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                      </div>
                      <div>
                        <p className="text-slate-100 font-bold leading-tight">{item.name}</p>
                        <p className="text-slate-500 text-[9px] mt-0.5">{item.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-slate-400 hidden md:table-cell">{item.supplier}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-emerald-400 font-bold">USD {item.price.toFixed(2)}</td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-extrabold ${
                      item.trend === 'Up' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      item.trend === 'Down' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}>
                      {item.trend}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right text-slate-400 text-[10px] font-mono">Today</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
