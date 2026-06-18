export default function ProjectModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center z-[80] p-4">
      <div className="bg-[#0b0f19] border border-slate-800 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
          <h3 className="font-extrabold text-xs text-slate-100 uppercase tracking-wider">
            Initiate Construction Project
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 font-bold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 text-[11px]">
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-400 mb-1">Project Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Mutare Office Block"
                className="w-full bg-[#050811] border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Client Developer *</label>
              <input
                type="text"
                name="client"
                required
                placeholder="e.g. Zimbabwe Properties Ltd"
                className="w-full bg-[#050811] border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-400 mb-1">Assigned Consultant</label>
              <input
                type="text"
                name="consultant"
                placeholder="e.g. JM Cost Consultants"
                className="w-full bg-[#050811] border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Primary Contractor</label>
              <input
                type="text"
                name="contractor"
                placeholder="e.g. TN Builders"
                className="w-full bg-[#050811] border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-400 mb-1">Regional Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Gweru"
                className="w-full bg-[#050811] border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Development Classification</label>
              <select
                name="type"
                className="w-full bg-[#050811] border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Target Budget Baseline (USD)</label>
            <input
              type="number"
              name="budget"
              defaultValue="150000"
              className="w-full bg-[#050811] border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Scope Project Description</label>
            <textarea
              name="desc"
              rows="2"
              placeholder="Describe materials, columns structures, and architectural schedules..."
              className="w-full bg-[#050811] border border-slate-800 rounded p-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded font-bold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1.5 rounded font-bold transition-all shadow-md shadow-emerald-500/10"
            >
              Initiate Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
