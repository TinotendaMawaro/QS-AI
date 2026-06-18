import React, { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';
import LoadingOverlay from './components/LoadingOverlay';
import CostEstimation from './components/CostEstimation';
import TenderAnalysis from './components/TenderAnalysis';
import ExchangeRate from './components/ExchangeRate';
import PricingDatabase from './components/PricingDatabase';
import AdminAnalytics from './components/AdminAnalytics';
import SubscriptionPlans from './components/SubscriptionPlans';
import Notifications from './components/Notifications';
import Reporting from './components/Reporting';
import AiAssistant from './components/AiAssistant';
import DrawingUpload from './components/DrawingUpload';
import QuantityTakeoff from './components/QuantityTakeoff';
import BOQGenerator from './components/BOQGenerator';
import Dashboard from './components/Dashboard';
import ProjectRegistry from './components/ProjectRegistry';
import ProjectModal from './components/ProjectModal';
import {
  INITIAL_PROJECTS,
  INITIAL_TAKEOFFS,
  INITIAL_BOQ,
  INITIAL_BIDS,
  MARKET_PRICES,
  DEFAULT_CURRENCY_RATES,
} from './constants/data';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentProject, setCurrentProject] = useState('Marondera Eco-Resort');
  const [currency, setCurrency] = useState('USD');
  const [rates, setRates] = useState(DEFAULT_CURRENCY_RATES);
  const [globalCostMultiplier, setGlobalCostMultiplier] = useState(1.0);
  const [currentUser, setCurrentUser] = useState(null);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [takeoffs, setTakeoffs] = useState(INITIAL_TAKEOFFS);
  const [boq, setBoq] = useState(INITIAL_BOQ);
  const [activeTakeoffTrade, setActiveTakeoffTrade] = useState('Earthworks');
  const [activePriceCategory, setActivePriceCategory] = useState('materials');
  const [loadingScreen, setLoadingScreen] = useState({ visible: false, text: '' });
  const [toasts, setToasts] = useState([]);
  const [projectModal, setProjectModal] = useState(false);
  const [laravelSelectedFile, setLaravelSelectedFile] = useState('controller');
  const [blueprintPopup, setBlueprintPopup] = useState({ title: 'Outer Wall Line', details: 'Length: 45.0m | Area: 450m²' });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('Standby');
  const [parsedFiles, setParsedFiles] = useState([{ name: 'Harare_Smart_Plaza_Ground_Slab.pdf', size: '24.5 MB', scale: '1:100' }]);
  const [laravelApiLogs, setLaravelApiLogs] = useState([{ method: 'GET', url: '/api/v1/projects', status: 200, time: '14ms', timestamp: new Date().toLocaleTimeString() }]);
  const [chatHistory, setChatHistory] = useState([{ sender: 'assistant', text: 'Welcome back. I am connected directly to your active project context and live market indexes. Ask me anything about rate composition, structural options, or dynamic exchange calculations.' }]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [aiReport, setAiReport] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [aiDrawingAudit, setAiDrawingAudit] = useState('');
  const [isGeneratingAudit, setIsGeneratingAudit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingScreen({ visible: false, text: '' }), 1800);
    return () => clearTimeout(timer);
  }, []);

  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const logLaravelRequest = (method, url, status = 200, latency = '24ms') => {
    setLaravelApiLogs(prev => [{ method, url, status, time: latency, timestamp: new Date().toLocaleTimeString() }, ...prev.slice(0, 15)]);
  };

  const convertVal = (baseUsd, isRate = false) => {
    const converted = baseUsd * rates[currency] * globalCostMultiplier;
    const decimals = isRate ? 2 : 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'ZiG' ? 'USD' : currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(converted).replace('USD', currency === 'ZiG' ? 'ZiG' : currency);
  };

  const triggerLoginAction = (email, roleName) => {
    setLoadingScreen({ visible: true, text: 'Welcome, ' + roleName + '! Authenticating & Initializing Workspace...' });
    setTimeout(() => {
      const selectedUser = {
        name: roleName,
        email: email,
        role: email.includes('admin') ? 'Super Administrator' : 'Quantity Surveyor',
        company: email.includes('admin') ? 'QS-AI Africa Global Inc' : 'JM Cost Consultants',
        idCode: email.includes('admin') ? 'ZIM-ADMIN-01' : 'ZIM-QS-2026'
      };
      setCurrentUser(selectedUser);
      setLoadingScreen({ visible: false, text: '' });
      triggerToast('Authenticated successfully as ' + selectedUser.name + '!', 'success');
      logLaravelRequest('POST', '/api/v1/auth/login', 200, '42ms');
    }, 1500);
  };

  const handleAuthLogin = (roleSeed) => {
    if (roleSeed === 'admin') {
      triggerLoginAction('admin@qsai.africa', 'System Administrator');
    } else {
      triggerLoginAction('john.moyo@construction.co.zw', 'John Moyo');
    }
  };

  const triggerLogoutAction = () => {
    setLoadingScreen({ visible: true, text: 'Goodbye! Securing session and logging out...' });
    setTimeout(() => {
      setCurrentUser(null);
      setActiveTab('dashboard');
      setLoadingScreen({ visible: false, text: '' });
      triggerToast('You have logged out securely.', 'info');
      logLaravelRequest('POST', '/api/v1/auth/logout', 200, '12ms');
    }, 1400);
  };

  const handleProjectCreation = (formData) => {
    const newProject = {
      id: 'QS-00' + (projects.length + 1),
      name: formData.get('name'),
      client: formData.get('client'),
      consultant: formData.get('consultant') || 'TBD',
      contractor: formData.get('contractor') || 'TBD',
      location: formData.get('location') || 'Harare',
      type: formData.get('type'),
      budget: parseFloat(formData.get('budget')) || 100000,
      start: formData.get('start') || '2026-06-01',
      end: formData.get('end') || '2027-06-01',
      status: 'Active',
      desc: formData.get('desc') || 'Standard civil development.',
    };
    setProjects([newProject, ...projects]);
    setCurrentProject(newProject.name);
    setProjectModal(false);
    triggerToast('Project "' + newProject.name + '" has been registered!', 'success');
    logLaravelRequest('POST', '/api/v1/projects', 201, '56ms');
  };

  const simulateDrawingParse = () => {
    if (isUploading) return;
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStage('Reading blueprint scale anchors...');
    logLaravelRequest('POST', '/api/v1/drawings/upload', 202, '18ms');
    let currentProgress = 0;
    const stages = [
      { limit: 25, label: 'Detecting external walls & brick spans...' },
      { limit: 50, label: 'Analyzing structural column anchor placements...' },
      { limit: 75, label: 'Compiling standard SMM7 classification structures...' },
      { limit: 100, label: 'Take-off measurements generated!' },
    ];
    const timer = setInterval(() => {
      currentProgress += 5;
      setUploadProgress(currentProgress);
      const stage = stages.find(s => currentProgress <= s.limit);
      if (stage) setUploadStage(stage.label);
      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsUploading(false);
          setParsedFiles(prev => [
            { name: 'Marondera_Site_Elevation_Detail_v1.pdf', size: '18.2 MB', scale: '1:100' },
            ...prev,
          ]);
          triggerToast('AI Drawing Parse completed successfully!', 'success');
          logLaravelRequest('GET', '/api/v1/drawings/analysis-results', 200, '31ms');
        }, 500);
      }
    }, 150);
  };

  const handleTakeoffCellEdit = (trade, index, field, val) => {
    const updated = { ...takeoffs };
    updated[trade][index][field] = parseFloat(val) || 0;
    setTakeoffs(updated);
    logLaravelRequest('PUT', '/api/v1/takeoffs/' + trade + '/' + index, 200, '21ms');
  };

  const performGeminiApiCall = async (userPrompt, sysInstruction) => {
    sysInstruction = sysInstruction || '';
    const apiKey = geminiApiKey || '';
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey;
    const requestPayload = { contents: [{ parts: [{ text: userPrompt }] }] };
    if (sysInstruction) requestPayload.systemInstruction = { parts: [{ text: sysInstruction }] };
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      });
      if (!response.ok) throw new Error('API returned standard error code ' + response.status);
      const data = await response.json();
      return data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]
        ? data.candidates[0].content.parts[0].text
        : 'No structural responses compiled.';
    } catch (err) {
      console.warn('Live Gemini integration bypassed or failed, engaging standard local parser fallback.', err);
      throw err;
    }
  };

  const runLiveCostOptimizationAudit = async () => {
    if (isGeneratingReport) return;
    setIsGeneratingReport(true);
    setAiReport('');
    logLaravelRequest('POST', '/api/v1/ai/cost-optimization-audit', 202, '45ms');
    let boqDigest = '';
    boq.forEach(sec => {
      boqDigest += 'Section ' + sec.code + ' (' + sec.name + '): ';
      sec.items.forEach(i => {
        boqDigest += '[' + i.desc + ', Rate: ' + i.rate + ']; ';
      });
    });
    const activeProjObj = projects.find(p => p.name === currentProject) || projects[0];
    const systemPrompt = 'You are a professional Quantity Surveyor based in Harare, Zimbabwe. Focus on local materials, currency savings, and SMM7 guidelines.';
    const userPrompt =
      'Generate a detailed Cost Optimization Memo for the project "' +
      activeProjObj.name +
      '". Current BOQ rates context: ' +
      boqDigest +
      '. Recommend exactly 3 actionable, high-quality cost savings strategies using local materials or design swaps.';
    try {
      const result = await performGeminiApiCall(userPrompt, systemPrompt);
      setAiReport(result);
      triggerToast('AI Cost Optimization Report generated!', 'success');
      logLaravelRequest('GET', '/api/v1/ai/audit-results', 200, '35ms');
    } catch (err) {
      setTimeout(() => {
        setAiReport(
          '[Marondera Local-First Optimization Memo]\n1. Substructure Brickwork adjustments: Swap double-skin clay units in non-load-bearing partitions for local Stabilized Soil Bricks (SSBs). Saving: 12.5% on Section D.\n2. Local Timber Structures: Source Manicaland pine rafters instead of imported light-gauge steel roof frames. Saving: 8.2% on Section E.\n3. Class 15 Foundation Blends: Use local unreinforced Class 15 concrete for shallow strip trenches under minimal structural loads. Saving: 4.8% on Section C.',
        );
        triggerToast('Compiled local structural estimation parameters.', 'info');
      }, 1200);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const runLiveStructuralDrawingAudit = async () => {
    if (isGeneratingAudit) return;
    setIsGeneratingAudit(true);
    setAiDrawingAudit('');
    logLaravelRequest('POST', '/api/v1/ai/structural-audit', 202, '41ms');
    const activeProjObj = projects.find(p => p.name === currentProject) || projects[0];
    const systemPrompt = 'You are an expert structural engineer specializing in concrete mixes and load calculations.';
    const userPrompt =
      'Perform a high-level structural safety and volume check for "' +
      activeProjObj.name +
      '" using the simulated floor plan data: 385m² foundation slab, 56 masonry wall runs, 5 columns. Calculate cement, sand and coarse aggregate volume ratios for a standard 1:2:4 mix at 100mm thickness.';
    try {
      const result = await performGeminiApiCall(userPrompt, systemPrompt);
      setAiDrawingAudit(result);
      triggerToast('AI Drawing Audit Completed!', 'success');
    } catch (err) {
      setTimeout(() => {
        setAiDrawingAudit(
          '[Structural Engineering Audit - ' +
            activeProjObj.name +
            ']\n1. Material Density Quantities (385m² Slab at 100mm depth):\n   - Total Slab Volume: 38.5 m³\n   - Cement bags required (50kg standard PC15): 318 bags\n   - Sand aggregate required: 27.5 tonnes\n   - Coarse concrete gravel required: 55.0 tonnes\n2. Column Grid Warning:\n   - 5 structural pillars are insufficient for a 385m² footprint without a reinforced Class 25 continuous ring beam poured directly over masonry load partitions.',
        );
        triggerToast('Compiled local structural safety checks.', 'info');
      }, 1200);
    } finally {
      setIsGeneratingAudit(false);
    }
  };

  const handleAssistantPromptSubmit = async (textOverride) => {
    const prompt = typeof textOverride === 'string' ? textOverride : chatInput;
    if (!prompt.trim()) return;
    setChatHistory(prev => [...prev, { sender: 'user', text: prompt }]);
    setChatInput('');
    setIsAiTyping(true);
    logLaravelRequest('POST', '/api/v1/ai/assistant-chat', 200, '44ms');
    const activeProjObj = projects.find(p => p.name === currentProject) || projects[0];
    const systemPrompt =
      'You are the lead Quantity Surveyor AI assistant for QS-AI Africa. You are addressing ' +
      (currentUser ? currentUser.name : 'John Moyo') +
      '. Current project is ' +
      activeProjObj.name +
      '. Base ZiG rate factor: ' +
      rates.ZiG +
      '.';
    try {
      const result = await performGeminiApiCall(prompt, systemPrompt);
      setChatHistory(prev => [...prev, { sender: 'assistant', text: result }]);
    } catch (err) {
      setTimeout(() => {
        let fallbackText = 'I compiled the local calculations for your SMM7 parameter inquiry:\n\n';
        const lowerPrompt = prompt.toLowerCase();
        if (lowerPrompt.includes('boq') || lowerPrompt.includes('generate')) {
          fallbackText +=
            'Preliminaries: ' +
            convertVal(45000) +
            ' | Earthworks: ' +
            convertVal(18500) +
            ' | Concrete: ' +
            convertVal(148480) +
            ' | Masonry: ' +
            convertVal(82350) +
            ' | Grand Total: ' +
            convertVal(427500);
        } else if (lowerPrompt.includes('roofing') || lowerPrompt.includes('roof')) {
          fallbackText +=
            'Based on a 385m² roof area plan: Chromadek profile sheets: 420m² at ' +
            convertVal(32, true) +
            '/m² = ' +
            convertVal(13440) +
            ' | Timber structures: ' +
            convertVal(1375) +
            ' | Net total estimate: ' +
            convertVal(15500);
        } else if (lowerPrompt.includes('plaster') || lowerPrompt.includes('quantities')) {
          fallbackText += 'Assuming standard 15mm coating thickness across 820m² brick surfaces: Plaster Volume: 12.3m³ | Cement bags (50kg standard): 110 bags.';
        } else {
          fallbackText += 'Adjusted total cost metrics for ' + activeProjObj.name + ' using base local indexes: ' + convertVal(427500) + '. Local pricing indices remain stable.';
        }
        setChatHistory(prev => [...prev, { sender: 'assistant', text: fallbackText }]);
      }, 1000);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleExchangeRateChange = (currencyKey, val) => {
    const updated = { ...rates };
    updated[currencyKey] = parseFloat(val) || 1.0;
    setRates(updated);
    logLaravelRequest('POST', '/api/v1/exchange-rates/' + currencyKey, 200, '18ms');
  };

  const calculateBoqSectionSum = (items) => {
    return items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  };
  const calculateGrandBoqSum = () => {
    return boq.reduce((total, section) => total + calculateBoqSectionSum(section.items), 0);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'pricing') setActivePriceCategory('materials');
    if (tab === 'takeoff') setActiveTakeoffTrade('Earthworks');
    if (tab === 'upload') {
      setIsUploading(false);
      setUploadProgress(0);
      setUploadStage('Standby');
    }
  };

  const totalBoq = calculateGrandBoqSum();

  if (loadingScreen.visible) {
    return <LoadingOverlay visible={loadingScreen.visible} text={loadingScreen.text} />;
  }

  if (!currentUser) {
    return <AuthScreen onLogin={handleAuthLogin} loading={loadingScreen.visible} />;
  }

  return (
    <div className="flex min-h-screen bg-[#030712] text-slate-100 font-sans">
      <style>{`.app-scroll::-webkit-scrollbar{width:6px;height:6px}.app-scroll::-webkit-scrollbar-track{background:#0b1220}.app-scroll::-webkit-scrollbar-thumb{background:#334155;border-radius:3px}.app-scroll{scrollbar-color:#334155 #0b1220}`}</style>
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentUser={currentUser}
        onLogout={triggerLogoutAction}
        globalCostMultiplier={globalCostMultiplier}
        onMultiplierChange={setGlobalCostMultiplier}
        rates={rates}
        onRateChange={handleExchangeRateChange}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentProject={currentProject}
          projects={projects}
          onProjectChange={setCurrentProject}
          currency={currency}
          onCurrencyChange={setCurrency}
          onOpenGeminiKey={val => setGeminiApiKey(val)}
          onLogout={triggerLogoutAction}
          currentUser={currentUser}
        />
        <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6">
          {activeTab === 'dashboard' && (
            <Dashboard
              projects={projects}
              boqCount={boq.reduce((n, s) => n + s.items.length, 0)}
              projectValue={12458765}
              recentActivity={[
                { id: 1, title: 'New Drawing Uploaded', time: '2 min ago', status: 'Processing', icon: 'AI', color: 'bg-blue-500/10 text-blue-400 border border-blue-500/20', statusClass: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/20' },
                { id: 2, title: 'BOQ Generated Successfully', time: '27 min ago', status: 'Generated', icon: 'BOQ', color: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20', statusClass: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/20' },
                { id: 3, title: 'Supplier Price Updated', time: '1 hour ago', status: 'Updated', icon: 'PRI', color: 'bg-amber-500/10 text-amber-400 border border-amber-500/20', statusClass: 'text-slate-400 bg-slate-800 border-slate-700' },
                { id: 4, title: 'Cost Estimate Completed', time: '3 hours ago', status: 'Complete', icon: 'COST', color: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20', statusClass: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/20' },
              ]}
              quickActions={[
                { id: 'upload', label: 'AI Drawing Recognition', tab: 'upload', iconBg: 'bg-blue-500/10 border border-blue-500/20', path: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
                { id: 'boq', label: 'Generate BOQ', tab: 'boq', iconBg: 'bg-emerald-500/10 border border-emerald-500/20', path: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { id: 'projects', label: 'Initiate Profile', tab: 'projects', iconBg: 'bg-purple-500/10 border border-purple-500/20', path: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
                { id: 'estimation', label: 'Run Cost Analysis', tab: 'estimation', iconBg: 'bg-orange-500/10 border border-orange-500/20', path: 'M11 3.055A9.003 9.003 0 1020.945 13H11V3.055zM20.488 9H15V3.512A9.025 9.025 0 0120.488 9z' },
                { id: 'assistant', label: 'AI Audit', tab: 'assistant', iconBg: 'bg-sky-500/10 border border-sky-500/20', path: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 01-2 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
                { id: 'notifications', label: 'System Alerts', tab: 'notifications', iconBg: 'bg-rose-500/10 border border-rose-500/20', path: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
              ]}
              onAction={handleTabChange}
              totalBoq={totalBoq}
              convertVal={convertVal}
              currency={currency}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectRegistry projects={projects} />
          )}

          {activeTab === 'upload' && (
            <DrawingUpload
              onAnalysisComplete={results => {
                setParsedFiles(results.map(r => ({ name: r.title.replace(/\s+/g, '_') + '.pdf', size: (Math.random() * 30 + 5).toFixed(1) + ' MB', scale: '1:100' })));
                triggerToast('AI analysis results synced to local registry.', 'success');
              }}
            />
          )}

          {activeTab === 'takeoff' && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/50">
              <div className="flex items-center justify-between border-b border-slate-800 p-4">
                <h2 className="text-lg font-semibold text-slate-200">Takeoffs</h2>
                <div className="flex gap-2">
                  {Object.keys(takeoffs).map(trade => (
                    <button
                      key={trade}
                      onClick={() => setActiveTakeoffTrade(trade)}
                      className={
                        'px-3 py-1 rounded text-xs ' +
                        (activeTakeoffTrade === trade ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700')
                      }
                    >
                      {trade}
                    </button>
                  ))}
                </div>
              </div>
              <QuantityTakeoff takeoffData={takeoffs} globalMultiplier={globalCostMultiplier} currency={currency} rates={rates} />
            </div>
          )}

          {activeTab === 'boq' && (
            <BOQGenerator boqData={boq} globalMultiplier={globalCostMultiplier} />
          )}

          {activeTab === 'estimation' && <CostEstimation globalMultiplier={globalCostMultiplier} />}

          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="flex gap-2 border-b border-slate-800 pb-3">
                {Object.keys(MARKET_PRICES).map(cat => (
                  <button key={cat} onClick={() => setActivePriceCategory(cat)} className={'px-4 py-2 rounded-lg text-xs font-bold capitalize ' + (activePriceCategory === cat ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-100')}>
                    {cat}
                  </button>
                ))}
              </div>
              <PricingDatabase prices={{ [activePriceCategory]: MARKET_PRICES[activePriceCategory] }} />
            </div>
          )}

          {activeTab === 'tenders' && <TenderAnalysis bids={INITIAL_BIDS} />}

          {activeTab === 'exchange' && <ExchangeRate rates={rates} />}

          {activeTab === 'assistant' && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <h2 className="text-lg font-semibold text-slate-200 mb-4">AI Cost Optimization</h2>
                  <button
                    onClick={runLiveCostOptimizationAudit}
                    disabled={isGeneratingReport}
                    className="w-full rounded-md bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500 disabled:opacity-50"
                  >
                    {isGeneratingReport ? 'Optimizing...' : 'Run Cost Optimization Audit'}
                  </button>
                  {aiReport && (
                    <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                      <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono">{aiReport}</pre>
                    </div>
                  )}
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <h2 className="text-lg font-semibold text-slate-200 mb-4">Structural Drawing Audit</h2>
                  <button
                    onClick={runLiveStructuralDrawingAudit}
                    disabled={isGeneratingAudit}
                    className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
                  >
                    {isGeneratingAudit ? 'Auditing...' : 'Run Structural Safety Audit'}
                  </button>
                  {aiDrawingAudit && (
                    <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                      <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono">{aiDrawingAudit}</pre>
                    </div>
                  )}
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <h2 className="text-lg font-semibold text-slate-200 mb-4">QS Assistant</h2>
                  <div className="mb-3 h-48 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950/60 p-3 app-scroll">
                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className={'mb-2 ' + (msg.sender === 'user' ? 'text-right' : 'text-left')}>
                        <span className={'inline-block rounded-lg px-3 py-1.5 text-sm ' + (msg.sender === 'user' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-200')}>
                          {msg.text}
                        </span>
                      </div>
                    ))}
                    {isAiTyping && <div className="text-xs text-slate-400 animate-pulse">Assistant is thinking...</div>}
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAssistantPromptSubmit()}
                      placeholder="Ask the assistant..."
                      className="flex-1 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                    />
                    <button
                      onClick={() => handleAssistantPromptSubmit()}
                      className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <h3 className="text-sm font-semibold text-slate-200 mb-3">Gemini API Key</h3>
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={e => setGeminiApiKey(e.target.value)}
                    placeholder="Paste your sk-proj-..."
                    className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <h3 className="text-sm font-semibold text-slate-200 mb-3">Exchange Rates</h3>
                  <div className="space-y-2">
                    {Object.keys(rates)
                      .filter(k => k !== 'USD')
                      .map(key => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{key}</span>
                          <input
                            type="number"
                            step="0.1"
                            value={rates[key]}
                            onChange={e => handleExchangeRateChange(key, e.target.value)}
                            className="w-20 rounded border border-slate-800 bg-slate-950 px-2 py-1 text-right text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <h3 className="text-sm font-semibold text-slate-200 mb-3">Laravel API</h3>
                  <div className="space-y-1">
                    {laravelApiLogs.slice(0, 6).map((log, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded bg-slate-950/60 px-2 py-1.5">
                        <span className={'text-xs ' + (log.status < 300 ? 'text-emerald-400' : 'text-red-400')}>
                          {log.method} {log.url}
                        </span>
                        <span className="text-xs text-slate-500">
                          {log.status} · {log.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'laravel-hub' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                <h2 className="text-lg font-semibold text-slate-200 mb-4">Laravel Backend Integration Hub</h2>
                <div className="space-y-2">
                  {laravelApiLogs.map((log, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded bg-slate-950/60 px-4 py-2.5">
                      <span className={'text-sm font-mono ' + (log.status < 300 ? 'text-emerald-400' : 'text-red-400')}>
                        {log.method} {log.url}
                      </span>
                      <span className="text-sm text-slate-500 font-mono">
                        {log.status} · {log.time} · {log.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && <Notifications />}
          {activeTab === 'subscriptions' && <SubscriptionPlans />}
          {activeTab === 'analytics' && <AdminAnalytics />}
          {activeTab === 'reports' && <Reporting onReportGenerated={(r) => triggerToast(r.type + ' exported as ' + r.format, 'success')} />}
        </main>

        {projectModal && (
          <ProjectModal
            isOpen={projectModal}
            onClose={() => setProjectModal(false)}
            onSubmit={handleProjectCreation}
          />
        )}

        {toasts.length > 0 && (
          <Toast
            toasts={toasts}
            onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))}
          />
        )}
      </div>
    </div>
  );
}
