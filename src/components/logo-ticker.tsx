"use client";

import AcmeLogo from "@/assets/logo-acme.png";
import ApexLogo from "@/assets/logo-apex.png";
import QuantumLogo from "@/assets/logo-quantum.png";
import CelestialLogo from "@/assets/logo-celestial.png";
import PulseLogo from "@/assets/logo-pulse.png";
import EchoLogo from "@/assets/logo-echo.png";
import Image from "next/image";
import { motion } from "framer-motion";

export function LogoTicker() {
  return (
    <>
      <section className="py-10 md:py-20">
        <div className="container px-4">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="flex-1 md:flex-none text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter leading-tight">
                Deliver 5-Star Service at Scale
              </h2>
              <div className="max-w-md mx-auto md:mx-0 mt-4">
                <p className="text-sm sm:text-lg md:text-xl font-light leading-relaxed">
                  Handle unlimited guest inquiries simultaneously while maintaining consistent, high-quality service standards.
                </p>
              </div>
            </div>
            {/* Ticker Section */}
            <div
              className="flex-1 overflow-hidden rounded-lg sm:rounded-xl [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
            >
              <motion.div
                initial={{ translateX: "-50%" }}
                animate={{ translateX: "0" }}
                transition={{
                  repeat: Infinity,
                  duration: 30,
                  ease: "linear",
                }}
                className="flex flex-none gap-8 sm:gap-14 pr-10 -translate-x-1/2 bg-gradient-to-r from-[#190d2e] via-[#4a208a] to-[#190d2e] py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-[0_0_12px_#8c45ff]"
              >
                {[
                  AcmeLogo,
                  ApexLogo,
                  QuantumLogo,
                  CelestialLogo,
                  PulseLogo,
                  EchoLogo,
                  AcmeLogo,
                  ApexLogo,
                  QuantumLogo,
                  CelestialLogo,
                  PulseLogo,
                  EchoLogo,
                ].map((logo, index) => (
                  <Image
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    key={index}
                    className="h-5 sm:h-6 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
