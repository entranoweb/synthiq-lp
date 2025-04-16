"use client";

import { ActionButton } from "./action-button";
import BackgroundStars from "@/assets/stars.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start end`, "end start"],
  });
  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  return (
    <motion.section
      animate={{ backgroundPositionX: BackgroundStars.width }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      className="h-[492px] md:h-[800px] flex items-center overflow-hidden relative bg-cover bg-no-repeat bg-center [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      style={{
        backgroundImage: `url(${BackgroundStars.src})`,
        backgroundPositionY,
      }}
      ref={sectionRef}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgba(22,98,212,0.5)_15%,rgba(0,36,66,0.5)_78%,transparent)]" />

      {/* Planet */}
      <div className="absolute size-48 sm:size-64 md:size-96 bg-[#1662D4] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgba(22,98,212,0.7)_37.7%,rgba(0,24,66))] shadow-[-20px_-20px_50px_rgba(255,255,255,0.5),-20px_-20px_80px_rgba(255,255,255,0.1),0_0_50px_#1662D4]" />

      {/* Rings */}
      <motion.div
        style={{ translateY: "-50%", translateX: "-50%" }}
        animate={{ rotate: "1turn" }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute size-[200px] sm:size-[344px] md:size-[580px] border border-white opacity-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute size-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute size-2 bg-white rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute size-4 md:size-5 border border-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center">
          <div className="size-2 bg-white rounded-full" />
        </div>
      </motion.div>

      {/* Dashed Rings */}
      <motion.div
        style={{ translateY: "-50%", translateX: "-50%" }}
        animate={{ rotate: "-1turn" }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute size-[300px] sm:size-[444px] md:size-[780px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed"
      />
      <motion.div
        style={{ translateY: "-50%", translateX: "-50%" }}
        animate={{ rotate: "1turn" }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute size-[400px] sm:size-[544px] md:size-[980px] rounded-full border border-white opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute size-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute size-2 bg-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Content */}
      <div className="container relative mt-8 sm:mt-16 px-4">
        <h1 className="text-4xl sm:text-6xl md:text-[90px] md:leading-none font-semibold bg-white tracking-tighter bg-[radial-gradient(100%_100%_at_top_left,white,white,rgba(22,98,212,0.5))] bg-clip-text text-transparent text-center">
          AI-Powered Guest Experience, Available 24/7
        </h1>
        <p className="text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-lg mx-auto text-white/70 mt-4 sm:mt-5 text-center">
          Transform your hotel&apos;s customer service with an intelligent voice
          assistant that handles bookings, inquiries, and guest requests -
          without adding staff.
        </p>
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-5 max-w-md mx-auto">
          <ActionButton
            label="Experience live demo"
            onClick={() => {
              const orbsSection = document.getElementById("orbs");
              if (orbsSection) {
                orbsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
          <ActionButton
            label="Watch how it works"
            onClick={() => {
              const videoSection = document.getElementById(
                "video-player-section"
              );
              if (videoSection) {
                videoSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>
      </div>
    </motion.section>
  );
}
