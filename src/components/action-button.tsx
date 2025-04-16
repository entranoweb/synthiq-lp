import React from "react";

interface ActionButtonProps {
    label: string;
    onClick?: () => void; // Optional onClick handler
}

export function ActionButton({ label, onClick }: ActionButtonProps) {
    return (
        <button
            onClick={onClick} // Attach the onClick handler here
            className="relative py-2 px-3 sm:py-3 sm:px-6 rounded-md sm:rounded-lg font-medium text-xs sm:text-sm bg-gradient-to-b from-[#0a1c3a] to-[#1662D4] shadow-[0px_0px_8px_#1662D4] sm:shadow-[0px_0px_12px_#1662D4] hover:shadow-[0px_0px_10px_#1a75e8] sm:hover:shadow-[0px_0px_15px_#1a75e8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all max-w-fit mx-auto"
        >
            {/* Decorative layers */}
            <div className="absolute inset-0 rounded-md sm:rounded-lg">
                <div
                    className="absolute inset-0 border rounded-md sm:rounded-lg border-white/20 [mask-image:linear-gradient(to_bottom,black,transparent)]"
                />
                <div
                    className="absolute inset-0 border rounded-md sm:rounded-lg border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"
                />
                <div
                    className="absolute inset-0 rounded-md sm:rounded-lg shadow-[0_0_5px_rgba(22,98,212,0.7)_inset]"
                />
            </div>
            {/* Button Label */}
            <span className="relative z-10 text-white">{label}</span>
        </button>
    );
}
