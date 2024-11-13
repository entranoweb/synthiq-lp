import React from 'react';

interface ScrollAreaProps {
  children: React.ReactNode;
  height: string;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ children, height }) => {
  return (
    <div className={`overflow-auto ${height}`}>
      {children}
    </div>
  );
};

export { ScrollArea };
