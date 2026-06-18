const SIDEBAR_NAV = [
  { id: 'dashboard', label: 'Dashboard Hub', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z' },
  { id: 'projects', label: 'Project Registry', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { id: 'upload', label: 'AI Drawing Upload', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
  { id: 'takeoff', label: 'Quantity Take-Off', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { id: 'boq', label: 'BOQ Generator', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'estimation', label: 'Cost Estimation', icon: 'M11 3.055A9.003 9.003 0 1020.945 13H11V3.055zM20.488 9H15V3.512A9.025 9.025 0 0120.488 9z' },
];

const MARKET_NAV = [
  { id: 'pricing', label: 'Pricing Database', icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
  { id: 'tenders', label: 'Tender Analysis', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 29 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  { id: 'exchange', label: 'Exchange & Calculator', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

const AI_NAV = [
  { id: 'assistant', label: 'AI QS Assistant', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  { id: 'laravel-hub', label: 'Laravel Backend Hub', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

export default function Sidebar({ activeTab, onTabChange, currentUser, onLogout, globalCostMultiplier, onMultiplierChange, rates, onRateChange }) {
  const renderNav = (items, sectionLabel) => (
    <div>
      <span className="px-3 text-[9px] font-extrabold uppercase tracking-widest text-slate-500 block mb-1">
        {sectionLabel}
      </span>
      <div className="space-y-0.5">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-[11px] font-semibold transition-all ${
              activeTab === item.id
                ? 'bg-emerald-500/10 text-emerald-400 font-extrabold'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
            </svg>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="w-full md:w-56 bg-[#0b0f19] border-r border-slate-800/80 flex flex-col shrink-0 justify-between">
      <div className="flex flex-col">
        {/* Brand */}
        <div className="p-4 border-b border-slate-800/80 flex items-center gap-2.5">
          <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-slate-950 text-base tracking-tighter shadow-md shadow-emerald-500/20">
            QS
          </div>
          <div>
            <h1 className="font-extrabold text-xs leading-tight text-white tracking-wider">
              QS-AI Africa
            </h1>
            <p className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase">
              Engine v2.1
            </p>
          </div>
        </div>

        {/* User Profile */}
        {currentUser && (
          <div className="p-3 m-3 bg-slate-900/40 rounded-lg border border-slate-800/60">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 bg-slate-800 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs font-mono">
                {currentUser.name.charAt(0)}
              </div>
              <div className="truncate">
                <h3 className="font-bold text-[11px] text-slate-100 truncate">{currentUser.name}</h3>
                <p className="text-[9px] text-slate-400 truncate">{currentUser.company}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-[9px] bg-slate-950 px-2 py-1 rounded border border-slate-800/80 text-slate-300">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="truncate">{currentUser.role}</span>
              </span>
              <span className="text-emerald-400 font-bold font-mono text-[8px]">{currentUser.idCode}</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="px-2 space-y-4 overflow-y-auto">
          {renderNav(SIDEBAR_NAV, 'Core Workspace')}
          {renderNav(MARKET_NAV, 'Market Intel')}
          {renderNav(AI_NAV, 'AI & Integration')}
        </nav>
      </div>

      {/* Dynamic Factors */}
      <div className="p-3 border-t border-slate-800/80 bg-[#070b13] space-y-2">
        <h4 className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 mb-1">
          Dynamic Factors
        </h4>
        <div>
          <label className="flex justify-between text-[8px] text-slate-400 mb-0.5">
            <span>Market Adjust.</span>
            <span className="font-bold text-emerald-400">{globalCostMultiplier.toFixed(2)}x</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.05"
            value={globalCostMultiplier}
            onChange={(e) => onMultiplierChange(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <span className="text-[8px] text-slate-400 block mb-0.5">ZiG Rate (per $1 USD)</span>
          <input
            type="number"
            step="0.5"
            value={rates.ZiG}
            onChange={(e) => onRateChange('ZiG', e.target.value)}
            className="w-full text-[10px] bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>
      </div>
    </aside>
  );
}
