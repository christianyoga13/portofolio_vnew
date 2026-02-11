'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ExperienceSection() {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation();

  const experiences = [
    {
      year: "January 2025 - Present",
      role: "Full Stack Developer",
      company: "Eiqht",
    },
    {
      year: "May - August 2025",
      role: "System Analyst Intern",
      company: "Maximus Indo Asia",
    },
    {
      year: "September - December 2025",
      role: "Web Developer Intern",
      company: "Nabel Sakha Group",
    },
  ];

  return (
    <section className="w-full px-6 md:px-16 py-20 md:py-28">
      <div className="w-full max-w-400 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-20">
          {/* Title */}
          <div 
            ref={titleRef}
            className={`lg:w-72 flex-shrink-0 animate-fade-in ${titleVisible ? 'is-visible' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
              Experiences
            </h2>
          </div>

          {/* Timeline Grid */}
          <div 
            ref={gridRef}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-10 lg:gap-x-16"
          >
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`space-y-4 animate-fade-in ${gridVisible ? 'is-visible' : ''} animate-fade-in-delay-${(index % 3) + 1}`}
              >
                {/* Year/Period */}
                <div className="text-sm md:text-base text-white/40 font-light">
                  {exp.year}
                </div>
                
                {/* Role & Company */}
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-normal text-white leading-tight">
                    {exp.role}
                  </h3>
                  <p className="text-sm md:text-base text-white/40 font-light">
                    {exp.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
