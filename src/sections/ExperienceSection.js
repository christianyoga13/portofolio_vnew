'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExperienceSection() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  const experiences = [
    {
      year: "August 2026 - Present",
      role: "Junior IT Programmer",
      company: "PT Swadharma Duta Data",
      current: true,
      description: "Responsible for integrating RESTful APIs into web frontend applications, ensuring smooth data flow, and executing comprehensive internal testing and debugging for optimal system reliability.",
      skills: ["API Integration", "RESTful API", "Frontend Web", "Internal Testing", "Quality Assurance", "Debugging"],
    },
    {
      year: "January 2025 - Present",
      role: "Full Stack Developer",
      company: "Eiqht",
      current: false,
      description: "Developing full-stack web applications, architecting responsive frontend interfaces, and implementing high-performance backend APIs with modern web technologies.",
      skills: ["Next.js", "React", "Node.js", "Tailwind CSS", "REST API", "Database Design"],
    },
    {
      year: "May - August 2025",
      role: "System Analyst Intern",
      company: "Maximus Indo Asia",
      current: false,
      description: "Conducted system analysis, documented workflow processes, assisted in system architecture design, and coordinated digital transformation solutions.",
      skills: ["System Analysis", "Process Modeling", "Database Design", "UML", "Agile"],
    },
    {
      year: "September - December 2025",
      role: "Web Developer Intern",
      company: "Nabel Sakha Group",
      current: false,
      description: "Developed and customized web platforms, improved responsive performance, integrated content management systems, and optimized SEO and page speed.",
      skills: ["WordPress", "PHP", "JavaScript", "Responsive Design", "Performance Optimization"],
    },
  ];

  const INITIAL_COUNT = 3;
  const displayedExperiences = showAll ? experiences : experiences.slice(0, INITIAL_COUNT);
  const hasMore = experiences.length > INITIAL_COUNT;

  const handleToggle = () => {
    if (!showAll) {
      setShowAll(true);
    } else {
      setShowAll(false);
      setTimeout(() => {
        const target = sectionRef.current;
        if (typeof window !== 'undefined' && window.lenis) {
          window.lenis.resize();
          window.lenis.scrollTo(target, { offset: -80, duration: 1.1, force: true });
        } else if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 18,
        delay: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section ref={sectionRef} className="w-full px-5 sm:px-8 md:px-16 py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 sm:mb-20 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs uppercase tracking-widest text-black/60 dark:text-white/60 mb-3.5"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Career Journey
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-black dark:text-white">
              Work Experience
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-black/60 dark:text-white/60 max-w-md font-light">
            A chronological timeline of roles, contributions, and professional milestones.
          </p>
        </motion.div>

        {/* Timeline Container with optional fading bottom overlay */}
        <div className="relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative space-y-10 sm:space-y-14 md:space-y-16"
          >
            {/* Animated Continuous Vertical Timeline Line */}
            <motion.div
              variants={lineVariants}
              style={{ originY: 0 }}
              className="absolute left-4 sm:left-5 top-5 bottom-8 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500/50 to-black/10 dark:to-white/10 pointer-events-none"
            />

            {displayedExperiences.map((exp, index) => {
              const isExtra = index >= INITIAL_COUNT;
              return (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  initial={isExtra ? { opacity: 0, y: 30, scale: 0.98 } : undefined}
                  animate={isExtra ? { opacity: 1, y: 0, scale: 1 } : undefined}
                  transition={isExtra ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] } : undefined}
                  className="relative flex items-start group"
                >
                  {/* Timeline Node Column - Width matches 2 * line position for 100% center lock */}
                  <div className="w-8 sm:w-10 flex-shrink-0 flex items-center justify-center pt-5 sm:pt-6 z-10">
                    <motion.div
                      variants={nodeVariants}
                      className="flex items-center justify-center"
                    >
                      {exp.current ? (
                        <div className="relative flex items-center justify-center">
                          {/* Pulsing radar rings for current role */}
                          <span className="absolute w-7 h-7 rounded-full bg-blue-500/25 animate-ping" />
                          <span className="relative w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-[#0a0a0a] shadow-md shadow-blue-500/50" />
                        </div>
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full bg-neutral-400 dark:bg-neutral-600 border-2 border-white dark:border-[#0a0a0a] group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300 shadow-sm" />
                      )}
                    </motion.div>
                  </div>

                  {/* Timeline Content Card */}
                  <div className="flex-1 pl-3 sm:pl-6 min-w-0">
                    <div className="p-5 sm:p-7 md:p-8 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 group-hover:border-black/25 dark:group-hover:border-white/25 group-hover:bg-black/[0.04] dark:group-hover:bg-white/[0.04] group-hover:shadow-lg transition-all duration-400">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        {/* Period Badge */}
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 border border-black/10 dark:border-white/10">
                            <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {exp.year}
                          </span>
                          {exp.current && (
                            <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                              Present
                            </span>
                          )}
                        </div>

                        {/* Company Name */}
                        <span className="text-xs sm:text-sm font-light text-black/50 dark:text-white/50 tracking-wide uppercase">
                          {exp.company}
                        </span>
                      </div>

                      {/* Role Title */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                        {exp.role}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-black/70 dark:text-white/70 leading-relaxed font-light mb-5">
                        {exp.description}
                      </p>

                      {/* Skills/Tags */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-xs px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Fade Gradient Overlay when collapsed */}
          {!showAll && hasMore && (
            <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-white via-white/85 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/85 pointer-events-none z-20 transition-opacity duration-500" />
          )}
        </div>

        {/* Show More / Show Less Button */}
        {hasMore && (
          <div className="flex justify-center mt-8 sm:mt-12 relative z-30">
            <button
              onClick={handleToggle}
              className="group relative px-6 py-3.5 sm:px-8 sm:py-4 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 rounded-full transition-all duration-300 overflow-hidden shadow-sm backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
              <span className="relative flex items-center gap-2 text-sm sm:text-base font-medium text-black dark:text-white">
                {showAll ? (
                  <>
                    Show Less Experiences
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    Show More Experiences ({experiences.length - INITIAL_COUNT} more)
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
