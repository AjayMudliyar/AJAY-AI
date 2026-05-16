"use client";
import { motion } from "framer-motion";

export default function Achievements() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 200, scale: 0.95, filter: "blur(20px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="-mt-[100vh] min-h-screen py-32 md:py-48 bg-background relative z-30 flex flex-col items-center justify-center overflow-hidden border-t border-white/10 rounded-t-[3rem] shadow-[0_-30px_60px_rgba(0,0,0,0.8)]" 
      style={{ perspective: "1000px" }}
    >
      {/* Ambient glowing orbs */}
      <div className="absolute w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none opacity-50 mix-blend-screen" />
      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] top-20 left-1/4 pointer-events-none opacity-50 mix-blend-screen" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.6, rotateX: 30, y: 150 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} 
        className="relative z-10 text-center px-6 w-full transform-gpu"
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-8 px-6 py-2 border border-blue-400/40 rounded-full bg-blue-500/10 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
          <span className="text-blue-300 font-bold uppercase tracking-[0.3em] text-sm">Elite Competitor</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-200 to-purple-600 drop-shadow-2xl" 
          style={{ lineHeight: '1.1' }}
        >
          11X HACKATHON<br/>WINNER
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto mt-8 font-light leading-relaxed"
        >
          Proven ability to architect, build, and ship <strong className="text-white font-medium">award-winning AI products</strong> under extreme time pressure. I don't just write code; I execute relentlessly and build solutions that dominate.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
