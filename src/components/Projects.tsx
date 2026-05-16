"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "SAKSHAM AI Platform",
    category: "Full-Stack AI Application",
    description: "A Next.js based platform for intelligent mock interviews and candidate assessment.",
  },
  {
    id: 2,
    title: "OmniDimension Voice Agent",
    category: "Conversational AI",
    description: "Real-time AI voice interviewer capable of dynamic questioning and role-play scenarios.",
  },
  {
    id: 3,
    title: "PrepWise Resume Analyzer",
    category: "NLP / Data Science",
    description: "Automated PDF resume assessment system utilizing advanced language models to generate a quality score.",
  },
  {
    id: 4,
    title: "Agora RTC Integration",
    category: "Real-Time Communication",
    description: "Custom, low-latency WebRTC interface orchestrated with live AI agent transcription.",
  }
];

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  // Insane asymmetrical scrolling! Left column moves up, right column moves down relative to scroll.
  const yLeft = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <motion.section 
      ref={containerRef} 
      initial={{ opacity: 0, y: 150, scale: 0.95, filter: "blur(20px)", rotateX: -5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotateX: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-background py-32 px-6 md:px-12 z-20 text-white border-t border-white/5 pb-64 overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Ambient background glow - changed to subtle cool gray/blue */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -100, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="mb-40 flex flex-col items-center text-center"
        >
          <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Selected Work
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl font-black tracking-[0.3em] uppercase">
            Architected for scale. Designed to dominate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              style={{ y: index % 2 === 0 ? yLeft : yRight }}
              initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="glass-card group flex flex-col justify-end min-h-[450px] relative overflow-hidden rounded-[3rem] border border-white/5 bg-black/40 backdrop-blur-2xl hover:border-white/20 transition-all duration-700 hover:shadow-[0_0_60px_rgba(255,255,255,0.05)] transform-gpu"
            >
              {/* Sleek monochrome background gradient inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />
              
              <div className="relative z-10 p-12 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-xs font-black text-gray-400 mb-4 uppercase tracking-[0.4em]">{project.category}</p>
                <h3 className="text-4xl font-black mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Glowing inner border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-[3rem] transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
