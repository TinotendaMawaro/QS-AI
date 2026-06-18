export default function LoadingOverlay({ visible, text }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-slate-950/95 z-[100] flex flex-col items-center justify-center">
      <div className="relative w-14 h-14 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/10"></div>
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-xs font-bold text-slate-200 tracking-wider uppercase font-mono animate-pulse">
        {text}
      </p>
    </div>
  );
}
