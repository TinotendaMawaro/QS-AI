export default function BOQGenerator({ boqData, globalMultiplier }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">Professional Bill of Quantities</h2>
          <p className="text-slate-400 text-xs">SMM7 Compliant Document Structure • Auto-calibrated weights</p>
        </div>
        <div className="flex gap-2">
          {['PDF Export', 'Excel CSV', 'Print'].map(action => (
            <button key={action} className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded text-[10px] font-semibold transition-colors">
              {action}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-5 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-extrabold text-base">BILL OF QUANTITIES</h3>
              <h4 className="text-slate-400 text-[10px] font-mono mt-0.5">Marondera Eco-Resort — Ground Floor</h4>
            </div>
            <div className="text-right text-[10px] text-slate-400">
              <p>Reference: BOQ/MND/001</p>
              <p>Rev: 02 | Date: 2026-06-12</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        {boqData.map(section => (
          <div key={section.code} className="border-b border-slate-800/80 last:border-b-0">
            <div className="bg-slate-950/50 px-5 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-extrabold text-xs font-mono">{section.code}.</span>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">{section.name}</h3>
              </div>
              <span className="text-[10px] text-slate-500">{section.items.length} items</span>
            </div>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left p-2.5 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider px-5">Item Description</th>
                  <th className="text-center w-16 p-2.5 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Unit</th>
                  <th className="text-right px-5 p-2.5 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider w-24">Quantity</th>
                  <th className="text-right px-5 p-2.5 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider w-24">Rate (USD)</th>
                  <th className="text-right px-5 p-2.5 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider w-24">Amount</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map((item, i) => (
                  <tr key={i} className="group hover:bg-slate-900/40 transition-colors">
                    <td className="p-2.5 px-5 text-slate-300 leading-relaxed font-medium">{item.desc}</td>
                    <td className="px-2.5 p-2.5 text-center text-slate-500 font-mono">{item.unit}</td>
                    <td className="px-2.5 p-2.5 text-right text-slate-200 font-mono">{item.qty.toLocaleString()}</td>
                    <td className="px-2.5 p-2.5 text-right text-slate-400 font-mono">${(item.rate * globalMultiplier).toFixed(2)}</td>
                    <td className="px-5 p-2.5 text-right text-emerald-400 font-extrabold font-mono">
                      ${(item.qty * item.rate * globalMultiplier).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Total */}
        <div className="bg-slate-950/80 p-5 flex items-center justify-between border-t border-emerald-500/20">
          <div className="flex items-center gap-4">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">TOTAL ESTIMATED VALUE</span>
            <div className="w-px h-6 bg-emerald-500/30"></div>
            <span className="text-[9px] text-slate-500">Incl. Market Factor</span>
          </div>
          <span className="text-2xl font-extrabold text-emerald-400 font-mono tracking-tight">
            USD {boqData.reduce((sum, s) => sum + s.items.reduce((isum, i) => isum + i.qty * i.rate, 0) * globalMultiplier, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
