"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

const orbits = [
  {
    radius: 350,
    duration: 35,
    items: [
      { name: "MACHINE LEARNING", delay: 0 },
      { name: "DEEP LEARNING", delay: 17.5 }
    ]
  },
  {
    radius: 550,
    duration: 45,
    items: [
      { name: "COMPUTER VISION", delay: 0 },
      { name: "PREDICTIVE ANALYTICS", delay: 15 },
      { name: "MLOPS", delay: 30 }
    ]
  },
  {
    radius: 750,
    duration: 60,
    items: [
      { name: "NEXT.JS & REACT", delay: 0 },
      { name: "PYTHON & PYTORCH", delay: 15 },
      { name: "AWS & CLOUD", delay: 30 },
      { name: "KUBERNETES", delay: 45 }
    ]
  }
];

export default function Skills() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative h-[120vh] bg-black overflow-hidden flex items-center justify-center z-20">
      
      {/* Extremely subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] opacity-80" />
      
      <div className="absolute top-24 w-full text-center z-30 pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-light text-white tracking-[0.3em] uppercase opacity-80 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Technical Arsenal
        </h2>
      </div>

      <div className="relative flex items-center justify-center scale-75 md:scale-100">
        
        {/* Holographic 3D Gyroscope AI Core */}
        <div className="absolute z-10 w-48 h-48 flex items-center justify-center transform-gpu" style={{ perspective: "1000px" }}>
          {/* Inner spark */}
          <div className="absolute w-12 h-12 bg-white rounded-full blur-[8px] animate-pulse shadow-[0_0_50px_rgba(255,255,255,1)]" />
          
          {/* Intersecting Holographic Rings */}
          <motion.div 
            animate={{ rotateX: 360, rotateY: 180 }} 
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }} 
            className="absolute inset-0 border border-blue-400/40 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)]" 
            style={{ transformStyle: "preserve-3d" }}
          />
          <motion.div 
            animate={{ rotateY: 360, rotateZ: 180 }} 
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }} 
            className="absolute inset-0 border border-purple-400/40 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]" 
            style={{ transformStyle: "preserve-3d" }}
          />
          <motion.div 
            animate={{ rotateZ: 360, rotateX: 180 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
            className="absolute inset-0 border border-cyan-400/40 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
            style={{ transformStyle: "preserve-3d" }}
          />
        </div>

        {/* Orbits */}
        {orbits.map((orbit, index) => (
          <div
            key={`orbit-ring-${index}`}
            className="absolute rounded-full border border-white/[0.03]"
            style={{ width: orbit.radius, height: orbit.radius }}
          >
            {/* The rotating container for this specific orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {orbit.items.map((item, i) => {
                const angle = (i / orbit.items.length) * 360;
                return (
                  <div
                    key={`node-${i}`}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translateX(${orbit.radius / 2}px)`,
                    }}
                  >
                    {/* Counter-rotation to keep the text perfectly horizontal */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                      {/* Minimalist Tech Floating Text */}
                      <div className="flex items-center gap-3 cursor-default whitespace-nowrap group">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)] group-hover:scale-150 transition-transform duration-300" />
                        <span className="text-gray-400 text-xs md:text-sm font-bold tracking-[0.2em] group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300">
                          {item.name}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        ))}

        {/* Crosshair accents for premium tech feel */}
        <div className="absolute w-[1px] h-[900px] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none" />
        <div className="absolute h-[1px] w-[900px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />
        
      </div>
    </section>
  );
}
