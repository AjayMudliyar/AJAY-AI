"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const skillsLine1 = [
  "Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "NumPy",
  "Keras", "OpenCV", "HuggingFace", "LangChain", "OpenAI API", "CUDA"
];

const skillsLine2 = [
  "Docker", "Kubernetes", "AWS SageMaker", "MLflow", "Apache Spark", "Databricks",
  "SQL", "NoSQL", "FastAPI", "GCP", "Azure ML", "Vector Databases"
];

// Explicit tailwind class list to prevent purging
const _colors = [
  "hover:border-blue-500/80 hover:shadow-blue-500/20 bg-blue-500/10 border-blue-500/20 text-blue-500",
  "hover:border-purple-500/80 hover:shadow-purple-500/20 bg-purple-500/10 border-purple-500/20 text-purple-500",
  "hover:border-pink-500/80 hover:shadow-pink-500/20 bg-pink-500/10 border-pink-500/20 text-pink-500"
];

export default function Skills() {
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
      className="py-32 overflow-hidden bg-background relative z-20 border-t border-white/5"
      style={{ perspective: "1500px" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
      
      <motion.h2 
        initial={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring" }}
        className="text-center text-5xl md:text-7xl font-black mb-16 tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      >
        Technical Arsenal
      </motion.h2>

      {/* Marquee 1: Left */}
      <div className="relative flex overflow-x-hidden group whitespace-nowrap mb-8">
        <motion.div 
          className="flex space-x-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
        >
          {[...skillsLine1, ...skillsLine1, ...skillsLine1].map((skill, idx) => (
            <span key={idx} className="text-5xl md:text-8xl font-black text-transparent bg-clip-text hover:text-white transition-all duration-300 drop-shadow-xl" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)'}}>
              {skill}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Marquee 2: Right */}
      <div className="relative flex overflow-x-hidden mt-6 group whitespace-nowrap">
        <motion.div 
          className="flex space-x-8"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
        >
          {[...skillsLine2, ...skillsLine2, ...skillsLine2].map((skill, idx) => (
            <span key={idx} className="text-5xl md:text-8xl font-black text-transparent bg-clip-text hover:text-blue-500 transition-all duration-300 drop-shadow-xl" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)'}}>
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
      
      {/* Skill Cards with 3D Flip */}
      <motion.div style={{ y: yParallax, perspective: "1500px" }} className="max-w-7xl mx-auto mt-32 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {[
          { icon: "🧠", title: "Machine Learning", color: "blue", desc: "Designing, training, and deploying deep learning models using PyTorch and TensorFlow." },
          { icon: "📊", title: "Data Science & MLOps", color: "purple", desc: "End-to-end data pipelines, predictive analytics, and massive-scale data processing using Pandas & Spark." },
          { icon: "🤖", title: "AI & NLP Engineering", color: "pink", desc: "Building next-generation generative AI apps utilizing LLMs, LangChain, and RAG architectures." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, rotateY: 90, z: -500, scale: 0.8 }} 
            whileInView={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 1, type: "spring", bounce: 0.4, delay: i * 0.2 }}
            className={`glass-card p-10 rounded-3xl border border-white/10 hover:border-${item.color}-500/80 hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:shadow-${item.color}-500/20 bg-black/50 backdrop-blur-3xl transition-all duration-500 transform-gpu group`}
          >
            <div className={`w-20 h-20 rounded-full bg-${item.color}-500/10 border border-${item.color}-500/30 flex items-center justify-center mb-8 group-hover:scale-125 transition-transform duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)]`}>
              <span className="text-4xl">{item.icon}</span>
            </div>
            <h3 className="text-2xl font-black mb-4 text-white tracking-tight">{item.title}</h3>
            <p className="text-base text-gray-400 font-light leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
