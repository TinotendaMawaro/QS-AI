import { useState, useRef } from 'react';

export default function Reporting({ onReportGenerated }) {
  const [reportType, setReportType] = useState('BOQ Report');
  const [project, setProject] = useState('Marondera Eco-Resort');
  const [format, setFormat] = useState('PDF');
  const [showToast, setShowToast] = useState(false);

  const handleGenerate = () => {
    setShowToast(true);
    onReportGenerated?.({ type: reportType, project, format });
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-white tracking-tight">Report Architecture</h2>
        <p className="text-slate-400 text-xs">Generate and compile formatted construction documentation</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
        {['BOQ Report', 'Cost Plan', 'Valuation', 'Interim Cert.', 'Cash Flow', 'Materials', 'Procurement'].map(rpt => (
          <button
            key={rpt}
            onClick={() => setReportType(rpt)}
            className={`p-3 rounded-xl border text-[10px] font-extrabold uppercase tracking-wider text-center transition-all ${
              reportType === rpt
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-[#0b0f19] border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            {rpt}
          </button>
        ))}
      </div>

      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">Source Project</label>
            <select value={project} onChange={(e) => setProject(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer">
              <option>Marondera Eco-Resort</option>
              <option>Harare Smart Plaza</option>
              <option>Bulawayo Housing Block</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">Export Format</label>
            <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-0.5">
              {['PDF', 'Excel', 'Word', 'CSV'].map(f => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-extrabold transition-all ${format === f ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-100'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">Quick Generate</label>
            <button
              onClick={handleGenerate}
              className="w-full h-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition-colors shadow-lg shadow-emerald-500/15"
            >
              Compile Documentation
            </button>
          </div>
        </div>

        {showToast && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <div>
              <p className="text-xs font-extrabold text-emerald-400">Report Generated Successfully</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{reportType} exported as {format} for {project}</p>
            </div>
          </div>
        )}

        <div className="pt-5 border-t border-slate-800 space-y-3">
          <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Report Categories</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {[
              { icon: '📊', label: 'BOQ Reports', desc: ' professionally formatted bills of quantities' },
              { icon: '📈', label: 'Cost Plans', desc: 'elemental and summary cost plans' },
              { icon: '💰', label: 'Valuation Reports', desc: 'valuation reviews for financial reporting' },
              { icon: '📄', label: 'Interim Certificates', desc: 'NWQ requisition certification documents' },
              { icon: '💵', label: 'Cash Flow', desc: 'projected monthly cash flows with cumulative totals' },
              { icon: '📦', label: 'Material Schedules', desc: 'quantified material requirement lists' },
            ].map(rpt => (
              <div key={rpt.label} className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
                <span className="text-lg">{rpt.icon}</span>
                <p className="text-xs font-bold text-slate-200">{rpt.label}</p>
                <p className="text-[10px] text-slate-500 leading-snug">{rpt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
