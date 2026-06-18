import { useState, useEffect } from 'react';

export default function AdminAnalytics() {
  const [timeframe, setTimeframe] = useState('Last 30 days');

  const kpis = [
    { label: 'Projects Processed', value: '2,341', change: '+14%', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 01-2 2v2M7 7h10' },
    { label: 'BOQs Generated', value: '1,847', change: '+22%', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Cost Savings', value: 'USD 4.2M', change: '+8%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Active Users', value: '842', change: '+5%', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">Prefecture Analytics</h2>
          <p className="text-slate-400 text-xs">Performance metrics, financial trends and system integrity</p>
        </div>
        <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-0.5">
          {['Last 7 days', 'Last 30 days', 'QTD', 'YTD'].map(opt => (
            <button
              key={opt}
              onClick={() => setTimeframe(opt)}
              className={`px-2.5 py-1.5 rounded text-[10px] font-extrabold tracking-wide transition-all ${timeframe === opt ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-100'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-emerald-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={kpi.icon} /></svg>
              </span>
              <span className="text-emerald-400 text-[10px] font-extrabold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">{kpi.change}</span>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white">{kpi.value}</p>
              <p className="text-slate-500 text-[10px] mt-0.5">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {[
          { title: 'Volume Execution Active', type: 'area', gridArea: 'grid-template-rows: 25% 30% 20% 25%' },
          { title: 'Cash Flow Transactions', type: 'bar', gridArea: 'grid-template-rows: 15% 75% 10%' },
        ].map(section => (
          <div key={section.title} className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">{section.title}</h3>
              <span className="text-[9px] text-slate-500 font-mono">Live</span>
            </div>
            <div className="h-40 w-full flex items-end gap-1">
              {Array.from({ length: 32 }).map((_, i) => {
                const h = section.type === 'area'
                  ? (i % 4 === 0 ? 25 : i % 4 === 1 ? 30 : i % 4 === 2 ? 20 : 25)
                  : (i < 8 ? 30 : i < 16 ? 50 : i < 24 ? 70 : 45);
                return (
                  <div key={i} className={`flex-1 ${section.type === 'area' && i % 4 === 0 ? 'bg-emerald-500 rounded-t-sm' : section.type === 'area' && i % 4 === 1 ? 'bg-blue-500' : section.type === 'area' ? 'bg-slate-800' : 'bg-emerald-400'} hover:opacity-80 transition-opacity`} style={{ height: `${h}%` }}></div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">System Integrity</h3>
        <div className="space-y-4">
          {[
            { label: 'AI Processing Uptime', val: '99.8%', pct: 99 },
            { label: 'STAR-AI Model Precision', val: '96.4%', pct: 96 },
            { label: 'GDPR Compliance Score', val: '100%', pct: 100 },
            { label: 'Database Integration', val: 'Continuous', pct: 100 },
          ].map(item => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">{item.label}</span>
                <span className={`font-extrabold font-mono ${item.pct >= 95 ? 'text-emerald-400' : 'text-amber-400'}`}>{item.val}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${item.pct >= 95 ? 'bg-emerald-500' : 'bg-amber-400'}`} style={{ width: `${item.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
