export default function Notifications() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-white tracking-tight">System & Project Alerts</h2>
        <p className="text-slate-400 text-xs">Configure notifications, alerts and communication preferences</p>
      </div>

      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl divide-y divide-slate-800/80">
        {[
          { title: 'Drawing Processing Complete', body: 'Structural analysis for Upper Floor extension complete. Confidence 96%.', time: '2 minutes ago', type: 'Processing' },
          { title: 'BOQ Generated Successfully', body: 'Marondera Resort project — BOQ version 2.1 issued for review.', time: '27 minutes ago', type: 'Document' },
          { title: 'Supplier Price Update', body: 'Halsted Builders — Roofing sheeting cost revised for Q2 2026.', time: '1 hour ago', type: 'Alert' },
          { title: 'Tender Submission Received', body: '3 Bids submitted for Ground Floor tender package.', time: '3 hours ago', type: 'Bids' },
        ].map((note, i) => (
          <div key={i} className="p-4 flex items-start gap-3.5">
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
              note.type === 'Processing' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
              note.type === 'Document' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
              note.type === 'Bids' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {note.type === 'Processing' ? 'AI' : note.type === 'Document' ? 'BOQ' : note.type === 'Bids' ? 'TEN' : 'PRI'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-200">{note.title}</p>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{note.body}</p>
              <p className="text-[9px] text-slate-500 mt-1.5">{note.time}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              On
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4">
        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Channel Configuration</h3>
        <div className="space-y-3">
          {[
            { channel: 'Direct Email Notifications', enabled: true },
            { channel: 'SMS Alert Channel (Local)', enabled: true },
            { channel: 'In-App Notification Feed', enabled: true },
            { channel: 'Scheduled Weekly Report', enabled: false, off: true },
          ].map(ch => (
            <div key={ch.channel} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-slate-300 text-xs font-medium">{ch.channel}</span>
                {ch.enabled && <span className="text-[9px] text-emerald-400 font-extrabold uppercase tracking-wider">Active</span>}
              </div>
              <button
                className={`relative w-8 h-4 rounded-full transition-colors ${ch.enabled ? 'bg-emerald-500' : 'bg-slate-800 border border-slate-700'}`}
              >
                <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${ch.enabled ? 'translate-x-4' : 'translate-x-0.5'}`}></span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
