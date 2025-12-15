import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, FastForward, Layers, Database, User } from 'lucide-react';
import { PATTERN_DATA } from '../data';

interface VisualizerProps {
  type: string;
}

const PatternVisualizer: React.FC<VisualizerProps> = ({ type }) => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1 = normal (1.5s), 2 = fast (0.75s)

  // Find step descriptions
  let steps: string[] = [];
  PATTERN_DATA.forEach(cat => {
      const p = cat.patterns.find(pat => pat.visualType === type);
      if (p && p.visualSteps) steps = p.visualSteps;
  });

  const maxSteps = steps.length > 0 ? steps.length : 4;

  useEffect(() => {
    setStep(0);
    setIsPlaying(false);
  }, [type]);

  // Auto-play logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
        const duration = 1500 / speedMultiplier; // Default 1.5s
        interval = setInterval(() => {
            setStep(prev => {
                if (prev >= maxSteps) {
                    setIsPlaying(false);
                    return prev;
                }
                return prev + 1;
            });
        }, duration); 
    }
    return () => clearInterval(interval);
  }, [isPlaying, maxSteps, speedMultiplier]);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, maxSteps));
    if(step >= maxSteps) setStep(0);
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 0));
    setIsPlaying(false); 
  };

  const togglePlay = () => {
    if (step >= maxSteps) setStep(0); 
    setIsPlaying(!isPlaying);
  };

  const toggleSpeed = () => {
      setSpeedMultiplier(prev => prev === 1 ? 2 : 1);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStep(0);
  };

  const currentDescription = step === 0 ? "Presiona 'Play' para iniciar la secuencia automática." : (steps[step - 1] || "...");

  // SVG Arrow definitions
  const ArrowDefs = () => (
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" className="fill-slate-400 dark:fill-slate-600" />
              </marker>
              <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
              <marker id="arrowhead-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#9333ea" />
              </marker>
          </defs>
      </svg>
  );

  const renderVisual = () => {
    switch (type) {
      // --- CREATIONAL ---
      case 'singleton':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-8">
             <div className="flex gap-16 relative">
                 <div className="flex flex-col gap-4">
                     <div className="w-24 h-16 bg-white dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center text-xs font-bold dark:text-slate-300 shadow-md">Client A</div>
                     <div className="w-24 h-16 bg-white dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center text-xs font-bold dark:text-slate-300 shadow-md">Client B</div>
                 </div>
                 <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                     <motion.path d="M 80 32 L 180 60" fill="none" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowhead)" initial={{pathLength: 0}} animate={step >= 2 ? {pathLength: 1, stroke: "#3b82f6"} : {pathLength: 0}} className="stroke-slate-300 dark:stroke-slate-600" />
                     <motion.path d="M 80 96 L 180 80" fill="none" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowhead)" initial={{pathLength: 0}} animate={step >= 3 ? {pathLength: 1, stroke: "#ef4444"} : {pathLength: 0}} className="stroke-slate-300 dark:stroke-slate-600" />
                 </svg>
                 <div className="relative mt-8">
                     <motion.div className="w-32 h-32 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-2xl z-10 relative border-4 border-blue-700" initial={{ scale: 0.5, opacity: 0 }} animate={step >= 2 ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.2 }}>Instance</motion.div>
                 </div>
             </div>
          </div>
        );
      
      case 'factory':
        return (
          <div className="flex flex-row items-center justify-center h-full gap-16 relative">
            <div className="flex flex-col items-center z-10">
                <div className="w-32 h-20 border-4 border-blue-600 rounded-xl flex items-center justify-center font-bold text-blue-800 bg-blue-50 dark:bg-slate-800 dark:text-blue-300 shadow-lg">Creator</div>
                <span className="text-xs mt-2 text-slate-400 dark:text-slate-500">Factory Method</span>
            </div>
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 overflow-visible">
                 <motion.line x1="0" y1="20" x2="100%" y2="20" stroke="#cbd5e1" strokeWidth="4" markerEnd="url(#arrowhead)" className="stroke-slate-300 dark:stroke-slate-600" />
                 {step >= 2 && <motion.circle cx="0" cy="20" r="6" fill="#10b981" animate={{cx: "100%"}} transition={{duration: 0.8}} />}
            </svg>
            <motion.div className="w-28 h-28 bg-emerald-100 dark:bg-emerald-900/20 border-4 border-emerald-500 rounded-full flex items-center justify-center text-sm font-semibold text-center p-2 z-10 shadow-xl dark:text-emerald-300" initial={{ scale: 0, opacity: 0 }} animate={step >= 3 ? { scale: 1, opacity: 1 } : {}}>Product Instance</motion.div>
          </div>
        );

      case 'builder':
        return (
            <div className="flex flex-row items-center justify-center h-full gap-12">
                <div className="flex flex-col items-center gap-3">
                    <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Builder Process</div>
                    <div className="w-28 h-44 border-4 border-dashed border-slate-400 dark:border-slate-500 bg-slate-50 dark:bg-slate-800 rounded-xl flex flex-col p-3 gap-2 shadow-inner justify-end">
                        <motion.div className="h-8 w-full rounded border border-blue-400/50" animate={step>=1 ? {backgroundColor: "#3b82f6"} : {backgroundColor: "transparent"}} />
                        <motion.div className="h-8 w-full rounded border border-blue-400/50" animate={step>=2 ? {backgroundColor: "#60a5fa"} : {backgroundColor: "transparent"}} />
                        <motion.div className="h-8 w-full rounded border border-blue-400/50" animate={step>=3 ? {backgroundColor: "#93c5fd"} : {backgroundColor: "transparent"}} />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-1">
                    <motion.div className="text-3xl text-slate-400 dark:text-slate-500" animate={step>=4?{x:5, opacity:1}:{opacity:0.3}}>→</motion.div>
                    <span className="text-[10px] uppercase text-slate-400 dark:text-slate-500 font-bold">Build()</span>
                </div>
                <motion.div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl border-4 border-white/20 flex items-center justify-center shadow-2xl text-white font-bold" initial={{ opacity: 0, scale: 0.5, rotate: -10 }} animate={step >= 4 ? { opacity: 1, scale: 1, rotate: 0 } : {}}>Object</motion.div>
            </div>
        );

      case 'prototype':
          return (
              <div className="flex items-center justify-center h-full gap-20">
                  <div className="flex flex-col items-center relative">
                      <div className="w-32 h-32 bg-white dark:bg-slate-800 border-4 border-indigo-500 dark:border-indigo-400 rounded-2xl flex flex-col items-center justify-center shadow-xl relative overflow-hidden">
                          <span className="font-bold text-indigo-700 dark:text-indigo-300">Original</span>
                          {/* Properties / DNA */}
                          <div className="flex gap-1 mt-2">
                              <div className="w-4 h-4 rounded-full bg-red-400 border border-red-600/20"></div>
                              <div className="w-4 h-4 rounded-full bg-green-400 border border-green-600/20"></div>
                              <div className="w-4 h-4 rounded-full bg-blue-400 border border-blue-600/20"></div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="relative w-24 h-3 bg-slate-200 dark:bg-slate-700 rounded-full">
                        {step >= 2 && (
                             <motion.div className="absolute -top-6 left-0 w-full text-center text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400" initial={{opacity:0}} animate={{opacity:1}}>clone()</motion.div>
                        )}
                        <motion.div className="absolute inset-0 bg-indigo-500 rounded-full" initial={{width:0}} animate={step>=2?{width:"100%"}:{width:0}} />
                        {/* Moving Props */}
                        {step === 2 && (
                            <motion.div className="absolute top-0 left-0 flex gap-1 -translate-y-1/2" animate={{left: "100%"}} transition={{duration: 0.8}}>
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                            </motion.div>
                        )}
                  </div>

                  <motion.div className="flex flex-col items-center" initial={{opacity: 0, x: -30}} animate={step >= 3 ? {opacity: 1, x: 0} : {}}>
                      <div className="w-32 h-32 bg-white dark:bg-slate-800 border-4 border-dashed border-indigo-400 rounded-2xl flex flex-col items-center justify-center shadow-md">
                          <span className="font-bold text-indigo-400">Clone</span>
                           <div className="flex gap-1 mt-2">
                              <div className="w-4 h-4 rounded-full bg-red-400 opacity-50"></div>
                              <div className="w-4 h-4 rounded-full bg-green-400 opacity-50"></div>
                              <div className="w-4 h-4 rounded-full bg-blue-400 opacity-50"></div>
                          </div>
                      </div>
                  </motion.div>
              </div>
          );

      // --- STRUCTURAL ---
      case 'adapter':
        return (
            <div className="flex items-center justify-center h-full gap-6">
                <div className="w-24 h-24 bg-white dark:bg-slate-800 border-4 border-slate-400 dark:border-slate-500 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg dark:text-slate-300">Client<br/>(Square)</div>
                <svg className="w-12 h-6 overflow-visible">
                     <motion.line x1="0" y1="3" x2="100%" y2="3" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrowhead)" className="stroke-slate-400 dark:stroke-slate-500" />
                     {step >= 1 && <motion.rect width="8" height="8" fill="#3b82f6" animate={{x: 40}} transition={{duration: 0.5}} />}
                </svg>
                <div className="relative w-32 h-32 flex items-center justify-center">
                     <div className="absolute inset-0 border-4 border-dashed border-slate-300 dark:border-slate-600 rounded-full" />
                     <motion.div className="w-28 h-28 bg-emerald-50 dark:bg-slate-800 border-4 border-emerald-500 flex items-center justify-center z-10 shadow-xl text-center p-2" initial={{borderRadius: "8px"}} animate={step >= 2 ? {borderRadius: "50%", backgroundColor: "#d1fae5"} : {borderRadius: "8px"}}>
                        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Adapter<br/>Converter</span>
                     </motion.div>
                </div>
                <svg className="w-12 h-6 overflow-visible">
                     <motion.line x1="0" y1="3" x2="100%" y2="3" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrowhead)" className="stroke-slate-400 dark:stroke-slate-500" />
                     {step >= 3 && <motion.circle r="4" fill="#10b981" animate={{cx: 40, cy: 3}} transition={{duration: 0.5}} />}
                </svg>
                <div className="w-24 h-24 bg-white dark:bg-slate-800 border-4 border-slate-400 dark:border-slate-500 rounded-full flex items-center justify-center text-xs font-bold shadow-lg text-center dark:text-slate-300">Legacy<br/>(Circle)</div>
            </div>
        );

      case 'facade':
        return (
            <div className="flex flex-col items-center justify-start h-full w-full relative pt-4">
                <motion.div className="w-72 h-16 bg-emerald-600 text-white rounded-xl border-4 border-emerald-700 flex items-center justify-center z-20 shadow-xl text-lg font-bold cursor-default">Facade Interface</motion.div>
                <div className="flex gap-8 mt-12 relative w-full justify-center">
                    <svg className="absolute -top-12 left-0 w-full h-12 pointer-events-none overflow-visible">
                         <motion.path d="M 50% 0 L 25% 40" stroke="#cbd5e1" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" initial={{pathLength: 0}} animate={step>=2?{pathLength:1}:{}} className="stroke-slate-300 dark:stroke-slate-600" />
                         <motion.path d="M 50% 0 L 50% 40" stroke="#cbd5e1" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" initial={{pathLength: 0}} animate={step>=3?{pathLength:1}:{}} className="stroke-slate-300 dark:stroke-slate-600" />
                         <motion.path d="M 50% 0 L 75% 40" stroke="#cbd5e1" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" initial={{pathLength: 0}} animate={step>=4?{pathLength:1}:{}} className="stroke-slate-300 dark:stroke-slate-600" />
                    </svg>
                    <motion.div className="w-24 h-24 border-4 border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center text-xs gap-1 shadow-md dark:text-slate-300" animate={step >= 2 ? { borderColor: "#10b981", backgroundColor: "#ecfdf5", scale: 1.1 } : {}}><div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div><span>SubSys A</span></motion.div>
                    <motion.div className="w-24 h-24 border-4 border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center text-xs gap-1 shadow-md dark:text-slate-300" animate={step >= 3 ? { borderColor: "#10b981", backgroundColor: "#ecfdf5", scale: 1.1 } : {}}><div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div><span>SubSys B</span></motion.div>
                    <motion.div className="w-24 h-24 border-4 border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center text-xs gap-1 shadow-md dark:text-slate-300" animate={step >= 4 ? { borderColor: "#10b981", backgroundColor: "#ecfdf5", scale: 1.1 } : {}}><div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div><span>SubSys C</span></motion.div>
                </div>
            </div>
        );

      case 'proxy':
        return (
            <div className="flex items-center justify-center h-full gap-4">
                 <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-400 dark:border-slate-500 flex items-center justify-center text-xs font-bold dark:text-slate-200 shadow-lg">Client</div>
                 
                 <svg className="w-16 h-8 overflow-visible">
                     <line x1="0" y1="4" x2="100%" y2="4" stroke="#94a3b8" strokeWidth="3" className="stroke-slate-400 dark:stroke-slate-500" />
                     {step === 1 && <motion.circle r="4" fill="#000" className="dark:fill-white" animate={{cx: [0, 60]}} transition={{duration: 0.5}} />}
                 </svg>
                 
                 {/* Gatekeeper Shield Visual */}
                 <div className="relative">
                    <motion.div 
                        className="w-32 h-44 bg-white dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center shadow-xl z-10"
                        animate={step >= 2 && step < 3 ? {borderColor: "#ef4444"} : step >= 3 ? {borderColor: "#10b981"} : {}}
                    >
                        <span className="text-sm font-bold mb-2 dark:text-slate-200">Proxy</span>
                        {/* Shield Icon */}
                        <div className="w-12 h-14 border-4 border-slate-300 dark:border-slate-600 rounded-b-full flex items-center justify-center mb-2">
                             <motion.div 
                                className="w-8 h-8 rounded-full"
                                animate={{backgroundColor: step===1 ? "#94a3b8" : step===2 ? "#ef4444" : "#10b981"}}
                             />
                        </div>
                        <AnimatePresence>
                            {step === 2 && <motion.div className="text-[10px] text-red-600 font-bold" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>Checking...</motion.div>}
                            {step >= 3 && <motion.div className="text-[10px] text-green-600 font-bold" initial={{opacity:0}} animate={{opacity:1}}>Allowed</motion.div>}
                        </AnimatePresence>
                    </motion.div>
                 </div>
                 
                 <svg className="w-16 h-8 overflow-visible">
                     <line x1="0" y1="4" x2="100%" y2="4" stroke="#94a3b8" strokeWidth="3" strokeDasharray="4 2" className="stroke-slate-400 dark:stroke-slate-500" />
                     {step >= 3 && <motion.circle r="4" fill="#10b981" animate={{cx: [0, 60]}} transition={{duration: 0.5}} />}
                 </svg>
                 
                 <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 border-4 border-slate-500 dark:border-slate-400 rounded-xl flex items-center justify-center text-xs text-slate-600 dark:text-slate-300 font-bold text-center shadow-md">Real<br/>Service</div>
            </div>
        );
      
      case 'bridge':
          return (
              <div className="flex flex-col items-center justify-center gap-12 h-full w-full max-w-md mx-auto">
                  {/* Remote (Abstraction) */}
                  <div className="w-48 h-16 border-4 border-slate-700 dark:border-slate-400 bg-white dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center font-bold shadow-lg z-20 relative">
                      <span className="text-sm dark:text-slate-200">Remote Control</span>
                      <div className="absolute -bottom-3 w-4 h-4 bg-slate-700 dark:bg-slate-400 rotate-45"></div> {/* Connector Plug */}
                  </div>
                  
                  {/* Devices (Implementation) */}
                  <div className="relative w-full h-32 flex justify-between items-end px-8">
                      {/* Connection Lines animation */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible">
                          <motion.path 
                             d="M 50% -20 Q 50% 40 20% 80" 
                             fill="none" strokeWidth="4" 
                             animate={step <= 2 && step > 0 ? {stroke: "#2563eb", strokeDasharray: "0"} : {stroke: "#cbd5e1", strokeDasharray: "4"}} 
                             className={step <= 2 && step > 0 ? "" : "stroke-slate-300 dark:stroke-slate-600"}
                          />
                           <motion.path 
                             d="M 50% -20 Q 50% 40 80% 80" 
                             fill="none" strokeWidth="4" 
                             animate={step >= 3 ? {stroke: "#2563eb", strokeDasharray: "0"} : {stroke: "#cbd5e1", strokeDasharray: "4"}} 
                             className={step >= 3 ? "" : "stroke-slate-300 dark:stroke-slate-600"}
                          />
                      </svg>

                      {/* Device A */}
                      <div className="flex flex-col items-center">
                          <div className="w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full mb-1"></div> {/* Port */}
                          <motion.div 
                            className="w-32 h-20 bg-white dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center text-sm font-medium transition-colors dark:text-slate-300 shadow-md"
                            animate={step===2 ? {borderColor: "#2563eb", backgroundColor: "#eff6ff"} : {}}
                          >
                              TV
                          </motion.div>
                      </div>

                       {/* Device B */}
                      <div className="flex flex-col items-center">
                           <div className="w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full mb-1"></div> {/* Port */}
                           <motion.div 
                            className="w-32 h-20 bg-white dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center text-sm font-medium transition-colors dark:text-slate-300 shadow-md"
                            animate={step===4 ? {borderColor: "#2563eb", backgroundColor: "#eff6ff"} : {}}
                           >
                              Radio
                           </motion.div>
                      </div>
                  </div>
              </div>
          );

      // --- BEHAVIORAL ---
      case 'iterator':
        return (
            <div className="flex flex-col items-center justify-center gap-10 h-full">
                 <div className="flex gap-4 relative">
                    <motion.div 
                        className="absolute -top-10 left-0 w-8 h-8 bg-orange-500 text-white text-xs font-bold flex items-center justify-center rounded-full shadow-lg z-20"
                        animate={{ x: (step > 0 && step <= 3) ? (step-1) * 72 + 20 : 0, opacity: step > 0 ? 1 : 0 }}
                    >
                        i
                    </motion.div>
                    {[1,2,3].map(i => (
                        <motion.div key={i} className="w-16 h-16 border-4 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-xl font-bold text-slate-400 dark:text-slate-500 shadow-md" animate={step === i ? { backgroundColor: "#ffedd5", borderColor: "#f97316", color: "#c2410c", scale: 1.1 } : { scale: 1 }}>{i}</motion.div>
                    ))}
                 </div>
                 <div className="text-sm text-slate-600 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded border-2 border-slate-200 dark:border-slate-700">{step === 0 ? "iterator = list.createIterator()" : step <= 3 ? `current = list[${step-1}]; iterator.next()` : "done: true"}</div>
            </div>
        );

      case 'memento':
          return (
              <div className="flex items-center justify-center gap-12 h-full">
                  <div className="flex flex-col items-center gap-4">
                      <div className="text-sm font-bold text-slate-600 dark:text-slate-400">Originator</div>
                      <motion.div className="w-24 h-24 border-4 border-slate-600 dark:border-slate-400 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center font-bold text-3xl shadow-xl" animate={step === 3 ? { backgroundColor: "#fecaca", borderColor: "#ef4444", color: "#991b1b" } : { color: "#1e293b" }}>{step >= 3 ? "B" : "A"}</motion.div>
                  </div>
                  <div className="flex flex-col items-center gap-2 justify-center w-32">
                      <motion.div className="text-xs font-bold text-slate-400 uppercase tracking-wider" animate={step === 2 ? {x: 0, opacity: 1, color: "#3b82f6"} : step === 4 ? {x: 0, opacity: 1, color: "#22c55e"} : {opacity: 0}}>{step === 2 ? "Saving state..." : "Restoring..."}</motion.div>
                      <svg className="w-full h-8 overflow-visible"><motion.line x1="0" y1="4" x2="100%" y2="4" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowhead)" animate={step === 4 ? {stroke: "#22c55e", rotate: 180, originX: "50%", originY: "50%"} : {stroke: "#3b82f6", rotate: 0}} className="stroke-slate-300 dark:stroke-slate-600" /></svg>
                      <div className="w-24 h-28 border-4 border-slate-400 dark:border-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-end justify-center pb-2 shadow-inner relative">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 absolute top-1 font-bold">Caretaker</span>
                          <AnimatePresence>{step >= 2 && step < 4 && (<motion.div initial={{y: -50, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -50, opacity: 0}} className="w-14 h-14 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded shadow-md flex items-center justify-center font-bold dark:text-white">A</motion.div>)}</AnimatePresence>
                      </div>
                  </div>
              </div>
          );

      case 'state':
          return (
              <div className="flex items-center justify-center gap-16 h-full">
                  <div className="w-32 h-32 border-8 border-slate-800 dark:border-slate-600 rounded-3xl flex flex-col items-center justify-center bg-white dark:bg-slate-800 shadow-2xl z-10 relative overflow-hidden">
                      <span className="text-xs font-bold mb-2 uppercase tracking-wide text-slate-400 dark:text-slate-500">Context</span>
                      <motion.div className="w-full py-2 text-center text-sm font-bold text-white mb-2" animate={{ backgroundColor: step < 3 ? "#ef4444" : "#22c55e" }}>{step < 3 ? "LOCKED" : "UNLOCKED"}</motion.div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Current State Obj</div>
                  </div>
                  <div className="flex flex-col gap-4">
                       <AnimatePresence>
                           {step === 2 && (<motion.div className="flex items-center gap-2 text-red-600 dark:text-red-400" initial={{x: -20, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{opacity: 0}}><div className="w-3 h-3 bg-red-600 rounded-full"></div><span className="text-sm font-bold">Action Denied</span></motion.div>)}
                           {step === 4 && (<motion.div className="flex items-center gap-2 text-green-600 dark:text-green-400" initial={{x: -20, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{opacity: 0}}><div className="w-3 h-3 bg-green-600 rounded-full"></div><span className="text-sm font-bold">Action Executed</span></motion.div>)}
                       </AnimatePresence>
                  </div>
              </div>
          );

      case 'strategy':
          return (
              <div className="flex flex-col items-center justify-center gap-8 h-full">
                   <div className="flex gap-8 w-full justify-center">
                       <motion.div className="w-32 p-3 border-4 rounded-xl text-center shadow-md bg-white dark:bg-slate-800 dark:text-slate-300" animate={step < 3 ? {borderColor: "#f97316", backgroundColor: "#fff7ed", scale: 1.05} : {borderColor: "#e2e8f0", opacity: 0.5}}><span className="block text-xs font-bold text-orange-600 dark:text-orange-400 mb-1">Strategy A</span></motion.div>
                       <motion.div className="w-32 p-3 border-4 rounded-xl text-center shadow-md bg-white dark:bg-slate-800 dark:text-slate-300" animate={step >= 3 ? {borderColor: "#f97316", backgroundColor: "#fff7ed", scale: 1.05} : {borderColor: "#e2e8f0", opacity: 0.5}}><span className="block text-xs font-bold text-orange-600 dark:text-orange-400 mb-1">Strategy B</span></motion.div>
                   </div>
                   <div className="w-64 h-3 bg-slate-200 dark:bg-slate-700 rounded-full relative overflow-hidden border border-slate-300 dark:border-slate-600">
                       <motion.div className="absolute top-0 left-0 h-full bg-orange-500" initial={{width: 0}} animate={step === 2 ? {width: "100%", transition: {duration: 0.5, ease: "linear"}} : step === 4 ? {width: "100%", transition: {duration: 2, ease: "linear"}} : {width: 0}} />
                   </div>
                   <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Processing Speed Simulation</div>
              </div>
          );

      case 'observer':
        return (
            <div className="flex flex-col items-center justify-center h-full gap-8 relative w-full">
                <motion.div
                    className="w-28 h-28 bg-orange-500 rounded-full z-20 flex items-center justify-center text-white font-bold shadow-2xl border-8 border-orange-300 dark:border-orange-700"
                    animate={step === 2 ? { scale: 1.1, backgroundColor: "#ea580c" } : { scale: 1 }}
                >
                    SUBJECT
                </motion.div>

                <div className="flex justify-around w-full max-w-md px-4 relative">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="flex flex-col items-center relative z-20">
                             <motion.div
                                className="w-16 h-16 bg-white dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg dark:text-slate-300"
                                animate={step >= 3 ? { borderColor: "#f97316", color: "#f97316", backgroundColor: "#fff7ed", y: -5 } : {}}
                             >
                                Obs {i+1}
                            </motion.div>
                        </div>
                    ))}
                </div>

                 <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                     <line x1="50%" y1="35%" x2="20%" y2="70%" stroke="#cbd5e1" strokeWidth="2" className="stroke-slate-300 dark:stroke-slate-600" />
                     <line x1="50%" y1="35%" x2="50%" y2="70%" stroke="#cbd5e1" strokeWidth="2" className="stroke-slate-300 dark:stroke-slate-600" />
                     <line x1="50%" y1="35%" x2="80%" y2="70%" stroke="#cbd5e1" strokeWidth="2" className="stroke-slate-300 dark:stroke-slate-600" />

                     {step === 3 && (
                         <>
                            <motion.circle r="4" fill="#f97316" initial={{cx: "50%", cy:"35%"}} animate={{cx: "20%", cy: "70%"}} transition={{duration: 0.8}} />
                            <motion.circle r="4" fill="#f97316" initial={{cx: "50%", cy:"35%"}} animate={{cx: "50%", cy: "70%"}} transition={{duration: 0.8}} />
                            <motion.circle r="4" fill="#f97316" initial={{cx: "50%", cy:"35%"}} animate={{cx: "80%", cy: "70%"}} transition={{duration: 0.8}} />
                         </>
                     )}
                 </svg>
            </div>
        );

      // --- ARCHITECTURAL ---
      case 'soa':
          return (
              <div className="flex items-center justify-center gap-4 h-full w-full px-4">
                  <div className="flex flex-col items-center gap-2">
                      <div className="w-24 h-24 bg-white dark:bg-slate-800 border-4 border-purple-500 rounded-xl flex items-center justify-center text-xs font-bold text-center p-1 dark:text-purple-200 shadow-lg">Service A<br/>(Order)</div>
                  </div>
                  <div className="flex-1 h-14 border-y-4 border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative shadow-inner">
                       <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Enterprise Service Bus</span>
                       <motion.div className="absolute w-6 h-6 rounded-full bg-purple-600 top-1/2 -translate-y-1/2 shadow-md border-2 border-white" animate={step === 2 ? {left: "10%"} : step === 3 ? {left: "90%"} : step === 4 ? {left: "10%"} : {left: "10%", opacity: 0}} />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                      <div className="w-24 h-24 bg-white dark:bg-slate-800 border-4 border-purple-500 rounded-xl flex items-center justify-center text-xs font-bold text-center p-1 dark:text-purple-200 shadow-lg">Service B<br/>(Payment)</div>
                  </div>
              </div>
          );

      case 'data-centric':
          return (
              <div className="relative w-full h-full flex items-center justify-center">
                  {/* Central DB */}
                  <motion.div
                      className="relative w-36 h-36 z-20"
                      animate={step === 2 || step === 4 ? { scale: 1.05 } : { scale: 1 }}
                  >
                      {/* Cylinder visual css */}
                      <div className="absolute inset-x-0 top-0 h-10 bg-slate-100 dark:bg-slate-700 rounded-[50%] border-4 border-slate-600 dark:border-slate-400 z-20" />
                      <div className="absolute inset-x-0 bottom-0 h-10 bg-slate-200 dark:bg-slate-800 rounded-[50%] border-4 border-slate-600 dark:border-slate-400 z-0" />
                      <div className="absolute inset-0 top-5 bottom-5 bg-white dark:bg-slate-800 border-x-4 border-slate-600 dark:border-slate-400 z-10 flex items-center justify-center flex-col shadow-2xl">
                          <div className="w-full h-px bg-slate-200 dark:bg-slate-600 my-1"></div>
                          <div className="w-full h-px bg-slate-200 dark:bg-slate-600 my-1"></div>
                          <span className="font-black text-xs mt-2 dark:text-slate-300 tracking-wider">SHARED DB</span>
                      </div>
                  </motion.div>

                  {/* Clients */}
                  <motion.div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-16 bg-white dark:bg-slate-800 border-4 border-purple-400 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg z-20 dark:text-slate-300"
                      animate={step===2 ? {borderColor: "#9333ea", backgroundColor: "#f3e8ff"} : {}}
                  >
                      Client A
                      {step===2 && <span className="absolute -right-20 text-[10px] text-purple-600 font-bold bg-white px-1 rounded shadow-sm">Write()</span>}
                  </motion.div>

                  <motion.div className="absolute bottom-8 left-8 w-24 h-16 bg-white dark:bg-slate-800 border-4 border-purple-400 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg z-20 dark:text-slate-300"
                      animate={step===3 ? {borderColor: "#9333ea", backgroundColor: "#f3e8ff"} : {}}
                  >
                      Client B
                  </motion.div>

                  <motion.div className="absolute bottom-8 right-8 w-24 h-16 bg-white dark:bg-slate-800 border-4 border-purple-400 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg z-20 dark:text-slate-300"
                      animate={step===4 ? {borderColor: "#9333ea", backgroundColor: "#f3e8ff"} : {}}
                  >
                      Client C
                  </motion.div>

                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                      <line x1="50%" y1="20%" x2="50%" y2="40%" stroke="#cbd5e1" strokeWidth="3" className="stroke-slate-300 dark:stroke-slate-600" />
                      <line x1="25%" y1="80%" x2="45%" y2="60%" stroke="#cbd5e1" strokeWidth="3" className="stroke-slate-300 dark:stroke-slate-600" />
                      <line x1="75%" y1="80%" x2="55%" y2="60%" stroke="#cbd5e1" strokeWidth="3" className="stroke-slate-300 dark:stroke-slate-600" />

                      {step === 2 && <motion.circle r="5" fill="#9333ea" initial={{cx: "50%", cy:"20%"}} animate={{cy: "40%"}} />}
                      {step === 3 && <motion.circle r="5" fill="#9333ea" initial={{cx: "45%", cy:"60%"}} animate={{cx: "25%", cy: "80%"}} />}
                      {step === 4 && <motion.circle r="5" fill="#9333ea" initial={{cx: "55%", cy:"60%"}} animate={{cx: "75%", cy: "80%"}} />}
                  </svg>
              </div>
          );

      case 'layered':
          return (
              <div className="flex flex-col items-center justify-center h-full w-full max-w-sm mx-auto relative px-12">
                   {/* Background Track */}
                   <div className="absolute left-[3.25rem] top-10 bottom-10 w-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                   
                   {/* User / Request Start */}
                   <div className="absolute top-2 left-10 flex flex-col items-center">
                      <User size={24} className="text-slate-500 dark:text-slate-400" />
                   </div>

                   {/* Layers */}
                   <div className="flex flex-col gap-6 w-full z-10">
                       <motion.div className="w-full h-20 bg-white dark:bg-slate-800 border-4 border-purple-300 dark:border-purple-800 rounded-xl flex items-center justify-between px-6 shadow-md relative"
                          animate={step===1 || step===4 ? {borderColor: "#9333ea", scale: 1.05, boxShadow: "0 20px 25px -5px rgba(147, 51, 234, 0.1)"} : {}}
                       >
                           <div className="flex flex-col">
                               <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Presentation</span>
                               <span className="text-[10px] text-slate-400 font-bold">UI / Controllers</span>
                           </div>
                           <Layers size={24} className="text-purple-400" />
                       </motion.div>

                       <motion.div className="w-full h-20 bg-white dark:bg-slate-800 border-4 border-purple-300 dark:border-purple-800 rounded-xl flex items-center justify-between px-6 shadow-md relative"
                          animate={step===2 || step===4 ? {borderColor: "#9333ea", scale: 1.05, boxShadow: "0 20px 25px -5px rgba(147, 51, 234, 0.1)"} : {}}
                       >
                           <div className="flex flex-col">
                               <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Business Logic</span>
                               <span className="text-[10px] text-slate-400 font-bold">Services / Rules</span>
                           </div>
                           <Layers size={24} className="text-purple-400" />
                       </motion.div>

                       <motion.div className="w-full h-20 bg-white dark:bg-slate-800 border-4 border-purple-300 dark:border-purple-800 rounded-xl flex items-center justify-between px-6 shadow-md relative"
                          animate={step===3 || step===4 ? {borderColor: "#9333ea", scale: 1.05, boxShadow: "0 20px 25px -5px rgba(147, 51, 234, 0.1)"} : {}}
                       >
                           <div className="flex flex-col">
                               <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Data Access</span>
                               <span className="text-[10px] text-slate-400 font-bold">Repositories / SQL</span>
                           </div>
                           <Database size={24} className="text-purple-400" />
                       </motion.div>
                   </div>

                   {/* Database Bottom */}
                   <div className="absolute bottom-2 left-10 flex flex-col items-center">
                       <Database size={24} className="text-slate-500 dark:text-slate-400" />
                   </div>

                   {/* Moving Payload */}
                   <motion.div 
                      className="absolute left-[2.65rem] w-6 h-6 bg-purple-600 rounded-full shadow-lg z-20 border-2 border-white dark:border-slate-900"
                      initial={{ top: "10%" }}
                      animate={
                          step === 1 ? { top: "27%" } :
                          step === 2 ? { top: "50%" } :
                          step === 3 ? { top: "73%" } :
                          step === 4 ? { top: "27%", backgroundColor: "#22c55e" } : // Returning green
                          { top: "10%" }
                      }
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                   />
              </div>
          );

      case 'mvc':
         return (
             <div className="relative w-full h-full">
                 <ArrowDefs />
                 
                 {/* Controller - Bottom Right */}
                 <motion.div 
                     className="absolute bottom-10 right-10 w-32 h-24 bg-white dark:bg-slate-800 border-4 border-slate-400 dark:border-slate-500 rounded-xl flex flex-col items-center justify-center shadow-xl z-20"
                     animate={step===1 || step===2 ? {borderColor: "#3b82f6", backgroundColor: "#eff6ff"} : {}}
                 >
                     <span className="font-bold text-sm dark:text-slate-200">Controller</span>
                     {step===1 && <span className="text-[10px] text-blue-600 font-bold absolute -top-5 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Input</span>}
                 </motion.div>

                 {/* Model - Top Center */}
                 <motion.div 
                     className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-24 bg-purple-50 dark:bg-slate-800 border-4 border-purple-500 rounded-xl flex flex-col items-center justify-center shadow-xl z-20"
                     animate={step===2 || step===3 ? {scale: 1.1, backgroundColor: "#f3e8ff"} : {}}
                 >
                     <span className="font-bold text-sm dark:text-slate-200">Model</span>
                     <span className="text-[10px] text-slate-500 dark:text-slate-400">Data & Logic</span>
                 </motion.div>

                 {/* View - Bottom Left */}
                 <motion.div 
                     className="absolute bottom-10 left-10 w-32 h-24 bg-emerald-50 dark:bg-slate-800 border-4 border-emerald-500 rounded-xl flex flex-col items-center justify-center shadow-xl z-20"
                     animate={step===4 ? {scale: 1.1, backgroundColor: "#ecfdf5"} : {}}
                 >
                     <span className="font-bold text-sm dark:text-slate-200">View</span>
                     <span className="text-[10px] text-slate-500 dark:text-slate-400">UI Display</span>
                 </motion.div>

                 {/* Connections */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                     {/* Controller -> Model */}
                     <path d="M 75% 75% L 55% 30%" stroke="#cbd5e1" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" className="stroke-slate-300 dark:stroke-slate-600" />
                     {step>=2 && <motion.circle r="5" fill="#3b82f6" initial={{cx: "75%", cy: "75%"}} animate={{cx: "55%", cy: "30%"}} />}

                     {/* Model -> View */}
                     <path d="M 45% 30% L 25% 75%" stroke="#cbd5e1" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" className="stroke-slate-300 dark:stroke-slate-600" />
                      {step>=3 && <motion.circle r="5" fill="#9333ea" initial={{cx: "45%", cy: "30%"}} animate={{cx: "25%", cy: "75%"}} />}

                     {/* View -> User */}
                      {step===4 && <text x="25%" y="95%" textAnchor="middle" fontSize="12" fill="#10b981" fontWeight="bold">Display to User</text>}
                 </svg>
             </div>
         );

      case 'client-server':
          return (
              <div className="flex items-center justify-center gap-20 h-full w-full">
                  {/* Client */}
                  <div className="flex flex-col items-center gap-2 z-10">
                      <div className="w-28 h-24 bg-white dark:bg-slate-800 border-4 border-slate-500 dark:border-slate-400 rounded-xl flex items-center justify-center font-bold shadow-xl dark:text-slate-200">
                          Client
                      </div>
                  </div>

                  {/* Network Space */}
                  <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-700 rounded relative">
                       {/* Request Packet */}
                       {step === 2 && (
                          <motion.div 
                              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-500 rounded shadow-md border border-white"
                              initial={{ left: "0%" }}
                              animate={{ left: "100%" }}
                              transition={{ duration: 0.8 }}
                          />
                       )}
                       {/* Response Packet */}
                       {step === 4 && (
                          <motion.div 
                              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-green-500 rounded shadow-md border border-white"
                              initial={{ left: "100%" }}
                              animate={{ left: "0%" }}
                              transition={{ duration: 0.8 }}
                          />
                       )}
                  </div>

                  {/* Server */}
                  <div className="flex flex-col items-center gap-2 z-10">
                      <motion.div 
                          className="w-28 h-24 bg-slate-800 dark:bg-slate-700 text-white border-4 border-slate-600 dark:border-slate-500 rounded-xl flex items-center justify-center font-bold shadow-xl"
                          animate={step === 3 ? { scale: 1.1 } : {}}
                      >
                          Server
                      </motion.div>
                      {step === 3 && <span className="text-xs text-slate-500 dark:text-slate-400 font-bold animate-pulse">Processing...</span>}
                  </div>
              </div>
          );

      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-600 flex-col">
            <div className="w-24 h-32 border-4 border-dashed border-slate-300 dark:border-slate-600 rounded flex items-center justify-center">UML</div>
            <span className="text-xs mt-2">Diagrama Genérico</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-[32rem] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm relative transition-colors duration-300">
      <ArrowDefs />
      <div className="flex-1 relative p-6 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode='wait'>
            <motion.div 
                key={type}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full max-w-lg mx-auto"
            >
                {renderVisual()}
            </motion.div>
        </AnimatePresence>
        
        {/* Step Description Overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-center py-3 px-6 border-t border-slate-100 dark:border-slate-800 min-h-[3rem] flex flex-col items-center justify-center gap-1">
            <div className="flex gap-1 mb-1">
                {[...Array(maxSteps + 1)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === step ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-slate-300 dark:bg-slate-700'}`} />
                ))}
            </div>
            <motion.span key={step} initial={{opacity: 0, y: 5}} animate={{opacity: 1, y: 0}} className="text-sm font-medium text-slate-700 dark:text-slate-300">{currentDescription}</motion.span>
        </div>
      </div>

      <div className="h-16 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-2">
            <button onClick={handleReset} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors" title="Reset"><RotateCcw size={18} /></button>
            <button onClick={toggleSpeed} className={`p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center gap-1 font-mono text-xs font-bold ${speedMultiplier === 2 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`} title="Velocidad"><FastForward size={18} /> {speedMultiplier}x</button>
        </div>

        <div className="flex items-center gap-4">
             <button onClick={handlePrev} disabled={step === 0} className={`p-2 rounded-full transition-colors ${step === 0 ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'}`}><ChevronLeft size={24} /></button>
            <button onClick={togglePlay} className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-full shadow-md transition-transform active:scale-95 flex items-center justify-center">{isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}</button>
            <button onClick={handleNext} disabled={step === maxSteps} className={`p-2 rounded-full transition-colors ${step === maxSteps ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'}`}><ChevronRight size={24} /></button>
        </div>
        <div className="w-20"></div>
      </div>
    </div>
  );
};

export default PatternVisualizer;