import React, { useState, useCallback } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import KineticTextGrid from "../components/KineticTextGrid";
import EditableText from "../components/EditableText";

export default function AboutMePage() {
  const [showScrollDown, setShowScrollDown] = useState(false);

  // Called when the main kinetic text effect has completely finished and settled
  const handleAnimationComplete = useCallback(() => {
    // Brief deliberate pause (300ms) after main text settles, then fade in Scroll down over 0.5s
    setTimeout(() => {
      setShowScrollDown(true);
    }, 300);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1013] text-white pt-24 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto flex flex-col">
      {/* Top navigation bar inside page */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-4">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Home</span>
        </a>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40">
          <span>About Me</span>
          <span>/</span>
          <span className="text-white/80">Profile</span>
        </div>
      </div>

      {/* 1. Main Hero Kinetic Canvas */}
      <section className="relative w-full h-[calc(100vh-180px)] min-h-[520px] flex items-center justify-center overflow-hidden">
        {/* Kinetic Text Grid: runs once on enter, settles into single centered 'Lee Jeong-min' text */}
        <KineticTextGrid onComplete={handleAnimationComplete} />

        {/* Scroll down text & icon: fades in 0.5s after the main text animation ends, then stays visible */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none transition-all duration-500 ease-out ${
            showScrollDown
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
          style={{
            transitionDuration: "500ms",
            transitionProperty: "opacity, transform",
          }}
        >
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-white/50 font-light">
            Scroll down
          </span>
          <ChevronDown
            className="w-4 h-4 text-white/40 animate-bounce"
            strokeWidth={1.5}
          />
        </div>
      </section>

      {/* 2. Scroll-Down Bio Section (Generous length with staged staggered reveal) */}
      <section className="w-full min-h-[140vh] pt-36 pb-64 flex flex-col justify-start">
        <div className="max-w-3xl text-left space-y-4">
          {/* Main Title: Pop-up 1 */}
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
          >
            <EditableText
              id="about_bio_name"
              defaultText="Lee Jeong-min"
              section="aboutme"
              as="span"
            />
          </motion.h2>

          {/* Subtitle: Pop-up 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.35,
            }}
            className="flex items-center gap-3 pt-1 pb-6"
          >
            <span className="w-[3px] h-5 bg-white/70 inline-block shrink-0" />
            <p className="text-lg sm:text-xl text-neutral-300 font-medium">
              <EditableText
                id="about_bio_role"
                defaultText="Photojournalist"
                section="aboutme"
                as="span"
              />
            </p>
          </motion.div>

          {/* Body Content: Pop-up 3 */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.65,
            }}
            className="space-y-6 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal pt-2"
          >
            <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
              <EditableText
                id="about_bio_p1"
                defaultText="I am Lee Jeong-min, a freelance photojournalist based in South Korea."
                section="aboutme"
                as="span"
              />
            </p>

            <p className="leading-relaxed text-neutral-300">
              <EditableText
                id="about_bio_p2"
                defaultText={`My journey with photography began in middle school, sparked by a documentary that inspired an immediate resolve: "I want to capture images like that." Within just a year of picking up the camera, my work earned recognition through national photo contests and television appearances, eventually leading to a contributor contract with Getty Images to supply editorial stock photography. I went on to pursue a formal degree in photography, and today, I work actively on the ground as an independent photojournalist.`}
                section="aboutme"
                multiline={true}
                as="span"
              />
            </p>

            <p className="leading-relaxed text-neutral-300">
              <EditableText
                id="about_bio_p3"
                defaultText={`To me, photojournalism goes far beyond simply visiting a scene to report on it. It is the vital act of capturing the raw vitality of a moment to document history without distortion. The world learned of state brutality and media censorship under South Korea’s past military regimes solely because journalists risked their lives to preserve their rolls of film—the untampered visual truth of history. Guided by that legacy, I dedicate myself to the core ethos of journalism: a steadfast commitment to bearing witness and capturing the truth without compromise.`}
                section="aboutme"
                multiline={true}
                as="span"
              />
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
