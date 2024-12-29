import React from 'react';

export const Notification = () => {
  return (
    <div id="notification" className="hidden fixed bottom-4 right-4 transform transition-all duration-500">
      <div className="glass-card rounded-lg p-4 text-[#bfe3e9] flex items-center space-x-3">
        <svg className="w-5 h-5 text-[#4dbece]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Tokens sent successfully!</span>
      </div>
    </div>
  );
};