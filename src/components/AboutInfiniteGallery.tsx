import React from "react";
import { motion } from "framer-motion";

const GALLERY_IMAGES = [
  "https://cdn.jsdelivr.net/gh/Andam-lee/Lee-Jeong-min-GitHub-Upload@main/portfolio/IMG_76251.jpg",
  "https://cdn.jsdelivr.net/gh/Andam-lee/Lee-Jeong-min-GitHub-Upload@main/portfolio/Screenshot_20250812_024751_YouTube.jpg",
  "https://cdn.jsdelivr.net/gh/Andam-lee/Lee-Jeong-min-GitHub-Upload@main/portfolio/1786497942397.jpg",
  "https://cdn.jsdelivr.net/gh/Andam-lee/Lee-Jeong-min-GitHub-Upload@main/portfolio/1765520908528.jpg",
  "https://cdn.jsdelivr.net/gh/Andam-lee/Lee-Jeong-min-GitHub-Upload@main/portfolio/1758998063420.jpg",
  "https://cdn.jsdelivr.net/gh/Andam-lee/Lee-Jeong-min-GitHub-Upload@main/portfolio/20251129_101045.jpg",
];

// Duplicate 3 times to ensure a seamless infinite conveyor belt loop
const DISPLAY_IMAGES = [
  ...GALLERY_IMAGES,
  ...GALLERY_IMAGES,
  ...GALLERY_IMAGES,
];

export default function AboutInfiniteGallery() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-full overflow-hidden mt-14 sm:mt-20 mb-12 select-none"
    >
      {/* Side gradient overlays for soft edge falloff */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-[#0b1013] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-[#0b1013] to-transparent z-10" />

      {/* Infinite scrolling track from right to left */}
      <motion.div
        className="flex gap-3.5 sm:gap-5 w-max"
        animate={{ x: ["0%", "-33.333333%"] }}
        transition={{
          ease: "linear",
          duration: 36,
          repeat: Infinity,
        }}
      >
        {DISPLAY_IMAGES.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="h-[165px] sm:h-[205px] md:h-[235px] w-auto shrink-0 rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-xl transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src={src}
              alt={`Photojournalist documentation ${index + 1}`}
              loading="lazy"
              className="h-full w-auto max-w-none object-cover select-none pointer-events-none block"
            />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
