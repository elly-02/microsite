const Hero = () => {
  return (
    // Replaced bg-slate-900 with theme-aware classes
    <div className="relative min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center overflow-hidden transition-colors duration-500">
      
      {/* Background Technical Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none technical-grid" />

      <motion.div className="relative z-10 text-center px-6">
        <motion.span className="text-blue-500 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
          System Status: Operational
        </motion.span>

        {/* Changed text-white to text-slate-900 dark:text-white */}
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tighter mb-6 transition-colors">
          HELIX <span className="text-blue-500">INFRA</span>
        </h1>

        <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-lg mb-10 transition-colors">
          Next-generation infrastructure automation for decentralized networks.
        </p>

        <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-sm tracking-widest uppercase text-xs hover:bg-blue-500 transition-colors">
          Initialize Terminal
        </button>
      </motion.div>
    </div>
  );
};