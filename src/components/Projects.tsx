"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "SAKSHAM.AI",
    category: "Full-Stack AI Application",
    description: "Intelligent mock interview platform providing automated candidate assessment and real-time feedback with AI voice agents.",
    color: "from-blue-600 to-cyan-400",
    bgText: "SAKSHAM"
  },
  {
    id: 2,
    title: "AAROGYA.AI",
    category: "Healthcare AI",
    description: "Advanced predictive models for early disease detection, streamlining diagnostic workflows in medical systems.",
    color: "from-emerald-600 to-teal-400",
    bgText: "AAROGYA"
  },
  {
    id: 3,
    title: "NEURASH.AI",
    category: "LLM Infrastructure",
    description: "Scalable large language model infrastructure tailored for high-performance enterprise data processing.",
    color: "from-purple-600 to-pink-500",
    bgText: "NEURASH"
  },
  {
    id: 4,
    title: "INVYY.AI",
    category: "Conversational AI",
    description: "Next-generation sales and support AI agents capable of dynamic negotiation and complex problem resolution.",
    color: "from-orange-600 to-rose-500",
    bgText: "INVYY"
  }
];

export default function Projects() {
  const containerRef = useRef(null);
  // 4 panels = 3 scroll transitions. We set height to 400vh to give 100vh per panel.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // Transform scroll progress to X translation
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center">
        
        {/* Intro text overlaid on the left */}
        <div className="absolute top-12 left-12 md:top-24 md:left-24 z-50 mix-blend-difference pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Selected Works</h2>
          <p className="text-gray-400 tracking-[0.3em] uppercase mt-2 text-sm md:text-base font-bold">Scroll to explore</p>
        </div>

        <motion.div 
          style={{ x: xTransform }} 
          className="flex h-full w-[400vw]"
        >
          {projects.map((project, index) => (
            <div key={project.id} className="relative w-[100vw] h-full flex items-center justify-center overflow-hidden flex-shrink-0">
              
              {/* Massive background typography */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
                <h1 className="text-[25vw] font-black text-transparent uppercase tracking-tighter" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.5)' }}>
                  {project.bgText}
                </h1>
              </div>

              {/* Dynamic Abstract Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 mix-blend-screen`} />
              
              {/* Radial gradient vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

              {/* Main Content Box */}
              <div className="relative z-10 flex flex-col items-start justify-center max-w-6xl px-8 w-full gap-6 md:gap-8 mt-12">
                <div className="flex items-center gap-4">
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color} animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.8)]`} />
                  <p className="text-sm md:text-lg font-black text-gray-300 uppercase tracking-[0.5em]">{project.category}</p>
                </div>
                
                <h3 className={`text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${project.color} drop-shadow-2xl leading-tight tracking-tighter pb-2`}>
                  {project.title}
                </h3>
                
                <p className="text-2xl md:text-3xl text-gray-200 font-light leading-relaxed max-w-4xl border-l-4 border-white/20 pl-8">
                  {project.description}
                </p>
                
                <button className="mt-8 group relative px-10 py-5 border border-white/20 rounded-full overflow-hidden bg-white/5 backdrop-blur-md">
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <span className="relative z-10 flex items-center gap-4 text-lg font-bold uppercase tracking-widest text-white transition-colors">
                    Explore Details
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </button>
              </div>

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
