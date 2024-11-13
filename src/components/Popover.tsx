import React, { ReactNode } from 'react';

interface PopoverProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Popover: React.FC<PopoverProps> = ({ children, isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50" onClick={onClose}>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-20 p-4 bg-white shadow-lg rounded-md">
            {children}
          </div>
        </div>
      )}
    </>
  );
};
