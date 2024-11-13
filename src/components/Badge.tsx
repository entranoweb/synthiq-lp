import React from 'react';
import clsx from 'clsx';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'subtle';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'solid', 
  color = 'blue', 
  className 
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
  
  const variants = {
    solid: `bg-${color}-500 text-white`,
    outline: `border border-${color}-400 text-${color}-400`,
    subtle: `bg-${color}-100 text-${color}-800`,
  };

  return (
    <span className={clsx(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;
