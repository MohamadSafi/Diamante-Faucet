import React from 'react';

export const Background = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#102e30] to-[#1e3c44]">
        <div className="absolute inset-0">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="wave-animation"
              style={{
                opacity: 0.1 - i * 0.02,
                animationDelay: `${i * -5}s`
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
    </div>
  );
};