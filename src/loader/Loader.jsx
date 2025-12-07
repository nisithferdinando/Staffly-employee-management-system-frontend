import React from 'react';

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-transparent">
      <div className="flex space-x-2">
        <span className="text-5xl font-bold text-blue-400 opacity-70 animate-pulse" style={{ animationDelay: '0s', animationDuration: '1.5s' }}>
          S
        </span>
        <span className="text-5xl font-bold text-blue-400 opacity-70 animate-pulse" style={{ animationDelay: '0.15s', animationDuration: '1.5s' }}>
          t
        </span>
        <span className="text-5xl font-bold text-blue-400 opacity-70 animate-pulse" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}>
          a
        </span>
        <span className="text-5xl font-bold text-blue-400 opacity-70 animate-pulse" style={{ animationDelay: '0.45s', animationDuration: '1.5s' }}>
          f
        </span>
        <span className="text-5xl font-bold text-blue-400 opacity-70 animate-pulse" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}>
          f
        </span>
        <span className="text-5xl font-bold text-blue-400 opacity-70 animate-pulse" style={{ animationDelay: '0.75s', animationDuration: '1.5s' }}>
          l
        </span>
        <span className="text-5xl font-bold text-blue-400 opacity-70 animate-pulse" style={{ animationDelay: '0.9s', animationDuration: '1.5s' }}>
          y
        </span>
      </div>
    </div>
  );
}
