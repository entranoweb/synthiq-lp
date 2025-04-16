"use client";

import Avatar1 from "@/assets/avatar-1.png";
import Avatar2 from "@/assets/avatar-2.png";
import Avatar3 from "@/assets/avatar-3.png";
import Avatar4 from "@/assets/avatar-4.png";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
    {
        text: "“Our guest satisfaction scores have soared thanks to these innovative tools.”",
        name: "Emma Thompson",
        position: "General Manager, LuxeStay Hotels",
        avatarImg: Avatar1,
    },
    {
        text: "“This AI-driven platform has streamlined our booking processes and boosted occupancy rates.”",
        name: "James Walters",
        position: "Owner, OceanView Resorts",
        avatarImg: Avatar2,
    },
    {
        text: "“The intuitive dashboard has allowed our staff to provide exceptional service with ease.”",
        name: "Lily Martinez",
        position: "Operations Manager, Urban Escape Suites",
        avatarImg: Avatar3,
    },
    {
        text: "“Our team's productivity and guest engagement have significantly improved since adopting this tool.”",
        name: "Alex Peterson",
        position: "CTO, Hospitality Group",
        avatarImg: Avatar4,
    },
];

export function Testimonials() {
    return (
        <>
            <section className="py-20 md:py-24 bg-[#0f1623]">
                <div className="container px-4 md:px-0">
                    <h2 className="text-4xl md:text-6xl font-medium text-center text-[#1662d4] tracking-tighter">
                        Exceeding Expectations.
                    </h2>
                    <p className="text-white/70 text-base md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5">
                        Our advanced tools empower hospitality leaders to elevate guest experiences effortlessly.
                    </p>
                    <div className="flex overflow-x-auto no-scrollbar mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                        <motion.div
                            initial={{ translateX: "-50%" }}
                            animate={{ translateX: "0" }}
                            transition={{
                                repeat: Infinity,
                                duration: 50,
                                ease: "linear",
                            }}
                            className="flex flex-nowrap gap-5">
                            {[...testimonials, ...testimonials].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="flex-none w-64 sm:w-72 md:w-80 lg:w-96 p-4 md:p-6 lg:p-8 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(140,69,255,0.3),black)] border border-[#1662d4]">
                                    <p className="text-sm md:text-base lg:text-lg tracking-tight text-white">
                                        {testimonial.text}
                                    </p>
                                    <div className="flex items-center gap-3 mt-4">
                                        <div
                                            className="relative w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[#1662d4] after:mix-blend-soft-light before:content-[''] before:absolute before:inset-0 before:border before:border-white/30">
                                            <Image
                                                src={testimonial.avatarImg}
                                                alt={`${testimonial.name}`}
                                                className="w-full h-full object-cover grayscale"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-white text-sm md:text-base lg:text-lg">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-white/50 text-xs md:text-sm lg:text-base">
                                                {testimonial.position}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
