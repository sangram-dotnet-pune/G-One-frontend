// Filename: src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // Added React Router Link
import {
  HeartPulse, Bot, User, Send, Mic, Camera, 
  MapPin, AlertCircle, ShieldCheck, Pill, 
  ChevronRight, Sparkles, Activity, Home, 
  FileText, PhoneCall, Stethoscope, Bell, FolderHeart
} from 'lucide-react';

export default function App() {
  // Global State for Guest Chat
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // 2. Simulate AI Contextual Response (Omni-care logic)
    setTimeout(() => {
      setIsTyping(false);
      const inputLower = text.toLowerCase();
      
      // Determine if the query is an emergency or everyday health question
      const isEmergency = inputLower.includes('pain') || inputLower.includes('help') || inputLower.includes('attack') || inputLower.includes('crash');
      
      const newAiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        type: isEmergency ? 'emergency' : 'standard',
        text: isEmergency 
          ? "This sounds like a potential medical emergency. Because you are in Guest Mode, I cannot check this against your medical history or allergies."
          : "I can help with that. Since you're not logged in, this is general guidance. Would you like me to analyze a symptom or scan a medicine label?",
        subtext: isEmergency 
          ? "Please seek immediate medical attention." 
          : "Sign in to allow me to personalize this advice to your health profile.",
        options: isEmergency 
          ? [
              { icon: <MapPin/>, label: 'Locate Hospital', style: 'primary', action: 'hospital' }, 
              { icon: <PhoneCall/>, label: 'Call 911', style: 'danger', action: 'call' }
            ]
          : [
              { icon: <ShieldCheck/>, label: 'Log In / Register', style: 'primary', action: 'auth' }, 
              { icon: <Pill/>, label: 'Scan Medicine', style: 'default', action: 'scan' }
            ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newAiMsg]);
    }, 1800);
  };

  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900 overflow-hidden relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-slate-50 to-slate-50">
      
      <TopNavigation />

      {/* Main Scrollable Area */}
      <main className="flex-1 overflow-y-auto w-full max-w-3xl mx-auto relative pt-16 md:pt-20 pb-40 md:pb-28 px-4 scroll-smooth">
        
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <WelcomeScreen key="welcome" onActionClick={handleSend} />
          ) : (
            <motion.div 
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 pt-6"
            >
              {/* Context Warning for Guests */}
              <div className="flex justify-center mb-6">
                <span className="bg-slate-100 text-slate-500 border border-slate-200/60 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm">
                  <Bot className="w-3.5 h-3.5" /> Guest Session Active
                </span>
              </div>

              {/* Chat Message List */}
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} className="h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Chat Input Box */}
      <div className="absolute bottom-[72px] md:bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent pointer-events-none z-20">
        <div className="max-w-3xl mx-auto pointer-events-auto">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-200/80 transition-all focus-within:shadow-[0_8px_30px_rgba(37,99,235,0.12)] focus-within:border-blue-300 focus-within:bg-white"
          >
            <button type="button" className="p-3 text-slate-400 hover:text-blue-600 rounded-full transition-colors active:scale-95">
              <Camera className="w-5 h-5" />
            </button>
            
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent text-[15px] px-2 outline-none placeholder:text-slate-400 font-medium text-slate-800 w-full" 
              placeholder="Ask about symptoms, medicines, or emergencies..." 
            />
            
            <AnimatePresence mode="popLayout">
              {inputValue.trim() ? (
                <motion.button 
                  key="send"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  type="submit" 
                  className="w-11 h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-transform active:scale-95 flex-shrink-0"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </motion.button>
              ) : (
                <motion.button 
                  key="mic"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  type="button" 
                  className="w-11 h-11 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full transition-colors border border-blue-100 hover:bg-blue-100 active:scale-95 flex-shrink-0"
                >
                  <Mic className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </form>
          <div className="text-center mt-2.5 hidden md:block">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> Powered by G-ONE Context Engine
            </p>
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}

function TopNavigation() {
  return (
    <header className="fixed top-0 w-full z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <HeartPulse className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 hidden sm:block">
            G-ONE
          </span>
        </div>

        {/* Auth CTA with real React Router Links */}
        <div className="flex items-center gap-4">
          <Link to="/auth" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            Log In
          </Link>
          
          <Link to="/auth" className="bg-slate-900 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-md flex items-center gap-2">
            <span>Register</span>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function WelcomeScreen({ onActionClick }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center min-h-[70vh] text-center pt-8"
    >
      <motion.div variants={item} className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center text-blue-600 mb-6 shadow-inner rotate-3">
        <Bot className="w-10 h-10" />
      </motion.div>
      
      <motion.h1 variants={item} className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3 leading-tight">
        How can I help you today?
      </motion.h1>
      
      <motion.p variants={item} className="text-slate-500 text-[15px] max-w-md mb-10 px-4">
        Your everyday AI Health Guardian. From daily wellness and medicine tracking, to instant emergency response.
      </motion.p>

      {/* Generalized Quick Action Grid */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl px-2">
        <QuickActionCard 
          icon={<Stethoscope className="text-indigo-500" />} 
          title="Symptom Check" 
          bg="bg-indigo-50" 
          onClick={() => onActionClick("I need to check some symptoms I am having.")} 
        />
        <QuickActionCard 
          icon={<Pill className="text-teal-500" />} 
          title="Scan Medicine" 
          bg="bg-teal-50" 
          onClick={() => onActionClick("What does this medicine do and what are its side effects?")} 
        />
        <QuickActionCard 
          icon={<MapPin className="text-blue-500" />} 
          title="Find Hospital" 
          bg="bg-blue-50" 
          onClick={() => onActionClick("Find nearby hospitals or clinics.")} 
        />
        <QuickActionCard 
          icon={<Activity className="text-rose-500" />} 
          title="First Aid" 
          bg="bg-rose-50" 
          onClick={() => onActionClick("I need immediate first aid guidance.")} 
        />
      </motion.div>
    </motion.div>
  );
}

function QuickActionCard({ icon, title, bg, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="bg-white p-4 rounded-3xl border border-slate-200/80 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all text-left group flex flex-col items-center text-center active:scale-95"
    >
      <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
      <span className="font-bold text-slate-700 text-[13px]">{title}</span>
    </button>
  );
}

function ChatBubble({ message }) {
  const isAI = message.sender === 'ai';
  const isEmergency = message.type === 'emergency';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: isAI ? 'bottom left' : 'bottom right' }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`flex items-end gap-2.5 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      {/* AI Avatar */}
      {isAI && (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm z-10 border ${
          isEmergency ? 'bg-rose-100 border-rose-200 text-rose-600' : 'bg-blue-50 border-blue-100 text-blue-600'
        }`}>
          <Bot className="w-4 h-4" />
        </div>
      )}

      {/* Bubble Container */}
      <div className={`flex flex-col gap-1.5 max-w-[85%] md:max-w-[75%] ${isAI ? 'items-start' : 'items-end'}`}>
        
        <div className={`p-4 shadow-sm text-[15px] leading-relaxed font-medium relative overflow-hidden ${
          !isAI 
            ? 'bg-slate-900 text-white rounded-3xl rounded-br-sm shadow-md' 
            : 'bg-white border border-slate-200/80 text-slate-800 rounded-3xl rounded-bl-sm'
        }`}>
          
          {/* Emergency Glow for AI responses in Emergency Mode */}
          {isEmergency && isAI && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-red-500"></div>
          )}

          {message.text}
          
          {/* Context Warning Subtext */}
          {message.subtext && (
            <div className={`mt-3 pt-3 border-t text-[12px] font-bold flex items-start gap-1.5 ${
              isEmergency ? 'text-rose-600 border-rose-100' : 'text-slate-500 border-slate-100'
            }`}>
              <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{message.subtext}</span>
            </div>
          )}
        </div>
        
        <span className="text-[10px] font-bold text-slate-400 px-1">{message.timestamp}</span>

        {/* Action Options (Buttons below the chat bubble) */}
        {message.options && (
          <div className="flex flex-col gap-2 mt-1 w-full sm:flex-row sm:flex-wrap">
            {message.options.map((opt, idx) => {
              // Wrap the Auth button in a Link, otherwise use standard button
              const ButtonContent = (
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl text-[13px] font-bold shadow-sm transition-colors border ${
                    opt.style === 'primary' 
                      ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                      : opt.style === 'danger'
                      ? 'bg-rose-600 text-white border-rose-700 hover:bg-rose-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {React.cloneElement(opt.icon, { className: "w-4 h-4" })}
                  {opt.label}
                </motion.button>
              );

              return opt.action === 'auth' ? (
                <Link to="/auth" key={idx}>{ButtonContent}</Link>
              ) : (
                <React.Fragment key={idx}>{ButtonContent}</React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transformOrigin: 'bottom left' }}
      className="flex items-end gap-2.5"
    >
      <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 z-10">
        <Bot className="w-4 h-4 text-blue-600" />
      </div>
      <div className="bg-white border border-slate-200/80 px-4 py-4 rounded-3xl rounded-bl-sm shadow-sm flex items-center gap-1.5">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
      </div>
    </motion.div>
  );
}

function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 z-30 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center px-6 py-2 relative">
        <button className="flex flex-col items-center gap-1 p-2 text-blue-600 transition-colors">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-slate-900 transition-colors">
          <FolderHeart className="w-6 h-6" />
          <span className="text-[10px] font-bold">Vault</span>
        </button>
        
        {/* Central SOS Button - Always accessible in case the everyday situation turns critical */}
        <div className="relative -top-6">
          <button className="bg-gradient-to-b from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(225,29,72,0.4)] border-4 border-[#F8FAFC] transition-transform active:scale-95">
            <AlertCircle className="w-8 h-8" strokeWidth={2.5} />
          </button>
        </div>

        <button className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-slate-900 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="text-[10px] font-bold">Alerts</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-slate-900 transition-colors">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </div>
    </nav>
  );
}