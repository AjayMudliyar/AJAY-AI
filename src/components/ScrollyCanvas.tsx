"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent, useTransform, motion, AnimatePresence } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 66;

const currentFrame = (index: number) =>
  `/ezgif-split/frame_${index.toString().padStart(2, "0")}_delay-0.076s.png`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const renderFrame = useCallback((index: number) => {
    const images = imagesRef.current;
    if (!canvasRef.current || !images[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const img = images[index];
    if (!img.width || !img.height) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let renderWidth, renderHeight, x, y;

    if (canvasRatio > imgRatio) {
      renderWidth = canvas.width;
      renderHeight = canvas.width / imgRatio;
      x = 0;
      y = (canvas.height - renderHeight) / 2;
    } else {
      renderWidth = canvas.height * imgRatio;
      renderHeight = canvas.height;
      x = (canvas.width - renderWidth) / 2;
      y = 0;
    }

    ctx.drawImage(img, x, y, renderWidth, renderHeight);
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = loadedImages;
          setIsReadyToEnter(true);
        }
      };
      loadedImages.push(img);
    }
    
    const handleResize = () => {
      if (!isLoaded) return;
      const currentProgress = scrollYProgress.get();
      // Finish photo animation at 0.8 (400vh) because the last 100vh is overlapped by the next section
      const adjustedProgress = Math.min(currentProgress / 0.8, 1);
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(adjustedProgress * (FRAME_COUNT - 1)));
      renderFrame(frameIndex);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame, isLoaded, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded) return;
    const maxIndex = FRAME_COUNT - 1;
    // Finish photo animation at 0.8 (400vh)
    const adjustedProgress = Math.min(latest / 0.8, 1);
    const frameIndex = Math.min(maxIndex, Math.floor(adjustedProgress * maxIndex));
    
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        
        <AnimatePresence>
          {!isLoaded && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background"
            >
              <div className="relative w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-8 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                  style={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              
              <div className="flex flex-col items-center">
                {!isReadyToEnter ? (
                  <>
                    <span className="text-blue-400 font-black tracking-[0.5em] text-xs uppercase mb-2">Initializing Neural Link</span>
                    <span className="text-white text-5xl font-black">{Math.round(loadingProgress)}%</span>
                  </>
                ) : (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                       setIsLoaded(true);
                       window.dispatchEvent(new Event('start-audio'));
                       setTimeout(() => { requestAnimationFrame(() => renderFrame(0)); }, 100);
                    }}
                    className="px-12 py-5 bg-white/10 border border-white/20 rounded-full text-white font-black tracking-[0.3em] uppercase backdrop-blur-md transition-shadow shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] pointer-events-auto"
                  >
                    Enter Experience
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full h-full relative">
          <canvas ref={canvasRef} className="w-full h-full block object-cover will-change-[transform,opacity]" style={{ imageRendering: 'auto' }} />
        </div>

        {isLoaded && <Overlay scrollYProgress={scrollYProgress} />}

        {/* Bottom seamless gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
      </div>
    </div>
  );
}
