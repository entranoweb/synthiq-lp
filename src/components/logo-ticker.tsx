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
      <section className={"py-20 md:py-24"}>
        <div className={"container"}>
          <div className={"flex items-center gap-5"}>
            <div className={"flex-1 md:flex-none"}>
              <h2 className={"text-4xl md:text-5xl font-medium tracking-tighter text-center md:text-left"}>
              Deliver 5-Star Service at Scale
              </h2>
              <div className="max-w-md mx-auto md:mx-0 mt-4">
          <p className={"text-lg md:text-xl font-light leading-relaxed text-center md:text-left"}>
            Handle unlimited guest inquiries simultaneously while maintaining consistent, high-quality service standards.
          </p>
        </div>
            </div>
            <div
              className={
                "flex-1 overflow-hidden rounded-xl [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
              }
            >
              <motion.div
                initial={{ translateX: "-50%" }}
                animate={{ translateX: "0" }}
                transition={{
                  repeat: Infinity,
                  duration: 30,
                  ease: "linear",
                }}
                className={
                  "flex flex-none gap-14 pr-14 -translate-x-1/2 bg-gradient-to-r from-[#190d2e] via-[#4a208a] to-[#190d2e] py-4 rounded-xl shadow-[0_0_12px_#8c45ff]"
                }
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
                    className={"h-6 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity duration-300"}
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
