import React from "react";

export const Button = ({
  children,
  variant = "primary",
  disabled = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={`
        relative w-full group overflow-hidden rounded-xl transition-all duration-300
        ${
          variant === "primary"
            ? "bg-gradient-to-r from-[#4dbece] to-[#26585f] hover:opacity-90"
            : "bg-[#102e30]/30 hover:bg-[#102e30]/50 border border-[#4dbece]/30"
        }
      `}
      {...props}
    >
      <div className="relative px-6 py-3 text-[#bfe3e9] font-semibold">
        {children}
      </div>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
    </button>
  );
};
