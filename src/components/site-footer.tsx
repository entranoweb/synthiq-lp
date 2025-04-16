import Image from "next/image";
import { Button } from "./Button"; // Adjust path to your button component

export default function SiteFooter() {
  return (
    <footer id="site-footer" className="py-8 border-t border-blue-900">
      <div className="container px-4 md:px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left space-y-4 sm:space-y-0">
            <Image
              src="/Synthiq Logo-3.png"
              alt="Synthiq Logo"
              width={140}
              height={50}
              className="h-12 w-auto"
            />
            <span className="text-gray-400">© 2024 Synthiq. All rights reserved.</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
            <Button variant="ghost" size="sm">
              Privacy Policy
            </Button>
            <Button variant="ghost" size="sm">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
