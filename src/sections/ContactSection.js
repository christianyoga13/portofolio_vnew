'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ContactSection() {
  const [headerRef, headerVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/christianysk13',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/christianyogask',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Github',
      url: 'https://github.com/christianyoga13',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="min-h-screen w-full px-6 md:px-16 py-20 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`mb-16 md:mb-24 animate-fade-in ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal leading-tight mb-6 text-black dark:text-white">
            LET&apos;S GET IN TOUCH
          </h2>
          <p className="text-lg md:text-xl text-black/60 dark:text-white/60 max-w-2xl">
            Have a project in mind or just want to chat? I&apos;d love to hear from you.
          </p>
        </div>

        {/* Content Grid */}
        <div 
          ref={contentRef}
          className={`grid md:grid-cols-2 gap-12 md:gap-16 animate-fade-in ${contentVisible ? 'is-visible' : ''}`}
        >
          {/* Left Side - Contact Info & Social */}
          <div className="space-y-12">
            {/* Email */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-wider text-black/50 dark:text-white/50">Email</h3>
              <a 
                href="mailto:your.email@example.com" 
                className="text-2xl md:text-3xl font-light text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors duration-300 block group"
              >
                your.email@example.com
                <span className="block h-px w-0 bg-black/80 dark:bg-white/80 transition-all duration-500 group-hover:w-full mt-2"></span>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-wider text-black/50 dark:text-white/50">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-5 py-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 rounded-full transition-all duration-300 overflow-hidden"
                  >
                    {/* Background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
                    
                    <span className="relative flex items-center gap-2 font-light text-black dark:text-white">
                      {social.icon}
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Location (Optional) */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-wider text-black/50 dark:text-white/50">Location</h3>
              <p className="text-xl text-black/70 dark:text-white/70">
                Jakarta, Indonesia
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="group">
                <label htmlFor="name" className="block text-sm text-black/50 dark:text-white/50 mb-2 group-focus-within:text-black/80 dark:group-focus-within:text-white/80 transition-colors">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:bg-black/10 dark:focus:bg-white/10 focus:border-black/30 dark:focus:border-white/30 focus:outline-none transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              {/* Email Input */}
              <div className="group">
                <label htmlFor="email" className="block text-sm text-gray-500 dark:text-gray-400 mb-2 group-focus-within:text-gray-700 dark:group-focus-within:text-gray-300 transition-colors">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:bg-gray-50 dark:focus:bg-gray-900 focus:border-gray-300 dark:focus:border-gray-600 focus:outline-none transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Input */}
              <div className="group">
                <label htmlFor="message" className="block text-sm text-black/50 dark:text-white/50 mb-2 group-focus-within:text-black/80 dark:group-focus-within:text-white/80 transition-colors">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:bg-black/10 dark:focus:bg-white/10 focus:border-black/30 dark:focus:border-white/30 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative w-full px-8 py-4 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 rounded-full transition-all duration-300 overflow-hidden font-medium"
              >
                <span className="relative flex items-center justify-center gap-2">
                  Send Message
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-black/40 dark:text-white/40 text-sm">
          <p>© 2026 All Rights Reserved</p>
          <p>Designed & Built with 💜</p>
        </div>
      </div>
    </section>
  );
}
