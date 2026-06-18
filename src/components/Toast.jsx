export default function Toast({ toasts, onDismiss }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl text-xs font-semibold border backdrop-blur-md transition-all duration-300 ${
            toast.type === 'success'
              ? 'border-emerald-500/30 text-emerald-400 bg-emerald-950/80'
              : toast.type === 'error'
              ? 'border-red-500/30 text-red-400 bg-red-950/80'
              : 'border-slate-800 text-slate-100 bg-slate-900/90'
          }`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-100 ml-auto font-bold"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
