// Filename: src/pages/dashboard/OmniDashboard.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HeartPulse, LayoutDashboard, FileText, Users, QrCode, 
  PlayCircle, AlertTriangle, ShieldCheck, TrendingUp, 
  CheckCircle2, XCircle, Bot, Send, ShieldAlert, 
  User, Home, Droplets, Pill, Activity, Smartphone
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useProfileStore } from '../../store/useProfileStore';

export default function OmniDashboard() {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { profile, fetchProfile, isLoading } = useProfileStore();
  const [chatInput, setChatInput] = useState('');

  // Fetch the user's deep health data when the dashboard loads
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Calculate SVG Circle values for the Readiness Score
  const radius = 36;
  const circumference = 2 * Math.PI * radius; // ~226.2
  const score = profile?.profileCompletionScore || 0;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-slate-50 text-slate-800 font-sans h-screen overflow-hidden flex flex-col md:flex-row selection:bg-blue-100 selection:text-blue-900">
      
      {/* =========================================
          DESKTOP SIDEBAR
      ========================================= */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-full z-20 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <HeartPulse className="w-8 h-8 text-blue-600" strokeWidth={2.5} />
          <span className="ml-3 font-extrabold text-xl tracking-tight text-slate-900">G-ONE</span>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto">
          <SidebarLink icon={<LayoutDashboard />} label="Dashboard" active />
          <SidebarLink icon={<FileText />} label="Health Vault" to="/vault" />
          <SidebarLink icon={<Users />} label="Family Guardian" />
          <SidebarLink icon={<QrCode />} label="Health Passport" />
          
          <div className="mt-6 pt-6 border-t border-slate-100 px-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tools</p>
            <button className="w-full flex items-center py-2 text-slate-500 hover:text-blue-600 font-medium transition-colors text-sm">
              <PlayCircle className="w-5 h-5 mr-2" /> Simulation Mode
            </button>
            <button className="w-full flex items-center py-2 text-slate-500 hover:text-blue-600 font-medium transition-colors text-sm mt-1">
              <Smartphone className="w-5 h-5 mr-2" /> Connect Wearable
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl shadow-[0_4px_15px_rgba(239,68,68,0.3)] transition-transform active:scale-95 font-bold">
            <AlertTriangle className="w-6 h-6" /> EMERGENCY SOS
          </button>
        </div>
      </aside>

      {/* =========================================
          MAIN CONTENT AREA
      ========================================= */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto w-full">
        
        {/* MOBILE HEADER */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-7 h-7 text-blue-600" strokeWidth={2.5} />
            <span className="font-extrabold text-lg tracking-tight text-slate-900">G-ONE</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm border-2 border-white">
            {authUser?.name?.charAt(0).toUpperCase()}
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full space-y-6 pb-24 md:pb-8">
          
          {/* DASHBOARD WELCOME & SCORE GRID */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Welcome Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
              className="flex-1 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] pointer-events-none">
                <ShieldCheck className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <p className="text-slate-500 font-medium mb-1">Authenticated Session</p>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                  Welcome back, {authUser?.name?.split(' ')[0] || 'User'}.
                </h1>
                <p className="text-sm font-medium text-emerald-700 bg-emerald-50 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" /> AI Context Engine is Active
                </p>
              </div>
            </motion.div>

            {/* Emergency Readiness Score (Dark Card) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="w-full lg:w-80 bg-slate-900 text-white rounded-3xl p-6 shadow-xl shadow-slate-900/10 border border-slate-800 flex flex-col relative overflow-hidden shrink-0"
            >
              <h3 className="font-bold text-sm text-slate-300 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Emergency Preparedness
              </h3>
              
              <div className="flex items-center gap-6 mb-6">
                {/* Real SVG Circular Progress */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="transform -rotate-90 w-20 h-20">
                    <circle cx="40" cy="40" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                    <motion.circle 
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      cx="40" cy="40" r={radius} stroke="#10B981" strokeWidth="8" fill="none" 
                      strokeLinecap="round" strokeDasharray={circumference} 
                    />
                  </svg>
                  <span className="absolute font-bold text-xl">{score}%</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-200 font-bold mb-0.5">
                    {score >= 80 ? 'Excellent status.' : score >= 50 ? 'Moderate status.' : 'Needs attention.'}
                  </p>
                  <p className="text-xs text-slate-400 leading-snug">Complete your Vault tasks to reach 100%.</p>
                </div>
              </div>

              {/* Dynamic Checklist based on real data */}
              <div className="space-y-3 text-sm mt-auto">
                <div className={`flex items-center justify-between ${profile?.bloodGroup && profile.bloodGroup !== 'Unknown' ? 'text-emerald-500' : 'text-amber-400'}`}>
                  <span className="flex items-center gap-2 font-medium">
                    {profile?.bloodGroup && profile.bloodGroup !== 'Unknown' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />} Blood Group
                  </span>
                  {(!profile?.bloodGroup || profile.bloodGroup === 'Unknown') && (
                    <Link to="/vault" className="text-[11px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors text-white">Add</Link>
                  )}
                </div>
                <div className={`flex items-center justify-between ${profile?.emergencyContacts?.length > 0 ? 'text-emerald-500' : 'text-amber-400'}`}>
                  <span className="flex items-center gap-2 font-medium">
                    {profile?.emergencyContacts?.length > 0 ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />} Emerg. Contacts
                  </span>
                  {(!profile?.emergencyContacts || profile.emergencyContacts.length === 0) && (
                    <Link to="/vault" className="text-[11px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors text-white">Add</Link>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* LOWER GRID: CHAT & QR */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* AI Chat Area (Col Span 2) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="col-span-1 lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[550px]"
            >
              <div className="bg-blue-50/50 border-b border-blue-100/50 p-4 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm relative">
                    <Bot className="w-6 h-6" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">Omni-Care Doctor</h3>
                    <p className="text-[11px] text-blue-600 font-bold tracking-wide uppercase">Context-Aware</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/30 space-y-6">
                {/* User Input Bubble */}
                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-500 font-bold text-xs">
                    YOU
                  </div>
                  <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-sm text-[15px] font-medium">
                    I have severe chest pain.
                  </div>
                </div>

                {/* AI Response Bubble */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-2 max-w-[95%]">
                    <div className="bg-white border border-slate-200 p-4 md:p-5 rounded-2xl rounded-tl-none shadow-sm text-slate-700 text-[15px] leading-relaxed">
                      <p className="mb-4 font-bold text-slate-900">Based on your saved medical history, this situation requires urgent medical evaluation.</p>
                      
                      {/* Dynamic Context Tags (Uses Real Data if available, else mocks) */}
                      <div className="flex flex-wrap gap-2 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {profile?.medicalConditions?.length > 0 ? (
                          profile.medicalConditions.map((cond, i) => (
                            <span key={i} className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1 rounded-md">
                              <Activity className="w-3 h-3" /> {cond}
                            </span>
                          ))
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2 py-1 rounded-md">
                            <Activity className="w-3 h-3" /> Heart Surgery (2022)
                          </span>
                        )}
                        {profile?.allergies?.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md">
                            <ShieldAlert className="w-3 h-3" /> Allergy: {profile.allergies[0]}
                          </span>
                        )}
                      </div>

                      <p className="font-bold text-slate-900 mb-2">Suggested Immediate Actions:</p>
                      <ul className="space-y-3 mb-5 text-slate-800 font-medium">
                        <li className="flex items-start gap-2"><XCircle className="w-5 h-5 text-amber-500 shrink-0" /> Stop all physical activity immediately.</li>
                        <li className="flex items-start gap-2"><HeartPulse className="w-5 h-5 text-red-500 shrink-0" /> Chew an aspirin if not allergic.</li>
                      </ul>
                      
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-center justify-between shadow-inner">
                        <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                          <AlertTriangle className="w-5 h-5" /> SOS Protocol Ready
                        </div>
                        <button className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm active:scale-95">
                          Trigger SOS
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-slate-100 bg-white shrink-0">
                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-transparent px-3 py-2 outline-none text-[15px] font-medium placeholder:text-slate-400" 
                    placeholder="Describe symptoms or ask a medical question..."
                  />
                  <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm active:scale-95">
                    <Send className="w-5 h-5 ml-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Health Passport QR Snippet (Col Span 1) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="col-span-1"
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-0"></div>
                <h3 className="font-extrabold text-slate-900 mb-1 relative z-10 flex items-center gap-2 text-lg">
                  <QrCode className="w-6 h-6 text-blue-600" /> Health Passport
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-6 relative z-10">Scan for instant emergency context.</p>
                
                <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 flex flex-col items-center justify-center mb-6 shadow-sm relative z-10">
                  <QrCode className="w-32 h-32 text-slate-800" strokeWidth={1} />
                </div>
                
                <div className="space-y-3 text-sm font-medium relative z-10 mt-auto">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><Droplets className="w-4 h-4" /> Blood Group</span>
                    <span className={`font-bold ${profile?.bloodGroup && profile.bloodGroup !== 'Unknown' ? 'text-red-600' : 'text-slate-400'}`}>
                      {profile?.bloodGroup || 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><ShieldAlert className="w-4 h-4" /> Allergies</span>
                    <span className="font-bold text-slate-900 truncate max-w-[120px]">
                      {profile?.allergies?.length > 0 ? profile.allergies[0] : 'None recorded'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-1.5"><Pill className="w-4 h-4" /> Medications</span>
                    <span className="font-bold text-slate-900">
                      {profile?.medications?.length || 0} Active
                    </span>
                  </div>
                </div>
                
                <Link to="/vault" className="w-full mt-6 bg-slate-900 text-white font-bold py-3.5 rounded-xl text-sm hover:bg-slate-800 transition-all active:scale-[0.98] text-center shadow-md relative z-10 block">
                  Update Vault Data
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      {/* =========================================
          MOBILE BOTTOM NAVIGATION
      ========================================= */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 z-40 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center px-6 py-2 relative">
          <MobileNavLink icon={<Home />} label="Home" active />
          <MobileNavLink icon={<FileText />} label="Vault" to="/vault" />
          
          {/* Central Floating SOS Button */}
          <div className="relative -top-6">
            <button className="bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(239,68,68,0.4)] border-4 border-[#F8FAFC] transition-transform active:scale-95">
              <ShieldAlert className="w-8 h-8" strokeWidth={2.5} />
            </button>
          </div>

          <MobileNavLink icon={<QrCode />} label="Passport" />
          <MobileNavLink icon={<User />} label="Profile" />
        </div>
      </nav>

    </div>
  );
}

// --- Helper Components ---

function SidebarLink({ icon, label, active, to = "#" }) {
  if (to !== "#") {
    return (
      <Link to={to} className={`w-full flex items-center p-3 rounded-xl font-semibold transition-colors ${active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
        {React.cloneElement(icon, { className: "w-5 h-5" })}
        <span className="ml-3">{label}</span>
      </Link>
    );
  }
  return (
    <button className={`w-full flex items-center p-3 rounded-xl font-semibold transition-colors ${active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
      {React.cloneElement(icon, { className: "w-5 h-5" })}
      <span className="ml-3">{label}</span>
    </button>
  );
}

function MobileNavLink({ icon, label, active, to = "#" }) {
  if (to !== "#") {
    return (
      <Link to={to} className={`flex flex-col items-center gap-1 p-2 transition-colors ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'}`}>
        {React.cloneElement(icon, { className: "w-6 h-6" })}
        <span className="text-[10px] font-bold">{label}</span>
      </Link>
    );
  }
  return (
    <button className={`flex flex-col items-center gap-1 p-2 transition-colors ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'}`}>
      {React.cloneElement(icon, { className: "w-6 h-6" })}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}