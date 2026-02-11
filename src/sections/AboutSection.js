'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AboutSection() {
  const [imagesRef, imagesVisible] = useScrollAnimation();
  const [textRef, textVisible] = useScrollAnimation();

  return (
    <section className="min-h-screen w-full flex items-center px-6 md:px-16 py-20">
      <div className="w-full max-w-400 mx-auto space-y-16 md:space-y-24">
        {/* Images Section */}
        <div 
          ref={imagesRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          <div className={`relative w-full h-64 md:h-80 animate-fade-in ${imagesVisible ? 'is-visible' : ''}`}>
            <Image 
              src="/assets/me.jpg" 
              alt="Profile" 
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <div className={`relative w-full h-64 md:h-80 animate-fade-in ${imagesVisible ? 'is-visible' : ''} animate-fade-in-delay-1`}>
            <Image 
              src="/assets/mockup.png" 
              alt="Mockup" 
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <div className={`relative w-full h-64 md:h-80 animate-fade-in ${imagesVisible ? 'is-visible' : ''} animate-fade-in-delay-2`}>
            <Image 
              src="/assets/mockup2.png" 
              alt="Mockup 2" 
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Text Section */}
        <div 
          ref={textRef}
          className="grid md:grid-cols-2 gap-12 md:gap-20"
        >
          {/* Left - Headline */}
          <div className={`animate-fade-in ${textVisible ? 'is-visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-black dark:text-white">
              Hi, I&apos;m Yoga, a software engineer that loves to build solutions
            </h2>
          </div>

          {/* Right - Description */}
          <div className={`flex items-center animate-fade-in ${textVisible ? 'is-visible' : ''} animate-fade-in-delay-1`}>
            <p className="text-base md:text-lg leading-relaxed text-black/70 dark:text-white/80">
              Software engineer, specializing in crafting user-friendly web applications
              and systems with expertise in Frontend Development, Backend Development,
              WordPress Development, JavaScript, and modern web technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
