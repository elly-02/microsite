import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Shield, Activity, Zap, Download } from 'lucide-react';
import StarBackground from "./StarBackground";

// --- Imports ---
import sttImg from './img/stt_demo.png';
import stacknodeImg from './img/stacknode_demo.png';
import stoImg from './img/sto_demo.png';
import stackbotImg from './img/stackbot_demo.png';
import helixDark from './img/Helixdark.png';
import helixLight from './img/Helixlight.png';

// --- Data Configuration ---
const tabs = {
  monitoring: { title: "Infrastructure", img: sttImg },
  security: { title: "Security", img: stacknodeImg },
  automation: { title: "Automation", img: stoImg },
  network: { title: "Network", img: stackbotImg }
};

// ==========================================
// 1. DATA CONFIGURATION
// ==========================================
const products = [
  {
    id: "monitoring",
    name: "Infrastructure Monitoring",
    tag: "STT_DEMO",
    img: sttImg,
    description: "From overview to deep details, fast.",
    features: ["Real-time node health telemetry", "Global latency heatmaps", "Automated uptime grading"]
  },
  {
    id: "security",
    name: "Security Monitoring",
    tag: "STACK_DEMO",
    img: stacknodeImg,
    description: "Quantum-resistant threat detection.",
    features: ["End-to-end handshaking", "Quantum-safe encryption", "Anomaly detection AI"]
  }
];

// ==========================================
// 2. COMPONENT: NAVBAR
// ==========================================
const Navbar = ({ isDark, setIsDark }) => {
  const [hoveredPath, setHoveredPath] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Company", href: "#why" },
    { name: "Products", href: "#solutions" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 dark:bg-slate-900/80 bg-white/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ y: -2 }} className="flex items-center cursor-pointer">
          <img src={isDark ? helixDark : helixLight} alt="Helix" className="h-7 object-contain" />
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredPath(item.name)}
              onMouseLeave={() => setHoveredPath(null)}
              className="relative px-4 py-2 text-[13px] font-bold tracking-[0.25em] uppercase dark:text-slate-400 text-slate-600 dark:hover:text-white"
            >
              <span className="relative z-10">{item.name}</span>
              <AnimatePresence>
                {hoveredPath === item.name && (
                  <motion.div 
                    layoutId="navbar-hover" 
                    className="absolute inset-0 dark:bg-white/5 bg-black/5 rounded-lg" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                  />
                )}
              </AnimatePresence>
            </a>
          ))}
        </div>

        {/* Right Actions Wrapper */}
        <div className="flex items-center gap-4">
          {/* Your Original Dark Mode Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full border border-slate-300 dark:border-white/10 overflow-hidden relative w-10 h-10"
          >
            <motion.div animate={{ y: isDark ? 0 : 40 }} className="absolute inset-0 flex items-center justify-center">
              <Moon size={16} className="text-blue-400" />
            </motion.div>
            <motion.div animate={{ y: isDark ? -40 : 0 }} className="absolute inset-0 flex items-center justify-center">
              <Sun size={16} className="text-yellow-500" />
            </motion.div>
          </button>

          {/* Mobile Hamburger Button */}
          <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className={`block w-6 h-0.5 bg-slate-600 dark:bg-white transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-slate-600 dark:bg-white ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-slate-600 dark:bg-white transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-white/10 overflow-hidden"
          >
            <div className="px-8 py-8 flex flex-col space-y-6">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-widest dark:text-white text-slate-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


// ==========================================
// SECTION: Hero
// ==========================================
const Hero = () => {
  const [activeTab, setActiveTab] = useState("monitoring");
  const [isPaused, setIsPaused] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // Added distinct colors and product names to match your reference image
  const tabs = {
    monitoring: { 
      title: "ST Overwatch", 
      product: "Operational Modules", 
      img: stoImg,
      
    },
    security: { 
      title: "ST Truestate", 
      product: "Security Cores", 
      img: sttImg, 
      
    },
    automation: { 
      title: "StackNode", 
      product: "Automation Sensors", 
      img: stacknodeImg, 
      
    },
    network: { 
      title: "StackBot", 
      product: "Network Hubs", 
      img: stackbotImg, 
      
    },
  };

  const tabKeys = Object.keys(tabs);

  // Auto-slide logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const nextIndex = (tabKeys.indexOf(prev) + 1) % tabKeys.length;
        return tabKeys[nextIndex];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, tabKeys]);

  return (
    <motion.section
      id="hero"
      animate={{ backgroundColor: tabs[activeTab].color }}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden dark:bg-slate-950 bg-slate-100 transition-colors duration-1000 ease-in-out"
    >
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* MAIN CONTAINER: Split Screen 1:2 ratio for bigger image */}
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center relative z-10">

        {/* LEFT COLUMN: Fixed Header & Centered Controls */}
        <div className="flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left">
          <div className="relative border-l-4 md:border-l-[6px] border-blue-600 pl-5 md:pl-8 py-1">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
              HELIX
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.15em] text-[10px] md:text-sm mt-3">
              Operational Cohesion Framework
            </p>
          </div>

          <p className="dark:text-slate-300 text-slate-600 text-lg leading-relaxed max-w-md text-justify [text-justify:inter-word]">
            Infrastructure should not be a collection of disconnected parts. 
            Helix provides the logic and structure to unify your environment, ensuring every 
            component works in concert across legacy hardware and modern cloud environments.
          </p>

          {/* BUTTONS WITH PRODUCT NAME UNDERNEATH */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-blue-600 text-white text-sm font-bold uppercase tracking-widest rounded-lg shadow-lg"
                onClick={() =>
                  document.getElementById("why")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                className="px-7 py-3 bg-transparent text-slate-900 dark:text-white text-sm font-bold uppercase tracking-widest rounded-xl border-2 border-slate-900 dark:border-white transition-colors inline-flex items-center gap-2"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact
                {/* Right Arrow SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </motion.button>
            </div>
            
            {/* Dynamic Product Label */}
            <AnimatePresence mode="wait">
              {/*
              <motion.span
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[15px] font-bold tracking-[0.2em] text-slate-600 dark:text-slate-300 mt-2"
              >
                Current view: <span className="text-blue-500">{tabs[activeTab].title}</span>
              </motion.span> */}
            </AnimatePresence> 
          </div>

          {/* THUMBNAIL NAV: Placed under the text block on the left */}
          <div className="flex gap-4 pt-8">
            {tabKeys.map((key) => (
              <motion.div
                key={key}
                onClick={() => { setActiveTab(key); setIsPaused(true); }}
                className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
                  activeTab === key ? "scale-110" : "opacity-50 grayscale hover:grayscale-0"
                }`}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-white/20 overflow-hidden flex items-center justify-center">
                  <img
                    src={tabs[key].img}
                    className="w-full h-full object-cover"
                    alt={key}
                  />
                </div>
                <span className={`text-[15px] font-black tracking-tighter ${activeTab === key ? "text-blue-500" : "text-slate-400"}`}>
                  {tabs[key].title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: ENLARGED VISUALIZER */}
        <div className="relative flex justify-center items-center w-full min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-full max-w-2xl flex justify-center items-center cursor-zoom-in"
              onClick={() => setZoomed(true)}
            >
              {/* Dynamic Glow Behind Image */}
              <div
                className="absolute inset-0 rounded-lg blur-[100px] animate-pulse"
                style={{ backgroundColor: tabs[activeTab].color }}
              />

              {/* Fixed-size Image Container */}
              <div className="relative w-full h-[450px] rounded-lg border-2 border-white/20 shadow-2xl overflow-hidden flex justify-center items-center">
                <img
                  src={tabs[activeTab].img}
                  className="w-full h-full object-cover"
                  alt={activeTab}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ZOOM MODAL */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-8 backdrop-blur-xl"
            onClick={() => setZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={tabs[activeTab].img}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <button className="absolute top-10 right-10 text-white text-4xl font-light hover:rotate-90 transition-transform">
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};


// ==========================================
// SECTION: PHILOSOPHY
// ==========================================
const Philosophy = () => {
  const pillars = [
    { 
      id: "01", 
      title: "VISIBILITY", 
      subtitle: "Establish a single source of truth.",
      desc: "Cohesion begins with the removal of technical blind spots. We believe that total visibility across every layer is the only way to make informed and proactive decisions.", 
      detail: "UNIFIED_OBSERVABILITY",
      icon: Shield 
    },
    { 
      id: "02", 
      title: "INTEGRITY", 
      subtitle: "Ensure absolute state assurance.",
      desc: "Stability is the natural result of consistency. The framework focuses on the elimination of configuration drift to keep the entire environment within its intended operational boundaries.", 
      detail: "CONFIGURATION_CERTITUDE",
      icon: Zap 
    },
    { 
      id: "03", 
      title: "CONTROL", 
      subtitle: "Unify diverse environments.",
      desc: "A fragmented infrastructure is a liability. We advocate for a common management layer that brings legacy hardware and cloud stacks together under a single architectural logic.", 
      detail: "HYBRID_COHESION",
      icon: Activity 
    },
    { 
      id: "04", 
      title: "AUTONOMY", 
      subtitle: "Enable self sustaining systems.",
      desc: "Efficiency is found in the reduction of manual effort. The final goal of the framework is to build an environment that can execute workflows and maintain its own health independently.", 
      detail: "OPERATIONAL_VELOCITY",
      icon: Download 
    }
  ];

  return (
    <section id="why" className="py-32 relative bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header Section */}
        <div className="mb-20 text-center md:text-left border-l-4 border-blue-600 pl-6">
          <h2 className="text-[14px] md:text-[18px] uppercase tracking-[0.6em] text-blue-600 dark:text-blue-500 font-black mb-2">
            The Philosophy
          </h2>
          <h3 className="text-4xl md:text-6xl font-light dark:text-white text-slate-900 max-w-4xl tracking-tight">
            Engineering <span className="text-blue-600 dark:text-blue-500 font-light">Operational</span> Cohesion.
          </h3>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-xl border border-slate-300 dark:border-white/10 
                bg-white/40 dark:bg-white/[0.02] backdrop-blur-md
                hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between min-h-[450px]"
              >
                {/* Visual Glass Accents */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"/>
                
                <div>
                  {/* Icon & ID Row */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                      <Icon size={20}/>
                    </div>
                    <span className="text-4xl font-black text-slate-300 dark:text-white/20 group-hover:text-blue-600 transition-colors duration-300">
                      {pillar.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-black uppercase dark:text-slate-300 text-slate-700 mb-1 tracking-widest">
                    {pillar.id}. {pillar.title}
                  </h4>

                  {/* New Subtitle (From Image) */}
                  <h5 className="text-lg font-bold dark:text-white text-slate-900 mb-4 leading-tight">
                    {pillar.subtitle}
                  </h5>

                  {/* Description - Justified */}
                  <p className="text-slate-800 dark:text-slate-300 text-md leading-relaxed mb-8 text-justify [text-justify:inter-word]">
                    {pillar.desc}
                  </p>
                </div>

                {/* Technical Tag - Bottom Aligned */}
                <div className="w-full py-3 px-3 rounded bg-slate-200/50 dark:bg-blue-500/5 border border-slate-300 dark:border-blue-500/10 text-[12px] font-mono text-slate-700 dark:text-blue-400 font-black tracking-[0.2em] text-left">
                  {pillar.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


// ==========================================
// SECTION: TECHNOLOGY
// ==========================================
const Technology = () => {
  return (
    <section className="py-32 relative bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            viewport={{ once: false, amount: 0.5 }} 
            transition={{ duration: 1, ease: "easeInOut" }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg md:text-2xl dark:text-slate-300 text-slate-700 leading-relaxed text-justify [text-justify:inter-word] font-black">
              The <span className="text-blue-500 font-semibold">Helix framework </span> is more than just a philosophy. 
              It is a <span className="text-purple-500 font-semibold">functional ecosystem </span> 
              designed to translate these core beliefs into <span className="text-pink-500 font-semibold">operational reality</span>. 
              We have engineered four distinct <span className="text-orange-500 font-semibold">pillars </span> 
              to provide the structural foundation and the practical execution needed to bring a cohesive vision to your infrastructure.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};


// ==========================================
// SECTION: SOLUTIONS (Alternating Layout)
// ==========================================
const Solutions = () => {
  const [downloadItem, setDownloadItem] = useState(null);
  const productData = [
    {
      id: "monitoring",
      name: "Infrastructure Monitoring",
      tag: "STT_DEMO",
      img: sttImg,
      description: "From overview to deep details, fast.",
      features: ["Real-time node health telemetry", "Global latency heatmaps", "Automated uptime grading"]
    },
    {
      id: "automation",
      name: "Log Management",
      tag: "STO_DEMO",
      img: stoImg,
      description: "Centralized intelligence for decentralized logs.",
      features: ["Multi-cloud log aggregation", "Pattern recognition engine", "Zero-latency forensic search"]
    },
    {
      id: "security",
      name: "Security Monitoring",
      tag: "STACK_DEMO",
      img: stacknodeImg,
      description: "Quantum-resistant threat detection.",
      features: ["End-to-end handshaking", "Quantum-safe encryption", "Anomaly detection AI"]
    },
    {
      id: "network",
      name: "Network Topology",
      tag: "BOT_DEMO",
      img: stackbotImg,
      description: "Visualizing the mesh grid architecture.",
      features: ["Interactive P2P mapping", "Bottleneck identification", "Dynamic routing logic"]
    }
  ];

  return (
    <section id="solutions" className="py-32 relative overflow-hidden dark:bg-slate-950 bg-white">
      {/* Background HUD Accents */}
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-[15px] uppercase tracking-[0.8em] text-blue-500 font-bold mb-4">Helix Framework</h2>
          <h3 className="text-5xl font-black dark:text-white text-slate-900 uppercase tracking-tight">
            Operational <span className=" text-blue-500 font-black">Pillars </span>
          </h3>
        </div>

        {/* Alternating Products */}
        <div className="space-y-32">
          {productData.map((product, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                {/* Text Content */}
                <div className={`lg:col-span-5 space-y-8 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[15px] font-mono text-blue-500 font-bold tracking-[0.2em]">0{index + 1} //</span>
                      <div className="h-px w-8 bg-blue-500/30" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold dark:text-white text-slate-900 uppercase tracking-tighter">
                      {product.name}
                    </h2>
                    <p className="text-lg text-slate-700 dark:text-slate-400 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <ul className="space-y-4">
                    {product.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-4 text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-blue-500 rotate-45" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* --- BUTTON --- */}
                    <button 
                      onClick={() => setDownloadItem(product)}
                      className="flex items-center gap-2 px-8 py-3 border border-slate-200 dark:border-white/10 dark:text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all cursor-pointer w-fit"
                    >
                      Download Specs
                    </button>

                    {/* --- ADD THIS MODAL AT THE BOTTOM OF THE SECTION --- */}
                    {downloadItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                      {/* Backdrop */}
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]"
                        onClick={() => setDownloadItem(null)} 
                      />
                      
                      {/* Modal Window */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-white/20 dark:border-slate-700 p-8 rounded-2xl max-w-sm w-full shadow-2xl"
                      >
                        <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2">Download Spec Sheet</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-8">
                          Save the technical documentation for <span className="font-semibold text-blue-600 dark:text-blue-400">{downloadItem.name}</span> to your device.
                        </p>
                        
                        <div className="flex gap-3">
                          {/* Cancel Button */}
                          <button 
                            onClick={() => setDownloadItem(null)} 
                            className="flex-1 py-3 text-sm font-semibold text-slate-900 dark:text-white 
                              /* Static border width of 2px to prevent layout shift */
                              border-2 border-slate-400 dark:border-slate-600 
                              rounded-lg transition-colors duration-200 
                              hover:border-slate-900 dark:hover:border-slate-200"
                          >
                            Cancel
                          </button>
                          
                          {/* Download Button */}
                          <a 
                            href={`/downloads/${downloadItem.id}.pdf`} 
                            download 
                            onClick={() => setDownloadItem(null)}
                            className="flex-1 py-3 bg-blue-600 text-white text-sm text-center font-semibold rounded-lg 
                              /* Same 2px border width, just matching the background */
                              border-2 border-blue-600 
                              transition-colors duration-200 
                              hover:border-blue-700 hover:bg-blue-700"
                          >
                            Download
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Image Display */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-slate-900 group">
                    <img 
                      src={product.img} 
                      alt={product.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                    />
                    <div className="absolute top-6 left-6 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[9px] text-white font-mono uppercase tracking-widest">
                      {product.tag} // ST_SUITE_v4
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 5. SECTION: CONTACT & FOOTER
// ==========================================
const Contact = () => {
  return (
    <section id="contact" className="py-32 relative dark:bg-slate-900/50 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
        {/* Left: Info */}
        <div className="space-y-6">
          <h2 className="text-[10px] uppercase tracking-[0.6em] text-blue-600 dark:text-blue-500 font-bold">Establish Connection</h2>
          <h3 className="text-5xl font-bold dark:text-white text-slate-900 leading-tight">Ready to <span className="text-blue-500">secure</span> your infrastructure?</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm">We provide custom enterprise solutions. Send us your requirements and our team will initiate the handshake.</p>
        </div>

        {/* Right: Refined Form */}
        <form className="space-y-6 bg-white dark:bg-slate-900 p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Full Name" className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 p-4 rounded-lg text-sm dark:text-white focus:border-blue-500 outline-none transition-all" />
            <input placeholder="Company" className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 p-4 rounded-lg text-sm dark:text-white focus:border-blue-500 outline-none transition-all" />
          </div>
          <input placeholder="Work Email" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 p-4 rounded-lg text-sm dark:text-white focus:border-blue-500 outline-none transition-all" />
          <textarea rows="4" placeholder="Description of your needs..." className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 p-4 rounded-lg text-sm dark:text-white focus:border-blue-500 outline-none transition-all" />
          
          <button 
            type="button" 
            className="w-full bg-blue-600 py-4 text-white font-bold uppercase text-[11px] tracking-[0.2em] rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98]"
          >
            Initialize Uplink
          </button>
        </form>
      </div>
    </section>
  );
};


// ==========================================
// MASTER APP COMPONENT
// ==========================================
export default function App() {

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <main className="relative transition-colors duration-500 selection:bg-blue-500/30">
      <StarBackground />

      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <Hero />
      <Philosophy />
      <Technology />
      <Solutions />
      <Contact />

      <footer className="py-12 text-center border-t border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-950 transition-colors duration-500">
        <span className="text-[10px] text-slate-700 uppercase tracking-[0.4em]">
          © 2024 Helix Systems // All Protocols Encrypted
        </span>
      </footer>
    </main>
  );
}