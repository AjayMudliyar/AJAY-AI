import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import CustomCursor from "@/components/CustomCursor";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import HackathonGrid from "@/components/HackathonGrid";
import Experience from "@/components/Experience";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <main className="relative bg-background cursor-none">
      <CustomCursor />
      <AudioPlayer />
      <ScrollyCanvas />
      <Achievements />
      <Experience />
      <HackathonGrid />
      <Skills />
      <Projects />
    </main>
  );
}
