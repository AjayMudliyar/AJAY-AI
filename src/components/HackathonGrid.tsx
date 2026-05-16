"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const hackathons = [
  { id: 1, name: "UAI Hawkation 2.0", track: "3rd Place", date: "MAR 2026" },
  { id: 2, name: "Vibe Coder Hackathon", track: "Best Use Of AI", date: "MAR 2026" },
  { id: 3, name: "THE MERGE HACKATHON", track: "4th place", date: "Feb 2026" },
  { id: 4, name: "FinTech Innovation Hack", track: "1st Place Overall", date: "May 2023" },
  { id: 5, name: "HackTheFuture", track: "Best Use of LLMs", date: "Mar 2023" },
  { id: 6, name: "HealthTech AI Challenge", track: "Runner Up", date: "Jan 2023" },
  { id: 7, name: "Cloud Native Hackathon", track: "1st Place - Scalability", date: "Nov 2022" },
  { id: 8, name: "Open Source AI Hack", track: "Community Choice Award", date: "Sep 2022" },
  { id: 9, name: "EduTech Codefest", track: "Best EdTech Solution", date: "Jul 2022" },
  { id: 10, name: "Smart City Hackathon", track: "1st Place - Computer Vision", date: "May 2022" },
  { id: 11, name: "University AI Challenge", track: "Grand Champion", date: "Feb 2022" },
];

export default function HackathonGrid() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <motion.section 
      ref={containerRef} 
      initial={{ opacity: 0, y: 150, scale: 0.95, filter: "blur(20px)", rotateX: -5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotateX: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="py-32 bg-background relative z-20 border-t border-white/5 overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Background grid lines for futuristic look */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      {/* Neon glow in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)", scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="mb-24 text-center"
        >
          <h2 className="text-5xl md:text-8xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-600 uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            The Hall of Fame
          </h2>
          <p className="text-blue-400 text-xl max-w-2xl mx-auto font-black tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            11 Hackathons. 11 Victories. Total Domination.
          </p>
        </motion.div>

        <motion.div style={{ y: yParallax, perspective: "1500px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, rotateX: 45, y: 100, scale: 0.8, z: -100 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1, z: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.15, type: "spring", bounce: 0.4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl hover:border-blue-500/80 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-500 transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-full h-40 mb-6 rounded-xl overflow-hidden relative bg-black/50 border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 transition-colors duration-500">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                <motion.div className="w-16 h-16 rounded-full bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center group-hover:scale-125 group-hover:bg-blue-500/30 transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <svg className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
              </div>

              <div className="relative z-10">
                <span className="text-xs font-black text-purple-400 uppercase tracking-widest">{hackathon.date}</span>
                <h3 className="text-2xl font-black text-white mt-2 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                  {hackathon.name}
                </h3>
                <p className="text-gray-400 font-light">{hackathon.track}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
