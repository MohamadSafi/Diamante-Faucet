import React from "react";

export const TabSelector = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "manual", label: "Enter Key" },
    { id: "wallet", label: "Connect Wallet" },
    { id: "generate", label: "Generate New" },
  ];

  return (
    <div className="flex space-x-1 bg-[#102e30]/30 p-1 rounded-lg mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex-1 px-0 py-2 text-sm font-medium rounded-md transition-all duration-200
            ${
              activeTab === tab.id
                ? "bg-[#4dbece] text-[#bfe3e9]"
                : "text-[#bfe3e9]/70 hover:text-[#bfe3e9] hover:bg-[#4dbece]/10"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
