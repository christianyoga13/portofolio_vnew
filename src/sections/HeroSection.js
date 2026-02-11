"use client";

import { useEffect, useState, useRef } from "react";
import PhysicsBadges from "../components/PhysicsBadges";

export default function HeroSection() {
  const [badgeBounds, setBadgeBounds] = useState(null);
  const heroRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (!heroRef.current || !nameRef.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();
      const nameRect = nameRef.current.getBoundingClientRect();
      const groundY = nameRect.top - heroRect.top - 20;
      setBadgeBounds({ groundY: Math.round(groundY), ceilingY: 10 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div 
      ref={heroRef} 
      className="relative" 
      style={{ 
        height: "calc(100vh - 80px)",
        fontFamily: "var(--font-space-grotesk)"
      }}
    >
      {/* Physics Badges */}
      {badgeBounds && (
        <PhysicsBadges groundY={badgeBounds.groundY} ceilingY={badgeBounds.ceilingY} />
      )}

      {/* Name - Centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h1
          ref={nameRef}
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center leading-[0.9] uppercase px-4 animate-fade-in is-visible"
        >
          CHRISTIAN YOGA SHANDY KURNIADI
        </h1>
      </div>
    </div>
  );
}
