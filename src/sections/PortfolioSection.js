'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function PortfolioSection() {
  const [headerRef, headerVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation();
  const [showAll, setShowAll] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Pickbooth",
      description: "AI-Powered Photo Booth SaaS Platform",
      category: "SaaS Development",
      image: "/projects/pickbooth.png",
      year: "2025",
      status: "coming-soon"
    },
    {
      id: 2,
      title: "Kartu Digital",
      description: "Digital Business Card Management System",
      category: "SaaS Development",
      image: "/projects/kartu-digital.png",
      year: "2025"
    },
    {
      id: 3,
      title: "Material Inovasi Industri",
      description: "Industrial Materials E-commerce Platform",
      category: "E-commerce",
      image: "/projects/mii.png",
      year: "2025"
    },
    {
      id: 4,
      title: "Lof Kun Game Campaign",
      description: "Brand Marketing & Digital Campaign",
      category: "Digital Marketing",
      image: "/projects/lof-kun.png",
      year: "2025"
    },
    {
      id: 5,
      title: "Karate Kid Game Campaign",
      description: "Film Release Promotion & Digital Marketing Campaign",
      category: "Digital Marketing",
      image: "/projects/karatekid.png",
      year: "2025"
    },
    {
      id: 6,
      title: "Soursally Yogulato",
      description: "Brand Launch Digital Marketing Campaign",
      category: "Digital Marketing",
      image: "/projects/soursally.png",
      year: "2025"
    },
    {
      id: 7,
      title: "POS Cilegon Park",
      description: "Point of Sale & Ticketing System",
      category: "Web Development",
      image: "/projects/pos-cilegon.png",
      year: "2024"
    },
    {
      id: 8,
      title: "Mentoring UMN 2024",
      description: "University Mentoring Platform & Portal",
      category: "Web Development",
      image: "/projects/mentoring.png",
      year: "2024"
    },
    {
      id: 9,
      title: "UMKM Web",
      description: "Small Business Website & E-Catalog",
      category: "Web Development",
      image: "/projects/umkm-web.png",
      year: "2024"
    },
    {
      id: 10,
      title: "Woof Clothing",
      description: "Full-Stack E-commerce Platform",
      category: "E-commerce",
      image: "/projects/woofclothing.png",
      year: "2023"
    }
  ];

  const INITIAL_DISPLAY_COUNT = 4;
  const displayedProjects = showAll ? projects : projects.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = projects.length > INITIAL_DISPLAY_COUNT;

  const handleToggleProjects = () => {
    if (!showAll) {
      setShowAll(true);
      setTimeout(() => setIsExpanding(true), 50);
    } else {
      setShowAll(false);
      setIsExpanding(false);
      // Recalculate dimensions and smoothly glide to the top of Selected Works
      setTimeout(() => {
        const target = headerRef.current || sectionRef.current;
        if (typeof window !== 'undefined' && window.lenis) {
          window.lenis.resize();
          window.lenis.scrollTo(target, { offset: -80, duration: 1.1, force: true });
        } else if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    }
  };

  return (
    <section ref={sectionRef} className="min-h-screen w-full px-5 sm:px-8 md:px-16 py-14 sm:py-20 md:py-28">
      <div className="w-full max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`mb-12 sm:mb-16 md:mb-24 animate-fade-in ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-normal leading-tight mb-2 sm:mb-4 text-black dark:text-white">
            Selected Works
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-black/60 dark:text-white/60">
            A collection of projects I&apos;ve worked on
          </p>
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {displayedProjects.map((project, index) => {
            const isNewItem = showAll && index >= INITIAL_DISPLAY_COUNT;
            const delayIndex = isNewItem ? (index - INITIAL_DISPLAY_COUNT) : index;

            return (
              <div
                key={project.id}
                className={`group cursor-pointer transition-all ease-out ${gridVisible ? 'is-visible' : ''
                  } ${isNewItem && !isExpanding
                    ? 'opacity-0 translate-y-12 scale-95'
                    : 'opacity-100 translate-y-0 scale-100'
                  }`}
                style={{
                  transitionDuration: '0.8s',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: isNewItem ? `${delayIndex * 150}ms` : '0ms'
                }}
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative w-full h-56 sm:h-72 md:h-96 overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors duration-300">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${project.status === 'coming-soon' ? 'opacity-60' : ''
                        }`}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    {project.status === 'coming-soon' && (
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 rounded-full blur-md animate-pulse" />
                          <div className="relative px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full border border-yellow-400/50 shadow-lg">
                            <span className="text-xs sm:text-sm font-semibold text-black flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Coming Soon
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="mb-1.5 sm:mb-2">
                        <span className="inline-block text-[11px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 rounded-full border border-black/10 dark:border-white/10">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-normal mb-1 text-black dark:text-white group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors flex items-center gap-2 flex-wrap">
                        {project.title}
                        {project.status === 'coming-soon' && (
                          <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                            In Progress
                          </span>
                        )}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-black/50 dark:text-white/50 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="text-lg sm:text-2xl md:text-3xl text-black/40 dark:text-white/40 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors ml-2 sm:ml-4 flex-shrink-0">
                      {project.year}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {hasMore && (
          <div className="flex justify-center mt-10 sm:mt-12 md:mt-16">
            <button
              onClick={handleToggleProjects}
              className="group relative px-6 py-3.5 sm:px-8 sm:py-4 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 rounded-full transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
              <span className="relative flex items-center gap-2 text-sm sm:text-base md:text-lg font-light text-black dark:text-white">
                {showAll ? (
                  <>
                    Show Less
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
                    Show More Projects
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
