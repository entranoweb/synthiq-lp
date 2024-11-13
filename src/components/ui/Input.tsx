import React, { InputHTMLAttributes } from "react";

// Define the InputProps interface extending from HTML input element props
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;  // Optional label for the input field
  error?: string;  // Optional error message
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label htmlFor={props.id} className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        id={props.id}
        className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
