"use client";

import React from "react";

export const BenefitsComponent = () => {
  const features = [
    "24/7 Automated Guest Support",
    "Multilingual Capabilities",
    "Seamless Booking Management",
    "Instant Response to Common Inquiries",
    "Integration with Your PMS",
    "Real-time Guest Feedback Collection",
  ];

  const benefits = [
    "Reduce Operational Costs by up to 40%",
    "Free Up Staff for High-Value Interactions",
    "Never Miss a Booking Opportunity",
    "Increase Guest Satisfaction Scores",
    "Standardize Service Quality",
  ];

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="container max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center text-white mb-12">
          Features & Benefits
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Features Section */}
          <div className="space-y-8">
            <h3 className="text-3xl font-medium text-[#1662D4] text-center md:text-left">
              Key Features
            </h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="p-5 bg-[#111] border border-[#222] rounded-lg text-white shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_15px_#1662D4]"
                >
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Benefits Section */}
          <div className="space-y-8">
            <h3 className="text-3xl font-medium text-[#1662D4] text-center md:text-left">
              Benefits
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="p-5 bg-[#111] border border-[#222] rounded-lg text-white shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_15px_#1662D4]"
                >
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
