export default function AuthScreen({ onLogin, loading }) {
  return (
    <div className="min-h-screen bg-[#0a0e17] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Payment Info */}
        <div className="mb-8 text-center">
          <h2 className="text-slate-300 text-sm font-semibold mb-1">
            Send all payments to: <span className="text-white font-bold">0781033060</span> — Tankiso Machakajara
          </h2>
          <p className="text-emerald-400 text-xs">Payment Verification • Bank Transfer • Payment Proof accepted instantly</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Hero */}
          <div className="lg:w-1/2">
            <div className="h-12 w-12 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl tracking-tighter shadow-lg shadow-emerald-500/25 mb-3">
              QS
            </div>
            <h1 className="text-3xl font-extrabold text-white leading-tight">
              Africa's First Intelligent Construction Intelligence Platform
            </h1>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Advanced AI-powered Quantity Surveying with automated quantity take-offs, BOQ generation, and cost analytics for Zimbabwe and beyond.
            </p>
            <div className="flex gap-3 mt-4">
              {['AI-Powered', 'SMM7 Standard', 'Multi-Currency'].map(badge => (
                <span key={badge} className="px-3 py-1 bg-slate-900 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-sm bg-[#0b0f19] border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6">
              <div className="mb-5">
                <h2 className="text-lg font-extrabold text-white">Professional Login Portal</h2>
                <p className="text-slate-400 text-xs mt-1">Access QS-AI Agency Workspace</p>
              </div>

              <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-3.5 mb-5">
                <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider mb-2 font-mono">
                  Quantity Surveyor Portal
                </p>
                <p className="text-slate-400 text-[10px] mb-1.5">John Moyo — Quantity Surveyor</p>
                <p className="text-slate-300 text-[10px] font-mono">john.moyo@construction.co.zw</p>
                <button onClick={() => onLogin('qs')} className="mt-2 w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-400 py-2 rounded font-extrabold text-xs">
                  Sign In as John Moyo
                </button>
              </div>

              <div className="bg-purple-500/5 border border-purple-500/15 rounded-xl p-3.5">
                <p className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider mb-2 font-mono">
                  Super Administrator Portal
                </p>
                <p className="text-slate-400 text-[10px] mb-1.5">System Administrator</p>
                <p className="text-slate-300 text-[10px] font-mono">admin@qsai.africa</p>
                <button onClick={() => onLogin('admin')} className="mt-2 w-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-400 py-2 rounded font-extrabold text-xs">
                  Sign In as System Administrator
                </button>
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 border-t border-slate-800/80 flex justify-between text-[9px] text-slate-500">
              <span className="font-mono">v 2.1.0-stable</span>
              <span className="font-mono">SMM7-AFRICA</span>
              <span>secure-environment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
