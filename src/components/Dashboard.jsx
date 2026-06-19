export default function Dashboard({ stats, projects, boqCount, projectValue, recentActivity, quickActions, onAction }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">Welcome Back, John Moyo</h1>
          <p className="text-slate-400 text-xs mt-0.5">JM Cost Consultants • Harare, Zimbabwe</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          System Online
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Active Projects', value: projects.length, unit: 'Digital Profiles', status: 'Active' },
          { label: 'Active BOQs', value: boqCount, unit: 'In Progress', status: 'Processing' },
          { label: 'Portfolio Valuation', value: `USD ${projectValue.toLocaleString()}`, unit: 'Zimbabwe Portfolio', status: 'Tracked' },
          { label: 'AI Model Version', value: 'v2.1.0-stable', unit: 'SMM7 Compliant', status: 'Live' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block mb-2">
              {stat.label}
            </span>
            <div className="text-lg md:text-xl font-extrabold text-white tracking-tight">{stat.value}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-slate-500 text-[9px]">{stat.unit}</span>
              <span className="text-[8px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                {stat.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-[#0b0f19] border border-slate-800 rounded-xl">
          <div className="p-4 border-b border-slate-800/80 bg-slate-950/30">
            <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">Recent QS Activity</h3>
          </div>
          <div className="divide-y divide-slate-800/80">
            {recentActivity.map(item => (
              <div key={item.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-extrabold ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-200 leading-tight">{item.title}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{item.time}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded border self-start sm:self-auto ${item.statusClass}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2.5">
          {quickActions.map(action => (
            <button
              key={action.id}
              onClick={() => onAction(action.tab)}
              className="bg-[#0b0f19] border border-slate-800/80 hover:border-emerald-500/40 rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-center transition-all group touch-target"
            >
              <div className={`${action.iconBg} p-3 rounded-xl border border-slate-700/50 group-hover:scale-110 transition-transform`}>
                <svg className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={action.path} />
                </svg>
              </div>
              <span className="text-[11px] md:text-sm font-bold text-white leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
