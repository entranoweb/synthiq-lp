import React, { ReactNode } from 'react';

interface PopoverTriggerProps {
  children: ReactNode;
  onClick: () => void;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="text-blue-500 hover:text-blue-700">
      {children}
    </button>
  );
};
