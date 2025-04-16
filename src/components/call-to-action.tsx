"use client";

import { ActionButton } from "@/components/action-button";
import BackgroundStars from "@/assets/stars.png";
import BackgroundGrid from "@/assets/grid-lines.png";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import Badge from "./Badge";
import Link from "next/link"; // Import Link from Next.js

const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const updateMousePosition = (event: MouseEvent) => {
        if (!to.current) return;
        const { top, left } = to.current.getBoundingClientRect();
        mouseX.set(event.x - left);
        mouseY.set(event.y - top);
    };

    useEffect(() => {
        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, [updateMousePosition]);

    return [mouseX, mouseY];
};

export function CallToAction() {
    const sectionRef = useRef<HTMLElement>(null);
    const borderedDivRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: [`start end`, "end start"] });
    const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

    const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);
    const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <section  className={"py-10 sm:py-20 md:py-24"} ref={sectionRef}>
            <div className={"container px-4 sm:px-6"}>
                <motion.div
                    animate={{ backgroundPositionX: BackgroundStars.width }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className={`border border-muted py-16 px-4 sm:py-24 sm:px-6 rounded-xl overflow-hidden relative group`}
                    style={{
                        backgroundImage: `url(${BackgroundStars.src})`,
                        backgroundPositionY,
                    }}
                >
                    <div
                        className={`absolute inset-0 bg-[#1662D4] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700`}
                        style={{ backgroundImage: `url(${BackgroundGrid.src})` }}
                    />
                    <motion.div
                        className={`absolute inset-0 bg-[#1662D4] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700`}
                        style={{ backgroundImage: `url(${BackgroundGrid.src})`, maskImage: maskImage }}
                        ref={borderedDivRef}
                    />
                    <div className={"relative"}>
                        <h2 className={`text-3xl sm:text-5xl tracking-tighter text-center font-medium text-white`}>
                            Try Voice Agent Demo.
                        </h2>
                        <div className="flex justify-center mt-4">
                            <Badge variant="outline" className="text-green-400 border-green-400">
                                Satisfaction Guaranteed
                            </Badge>
                        </div>
                        <p
                            className={`text-center text-base sm:text-lg md:text-xl text-white/70 tracking-tight px-2 sm:px-4 mt-5`}
                        >
                            Schedule a Personal Demo.
                        </p>
                        <div className={"flex justify-center mt-6 sm:mt-8"}>
                            <Link href="https://synthiq.io/#consult" legacyBehavior>
                                <a>
                                    <ActionButton label={"Request Custom Demo"} />
                                </a>
                            </Link>
                        </div>

                        {/* Trust Section */}
                        <div className="mt-6 sm:mt-8 text-center">
                            <p className="font-semibold text-sm sm:text-base">
                                Trusted by boutique hotels and luxury properties across the UK
                            </p>
                            <div className="flex items-center justify-center mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar key={star} className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="mt-2 text-sm sm:text-base">
                                Excellent service rating from our hotel partners
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
