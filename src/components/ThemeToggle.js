'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden flex-shrink-0 ml-auto">
        <div className="w-full h-full flex">
          <div className="w-1/2 bg-white"></div>
          <div className="w-1/2 bg-[#0a0a0a]"></div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-black dark:border-white flex items-center justify-center overflow-hidden flex-shrink-0 ml-auto relative group transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      <div 
        className="w-full h-full flex relative"
        style={{
          transform: isAnimating ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Light mode: black left, white right | Dark mode: white left, dark right */}
        <div className="w-1/2 bg-black dark:bg-white"></div>
        <div className="w-1/2 bg-white dark:bg-[#0a0a0a]"></div>
      </div>
      
      {/* Ripple effect on click */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-full border-2 border-black dark:border-white opacity-0 animate-ping"></div>
      )}
    </button>
  );
}
