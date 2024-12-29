import React from "react";

export const NetworkStatus = () => {
  return (
    <div className="glass-card rounded-xl p-4 backdrop-blur-lg">
      <div className="flex items-center space-x-3 mb-2">
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-[#4dbece]" />
          <div className="absolute inset-0 rounded-full bg-[#4dbece] animate-ping opacity-75" />
        </div>
        <div className="flex items-center w-full justify-between text-sm text-[#bfe3e9]/80">
          <span className="text-sm font-medium text-[#bfe3e9]">
            Network Status: Active
          </span>
          <span>Network: Testnet</span>
        </div>
      </div>
    </div>
  );
};
