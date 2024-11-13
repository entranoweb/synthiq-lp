import React from 'react';

type ButtonProps = {
  variant: 'ghost' | 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';  // Optional size prop
  children: React.ReactNode;
  className?: string; // Add className as an optional prop
};

export const Button: React.FC<ButtonProps> = ({ variant, size = 'md', children, className }) => {
  const baseStyle = 'px-4 py-2 rounded-lg focus:outline-none transition-all duration-300';

  const variantStyles = {
    ghost: 'bg-transparent text-blue-500 border border-transparent hover:bg-blue-500 hover:text-white',
    solid: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  };

  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};
