import React, { ReactNode } from 'react';

interface PopoverContentProps {
  children: ReactNode;
}

export const PopoverContent: React.FC<PopoverContentProps> = ({ children }) => {
  return <div>{children}</div>;
};
