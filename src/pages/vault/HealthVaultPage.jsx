import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Activity, Droplets, Ruler, Weight, 
  Pill, AlertTriangle, User, Edit3, X, Save, 
  ChevronLeft, Sparkles, HeartPulse
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useProfileStore } from '../../store/useProfileStore';
import { useNavigate } from 'react-router-dom';

export default function HealthVaultPage() {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { profile, isLoading, fetchProfile, updateProfile, isUpdating } = useProfileStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch the profile data when the page loads
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full" />
      </div>
    );
  }

  // Determine color based on readiness score
  const scoreColor = profile.profileCompletionScore >= 80 ? 'text-emerald-500' : profile.profileCompletionScore >= 50 ? 'text-amber-500' : 'text-rose-500';
  const scoreBg = profile.profileCompletionScore >= 80 ? 'bg-emerald-50' : profile.profileCompletionScore >= 50 ? 'bg-amber-50' : 'bg-rose-50';

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="p-2 -ml-2 text-slate-400 hover:text-slate-800 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-blue-600" />
            <h1 className="font-extrabold text-lg tracking-tight">Health Vault</h1>
          </div>
          <button onClick={() => setIsEditModalOpen(true)} className="p-2 -mr-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        
        {}
        {/* AI Readiness Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 relative overflow-hidden flex items-center gap-6"
        >
          {/* Circular Progress Ring */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <motion.path 
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${profile.profileCompletionScore}, 100` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={scoreColor} strokeWidth="3" strokeDasharray="0, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-800 tracking-tighter">{profile.profileCompletionScore}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wider">AI Context Engine</h2>
            </div>
            <p className="text-slate-800 font-extrabold text-lg leading-tight mb-2">
              {profile.profileCompletionScore >= 80 ? "You are fully prepared." : profile.profileCompletionScore >= 50 ? "Almost ready for emergencies." : "Your profile needs attention."}
            </p>
            <p className="text-slate-500 text-sm">
              Higher scores give the AI better context to save your life.
            </p>
          </div>
        </motion.div>

        {}
        {/* Vitals Grid */}
        <h3 className="font-extrabold text-slate-900 text-lg px-1 pt-2">Basic Vitals</h3>
        <div className="grid grid-cols-3 gap-3">
          <VitalCard icon={<Droplets />} title="Blood" value={profile.bloodGroup} color="text-rose-500" bg="bg-rose-50" border="border-rose-100" />
          <VitalCard icon={<Ruler />} title="Height" value={profile.height ? `${profile.height} cm` : '--'} color="text-blue-500" bg="bg-blue-50" border="border-blue-100" />
          <VitalCard icon={<Weight />} title="Weight" value={profile.weight ? `${profile.weight} kg` : '--'} color="text-indigo-500" bg="bg-indigo-50" border="border-indigo-100" />
        </div>

        {}
        {/* Medical Info Lists */}
        <div className="space-y-4">
          <InfoCard 
            icon={<AlertTriangle className="text-amber-500" />} title="Known Allergies" 
            items={profile.allergies} placeholder="No allergies recorded. Tap Edit to add."
          />
          <InfoCard 
            icon={<Activity className="text-rose-500" />} title="Medical Conditions" 
            items={profile.medicalConditions} placeholder="No conditions recorded."
          />
        </div>
      </main>

      {}
      {/* EDIT MODAL */}
      <AnimatePresence>
        {isEditModalOpen && (
          <EditProfileModal 
            profile={profile} 
            onClose={() => setIsEditModalOpen(false)} 
            onSave={(data) => {
              updateProfile(data);
              setIsEditModalOpen(false);
            }} 
            isUpdating={isUpdating}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function VitalCard({ icon, title, value, color, bg, border }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`p-4 rounded-2xl ${bg} border ${border} flex flex-col items-center justify-center text-center shadow-sm`}>
      <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm ${color}`}>
        {React.cloneElement(icon, { className: "w-4 h-4" })}
      </div>
      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
      <span className="text-lg font-black text-slate-800">{value}</span>
    </motion.div>
  );
}

function InfoCard({ icon, title, items, placeholder }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-slate-50 rounded-xl">{React.cloneElement(icon, { className: "w-5 h-5" })}</div>
        <h3 className="font-extrabold text-slate-900 text-lg">{title}</h3>
      </div>
      {items && items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, idx) => (
            <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-semibold">
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-sm font-medium">{placeholder}</p>
      )}
    </motion.div>
  );
}

function EditProfileModal({ profile, onClose, onSave, isUpdating }) {
  // Local state for the form
  const [formData, setFormData] = useState({
    bloodGroup: profile.bloodGroup || 'Unknown',
    height: profile.height || '',
    weight: profile.weight || '',
    allergies: profile.allergies ? profile.allergies.join(', ') : '',
    medicalConditions: profile.medicalConditions ? profile.medicalConditions.join(', ') : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert comma separated strings back to arrays before sending to backend
    const formattedData = {
      ...formData,
      allergies: formData.allergies.split(',').map(s => s.trim()).filter(Boolean),
      medicalConditions: formData.medicalConditions.split(',').map(s => s.trim()).filter(Boolean),
    };
    onSave(formattedData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-0 sm:p-4">
      <motion.div 
        initial={{ y: "100%", opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: "100%", opacity: 0 }} 
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-extrabold text-slate-800">Update Medical Profile</h2>
          <button onClick={onClose} className="p-2 bg-slate-200/50 hover:bg-slate-200 text-slate-500 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Blood Group</label>
              <select 
                value={formData.bloodGroup} 
                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {['Unknown', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Height (cm)</label>
                <input type="number" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" placeholder="175" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Weight (kg)</label>
                <input type="number" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" placeholder="70" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Allergies (Comma separated)</label>
              <input type="text" value={formData.allergies} onChange={(e) => setFormData({...formData, allergies: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" placeholder="Peanuts, Penicillin..." />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Medical Conditions</label>
              <input type="text" value={formData.medicalConditions} onChange={(e) => setFormData({...formData, medicalConditions: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium" placeholder="Asthma, Diabetes..." />
            </div>
          </form>
        </div>

        <div className="p-4 border-t border-slate-100 bg-white">
          <button 
            form="edit-profile-form" 
            type="submit" 
            disabled={isUpdating}
            className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isUpdating ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> : <><Save className="w-5 h-5" /> Save to Vault</>}
          </button>
        </div>
      </motion.div>
    </div>
  );
}