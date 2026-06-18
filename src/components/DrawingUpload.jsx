import { useState } from 'react';

const IDLE = 'idle';
const ANALYZING = 'analyzing';
const COMPLETE = 'complete';

const FORMATS = ['PDF', 'DWG', 'DXF', 'IFC', 'RVT', 'PNG', 'JPG', 'TIFF', 'ZIP'];

const INITIAL_RESULTS = [
  { title: 'Ground Floor Plan', walls: 56, doors: 22, windows: 34, rooms: 12, confidence: '96.8%' },
  { title: 'First Floor Plan', walls: 42, doors: 16, windows: 28, rooms: 10, confidence: '94.5%' },
  { title: 'Roof Plan', walls: 36, doors: 0, windows: 0, rooms: 20, confidence: '93.2%' },
];

export default function DrawingUpload({ onAnalysisComplete }) {
  const [status, setStatus] = useState(IDLE);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);

  const handleUpload = () => {
    setStatus(ANALYZING);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 3.3;
      });
    }, 80);

    setTimeout(() => {
      setResults(INITIAL_RESULTS);
      setStatus(COMPLETE);
      onAnalysisComplete(INITIAL_RESULTS);
    }, 4000);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-white tracking-tight">AI Drawing Recognition Engine</h2>
        <p className="text-slate-400 text-xs">Upload construction documents and drawings for automated quantity extraction</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {FORMATS.map(format => (
          <span key={format} className="bg-slate-900 border border-slate-800 text-emerald-400 px-3.5 py-2 rounded-lg text-[10px] font-extrabold font-mono tracking-wider">
            .{format}
          </span>
        ))}
      </div>

      {status === IDLE && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleUpload(); }}
          onClick={handleUpload}
          className="border-2 border-dashed border-slate-800 hover:border-emerald-500 bg-slate-950/40 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer text-center"
        >
          <span className="text-slate-700 text-4xl mb-3">
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          </span>
          <p className="text-white font-bold text-sm">Drag and Drop Drawings & Plans</p>
          <p className="text-slate-500 text-[10px] mt-2">or click to browse the local network drive • Maximum file size 500MB per entity</p>
          <span className="mt-3 text-[9px] font-bold text-slate-600 uppercase tracking-wider">Auto-validates scale, resolution, and completeness</span>
        </div>
      )}

      {status === ANALYZING && (
        <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-8">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="relative w-5 h-5">
              <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-white font-bold">AI Structural Validation Process</p>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s linear' }}></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2.5">Estimated processing time: 2-4 minutes • Checking drawing scale, resolution, quality, and completeness</p>
        </div>
      )}

      {status === COMPLETE && (
        <div className="space-y-3">
          <div className="bg-emerald-500/10 border border-emerald-500/15 rounded-xl p-3 flex items-center gap-2.5">
            <span className="text-emerald-400 font-bold text-sm">Analysis Complete</span>
            <span className="text-slate-400 text-xs">{results.length} Drawing Documents Processed</span>
            <button onClick={() => { setStatus(IDLE); setResults([]); }} className="ml-auto text-[10px] text-emerald-400 font-bold hover:text-emerald-300">Process Another</button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {results.map((r, i) => (
              <div key={i} className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-sm font-bold text-white">{r.title}</h4>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{r.confidence}</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Walls Detected', val: r.walls },
                    { label: 'Doors Detected', val: r.doors },
                    { label: 'Windows', val: r.windows },
                    { label: 'Rooms', val: r.rooms },
                  ].map(item => (
                    <div key={item.label}>
                      <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-lg font-extrabold text-white">{item.val}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-extrabold py-2 rounded transition-colors shadow-lg shadow-emerald-500/10">
                    Generate Take-Off
                  </button>
                  <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-semibold py-2 rounded border border-slate-800 transition-colors">
                    Review Drawing
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
