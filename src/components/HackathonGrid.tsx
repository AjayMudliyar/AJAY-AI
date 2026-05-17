"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const hackathons = [
  { id: 1, name: "UAI Hawkation 2.0", track: "3rd Place", date: "MAR 2026", img: "/achievements/uai-hackathon.jpeg" },
  { id: 2, name: "Cognition 2026", track: "1st Runner Up's", date: "Sep 2025", img: "/achievements/vibe-coder.jpg" },
  { id: 3, name: "Innovations 2026", track: "1st Runner Up's", date: "Feb 2026", img: "/achievements/innovations.jpeg" },
  { id: 4, name: "Unthink 2026", track: "1st Runner Up's", date: "April 2026", img: "/achievements/unthink.jpeg" },
  { id: 5, name: "Prakalpa", track: "1st Consolation Winners", date: "April 2026", img: "/achievements/prakalpa_1st_consolation.jpeg" },
  { id: 6, name: "THE MERGE HACKATHON", track: "4th place", date: "Feb 2026", img: "/achievements/healthtech.jpg" },
  { id: 7, name: "Startup Med Hackathon", track: "1st Scalability", date: "Nov 2022", img: "/achievements/cloud-native.jpg" },
  { id: 8, name: "Futhering the Future Hackathon", track: "Community Award", date: "Sep 2022", img: "/achievements/opensource.jpg" },
  { id: 9, name: "Vibe Coder Hackathon", track: "Best EdTech", date: "Jul 2022", img: "/achievements/edutech.jpg" },
];

function TiltCard({ hackathon, index }: { hackathon: any, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, type: "spring", bounce: 0.4 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[400px] w-full rounded-3xl overflow-hidden group cursor-crosshair perspective-[1000px]"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-125"
        style={{ backgroundImage: `url(${hackathon.img})`, translateZ: -50 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Dynamic Glow Overlay */}
      <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

      <motion.div
        className="absolute inset-0 p-8 flex flex-col justify-end"
        style={{ translateZ: 50 }}
      >
        <span className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
          {hackathon.date}
        </span>
        <h3 className="text-3xl font-black text-white mb-2 leading-tight drop-shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          {hackathon.name}
        </h3>
        <div className="w-0 h-1 bg-blue-500 mb-4 group-hover:w-full transition-all duration-700 ease-out" />
        <p className="text-gray-300 font-medium text-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
          {hackathon.track}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function HackathonGrid() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="py-40 bg-black relative z-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <div className="inline-block mb-6 px-8 py-2 border border-blue-500/30 rounded-full bg-blue-500/10 backdrop-blur-xl">
            <span className="text-blue-300 font-black uppercase tracking-[0.4em] text-sm">Achievements</span>
          </div>
          <h2 className="text-7xl md:text-[10rem] font-black text-white uppercase tracking-tighter drop-shadow-2xl leading-none mix-blend-overlay opacity-90">
            Hall of Fame
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-[2000px]">
          {hackathons.map((hackathon, index) => (
            <TiltCard key={hackathon.id} hackathon={hackathon} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
