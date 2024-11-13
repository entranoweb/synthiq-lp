import X from "@/assets/social-x.svg";
import Instagram from "@/assets/social-instagram.svg";
import Youtube from "@/assets/social-youtube.svg";
import SiteLogo from "@/assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button"; // Adjust path to your button component

export default function SiteFooter() {
  return (
    <footer className="py-12 border-t border-blue-900">
      <div className="container px-4 md:px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Image
              src="/Synthiq Logo-3.png"
              alt="Synthiq Logo"
              width={160}
              height={60}
              className="h-13 w-auto"
            />
            <span className="text-gray-400">© 2024 Synthiq. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Privacy Policy
            </Button>
            <Button variant="ghost" size="sm">
              Terms of Service
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 md:mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
            {/* Logo and Description Section */}
            
            {/* Footer Text */}
          

            {/* Social Media Links */}
            <div>
              <ul className="flex justify-center gap-3 text-white/60">
                <li className="hover:text-[#1662d4] cursor-pointer">
                  <X />
                </li>
                <li className="hover:text-[#1662d4] cursor-pointer">
                  <Instagram />
                </li>
                <li className="hover:text-[#1662d4] cursor-pointer">
                  <Youtube />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
