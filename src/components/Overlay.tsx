"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Section 1: 0% scroll
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const x1 = useTransform(scrollYProgress, [0, 0.2], ["0vw", "-20vw"]); // Moves left as you scroll

  // Section 2: 30% scroll
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.4], [50, -50]);

  // Section 3: 60% scroll
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none text-white overflow-hidden">
      <motion.div 
        style={{ opacity: opacity1, y: y1, x: x1 }}
        className="absolute inset-0 flex items-center justify-end text-right px-12 md:px-32"
      >
        <div className="flex flex-col items-end">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-2xl">
            Ajay Mudliyar.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 drop-shadow-lg">
            AI & Machine Learning Engineer.
          </p>
          <a 
            href="https://www.linkedin.com/in/ajay-mudliyar-342604281" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 pointer-events-auto flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </motion.div>

      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex items-center justify-start px-12 md:px-24"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl">
          I build intelligent systems.
        </h2>
      </motion.div>

      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex items-center justify-end px-12 md:px-24 text-right"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl">
          Bridging data science and scalable engineering.
        </h2>
      </motion.div>
    </div>
  );
}
