"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    id: 1,
    role: "Data Science & ML Intern",
    company: "YBI Foundation",
    period: "1 Jan - 1 March",
    description: "Designed and built an advanced invoice intelligence system leveraging machine learning to automate data extraction and processing at scale.",
    color: "from-emerald-400 to-teal-500",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    border: "group-hover:border-emerald-500/50"
  },
  {
    id: 2,
    role: "AI Engineer Intern",
    company: "UNIVITT AI TECHNOLOGIES",
    period: "25 May - 25 Aug",
    description: "Architected and developed next-generation AI-based projects, focusing on robust model deployment and intelligent agent design to solve complex technical challenges.",
    color: "from-blue-400 to-indigo-500",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    border: "group-hover:border-blue-500/50"
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  
  // Track scroll for the glowing line indicator
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start center", "end center"] 
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-40 bg-black relative z-20 overflow-hidden">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="mb-32 text-center">
          <h2 className="text-6xl md:text-[8rem] font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">
            Experience
          </h2>
          <p className="text-gray-500 tracking-[0.3em] uppercase mt-6 text-xl">The Professional Journey</p>
        </div>

        <div className="relative">
          
          {/* The Track Line (Background) */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2 rounded-full" />
          
          {/* The Glowing Active Line */}
          <motion.div 
            style={{ height: lineHeight }} 
            className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-white md:-translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(255,255,255,1)] origin-top" 
          />

          <div className="space-y-24 md:space-y-48">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={exp.id} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? "md:justify-start" : "md:justify-end"}`}>
                  
                  {/* Glowing Node on the line */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }} 
                    whileInView={{ scale: 1, opacity: 1 }} 
                    viewport={{ once: true, margin: "-200px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute left-[10px] md:left-1/2 w-6 h-6 rounded-full bg-black border-[3px] border-white md:-translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                  >
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </motion.div>

                  {/* Experience Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-200px" }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className={`w-full pl-16 md:pl-0 md:w-[45%] ${isEven ? "md:pr-16" : "md:pl-16"}`}
                  >
                    <div className={`group relative p-10 rounded-[2rem] bg-neutral-950/80 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${exp.border} ${exp.glow}`}>
                      
                      {/* Hover Gradient Reveal */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-[2rem]`} />
                      
                      <span className="text-white/60 font-bold uppercase tracking-widest text-sm mb-4 block">
                        {exp.period}
                      </span>
                      <h3 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                        {exp.role}
                      </h3>
                      <h4 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${exp.color} mb-6 uppercase tracking-wider`}>
                        {exp.company}
                      </h4>
                      <p className="text-lg text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
