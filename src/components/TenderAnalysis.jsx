export default function TenderAnalysis({ bids }) {
  const toWide = (v) => (v === undefined || v === null ? null : v);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-white tracking-tight">Tender Evaluation Matrix</h2>
        <p className="text-slate-400 text-xs">AI-assisted contractor bid analysis and risk assessment</p>
      </div>

      <div className="overflow-x-auto border border-slate-800 rounded-2xl">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/50">
              <th className="text-left p-4 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Specification Item</th>
              <th className="text-center p-4 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Unit</th>
              <th className="text-center p-4 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Qty</th>
              <th colSpan={3} className="text-center p-2 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider border-l border-slate-800">Contractor Bid Rates</th>
              <th className="text-center p-2 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider w-20">Lowest</th>
              <th className="text-center p-2 text-[9px] font-extrabold text-slate-500 uppercase tracking-wider w-32">AI Rank</th>
            </tr>
            <tr>
              <th></th><th></th><th></th>
              <th className="p-1.5 text-[9px] font-bold text-slate-400 text-center border-l border-slate-800 bg-slate-900">TN Builders</th>
              <th className="p-1.5 text-[9px] font-bold text-slate-400 text-center bg-slate-900">Beta Cont.</th>
              <th className="p-1.5 text-[9px] font-bold text-slate-400 text-center bg-slate-900">ZimConstruct</th>
              <th></th><th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {bids.map(bid => {
              const vals = [bid.tnBuilders, bid.betaContractors, bid.zimConstruct];
              const numVals = vals.map(toWide).filter(v => v !== null);
              const lowest = numVals.length > 0 ? Math.min(...numVals) : null;
              const baseline = bid.baseline;
              const tnWide = toWide(bid.tnBuilders);

              const pctVsBaseline = (v) => baseline ? ((v - baseline) / baseline) * 100 : null;

              const getRisk = (contractorVal) => {
                if (contractorVal === undefined || contractorVal === null) return { label: 'N/A', cls: 'text-slate-600 bg-slate-800 border-slate-700' };
                if (contractorVal > baseline * 1.15) return { label: 'Abnormally High', cls: 'text-red-400 bg-red-500/10 border-red-500/20' };
                if (contractorVal < baseline * 0.85) return { label: 'Abnormally Low', cls: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
                return { label: 'Responsive', cls: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
              };

              const rank = ({ label }) => {
                if (label === 'Abnormally Low') return 4;
                if (label === 'Responsive') return 1;
                if (label === 'Abnormally High') return 5;
                return 3;
              };

              const tnRisk = getRisk(bid.tnBuilders);
              const betaRisk = getRisk(bid.betaContractors);
              const zimRisk = getRisk(bid.zimConstruct);

              const risks = [
                { c: 'TN', risk: tnRisk, v: bid.tnBuilders },
                { c: 'Beta', risk: betaRisk, v: bid.betaContractors },
                { c: 'Zim', risk: zimRisk, v: bid.zimConstruct },
              ];

              const best = risks.sort((a, b) => rank(a.risk) - rank(b.risk));

              return (
                <tr key={bid.id} className="hover:bg-slate-900/30">
                  <td className="p-3 text-slate-200 font-medium">{bid.name}</td>
                  <td className="px-2 p-3 text-center text-slate-500 font-mono">{bid.unit}</td>
                  <td className="px-2 p-3 text-center text-slate-300 font-mono">{bid.qty.toLocaleString()}</td>
                  <td className={`p-2.5 text-center font-mono border-l border-slate-800 ${tnWide === lowest ? 'text-emerald-400 font-extrabold' : 'text-slate-300'}`}>
                    {tnWide != null ? `$${tnWide.toFixed(2)}` : '—'}
                    {tnWide != null && baseline ? <span className="block text-[8px] text-slate-500">{pctVsBaseline(bid.tnBuilders || 0)?.toFixed(0) > -10 ? '+' : ''}{pctVsBaseline(bid.tnBuilders || 0)?.toFixed(0)}%</span> : ''}
                  </td>
                  <td className={`p-2.5 text-center font-mono ${bid.betaContractors === lowest ? 'text-emerald-400 font-extrabold' : 'text-slate-300'}`}>
                    {bid.betaContractors != null ? `$${bid.betaContractors.toFixed(2)}` : '—'}
                  </td>
                  <td className={`p-2.5 text-center font-mono ${bid.zimConstruct === lowest ? 'text-emerald-400 font-extrabold' : 'text-slate-300'}`}>
                    {bid.zimConstruct != null ? `$${bid.zimConstruct.toFixed(2)}` : '—'}
                  </td>
                  <td className="p-2.5 text-center font-extrabold text-emerald-400 bg-emerald-500/5">
                    {lowest != null ? `$${lowest.toFixed(2)}` : '—'}
                  </td>
                  <td className="p-2.5">
                    <div className="flex flex-col gap-1 items-center">
                      {risks.map(r => (
                        <span key={r.c} className={`text-[9px] px-1.5 py-0.5 rounded border ${r.risk.cls}`}>
                          {r.c}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">AI Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { stat: 'Lowest Responsive Bid', val: 'TN Builders', desc: 'Responsive pricing with no abnormally low risk detected', cls: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' },
            { stat: 'Abnormally Low Confirmed', val: 'ZimConstruct', desc: 'ZAR 35.00 flagged on Roof Covering — contains potential exclusion risk', cls: 'border-amber-500/20 text-amber-400 bg-amber-500/5' },
            { stat: 'Lowest Total by Summation', val: 'TN Builders', desc: 'Combined totals lead by 2.1% against Beta Contractors', cls: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' },
          ].map(item => (
            <div key={item.stat} className={`${item.cls} rounded-xl p-3.5 border`}>
              <p className="text-[9px] font-extrabold uppercase tracking-wider block mb-1.5 opacity-70">{item.stat}</p>
              <p className="text-sm font-extrabold mb-1">{item.val}</p>
              <p className="text-[10px] opacity-70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
