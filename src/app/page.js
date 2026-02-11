"use client";

import Header from "@/components/Header";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import PortfolioSection from "@/sections/PortfolioSection";
import ExperienceSection from "@/sections/ExperienceSection";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}
