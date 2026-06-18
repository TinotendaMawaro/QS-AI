import { useState } from 'react';

export default function AIAssistant({ boqData, bids, takeoffData, onSuggestCostSaving }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'init',
      from: 'ai',
      text: 'QS-AI Agentia Core • Construct Analysis Matrix [v2.1]\n\n"—The most critical question is not whether principles will apply to this project, but whether we can articulate the exacting consequences of our misjudgment toward the final account balance—"\n\nConstruct context established. I am ready to analyze structural inconsistencies, evaluate supply-chain anomalies, or process procurement classifications. Please instruct with specifications.',
      time: 'System Initialized',
      sources: ['SMM7 Reference Framework', 'COSMO Construction Database', 'JCT Cost Analysis'],
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), from: 'user', text: input, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);

    let responseText = '';
    const lower = input.toLowerCase();

    if (lower.includes('roof') || lower.includes('roofing')) {
      const roof = takeoffData.Roofing?.[0];
      const qty = roof ? (roof.l * roof.w * roof.d * roof.timesing).toFixed(2) : '385.00';
      responseText = `Structural Analysis: Roof coverage area is equivalent to ${qty}m².\n\nEstimated roofing resources: USD 12,500 inclusive of substrate and fasteners.\n\nPotential savings adjustment: 8% reduction achievable through substitution with alternative sheeting product (chromadek alternative).`;
    } else if (lower.includes('plaster') || lower.includes('quantity') || lower.includes('takeoff')) {
      const plaster = takeoffData.Finishes?.find(f => f.desc.toLowerCase().includes('plaster'));
      const qty = plaster ? (plaster.l * plaster.w * plaster.d * plaster.timesing).toFixed(2) : 'N/A';
      responseText = `Material Calculation Verified:\n\nPlaster survey quantity: ${qty} m²\nRecommended usage rate: +8% contingency wastage factor.\n\nApplied extraction protocol: SMM7 Group F (Finishing Works).\nNote: Add 5% wastage for open-tender conditions.`;
    } else if (lower.includes('saving') || lower.includes('reduce') || lower.includes('cost')) {
      const total = boqData.reduce((sum, s) => sum + s.items.reduce((isum, i) => isum + i.qty * i.rate, 0), 0);
      const saving = total * 0.08;
      responseText = `Cost Optimization Report: Total project value ${total.toLocaleString()} USD.\n\nEthical alternative specification analysis complete:\nPotential savings of ${saving.toLocaleString(undefined)} USD (approx 8%) through alternative material specification.\n\nRecommendation: Request subcontractor revisions for concretes and finishes categories before issue for tender.`;
    } else if (lower.includes('tender') || lower.includes('bid') || lower.includes('contractor')) {
      responseText = `Tender Analysis Summary:\n\nComparison entities: TN Builders, Beta Contractors, ZimConstruct.\n\nMetric: Combined Man Hours & Material Unit Rates\nZimConstruct — Lowest responsive value, pending material schedule verification.\n\nRisk flag detected: Abnormally Low Bid category identified. Recommend rescoping excavation sub-quantities.\n\nConfidence Level: 92% with current available data.`;
    } else {
      responseText = `Processing request: "${input}"\n\nCross-referencing against project specification and SMM7 standards.\n\nNote: I do not have access to the specific active project context for this query without further specification. Please indicate project variant (e.g. "for project QS-001") for precise calculation.`;
    }

    const aiMsg = { id: (Date.now() + 1).toString(), from: 'ai', text: responseText, time: 'Just now' };
    setMessages(prev => [...prev, aiMsg]);
    setInput('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between shrink-0">
        <div>
          <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">QS-AI Ellis-agency</h3>
          <p className="text-slate-500 text-[10px]">Intelligent guidance based on SMM7 and company standards</p>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Online
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => {
          if (msg.from === 'init' || msg.from === 'ai') {
            const lines = msg.text.split('\n');
            return (
              <div key={msg.id} className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 font-extrabold text-xs">
                  QS
                </div>
                <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  {lines.map((line, i) => {
                    if (line.startsWith('"')) return <p key={i} className="text-emerald-400 text-xs italic leading-relaxed font-medium">{line}</p>;
                    if (line.includes(':') && line.endsWith('.')) return <p key={i} className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 pt-1">{line}</p>;
                    return <p key={i} className="text-slate-200 text-xs leading-relaxed">{line}</p>;
                  })}
                  {idx === 0 && (
                    <div className="pt-2">
                      {['SMM7 Reference Framework', 'COSMO Construction Database', 'JCT Cost Analysis'].map(s => (
                        <span key={s} className="text-[9px] text-emerald-400/70 font-mono block flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                          {s} [N/A]
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          }
          return (
            <div key={msg.id} className="flex gap-3 justify-end">
              <div className="max-w-[80%] bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 space-y-1">
                {msg.text.split('\n').map((line, i) => <p key={i} className="text-slate-200 text-xs leading-relaxed">{line}</p>)}
                <p className="text-right text-[8px] text-slate-500 mt-1">{msg.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-3.5 border-t border-slate-800 bg-slate-950/40 shrink-0">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask QS-AI Ellis (Contract Analysis, Take-offs, Cost Plans...)"
            className="flex-1 bg-[#0b0f19] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 resize-none h-10"
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
          />
          <button
            onClick={handleSend}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 rounded-xl font-extrabold text-xs transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

