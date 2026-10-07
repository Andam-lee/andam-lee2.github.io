import React, { useEffect, useState, useCallback } from "react";
import SlotMachine from "../SlotMachine";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_IMAGES = [
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/1150e1103120fd58129c9a7c6355610984ba69be/O20251110_ADEX_Print_2.jpg",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/1150e1103120fd58129c9a7c6355610984ba69be/O20251110_SPR_LJM-36.jpg",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/1150e1103120fd58129c9a7c6355610984ba69be/IMG_0045.JPG",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/50761e295328a683de187fd0c6995edb0d317e45/O20251110_ADEX_Print-4.jpg",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/50761e295328a683de187fd0c6995edb0d317e45/R20250810_4_R.jpg",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/50761e295328a683de187fd0c6995edb0d317e45/R20251115_CAF-14.jpg",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/50761e295328a683de187fd0c6995edb0d317e45/R20251122_DBW-8.jpg",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/50761e295328a683de187fd0c6995edb0d317e45/R20260101_BSG-6.jpg",
  "https://cdn.jsdelivr.net/gh/Andam-lee/Lee-Jeong-min-GitHub-Upload@main/portfolio/IMG_0168.JPG",
  "https://cdn.jsdelivr.net/gh/Andam-lee/Lee-Jeong-min-GitHub-Upload@main/portfolio/20250502-1.jpg",
  "https://cdn.jsdelivr.net/gh/Andam-lee/Lee-Jeong-min-GitHub-Upload@main/portfolio/20250715_r_5.jpg",
  "https://cdn.jsdelivr.net/gh/Andam-lee/Lee-Jeong-min-GitHub-Upload@main/portfolio/20250621_R_6.jpg",
  "https://cdn.jsdelivr.net/gh/Andam-lee/Lee-Jeong-min-GitHub-Upload@main/portfolio/20250429-2.jpg",
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);

  const goToSlide = useCallback(
    (nextIndex: number) => {
      setPrevSlide(currentSlide);
      setCurrentSlide(nextIndex);
    },
    [currentSlide]
  );

  const handlePrev = useCallback(() => {
    goToSlide((currentSlide - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  }, [currentSlide, goToSlide]);

  const handleNext = useCallback(() => {
    goToSlide((currentSlide + 1) % HERO_IMAGES.length);
  }, [currentSlide, goToSlide]);

  // Auto-advance timer (5s)
  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((currentSlide + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, goToSlide]);

  // Clear prevSlide after the 0.4s fade transition finishes
  useEffect(() => {
    if (prevSlide === null) return;
    const timeout = setTimeout(() => {
      setPrevSlide(null);
    }, 400);
    return () => clearTimeout(timeout);
  }, [currentSlide, prevSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section className="hero" aria-label="Editorial hero">
      {/* Background Slideshow with 0.4s fade */}
      <div className="hero-bg" role="img" aria-label="Editorial hero slideshow">
        {HERO_IMAGES.map((url, index) => {
          const isActive = index === currentSlide;
          const isPrev = index === prevSlide;

          return (
            <div
              key={url}
              className={`hero-slide ${isActive ? "is-active" : ""} ${
                isPrev ? "is-prev" : ""
              }`}
              style={{
                backgroundImage: `url('${url}')`,
                transitionDuration: "0.4s",
                transitionTimingFunction: "ease",
              }}
            />
          );
        })}
      </div>

      {/* Left Chevron Button */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="이전 사진 보기"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-4 sm:p-6 text-white/25 hover:text-white/80 transition-all duration-500 cursor-pointer select-none focus:outline-none group"
      >
        <ChevronLeft
          className="w-8 h-8 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:-translate-x-1"
          strokeWidth={0.8}
        />
      </button>

      {/* Right Chevron Button */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="다음 사진 보기"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-4 sm:p-6 text-white/25 hover:text-white/80 transition-all duration-500 cursor-pointer select-none focus:outline-none group"
      >
        <ChevronRight
          className="w-8 h-8 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={0.8}
        />
      </button>

      {/* Hero Center Text */}
      <div className="hero-center">
        <SlotMachine />
      </div>
    </section>
  );
}
