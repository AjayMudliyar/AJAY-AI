"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
      setHasInteracted(true);
    }
  };

  useEffect(() => {
    // Attempt auto-play (browsers will likely block this until user interacts, but we try)
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Slightly lower volume for background
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, []);

  // Listen for the custom "start-audio" event from the Enter button
  useEffect(() => {
    const handleStartAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(e => console.log("Audio play failed:", e));
      }
    };

    window.addEventListener('start-audio', handleStartAudio);
    return () => window.removeEventListener('start-audio', handleStartAudio);
  }, [isPlaying]);

  // Handle Tab Switching (Pause audio when leaving the page)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      
      if (document.hidden) {
        // Tab is hidden, pause the audio but keep the isPlaying state active
        audioRef.current.pause();
      } else {
        // Tab is active again, resume playing if it was active
        if (isPlaying) {
          audioRef.current.play().catch(e => console.log("Audio resume failed:", e));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} src="/bg-audio.mp3" loop />
      <motion.button
        onClick={togglePlay}
        className={`fixed bottom-8 right-8 z-[9999] w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white pointer-events-auto hover:bg-white/20 transition-all duration-300 ${isPlaying ? 'shadow-[0_0_20px_rgba(59,130,246,0.5)]' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {/* Sound Waves Animation if playing */}
        {isPlaying ? (
          <div className="flex items-end justify-center space-x-1 h-5 w-5">
            <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-white rounded-full"></motion.div>
            <motion.div animate={{ height: ["70%", "30%", "70%"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white rounded-full"></motion.div>
            <motion.div animate={{ height: ["100%", "50%", "100%"] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-white rounded-full"></motion.div>
          </div>
        ) : (
          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
        
        {/* Prompt pulse if hasn't interacted */}
        {!hasInteracted && !isPlaying && (
          <motion.div 
            className="absolute inset-0 rounded-full border border-blue-400"
            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </motion.button>
    </>
  );
}
