export default function Header({ currentProject, projects, onProjectChange, currency, onCurrencyChange, onOpenGeminiKey, onLogout, currentUser }) {
  return (
    <header className="h-14 bg-[#090d16] border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="text-slate-400 text-xs hidden sm:inline font-semibold">Active Project:</span>
        <select
          value={currentProject}
          onChange={(e) => onProjectChange(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200 rounded px-2.5 py-1 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          {projects.map(p => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative group">
          <button className="bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white p-1.5 rounded text-xs flex items-center gap-1.5 transition-all">
            <svg className="w-3.5 h-3.5 text-emerald-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden md:inline font-semibold">Gemini AI Key</span>
          </button>
          <div className="absolute right-0 mt-2 w-72 bg-[#090d16] border border-slate-800 rounded-xl p-3.5 shadow-2xl hidden group-hover:block transition-all z-50">
            <h4 className="text-[11px] font-bold text-white mb-2 uppercase tracking-wide">Gemini Connection Console</h4>
            <p className="text-[9px] text-slate-400 mb-3 leading-relaxed">
              Required to test live audits & real dynamic chat. Bypasses to SMM7 standard local calculations if empty.
            </p>
            <input
              type="password"
              placeholder="Paste Gemini API Key (AIzaSy...)"
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
              onChange={(e) => onOpenGeminiKey(e.target.value)}
            />
          </div>
        </div>

        <div className="flex bg-slate-950 border border-slate-800 rounded p-0.5">
          {['USD', 'ZiG', 'ZAR', 'GBP'].map(curr => (
            <button
              key={curr}
              onClick={() => onCurrencyChange(curr)}
              className={`px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wide transition-all ${
                currency === curr ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>

        <button
          onClick={onLogout}
          className="hidden md:flex items-center gap-1.5 bg-red-500/10 border border-red-500/25 text-red-400 px-3 py-1.5 rounded text-[11px] font-semibold hover:bg-red-500/20 transition-all"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
