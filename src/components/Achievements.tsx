"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Achievements() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Phase 0: Title fades out
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [1, 2]);

  // Phase 1: Data Scientist
  const dataOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const dataScale = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0.5, 1, 1.2, 2]);
  const dataY = useTransform(scrollYProgress, [0.15, 0.45], [100, -100]);

  // Phase 2: 11X Hackathon Winner
  const hackOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
  const hackScale = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [0.5, 1, 1.2, 2]);
  const hackY = useTransform(scrollYProgress, [0.45, 0.75], [100, -100]);

  // Phase 3: AI Engineer
  const aiOpacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const aiScale = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0.5, 1, 1.2, 2]);
  const aiY = useTransform(scrollYProgress, [0.75, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background -mt-[100vh] z-30">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden border-t border-white/10 rounded-t-[3rem] bg-black shadow-[0_-30px_60px_rgba(0,0,0,1)]">
        
        {/* Dynamic Glowing Backgrounds to prevent pure black screen */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0.8]) }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.2)_0%,transparent_70%)] pointer-events-none"
        />

        {/* Intro Title */}
        <motion.div style={{ opacity: titleOpacity, scale: titleScale }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h2 className="text-6xl md:text-[10rem] leading-none font-black text-white tracking-tighter drop-shadow-2xl">
            WHO AM I?
          </h2>
        </motion.div>

        {/* Kinetic Text 1: Data Scientist */}
        <motion.div style={{ opacity: dataOpacity, scale: dataScale, y: dataY }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none w-full px-4">
          <h2 className="text-5xl md:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-blue-700 tracking-tighter uppercase text-center leading-tight drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Data Scientist
          </h2>
          <p className="text-white/70 text-xl md:text-3xl mt-4 font-light tracking-widest uppercase">Architecting Intelligence</p>
        </motion.div>

        {/* Kinetic Text 2: 11X Hackathon Winner */}
        <motion.div style={{ opacity: hackOpacity, scale: hackScale, y: hackY }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none w-full px-4">
          <h2 className="text-5xl md:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-500 to-red-500 tracking-tighter uppercase text-center leading-tight drop-shadow-[0_0_50px_rgba(245,158,11,0.4)]">
            11X Hackathon<br/>Winner
          </h2>
          <p className="text-white/70 text-xl md:text-3xl mt-4 font-light tracking-widest uppercase">Proven Under Pressure</p>
        </motion.div>

        {/* Kinetic Text 3: AI Engineer */}
        <motion.div style={{ opacity: aiOpacity, scale: aiScale, y: aiY }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none w-full px-4">
          <h2 className="text-5xl md:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-tighter uppercase text-center leading-tight drop-shadow-[0_0_40px_rgba(219,39,119,0.5)]">
            AI Engineer
          </h2>
          <p className="text-white/70 text-xl md:text-3xl mt-4 font-light tracking-widest uppercase">Building Next-Gen Agents</p>
        </motion.div>

      </div>
    </section>
  );
}
