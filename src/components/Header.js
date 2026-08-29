import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="relative flex items-center justify-between px-4 sm:px-6 md:px-16 py-4 sm:py-6 md:py-8 text-black dark:text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
      {/* Left - Email */}
      <a 
        href="mailto:yogashandy50@gmail.com" 
        className="text-[11px] sm:text-xs md:text-sm tracking-wider uppercase font-medium flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        YOGASHANDY50@GMAIL.COM
      </a>

      {/* Center - Title with Arrow (Only visible on medium+ screens to avoid overlapping) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2 md:gap-3 pointer-events-none">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="flex-shrink-0"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
        <div className="text-center whitespace-nowrap">
          <div className="text-xs md:text-sm tracking-wider uppercase leading-tight">
            SOFTWARE ENGINEER
          </div>
          <div className="text-xs md:text-sm tracking-wider uppercase leading-tight text-black/50 dark:text-white/50">
            BASED JAKARTA, INDONESIA
          </div>
        </div>
      </div>

      {/* Right - Theme Toggle */}
      <div className="flex-shrink-0">
        <ThemeToggle />
      </div>
    </header>
  );
}
