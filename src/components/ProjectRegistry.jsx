import { useState } from 'react';
import ProjectModal from './ProjectModal';

export default function ProjectRegistry({ projects }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">Projects Digital Registry</h2>
          <p className="text-slate-400 text-xs">Manage all construction project profiles and financial baselines</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-extrabold shadow-lg shadow-emerald-500/15 transition-all flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          New Project Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
        {projects.map(project => (
          <div key={project.id} className="bg-[#0b0f19] border border-slate-800/80 rounded-xl overflow-hidden group hover:border-slate-700 transition-all">
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-white tracking-tight">{project.name}</h3>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">{project.id}</p>
                </div>
                <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full border ${project.status === 'Active' ? 'border-emerald-500/25 text-emerald-400 bg-emerald-500/5' : 'border-blue-500/25 text-blue-400 bg-blue-500/5'}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{project.desc}</p>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-slate-500 block">Location</span>
                  <span className="text-slate-200 font-semibold">{project.location}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Type</span>
                  <span className="text-slate-200 font-semibold">{project.type}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Budget</span>
                  <span className="text-white font-bold font-mono">USD {project.budget.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Duration</span>
                  <span className="text-slate-200 font-semibold">{project.start} to {project.end}</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-950/40 px-4 py-2.5 border-t border-slate-800/80 flex gap-1.5">
              {['Review BOQ', 'Cost Analysis', 'View Report'].map(btn => (
                <button key={btn} className="flex-1 text-[10px] font-semibold text-slate-400 hover:text-slate-100 bg-slate-900 hover:bg-slate-800 py-1.5 rounded transition-all border border-slate-800">
                  {btn}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ProjectModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

