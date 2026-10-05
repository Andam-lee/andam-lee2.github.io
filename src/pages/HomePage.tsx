import React, { useEffect, useState } from "react";
import SlotMachine from "../SlotMachine";

const HERO_IMAGES = [
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/1150e1103120fd58129c9a7c6355610984ba69be/O20251110_ADEX_Print_2.jpg",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/1150e1103120fd58129c9a7c6355610984ba69be/O20251110_SPR_LJM-36.jpg",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/1150e1103120fd58129c9a7c6355610984ba69be/IMG_0045.JPG",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/50761e295328a683de187fd0c6995edb0d317e45/O20251110_ADEX_Print-4.jpg",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/50761e295328a683de187fd0c6995edb0d317e45/R20250810_4_R.jpg",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/50761e295328a683de187fd0c6995edb0d317e45/R20251115_CAF-14.jpg",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/50761e295328a683de187fd0c6995edb0d317e45/R20251122_DBW-8.jpg",
  "https://raw.githubusercontent.com/Andam-lee/Andam-lee.github.io/50761e295328a683de187fd0c6995edb0d317e45/R20260101_BSG-6.jpg",
];

function BackgroundSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((curr) => {
        setPrevSlide(curr);
        return (curr + 1) % HERO_IMAGES.length;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (prevSlide === null) return;
    const timeout = setTimeout(() => {
      setPrevSlide(null);
    }, 1300);
    return () => clearTimeout(timeout);
  }, [currentSlide, prevSlide]);

  return (
    <div className="hero-bg" role="img" aria-label="Editorial hero slideshow">
      {HERO_IMAGES.map((url, index) => {
        const isActive = index === currentSlide;
        const isPrev = index === prevSlide;

        return (
          <div
            key={url}
            className={`hero-slide ${isActive ? "is-active" : ""} ${isPrev ? "is-prev" : ""}`}
            style={{
              backgroundImage: `url('${url}')`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function HomePage() {
  return (
    <section className="hero" aria-label="Editorial hero">
      <BackgroundSlideshow />
      <div className="hero-center">
        <SlotMachine />
      </div>
    </section>
  );
}
