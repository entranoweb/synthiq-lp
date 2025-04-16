"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "./Button";
import HeroCTA from "./HeroCTA";
import Link from "next/link";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/Synthiq Logo-3.png"
            alt="Synthiq Logo"
            width={120}
            height={50}
            className="w-24 sm:w-36 h-auto" // Smaller for mobile, larger for larger screens
            priority
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Link href="#features">
            <Button
              variant="ghost"
              className="text-sm sm:text-base font-semibold px-3 py-1 sm:py-2 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              Features
            </Button>
          </Link>
          <Link href="#site-footer">
            <Button
              variant="ghost"
              className="text-sm sm:text-base font-semibold px-3 py-1 sm:py-2 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              Contact
            </Button>
          </Link>
          <HeroCTA />
        </nav>
      </div>
    </header>
  );
};

export default Header;
