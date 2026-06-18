export default function SubscriptionPlans() {
  const plans = [
    { name: 'Student License', price: 'USD 10', freq: 'month', features: ['1 active project', '5 BOQ generations', 'Basic AI Take-off', 'Email support'], cta: 'Activate Student', popular: false },
    { name: 'Professional', price: 'USD 50', freq: 'month', features: ['15 active projects', 'Unlimited BOQs', 'Advanced AI Analytics', 'Supplier Database', 'Standard Support'], cta: 'Begin Trial', popular: true },
    { name: 'Firm Edition', price: 'USD 250', freq: 'month', features: ['Unlimited projects', 'Team Access (5 seats)', 'API Integration', 'Laravel Backend', 'Dedicated CSM'], cta: 'Connect with Sales', popular: false },
    { name: 'Enterprise', price: 'Custom', freq: '', features: ['Unlimited Everything', 'AI Model Training', 'Custom Integrations', 'On-Premise deployment', '24/7 Priority Support'], cta: 'Contact Sales', popular: false },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-white tracking-tight">Subscription Options</h2>
        <p className="text-slate-400 text-xs">Select the appropriate license tier for your organization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {plans.map(plan => (
          <div key={plan.name} className={`relative bg-[#0b0f19] border rounded-2xl overflow-hidden ${plan.popular ? 'border-emerald-500/40 shadow-lg shadow-emerald-500/5' : 'border-slate-800'}`}>
            {plan.popular && (
              <div className="bg-emerald-500 text-slate-950 text-[9px] font-extrabold text-center py-1 uppercase tracking-widest">
                Recommended Active License
              </div>
            )}
            <div className="p-5 space-y-5">
              <div>
                <h3 className="text-white font-extrabold text-sm">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                  {plan.freq && <span className="text-slate-500 text-xs">/{plan.freq}</span>}
                </div>
              </div>
              <ul className="space-y-2.5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-[11px] text-slate-300">
                    <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 rounded-lg text-[11px] font-extrabold transition-colors ${plan.popular ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/15' : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'}`}>
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
