import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Menu, X, Linkedin, Mail, Phone, ExternalLink, 
  CheckCircle, AlertTriangle, Bug, Terminal, Smartphone, 
  Database, Globe, Shield, Code, ChevronRight, Play, Server,
  Cpu, Layout, Layers, UserCheck, Clock, Award, BookOpen,
  FileText, Send, MousePointer, Save
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- Assets & Data Configuration ---

const EXPERIENCES = [
  {
    id: 1,
    role: "Junior Software Quality Assurance Engineer",
    company: "Evolvers Tech",
    period: "Present",
    desc: "Leading automated test strategies and ensuring enterprise-grade stability for global clients.",
    color: "text-emerald-500"
  },
  {
    id: 2,
    role: "Junior SQA Engineer",
    company: "Horizam",
    period: "Past",
    desc: "Executed comprehensive manual testing cycles and regression suites for sports tech platforms.",
    color: "text-blue-500"
  },
  {
    id: 3,
    role: "SQA Intern",
    company: "Service Providers.pk",
    period: "Past",
    desc: "Assisted in black-box testing and bug tracking workflows for web applications.",
    color: "text-purple-500"
  }
];

const SKILLS = [
  { icon: Clock, title: "Punctual & Disciplined", desc: "Rigorous adherence to release timelines." },
  { icon: Award, title: "Fully Dedicated", desc: "Ownership of product quality from start to finish." },
  { icon: Bug, title: "Passionate about QA", desc: "Finding bugs is not a job, it's a mindset." },
  { icon: CheckCircle, title: "Detail Oriented", desc: "Pixel-perfect UI and logic validation." },
  { icon: BookOpen, title: "Continuous Learner", desc: "Adapting to new frameworks and tools daily." },
  { icon: UserCheck, title: "Knowledge Sharing", desc: "Mentoring teams on best QA practices." }
];

const PROJECTS = [
  {
    id: 'erp-guard',
    title: "ERP – Security Guard Management",
    category: "Enterprise System",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
    desc: "Comprehensive management system for security personnel scheduling and tracking.",
    features: ["Role-based Access", "Shift Scheduling", "Incident Reporting"]
  },
  {
    id: 'erp-skip',
    title: "ERP – Skip Management System (UK)",
    category: "Logistics",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    desc: "Logistics platform for waste management and skip hire operations in the UK.",
    features: ["Inventory Tracking", "Route Optimization", "Billing Automation"]
  },
  {
    id: 'limo',
    title: "Limo 911 – Ride Booking",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
    desc: "Premium ride-hailing service app with real-time tracking.",
    features: ["GPS Tracking", "Payment Gateway", "Driver App"]
  },
  {
    id: 'linqbot',
    title: "LinqBot / RU Link",
    category: "NFC Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    desc: "Smart networking app utilizing NFC for instant profile sharing.",
    features: ["NFC Write/Read", "Profile Analytics", "Social Integration"]
  },
  {
    id: 'mojo',
    title: "Mojo – Business Profile",
    category: "Web App (France)",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    desc: "Dynamic business profiling and portfolio management platform.",
    features: ["SEO Optimization", "Dynamic Content", "Multi-language"]
  },
  {
    id: 'codehive',
    title: "CodeHive",
    category: "Corporate Website (UAE)",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
    desc: "Modern corporate identity for a leading software house in UAE.",
    features: ["Responsive Design", "Lead Generation", "Performance Optimized"]
  },
  {
    id: 'vlinq',
    title: "Vlinq Store",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800",
    desc: "Full-scale e-commerce platform with inventory management.",
    features: ["Cart Logic", "Payment Integration", "Order Management"]
  },
  {
    id: 'foodmamba',
    title: "Food Mamba",
    category: "Food Delivery (Canada)",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    desc: "Multi-vendor food delivery platform serving the Canadian market.",
    features: ["Real-time Order Status", "Geofencing", "Vendor Portal"]
  },
  {
    id: 'ado',
    title: "Ado Travel",
    category: "Travel Booking",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    desc: "End-to-end travel booking engine for flights and hotels.",
    features: ["Booking Engine", "API Integrations", "Itinerary Management"]
  }
];

const TOOLS = [
  { id: 'jira', name: "JIRA", category: "Management", icon: Layout, desc: "Bug tracking & Agile management." },
  { id: 'selenium', name: "Selenium", category: "Automation", icon: Terminal, desc: "Web browser automation." },
  { id: 'postman', name: "Postman", category: "API Testing", icon: Server, desc: "API development & testing." },
  { id: 'cypress', name: "Cypress", category: "E2E Testing", icon: Code, desc: "Modern frontend testing." },
  { id: 'appium', name: "Appium", category: "Mobile", icon: Smartphone, desc: "Mobile app automation." },
  { id: 'jenkins', name: "Jenkins", category: "CI/CD", icon: Cpu, desc: "Continuous Integration pipeline." },
  { id: 'figma', name: "Figma", category: "Design Review", icon: Layers, desc: "UI/UX inspection." },
  { id: 'sql', name: "SQL", category: "Database", icon: Database, desc: "Data integrity verification." },
];

const PROTOCOLS = [
  { 
    id: 'functional', 
    title: "Functional Testing", 
    desc: "Verifying that each function of the software application operates in conformance with the requirement specification.",
    color: "bg-blue-500"
  },
  { 
    id: 'regression', 
    title: "Regression Testing", 
    desc: "Re-running functional and non-functional tests to ensure that previously developed and tested software still performs after a change.",
    color: "bg-purple-500"
  },
  { 
    id: 'performance', 
    title: "Performance Testing", 
    desc: "Testing the speed, response time, stability, reliability, scalability, and resource usage of a software application under a particular workload.",
    color: "bg-orange-500"
  },
  { 
    id: 'usability', 
    title: "Usability Testing", 
    desc: "Measuring how easy and user-friendly a software application is for a specific set of users.",
    color: "bg-emerald-500"
  }
];

// --- Helper Components ---

const Section = ({ id, className, children }) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 w-full relative overflow-hidden ${className}`}>
    {children}
  </section>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-16 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-6 rounded-full" />
  </div>
);

// --- Main Application ---

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true); // Default to VIP Dark
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProtocol, setSelectedProtocol] = useState(PROTOCOLS[0]);
  const [selectedTool, setSelectedTool] = useState(null);

  // Theme Persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'protocols', 'tools', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Test Protocols', id: 'protocols' },
    { name: 'Tools', id: 'tools' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // --- Modal Component for Projects ---
  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700"
        >
          <div className="relative h-64 md:h-80 w-full">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-t-2xl" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent">
              <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full mb-2 inline-block">
                {project.category}
              </span>
              <h3 className="text-3xl font-bold text-white">{project.title}</h3>
            </div>
          </div>

          <div className="p-8 grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Project Overview</h4>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {project.desc}
              </p>
              
              <h4 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Key Features Tested</h4>
              <ul className="space-y-2">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center text-slate-600 dark:text-slate-300">
                    <CheckCircle size={18} className="text-emerald-500 mr-2" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="text-xl font-bold mb-4 flex items-center text-slate-800 dark:text-white">
                <Terminal size={20} className="mr-2 text-indigo-500" />
                QA Simulation
              </h4>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between items-center text-emerald-500">
                  <span>Running Test Suite: {project.title}_V1.0</span>
                  <span className="animate-pulse">● Running</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="h-full bg-indigo-500"
                  />
                </div>
                <div className="space-y-1 text-slate-500 dark:text-slate-400">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>✓ Auth Module Verified</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>✓ Database Integrity Check</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>✓ API Response &lt; 200ms</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="text-emerald-500 font-bold">» ALL TESTS PASSED</motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // --- Modal Component for Tools ---
  const ToolModal = ({ tool, onClose }) => {
    if (!tool) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 relative"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                 <tool.icon size={24} />
               </div>
               <div>
                 <h3 className="text-xl font-bold">{tool.name}</h3>
                 <p className="text-xs text-slate-500 uppercase tracking-wide">{tool.category} Demo</p>
               </div>
             </div>
             <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
               <X size={20} />
             </button>
          </div>

          {/* Simulation Content */}
          <div className="p-8 bg-slate-100 dark:bg-slate-900 min-h-[300px] flex items-center justify-center">
            
            {/* JIRA SIMULATION */}
            {tool.id === 'jira' && (
              <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-6 max-w-md">
                <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">Create Issue - Project: ALPHA</div>
                
                <div className="space-y-4">
                  <div>
                     <label className="block text-xs font-medium text-slate-500 mb-1">Summary</label>
                     <div className="relative">
                        <input disabled className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-800 dark:text-slate-200" value="" />
                        <motion.span 
                          initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "linear" }}
                          className="absolute top-2 left-3 text-sm text-slate-800 dark:text-slate-200 overflow-hidden whitespace-nowrap"
                        >
                          Login button unresponsive on Mobile
                        </motion.span>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Priority</label>
                       <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded px-3 py-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                          <AlertTriangle size={14} /> High
                       </div>
                    </div>
                    <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Assignee</label>
                       <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-3 py-2 text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-indigo-500 text-[8px] text-white flex items-center justify-center">AR</div> Awais
                       </div>
                    </div>
                  </div>

                  <motion.button
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 0.95, 1] }}
                    transition={{ delay: 1.8, duration: 0.2 }}
                    className="w-full bg-indigo-600 text-white py-2 rounded font-medium text-sm mt-4 hover:bg-indigo-700 flex items-center justify-center gap-2"
                  >
                    Create Ticket
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 }}
                    className="bg-emerald-500 text-white text-xs p-2 rounded text-center flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={14} /> Issue ALPHA-42 created successfully
                  </motion.div>
                </div>
              </div>
            )}

            {/* POSTMAN SIMULATION */}
            {tool.id === 'postman' && (
               <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden font-mono text-sm">
                 <div className="bg-slate-100 dark:bg-slate-950 p-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                   <span className="text-emerald-600 font-bold">GET</span>
                   <span className="text-slate-500">https://api.system.com/users/12</span>
                   <motion.button 
                     animate={{ scale: [1, 0.9, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                     className="ml-auto bg-blue-600 text-white px-4 py-1 rounded text-xs"
                    >
                     Send
                   </motion.button>
                 </div>
                 <div className="p-4 bg-slate-900 text-slate-300 h-48 overflow-y-auto">
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                     <span className="text-slate-500">// Status: 200 OK</span><br/>
                     <span className="text-yellow-400">{"{"}</span><br/>
                     &nbsp;&nbsp;<span className="text-blue-400">"id"</span>: <span className="text-emerald-400">12</span>,<br/>
                     &nbsp;&nbsp;<span className="text-blue-400">"name"</span>: <span className="text-emerald-400">"John Doe"</span>,<br/>
                     &nbsp;&nbsp;<span className="text-blue-400">"role"</span>: <span className="text-emerald-400">"Admin"</span>,<br/>
                     &nbsp;&nbsp;<span className="text-blue-400">"permissions"</span>: <span className="text-yellow-400">["read", "write"]</span><br/>
                     <span className="text-yellow-400">{"}"}</span>
                   </motion.div>
                 </div>
               </div>
            )}

            {/* SQL SIMULATION */}
            {tool.id === 'sql' && (
               <div className="w-full bg-slate-950 rounded-lg shadow-xl border border-slate-700 p-4 font-mono text-sm text-slate-300">
                 <div className="mb-4">
                   <span className="text-emerald-500">sql_admin@db:~$</span> 
                   <motion.span 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                     className="ml-2 text-white"
                   >
                     SELECT * FROM orders WHERE status='FAILED';
                   </motion.span>
                 </div>
                 <motion.table 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                   className="w-full text-xs border-collapse"
                 >
                   <thead>
                     <tr className="text-slate-500 border-b border-slate-700">
                       <th className="text-left p-1">ID</th>
                       <th className="text-left p-1">USER</th>
                       <th className="text-left p-1">AMOUNT</th>
                       <th className="text-left p-1">STATUS</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className="border-b border-slate-800">
                       <td className="p-1 text-blue-400">1024</td>
                       <td className="p-1">user_x</td>
                       <td className="p-1">$45.00</td>
                       <td className="p-1 text-red-500">FAILED</td>
                     </tr>
                     <tr>
                       <td className="p-1 text-blue-400">1029</td>
                       <td className="p-1">user_y</td>
                       <td className="p-1">$120.50</td>
                       <td className="p-1 text-red-500">FAILED</td>
                     </tr>
                   </tbody>
                 </motion.table>
                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                   className="mt-4 text-emerald-500"
                 >
                   2 rows returned (0.04 sec)
                 </motion.div>
               </div>
            )}

            {/* SELENIUM / CYPRESS / APPIUM SIMULATION */}
            {['selenium', 'cypress', 'appium', 'jenkins'].includes(tool.id) && (
              <div className="w-full bg-slate-900 text-slate-300 rounded-lg shadow-xl border border-slate-700 p-4 font-mono text-xs">
                <div className="flex gap-2 mb-4 border-b border-slate-700 pb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="ml-2 text-slate-500">Aware_Terminal_v2.0</span>
                </div>
                <div className="space-y-2">
                  <div>$ init {tool.name}_runner --verbose</div>
                  <div className="text-slate-500">Loading modules... OK</div>
                  <div className="text-slate-500">Connecting to environment... OK</div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-blue-400">
                    Executing Test Case: Login_Auth_Flow
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-emerald-500" /> Finds Element 'username_input'
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-emerald-500" /> Types 'test_user'
                  </motion.div>
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-emerald-500" /> Clicks 'Submit'
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-emerald-500 font-bold border-t border-slate-700 pt-2 mt-2">
                    ✓ TEST PASSED (Execution Time: 2.3s)
                  </motion.div>
                </div>
              </div>
            )}

            {/* FIGMA SIMULATION */}
            {tool.id === 'figma' && (
              <div className="w-full h-64 bg-slate-200 dark:bg-slate-800 rounded-lg relative overflow-hidden border border-slate-300 dark:border-slate-700">
                <div className="absolute top-4 left-4 right-4 h-8 bg-white dark:bg-slate-700 rounded mb-4" />
                <div className="absolute top-16 left-4 w-1/3 h-32 bg-white dark:bg-slate-700 rounded" />
                <div className="absolute top-16 right-4 w-1/2 h-32 bg-white dark:bg-slate-700 rounded" />
                
                <motion.div 
                  animate={{ x: [0, 150, 150, 0], y: [0, 50, 50, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-10 left-10 z-10"
                >
                  <MousePointer size={24} className="text-purple-600 fill-purple-600" />
                  <div className="bg-purple-600 text-white text-[10px] px-1 rounded ml-4">Awais</div>
                </motion.div>

                {/* Comment box appearing */}
                <motion.div 
                   animate={{ opacity: [0, 0, 1, 0] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="absolute top-24 left-48 bg-white shadow-lg p-2 rounded text-xs text-slate-800"
                >
                   Verify contrast ratio here.
                </motion.div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans`}>
      
      {/* --- Header --- */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 cursor-pointer" onClick={() => scrollTo('home')}>
            AR<span className="text-slate-800 dark:text-slate-100">.QA</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  activeSection === item.id 
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
            </button>
            
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-white dark:bg-slate-950 p-6 flex flex-col items-center justify-center gap-8"
          >
            <button 
              className="absolute top-6 right-6 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-2xl font-bold text-slate-800 dark:text-white"
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        
        {/* --- Hero Section --- */}
        <Section id="home" className="flex flex-col items-center justify-center min-h-[90vh] text-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-slate-50/0 to-slate-50/0 dark:from-indigo-900/20 dark:via-slate-950/0 dark:to-slate-950/0 pointer-events-none" />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 relative"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                <span className="text-4xl font-bold text-indigo-600">AR</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-emerald-500 w-8 h-8 rounded-full border-4 border-slate-50 dark:border-slate-950 flex items-center justify-center">
              <CheckCircle size={14} className="text-white" />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            Awais Riaz
          </motion.h1>

          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-3xl text-indigo-600 dark:text-indigo-400 font-medium mb-8"
          >
            Software Quality Assurance Engineer
          </motion.h2>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 mb-12"
          >
            {[
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:awais@example.com", label: "Email" },
              { icon: Phone, href: "tel:+1234567890", label: "Call" }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.href}
                className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:scale-110 hover:text-indigo-600 transition-all border border-slate-100 dark:border-slate-700"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              onClick={() => scrollTo('projects')}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2"
            >
              View My Work <ChevronRight size={18} />
            </button>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
          >
            <div className="w-1 h-8 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-2" />
            <span className="text-xs uppercase tracking-widest">Scroll</span>
          </motion.div>
        </Section>

        {/* --- About / Skills Section --- */}
        <Section id="about" className="bg-white dark:bg-slate-900/50">
          <SectionTitle title="Core Competencies" subtitle="More than just bug hunting—I ensure product excellence." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SKILLS.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors group"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <skill.icon size={24} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* --- Experience Section --- */}
        <Section id="experience">
          <SectionTitle title="Professional Journey" subtitle="A timeline of continuous improvement and impact." />
          
          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12">
              {EXPERIENCES.map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-slate-50 dark:border-slate-950 -translate-x-1/2 z-10 hidden md:block" />

                  <div className="flex-1 w-full md:w-1/2 p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all">
                    <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${exp.color}`}>
                      {exp.period}
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                    <h4 className="text-lg text-slate-500 dark:text-slate-400 mb-4">{exp.company}</h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* --- Projects Section --- */}
        <Section id="projects" className="bg-slate-50 dark:bg-slate-900/50">
          <SectionTitle title="Featured Projects" subtitle="Diverse domains, rigorous testing, delivered quality." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all border border-slate-200 dark:border-slate-700"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white font-medium flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                      <ExternalLink size={16} /> View Details
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-indigo-500 uppercase tracking-wide mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* --- Test Protocols Interactive Demo --- */}
        <Section id="protocols">
          <SectionTitle title="Testing Protocols" subtitle="Interactive demonstration of my testing methodologies." />
          
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Menu */}
            <div className="lg:col-span-4 space-y-4">
              {PROTOCOLS.map((protocol) => (
                <button
                  key={protocol.id}
                  onClick={() => setSelectedProtocol(protocol)}
                  className={`w-full text-left p-6 rounded-xl transition-all border ${
                    selectedProtocol.id === protocol.id 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <h3 className="font-bold text-lg mb-1">{protocol.title}</h3>
                  <p className={`text-sm ${selectedProtocol.id === protocol.id ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-500'}`}>
                    Click to view simulation
                  </p>
                </button>
              ))}
            </div>

            {/* Display Window */}
            <div className="lg:col-span-8">
              <div className="h-full min-h-[400px] bg-slate-900 rounded-2xl p-8 relative overflow-hidden border border-slate-700 shadow-2xl">
                {/* Mock Browser/Terminal UI */}
                <div className="flex items-center gap-2 mb-6 opacity-50">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedProtocol.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                        <Terminal className="text-emerald-400" />
                        {selectedProtocol.title}
                      </h2>
                      <p className="text-slate-400 text-lg mb-8 max-w-xl">{selectedProtocol.desc}</p>
                    </div>

                    {/* Dynamic Animation based on type */}
                    <div className="bg-black/30 rounded-xl p-6 font-mono text-sm">
                      {selectedProtocol.id === 'functional' && (
                        <div className="space-y-2">
                          <div className="text-emerald-400">$ test login_functionality()</div>
                          <div className="text-slate-300">Input: user="admin", pass="****"</div>
                          <div className="text-slate-300">Expected: Redirect to Dashboard</div>
                          <div className="flex items-center gap-2 text-emerald-400 mt-2">
                            <CheckCircle size={16} /> Status: PASSED (24ms)
                          </div>
                        </div>
                      )}
                      
                      {selectedProtocol.id === 'performance' && (
                        <div className="space-y-2">
                          <div className="text-orange-400">$ run_load_test --users=5000</div>
                          <div className="w-full bg-slate-700 h-4 rounded-full mt-2 overflow-hidden">
                            <motion.div 
                              initial={{ width: '0%' }}
                              animate={{ width: '85%' }}
                              transition={{ duration: 1.5, ease: "circOut" }}
                              className="h-full bg-orange-500"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4 mt-2 text-center">
                            <div className="bg-slate-800 p-2 rounded">
                              <div className="text-xs text-slate-400">RPS</div>
                              <div className="text-white font-bold">4,203</div>
                            </div>
                            <div className="bg-slate-800 p-2 rounded">
                              <div className="text-xs text-slate-400">Latency</div>
                              <div className="text-white font-bold">45ms</div>
                            </div>
                            <div className="bg-slate-800 p-2 rounded">
                              <div className="text-xs text-slate-400">Error Rate</div>
                              <div className="text-emerald-400 font-bold">0.0%</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedProtocol.id === 'regression' && (
                        <div className="grid grid-cols-2 gap-4">
                          {[1,2,3,4].map((i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.2 }}
                              className="flex justify-between bg-slate-800 p-3 rounded"
                            >
                              <span className="text-slate-300">Module_{i}</span>
                              <span className="text-emerald-400 text-xs px-2 py-0.5 bg-emerald-900/30 rounded">OK</span>
                            </motion.div>
                          ))}
                        </div>
                      )}
                      
                       {selectedProtocol.id === 'usability' && (
                        <div className="space-y-3">
                          <div className="text-purple-400">$ analyzing_ux_flow</div>
                           <div className="flex gap-4">
                              <div className="w-20 h-32 border-2 border-slate-600 rounded flex items-center justify-center text-xs text-slate-500">Screen A</div>
                              <motion.div 
                                animate={{ x: [0, 10, 0] }}
                                transition={{ repeat: Infinity }}
                                className="self-center"
                              >
                                <ChevronRight className="text-white"/>
                              </motion.div>
                              <div className="w-20 h-32 border-2 border-emerald-500 bg-emerald-900/10 rounded flex items-center justify-center text-xs text-emerald-400 font-bold">Goal</div>
                           </div>
                           <div className="text-slate-300 mt-2">Completion Rate: 98.5%</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Section>

        {/* --- Tools Section --- */}
        <Section id="tools" className="bg-white dark:bg-slate-900/50">
          <SectionTitle title="Tool Stack" subtitle="The arsenal I use to ensure perfection. Click to view demo." />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TOOLS.map((tool, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, rotate: 1 }}
                onClick={() => setSelectedTool(tool)}
                className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-md mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <tool.icon size={32} />
                </div>
                <h3 className="font-bold text-lg">{tool.name}</h3>
                <span className="text-xs text-slate-500 uppercase tracking-wider mt-1">{tool.category}</span>
                <span className="text-[10px] text-indigo-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click for Demo</span>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* --- Contact Section --- */}
        <Section id="contact" className="bg-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to elevate your product quality?</h2>
            <p className="text-indigo-200 text-xl mb-12">
              I am available for freelance projects and full-time opportunities.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <a 
                href="mailto:awais@example.com"
                className="flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all border border-white/10"
              >
                <Mail size={40} className="mb-4 text-indigo-300" />
                <span className="font-bold">Email Me</span>
                <span className="text-sm text-indigo-200 mt-2">awais@example.com</span>
              </a>

              <a 
                href="https://linkedin.com"
                className="flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all border border-white/10"
              >
                <Linkedin size={40} className="mb-4 text-indigo-300" />
                <span className="font-bold">Connect</span>
                <span className="text-sm text-indigo-200 mt-2">LinkedIn Profile</span>
              </a>

               <a 
                href="tel:+1234567890"
                className="flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all border border-white/10"
              >
                <Phone size={40} className="mb-4 text-indigo-300" />
                <span className="font-bold">Call Me</span>
                <span className="text-sm text-indigo-200 mt-2">+123 456 7890</span>
              </a>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="bg-slate-950 py-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Awais Riaz. Engineered for Quality.</p>
        </footer>

      </main>

      {/* Modals */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
        {selectedTool && (
          <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}