import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
  Terminal, 
  Smartphone, 
  Globe, 
  Server, 
  Database, 
  Code, 
  Bug, 
  Activity, 
  Layers, 
  Cpu, 
  Search, 
  Send, 
  FileText,
  X,
  Menu,
  ChevronRight,
  Download,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Sun,
  Moon
} from 'lucide-react';

/* ========================================
  DATA & CONFIGURATION
  ========================================
*/

const PROFILE = {
  name: "Awais Riaz",
  role: "Software Quality Assurance Engineer",
  location: "Lahore, Pakistan",
  experience: [
    {
      role: "Junior SQA Engineer",
      company: "Horizam",
      type: "Web & Mobile Applications",
      period: "Current"
    },
    {
      role: "SQA Intern",
      company: "Service Providers.pk",
      type: "ERP & Web Systems",
      period: "Previous"
    }
  ],
  skills: [
    "Manual Testing", "Test Case Design", "Smoke Testing", 
    "Sanity Testing", "Regression Testing", "UI / UX Testing", 
    "Mobile Testing (Android/iOS)", "API Testing (Postman)", "Bug Reporting"
  ],
  projects: [
    { title: "Security Guard Management System", category: "ERP System", desc: "Comprehensive security personnel tracking and scheduling." },
    { title: "Skip Management System", category: "ERP (UK-based)", desc: "Logistics and waste management workflow optimization." },
    { title: "Limo 911", category: "Mobile App", desc: "Ride booking application testing for real-time geolocation accuracy." },
    { title: "LinqBot / RU Link", category: "NFC Tech", desc: "NFC business card application ensuring seamless hardware-software pairing." },
    { title: "Mojo", category: "Web App (France)", desc: "Business profile management platform." },
    { title: "CodeHive", category: "Corporate Site", desc: "Software house portfolio website (UAE)." },
    { title: "Vlinq Store", category: "E-commerce", desc: "Full-cycle e-commerce platform testing." }
  ]
};

/* ========================================
  COMPONENTS
  ========================================
*/

// --- 1. Preloader ---
const Preloader = ({ onComplete }) => {
  const [text, setText] = useState("INITIALIZING KERNEL...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [
      { msg: "LOADING QA PROTOCOLS...", time: 500 },
      { msg: "CONNECTING TO TEST SERVER...", time: 1200 },
      { msg: "FETCHING TEST SCENARIOS...", time: 2000 },
      { msg: "SYSTEM READY.", time: 2800 }
    ];

    steps.forEach(step => {
      setTimeout(() => setText(step.msg), step.time);
    });

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    setTimeout(() => {
      onComplete();
    }, 3200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center font-mono text-cyan-500"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-64 mb-4">
        <div className="flex justify-between text-xs mb-1 opacity-70">
          <span>SYSTEM_BOOT</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full bg-slate-800 rounded overflow-hidden">
          <motion.div 
            className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <motion.p 
        key={text} 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-sm tracking-widest"
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

// --- 2. Interactive QA Simulations (The "Meat") ---

const SimulationBugReport = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 500)); setStep(1); // Type Title
      await new Promise(r => setTimeout(r, 1500)); setStep(2); // Select Severity
      await new Promise(r => setTimeout(r, 2500)); setStep(3); // Type Description
      await new Promise(r => setTimeout(r, 4000)); setStep(4); // Submit
    };
    sequence();
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-4 font-mono text-xs w-full max-w-md mx-auto shadow-2xl transition-colors duration-300">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-4">
        <span className="text-slate-500 dark:text-slate-400">JIRA-1024: Create Issue</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-slate-500 block mb-1">Summary</label>
          <div className="bg-white dark:bg-slate-800 p-2 rounded h-8 border border-slate-200 dark:border-slate-700 flex items-center shadow-sm">
             {step >= 1 && (
               <motion.span 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }}
                 className="text-slate-900 dark:text-white"
               >
                 Checkout button unresponsive on iOS Safari
               </motion.span>
             )}
             {step < 1 && <span className="animate-pulse text-cyan-500">|</span>}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
             <label className="text-slate-500 block mb-1">Severity</label>
             <div className="bg-white dark:bg-slate-800 p-2 rounded h-8 border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm">
                {step >= 2 ? <span className="text-red-500 dark:text-red-400 font-bold">Critical</span> : <span className="text-slate-400 dark:text-slate-600">Select...</span>}
                <ChevronRight className="w-3 h-3 text-slate-500 rotate-90" />
             </div>
          </div>
          <div className="flex-1">
             <label className="text-slate-500 block mb-1">Assignee</label>
             <div className="bg-white dark:bg-slate-800 p-2 rounded h-8 border border-slate-200 dark:border-slate-700 flex items-center shadow-sm">
                <span className="text-slate-700 dark:text-white">Dev Team A</span>
             </div>
          </div>
        </div>

        <div>
          <label className="text-slate-500 block mb-1">Description</label>
          <div className="bg-white dark:bg-slate-800 p-2 rounded h-24 border border-slate-200 dark:border-slate-700 shadow-sm">
             {step >= 3 && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-600 dark:text-slate-300 space-y-1">
                 <p>1. Open app on iPhone 13</p>
                 <p>2. Add item to cart</p>
                 <p>3. Tap 'Checkout'</p>
                 <p className="text-red-500 dark:text-red-400">ACTUAL: Nothing happens.</p>
                 <p className="text-green-600 dark:text-green-400">EXPECTED: Navigate to payment.</p>
               </motion.div>
             )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
           <motion.button 
             className={`px-4 py-1.5 rounded text-white ${step >= 4 ? 'bg-green-600' : 'bg-cyan-600'}`}
             animate={step >= 4 ? { scale: [1, 1.1, 1] } : {}}
           >
             {step >= 4 ? "Issue Created ✓" : "Create"}
           </motion.button>
        </div>
      </div>
    </div>
  );
};

const SimulationAPITesting = () => {
  const [status, setStatus] = useState("idle"); // idle, sending, received

  useEffect(() => {
    const cycle = async () => {
      setStatus("sending");
      await new Promise(r => setTimeout(r, 1500)); 
      setStatus("received");
    };
    cycle();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto font-mono text-xs">
      {/* Postman-ish UI */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 flex items-center gap-2 shadow-sm transition-colors duration-300">
         <span className="text-green-600 dark:text-green-400 font-bold">POST</span>
         <span className="text-slate-600 dark:text-slate-300 flex-1">https://api.system.com/v1/auth/login</span>
         <button className="bg-cyan-600 text-white px-3 py-1 rounded">SEND</button>
      </div>

      <div className="relative h-32 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded overflow-hidden flex items-center justify-center shadow-inner transition-colors duration-300">
         {/* Client */}
         <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded shadow-sm">
               <Smartphone className="text-slate-700 dark:text-white w-6 h-6" />
            </div>
            <span className="text-slate-500">Client</span>
         </div>

         {/* Server */}
         <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded shadow-sm">
               <Server className="text-slate-700 dark:text-white w-6 h-6" />
            </div>
            <span className="text-slate-500">Server</span>
         </div>

         {/* Packet Animation */}
         {status === "sending" && (
           <motion.div 
             className="absolute p-1 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]"
             initial={{ left: "15%" }}
             animate={{ left: "80%" }}
             transition={{ duration: 1, ease: "linear" }}
           >
             <Code className="w-4 h-4 text-white dark:text-black" />
           </motion.div>
         )}

         {status === "received" && (
           <motion.div 
             className="absolute p-1 bg-green-500 rounded-full shadow-[0_0_10px_lime]"
             initial={{ left: "80%" }}
             animate={{ left: "15%" }}
             transition={{ duration: 1, ease: "linear" }}
           >
             <CheckCircle className="w-4 h-4 text-white dark:text-black" />
           </motion.div>
         )}
      </div>

      {/* Response Panel */}
      <AnimatePresence>
        {status === "received" && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="bg-slate-100 dark:bg-slate-950 border border-green-500/30 p-3 rounded shadow-sm transition-colors duration-300"
          >
            <div className="flex justify-between mb-2 text-green-600 dark:text-green-400">
              <span>Status: 200 OK</span>
              <span>Time: 145ms</span>
            </div>
            <pre className="text-slate-600 dark:text-slate-400 text-[10px] leading-tight">
{`{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": 101,
    "role": "QA_ENGINEER"
  }
}`}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SimulationIntegration = () => {
  return (
    <div className="w-full max-w-lg mx-auto h-64 relative bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Nodes */}
      <motion.div 
        className="absolute top-4 left-4 p-3 bg-blue-100/50 dark:bg-blue-900/40 border border-blue-500/30 dark:border-blue-500/50 rounded-lg text-blue-700 dark:text-blue-300 flex flex-col items-center gap-1 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
      >
        <Smartphone size={20} />
        <span className="text-[10px]">Frontend</span>
      </motion.div>

      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-purple-100/50 dark:bg-purple-900/40 border border-purple-500/30 dark:border-purple-500/50 rounded-lg text-purple-700 dark:text-purple-300 flex flex-col items-center gap-1 z-10 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
      >
        <Layers size={24} />
        <span className="text-[10px]">API Gateway</span>
      </motion.div>

      <motion.div 
        className="absolute bottom-4 right-4 p-3 bg-emerald-100/50 dark:bg-emerald-900/40 border border-emerald-500/30 dark:border-emerald-500/50 rounded-lg text-emerald-700 dark:text-emerald-300 flex flex-col items-center gap-1 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
      >
        <Database size={20} />
        <span className="text-[10px]">Database</span>
      </motion.div>

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path 
          d="M 60 60 L 200 120" 
          className="stroke-blue-400 dark:stroke-[#60A5FA]"
          strokeWidth="2" 
          fill="none" 
          initial={{ pathLength: 0 }} 
          animate={{ pathLength: 1 }} 
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.path 
          d="M 280 150 L 400 200" 
          className="stroke-emerald-400 dark:stroke-[#34D399]"
          strokeWidth="2" 
          fill="none" 
          initial={{ pathLength: 0 }} 
          animate={{ pathLength: 1 }} 
          transition={{ duration: 1, delay: 1 }}
        />
      </svg>
      
      {/* Data Packets */}
      <motion.div 
        className="absolute w-2 h-2 bg-slate-900 dark:bg-white rounded-full shadow-glow"
        animate={{ offsetDistance: "100%" }}
        style={{ offsetPath: "path('M 60 60 L 200 120')" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute w-2 h-2 bg-slate-900 dark:bg-white rounded-full shadow-glow"
        animate={{ offsetDistance: "100%" }}
        style={{ offsetPath: "path('M 280 150 L 400 200')" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.7 }}
      />

      <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-400 dark:text-slate-500">
        DATA INTEGRITY CHECK... OK
      </div>
    </div>
  );
};

const SimulationChecklist = ({ title, items }) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-2xl transition-colors duration-300">
      <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <span className="font-mono text-sm text-cyan-600 dark:text-cyan-400 font-bold">{title.toUpperCase()} PROTOCOL</span>
        <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
      </div>
      <div className="p-4 space-y-3">
        {items.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.8 }}
            className="flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.8 + 0.3 }}
                className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 flex items-center justify-center group-hover:border-green-500"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.8 + 0.6 }}
                >
                  <CheckCircle className="w-3 h-3 text-green-500" />
                </motion.div>
              </motion.div>
              <span className="text-sm text-slate-600 dark:text-slate-300 font-mono">{item}</span>
            </div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.8 + 0.5 }}
              className="text-[10px] text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-0.5 rounded border border-green-200 dark:border-green-900"
            >
              PASS
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- 3. Main Modal Component ---

const QAModal = ({ type, isOpen, onClose }) => {
  if (!isOpen) return null;

  let Content = null;
  let Title = "";
  let Desc = "";

  switch (type) {
    case 'bug':
      Title = "Bug Reporting Workflow";
      Desc = "Standardized reporting using detailed severity metrics and reproduction steps.";
      Content = <SimulationBugReport />;
      break;
    case 'api':
      Title = "API Testing Architecture";
      Desc = "Validating endpoints, response times, and payload integrity using Postman methodology.";
      Content = <SimulationAPITesting />;
      break;
    case 'integration':
      Title = "Integration Testing";
      Desc = "Ensuring seamless data flow between Frontend, Backend, and Database layers.";
      Content = <SimulationIntegration />;
      break;
    case 'smoke':
      Title = "Smoke Testing Suite";
      Desc = "Critical path verification to ensure system stability before deep testing.";
      Content = <SimulationChecklist title="Smoke Test" items={["Application Launch", "User Login", "Dashboard Load", "Main Nav Response"]} />;
      break;
    case 'sanity':
      Title = "Sanity Testing Suite";
      Desc = "Deep dive verification on new functionality/patches.";
      Content = <SimulationChecklist title="Sanity Check" items={["New Feature Logic", "Boundary Analysis", "Integration Check", "Data Persistence"]} />;
      break;
    case 'regression':
      Title = "Regression Testing";
      Desc = "Ensuring new code changes haven't broken existing functionality.";
      Content = <SimulationChecklist title="Regression" items={["Core Workflows", "User Permissions", "Legacy Modules", "Performance Baseline"]} />;
      break;
    default:
      Content = <div>Module Loading...</div>;
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 dark:bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 w-full max-w-2xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] transition-colors duration-300"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-white dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Terminal className="text-cyan-600 dark:text-cyan-400 w-5 h-5" />
                {Title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{Desc}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors text-slate-600 dark:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Simulation Area */}
          <div className="p-8 bg-slate-100 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 flex items-center justify-center min-h-[400px] relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 dark:opacity-10 pointer-events-none"></div>
            {Content}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- 4. Main Sections ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 transition-colors duration-500">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black opacity-80"></div>
        <div className="absolute inset-0 opacity-5 dark:opacity-20 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div style={{ y: y1 }} className="text-left space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-100 dark:bg-cyan-900/10 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-4 transition-colors duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              SYSTEM ONLINE
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight transition-colors duration-300">
              AWAIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-600">RIAZ</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-mono border-l-4 border-cyan-500 pl-4 transition-colors duration-300">
              SOFTWARE QUALITY ASSURANCE ENGINEER
            </h2>
          </motion.div>

          <motion.p 
            className="text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Ensuring digital excellence through rigorous testing strategies. 
            Specializing in Manual, API, and Mobile Application Testing protocols.
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <a href="#qa-process" className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)]">
              <Activity size={18} />
              View QA Process
            </a>
            <a href="#projects" className="px-6 py-3 border border-slate-300 dark:border-slate-600 hover:border-cyan-600 dark:hover:border-white text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white rounded flex items-center gap-2 transition-all bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <Layers size={18} />
              View Projects
            </a>
            <button className="px-6 py-3 border border-slate-300 dark:border-slate-600 hover:border-cyan-500 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 rounded flex items-center gap-2 transition-all">
              <Download size={18} />
              Resume
            </button>
          </motion.div>
        </motion.div>

        {/* Dashboard Graphic */}
        <motion.div style={{ y: y2 }} className="relative hidden md:block">
          <div className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-2xl transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500" />
                 <div className="w-3 h-3 rounded-full bg-green-500" />
               </div>
               <div className="text-xs font-mono text-slate-400 dark:text-slate-500">DASHBOARD_V1.0</div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Test Cases</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">1,248</div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-2 rounded-full overflow-hidden">
                   <div className="bg-green-500 w-[85%] h-full" />
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Bugs Reported</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">342</div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-2 rounded-full overflow-hidden">
                   <div className="bg-red-500 w-[60%] h-full" />
                </div>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="bg-slate-100 dark:bg-black/40 rounded p-4 font-mono text-xs text-slate-600 dark:text-slate-400 transition-colors duration-300">
              <p><span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">runTestSuite</span> = <span className="text-yellow-600 dark:text-yellow-300">async</span> () ={'>'} {'{'}</p>
              <p className="pl-4"><span className="text-cyan-600 dark:text-cyan-400">await</span> system.init();</p>
              <p className="pl-4"><span className="text-cyan-600 dark:text-cyan-400">const</span> results = <span className="text-cyan-600 dark:text-cyan-400">await</span> tests.executeAll();</p>
              <p className="pl-4"><span className="text-purple-600 dark:text-purple-400">return</span> results.filter(bug ={'>'} bug.isCritical);</p>
              <p>{'}'}</p>
            </div>
          </div>
          
          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 p-4 bg-white dark:bg-slate-800 border border-cyan-500/50 rounded-lg shadow-lg z-20 transition-colors duration-300"
          >
            <Activity className="text-cyan-500 dark:text-cyan-400 w-8 h-8" />
          </motion.div>
           <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-5 -left-5 p-4 bg-white dark:bg-slate-800 border border-red-500/50 rounded-lg shadow-lg z-20 transition-colors duration-300"
          >
            <Bug className="text-red-500 dark:text-red-400 w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const QACards = () => {
  const [activeModal, setActiveModal] = useState(null);

  const cards = [
    { id: 'bug', title: "Bug Reporting", icon: Bug, color: "text-red-500 dark:text-red-400", border: "hover:border-red-500/50" },
    { id: 'smoke', title: "Smoke Testing", icon: Activity, color: "text-green-500 dark:text-green-400", border: "hover:border-green-500/50" },
    { id: 'sanity', title: "Sanity Testing", icon: Search, color: "text-yellow-500 dark:text-yellow-400", border: "hover:border-yellow-500/50" },
    { id: 'regression', title: "Regression Testing", icon: Layers, color: "text-blue-500 dark:text-blue-400", border: "hover:border-blue-500/50" },
    { id: 'integration', title: "Integration Testing", icon: Cpu, color: "text-purple-500 dark:text-purple-400", border: "hover:border-purple-500/50" },
    { id: 'api', title: "API Testing", icon: Server, color: "text-cyan-500 dark:text-cyan-400", border: "hover:border-cyan-500/50" },
  ];

  return (
    <section id="qa-process" className="py-24 bg-slate-100 dark:bg-slate-950 relative transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">QA PROTOCOL SIMULATION</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors duration-300">Click any module below to initialize a live interactive demonstration of my testing methodologies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setActiveModal(card.id)}
              className={`bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 ${card.border} p-8 rounded-xl cursor-pointer group transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-lg`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-100/50 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <card.icon className={`w-12 h-12 ${card.color} mb-4`} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">{card.title}</h3>
              <p className="text-sm text-slate-500 mb-4">Initialize simulation sequence...</p>
              <div className="flex items-center text-xs font-mono text-cyan-600 dark:text-cyan-500 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>RUN_DEMO.exe</span>
                <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <QAModal type={activeModal} isOpen={!!activeModal} onClose={() => setActiveModal(null)} />
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none transition-colors duration-500"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">DEPLOYED PROJECTS</h2>
          <div className="h-1 w-20 bg-cyan-500 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROFILE.projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              {/* Fake Browser Window Header */}
              <div className="bg-slate-200 dark:bg-slate-950 p-3 flex items-center gap-2 border-b border-slate-300 dark:border-slate-700 transition-colors duration-300">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="ml-4 bg-slate-300 dark:bg-slate-800 rounded px-2 py-0.5 text-[10px] text-slate-600 dark:text-slate-500 font-mono w-full max-w-[200px] transition-colors duration-300">
                  project://{project.title.toLowerCase().replace(/\s/g, '-')}
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-cyan-600 dark:text-cyan-500 text-xs font-bold tracking-wider uppercase mb-1 block transition-colors duration-300">{project.category}</span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">{project.title}</h3>
                  </div>
                  <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/30 transition-colors duration-300">
                    {project.category.includes('Mobile') ? <Smartphone className="text-slate-600 dark:text-slate-300" /> : <Globe className="text-slate-600 dark:text-slate-300" />}
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors duration-300">{project.desc}</p>

                <div className="flex flex-wrap gap-2">
                   <span className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded text-slate-500 dark:text-slate-400 transition-colors duration-300">Manual Testing</span>
                   <span className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded text-slate-500 dark:text-slate-400 transition-colors duration-300">Bug Reports</span>
                   <span className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded text-slate-500 dark:text-slate-400 transition-colors duration-300">UAT</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ResumeSection = () => {
  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Experience Column */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 transition-colors duration-300">
              <FileText className="text-cyan-500" /> EXPERIENCE LOG
            </h2>
            <div className="space-y-8 relative border-l border-slate-300 dark:border-slate-800 ml-3 pl-8 transition-colors duration-300">
              {PROFILE.experience.map((job, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-cyan-500 z-10 transition-colors duration-300" />
                  <div className="mb-1 text-cyan-600 dark:text-cyan-400 text-sm font-mono transition-colors duration-300">{job.period}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">{job.role}</h3>
                  <div className="text-lg text-slate-600 dark:text-slate-400 mb-1 transition-colors duration-300">{job.company}</div>
                  <div className="text-sm text-slate-500">{job.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Column */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 transition-colors duration-300">
              <Cpu className="text-cyan-500" /> TECHNICAL ARSENAL
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {PROFILE.skills.map((skill, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-slate-900 p-4 rounded border border-slate-200 dark:border-slate-800 flex items-center gap-3 hover:border-cyan-500/30 transition-colors duration-300 shadow-sm"
                >
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                  <span className="text-slate-700 dark:text-slate-300 font-mono text-sm">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-500">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-300">Awais Riaz</h3>
          <p className="text-slate-500">Software Quality Assurance Engineer</p>
          <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm">
            <MapPin size={14} /> Lahore, Pakistan
          </div>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="p-3 bg-white dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:bg-cyan-600 hover:text-white transition-all shadow-sm">
            <Mail size={20} />
          </a>
          <a href="#" className="p-3 bg-white dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:bg-cyan-600 hover:text-white transition-all shadow-sm">
            <Linkedin size={20} />
          </a>
          <a href="#" className="p-3 bg-white dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:bg-cyan-600 hover:text-white transition-all shadow-sm">
            <Github size={20} />
          </a>
        </div>
      </div>
      <div className="text-center mt-12 text-slate-500 dark:text-slate-600 text-xs font-mono transition-colors duration-300">
        SYSTEM STATUS: ONLINE | © {new Date().getFullYear()} AWAIS RIAZ
      </div>
    </footer>
  );
};

// --- 5. Main App Assembly ---

const App = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  // Toggle Theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-cyan-500/30 bg-slate-50 dark:bg-slate-950 transition-colors duration-500`}>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 flex items-center transition-colors duration-300">
             <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="font-bold text-xl tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
                  AR<span className="text-cyan-500">.SQA</span>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
                     <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</a>
                     <a href="#qa-process" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Process</a>
                     <a href="#projects" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Projects</a>
                     <a href="#experience" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Experience</a>
                  </div>

                  {/* Theme Toggle Button */}
                  <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  </button>

                  <div className="md:hidden text-slate-900 dark:text-white"><Menu /></div>
                </div>
             </div>
          </nav>

          <Hero />
          <QACards />
          <ResumeSection />
          <Projects />
          <Footer />
        </motion.main>
      )}
    </div>
  );
};

export default App;