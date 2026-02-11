import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="relative flex items-center px-6 md:px-16 py-6 md:py-8 text-black dark:text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
      {/* Left - Email */}
      <div className="text-xs md:text-sm tracking-wider uppercase flex-shrink-0">
        YOGASHANDY50@GMAIL.COM
      </div>

      {/* Center - Title with Arrow (Absolute center) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 md:gap-3">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="hidden md:block flex-shrink-0"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
        <div className="text-center whitespace-nowrap">
          <div className="text-xs md:text-sm tracking-wider uppercase leading-tight">
            SOFTWARE ENGINEER
          </div>
          <div className="text-xs md:text-sm tracking-wider uppercase leading-tight">
            BASED JAKARTA, INDONESIA
          </div>
        </div>
      </div>

      {/* Right - Theme Toggle */}
      <ThemeToggle />
    </header>
  );
}
